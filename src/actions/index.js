const { BOT_EMOJI, TEMP_FOLDER } = require("../config")
const { extractDataFromMessage, downloadImage } = require("../utils")
const path = require('path')
const { exec } = require('child_process')
const fs = require('fs')

class Actions {
  constructor(bot, baileysMessage) {
    const { remoteJid, args, isImage } = extractDataFromMessage(baileysMessage)
    
    this.bot = bot
    this.remoteJid = remoteJid
    this.args = args
    this.isImage = isImage
    this.baileysMessage = baileysMessage
  }

  async sticker() {
    if (!this.isImage) {
      await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro! Você precisa enviar uma imagem!`})
      return
    }

    const inputPath = await downloadImage(this.baileysMessage, 'input')
    const outputPath = path.resolve(TEMP_FOLDER, 'output.webp')

    exec(`ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`, async (error) => {
      if (error) {
        await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro ao converter a imagem para figurinha!` })
        return
      }

      await this.bot.sendMessage(this.remoteJid, {
        sticker: { url: outputPath }
      })

      fs.unlinkSync(inputPath)
      fs.unlinkSync(outputPath)
    })
  }

}

module.exports = Actions