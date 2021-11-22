const Emote = ['⏪', '⬅️', '🚫', '➡️', '⏩'];

module.exports = class Pagination {
  constructor(msg, payload) {
    this.msg = msg;
    this.payload = payload;
  }

  async start() {
    const { embed } = this.payload;
    const { pages } = this.payload;
    let index = 0;
    this.payload.edit.call(this, index, embed, pages[index]);
    const msg = await this.msg.channel.send({ embeds: [embed] });
    if (pages.length < 2) return undefined;
    for (const emoji of Emote) await msg.react(emoji);
    const filter = (m, user) => Emote.includes(m.emoji.name) && user.id === this.msg.author.id;
    while (true) {
      const responses = await msg.awaitReactions({ filter, max: 1, time: 30000 });
      if (!responses.size) break;
      const emoji = responses.first().emoji.name;
      if (emoji === Emote[0]) index -= 10;
      else if (emoji === Emote[1]) index--;
      else if (emoji === Emote[3]) index++;
      else if (emoji === Emote[4]) index += 10;
      else {
        msg.delete();
        break;
      }
      index = ((index % pages.length) + pages.length) % pages.length;
      this.payload.edit.call(this, index, embed, pages[index]);
      await msg.edit({ embeds: [embed] });
    }
  }
};
