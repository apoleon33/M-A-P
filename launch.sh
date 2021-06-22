#!/bin/bash
root=`pwd`
cd back
sudo pip install -r requirements.txt
cd
cd $root
if [ -f "choice.txt" ];then
	python3 back/plant_chooser.py
fi
python3 back/main.py