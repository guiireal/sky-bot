const { TIMEOUT_IN_MILLISECONDS_BY_EVENT } = require("./config");
const { onMessagesUpsert } = require("./middlewares/onMesssagesUpsert");
const { extractDataFromMessage, baileysIs, download } = require("./utils");

exports.exportCommomFunctions = ({ bot, message }) => {
  const { remoteJid, prefix, commandName, args } =
    extractDataFromMessage(message);

  const isImage = baileysIs(message, "image");
  const isVideo = baileysIs(message, "video");
  const isSticker = baileysIs(message, "sticker");

  async function downloadImage(baileysMessage, fileName) {
    return await download(baileysMessage, fileName, "image", "png");
  }

  async function downloadSticker(baileysMessage, fileName) {
    return await download(baileysMessage, fileName, "sticker", "webp");
  }

  async function downloadVideo(baileysMessage, fileName) {
    return await download(baileysMessage, fileName, "video", "mp4");
  }

  return {
    bot,
    remoteJid,
    prefix,
    commandName,
    args,
    isImage,
    isVideo,
    isSticker,
    downloadImage,
    downloadSticker,
    downloadVideo,
  };
};

exports.load = ({ bot }) => {
  bot.ev.on("messages.upsert", async ({ messages }) => {
    setTimeout(() => {
      onMessagesUpsert({ bot, messages });
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });
};
