const connect = require("./connection");
const middlewares = require("./middlewares");

async function start() {
  const bot = await connect();
  await middlewares(bot);
}

start();
