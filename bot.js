const Discord = require("discord.js");
const bot = new Discord.Client();
const fetch = require("node-fetch");
const TurndownService = require("turndown");
const turndownService = new TurndownService();
const TOKENS = require("./auth.json");
const prefix = ".";

const body = { a: 1 };
bot.login(TOKENS.BOT_TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);

  bot.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "assignment") {
      async function getAssignment() {
        let link = args[0];
        const links = link.split("/courses");
        const apiLink = links[0] + "/api/v1/courses" + links[1];
        const result = await fetch(
          apiLink.concat("?access_token=" + TOKENS.CANVAS_TOKEN)
        ).then((res) => res.json());
        var embedDescription = turndownService.turndown(result.description);
        embedDescription = embedDescription.replace(/#+/g, "");
        const assignmentEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(result.name)
          .setURL(link)
          .setDescription(embedDescription)
          .setFooter(result.due_at);

        message.channel.send(assignmentEmbed);
      }
      getAssignment();
    }
  });
});
