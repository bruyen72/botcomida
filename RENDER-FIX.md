# 🔧 COMO FAZER DEPLOY NO RENDER (CORRIGIDO)

## ✅ INSTRUÇÕES ATUALIZADAS

### 1. No Render Dashboard

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
node dist/server.js
```

### 2. Environment Variables

Adicione estas variáveis no Render:

```
PORT=3000
ENABLE_AI=false
RESTAURANT_NAME=Meu Delivery
RESTAURANT_PHONE=5511999999999
```

### 3. Deploy

- Click em **"Create Web Service"**
- Aguarde 3-5 minutos
- Acesse a URL fornecida

---

## 🎉 AGORA FUNCIONA!

O problema era:
- ❌ Caminho errado dos arquivos
- ❌ Pasta `public` não era copiada

Correção:
- ✅ Script `copy-public.js` copia arquivos
- ✅ Caminhos corretos no `server.ts`
- ✅ `render.yaml` configurado

---

## 📋 CHECKLIST RENDER

- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `node dist/server.js`
- [ ] Variável PORT: 3000
- [ ] Variável ENABLE_AI: false
- [ ] Variável RESTAURANT_NAME: seu nome
- [ ] Variável RESTAURANT_PHONE: seu telefone

✅ **Depois disso, vai funcionar!**

---

## 🚨 SE AINDA DER ERRO

### Ver Logs no Render:
1. Vá no dashboard
2. Click no serviço
3. Aba **"Logs"**
4. Veja o erro

### Problemas Comuns:

**Erro: Cannot find module**
- Solução: Verifique se `npm run build` foi executado

**Erro: Port already in use**
- Solução: Use `PORT=3000` nas variáveis

**Bot desconecta**
- Normal no plano grátis (dorme após 15min)
- Upgrade para plano pago resolve

---

## 💡 ALTERNATIVA: RAILWAY

Se Render não funcionar bem, use Railway:

1. https://railway.app
2. New Project → Deploy from GitHub
3. Adiciona variáveis automático
4. Funciona melhor que Render!

**Custo:** $5/mês (mais estável)
