from tkinter import*
import asyncio
from arrosage import arrose
import time
from models import *
import pandas as pd
plantesdb = pd.read_csv("db.csv")
i = 1
root = Tk()
user = StringVar()
cadre = Frame(root, width=380, height=380, borderwidth=1)
root.title("choose your plant")
cadre.pack(fill=BOTH, side="top")
Label(cadre, text=" choisissez votre plante (par son numéro dans la liste):").pack(side=LEFT)
Entry(cadre, textvariable=user).pack(side=LEFT)  
for plantechoix in list(plantesdb):
    label(cadre, text(=i,"-",plantechoix))
    i+=1
x=user.get()
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
mainloop()
