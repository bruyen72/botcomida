#!/bin/bash

# Render Build Script para Puppeteer/WhatsApp-Web.js
# Gerencia cache do Puppeteer entre deploys

set -e

echo "🔧 Iniciando build para Render..."

# Criar diretório de cache do Puppeteer
echo "📂 Configurando cache do Puppeteer..."
mkdir -p .cache/puppeteer

# Copiar cache do Puppeteer do build anterior (se existir)
if [ -d "/opt/render/project/.cache/puppeteer" ]; then
  echo "♻️ Restaurando cache do Puppeteer..."
  cp -r /opt/render/project/.cache/puppeteer .cache/ || true
fi

# Instalar dependências do Node
echo "📦 Instalando dependências NPM..."
npm install

# Instalar Chrome via Puppeteer
echo "🌐 Instalando Chrome..."
npx puppeteer browsers install chrome || true

# Build do TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

echo "✅ Build concluído com sucesso!"
