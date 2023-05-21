const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommomFunctions } = require("../utils/loadCommomFunctions");

exports.onMessagesUpsert = async ({ bot, messages }) => {
  const baileysMessage = messages[0];
  const commonFunctions = loadCommomFunctions({ bot, baileysMessage });

  await dynamicCommand(commonFunctions);
};
