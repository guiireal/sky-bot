const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommomFunctions } = require("../utils/loadCommomFunctions");

exports.onMessagesUpsert = async ({ socket, messages }) => {
  if (!messages.length) {
    return;
  }

  const webMessage = messages[0];
  const commonFunctions = loadCommomFunctions({ socket, webMessage });

  if (!commonFunctions) {
    return;
  }

  await dynamicCommand(commonFunctions);
};
