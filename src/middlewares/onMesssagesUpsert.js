const { exportCommomFunctions } = require("../loader");

exports.onMessagesUpsert = async ({ bot, messages }) => {
  const message = messages[0];
  const commonFunctions = exportCommomFunctions({ bot, message });

  await dynamicHandle({
    ...commonFunctions,
    initialPing: now(),
  });
};
