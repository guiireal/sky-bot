const { getProfileImageData } = require("../services/baileys");
const fs = require("fs");
const { onlyNumbers } = require("../utils");
const { isActiveWelcomeGroup } = require("../utils/database");

exports.onGroupParticipantsUpdate = async ({
  groupParticipantsUpdate,
  socket,
}) => {
  const remoteJid = groupParticipantsUpdate.id;
  const userJid = groupParticipantsUpdate.participants[0];

  if (!isActiveWelcomeGroup(remoteJid)) {
    return;
  }

  if (groupParticipantsUpdate.action === "add") {
    const { buffer, profileImage } = await getProfileImageData(socket, userJid);

    await socket.sendMessage(remoteJid, {
      image: buffer,
      caption: `Seja bem vindo ao nosso grupo, @${onlyNumbers(userJid)}!`,
      mentions: [userJid],
    });

    if (!profileImage.includes("default-user")) {
      fs.unlinkSync(profileImage);
    }
  }
};
