pkg upgrade -y &&
pkg update -y &&
pkg install ffmpeg -y
node ./src/index.js