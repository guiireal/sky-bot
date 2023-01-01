const { PREFIX, TEMP_FOLDER } = require("../config");
const { downloadContentFromMessage } = require("@adiwajshing/baileys");
const path = require("path");
const { writeFile } = require("fs/promises");

function extractDataFromMessage(baileysMessage) {
  const textMessage = baileysMessage.message?.conversation;
  const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text;
  const imageTextMessage = baileysMessage.message?.imageMessage?.caption;
  const videoTextMessage = baileysMessage.message?.videoMessage?.caption;

  const fullMessage =
    textMessage || extendedTextMessage || imageTextMessage || videoTextMessage;

  if (!fullMessage) {
    return {
      remoteJid: "",
      fullMessage: "",
      command: "",
      args: "",
      isImage: false,
      isVideo: false,
      isSticker: false,
    };
  }

  const isImage = is(baileysMessage, "image");
  const isVideo = is(baileysMessage, "video");
  const isSticker = is(baileysMessage, "sticker");

  const [command, ...args] = fullMessage.trim().split(" ");

  const arg = args.reduce((acc, arg) => acc + " " + arg, "").trim();

  return {
    remoteJid: baileysMessage?.key?.remoteJid,
    fullMessage,
    command: command.replace(PREFIX, "").trim(),
    args: arg.trim(),
    isImage,
    isVideo,
    isSticker,
  };
}

function is(baileysMessage, context) {
  return (
    !!baileysMessage.message?.[`${context}Message`] ||
    !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
      `${context}Message`
    ]
  );
}

function getContent(baileysMessage, type) {
  return (
    baileysMessage.message?.[`${type}Message`] ||
    baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
      `${type}Message`
    ]
  );
}

function isCommand(baileysMessage) {
  const { fullMessage } = extractDataFromMessage(baileysMessage);

  return fullMessage && fullMessage.startsWith(PREFIX);
}

async function download(baileysMessage, fileName, context, extension) {
  const content = getContent(baileysMessage, context);

  if (!content) {
    return null;
  }

  const stream = await downloadContentFromMessage(content, context);

  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  const filePath = path.resolve(TEMP_FOLDER, `${fileName}.${extension}`);

  await writeFile(filePath, buffer);

  return filePath;
}

async function downloadImage(baileysMessage, fileName) {
  return await download(baileysMessage, fileName, "image", "png");
}

async function downloadSticker(baileysMessage, fileName) {
  return await download(baileysMessage, fileName, "sticker", "webp");
}

async function downloadVideo(baileysMessage, fileName) {
  return await download(baileysMessage, fileName, "video", "mp4");
}

module.exports = {
  downloadImage,
  downloadVideo,
  downloadSticker,
  extractDataFromMessage,
  isCommand,
};
