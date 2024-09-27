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
  handle: async ({ args, socket, remoteJid, sendReply }) => {
    if (args.length === 0) {
      await sendReply("Por favor, forneça uma descrição para gerar a imagem.");
      return;
    }

    const prompt = args.join(" ");

    await handleImage(socket, remoteJid, prompt);
  },
};
