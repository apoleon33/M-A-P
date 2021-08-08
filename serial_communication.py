import serial
import os
import time
import json
vide=""
humi = "front/data/hum.txt"
temp_now = "front/data/temp_0.txt"
temp_10h = "front/data/temp_10.txt"
temp_20h = "front/data/temp_20.txt"
temp_30h = "front/data/temp_30.txt"
with open("front/data/plant.json","r") as main:
	fire=json.load(main)
with open("front/data/choice.txt") as iowa:
	oklahoma= iowa.readlines()
	vide=vide.join(oklahoma)
def replace(before:str,after:str):
	os.remove(after)
	string=""
	with open(before,"r") as temp:
		tempe = temp.readlines()
	with open(after,"w") as tem:
		tem.write(string.join(tempe))
def writing(file:str,don):
	os.remove(file)
	with open(file,"w") as files:
		files.write(don)
while True:
	try:
		with serial.Serial("/dev/ttyACM0", baudrate=9600,timeout=39600) as port:
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
print("connexion série interrompu, fin du script")