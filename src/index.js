const RPC = require('discord-rpc');
const config = require('./config');
const readline = require('readline');

function esperarParaFechar() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n--------------------------------------------------');
  rl.question('Pressione [ENTER] para fechar esta janela...', () => {
    rl.close();
    process.exit(1);
  });
}

if (!config.clientId) {
  console.error('\x1b[31m%s\x1b[0m', '[ERRO CRÍTICO] Client ID não encontrado!');
  console.error('Verifique o arquivo src/config.js e insira seu ID.');
  esperarParaFechar();
  return;
}

const client = new RPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();
let activityIndex = 0;

async function setActivity() {
  if (!client || !client.user) return;

  const activity = config.activities[activityIndex];

  try {
    await client.setActivity({
      details: activity.details,
      state: activity.state,
      startTimestamp,
      largeImageKey: config.images.largeImageKey,
      largeImageText: config.images.largeImageText,
      smallImageKey: config.images.smallImageKey,
      smallImageText: config.images.smallImageText,
      instance: false,
      partySize: activity.partySize,
      partyMax: activity.partyMax,
      buttons: [
        { label: "Ver Trailer", url: "https://www.youtube.com/watch?v=QdBZY2fkU-0" },
        { label: "Pré-Venda", url: "https://www.rockstargames.com/VI" }
      ]
    });

    console.log(`[RPC] Status Atualizado: ${activity.details} | ${activity.state}`);
  } catch (error) {
    console.error('[RPC] Erro ao atualizar status:', error);
  }

  activityIndex = (activityIndex + 1) % config.activities.length;
}

client.on('ready', () => {
  console.log('--------------------------------------------------');
  console.log(`✅ SUCESSO! Conectado como: ${client.user.username}`);
  console.log('   Minimize esta janela para continuar mostrando o status.');
  console.log('--------------------------------------------------');
  
  setActivity();

  setInterval(() => {
    setActivity();
  }, config.updateInterval);
});

client.on('disconnected', () => {
    console.log('[RPC] Desconectado! O Discord foi fechado?');
    console.log('Tentando reconectar em 10 segundos...');
    setTimeout(() => login(), 10000);
});

async function login() {
    try {
        await client.login({ clientId: config.clientId });
    } catch (err) {
        console.error('\n[ERRO] Não foi possível conectar ao Discord.');
        console.error('MOTIVO:', err.message);
        console.log('DICA: O aplicativo do Discord está aberto neste PC?');
        
        setTimeout(login, 15000); 
    }
}

console.log('Iniciando Project Vice...');
console.log('Procurando Discord...');
login();