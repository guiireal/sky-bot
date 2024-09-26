pkg upgrade -y && pkg update -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install yarn && chmod -R 777 ./* && yarn install && npm start
