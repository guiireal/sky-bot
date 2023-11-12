const { TIMEOUT_IN_MILLISECONDS_BY_EVENT } = require("./config");
const { onMessagesUpsert } = require("./middlewares/onMesssagesUpsert");

exports.load = (socket) => {
  socket.ev.on("messages.upsert", async ({ messages }) => {
    setTimeout(() => {
      onMessagesUpsert({ socket, messages });
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });
};
