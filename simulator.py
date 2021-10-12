from random import randint
from editing_command import *
from plant_chooser import PlantChoice
from rich import *
from pypresence import Presence
import sys
import os
import time

Actualisation_time = int(sys.argv[1])


def update_presence(x=0):
    start_time = time.time()
    RPC.update(large_image="plant",
               large_text="M-A-P",
               small_image="simulation",
               small_text="using the simulator",
               details="temperature: "+str(x)+" °C",
               start=start_time,
               buttons=[{"label": "github", "url": 'https://github.com/apoleon33/M-A-P'}])


humi = "front/data/hum.txt"
temp_now = "front/data/temp_0.txt"
temp_10h = "front/data/temp_10.txt"
temp_20h = "front/data/temp_20.txt"
temp_30h = "front/data/temp_30.txt"
client_id = '779764098774204447'
RPC = Presence(client_id)
RPC.connect()
print("starting simulator with a delay of "+str(sys.argv[1])+"s")

PlantChoice(simulator=True)
for i in range(100):
    temperature = str(randint(20, 40))
    humidity = str(randint(0, 100))
    update_presence(temperature)
    replace(temp_20h, temp_30h)
    replace(temp_10h, temp_20h)
    replace(temp_now, temp_10h)
    writing(temp_now, temperature)
    writing(humi, humidity)
    os.remove(temp_now)
    with open(temp_now, "w") as temp_n:
        temp_n.write(temperature)
        pass
    time.sleep(Actualisation_time)

print("simulator finished")
