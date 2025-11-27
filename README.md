# 🤖 BOT DE WHATSAPP PARA DELIVERY

Bot completo de WhatsApp com **interface web** para mostrar QR Code, tutorial e demonstração.

---

## ✨ NOVIDADE: INTERFACE WEB!

Agora o bot tem uma **página web bonita** que mostra:
- ✅ QR Code para escanear
- ✅ Status da conexão (conectado/desconectado)
- ✅ Tutorial passo a passo de como usar
- ✅ Demonstração do menu do bot
- ✅ Dicas de uso

---

## 🚀 TESTAR AGORA (3 PASSOS)

### 1. Instalar
```bash
npm install
```

### 2. Iniciar
```bash
npm run dev
```

### 3. Abrir no Navegador
```
http://localhost:3000
```

✅ **Pronto! Você verá uma página bonita com o QR Code!**

---

## 📱 COMO FUNCIONA

### Para Você (Administrador):
1. Execute `npm run dev`
2. Abra `http://localhost:3000` no navegador
3. Mostre a tela para o cliente

### Para o Cliente:
1. Abre WhatsApp no celular
2. Vai em **Menu** → **Aparelhos conectados**
3. Toca em **Conectar aparelho**
4. Escaneia o QR Code na sua tela
5. Pronto! Envia "oi" para testar

---

## 🎨 INTERFACE WEB

A página mostra:

```
┌─────────────────────────────────────┐
│     🤖 Bot de Delivery              │
│   Escaneie o QR Code para conectar  │
├─────────────────────────────────────┤
│                                     │
│     [  QR CODE AQUI  ]              │
│     Status: ⏳ Aguardando...        │
│                                     │
├─────────────────────────────────────┤
│   📱 Como Conectar                  │
│   1️⃣ Abra o WhatsApp                │
│   2️⃣ Aparelhos conectados           │
│   3️⃣ Conectar aparelho              │
│   4️⃣ Escaneie o QR Code             │
├─────────────────────────────────────┤
│   💬 Como Usar o Bot                │
│   Você: "oi"                        │
│   Bot: Menu com opções 1-5 e 11    │
│   Você: "1"                         │
│   Bot: Cardápio com categorias...  │
└─────────────────────────────────────┘
```

---

## ☁️ DEPLOY NA VERCEL

### ⚠️ LIMITAÇÃO DA VERCEL

A Vercel **funciona parcialmente**:
- ✅ Página web funciona
- ✅ QR Code aparece
- ⚠️ Bot pode desconectar após 10 segundos sem mensagem
- ❌ Não é ideal para produção 24/7

### Para Deploy Simples (Teste):

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Seguir instruções na tela
```

Você receberá uma URL tipo: `https://seu-bot.vercel.app`

### ✅ MELHOR OPÇÃO: VPS

Para bot funcionar 24/7 sem cair, use VPS:

**Opções com nota fiscal:**
- **Locaweb** - R$ 49-89/mês - https://www.locaweb.com.br
- **Umbler** - R$ 29-89/mês - https://www.umbler.com

**Opção barata:**
- **DigitalOcean** - $6/mês (~R$ 30) - https://www.digitalocean.com
- **Railway** - $5/mês - https://railway.app

---

## 📦 DEPLOY NO VPS (RECOMENDADO)

### 1. Contratar VPS
- Sistema: Ubuntu 20.04 ou 22.04
- Mínimo: 2GB RAM, 2 vCPU

### 2. Conectar via SSH
```bash
ssh root@SEU_IP
```

### 3. Instalar Dependências
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Chrome e dependências
apt-get install -y chromium-browser git
apt-get install -y gconf-service libasound2 libatk1.0-0 libcups2 \
  libdbus-1-3 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libnss3 \
  libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxrandr2 \
  libxss1 fonts-liberation

# PM2
npm install -g pm2
```

### 4. Upload do Bot
**Via Git:**
```bash
cd /root
git clone https://github.com/seu-usuario/botcomida.git
cd botcomida
```

**Via WinSCP:**
1. Baixe: https://winscp.net
2. Conecte no IP do servidor
3. Arraste a pasta `botcomida`

### 5. Configurar e Iniciar
```bash
cd /root/botcomida

