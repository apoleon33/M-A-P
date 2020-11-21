import asyncio
from arrosage import arrose
import time
from models import *
import pandas as pd
plantesdb = pd.read_csv("db.csv")
i = 1
print("Choisissez votre plante parmis la liste proposée :")
for plantechoix in list(plantesdb):
    print(i,"- ",plantechoix)
    i+=1
x = int(input("entrez l'index de votre plante: "))
donnéesplante = pd.read_csv('db.csv', usecols= [x-1])
name = donnéesplante.columns[0]
temps = int(donnéesplante.iloc[0])
humidité = int(donnéesplante.iloc[1])
chaleur = int(donnéesplante.iloc[2])
arrosage = int(donnéesplante.iloc[3])
ph = str(donnéesplante.iloc[4])
plante = Plante(name,temps,humidité,chaleur,arrosage,ph)

async def arrosoir():
    await asyncio.sleep(plante.arrosage*24*3600)
    arrose()




