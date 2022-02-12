#!/bin/bash
# script launched by the user to coordonate everything 

root=$(pwd)
one=$1
two=$2
random_var=4

hum="hum.txt"
temp_0="temp_0.txt"
temp_10="temp_10.txt"
temp_20="temp_20.txt"
temp_30="temp_30.txt"

# clear of needed files
check_files() {
	if [[ -e $1 ]]
	then
		echo "" > $1
	else 
		touch $1
	fi
}

#recursive function to check the type of the actualisation variable
wrong_parameter() {
	echo "choose the actualisation time:"
	read -r actualisation
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

cd front/data
check_files $hum
check_files $temp_0
check_files $temp_10
check_files $temp_20
check_files $temp_30
cd $root

python3 plantChoice.py
if [ $? -eq 44 ] #if the user clicked on "cancel"
then
    echo "exited succesfully"
else
    cd front
    cd
    echo "do you want to launch the simulator? [y/n]"
    read -r simu_bool

    if [ $simu_bool == "y" ]
    then
	    wrong_parameter
    else
        # launch the serial communication and the frontend
	    cd $root
        python3 serial_communication.py & cd front && npm start
    fi
fi
pkill python3 # kill all process starting with python3, like serial_communication.py or simulator.py