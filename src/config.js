const path = require("path");

exports.PREFIX = "/";
exports.BOT_EMOJI = "🤖";
exports.BOT_NAME = "Sky Bot";

exports.COMMANDS_DIR = path.join(__dirname, "commands");
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

exports.OPENAI_API_KEY = "coloque_aqui_seu_token_da_openai";
