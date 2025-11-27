# 🤖 BOT DE WHATSAPP PARA DELIVERY

Bot completo com interface web para mostrar QR Code e tutorial.

---

## 🚀 TESTAR LOCALMENTE (2 PASSOS)

```bash
npm install
npm run dev
```

Abra: **http://localhost:3000**

✅ Você verá a página com QR Code!

---

## ☁️ DEPLOY NA NUVEM

### ⚠️ VERCEL NÃO FUNCIONA!

**Por quê?**
- Vercel é serverless (máximo 10 segundos)
- Bot precisa rodar 24/7 conectado ao WhatsApp
- Após 10s, Vercel mata o processo
- Bot desconecta do WhatsApp

**Erro típico:** `404: NOT_FOUND` ou bot desconecta sozinho

---

## ✅ OPÇÃO 1: RAILWAY (MAIS FÁCIL!)

**Railway mantém o bot rodando 24/7!**

### Passo a Passo:

**1. Criar conta**
- Acesse: https://railway.app
- Login com GitHub

**2. Novo Projeto**
- Click em **"New Project"**
- Escolha **"Deploy from GitHub repo"**
- Selecione seu repositório `botcomida`

**OU subir direto (sem GitHub):**
- Click em **"New Project"**
- **"Empty Project"**
- **"Deploy"** → Arraste a pasta `botcomida`

**3. Configurar variáveis**
- No Railway, vá em **"Variables"**
- Adicione:
```
PORT=3000
ENABLE_AI=false
RESTAURANT_NAME=Meu Delivery
RESTAURANT_PHONE=5511999999999
```

**4. Deploy**
- Railway faz deploy automático
- Aguarde 2-3 minutos
- Click em **"Settings"** → **"Networking"** → **"Generate Domain"**

**5. Acessar**
- Você terá uma URL: `https://seu-bot.railway.app`
- Abra no navegador
- QR Code aparece!

**Custo:** $5/mês (primeiros $5 grátis!)

---

## ❌ OPÇÃO 2: RENDER (NÃO RECOMENDADO!)

**⚠️ Render NÃO funciona bem para bot WhatsApp!**

**Problemas:**
- ⚠️ Dorme após 15min sem uso
- ⚠️ Bot desconecta do WhatsApp
- ⚠️ Cliente precisa escanear QR Code toda hora
- ⚠️ Não mantém conexão estável

**Se ainda quiser tentar (não recomendamos):**
- Veja arquivo `SOLUCAO-RENDER.md` para detalhes
- Melhor usar Railway ou VPS!

---

## ✅ OPÇÃO 3: VPS (MELHOR PARA PRODUÇÃO)

**Para cliente profissional, use VPS!**

### Empresas com Nota Fiscal:

**Locaweb** - R$ 49-89/mês
- https://www.locaweb.com.br
- ✅ Nota fiscal
- ✅ Suporte em português

**Umbler** - R$ 29-89/mês
- https://www.umbler.com
- ✅ Nota fiscal
- ✅ Empresa brasileira

**DigitalOcean** - $6/mês (~R$ 30)
- https://www.digitalocean.com
- ✅ Invoice internacional
- ✅ Mais barato

### Deploy no VPS:

**1. Conectar**
```bash
ssh root@SEU_IP
```

**2. Instalar Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs chromium-browser git
npm install -g pm2
```

**3. Upload do bot**
```bash
cd /root
git clone https://github.com/seu-usuario/botcomida.git
cd botcomida
npm install
```

**4. Configurar**
```bash
nano .env
```
Cole:
```env
PORT=3000
ENABLE_AI=false
RESTAURANT_NAME=Meu Delivery
RESTAURANT_PHONE=5511999999999
```
Salve: **Ctrl+X** → **Y** → **Enter**

**5. Iniciar**
```bash
npm run build
pm2 start dist/server.js --name bot-delivery
pm2 startup
pm2 save
```

**6. Acessar**
```
http://SEU_IP:3000
```

**7. Abrir porta (firewall)**
```bash
ufw allow 3000/tcp
ufw enable
```

✅ **Bot rodando 24/7!**

---

## 📱 COMO USAR

### Para Você:
1. Acesse a URL do bot
2. Página mostra QR Code
3. Compartilhe tela com cliente

### Para o Cliente:
1. Abre WhatsApp no celular
2. **Menu** → **Aparelhos conectados**
3. **Conectar aparelho**
4. Escaneia o QR Code
5. Envia "oi" para testar

---

## 💬 EXEMPLO DE CONVERSA

```
Cliente: "oi"
Bot: "Olá! Bem-vindo ao Meu Delivery! 👋

MENU PRINCIPAL:
1️⃣ Ver cardápio
2️⃣ Ver meu carrinho
3️⃣ Fazer pedido
4️⃣ Acompanhar pedido
5️⃣ Falar com atendente
1️⃣1️⃣ Encerrar conversa"

