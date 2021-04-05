import RPi.GPIO as GPIO
import dht11
import sqlite3
import serial
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
def temp_hum():
	if result.is_valid():
    	print("Temperature: %-3.1f C" % result.temperature)
    	print("Humidity: %-3.1f %%" % result.humidity)
    	#ajouter code pur mettre dans la base de donnée
	else:
    	print("Error: %d" % result.error_code)
def relai(lampe:bool,res:bool):
	if lampe ==True:
		GPIO.output(5,True)
	elif res==True:
		GPIO.output(12,True)
	else:
		GPIO.output(12,False)
		GPIO.output(5,False)
def pompe(pump:bool):
	if pump==True:
		GPIO.output(13,True)
	else:
		GPIO.output(13,False)
def arduino():
	capt1=[]
	capt2=[]
	data = arduino.readline()
	for i in data:
		if i=="a":
			var=True
		if var==True:
			capt2.append(str(i))
		else:
			capt1.append(str(i))
	capt1_decoded = str(capt1[0:len(capt1)].decode("utf-8"))
	capt2_decoded = str(capt2.decode("utf-8"))