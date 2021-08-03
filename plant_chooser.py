import serial
import json
import os
x=1
u=1
try:
	port=serial.Serial("/dev/ttyACM0", baudrate=9600)
except:
	print("pas de communication série")
try:
	os.remove("/front/data/choice.txt")
except:
	pass
with open("front/data/plant.json","r") as main:
	file=json.load(main)
for i in file:
	print(str(x)+":"+str(file[i]["nom"]))
	x+=1
chose=int(input("choisissez votre plante dans la liste ci dessus (par leur numéro)"))
for y in file:
	if u==chose:
		yeah= open('front/data/choice.txt',"w")
		yeah.write(str(file[y]["nom"]))
		print("done!")
		yeah.close()
	u+=1
try:
	port.write(file[y]["signe"].encode())
except:
	pass