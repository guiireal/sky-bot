const { PREFIX, TEMP_DIR } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
  name: "sticker",
  description: "Faço figurinhas de imagem/gif e vídeo",
  commands: ["s", "sticker", "fig", "f"],
  usage: `${PREFIX}sticker (marque a imagem/gif/video) ou ${PREFIX}sticker (responda a imagem/gif/video)`,
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    baileysMessage,
    sendErrorReply,
    sendSuccessReact,
    sendStickerFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "Você precisa marcar uma imagem/gif/video ou responder a uma imagem/gif/video"
      );
    }

    const outputPath = path.resolve(TEMP_DIR, "output.webp");

    if (isImage) {
      const inputPath = await downloadImage(baileysMessage, "input");

      exec(
        `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
        async (error) => {
          if (error) {
            console.log(error);
            fs.unlinkSync(inputPath);
            throw new Error(error);
          }

          await sendSuccessReact();

          await sendStickerFromFile(outputPath);

          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        }
      );
    } else {
      const inputPath = await downloadVideo(baileysMessage, "input");

      const sizeInSeconds = 10;

      const seconds =
        baileysMessage.message?.videoMessage?.seconds ||
        baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.videoMessage?.seconds;

      const haveSecondsRule = seconds <= sizeInSeconds;

      if (!haveSecondsRule) {
        fs.unlinkSync(inputPath);

        await sendErrorReply(`O vídeo que você enviou tem mais de ${sizeInSeconds} segundos!

Envie um vídeo menor!`);

        return;
      }

      exec(
        `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
        async (error) => {
          if (error) {
            fs.unlinkSync(inputPath);

            throw new Error(error);
          }

          await sendSuccessReact();
          await sendStickerFromFile(outputPath);

          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        }
      );
    }
  },
};
