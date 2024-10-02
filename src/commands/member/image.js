const { PREFIX } = require("../../config");
const { Hercai } = require("hercai");
const { WarningError } = require("../../errors/WarningError");

module.exports = {
  name: "image",
  description: "Gera uma imagem a partir da descrição fornecida",
  commands: ["image", "img", "imagem"],
  usage: `${PREFIX}imagem <descrição>`,
  handle: async ({
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendImageFromURL,
  }) => {
    if (!fullArgs.length) {
      throw new WarningError(
        "Por favor, forneça uma descrição para gerar a imagem."
      );
    }

    const herc = new Hercai();

    await sendWaitReact();

    const response = await herc.drawImage({
      model: "simurg",
      prompt: fullArgs,
      negative_prompt: "",
    });

    await sendSuccessReact();

    await sendImageFromURL(response.url);
  },
};