Cliente: "1"
Bot: "📋 CARDÁPIO
1️⃣ 🍕 Pizzas
2️⃣ 🍔 Hambúrgueres
3️⃣ 🥤 Bebidas
4️⃣ 🍰 Sobremesas"

Cliente: "1"
Bot: "🍕 Pizzas
1. Pizza Margherita - R$ 45,90
2. Pizza Calabresa - R$ 49,90
..."

Cliente: "2"
Bot: "Quantas unidades?"

Cliente: "2"
Bot: "✅ 2x Pizza Calabresa adicionado!
Subtotal: R$ 99,80"
```

---

## 🎨 PERSONALIZAR CARDÁPIO

Edite `src/data/menu.ts`:

```typescript
export const menuItems: MenuItem[] = [
  {
    id: 'produto-001',
    name: 'Pizza Margherita',
    description: 'Molho de tomate...',
    price: 45.90,
    category: 'pizzas',
    available: true
  },
  // Adicione mais produtos
];
```

Depois:
```bash
npm run build
pm2 restart bot-delivery  # Se VPS
```

No Railway/Render: Commit e push no GitHub (deploy automático)

---

## 🔧 COMANDOS ÚTEIS (VPS)

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs bot-delivery

# Reiniciar
pm2 restart bot-delivery

# Parar
pm2 stop bot-delivery

# Atualizar
cd /root/botcomida
git pull
npm install
npm run build
pm2 restart bot-delivery
```

---

## 💰 CUSTOS COMPARADOS

| Opção | Custo/Mês | Nota Fiscal | Estabilidade | Recomendado |
|-------|-----------|-------------|--------------|-------------|
| **Vercel** | ❌ Grátis | Não | ❌ Não funciona | ❌ Não |
| **Render** | ⚠️ Grátis | Não | ⚠️ Dorme/desconecta | ❌ Não |
| **Railway** | $5 | Não | ✅ Excelente | ✅ **SIM!** |
| **Locaweb** | R$ 49-89 | ✅ Sim | ✅ Excelente | ✅ **SIM!** |
| **Umbler** | R$ 29-89 | ✅ Sim | ✅ Excelente | ✅ **SIM!** |
| **DigitalOcean** | $6 (~R$30) | Invoice | ✅ Excelente | ✅ Sim |

---

## ❓ QUAL ESCOLHER?

### Para Testar (você mesmo):
✅ **Localmente** (`npm run dev`)

### Para Demonstrar ao Cliente:
✅ **Railway** ou **Render** (rápido e fácil)

### Para Cliente Profissional:
✅ **VPS** (Locaweb/Umbler/DigitalOcean)
- Cliente quer nota fiscal? → Locaweb/Umbler
- Cliente quer barato? → DigitalOcean
- Cliente quer fácil? → Railway

---

## 🐛 PROBLEMAS COMUNS

### Bot desconecta sozinho
**Causa:** Está na Vercel
**Solução:** Migre para Railway/Render/VPS

### QR Code não aparece
```bash
# Ver logs
pm2 logs bot-delivery  # VPS

# Railway/Render: Ver logs no dashboard
```

### Página não abre
- Verifique se está rodando: `pm2 status`
- Verifique firewall: `ufw allow 3000/tcp`
- Railway/Render: Aguarde deploy terminar

### Bot funciona mas desconecta
- Verifique internet do celular
- WhatsApp Web deve estar conectado
- Não feche WhatsApp no celular

---

## ✅ FUNCIONALIDADES

- ✅ Interface web com QR Code
- ✅ Tutorial passo a passo
- ✅ Status em tempo real
- ✅ Menu interativo (1-5, 11)
- ✅ Carrinho de compras
- ✅ Checkout completo
- ✅ Reconhece palavras
- ✅ IA opcional (OpenAI)
- ✅ Encerrar conversa (11)

---

## 📁 ESTRUTURA

```
botcomida/
├── public/              # Interface web
│   ├── index.html       # Página QR Code
│   ├── style.css        # Estilos
│   └── script.js        # Lógica
├── src/
│   ├── server.ts        # Express + Bot
│   ├── handlers/        # Lógica do bot
│   ├── services/        # Serviços
│   └── data/menu.ts     # Cardápio
├── railway.json         # Config Railway
├── Procfile             # Config Render
└── README.md            # Este arquivo
```

---

## 🎉 RESUMO

### ❌ NÃO USE:
- **Vercel** (não funciona, erro 404)

### ✅ USE:
- **Railway** - Fácil, $5/mês, estável
- **Render** - Grátis, dorme após 15min
- **VPS** - Profissional, nota fiscal, estável

### 🚀 COMECE AGORA:
```bash
npm run dev
# Abra http://localhost:3000
```

**Funciona perfeitamente local!** 🎊

Para deploy, escolha Railway ou VPS seguindo as instruções acima!
