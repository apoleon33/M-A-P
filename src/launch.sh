#!/bin/bash
python3 chooserFrontline.py
root=`pwd`
one=$1
two=$2
random_var=4

cd front
# npm run build-type # run the "build-type" package script (useless if it does not work)

cd
echo "do you want to launch the simulator? [y/n]"
read simu_bool

#recursive function to check the type of the actualisation variable
wrong_parameter() {
	echo "choose the actualisation time:"
	read actualisation
	if [[ $actualisation =~ ^[+-]?[0-9]+$ ]]; # if the actualisation time is an integer
	then
		# launch simulator and frontend
		cd $root
		python3 simulator.py $actualisation & cd front && npm start
	else
		echo "wrong type for the actualisation parameter, please retry"
		wrong_parameter
	fi
}

if [ $simu_bool == "y" ]
then
	wrong_parameter
else

	# launch the serial communication and the frontend
	cd $root
	python3 serial_communication.py & cd front && npm start
fi