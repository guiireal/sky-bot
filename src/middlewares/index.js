const { PREFIX } = require("../config");

exports.verifyPrefix = (prefix) => PREFIX === prefix;
exports.hasTypeOrCommand = ({ type, command }) => type && command;
