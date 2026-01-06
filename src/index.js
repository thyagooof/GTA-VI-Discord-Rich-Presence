const RPC = require('discord-rpc');
const config = require('./config');

// Verificação de Segurança
if (!config.clientId) {
  console.error('\x1b[31m%s\x1b[0m', '[ERRO] CLIENT_ID não encontrado!');
  console.error('Certifique-se de ter criado o arquivo .env com seu ID.');
  process.exit(1);
}

const client = new RPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();
let activityIndex = 0;

// Função que define a atividade no Discord
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

    console.log(`[RPC] Atualizado: ${activity.details} | ${activity.state}`);
  } catch (error) {
    console.error('[RPC] Erro ao atualizar:', error);
  }

  // Passa para a próxima atividade da lista
  activityIndex = (activityIndex + 1) % config.activities.length;
}

client.on('ready', () => {
  console.log('--------------------------------------------------');
  console.log(`✅ Conectado ao Discord como: ${client.user.username}`);
  console.log('--------------------------------------------------');
  
  setActivity();

  // Loop de atualização
  setInterval(() => {
    setActivity();
  }, config.updateInterval);
});

// Tratamento de desconexão (ex: fechou o Discord)
client.on('disconnected', () => {
    console.log('[RPC] Desconectado! Tentando reconectar em 10s...');
    setTimeout(() => login(), 10000);
});

async function login() {
    try {
        await client.login({ clientId: config.clientId });
    } catch (err) {
        console.error('[RPC] Aguardando Discord iniciar...');
        setTimeout(login, 15000); 
    }
}

// Inicia o processo
login();