#!/bin/bash
root= `pwd`
cd data
echo $* >> "choice.txt"
cd $root
python3 back/main.py & cd front && webdev serve