#!/bin/bash
root=`pwd`
cd front
cd
function arduino {
	echo "reseting arduino (even if you choosed the simulator)..."
	cd $root/reset
	arduino-cli compile --fqbn arduino:avr:uno reset.ino 
	arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno reset.ino
	sleep 1
	cd $root/DigitalReadSerial
	arduino-cli compile --fqbn arduino:avr:uno DigitalReadSerial.ino 
	arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno DigitalReadSerial.ino
}


function checkout {
	echo "plant already choosed, do you want to choose a new one? [y/n]"
	read rlly
	if [ "$rlly" == "y" ]
	then
		arduino
		rm "$root/front/data/choice.txt"
		cd $root
		python3 plant_chooser.py
	elif [ "$rlly" = "n" ]
	then
		echo ""
	else
		echo "unvalid answerd, try again"
		checkout
	fi
}


if [ -e "$root/front/data/choice.txt" ]
then
	clear
	checkout
else
	cd $root
	python3 plant_chooser.py
	cd
fi
cd $root
if [ $1 ]
then
	if [ $1 == "-s" ]
	then
		if [ $2 ]
		then
			python3 simulator.py $2 & cd front && npm start
		else
			echo "please specify an actualisation time for the simulator"
		fi
	else
		echo "unrecognized argument"
	fi
else
	python3 serial_communication.py &  cd front && npm start
fi 
