import serial
import json
import os
x=1
u=1
port=serial.Serial("/dev/ttyACM0", baudrate=9600)
try:
	os.remove("/home/pi/autgrow/data/choice.txt")
except:
	pass
with open("/home/pi/autgrow/data/plant.json","r") as main:
	file=json.load(main)
for i in file:
	print(str(x)+":"+str(file[i]["nom"]))
	x+=1
chose=int(input("choisissez votre plante dans la liste ci dessus (par leur numéro)"))
for y in file:
	if u==chose:
		with open('home/pi/autogrow/data/choice.txt',"a") as yeah:
			yeah.write(file[y]["signe"])
			print("done!")
	u+=1
port.write(file[y]["signe"])