const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { Intents } = require('discord.js');
const { join } = require('path');
const { Manager } = require('erela.js');
const Spotify = require('better-erela.js-spotify').default;
const { CreatePrompt } = require('../../Extended/CreatePrompt');
const Deezer = require('../../Plugin/Deezer');
const config = require('../Config/config');
const { CreateEmbed } = require('../../Extended/CreateEmbed');
const { logger } = require('../../Extended/Logger');
require('../../Node/Node');

module.exports = class SayaClient extends AkairoClient {
  constructor() {
    super({
      ownerID: config.owners,
    }, {
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      ],
    });
    this.logger = logger;
    this.config = config;
    this.erela = new Manager({
      autoPlay: true,
      nodes: this.config.nodes,
      plugins: [
        new Deezer(),
        new Spotify({
          convertUnresolved: false,
        }),
      ],
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });
    this.commandHandler = new CommandHandler(this, {
      allowMention: true,
      directory: join(__dirname, '..', 'Commands'),
      prefix: config.prefix,
      defaultCooldown: 3000,
      argumentDefaults: {
        prompt: {
          modifyStart: (message, text) => ({ embeds: [CreateEmbed('info', CreatePrompt(text))] }),
          modifyRetry: (message, text) => ({ embeds: [CreateEmbed('info', CreatePrompt(text))] }),
          modifyTimeout: () => ({ embeds: [CreateEmbed('warn', 'Waktumu Habis.')] }),
          modifyEnded: () => ({ embeds: [CreateEmbed('warn', 'Waktumu Habis.')] }),
          modifyCancel: () => ({ embeds: [CreateEmbed('info', 'Aku tidak mengerti, Silahkan coba lagi')] }),
          retries: 3,
          time: 30000,
        },
      },
    }).on('commandFinished', (msg, command) => {
      this.logger.info(`[${msg.author.tag}] USING [${command.id.toUpperCase()}] COMMANDS`);
    }).on('cooldown', async (msg, command, remaining) => {
      const awaitMsg = await msg.channel.send({ embeds: [CreateEmbed('warn', `Chill.. wait ${(remaining / 1000).toFixed(2)} second(s) to use command again`)] });
      setTimeout(() => awaitMsg.delete(), remaining);
      this.logger.warn(`[${msg.author.tag}] Terkena Limit [${command.id.toUpperCase()}]`);
    });
    this.ListenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'Listeners'),
    });
  }

  initialize() {
    this.commandHandler.loadAll();
    this.ListenerHandler.setEmitters({
      erela: this.erela,
    });
    this.ListenerHandler.loadAll();
    this.login();
  }
};
