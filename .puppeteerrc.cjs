const { join } = require('path');

/**
 * Configuração do Puppeteer para Render.com
 * Define o diretório de cache dentro do projeto
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
