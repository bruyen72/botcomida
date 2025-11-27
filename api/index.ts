import type { VercelRequest, VercelResponse } from '@vercel/node';
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  Browsers,
  WAMessage
} from '@whiskeysockets/baileys';
import qrcode from 'qrcode';
import { Boom } from '@hapi/boom';
import pino from 'pino';

// Estado global (limitado no serverless!)
let sock: any = null;
let qrCodeData: string | null = null;
let isConnected = false;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url || '/';

  // Rota: Status
  if (path.includes('/api/status')) {
    return res.json({
      status: isConnected ? 'connected' : 'disconnected',
      connected: isConnected,
      message: 'Vercel Serverless - Conexão pode ser instável'
    });
  }

  // Rota: QR Code
  if (path.includes('/api/qrcode')) {
    if (isConnected) {
      return res.json({
        status: 'connected',
        qr: null
      });
    }

    if (!sock) {
      try {
        await initBot();
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          error: 'Erro ao iniciar bot'
        });
      }
    }

    if (qrCodeData) {
      try {
        const qrImage = await qrcode.toDataURL(qrCodeData);
        return res.json({
          status: 'waiting',
          qr: qrImage
        });
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          error: 'Erro ao gerar QR Code'
        });
      }
    }

    return res.json({
      status: 'loading',
      qr: null,
      message: 'Aguarde... Iniciando bot'
    });
  }

  // Rota raiz: Retorna HTML
  return res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WhatsApp Delivery Bot - Vercel</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; margin-bottom: 10px; text-align: center; }
        .warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .error {
          background: #fee2e2;
          border-left: 4px solid #ef4444;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        #qrCode {
          text-align: center;
          margin: 30px 0;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #qrCode img { max-width: 100%; border-radius: 10px; }
        .status {
          text-align: center;
          padding: 10px;
          border-radius: 10px;
          margin: 20px 0;
          font-weight: bold;
        }
        .status.loading { background: #dbeafe; color: #1e40af; }
        .status.connected { background: #d1fae5; color: #065f46; }
        .status.error { background: #fee2e2; color: #991b1b; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>⚠️ WhatsApp Bot no Vercel</h1>

        <div class="error">
          <strong>IMPORTANTE:</strong> Vercel Serverless tem limitações severas para WhatsApp bots.
          Esta implementação é apenas para demonstração e <strong>NÃO FUNCIONA PARA PRODUÇÃO</strong>.
        </div>

        <div class="warning">
          <strong>Problemas esperados:</strong><br>
          • Bot desconecta após 60 segundos (timeout Vercel)<br>
          • Sessão não persiste entre deploys<br>
          • Precisa escanear QR Code constantemente<br>
          • Não recebe mensagens de forma confiável
        </div>

        <div id="status" class="status loading">
          ⏳ Carregando status...
        </div>

        <div id="qrCode">
          <p>Carregando QR Code...</p>
        </div>

        <div class="warning">
          <strong>Recomendação:</strong><br>
          Para produção, use Railway ($5/mês) ou Render (grátis).<br>
          Ambos funcionam muito melhor com WhatsApp bots!
        </div>
      </div>

      <script>
        async function checkStatus() {
          try {
            const res = await fetch('/api/status');
            const data = await res.json();
            const statusEl = document.getElementById('status');

            if (data.connected) {
              statusEl.className = 'status connected';
              statusEl.textContent = '✅ Conectado (temporariamente)';
              document.getElementById('qrCode').innerHTML = '<p style="color: #10b981; font-size: 1.5em;">✅ Bot conectado!</p>';
            } else {
              statusEl.className = 'status loading';
              statusEl.textContent = '⏳ Aguardando conexão...';
              getQRCode();
            }
          } catch (error) {
            document.getElementById('status').className = 'status error';
            document.getElementById('status').textContent = '❌ Erro ao verificar status';
          }
        }

        async function getQRCode() {
          try {
            const res = await fetch('/api/qrcode');
            const data = await res.json();

            if (data.qr) {
              document.getElementById('qrCode').innerHTML =
                '<img src="' + data.qr + '" alt="QR Code" />' +
                '<p style="margin-top: 20px;">Escaneie com WhatsApp</p>';
            } else if (data.status === 'connected') {
              document.getElementById('qrCode').innerHTML = '<p style="color: #10b981;">✅ Conectado!</p>';
            } else {
              document.getElementById('qrCode').innerHTML = '<p>' + (data.message || 'Carregando...') + '</p>';
            }
          } catch (error) {
            document.getElementById('qrCode').innerHTML = '<p style="color: #ef4444;">❌ Erro ao carregar QR Code</p>';
          }
        }

        // Check status every 3 seconds
        setInterval(checkStatus, 3000);
        checkStatus();
      </script>
    </body>
    </html>
  `);
}

async function initBot() {
  if (sock) return;

  const { state, saveCreds } = await useMultiFileAuthState('/tmp/auth_baileys');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: Browsers.ubuntu('Chrome')
  });

  sock.ev.on('connection.update', async (update: any) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrCodeData = qr;
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      isConnected = false;
      sock = null;
      if (shouldReconnect) {
        setTimeout(() => initBot(), 3000);
      }
    } else if (connection === 'open') {
      isConnected = true;
      qrCodeData = null;
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }: { messages: WAMessage[] }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe || m.key.remoteJid?.endsWith('@g.us')) return;

    // Resposta simples
    await sock.sendMessage(m.key.remoteJid!, {
      text: 'Olá! Este bot está rodando no Vercel Serverless (modo de demonstração). A conexão pode ser instável. Para produção, use Railway ou Render!'
    });
  });
}
