# 🚀 Deploy no Vercel - WhatsApp Bot com Baileys

## ✅ Projeto Migrado para Baileys

O bot foi **migrado de whatsapp-web.js para Baileys** para funcionar no Vercel.

**Baileys:**
- ✅ Usa WebSocket (não precisa de Chrome/Puppeteer)
- ✅ Leve (50 MB vs 600 MB)
- ✅ Funciona em serverless (com limitações)
- ⚠️ **Pode violar termos do WhatsApp** (use por sua conta e risco)

---

## 📋 Deploy no Vercel

### 1️⃣ Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2️⃣ Login no Vercel

```bash
vercel login
```

### 3️⃣ Deploy

```bash
vercel --prod
```

Ou via Dashboard:
1. Acesse https://vercel.com
2. Click "Add New..." → "Project"
3. Import repositório GitHub `botcomida`
4. Click "Deploy"

---

## ⚙️ Configuração

O projeto já está configurado com:
- ✅ `vercel.json` - Configuração de rotas
- ✅ `package.json` - Build scripts
- ✅ TypeScript build

**Variáveis de Ambiente no Vercel:**

Adicione no Dashboard do Vercel → Settings → Environment Variables:

| Nome | Valor |
|------|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `ENABLE_AI` | `false` |
| `RESTAURANT_NAME` | `Meu Delivery` |
| `RESTAURANT_PHONE` | `5511999999999` |

---

## ⚠️ LIMITAÇÕES IMPORTANTES

### Vercel Serverless tem limitações:

1. **Timeout de 60s** (Hobby) ou 300s (Pro)
   - Bot pode desconectar se demorar muito

2. **Sem armazenamento persistente**
   - Sessão do WhatsApp pode ser perdida
   - Precisa escanear QR Code frequentemente

3. **Função mata após cada request**
   - Bot precisa reconectar constantemente
   - Não é ideal para produção

---

## 🎯 Como Usar

1. **Acesse a URL do Vercel** (ex: `https://seu-bot.vercel.app`)
2. **QR Code aparece** (pode demorar 30-60s)
3. **Escanear com WhatsApp**
4. **Bot conecta** (por tempo limitado)

---

## 🚨 AVISOS

### ⚠️ Violação de Termos do WhatsApp

**Baileys NÃO é oficial.** Usar pode resultar em:
- ❌ Ban da conta do WhatsApp
- ❌ Bloqueio permanente
- ❌ Perda do número

**Use apenas para testes!** Para produção, use WhatsApp Business API oficial.

### ⚠️ Não Recomendado para Produção

Vercel Serverless **não é ideal** para WhatsApp bots porque:
- Precisa de conexão 24/7 (serverless não garante)
- Sessão é perdida frequentemente
- Bot fica offline quando não há requests

---

## 🔄 Alternativas Melhores

Para produção **real**, recomendo:

1. **Railway** ($5/mês) - Melhor custo-benefício
2. **Render** (Grátis/Pago) - Funciona bem
3. **VPS** (R$ 30-90/mês) - Mais estável

Todos funcionam com whatsapp-web.js (mais confiável que Baileys).

---

## 📊 Status Atual

- ✅ Código migrado para Baileys
- ✅ Build funcionando
- ✅ Pronto para deploy no Vercel
- ⚠️ **Use por sua conta e risco**

---

## 🆘 Problemas Comuns

### Bot desconecta toda hora
**Causa:** Vercel mata processo após timeout
**Solução:** Use Railway ou Render

### Sessão é perdida
**Causa:** Sem armazenamento persistente
**Solução:** Use plataforma com disco persistente

### WhatsApp bloqueou conta
**Causa:** Baileys viola termos do WhatsApp
**Solução:** Não tem, crie nova conta

---

**⚠️ IMPORTANTE: Este deploy é EXPERIMENTAL. Para produção, use Railway ou Render com whatsapp-web.js!**
