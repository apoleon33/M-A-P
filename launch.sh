#!/bin/bash
root=`pwd`
sudo pip install -r requirements.txt
if [ -f "choice.txt" ];then
	python3 /home/pi/autogrow/back/plant_chooser.py
fi
python3 /home/pi/autogrow/back/main.py