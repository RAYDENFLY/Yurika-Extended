/* eslint no-restricted-syntax: "off" */
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../../Extended/CreateEmbed');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const confirm = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setLabel('YES')
      .setCustomId('evalyes')
      .setStyle('DANGER')
  )
  .addComponents(
    new MessageButton()
      .setLabel('NO')
      .setCustomId('evalno')
      .setStyle('SUCCESS')
  )
const confirmbed = new MessageEmbed()
  .setTitle('**CONFIRM OUTPUT**')
  .setDescription("Eval command need permission to show output")
module.exports = class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval', 'ev'],
      description: {
        content: 'eval',
      },
      category: 'Developer',
      cooldown: 3000,
      args: [
        {
          id: 'command',
          type: 'string',
          match: 'rest',
          prompt: {
            start: '',
          },
        },
      ],
    });
  } async exec(message, { command }) {
    if (message.author.id !== "754192220843802664") return;
    try {
      let raw
      let teks = command
      raw = eval(teks);
      let typeofs;
      typeofs = typeof raw
      if (typeof raw !== "string") raw = require("util").inspect(raw, { depth: 0 });
      let output = await clean(raw);
      const embed = new MessageEmbed()
        .setTitle('Output: ')
        .setDescription("```js\n" + await output + "```")
      message.channel.send({ components: [confirm], embeds: [confirmbed] })
      const filter = i => "754192220843802664"
      const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
      collector.on('collect', async i => {
        if (i.customId === 'evalyes') {
          await i.update({ embeds: [embed], components: [] })
        }
        if (i.customId === 'evalno') {
          await i.update({ content: "canceled", embeds: [], components: [] })
        }
      });
    } catch (err) {
      const error = new MessageEmbed()
        .setTitle('**ERROR**')
        .setColor("RED")
        .setDescription("```js\n"+err+"```")
      message.channel.send({embeds: [error]})
    }
  }
}
function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}