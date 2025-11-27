module.exports = (req, res) => {
  return res.status(200).send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>WhatsApp Bot - Vercel Info</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:20px;display:flex;align-items:center;justify-content:center}
.container{background:#fff;border-radius:20px;padding:40px;max-width:700px;box-shadow:0 20px 60px rgba(0,0,0,.3)}
h1{color:#667eea;text-align:center;margin-bottom:20px}
.error{background:#fee2e2;border-left:4px solid #ef4444;padding:15px;margin:15px 0;border-radius:5px}
.success{background:#d1fae5;border-left:4px solid #10b981;padding:15px;margin:15px 0;border-radius:5px}
a{color:#3b82f6;text-decoration:none}
ul{margin:10px 0 10px 20px}
li{margin:5px 0}
</style>
</head>
<body>
<div class="container">
<h1>⚠️ Vercel + WhatsApp Bot</h1>
<div class="error">
<h3>❌ Não funciona no Vercel</h3>
<p>Limitações do Serverless:</p>
<ul>
<li>Timeout 60 segundos</li>
<li>Sem armazenamento persistente</li>
<li>Conexão não mantida 24/7</li>
</ul>
</div>
<div class="success">
<h3>✅ Soluções que funcionam:</h3>
<p><strong>Railway</strong> - $5/mês (Recomendado)</p>
<ul>
<li>Bot online 24/7</li>
<li>QR Code rápido</li>
<li>Deploy automático GitHub</li>
</ul>
<p><a href="https://railway.app" target="_blank">→ railway.app</a></p>
<hr style="margin:15px 0">
<p><strong>Render</strong> - Grátis</p>
<ul>
<li>Plano free disponível</li>
<li>Funciona (mais lento)</li>
</ul>
<p><a href="https://render.com" target="_blank">→ render.com</a></p>
</div>
<h2>Deploy em 5 minutos:</h2>
<ol>
<li>Acesse railway.app</li>
<li>Login com GitHub</li>
<li>New Project → Deploy from GitHub</li>
<li>Selecione: <code>botcomida</code></li>
<li>Pronto! ✅</li>
</ol>
<p style="text-align:center;margin-top:30px">
<strong>Código:</strong><br>
<a href="https://github.com/bruyen72/botcomida">github.com/bruyen72/botcomida</a>
</p>
</div>
</body>
</html>`);
};
