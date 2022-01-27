const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const ms = require('ms');
const Discord = require('discord.js');
const { CreateEmbed } = require('../../../Extended/CreateEmbed');
const { version } = require('../../../../package.json');
const os = require('os')

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
///Format Bytes
        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
        }
///CPU INFORMATION
const core = os.cpus()[0];

///Embed Message
      msg.channel.send({
        embeds: [CreateEmbed('info', stripIndent`
System Information :
\`\`\`js
Name: Yurika Extended
CPU: ${core.model} ${core.speed} MHz
Ram: Total:${formatBytes(process.memoryUsage().heapTotal)}
     Used:${formatBytes(process.memoryUsage().heapUsed)}
Operating System: ${process.platform}
\`\`\`
System Statistics:
\`\`\`js
PC_HOST : raydenfly76
Node.js: ${process.version}
Version: ${version}
Uptime: ${ms(this.client.uptime, { long: true })}
Discord.js: ${Discord.version}
\`\`\`
Music Statistics:
\`\`\`js
Lavalink Uptime: ${ms(this.client.erela.nodes.values().next().value.stats.uptime, { long: true })}
Playing Players: ${this.client.erela.nodes.values().next().value.stats.playingPlayers}
Lavalink Name: raydenfly76
Lavalink Host: replit.com
\`\`\`
Language
\`\`\`js
Language Server : \`Lang-en\`
Language Delfault : \`Lang-en\`
\`\`\`
`)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async executeSlash(interaction) {
    try { 
            interaction.editReply({
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
Lavalink Uptime: ${ms(this.client.erela.nodes.values().next().value.stats.uptime, { long: true })}
Playing Players: ${this.client.erela.nodes.values().next().value.stats.playingPlayers}
Lavalink Name: raydenfly76
Lavalink Host: replit.com
\`\`\`
Language
\`\`\`js
Language Server : \`Lang-en\`
Language Delfault : \`Lang-en\`
\`\`\`
`)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
    } 
    }