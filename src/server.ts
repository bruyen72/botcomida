import express from 'express';
import path from 'path';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode';
import dotenv from 'dotenv';
import { messageHandler } from './handlers/messageHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const RESTAURANT_NAME = process.env.RESTAURANT_NAME || 'Nosso Delivery';

// Estado do bot
let botClient: Client | null = null;
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

// Inicializar bot do WhatsApp
function initializeBot() {
  console.log('🤖 Iniciando Bot de Delivery...\n');

  botClient = new Client({
    authStrategy: new LocalAuth({
      clientId: 'delivery-bot'
    }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--single-process',
        '--no-zygote'
      ]
    }
  });

  botClient.on('qr', (qr) => {
    console.log('📱 QR CODE gerado!');
    qrCodeData = qr;
    isLoading = false;
  });

  botClient.on('authenticated', () => {
    console.log('✅ Autenticado com sucesso!');
  });

  botClient.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação:', msg);
    isLoading = false;
  });

  botClient.on('ready', () => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ BOT ${RESTAURANT_NAME.toUpperCase()} ESTÁ ONLINE!`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 Acesse:', `http://localhost:${PORT}`);
    console.log('📊 Status:', `http://localhost:${PORT}/api/status`);
    console.log('\n🎯 Bot pronto para receber mensagens!\n');

    isConnected = true;
    isLoading = false;
    qrCodeData = null;
  });

  botClient.on('message', async (message) => {
    try {
      if (message.from.endsWith('@g.us')) {
        return;
      }

      if (message.from === 'status@broadcast') {
        return;
      }

      if (message.hasMedia) {
        await message.reply('Obrigado pela imagem! No momento só consigo processar mensagens de texto. 😊');
        return;
      }

      await messageHandler.handleMessage(message);
    } catch (error) {
      console.error('❌ Erro ao processar mensagem:', error);
      try {
        await message.reply(
          'Desculpe, ocorreu um erro ao processar sua mensagem. 😕\n\n' +
          'Por favor, tente novamente ou digite *menu* para ver as opções.'
        );
      } catch (replyError) {
        console.error('❌ Erro ao enviar mensagem de erro:', replyError);
      }
    }
  });

  botClient.on('disconnected', (reason) => {
    console.log('⚠️ Bot desconectado:', reason);
    isConnected = false;
    console.log('🔄 Tentando reconectar...');
  });

  console.log('⏳ Inicializando WhatsApp Web...\n');
  botClient.initialize();
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
  if (botClient) {
    await botClient.destroy();
  }
  console.log('✅ Bot encerrado com sucesso!');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado:', error);
});
