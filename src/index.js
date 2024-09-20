require("./logger");
const { connect } = require("./connection");
const { load } = require("./loader");

async function start() {
  console.log("Iniciando [bot].lime...");
  const socket = await connect();

  load(socket);
}

start();
