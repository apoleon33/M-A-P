#!/bin/bash
echo "installing needed component..."
yarn # install needed component like electron or serialport
echo "done!"

echo "preprocessing the sass..."
yarn run sass # preprocess the sass
echo "done!"

echo "launching the M-A-P..."
yarn start # launch the M-A-P. Have fun!
