#!/bin/bash
root=`pwd`
one=$1
two=$2
random_var=4
cd front
npm run build-type # run the "build-type" package script
cd

function arduino { #maybe/probably useless
	echo "reseting arduino (even if you choosed the simulator)..."
	cd $root/Arduino/reset
	arduino-cli compile --fqbn arduino:avr:uno reset.ino 
	arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno reset.ino
	sleep 1
	cd $root/Arduino/DigitalReadSerial
	arduino-cli compile --fqbn arduino:avr:uno DigitalReadSerial.ino 
	arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno DigitalReadSerial.ino
}


function checkout {
	echo "plant already choosed, do you want to choose a new one? [y/n]"
	read rlly
	if [ "$rlly" == "y" ]
	then
		#arduino
		rm "$root/front/data/choice.txt"
		cd $root
		python3  serial_communication.py -n &
	elif [ "$rlly" = "n" ]
	then
		echo ""
	else
		echo "unvalid answerd, try again"
		checkout
	fi
}

function argument_check {
	if [ $one ]
	then
		if [ $one == "-s" ]
		then
			if [ $two ]
			then
				random_var=1
				#then go simulator
			else
				echo "please specify an actualisation time for the simulator"
				random_var=2
			fi
		else
			echo "unrecognized argument"
			random_var=2
		fi
	else
		random_var=3
	fi
}

function verif {
	if [ -e "$root/front/data/choice.txt" ]
	then
		checkout
	else
		cd $root
		python3 serial_communication.py -n &
	fi
	cd $root
}

argument_check
if [ $random_var -eq 1 ]
then
	verif
	python3 simulator.py $2 & cd front && npm start
elif [ $random_var -eq 2 ]
then
	echo "something went wrong"
else
	verif
	cd front && npm start
fi