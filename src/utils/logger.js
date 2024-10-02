exports.primaryLog = (message) => {
  console.log("\x1b[36m[SKY BOT DIZ]\x1b[0m", message);
};

exports.secondaryLog = (message) => {
  console.log("\x1b[30m[SKY BOT DIZ]\x1b[0m", message);
};

exports.infoLog = (message) => {
  console.log("\x1b[34m[SKY BOT | INFO]\x1b[0m", message);
};

exports.successLog = (message) => {
  console.log("\x1b[32m[SKY BOT | SUCESSO]\x1b[0m", message);
};

exports.errorLog = (message) => {
  console.log("\x1b[31m[SKY BOT | ERRO]\x1b[0m", message);
};

exports.warningLog = (message) => {
  console.log("\x1b[33m[SKY BOT | ATENÇÃO]\x1b[0m", message);
};

exports.bannerLog = () => {
  console.log(`\x1b[36m░█▀▀░█░█░█░█░░░█▀▄░█▀█░▀█▀
░▀▀█░█▀▄░░█░░░░█▀▄░█░█░░█░
░▀▀▀░▀░▀░░▀░░░░▀▀░░▀▀▀░░▀░\x1b[0m\n`);
};
