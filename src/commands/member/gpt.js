const { PREFIX } = require("../../config");
const { gpt } = require("../../services/gpt");

module.exports = {
  name: "gpt",
  description: "Comandos de inteligência artificial!",
  commands: ["gpt", "skybot"],
  usage: `${PREFIX}gpt com quantos paus se faz uma canoa?`,
  handle: async ({ sendSuccessReply, sendErrorReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      await sendErrorReply("Você precisa me dizer o que eu devo responder!");
      return;
    }

    await sendWaitReply();

    const responseText = await gpt(text);

    await sendSuccessReply(responseText);
  },
};
