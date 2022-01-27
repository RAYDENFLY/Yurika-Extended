const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const ms = require('ms');
const Discord = require('discord.js');
const { CreateEmbed } = require('../../../Extended/CreateEmbed');
const { version } = require('../../../../package.json');

module.exports = class StatsCommand extends Command {
  constructor() {
    super('update', {
      aliases: ['update'],
      description: {
        content: 'Update Bot',
      },
      category: 'Information',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      msg.channel.send({
        embeds: [CreateEmbed('info', stripIndent`
**Recent Update**
\`\`\`js
Add & Edited: 
- Upstream to 2.6.0
- Change CPU server to AMD EPYC 7B12
- Boost Project (Bot, Web, Lavalink)
- Fix StatsCommands

Bug: 
Eval Command Dead, Changer Language Dead, Bot Dead.
When Fixed Eval ? i down know
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
**Recent Update**
\`\`\`js
Add & Edited: 
Add file Lang-ID.json
Edited StatsCommand.js, index.ejs, about.ejs, index.css, SlashCommand.js
Bug: Eval Command Dead
\`\`\`
`)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
    } 
    }