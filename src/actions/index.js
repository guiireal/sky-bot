const { BOT_EMOJI, TEMP_FOLDER } = require("../config")
const { extractDataFromMessage, downloadImage, downloadSticker } = require("../utils")
const path = require('path')
const { exec } = require('child_process')
const fs = require('fs')

class Action {
  constructor(bot, baileysMessage) {
    const { remoteJid, args, isImage, isSticker } = extractDataFromMessage(baileysMessage)
    
    this.bot = bot
    this.remoteJid = remoteJid
    this.args = args
    this.isImage = isImage
    this.isSticker = isSticker
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

  async toImage() {
    if (!this.isSticker) {
      await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro! Você precisa enviar um sticker!`})
      return
    }

    const inputPath = await downloadSticker(this.baileysMessage, 'input')
    const outputPath = path.resolve(TEMP_FOLDER, 'output.png')

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error)
        await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro ao converter o sticker para figurinha!` })
        return
      }

      await this.bot.sendMessage(this.remoteJid, {
        image: { url: outputPath }
      })

      fs.unlinkSync(inputPath)
      fs.unlinkSync(outputPath)
    })
  }
}

module.exports = Action