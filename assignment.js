const Discord = require("discord.js");
const TurndownService = require("turndown");
const turndownService = new TurndownService();
const fetch = require("node-fetch");

module.exports = async function getAssignment(prefix, link, canvas_token) {
  const links = link.split("/courses");
  const apiLink = links[0] + "/api/v1/courses" + links[1];
  const result = await fetch(
    apiLink.concat("?access_token=" + canvas_token)
  ).then((res) => res.json().catch((err) => console.log(err)));
  var embedDescription = turndownService.turndown(result.description);
  embedDescription = embedDescription.replace(/#+/g, "");
  const assignmentEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(result.name)
    .setURL(link)
    .setDescription(embedDescription)
    .setFooter(result.due_at);
  return assignmentEmbed;
};
