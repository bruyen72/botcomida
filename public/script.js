// Configuração
const API_URL = '/api/qrcode';
const STATUS_URL = '/api/status';

// Elementos DOM
const qrContainer = document.getElementById('qrContainer');
const qrCanvas = document.getElementById('qrCanvas');
const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');

// Estado
let checkInterval = null;

// Iniciar quando página carregar
window.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada, iniciando bot...');
    checkStatus();
    startStatusCheck();
});

// Buscar QR Code
async function getQRCode() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.qr) {
            // Mostrar QR Code
            qrContainer.style.display = 'none';
            qrCanvas.innerHTML = `<img src="${data.qr}" alt="QR Code" />`;
            updateStatus('waiting', 'Aguardando escaneamento...');
        } else if (data.status === 'connected') {
            // Já conectado
            qrContainer.style.display = 'none';
            qrCanvas.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <h3 style="color: #10b981; font-size: 2em;">✅</h3>
                    <h3 style="color: #10b981;">Conectado!</h3>
                    <p style="margin-top: 10px; color: #666;">Bot está online e pronto para uso</p>
                </div>
            `;
            updateStatus('connected', '✅ Conectado');
        } else {
            // Erro ou gerando
            showLoading();
            setTimeout(getQRCode, 2000);
        }
    } catch (error) {
        console.error('Erro ao buscar QR Code:', error);
        showError();
        setTimeout(getQRCode, 5000);
    }
}

// Verificar status do bot
async function checkStatus() {
    try {
        const response = await fetch(STATUS_URL);
        const data = await response.json();

        if (data.status === 'connected') {
            // Bot conectado
            qrContainer.style.display = 'none';
            qrCanvas.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <h3 style="color: #10b981; font-size: 2em;">✅</h3>
                    <h3 style="color: #10b981;">Conectado!</h3>
                    <p style="margin-top: 10px; color: #666;">Bot está online e pronto</p>
                    <p style="margin-top: 10px; color: #667eea; font-weight: 600;">Envie "oi" para testar!</p>
                </div>
            `;
            updateStatus('connected', '✅ Conectado');
        } else if (data.status === 'loading') {
            // Bot iniciando
            showLoading();
            updateStatus('waiting', '⏳ Iniciando bot...');
            setTimeout(checkStatus, 3000);
        } else {
            // Precisa escanear QR
            getQRCode();
        }
    } catch (error) {
        console.error('Erro ao verificar status:', error);
        showError();
        setTimeout(checkStatus, 5000);
    }
}

// Verificar status periodicamente
function startStatusCheck() {
    checkInterval = setInterval(() => {
        checkStatus();
    }, 10000); // Verifica a cada 10 segundos
}

// Mostrar loading
function showLoading() {
    qrContainer.style.display = 'flex';
    qrCanvas.innerHTML = '';
    updateStatus('waiting', '⏳ Carregando...');
}

// Mostrar erro
function showError() {
    qrContainer.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #ef4444;">❌ Erro</h3>
            <p style="margin-top: 10px; color: #666;">Não foi possível conectar</p>
            <p style="margin-top: 5px; color: #666;">Tentando novamente...</p>
        </div>
    `;
    updateStatus('disconnected', '❌ Erro de conexão');
}

// Atualizar status
function updateStatus(type, text) {
    statusBadge.className = `status-badge ${type}`;
    statusText.textContent = text;
}

// Limpar interval quando sair da página
window.addEventListener('beforeunload', () => {
    if (checkInterval) {
        clearInterval(checkInterval);
    }
});
