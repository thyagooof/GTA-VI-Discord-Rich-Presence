require('dotenv').config();

module.exports = {

  clientId: process.env.CLIENT_ID || '1456634574854688994', 
  
  images: {
    largeImageKey: 'large_logo',
    largeImageText: 'Grand Theft Auto VI',
    smallImageKey: 'lucia_jason',
    smallImageText: 'Lucia & Jason'
  },

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

  updateInterval: 15000
};