const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(NzUwOTQ1NDU5NTk3NjA2OTMz.X1B6dQ.Tf4V9EhKhFFGOoipPw4nnzlYoIw);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
      msg.channel.send('pong');
    }
  });