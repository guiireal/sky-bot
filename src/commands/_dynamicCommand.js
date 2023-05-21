const { DangerError } = require("../errors");
const { InvalidParameterError, WarningError } = require("../errors");
const { findCommandImport } = require("../utils");

exports.dynamicCommand = async (paramsHandler) => {
  const { commandName } = paramsHandler;
  const { type, command } = findCommandImport(commandName);

  if (!type || !command) {
    return;
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`Parâmetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      await sendErrorReply(
        `Ocorreu um erro ao executar o comando ${command.name}! O desenvolvedor foi notificado!
      
${Emoji.LIST} *Detalhes*: ${error.message}`
      );
    }
  }
};
