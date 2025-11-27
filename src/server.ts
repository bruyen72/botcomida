import express from 'express';
import path from 'path';
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  Browsers,
  WAMessage
} from '@whiskeysockets/baileys';
import qrcode from 'qrcode';
import dotenv from 'dotenv';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import { messageHandler } from './handlers/messageHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const RESTAURANT_NAME = process.env.RESTAURANT_NAME || 'Nosso Delivery';

// Estado do bot
let sock: any = null;
let qrCodeData: string | null = null;
let isConnected = false;
let isLoading = true;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// API: Status do bot
app.get('/api/status', (_req, res) => {
  res.json({
    status: isConnected ? 'connected' : (isLoading ? 'loading' : 'disconnected'),
    connected: isConnected,
    loading: isLoading
  });
});

// API: QR Code
app.get('/api/qrcode', async (_req, res) => {
  if (isConnected) {
    return res.json({
      status: 'connected',
      qr: null
    });
  }

  if (qrCodeData) {
    try {
      const qrImage = await qrcode.toDataURL(qrCodeData);
      return res.json({
        status: 'waiting',
        qr: qrImage
      });
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      return res.status(500).json({
        status: 'error',
        error: 'Erro ao gerar QR Code'
      });
    }
  }

  return res.json({
    status: 'loading',
    qr: null
  });
});

// Página principal
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializar bot do WhatsApp com Baileys
async function initializeBot() {
  console.log('🤖 Iniciando Bot de Delivery com Baileys...\n');

  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: Browsers.ubuntu('Chrome')
  });

  // Evento: Atualização de conexão
  sock.ev.on('connection.update', async (update: any) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('📱 QR CODE gerado!');
      qrCodeData = qr;
      isLoading = false;
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('⚠️ Conexão fechada. Reconectando:', shouldReconnect);
      isConnected = false;

      if (shouldReconnect) {
        setTimeout(() => initializeBot(), 3000);
      }
    } else if (connection === 'open') {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`✅ BOT ${RESTAURANT_NAME.toUpperCase()} ESTÁ ONLINE!`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('🌐 Acesse:', `http://localhost:${PORT}`);
      console.log('\n🎯 Bot pronto para receber mensagens!\n');

      isConnected = true;
      isLoading = false;
      qrCodeData = null;
    }
  });

  // Evento: Credenciais atualizadas
  sock.ev.on('creds.update', saveCreds);

  // Evento: Mensagens recebidas
  sock.ev.on('messages.upsert', async ({ messages }: { messages: WAMessage[] }) => {
    try {
      const m = messages[0];
      if (!m.message) return;
      if (m.key.fromMe) return; // Ignora mensagens próprias
      if (m.key.remoteJid?.endsWith('@g.us')) return; // Ignora grupos

      const messageText = m.message.conversation ||
                         m.message.extendedTextMessage?.text ||
                         '';

      if (!messageText) return;

      console.log(`📩 ${m.key.remoteJid?.split('@')[0]}: "${messageText}"`);

      // Processar mensagem (sem await para responder mais rápido)
      messageHandler.handleBaileysMessage(sock, m, messageText)
        .then(() => console.log('✅'))
        .catch(err => console.error('❌ Erro:', err.message));
    } catch (error) {
      console.error('❌ Erro ao processar mensagem:', error instanceof Error ? error.message : error);
    }
  });
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🌐 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📱 Abra no navegador para ver o QR Code\n`);

  // Iniciar bot
  initializeBot();
});

// Tratar encerramento
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando bot...');
  if (sock) {
    await sock.logout();
  }
  console.log('✅ Bot encerrado com sucesso!');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado:', error);
});
