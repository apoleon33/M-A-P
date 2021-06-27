import serial
import os
port = serial.Serial("/dev/ttyACM0", baudrate=9600)
#with open("../data/choice.txt","r") as read:
	#port.write(str(read.readline()))
while True:
	data = port.readline()
	temperature = str(data[0:4].decode("utf-8"))
	humidity = str(data[4:len(data)-2].decode("utf-8"))
	with open('../data/temp.txt',"a") as temp:
		temp.write(temperature)
	with open('../data/hum.txt',"a") as hum:
		hum.write(humidity)