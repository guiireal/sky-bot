const { PREFIX } = require("../config");

exports.hasTypeOrCommand = ({ type, command }) => type && command;
