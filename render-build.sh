#!/bin/bash

# Render Build Script para Puppeteer/WhatsApp-Web.js
# Instala dependências necessárias para o bot

set -e

echo "🔧 Iniciando build para Render..."

# Instalar dependências do Node
echo "📦 Instalando dependências NPM..."
npm install

# Build do TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

echo "✅ Build concluído com sucesso!"
