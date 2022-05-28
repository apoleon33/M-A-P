<h1 align="center">M-A-P</h1>
<h2 align="center">An invention to manage a plant automatically</h2>
<p align="center">
    <a href="https://www.codefactor.io/repository/github/apoleon33/m-a-p/overview/dev">
        <img src="https://www.codefactor.io/repository/github/apoleon33/m-a-p/badge/rewrite">
    </a>
    <a href="https://github.com/apoleon33/M-A-P/stargazers/">
        <img src="https://badgen.net/github/stars/apoleon33/M-A-P">
    </a>
    <a href="http://perso.crans.org/besson/LICENSE.html">
        <img src="https://img.shields.io/badge/License-GPLv3-blue.svg">
    </a>
    <a href="https://discord.gg/hS4VgSTumn">
        <img src="https://badgen.net/discord/members/hS4VgSTumn">
    </a>
</p>

## Summary

- [Summary](#summary)
- [Useful links](#useful-links)
- [Installation](#installation)
  - [Prerequisites](#prerequisites-)
  - [Automatic install](#automatic-install)
  - [Manual install](#manual-install)
- [change the theme of the M-A-P](#change-the-theme-of-the-m-a-p)
- [Made using...](#made-using)

## Useful links

- [3D files needed to be printed](https://github.com/M-A-P-Organisation/3D-files)
- [the discord bot (soon deprecated)](https://github.com/M-A-P-Organisation/discord-bot)
- [the plant database](https://github.com/M-A-P-Organisation/MiFloraDB)

## Installation

### Prerequisites

You need to have nodejs/npm installed.

### Automatic install

```sh
git clone --recursive https://github.com/apoleon33/M-A-P.git
# once its done and you have cd-ed on the right directory:
./install.sh
```

### Manual install

```sh
git clone --recursive https://github.com/apoleon33/M-A-P.git
# once its done and you have cd-ed on the right directory:
yarn install# install needed component like electron or serialport
yarn run sass # preprocess the sass
yarn start # launch the M-A-P. Have fun!
```

The arduino also require the [DHT sensor library ](https://github.com/adafruit/DHT-sensor-library) by adafruit to work

## Build the M-A-P

- for the actual platform:

```sh
yarn dist
```

- for a specific platform:

`yarn dist -- ` and:

```sh
--mac, -m, -o, --macos # Build for macOS
--linux, -l #Build for Linux
--win, -w, --windows # Build for Windows
```

See [electron-builder](https://www.electron.build/cli) for a complete list of the targets availables.

## change the theme of the M-A-P

All the themes are contained in themeManager.py

```sh
pip install -r requirements.txt
npm run change-palette -- --palette=NameOfThePalette
npm run sass # re-preprocess the sass
```

## Made using...

The M-A-P was made using:

| Arduino                                                                                                                                                                                                          |                                                          Backend                                                          |                                                                                                                                                                                                                                                                                       Frontend |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://www.arduino.cc/"><img src="https://cdn.worldvectorlogo.com/logos/arduino-1.svg" width="32"></a>                                                                                                 |     <a href="https://nodejs.org/en/"><img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width="32"></a>     | <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://cdn.worldvectorlogo.com/logos/html-1.svg" width="32"></a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" width="32"></a> |
| <a href="https://github.com/adafruit/DHT-sensor-library"><img src="https://yt3.ggpht.com/hme3lW9xG5CzDVFK7292X0uDm1Jhk6e3C4bEBzX_RKz1hNVJyIRfTebu4oPRWRxAfBqh-CvQVY8=s176-c-k-c0x00ffffff-no-rj" width="32"></a> |          <a href="https://serialport.io/"><img src="https://serialport.io/img/nodebots-logo.svg" width="32"></a>          |                                                                       <a href="https://sass-lang.com/"><img src="https://cdn.worldvectorlogo.com/logos/sass-1.svg" width="32"></a> <a href="https://reactjs.org/"><img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="32"></a> |
|                                                                                                                                                                                                                  | <a href="https://github.com/discordjs/RPC"><img src="https://cdn.worldvectorlogo.com/logos/discord-6.svg" width="32"></a> |                                                                                                                                                                          <a href="https://www.electronjs.org/"><img src="https://cdn.worldvectorlogo.com/logos/electron-1.svg" width="32"></a> |
