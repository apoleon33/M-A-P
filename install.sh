#!/bin/bash
#install a lot of things
root=`pwd`
pip install -r requirements.txt
cd front
npm install
export DISPLAY=:0.0 #for electron to work perfectly with ssh
#install arduino required parts (probably useless)
arduino-cli config init
arduino-cli core update-index
arduino-cli core install arduino:avr
arduino-cli lib install "RTClib"
#manual installation of the dht11 library
cd
cp -r $root/Arduino/lib/dht11 /Arduino/libraries