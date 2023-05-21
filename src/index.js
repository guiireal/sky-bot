const { connect } = require("./connection");
const { load } = require("./loader");

async function start() {
  const bot = await connect();
  load(bot);
}

start();
