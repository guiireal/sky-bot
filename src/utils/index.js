const { PREFIX, TEMP_FOLDER } = require('../config')
const { downloadContentFromMessage } = require('@adiwajshing/baileys')
const path = require('path')
const { writeFile } = require('fs/promises')

function extractDataFromMessage(baileysMessage) {
  const textMessage = baileysMessage.message?.conversation
  const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text
  const imageTextMessage = baileysMessage.message?.imageMessage?.caption

  const fullMessage = textMessage || extendedTextMessage || imageTextMessage

  if (!fullMessage) {
    return {
      remoteJid: '',
      fullMessage: '',
      command: '',
      args: '',
      isImage: false,
      isSticker: false,
    }
  }

  const isImage = is(baileysMessage, 'image')
  const isSticker = is(baileysMessage, 'sticker')

  const [command, ...args] = fullMessage.trim().split(' ')

  const arg = args.reduce((acc, arg) => acc + ' ' + arg, '').trim();

  return {
    remoteJid: baileysMessage?.key?.remoteJid,
    fullMessage,
    command: command.replace(PREFIX, '').trim(),
    args: arg.trim(),
    isImage,
    isSticker
  }
}

function is(baileysMessage, context) {
  return !!baileysMessage.message?.[`${context}Message`] ||
    !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[`${context}Message`]
}

function getContent(baileysMessage, type) {
  return baileysMessage.message?.[`${type}Message`] ||
    baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[`${type}Message`]
}

function isCommand(baileysMessage) {
  const { fullMessage } = extractDataFromMessage(baileysMessage)

  return fullMessage && fullMessage.startsWith(PREFIX)
}

async function downloadImage(baileysMessage, fileName) {
  const content = getContent(baileysMessage, 'image')

  if (!content) {
    return null
  }

  const stream = await downloadContentFromMessage(content, 'image')

  let buffer = Buffer.from([])

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  const filePath = path.resolve(TEMP_FOLDER, `${fileName}.png`)

  await writeFile(filePath, buffer)

  return filePath
}

async function downloadSticker(baileysMessage, fileName) {
  const content = getContent(baileysMessage, 'sticker')

  if (!content) {
    return null
  }

  const stream = await downloadContentFromMessage(content, 'sticker')

  let buffer = Buffer.from([])

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  const filePath = path.resolve(TEMP_FOLDER, `${fileName}.webp`)

  await writeFile(filePath, buffer)

  return filePath
}

module.exports = {
  downloadImage,
  downloadSticker,
  extractDataFromMessage,
  isCommand
}
