import serial
import os
humi = "/front/data/hum.txt"
temp_now = "/front/data/temp_0.txt"
temp_10h = "/front/data/temp_10.txt"
temp_20h = "/front/data/temp_20.txt"
temp_30h = "/front/data/temp_30.txt"
def replace(before:str,after:str):
	os.remove(after)
	with open(before,"r") as temp:
		tempe = temp.readlines()
	with open(after,"w") as tem:
		tem.write(tempe)
def writing(file:str,don):
	os.remove(file)
	with open(file,"w") as files:
		files.write(don)
while True:
	with serial.Serial("/dev/ttyACM0", baudrate=9600,timeout=39600) as port:
		data = port.readline()
		temperature = str(data[0:4].decode("utf-8"))
		humidity = str(data[4:len(data)-2].decode("utf-8"))
		replace(temp_20h,temp_30h)
		replace(temp_10h,temp_20h)
		replace(temp_now,temp_10h)
		writing(temp_now,temperature)
		writing(humi,humidity)
		os.remove(temp_now)
		with open(temp_now,"w") as temp_n:
			temp_n.write(temperature)