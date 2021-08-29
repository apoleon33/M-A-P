import sys
from random import randint
import os
from editing_command import*
from time import sleep
Actualisation_time= int(sys.argv[1])
humi = "front/data/hum.txt"
temp_now = "front/data/temp_0.txt"
temp_10h = "front/data/temp_10.txt"
temp_20h = "front/data/temp_20.txt"
temp_30h = "front/data/temp_30.txt"
print("starting simulator with a delay of "+str(sys.argv[1])+"s")
for i in range(100):
	temperature=str(randint(20,40))
	humidity=str(randint(0,100))
	replace(temp_20h,temp_30h)
	replace(temp_10h,temp_20h)
	replace(temp_now,temp_10h)
	writing(temp_now,temperature)
	writing(humi,humidity)
	os.remove(temp_now)
	with open(temp_now,"w") as temp_n:
		temp_n.write(temperature)
		pass
	sleep(Actualisation_time)
print("simulator finished")