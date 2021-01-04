import matplotlib
matplotlib.use('Agg')
from main import *
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import time
from tkinter import *
from random import *
import time
from asyncio import *
from tempscalcul import *
class SampleApp(Tk):
    def __init__(self, *args, **kwargs):
        Tk.__init__(self, *args, **kwargs)
        self.columnconfigure(1,minsize = 400)
        self.rowconfigure(1,minsize = 200)
        self.columnconfigure(2,minsize = 300)
        self.rowconfigure(2,minsize = 200)
        self.columnconfigure(3,minsize = 300)
        self.rowconfigure(3,minsize = 200)
        self.title("Healthy Plant")
        self.geometry("1080x720")
        self.minsize(480,360)
        #self.iconbitmap('/home/pi/autogrow/autogrow/software/raspberry pi/logo.xbm')
        self.tk.call('wm', 'iconphoto', window._w, img)
        self.config(background='#2c2f33')
        self.titre = Label(self,text = "Plant's Stats", font =("Courrier", 40), bg="#2c2f33", fg='white')
        self.titre.grid(row = 1,column = 2)
        nomp = "Nom de la plante : "+plante.name
        self.nom = Label(self,text = nomp, font =("Courrier",15), bg="#2c2f33", fg='white')
        self.nom.grid(row = 2,column = 1,columnspan = 2)
        self.clock = Label(self, text="",bg = "lightblue",font = ("Courrier",13),relief = "raised")
        self.clock.grid(row = 3,column = 1,columnspan = 2)
        self.framehum = Frame(bg = "lightgreen",bd = 10,padx = 20,pady = 30,relief = "raised")
        self.frametemp = Frame(bg = "lightgreen",bd = 10,padx = 20,pady = 30,relief = "raised")
        self.datahum = Label(self.framehum,text = "",bg = "lightgreen",bd = 10,font = ("Courrier", 13))
        self.datahum.pack()
        self.datatemp = Label(self.frametemp,text = "",bg = "lightgreen",bd = 10,font = ("Courrier", 13))
        self.datatemp.pack()

        def graph(quoi,constante,db,ylabel,legend1,legend2):
            fig = plt.figure(facecolor = "darkgrey")
            ax1 = fig.add_subplot(1,1,1)
            ax2 = fig.add_subplot(1,1,1)
        
            def animate(i):
                pullData = open(db,"r").read()
                dataArray = pullData.split('\n')
                xar = []
                yar = []
                for eachLine in dataArray:
                    if len(eachLine)>1:
                        x,y = eachLine.split(',')
                        xar.append(int(x))
                        yar.append(int(y))
                ax1.clear()
                ax2.clear()
                plt.grid()
                plt.ylabel('Température en degrés celsus')
                plt.xlabel("Temp heures depuis l'initialisation (en heure)")
                plt.title(quoi)
                ax1.plot(xar,yar, label = legend2)
                yar.clear()
                for i in range(len(xar)):
                    yar.append(constante)
                ax2.plot(xar,yar, label = legend1)
                plt.legend(loc = "upper left") 
            ani = animation.FuncAnimation(fig, animate, interval=1000)
            plt.show()
        
        def graphtemp():
            graph("Température",plante.chaleur,"temperature.txt","Température en degrés celsus","Température idéale","Température réelle")
        
        def graphhum():
            graph("Humidité",plante.humidite,"humidite.txt","Humidité en %","Humidité idéale","Humidité réelle")

        self.btemp = Button(self.frametemp,text ="Graphique des températures",command = graphtemp,cursor = "hand1",relief = "groove")
        self.bhum = Button(self.framehum,text = "Graphique de l'humidité", command = graphhum,cursor = "hand1",relief = "groove")
        self.btemp.pack()
        self.bhum.pack()
        self.framehum.grid(row = 2,column = 2,columnspan = 2)
        self.frametemp.grid(row = 3,column = 2,columnspan = 2)
        self.labarrose = Label(self,text = "",bg = "lightblue",bd = 10,font = ("Courrier", 13),relief = "raised")
        self.labarrose.grid(row = 4,column = 1,columnspan = 4)

        # start the clock "ticking"
        self.update_clock()
        self.update_temp()
        self.update_hum()
        self.update_tempsarrose()
    def update_hum(self):
        data = lastdata("humidite.txt")
        data = "Humidité actuelle : "+ str(data)+"\nHumidité conseillée : "+str(plante.humidite)
        self.datahum.configure(text = data)
        self.after(1000,self.update_hum)

    def update_temp(self):
        data = lastdata("temperature.txt")
        data = "Température actuelle : "+ str(data)+"\nTempérature conseillée : " + str(plante.chaleur)
        self.datatemp.configure(text = data)
        self.after(1000,self.update_temp)

    def update_tempsarrose(self):
        plante.arrosagetemps += 1
        nowarrose = tempsmoins(plante.arrosagetemps,plante.arrosage)
        now = "Il reste "+str(nowarrose)+" heures avant le prochaine arrosage."
        self.labarrose.configure(text=now)
        self.after(1000, self.update_tempsarrose)

    def update_clock(self):
        plante.time += 1
        now = tempsecoule(plante.time)
        nowe = "Temps écoulé depuis l'initialisation :\n"+now
        self.clock.configure(text=nowe)
        # call this function again in one second
        self.after(1000, self.update_clock)



app = SampleApp()
img = PhotoImage(file='/home/pi/autogrow/autogrow/software/raspberry pi/logo.xbm')
app.mainloop()
