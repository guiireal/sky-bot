const { PREFIX } = require("../../config");
const { attp } = require("../../services/spider-x-api");

module.exports = {
  name: "attp",
  description: "Faz figurinhas animadas de texto.",
  commands: ["attp"],
  usage: `${PREFIX}attp teste`,
  handle: async ({
    sendWaitReact,
    args,
    sendStickerFromURL,
    sendSuccessReact,
  }) => {
    await sendWaitReact();

    const url = await attp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
