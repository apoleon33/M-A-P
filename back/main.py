import RPi.GPIO as GPIO
import dht11
#from datagest import *
import serial
from datetime import datetime
import json
with open("../data/plant.json","r") as read:
	file=json.load(read)
with open("../data/choice.txt","r") as text:
	plant=str(text.readline())
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()
#arduino = serial.Serial('/dev/ttyACM0',9600)
#data = arduino.readline()
#indentation
instance = dht11.DHT11(pin = 19)
GPIO.setup(12, GPIO.OUT) #resistance
GPIO.setup(5,GPIO.OUT) #lampe
GPIO.setup(13,GPIO.OUT)#pompe
result = instance.read()
#lecture de la temperature et de l'humiditée
#def temp_hum(temp,hum):
#	if result.is_valid():
#    	print("Temperature: %-3.1f C" % result.temperature)
#   	print("Humidity: %-3.1f %%" % result.humidity)
#    	with open("../data/temp.txt","a") as file:
#        	file.write("\n"+str(hum))
#        with open("../data/hum.txt","a") as second_file:
#        	second_file.write("\n"+str(temp))
#    	#add_temp(0, result.temperature)
#		add_hum(0, result.humidity)
#	else:
#    	print("Error: %d" % result.error_code)
while True:
	mois=datetime.now().month
	print("1")
	result = instance.read()
	print("2")
	if mois<5 or mois>10:
		print("boucle if 1")
		temp_ultimate=file[plant]["temperature"]["hiver"]
		water_ultimate=file[plant]["eau"]["hiver"]
	else:
		print("boucle if 2")
		temp_ultimate=file[plant]["temperature"]["été"]
		water_ultimate=file[plant]["eau"]["été"]
	temp_actual=result.temperature
	print("3")
	if temp_actual< temp_ultimate:
		print("boucle if 2")
		#while temp_actual< temp_ultimate:
		#	print("boucle tant que 1")
		#	GPIO.output(12,True)  #resistance
	GPIO.output(12,False)
	print("debut arduino")
	#data = arduino.readline()
	#pot = str(data[0:3].decode("utf-8"))
	#coupelle = str(data[3:len(data)-2].decode("utf-8")) #récupération des données de l'arduino
	#if coupelle<20 and water_ultimate=="coupelle":
	#	print("boucle if 3")
	#	GPIO.output(13,True)
	#if pot<20 and water_ultimate=="pot":  #pompe
	#	print("boucle if 4")
	#	GPIO.output(13,True)
	GPIO.output(13,False)
	print("fin")
