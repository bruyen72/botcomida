#!/bin/bash

# Render Build Script para Puppeteer/WhatsApp-Web.js
# Gerencia cache do Chromium entre builds

set -e

echo "🔧 Iniciando build para Render..."

# Definir diretórios
CACHE_DIR="/opt/render/.cache/puppeteer"
PROJECT_CACHE_DIR="$HOME/.cache/puppeteer"

# Criar diretório de cache se não existir
mkdir -p "$PROJECT_CACHE_DIR"

# Se existe cache anterior, copiar
if [ -d "$CACHE_DIR" ]; then
    echo "📦 Restaurando cache do Chromium..."
    cp -r "$CACHE_DIR"/* "$PROJECT_CACHE_DIR/" || true
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Instalar Puppeteer e Chrome
echo "🌐 Instalando Chromium..."
npx puppeteer browsers install chrome

# Build do TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

# Salvar cache para próximos builds
echo "💾 Salvando cache do Chromium..."
mkdir -p "$CACHE_DIR"
cp -r "$PROJECT_CACHE_DIR"/* "$CACHE_DIR/" || true

echo "✅ Build concluído com sucesso!"
