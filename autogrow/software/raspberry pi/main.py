from tkinter import*
import asyncio
from arrosage import arrose
import time
from models import *
import pandas as pd
print("lets go")
def choixDesPlantes():
    print(plantechoix)
    donnéesplante = pd.read_csv('/home/pi/autogrow/autogrow/software/raspberry pi/db.csv', usecols= [idPlante-1])
    name2 = donnéesplante.columns[0]
    name4 = "plante actuellement choisi:"
    name3= name4 +str(name2)
    Label(cadre, text=name3).pack(side=BOTTOM)
plantesdb = pd.read_csv("/home/pi/autogrow/autogrow/software/raspberry pi/db.csv")
i = 1
def quit():
   root.destroy()
root = Tk()
root.geometry('480x320')
idPlante=0
user = StringVar()
cadre = Frame(root, width=380, height=380, borderwidth=1)
root.title("choose your plant")
cadre.pack(fill=BOTH, side="top")
menuPlante = Menubutton(cadre, text='plante', width='20', borderwidth=2, bg='gray', activebackground='darkorange',relief = RAISED)
menuPlante.pack(side=BOTTOM)
Label(cadre, text=" choisissez votre plante (par son numéro dans la liste):").pack(side=LEFT) 
menuDeroulant1 = Menu(menuPlante)

for plantechoix in list(plantesdb):
     menuDeroulant1.add_checkbutton(label=plantechoix, command = choixDesPlantes ,variable=idPlante, onvalue=i, offvalue=0)
     i+=1
#bTest = IntVar()
#menuDeroulant1.add_checkbutton(label="noice", variable=bTest, onvalue=1, offvalue=0)
menuPlante.configure(menu=menuDeroulant1)  
x=1
donnéesplante = pd.read_csv('/home/pi/autogrow/autogrow/software/raspberry pi/db.csv', usecols= [idPlante])
name = donnéesplante.columns[0]
temps = int(donnéesplante.iloc[0])
humidité = int(donnéesplante.iloc[1])
chaleur = int(donnéesplante.iloc[2])
arrosage = int(donnéesplante.iloc[3])
#ph = str(donnéesplante.iloc[4])
plante = Plante(name,temps,humidité,chaleur,arrosage)
Button(root, text="choisir cette plante", command=quit).pack()

async def arrosoir():
    await asyncio.sleep(plante.arrosage*24*3600)
    arrose()
mainloop()
