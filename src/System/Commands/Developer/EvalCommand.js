/* eslint no-restricted-syntax: "off" */
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../../Extended/CreateEmbed');
const { MessageEmbed } = require('discord.js');

module.exports = class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval','ev'],
      description: {
        content: 'eval',
      },
      category: 'Developer',
      cooldown: 3000,
      args: [
        {
          id: 'command',
          type: 'commandAlias',
        },
      ],
    });
  }   async exec(message, { command }) {
      if(message.author.id !== "704453481792143361") return;
    try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .setTitle('Output: ')
                .setDescription(await data)
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (err) {
      message.channel.send(`\`An Error has occured\``);
    }
}
}