module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  res.status(200).send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WhatsApp Bot - Vercel não suporta</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 700px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #667eea;
      margin-bottom: 20px;
      text-align: center;
    }
    .error {
      background: #fee2e2;
      border-left: 4px solid #ef4444;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .success {
      background: #d1fae5;
      border-left: 4px solid #10b981;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info {
      background: #dbeafe;
      border-left: 4px solid #3b82f6;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    ul { margin: 10px 0 10px 20px; }
    li { margin: 5px 0; }
    a { color: #3b82f6; }
    .cta {
      background: #10b981;
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin: 30px 0;
      font-weight: bold;
      font-size: 1.2em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>  Vercel + WhatsApp Bot = L</h1>

    <div class="error">
      <h3>L Por que NÃO funciona no Vercel:</h3>
      <ul>
        <li><strong>Timeout 60s:</strong> Bot precisa conexão 24/7</li>
        <li><strong>Sem disco:</strong> Perde sessão do WhatsApp</li>
        <li><strong>Serverless:</strong> Mata processo após cada request</li>
        <li><strong>Cold start:</strong> Demora 30-60s toda vez</li>
      </ul>
    </div>

    <h2> Onde FUNCIONA:</h2>

    <div class="success">
      <h3>1. Railway - $5/mês (RECOMENDADO)</h3>
      <ul>
        <li> Online 24/7</li>
        <li> QR Code em 10 segundos</li>
        <li> Sessão persiste</li>
        <li> Deploy automático GitHub</li>
      </ul>
      <p><strong>Link:</strong> <a href="https://railway.app">railway.app</a></p>
    </div>

    <div class="info">
      <h3>2. Render - GRÁTIS</h3>
      <ul>
        <li> Plano gratuito</li>
        <li>  Dorme após 15 min (free)</li>
        <li>  QR Code demora 30-60s</li>
        <li>=° Pago $7/mês funciona bem</li>
      </ul>
      <p><strong>Link:</strong> <a href="https://render.com">render.com</a></p>
    </div>

    <h2>=€ Como usar Railway (5 min):</h2>
    <ol>
      <li>Acesse <a href="https://railway.app">railway.app</a></li>
      <li>Login com GitHub</li>
      <li>New Project ’ Deploy from GitHub</li>
      <li>Selecione repositório <code>botcomida</code></li>
      <li>Adicione variáveis ambiente</li>
      <li>Deploy automático </li>
    </ol>

    <div class="cta">
      <¯ Use Railway ou Render!<br>
      Seu código já está pronto!
    </div>

    <div class="info">
      <p><strong>Repositório GitHub:</strong><br>
      <a href="https://github.com/bruyen72/botcomida">github.com/bruyen72/botcomida</a></p>
      <p>O código funciona perfeitamente em Railway/Render!</p>
    </div>
  </div>
</body>
</html>
  `);
};
