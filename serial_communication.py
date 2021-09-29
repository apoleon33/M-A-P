import serial
import sys
import os
import time
import json
from editing_command import*
from plant_chooser import*
need = False
vide = ""
humi = "front/data/hum.txt"
temp_now = "front/data/temp_0.txt"
temp_10h = "front/data/temp_10.txt"
temp_20h = "front/data/temp_20.txt"
temp_30h = "front/data/temp_30.txt"
with open("front/data/plant.json","r") as main:
	fire=json.load(main)
try:
	with open("front/data/choice.txt") as iowa:
		oklahoma= iowa.readlines()
		vide=vide.join(oklahoma)
except:
	pass
while True:
	try:
		with serial.Serial("/dev/ttyACM0", baudrate=9600,timeout=39600) as port:
			if str(sys.argv[1]) == "-n" and not need:
				PlantChoice(port)
				need=True
			data1 = port.readline()
			data2 = port.readline()
			temperature = str(data1[0:len(data1)-2].decode("utf-8"))
			humidity = str(data2[0:len(data2)-2].decode("utf-8"))
			replace(temp_20h,temp_30h)
			replace(temp_10h,temp_20h)
			replace(temp_now,temp_10h)
			writing(temp_now,temperature)
			writing(humi,humidity)
			os.remove(temp_now)
			with open(temp_now,"w") as temp_n:
				temp_n.write(temperature)
				pass
	except:
		break
print("serial connection stopped")