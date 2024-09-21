const { Loggings, LoggingsRegister } = require("@loggings/beta");
const { BOT_NAME, REGISTER_LOGS } = require("../config");

if (!REGISTER_LOGS) {
  Loggings.rem(LoggingsRegister.identify);
}

Loggings.useConsole(
  new Loggings(BOT_NAME, "cyan", {
    register_dir: "assets/logs",
  })
);
