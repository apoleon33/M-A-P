from editing_command import *
from algorithm import Plante
import serial
import os
import time

db = Database("front/data/old.db")

with open("front/data/choice.txt", "r") as plante:
    y = plante.readline()
chosenPlante = Plante(y)


humi = "front/data/hum.txt"
temp_now = "front/data/temp_0.txt"
temp_10h = "front/data/temp_10.txt"
temp_20h = "front/data/temp_20.txt"
temp_30h = "front/data/temp_30.txt"


port = serial.Serial("/dev/ttyACM0", baudrate=9600)
time.sleep(5)


def Seri() -> None:
    '''
    function that contain everything linked with the serial connection with the arduino
    '''
    port.write(b'D')
    data1 = port.readline()
    data2 = port.readline()
    data3 = port.readline()
    data4 = port.readline()

    temperature = str(data1[0:len(data1)-2].decode("utf-8"))
    humidity = str(data2[0:len(data2)-2].decode("utf-8"))
    taux1 = str(data3[0:len(data3)-2].decode("utf-8"))
    taux2 = str(data4[0:len(data4)-2].decode("utf-8"))

    chosenPlante.setTaux(taux1, taux2)
    chosenPlante.setTemperature(int(temperature))
    chosenPlante.setHumidity(int(humidity))

    db.insert_sql(temperature, humidity)
    replace(temp_20h, temp_30h)
    replace(temp_10h, temp_20h)
    replace(temp_now, temp_10h)
    writing(temp_now, temperature)
    writing(humi, humidity)
    os.remove(temp_now)
    with open(temp_now, "w") as temp_n:
        temp_n.write(temperature)

    # plant managing
    chosenPlante.decision(port)

    # wait 10h (36000000s)
    # 30s
    time.sleep(600)


while True:
    Seri()

print("serial connection stopped")
