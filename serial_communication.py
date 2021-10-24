import serial
import sys
import os
import time
import datetime
import json
from editing_command import*

vide = ""
humi = "front/data/hum.txt"
temp_now = "front/data/temp_0.txt"
temp_10h = "front/data/temp_10.txt"
temp_20h = "front/data/temp_20.txt"
temp_30h = "front/data/temp_30.txt"
NoSerial = True
port = serial.Serial("/dev/ttyACM0", baudrate=9600)
time.sleep(2)


def Seri():
    try:
        with open("front/data/plant.json", "r") as main:
            file = json.load(main)

        with open("front/data/choice.txt", "r") as plante:
            y = plante.readline()

        port.write(file[y]["signe"].encode())

        ultimate_temperature = [
            file[y]["temperature"]["hiver"],
            file[y]["temperature"]["été"]
        ]

        ultimate_water = [
            file[y]["eau"]["hiver"],
            file[y]["eau"]["été"]
        ]

        sec_check = 0
        # infinite loop
        while True:
            data1 = port.readline()
            data2 = port.readline()
            data3 = port.readline()
            data4 = port.readline()
            time_now = datetime.date.fromtimestamp(time.time())
            month = time_now.month  # if its winter/summer
            temperature = str(data1[0:len(data1)-2].decode("utf-8"))
            humidity = str(data2[0:len(data2)-2].decode("utf-8"))
            taux1 = str(data3[0:len(data3)-2].decode("utf-8"))
            taux2 = str(data4[0:len(data4)-2].decode("utf-8"))
            print(temperature)

            replace(temp_20h, temp_30h)
            replace(temp_10h, temp_20h)
            replace(temp_now, temp_10h)
            writing(temp_now, temperature)
            writing(humi, humidity)
            os.remove(temp_now)
            with open(temp_now, "w") as temp_n:
                temp_n.write(temperature)
                pass

            if month >= 4 and month <= 9:  # summer
                if temperature < ultimate_temperature[1]:
                    port.write('A')

                if taux1 < 20 and ultimate_water[1] == "coupelle":
                    port.write('B')

                if taux1 < 20 and ultimate_water[1] == "sec":
                    sec_check += 1
                    if sec_check >=2 :
                        port.write('B')
                        sec_check = 0
                
                if taux2 < 20 and ultimate_temperature[1] == "pot" :
                    port.write('C')

            else: # winter
                if temperature < ultimate_temperature[0]:
                    port.write('A')

                if taux1 < 20 and ultimate_water[0] == "coupelle":
                    port.write('B')

                if taux1 < 20 and ultimate_water[0] == "sec":
                    sec_check += 1
                    if sec_check >=2 :
                        port.write('C')
                        sec_check = 0
                
                if taux2 < 20 and ultimate_temperature[0] == "pot" :
                    port.write('B')
    except:
        NoSerial = False


while NoSerial:
    Seri()

print("serial connection stopped")
