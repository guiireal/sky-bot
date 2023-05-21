const { PREFIX } = require("../../config");
const { menuMessage } = require("../../utils/messages");

module.exports = {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menu", "help"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendReply }) => {
    await sendReply("\n\n" + menuMessage());
  },
};
