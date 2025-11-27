const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const publicSrc = path.join(__dirname, '..', 'public');
const publicDest = path.join(__dirname, '..', 'dist', 'public');

console.log('Copiando arquivos públicos...');
copyDir(publicSrc, publicDest);
console.log('✅ Arquivos públicos copiados com sucesso!');
