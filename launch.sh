#!/bin/bash
#####################################
# étapes 1 : vérifier les arguments entrées
# étape 3 : agir en conséquence
python3 chooserFrontline.py
root=`pwd`
one=$1
two=$2
random_var=4
cd front
#npm run build-type # run the "build-type" package script
cd
if [ $1 ]
then
	if [ $1 == "-s" ]
	then
		if [ $2 ]
		then
			#launch simulator and frontend
			cd $root
			python3 simulator.py $2 & cd front && npm start
		else
			echo "please specify an actualisation time for the simulator"
		fi
	else
		echo "unrecognized argument"
	fi
else
	#launch the serial communication and the frontend
	cd $root
	python3 serial_communication.py & cd front && npm start
fi
