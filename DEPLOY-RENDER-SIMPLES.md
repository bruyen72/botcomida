# 🚀 DEPLOY NO RENDER - GUIA SIMPLES

## ✅ PASSO A PASSO (5 MINUTOS)

### 1️⃣ PUSH PARA O GITHUB

```bash
git add .
git commit -m "Bot pronto para Render"
git push
```

### 2️⃣ NO RENDER.COM

**A. Criar Web Service** (NÃO Static Site!)
1. Acesse: https://render.com
2. Login com GitHub
3. Click em **"New +"** → **"Web Service"**
4. Conecte seu repositório

**B. Configurar**

**Build Command:**
```
bash render-build.sh
```

**Start Command:**
```
node dist/server.js
```

**C. Environment Variables**

Adicione estas variáveis (click em "Add Environment Variable"):

| KEY | VALUE |
|-----|-------|
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `ENABLE_AI` | `false` |
| `RESTAURANT_NAME` | `Meu Delivery` |
| `RESTAURANT_PHONE` | `5511999999999` |

**D. Create Web Service**
- Click no botão azul "Create Web Service"
- Aguarde 5-10 minutos

### 3️⃣ ACESSAR

Quando terminar o build:
- Acesse a URL: `https://seu-bot.onrender.com`
- Página com QR Code deve aparecer!
- Escaneie com WhatsApp

✅ **PRONTO!**

---

## ⚠️ IMPORTANTE

**Render FREE dorme após 15min sem uso**
- Bot pode desconectar do WhatsApp
- Solução: Use plano pago ($7/mês)
- OU configure ping externo (cron-job.org)

**Para produção estável 24/7:**
- ✅ Railway ($5/mês) - Mais fácil
- ✅ VPS (R$ 29-89/mês) - Profissional

---

## 🐛 SE DER ERRO

### Erro de build
**Ver logs:** Aba "Logs" no Render

### "Could not find Chromium"
**Solução:** whatsapp-web.js já vem com Chrome, deve funcionar

### Bot não conecta
**Verificar:**
1. Build completou sem erros
2. Start command está correto
3. Todas variáveis foram adicionadas

### Página "Not Found"
**Causa:** Criou como Static Site
**Solução:** Delete e crie como Web Service

---

## 🎯 CHECKLIST

- [ ] Push para GitHub
- [ ] Render → New → **Web Service** (não Static!)
- [ ] Build: `bash render-build.sh`
- [ ] Start: `node dist/server.js`
- [ ] Variáveis adicionadas (PORT, NODE_ENV, etc)
- [ ] Create Web Service
- [ ] Aguardar build (5-10 min)
- [ ] Acessar URL
- [ ] QR Code aparece
- [ ] Escanear e testar

✅ **FEITO!**
