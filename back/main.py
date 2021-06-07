import serial
port = serial.Serial("/dev/rfcomm0", baudrate=9600)
with open("../data/choice.txt","r") as read:
	port.write(str(read.readline()))
