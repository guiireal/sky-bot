const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

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

╭━━⪩ DONO ⪨━━
▢
▢ • ${PREFIX}off
▢ • ${PREFIX}on
▢
╰━━─「🌌」─━━

╭━━⪩ ADMINS ⪨━━
▢
▢ • ${PREFIX}ban
▢ • ${PREFIX}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ MENU ⪨━━
▢
▢ • ${PREFIX}attp
▢ • ${PREFIX}cep
▢ • ${PREFIX}gpt
▢ • ${PREFIX}image
▢ • ${PREFIX}ping
▢ • ${PREFIX}play-audio
▢ • ${PREFIX}sticker
▢ • ${PREFIX}to-image
▢
╰━━─「🚀」─━━`;
};
