const axios = require("axios");

const { SPIDER_API_TOKEN, SPIDER_API_BASE_URL } = require("../config");

exports.playAudio = async (search) => {
  if (!search) {
    throw new Error("Você precisa informar o que deseja buscar!");
  }

  if (!SPIDER_API_TOKEN || SPIDER_API_TOKEN === "seu_token_aqui") {
    throw new Error("Token da API do Spider X não configurado");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/play-audio?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.gpt = async (text) => {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  if (!SPIDER_API_TOKEN || SPIDER_API_TOKEN === "seu_token_aqui") {
    throw new Error("Token da API do Spider X não configurado");
  }

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/gpt?api_key=${SPIDER_API_TOKEN}`,
    {
      text,
    }
  );

  return data.text;
};
