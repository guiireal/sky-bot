const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { PREFIX, COMMANDS_DIR, TEMP_DIR } = require("../config");
const path = require("path");
const fs = require("fs");
const { writeFile } = require("fs/promises");

exports.extractDataFromMessage = (baileysMessage) => {
  const textMessage = baileysMessage.message?.conversation;
  const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text;
  const imageTextMessage = baileysMessage.message?.imageMessage?.caption;
  const videoTextMessage = baileysMessage.message?.videoMessage?.caption;

  const fullMessage =
    textMessage || extendedTextMessage || imageTextMessage || videoTextMessage;

  if (!fullMessage) {
    return {
      remoteJid: null,
      prefix: null,
      commandName: null,
      args: [],
    };
  }

  const [command, ...args] = fullMessage.split(" ");
  const prefix = command.charAt(0);

  const commandWithoutPrefix = command.replace(new RegExp(`^[${PREFIX}]+`), "");

  return {
    remoteJid: baileysMessage?.key?.remoteJid,
    prefix,
    commandName: this.formatCommand(commandWithoutPrefix),
    args: this.splitByCharacters(args.join(" "), ["\\", "|", "/"]),
  };
};

exports.splitByCharacters = (str, characters) => {
  characters = characters.map((char) => (char === "\\" ? "\\\\" : char));
  const regex = new RegExp(`[${characters.join("")}]`);

  return str
    .split(regex)
    .map((str) => str.trim())
    .filter(Boolean);
};

exports.formatCommand = (text) => {
  return this.onlyLettersAndNumbers(
    this.removeAccentsAndSpecialCharacters(text.toLocaleLowerCase().trim())
  );
};

exports.onlyLettersAndNumbers = (text) => {
  return text.replace(/[^a-zA-Z0-9]/g, "");
};

exports.removeAccentsAndSpecialCharacters = (text) => {
  if (!text) return "";

  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

exports.baileysIs = (baileysMessage, context) => {
  return (
    !!baileysMessage.message?.[`${context}Message`] ||
    !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
      `${context}Message`
    ]
  );
};

exports.getContent = (baileysMessage, type) => {
  return (
    baileysMessage.message?.[`${type}Message`] ||
    baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
      `${type}Message`
    ]
  );
};

exports.download = async (baileysMessage, fileName, context, extension) => {
  const content = this.getContent(baileysMessage, context);

  if (!content) {
    return null;
  }

  const stream = await downloadContentFromMessage(content, context);

  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  const filePath = path.resolve(TEMP_DIR, `${fileName}.${extension}`);

  await writeFile(filePath, buffer);

  return filePath;
};

exports.findCommandImport = (commandName) => {
  const command = this.readCommandImports();

  let typeReturn = "";
  let targetCommandReturn = null;

  for (const [type, commands] of Object.entries(command)) {
    if (!commands.length) {
      continue;
    }

    const targetCommand = commands.find((cmd) =>
      cmd.commands.map((cmd) => this.formatCommand(cmd)).includes(commandName)
    );

    if (targetCommand) {
      typeReturn = type;
      targetCommandReturn = targetCommand;
    }
  }

  return {
    type: typeReturn,
    command: targetCommandReturn,
  };
};

exports.readCommandImports = () => {
  const subdirectories = fs
    .readdirSync(COMMANDS_DIR, { withFileTypes: true })
    .filter((directory) => directory.isDirectory())
    .map((directory) => directory.name);

  const commandImports = {};

  for (const subdir of subdirectories) {
    const subdirectoryPath = path.join(COMMANDS_DIR, subdir);
    const files = fs
      .readdirSync(subdirectoryPath)
      .filter(
        (file) =>
          !file.startsWith("_") &&
          (file.endsWith(".js") || file.endsWith(".ts"))
      )
      .map((file) => require(path.join(subdirectoryPath, file)));

    commandImports[subdir] = files;
  }

  return commandImports;
};
