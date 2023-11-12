const { connect } = require("./connection");
const { load } = require("./loader");

async function start() {
  const socket = await connect();

  load(socket);
}

start();
