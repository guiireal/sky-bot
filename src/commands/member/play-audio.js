const { PREFIX } = require("../../config");
const { playAudio } = require("../../services/spider-x-api");

module.exports = {
  name: "play-audio",
  description: "Faço o download de músicas",
  commands: ["play-audio", "play", "pa"],
  usage: `${PREFIX}play-audio MC Hariel`,
  handle: async ({
    sendAudioFromURL,
    args,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!args.length) {
      await sendErrorReply("Você precisa me dizer o que deseja buscar!");
      return;
    }

    await sendWaitReact();

    try {
      const data = await playAudio(args[0]);

      if (!data) {
        await sendErrorReply("Nenhum resultado encontrado!");
        return;
      }

      await sendSuccessReact();

      await sendAudioFromURL(data.url);
    } catch (error) {
      await sendErrorReply(error.message);
    }
  },
};
