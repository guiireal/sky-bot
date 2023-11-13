const path = require("path");

exports.PREFIX = "/";
exports.BOT_EMOJI = "🤖";
exports.BOT_NAME = "Sky Bot";
exports.BOT_NUMBER = "5511974096005";

exports.COMMANDS_DIR = path.join(__dirname, "commands");
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

exports.OPENAI_API_KEY = "seu_token_aqui";
