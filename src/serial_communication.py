import serial
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
sec_check = 0
NoSerial = True
port = serial.Serial("/dev/ttyACM0", baudrate=9600)
time.sleep(2)

#---------plant managing----------#
def decision(temperature: int, taux1: int, taux2: int, ultimate_temperature: list, ultimate_water: list, sec_check:int) -> int:
    '''
    The algorithm that will manage the plant itself.
    divided in 2 category, whether we are in summer (spring + summer) or in winter (autumn + winter)
    take 6 arguments : 
        temperature : int : the actual temperature in the greenhouse
        taux1 : int : the water level at the base of the plant
        taux2 : int: the water level in the cup
        ultimate_temperature : list : the best temperature for the plant, in this form [winter,summer]
        ultimate_water : list : the best water management for the plant, in this form [winter,summer]
        sec_check : int : a condition of the plant, so its watered less often

    and return :
        sec_check : int : so the value is not loosed
    '''

    time_now = datetime.date.fromtimestamp(time.time())
    month = time_now.month  # if its winter/summer
    if month >= 4 and month <= 9:  # summer
        if temperature < ultimate_temperature[1]:
            port.write('A')

        if taux1 < 20 and ultimate_water[1] == "coupelle":
            port.write('B')

        if taux1 < 20 and ultimate_water[1] == "sec":
            sec_check += 1
            if sec_check >= 2:
                port.write('B')
                sec_check = 0

        if taux2 < 20 and ultimate_temperature[1] == "pot":
            port.write('C')

    else:  # winter
        if temperature < ultimate_temperature[0]:
            port.write('A')

        if taux1 < 20 and ultimate_water[0] == "coupelle":
            port.write('B')

        if taux1 < 20 and ultimate_water[0] == "sec":
            sec_check += 1
            if sec_check >= 2:
                port.write('C')
                sec_check = 0

        if taux2 < 20 and ultimate_temperature[0] == "pot":
            port.write('B')
    
    return sec_check

# choose of the plant
def plante_choosing():
    '''
    function that will make the user choose the plant he/she want, by showing every plant compatible
    '''
    x = 1
    u = 1

    try:
        os.remove("/front/data/choice.txt")
    except:
        print("no plant choosen before")

    with open("front/data/plant.json", "r") as main:
        file = json.load(main)

    for i in file:
        print(str(x)+":"+str(file[i]["nom"]))
        x += 1

    chose = int(
        input("choose your plant in the list above (by their number!)"))

    for y in file:
        if u == chose:
            yeah = open('front/data/choice.txt', "w")
            yeah.write(str(file[y]["real"]))
            print("done!")
            yeah.close()
        u += 1


def Seri() -> None:
    '''
    function that contain everything linked with the serial connection with the arduino
    '''

    try:
        with open("front/data/plant.json", "r") as main:
            file = json.load(main)

        with open("front/data/choice.txt", "r") as plante:
            y = plante.readline()

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
            temperature = str(data1[0:len(data1)-2].decode("utf-8"))
            humidity = str(data2[0:len(data2)-2].decode("utf-8"))
            taux1 = str(data3[0:len(data3)-2].decode("utf-8"))
            taux2 = str(data4[0:len(data4)-2].decode("utf-8"))

            replace(temp_20h, temp_30h)
            replace(temp_10h, temp_20h)
            replace(temp_now, temp_10h)
            writing(temp_now, temperature)
            writing(humi, humidity)
            os.remove(temp_now)
            with open(temp_now, "w") as temp_n:
                temp_n.write(temperature)
                pass

            sec_check=decision(temperature,taux1,taux2,ultimate_temperature,ultimate_water,sec_check)
    except:
        NoSerial = False


plante_choosing()
while NoSerial:
    Seri()

print("serial connection stopped")
