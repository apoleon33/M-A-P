#!/bin/bash
root=`pwd`
sudo pip install -r requirements.txt
if [ -f "choice.txt" ];then
	python3 back/plant_chooser.py
fi
python3 back/main.py