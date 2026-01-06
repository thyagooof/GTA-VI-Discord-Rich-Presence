require('dotenv').config();

module.exports = {
  // Pega o ID do arquivo .env. Se não achar, fica undefined (e o index.js vai avisar)
  clientId: process.env.CLIENT_ID, 
  
  // Nomes EXATOS das imagens que você upou no Developer Portal
  images: {
    largeImageKey: 'large_logo',     // Sua imagem grande
    largeImageText: 'Grand Theft Auto VI',
    smallImageKey: 'lucia_jason',    // Sua imagem pequena
    smallImageText: 'Lucia & Jason'
  },

  // Lista de atividades que ficarão rotacionando
  activities: [
    {
      details: 'Explorando Vice City',
      state: 'Modo Livre',
      partySize: 1,
      partyMax: 4
    },
    {
      details: 'Fugindo da Polícia',
      state: 'Nível de Procurado: ⭐⭐⭐⭐⭐',
      partySize: 1,
      partyMax: 1
    },
    {
      details: 'Missão: The Long Stretch',
      state: 'Leonida - Região Sul',
      partySize: 2,
      partyMax: 4
    },
    {
      details: 'Relaxando no Malibu Club',
      state: 'Ouvindo: Flash FM',
      partySize: 3,
      partyMax: 4
    }
  ],
  
  // Tempo em milissegundos para mudar o status (15 segundos)
  updateInterval: 15000 
};