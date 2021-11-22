const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const ms = require('ms');
const Discord = require('discord.js');
const { CreateEmbed } = require('../../../Extended/CreateEmbed');
const { version } = require('../../../../package.json');

module.exports = class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: {
        content: 'Stats Bot',
      },
      category: 'Information',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      msg.channel.send({
        embeds: [CreateEmbed('info', stripIndent`
System Information :
\`\`\`js
Name: Yurika Extended
CPU: AMD A6-9225
Ram: 4 GB
Operating System: Windows 11 (AMD Plartform)
\`\`\`
System Statistics:
\`\`\`js
Node.js: ${process.version}
Version: ${version}
Uptime: ${ms(this.client.uptime, { long: true })}
Discord.js: ${Discord.version}
\`\`\`
Music Statistics:
\`\`\`js
Uptime: ${ms(this.client.erela.nodes.values().next().value.stats.uptime, { long: true })}
Playing Players: ${this.client.erela.nodes.values().next().value.stats.playingPlayers}
\`\`\`
`)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
