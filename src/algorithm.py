import json
import time
import datetime
import serial


class Plante():
    def __init__(self, name):
        with open("front/data/plant.json", "r") as main:
            file = json.load(main)

        self.name = name
        self.ideal_temperature = [
            file[self.name]["temperature"]["hiver"],
            file[self.name]["temperature"]["été"]
        ]

        self.ideal_water = [
            file[self.name]["eau"]["hiver"],
            file[self.name]["eau"]["été"]
        ]

        self.temperature = None
        self.humidity = None
        self.taux1 = None
        self.taux2 = None
        self.sec_check = 0

    def setTaux(self, data1, data2):
        self.taux1 = data1
        self.taux2 = data2

    def setTemperature(self, temperature):
        self.temperature = temperature

    def setHumidity(self, humidity):
        self.humidity = humidity

    def decision(self, port: object):
        '''
        The algorithm that will manage the plant itself.
        divided in 2 category,if we are in summer (spring + summer) or in winter (autumn + winter)
        '''
        time_now = datetime.date.fromtimestamp(time.time())
        month = time_now.month  # if its winter/summer
        if month >= 4 and month <= 9:  # summer
            # i is the index wether its summer/winter
            i = 1
        else:  # winter
            i = 0

        if self.temperature < self.ideal_temperature[i]:
            port.write(b'A')

        if self.taux1 < 20 and self.ideal_water[i] == "coupelle":
            port.write(b'B')

        if self.taux1 < 20 and self.ideal_water[i] == "sec":
            self.sec_check += 1
            if self.sec_check >= 2:
                port.write(b'B')
                self.sec_check = 0

        if self.taux2 < 20 and self.ideal_water[i] == "pot":
            port.write(b'C')
