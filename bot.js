const Discord = require("discord.js");
const bot = new Discord.Client();
const getAssignment = require("./assignment.js");
const getPage = require("./page.js");
const TOKENS = require("./config/auth.json"); //Token Config (Discord and Canvas(Will be replaced with 0Auth2 in the future))
const prefix = "."; //Bot Prefix
bot.login(TOKENS.BOT_TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async (message) => {
  if (message.author.bot) return; //Prevents responding to other bots
  if (message.content.indexOf(prefix) !== 0) return; //Makes sure there is a prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/g); //gets arguments
  const command = args.shift().toLowerCase();
  let link = args[0];

  /* Commands: */
  if (command === "assignment") {
    const assignment = await getAssignment(prefix, link, TOKENS.CANVAS_TOKEN); // .assignment <Link to assignment>
    message.channel.send(assignment);
  } else if (command === "page") {
    const page = await getPage(prefix, link, TOKENS.CANVAS_TOKEN); // .page <Link to page>
    message.channel.send(page);
  }
});
