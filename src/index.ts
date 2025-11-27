import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import { messageHandler } from './handlers/messageHandler';

dotenv.config();

const RESTAURANT_NAME = process.env.RESTAURANT_NAME || 'Nosso Delivery';

console.log('🤖 Iniciando Bot de Delivery...\n');

const client = new Client({
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
      '--disable-gpu'
    ]
  }
});

client.on('qr', (qr) => {
  console.log('📱 QR CODE GERADO!\n');
  console.log('Escaneie o QR Code abaixo com o WhatsApp:\n');
  qrcode.generate(qr, { small: true });
  console.log('\nOu acesse WhatsApp Web e escaneie o código.\n');
});

client.on('authenticated', () => {
  console.log('✅ Autenticado com sucesso!');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Falha na autenticação:', msg);
  process.exit(1);
});

client.on('ready', () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ BOT ${RESTAURANT_NAME.toUpperCase()} ESTÁ ONLINE!`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 Status:');
  console.log(`   - Nome: ${RESTAURANT_NAME}`);
  console.log(`   - IA: ${process.env.ENABLE_AI === 'true' ? 'Ativada ✓' : 'Desativada ✗'}`);
  console.log(`   - Modo: Apenas responde mensagens (não envia automático)`);
  console.log('\n🎯 Bot pronto para receber mensagens!\n');
});

client.on('message', async (message) => {
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

client.on('disconnected', (reason) => {
  console.log('⚠️ Bot desconectado:', reason);
  console.log('🔄 Tentando reconectar...');
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando bot...');
  await client.destroy();
  console.log('✅ Bot encerrado com sucesso!');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado:', error);
});

console.log('⏳ Inicializando WhatsApp Web...\n');
client.initialize();
