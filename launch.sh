#!/bin/bash
root=`pwd`
if [ -f "choice.txt" ];then
	python3 back/plant_chooser.py
fi
python3 back/main.py