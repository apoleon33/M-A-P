# M-A-P 
**an invention to manage a plant automatically**

[![CodeFactor](https://www.codefactor.io/repository/github/apoleon33/m-a-p/badge/main)](https://www.codefactor.io/repository/github/apoleon33/m-a-p/overview/dev) [![GitHub stars](https://badgen.net/github/stars/apoleon33/M-A-P)](https://github.com/apoleon33/M-A-P/stargazers/) [![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html) [![C# Discord](https://badgen.net/discord/members/hS4VgSTumn)](https://discord.gg/hS4VgSTumn)

## Installation

### prerequisites :
you need to have those 3 installed:
1. node.js/npm
2. python/pip
3. bash

### automatic install

```sh
curl -s https://raw.githubusercontent.com/apoleon33/M-A-P/main/install.sh | sh
 ```

### manual install

```sh
git clone --recursive https://github.com/apoleon33/M-A-P.git && cd M-A-P
 ```

then you will have to install the needed python packages :
(once you cd in M-A-P)
```sh
pip install -r requirements.txt
 ```
 then you will have to install the required npm packages:
 (once you are in M-A-P/src/front)
 ```sh
npm install
 ```

If you want to use the bot discord you will have to compile the typescript file, then add you bot's token in `src/front/.env` 
```sh
# in src/front
npm run compile-bot
```

 The arduino also require the [
DHT sensor library ](https://github.com/adafruit/DHT-sensor-library) by adafruit to work