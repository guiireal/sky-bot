const { BOT_EMOJI, BOT_NAME, PREFIX } = require("../config");

exports.errorMessage = (message) => {
  return `${BOT_EMOJI} ❌ Erro! ${message}`;
};

exports.warningMessage = (message) => {
  return `${BOT_EMOJI} ⚠ Atenção! ${message}`;
};

exports.menuMessage = () => {
  const date = new Date();

  return `╭━━⪩ BEM VINDO! ⪨━━
▢
▢ • ${BOT_NAME}
▢ • Data: ${date.toLocaleDateString("pt-br")}
▢ • Hora: ${date.toLocaleTimeString("pt-br")}
▢ • Prefixo: ${PREFIX}
▢
╰━━─「🪐」─━━

╭━━⪩ MENU ⪨━━
▢
▢ • ${PREFIX}cep
▢ • ${PREFIX}gpt
▢ • ${PREFIX}ping
▢ • ${PREFIX}sticker
▢ • ${PREFIX}to-image
▢
╰━━─「🚀」─━━`;
};
