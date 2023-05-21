const { PREFIX, TEMP_DIR } = require("../../config");
const fs = require("fs");
const path = require("path");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "toimage",
  description: "Transformo figurinhas estáticas em imagem",
  commands: ["toimage", "toimg"],
  usage: `${PREFIX}toimage (marque a figurinha) ou ${PREFIX}toimage (responda a figurinha)`,
  handle: async ({
    isSticker,
    downloadSticker,
    baileysMessage,
    sendStickerFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("Você preciissa enviar um sticker!");
    }

    const inputPath = await downloadSticker(baileysMessage, "input");
    const outputPath = path.resolve(TEMP_DIR, "output.png");

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }

      await sendStickerFromFile(outputPath);

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  },
};
