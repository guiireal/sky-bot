const { Loggings, LoggingsRegister } = require("@loggings/beta");
const config = require("./config");

// remove o sistema de registros em arquivo 
if(!config.REGISTER_LOGS) Loggings.rem(LoggingsRegister.identify);

// adiciona a logica do loggings na variavel global console
Loggings.useConsole(new Loggings(config.BOT_NAME, "cyan", {
    register_dir:"assets/logs"
}));