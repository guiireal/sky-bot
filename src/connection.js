const path = require("path");
const { question, onlyNumbers } = require("./utils");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const { Formatter } = require("@loggings/beta");

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "assets", "auth", "baileys")
  );

  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    printQRInTerminal: false,
    version,
    logger: pino({ level: "error" }),
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    markOnlineOnConnect: true,
  });

  if (!socket.authState.creds.registered) {
    console.log(`Credenciais ainda [não configuradas].yellow!.`);
    console.log(
      "Informe o seu [número de telefone].green (exemplo: [5511920202020].lime):"
    );

    const phoneNumber = await question(
      Formatter("Informe o seu [número de telefone].green: ")[0]
    );

    if (!phoneNumber) {
      throw new Error("Número de telefone [inválido].red!");
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    console.log(`Código de pareamento: [${code}].cyan`);
  }

  socket.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        console.log("Bot [desconectado].red., [reconectando...].cyan");
        connect().then((newSocket) => {
          load(newSocket);
        });
      }
    }
    if (connection === "open") {
      console.log("Bot conectado com [sucesso].green.");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
}

exports.connect = connect;
