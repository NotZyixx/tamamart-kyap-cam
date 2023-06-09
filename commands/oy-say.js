const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'oy-say',
  description: 'Sunucudaki toplam oy sayısını ve oy veren kullanıcıların listesini gösterir.',
  execute(message, args) {
    let database = {};
    if (fs.existsSync('./database.json')) {
      database = JSON.parse(fs.readFileSync('./database.json'));
    } else {
      database.db = [];
    }
    const serverIndex = database.db.findIndex(server => server.serverID === message.guild.id);
    if (serverIndex === -1 || !database.db[serverIndex].serverVotePoints) {
      return message.reply('Bu sunucuda hiç oy kullanılmadığından yardımcı olamıyorum!');
    }
      message.reply(`<:4388logmsgorthreadplusd:1087456909583462560> **${message.author.tag}**, **${message.guild.name}** adlı sunucuda toplamda **${database.db[serverIndex].serverVotePoints}** oy bulundu.`);
  }
};