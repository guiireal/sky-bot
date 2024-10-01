const { connect } = require("./connection");
const { load } = require("./loader");
const { infoLog, bannerLog } = require("./utils/logger");

async function start() {
  bannerLog();
  infoLog("Iniciando meus componentes internos...");

  const socket = await connect();

  load(socket);
}

start();