# Instalar
npm install

# Configurar .env
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

```bash
# Compilar
npm run build

# Iniciar com PM2
pm2 start dist/server.js --name bot-delivery

# Auto-start
pm2 startup
pm2 save
```

### 6. Acessar
```
http://SEU_IP:3000
```

Mostre essa URL para o cliente escanear o QR Code!

---

## 🔧 COMANDOS ÚTEIS

### Ver Status
```bash
pm2 status
```

### Ver Logs
```bash
pm2 logs bot-delivery
```

### Reiniciar
```bash
pm2 restart bot-delivery
```

### Atualizar Bot
```bash
cd /root/botcomida
git pull
npm install
npm run build
pm2 restart bot-delivery
```

---

## 🎨 PERSONALIZAR CARDÁPIO

Edite `src/data/menu.ts`:

```typescript
export const menuItems: MenuItem[] = [
  {
    id: 'produto-001',
    name: 'Pizza Margherita',
    description: 'Molho, queijo...',
    price: 45.90,
    category: 'pizzas',
    available: true
  },
  // Adicione mais...
];
```

Depois:
```bash
npm run build
pm2 restart bot-delivery
```

---

## 📱 ENTREGAR PARA O CLIENTE

### 1. Compartilhar Tela
- Mostre a página web: `http://seu-servidor:3000`
- Cliente vê o QR Code

### 2. Cliente Escaneia
- Abre WhatsApp
- Vai em **Aparelhos conectados**
- Escaneia o QR Code

### 3. Testar Junto
- Cliente envia "oi" para o bot
- Bot responde com menu
- Fazem um pedido teste

✅ **Pronto!**

---

## 💬 EXEMPLO DE USO

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
     2. Pizza Calabresa - R$ 49,90..."

Cliente: "2"
Bot: "Pizza Calabresa
     Quantas unidades deseja?"

Cliente: "2"
Bot: "✅ 2x Pizza Calabresa adicionado!"
```

---

## 🐛 PROBLEMAS COMUNS

### QR Code não aparece
```bash
# Ver logs
pm2 logs bot-delivery

# Aguardar 60 segundos
# Atualizar página no navegador
```

### Bot desconectou
```bash
pm2 restart bot-delivery
# Atualizar página
# Escanear QR Code novamente
```

### Página não abre
```bash
# Verificar se está rodando
pm2 status

# Verificar porta
netstat -tulpn | grep 3000

# Firewall (se VPS)
ufw allow 3000/tcp
```

---

## 💰 CUSTOS

### VPS (Produção 24/7)
- **Servidor:** R$ 49-89/mês
- **IA (opcional):** R$ 20-50/mês
- **Total:** R$ 49-139/mês

### Vercel (Teste)
- **Grátis** mas bot pode cair
- Não recomendado para produção

---

## ✅ FUNCIONALIDADES

- ✅ Interface web com QR Code
- ✅ Tutorial visual
- ✅ Menu interativo (1-5, 11)
- ✅ Carrinho de compras
- ✅ Checkout completo
- ✅ Reconhece palavras ("oi", "menu")
- ✅ IA opcional (OpenAI)
- ✅ Encerrar conversa (11)

---

## 📁 ESTRUTURA

```
botcomida/
├── public/              # Interface web
│   ├── index.html       # Página principal
│   ├── style.css        # Estilos
│   └── script.js        # Lógica frontend
├── src/
│   ├── server.ts        # Servidor Express + Bot
│   ├── handlers/        # Lógica do bot
│   ├── services/        # Serviços
│   └── data/menu.ts     # Cardápio
├── dist/                # Compilado
└── vercel.json          # Config Vercel
```

---

## 🎉 ESTÁ PRONTO!

Execute:
```bash
npm run dev
```

Abra:
```
http://localhost:3000
```

Veja a página bonita com o QR Code! 🚀
