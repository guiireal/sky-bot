const { BOT_EMOJI } = require("./config");
const { isCommand, extractDataFromMessage } = require("./utils");
const Action = require("./actions");

async function middlewares(bot) {
  bot.ev.on("messages.upsert", async ({ messages }) => {
    const baileysMessage = messages[0];

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return;
    }

    const action = new Action(bot, baileysMessage);

    const { command, remoteJid } = extractDataFromMessage(baileysMessage);

    switch (command.toLowerCase()) {
      case "cep":
        await action.cep();
        break;
      case "f":
      case "fig":
      case "s":
      case "sticker":
        await action.sticker();
        break;
      case "ping":
        await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Pong!` });
        break;
      case "toimage":
      case "toimg":
        await action.toImage();
        break;
    }
  });
}

module.exports = middlewares;
