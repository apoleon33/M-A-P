#!/bin/bash
echo "please choose a plant in the list below:"
#lecture du json
read plant_choosen
root= `pwd`
cd data
echo $plant_choosen >> "choice.txt"
cd
cd $root
python3 back/main.py #& cd front && webdev serve