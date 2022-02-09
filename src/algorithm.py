import json

class Plante():
	def __init__(self,name):
		'''
		code to send to the arduino:
		A -> heat the resistor (lack of temperature)
		B ->
		'''
		with open(f"front/data/plant-database/json/{self.name}.json", "r") as main:
			file = json.load(main)

		self.name = name
		self.maxTemperature = file["parameter"]["max_temp"] # not sure if its useful
		self.minTemperature = file["parameter"]["min_temp"]

		self.minHumidity = file["parameter"]["min_soil_moist"]
		self.maxHumidity = file["parameter"]["max_soil_moist"]

		self.temperature = None
		self.humidity = None
		self.taux1 = None
		self.taux2 = None
		self.sec_check = 0

	def setTaux(self,data1,data2):
		self.taux1 = data1
		self.taux2 = data2

	def setTemperature(self,temperature):
		self.temperature = temperature

	def setHumidity(self,humidity):
		self.humidity = humidity

	def decision(self,port:object):
		
		if self.temperature < self.minTemperature:
			port.write(b'A')

		if self.taux1 < self.minHumidity:
			port.write(b'B')
		'''
		if self.taux1 < 20 and self.ideal_water[i] == "sec":
			self.sec_check += 1
			if self.sec_check >= 2:
				port.write(b'B')
				self.sec_check = 0

		if self.taux2 < 20 and self.ideal_water[i] == "pot":
			port.write(b'C')'''