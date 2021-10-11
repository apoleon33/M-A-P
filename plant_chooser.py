import serial
import json
import os


def PlantChoice(port=False, simulator=False):
    with open("front/data/plant.json", "r") as main:
        file = json.load(main)
    with open("front/data/choice.txt", "r") as plante:
        y = plante.readline()
    if not simulator:
        try:
            port.write(file[y]["signe"].encode())
        except:
            pass
