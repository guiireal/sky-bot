const axios = require("axios");
const { OPENAI_API_KEY } = require("../config");

exports.gpt = async (content) => {
  if (!OPENAI_API_KEY) {
    throw new Error(
      "É necessário configurar a variável de ambiente OPENAI_API_KEY com o seu token da OpenAI"
    );
  }

  const { data } = await axios.post(
    `https://api.openai.com/v1/chat/completions`,
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return data.choices[0].message.content;
};
