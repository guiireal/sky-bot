const { PREFIX } = require("../../config");
const { deactivateGroup } = require("../../utils/database");

module.exports = {
  name: "off",
  description: "Desativa o bot no grupo",
  commands: ["off"],
  usage: `${PREFIX}off`,
  handle: async ({ sendSuccessReply, remoteJid }) => {
    deactivateGroup(remoteJid);

    await sendSuccessReply("Bot desativado no grupo!");
  },
};
