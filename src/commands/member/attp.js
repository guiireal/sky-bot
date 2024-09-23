const { PREFIX } = require("../../config");
const { attp } = require("../../services/spider-x-api");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

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
    if (!args.length) {
      throw new InvalidParameterError(
        "Você precisa informar o texto que deseja transformar em figurinha."
      );
    }

    await sendWaitReact();

    const url = await attp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
