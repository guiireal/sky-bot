const { PREFIX } = require("../../config");
const { Hercai } = require("hercai");

const herc = new Hercai();

const handleImage = async (sock, from, prompt) => {
  try {
    const response = await herc.drawImage({
      model: "simurg",
      prompt: prompt,
      negative_prompt: "",
    });
    await sock.sendMessage(from, {
      image: { url: response.url },
      caption: prompt,
    });
  } catch (error) {
    await sock.sendMessage(from, {
      text: `*Erro ao gerar imagem:* ${error.message}`,
    });
  }
};

module.exports = {
  name: "imag",
  description: "Gera uma imagem a partir da descrição fornecida",
  commands: ["img", "imagem"],
  usage: `${PREFIX}imagem <descrição>`,
  handle: async ({ fullArgs, socket, remoteJid, sendReply }) => {
    if (!fullArgs.length) {
      await sendReply("Por favor, forneça uma descrição para gerar a imagem.");
      return;
    }

    await handleImage(socket, remoteJid, fullArgs);
  },
};
