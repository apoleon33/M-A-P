import sys
import Adafruit_DHT
import time
i = 0
while True:
    humidite, temperature = Adafruit_DHT.read
    fichier = open("humidite.txt", "a")
    fichier.write("\n",i,",",humidite)
    fichier.close()
    fichier = open("temperature.txt", "a")
    fichier.write("\n",i,",",temperature)
    fichier.close()
    i+=1
    time.sleep(3600)
