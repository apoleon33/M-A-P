#!/bin/bash

#clone the repo
echo "cloning the M-A-P..."
git clone https://github.com/apoleon33/M-A-P.git
cd M-A-P

#install required python packages
echo "installing required python packages..."
pip install -r requirements.txt

#install required node packages
echo("installing required npm packages")
cd src/front
npm install