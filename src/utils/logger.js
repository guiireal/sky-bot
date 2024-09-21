const { Loggings, LoggingsRegister } = require("@loggings/beta");
const config = require("../config");

if (!config.REGISTER_LOGS) {
  Loggings.rem(LoggingsRegister.identify);
}

Loggings.useConsole(
  new Loggings(config.BOT_NAME, "cyan", {
    register_dir: "assets/logs",
  })
);
