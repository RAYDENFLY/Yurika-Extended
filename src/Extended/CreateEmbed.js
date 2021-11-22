const { MessageEmbed } = require('discord.js');

const Color = {
  info: 'PURPLE',
  warn: 'YELLOW',
  error: 'RED',
};
function CreateEmbed(color, message) {
  const embed = new MessageEmbed()
    .setColor(Color[color])
    .setFooter(`©SayaClienr ${new Date().getFullYear()}`);
  if (message) embed.setDescription(message);
  return embed;
}
module.exports = { CreateEmbed };
