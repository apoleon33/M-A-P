#!/bin/bash
root=`pwd`
sudo pip install -r requirements.txt
cd
if [ -e "$root/front/data/choice.txt" ]
then
	echo "plant already choosed"
else
	cd ${root}/back
	python3 plant_chooser.py
	cd
fi
python3 ${root}/back/serial_communication.py &  cd "${root}/front" && yarn run test  