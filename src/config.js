const path = require("path");

exports.PREFIX = "/"; // Prefixo dos comandos
exports.BOT_EMOJI = "🤖";
exports.BOT_NAME = "Sky Bot"; // Nome do bot (mude se preferir)
exports.BOT_NUMBER = "5511920202020"; // Número do bot (mude se preferir)

exports.COMMANDS_DIR = path.join(__dirname, "commands");
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

exports.OPENAI_API_KEY = "seu_token_aqui";
