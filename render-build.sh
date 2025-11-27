#!/bin/bash

# Render Build Script para Puppeteer/WhatsApp-Web.js
# Instala dependências necessárias para o bot

set -e

echo "🔧 Iniciando build para Render..."

# Instalar dependências do Chrome/Chromium
echo "📦 Instalando dependências do sistema..."
apt-get update -qq
apt-get install -y -qq \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libpangocairo-1.0-0 \
  libgtk-3-0 > /dev/null 2>&1

# Instalar dependências do Node
echo "📦 Instalando dependências NPM..."
npm install

# Build do TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

echo "✅ Build concluído com sucesso!"
