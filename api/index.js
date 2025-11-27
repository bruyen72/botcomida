export default function handler(request, response) {
  response.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WhatsApp Bot - Info</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    .box {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 700px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { color: #667eea; text-align: center; }
    .error { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 15px 0; }
    .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
  <div class="box">
    <h1>⚠️ Vercel + WhatsApp = ❌</h1>

    <div class="error">
      <h3>Por que NÃO funciona no Vercel:</h3>
      <ul>
        <li>Timeout 60s (bot precisa 24/7)</li>
        <li>Sem disco persistente</li>
        <li>Serverless mata processo</li>
      </ul>
    </div>

    <div class="success">
      <h3>✅ Onde FUNCIONA:</h3>
      <p><strong>Railway</strong> - $5/mês (RECOMENDADO)</p>
      <ul>
        <li>Online 24/7</li>
        <li>QR Code rápido</li>
        <li>Deploy GitHub automático</li>
      </ul>
      <p><a href="https://railway.app">→ railway.app</a></p>

      <p><strong>Render</strong> - Grátis</p>
      <ul>
        <li>Plano free disponível</li>
        <li>Funciona (mais lento)</li>
      </ul>
      <p><a href="https://render.com">→ render.com</a></p>
    </div>

    <h2>Como usar (5 min):</h2>
    <ol>
      <li>Acesse railway.app</li>
      <li>Login GitHub</li>
      <li>New Project → GitHub repo</li>
      <li>Selecione: botcomida</li>
      <li>Deploy automático ✅</li>
    </ol>

    <p style="text-align: center; margin-top: 30px;">
      <strong>Código GitHub:</strong><br>
      <a href="https://github.com/bruyen72/botcomida">github.com/bruyen72/botcomida</a>
    </p>
  </div>
</body>
</html>
  `);
}
