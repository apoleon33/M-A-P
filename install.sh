#!/bin/sh
#install a lot of things
root=`pwd`
pip install -r requirements.txt
cd front
npm install
export DISPLAY=:0.0 #for electron to work perfectly with ssh
#install arduino required parts
#even if there is a library to install manually
arduino-cli config init
arduino-cli core update-index
arduino-cli core install arduino:avr
arduino-cli lib install "RTClib"