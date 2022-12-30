const { BOT_EMOJI } = require('./config')
const { isCommand, extractDataFromMessage } = require('./utils')
const Actions = require('./actions')

async function middlewares(bot) {
  bot.ev.on('messages.upsert', async ({ messages }) => {
    const baileysMessage = messages[0]

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return
    }

    const actions = new Actions(bot, baileysMessage)

    const { command, remoteJid } = extractDataFromMessage(baileysMessage)

    switch (command.toLowerCase()) {
      case 'f':
        await actions.sticker()
        break
      case 'ping':
        await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Pong!` })
        break
    }

  })
}

module.exports = middlewares
