#!/bin/bash
python3 chooserFrontline.py
root=`pwd`
one=$1
two=$2
random_var=4

cd front
#npm run build-type # run the "build-type" package script (useless if it does not work)

cd
echo "do you want to launch the simulator? [y/n]"
read simu_bool

if [ simu_bool == "y" ]
then

	echo "choose the actualisation time:"
	read actualisation

	#launch simulator and frontend
	cd $root
	python3 simulator.py $aactualisation & cd front && npm start

else

	#launch the serial communication and the frontend
	cd $root
	python3 serial_communication.py & cd front && npm start
fi