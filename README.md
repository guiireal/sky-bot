# SkyBot

Bot de WhatsApp, desenvolvido nas aulas da Saga [Desenvolvendo um Bot de WhatsApp](https://www.youtube.com/watch?v=GGm9zx_f8KA&list=PLO39CngmVGafypMifSUo7AueVU7P2_SEC).

Assista todas as aulas para entender como ele foi desenvolvido do zero!

<br />

## Instalação no Termux

<br />

1 - Abra o termux e execute os seguintes comandos
```
pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install git -y && pkg install ffmpeg -y
```

2 - Habilite o acesso da pasta storage, no termux
```
termux-setup-storage
```

3 - Entre na pasta storage
```
cd storage
```

4 - Clone o repositório
```
git clone https://github.com/guiireal/sky-bot
```

5 - Entre na pasta que foi clonada
```
cd sky-bot
```

6 - Execute o bot e depois leia o QRCode
```
npm start
```