<h1 align="center">M-A-P</h1>
<h2 align="center">An invention to manage a plant automatically</h2>
<p align="center">
    <a href="https://github.com/apoleon33/M-A-P/releases">
        <img src="https://badgen.net/github/release/apoleon33/M-A-P">
    </a>
    <a href="https://www.codefactor.io/repository/github/apoleon33/m-a-p">
        <img src="https://www.codefactor.io/repository/github/apoleon33/m-a-p/badge">
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
  - [Prerequisites](#prerequisites)
  - [Automatic install](#automatic-install)
  - [Manual install](#manual-install)
- [Build the M-A-P](#build-the-m-a-p)
- [change the theme of the M-A-P](#change-the-theme-of-the-m-a-p)

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
yarn install # install needed component like electron or serialport
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

`yarn dist ` and:

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
yarn run change-palette --palette=NameOfThePalette
# then restart the M-A-P!
```
