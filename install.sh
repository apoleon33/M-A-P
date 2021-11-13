#!/bin/bash
#install a lot of things
#this script should be launched before televersing to the arduino
root=`pwd`

#install required python packages
pip install -r requirements.txt

#install required node packages
cd src/front
npm install

#manual installation of the dht11 library for the arduino
#maybe useless
cd
echo "installing manually the dht11 arduino library"
cp -r $root/src/Arduino/lib/dht11 $HOME/Arduino/libraries
echo "done!"