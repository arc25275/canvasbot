const Discord = require("discord.js");
const TurndownService = require("turndown");
const turndownService = new TurndownService();
const fetch = require("node-fetch");

module.exports = async function getPage(prefix, link, canvas_token) {
  const links = link.split("/courses");
  const apiLink = links[0] + "/api/v1/courses" + links[1];
  const result = await fetch(
    apiLink.concat("?access_token=" + canvas_token)
  ).then((res) => res.json().catch((err) => console.log(err)));
  var embedBody = turndownService.turndown(result.body);
  embedBody = embedBody.replace(/#+/g, "");
  if (result.body.length > 6000) {
    const errorEmbed = new Discord.MessageEmbed().setDescription(
      `Message too Large [Link](${link})`
    );
    return errorEmbed;
    //Temporary
  } else {
    const pageEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(result.name)
      .setURL(link)
      .setDescription(embedBody);
    return pageEmbed;
  }
};
