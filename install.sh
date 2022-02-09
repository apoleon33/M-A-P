#!/bin/bash

# clone the repo
echo "cloning the M-A-P..."
git clone --recursive https://github.com/apoleon33/M-A-P.git
cd M-A-P

# install required python packages
echo "installing required python packages..."
pip install -r requirements.txt

# install required node packages
echo "installing required npm packages"
cd src/front
npm install

# compile the discord bot:
echo "compiling discord bot, don't forget to add your token in src/front/.env for it to work!"
npm run compile-bot
