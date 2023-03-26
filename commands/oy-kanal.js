const fs = require('fs');
const { EmbedBuilder, BitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'oy-kanal',
  description: 'Oy kanalını ayarlar',
  execute(message, args) {
    const channel = message.mentions.channels.first();
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return message.reply('Bu komutu sadece **ADMINISTRATOR** yetkisine sahip olan kişiler kullanabilir!');
    }
    if (!channel) return message.channel.send('Lütfen bir kanal etiketleyin!');

    let database = {};
    if (fs.existsSync('./database.json')) {
      database = JSON.parse(fs.readFileSync('./database.json'));
    } else {
      database.db = [];
    }

    const serverIndex = database.db.findIndex(server => server.serverID === message.guild.id);
    if (serverIndex === -1) {
      database.db.push({
        serverID: message.guild.id,
        voteChannel: channel.id,
        votes: []
      });
      message.channel.send(`<:4974discordcreatecategorywhite:1087445344796815472> Oy kanalı ${channel} olarak ayarlandı!`);
    } else {
      database.db[serverIndex].voteChannel = channel.id;
      message.channel.send(`<:4974discordcreatecategorywhite:1087445344796815472> Oy kanalı ${channel} olarak güncellendi!`);
    }

    fs.writeFileSync('./database.json', JSON.stringify(database));
  }
};