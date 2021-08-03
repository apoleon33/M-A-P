#!/bin/bash
root=`pwd`
sudo pip install -r requirements.txt
cd
if [ -e "$root/front/data/choice.txt" ]
then
	echo "plant already choosed"
else
	cd $root
	python3 plant_chooser.py
	cd
fi
cd $root
python3 serial_communication.py &  cd front && yarn run test  