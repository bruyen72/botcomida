import type { VercelRequest, VercelResponse } from '@vercel/node';

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
      status: 'info',
      message: 'WhatsApp bots não funcionam de forma confiável no Vercel Serverless',
      recommendation: 'Use Railway ($5/mês) ou Render (grátis) para produção'
    });
  }

  // Rota raiz: Retorna HTML informativo
  return res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WhatsApp Delivery Bot - Informações</title>
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
          max-width: 700px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
          color: #667eea;
          margin-bottom: 20px;
          text-align: center;
          font-size: 2em;
        }
        h2 {
          color: #333;
          margin-top: 30px;
          margin-bottom: 15px;
          font-size: 1.3em;
        }
        p, li {
          line-height: 1.6;
          color: #555;
          margin-bottom: 10px;
        }
        .error {
          background: #fee2e2;
          border-left: 4px solid #ef4444;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .error h3 {
          color: #991b1b;
          margin-bottom: 10px;
        }
        .success {
          background: #d1fae5;
          border-left: 4px solid #10b981;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .success h3 {
          color: #065f46;
          margin-bottom: 10px;
        }
        .info {
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        ul {
          margin-left: 20px;
        }
        .cta {
          background: #10b981;
          color: white;
          padding: 15px 30px;
          border-radius: 10px;
          text-align: center;
          margin: 30px 0;
          font-weight: bold;
          font-size: 1.1em;
        }
        .cta a {
          color: white;
          text-decoration: none;
        }
        code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>⚠️ WhatsApp Bot no Vercel</h1>

        <div class="error">
          <h3>❌ Vercel Serverless NÃO é adequado para WhatsApp Bots</h3>
          <p><strong>Limitações técnicas que tornam impossível:</strong></p>
          <ul>
            <li><strong>Timeout de 10-60 segundos:</strong> Bot precisa estar conectado 24/7</li>
            <li><strong>Sem armazenamento persistente:</strong> Perde a sessão do WhatsApp constantemente</li>
            <li><strong>Função mata após cada request:</strong> WebSocket desconecta</li>
            <li><strong>Cold starts:</strong> Bot leva 30-60s para iniciar a cada request</li>
          </ul>
        </div>

        <h2>🔍 Por que você está vendo esta página?</h2>
        <p>
          Este projeto foi originalmente desenvolvido com <code>whatsapp-web.js</code> para plataformas
          com servidores persistentes. Foi migrado para <code>Baileys</code> na tentativa de funcionar
          no Vercel, mas as limitações da arquitetura serverless tornam isso impraticável.
        </p>

        <div class="warning">
          <h3>⚠️ Baileys também tem problemas:</h3>
          <ul>
            <li><strong>Viola termos do WhatsApp:</strong> Sua conta pode ser banida</li>
            <li><strong>Não é oficial:</strong> Pode parar de funcionar a qualquer momento</li>
            <li><strong>Menos estável:</strong> Mais bugs que whatsapp-web.js</li>
          </ul>
        </div>

        <h2>✅ Soluções que FUNCIONAM:</h2>

        <div class="success">
          <h3>1. Railway (RECOMENDADO) - $5/mês</h3>
          <ul>
            <li>✅ Bot fica online 24/7</li>
            <li>✅ QR Code em 5-10 segundos</li>
            <li>✅ Responde instantaneamente</li>
            <li>✅ Sessão persiste (não precisa escanear sempre)</li>
            <li>✅ Usa whatsapp-web.js (mais confiável)</li>
            <li>✅ Deploy automático do GitHub</li>
          </ul>
          <p><strong>Link:</strong> <a href="https://railway.app" target="_blank">railway.app</a></p>
        </div>

        <div class="info">
          <h3>2. Render - GRÁTIS (com limitações)</h3>
          <ul>
            <li>✅ Plano gratuito disponível</li>
            <li>✅ Funciona com whatsapp-web.js</li>
            <li>⚠️ Dorme após 15 min sem uso (plano free)</li>
            <li>⚠️ QR Code demora 30-60s para aparecer</li>
            <li>💰 Plano pago ($7/mês) resolve isso</li>
          </ul>
          <p><strong>Link:</strong> <a href="https://render.com" target="_blank">render.com</a></p>
        </div>

        <div class="info">
          <h3>3. VPS (Profissional) - R$ 30-90/mês</h3>
          <ul>
            <li>✅ Controle total</li>
            <li>✅ Máxima estabilidade</li>
            <li>✅ Escalável</li>
            <li>💡 Requer conhecimento técnico</li>
          </ul>
          <p><strong>Opções:</strong> DigitalOcean, Linode, Vultr, Contabo</p>
        </div>

        <h2>📂 Código do Projeto</h2>
        <p>
          O código completo está no GitHub e está pronto para deploy em Railway ou Render:
        </p>
        <div class="info">
          <p><strong>Repositório:</strong> <a href="https://github.com/bruyen72/botcomida" target="_blank">github.com/bruyen72/botcomida</a></p>
          <p>O código funciona perfeitamente em plataformas com servidores persistentes!</p>
        </div>

        <h2>🚀 Como migrar para Railway (5 minutos):</h2>
        <ol>
          <li>Acesse <a href="https://railway.app" target="_blank">railway.app</a></li>
          <li>Login com GitHub</li>
          <li>Click "New Project" → "Deploy from GitHub repo"</li>
          <li>Selecione <code>botcomida</code></li>
          <li>Adicione variáveis de ambiente (PORT, RESTAURANT_NAME, etc)</li>
          <li>Deploy automático! ✅</li>
        </ol>

        <div class="cta">
          🎯 Use Railway ou Render para seu bot funcionar de verdade!
        </div>

        <div class="warning">
          <p style="margin-bottom: 0;">
            <strong>Resumo:</strong> Vercel é excelente para sites e APIs stateless,
            mas não para aplicações que precisam de conexões persistentes como WhatsApp bots.
          </p>
        </div>
      </div>
    </body>
    </html>
  `);
}
