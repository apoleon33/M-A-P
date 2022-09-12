#!/bin/bash
echo "installing needed component..."
npm install # install needed component like electron or serialport
echo "done!"

echo "preprocessing the sass..."
npm run build # preprocess the sass
echo "done!"

echo "launching the M-A-P..."
npm start # launch the M-A-P. Have fun!