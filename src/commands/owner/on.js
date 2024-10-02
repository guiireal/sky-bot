const { PREFIX } = require("../../config");
const { activateGroup } = require("../../utils/database");

module.exports = {
  name: "on",
  description: "Ativa o bot no grupo",
  commands: ["on"],
  usage: `${PREFIX}on`,
  handle: async ({ sendSuccessReply, remoteJid }) => {
    activateGroup(remoteJid);

    await sendSuccessReply("Bot ativado no grupo!");
  },
};
