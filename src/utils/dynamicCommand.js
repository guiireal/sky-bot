const { DangerError } = require("../errors/DangerError");
const { InvalidParameterError } = require("../errors/InvalidParameterError");
const { WarningError } = require("../errors/WarningError");
const { findCommandImport, drawBox } = require(".");
const { verifyPrefix, hasTypeOrCommand } = require("../middlewares");
const { checkPermission } = require("../middlewares/checkPermission");
const { Formatter } = require("@loggings/beta");

exports.dynamicCommand = async (paramsHandler) => {
  const { commandName, prefix, sendWarningReply, sendErrorReply, webMessage } =
    paramsHandler;
  const { type, command } = findCommandImport(commandName);

  if (!verifyPrefix(prefix) || !hasTypeOrCommand({ type, command })) {
    return;
  }

  if (!(await checkPermission({ type, ...paramsHandler }))) {
    await sendErrorReply("Você não tem permissão para executar este comando!");
    return;
  }

  const texts = [
    `🔸 Comando: ${prefix}${commandName} (${type})`,
    `👤 Usuário: ${webMessage?.pushName ?? "Desconhecido"}`,
  ];

  if (!!webMessage.key.remoteJid && webMessage.key.remoteJid.endsWith("@g.us"))
    texts.push(`👥 Grupo: ${webMessage.key.remoteJid}`);
  const box = drawBox(texts, "🔹 Nova interação de comando!");
  process.stdout.write(box.box.map(box => {
    if(!box.includes(":")) return box;
    else return Formatter(`${box.split(":")[0]}:[${box.split(":")[1].replaceAll("│", "")}].lime│`)[0];
  }).join("\n")+ "\n");

  try {
    await command.handle({
      ...paramsHandler,
      type,
    });
  } catch (error) {
    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`Parâmetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      console.error(error);
      await sendErrorReply(
        `Ocorreu um erro ao executar o comando ${command.name}! O desenvolvedor foi notificado!
      
📄 *Detalhes*: ${error.message}`
      );
    }
  }
};
