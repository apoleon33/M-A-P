#!/bin/bash
root=`pwd`
cd back
python3 plant_chooser.py
cd
ls
cd $root
ls
cd back
python3 main.py #& cd front && webdev serve
