import RPi.GPIO as GPIO
import dht11
from datagest import *
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
arduino = serial.Serial('/dev/ttyACM0',9600)
data = arduino.readline()
#indentation
instance = dht11.DHT11(pin = 19)
GPIO.setup(12, GPIO.OUT) #resistance
GPIO.setup(5,GPIO.OUT) #lampe
GPIO.setup(13,GPIO.OUT)#pompe
result = instance.read()

#lecture de la temperature et de l'humiditée
def temp_hum(temp,hum):
	if result.is_valid():
    	print("Temperature: %-3.1f C" % result.temperature)
    	print("Humidity: %-3.1f %%" % result.humidity)
    	with open("../data/temp.txt","a") as file:
        	file.write("\n"+str())
    	#add_temp(0, result.temperature)
		add_hum(0, result.humidity)
	else:
    	print("Error: %d" % result.error_code)
def temp():
	return result.temperature
def hum():
	return result.humidity
#gestion de la lampe/de la resistance
def relai(lampe:bool=False,res:bool=False):
	if lampe ==True:
		GPIO.output(5,True)
	elif res==True:
		GPIO.output(12,True)
	else:
		GPIO.output(12,False)
		GPIO.output(5,False)
#gestion pompe
def pompe(pump:bool):
	if pump==True:
		GPIO.output(13,True)
	else:
		GPIO.output(13,False)
#gestion de la récupération des données
def arduino(var=False):
	data = arduino.readline()
  	decoded_bytes1 = str(data[0:3].decode("utf-8"))
  	decoded_bytes2 = str(data[3:len(data)-2].decode("utf-8"))

while True:
	#yes
	mois=datetime.now().month
	if mois<5 or mois>10:
		temp_ultimate=file['plant'][plant]['temperature']['hiver']
		water_ultimate=file['plant'][plant]['eau']['hiver']
	else:
		temp_ultimate=file['plant'][plant]['temperature']['été']
		water_ultimate=file['plant'][plant]['eau']['été']
	temp_actual=temp()
	if temp_actual< temp_ultimate:
		while temp_actual< temp_ultimate:
			relai(res=True)
	relai(res=False)
	data = arduino.readline()
  	pot = str(data[0:3].decode("utf-8"))
  	coupelle = str(data[3:len(data)-2].decode("utf-8"))
  	if coupelle<20 and water_ultimate=="coupelle":
  		pompe(True)
  	if pot<20 and water_ultimate=="pot":
  		pompe(True)
  	pompe(False)