const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../../Extended/CreateEmbed');

module.exports = class PingCommand extends Command {
  constructor() {
    super('shutdown', {
      aliases: ['sd'],
      description: {
        content: 'shudown host',
      },
      category: 'Information',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const message = await msg.channel.send('Wait for system...');
      const embed = CreateEmbed('info')
        .setDescription("Shutting down the host")
        .setTimestamp();
      setTimeout(() => { message.edit({ content: null, embeds: [embed] }); }, 5000);
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
