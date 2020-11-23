import time
from models import *

def tempsecoule(temps):
    mois = 0
    jour = 0
    heure = 0
    minute = 0
    secondes = 0
    if temps//2592000>0:
        mois = temps//2592000
        j = temps % 2592000
        if j//86400>0:
            jour = j//86400
            h = j % 86400
            if h//3600>0:
                heure = h//3600
                m = h%3600
                if m//60>0:
                    minute = m//60
                    secondes = m%60
                else:
                    secondes = temps
            else:
                m = temps%3600
                if m//60>0:
                    minute = m//60
                    secondes = m%60
                else:
                    secondes = temps
        else:
            heure = temps//3600
            m = temps%3600
            if m//60>0:
                minute = m//60
                secondes = m%60
            else:
                secondes = temps
    else:
        jour = temps//86400
        h = temps % 86400
        if h//3600>0:
            heure = h//3600
            m = h%3600
            if m//60>0:
                minute = m//60
                secondes = m%60
            else:
                secondes = temps
        else:
            m = temps%3600
            if m//60>0:
                minute = m//60
                secondes = m%60
            else:
                secondes = temps
    final =  "Mois : "+str(mois)+',\nJours : '+str(jour)+",\nHeures : "+str(heure)+",\nMinutes : "+str(minute)+",\nSecondes : "+str(secondes)
    return final

def tempsmoins(x,lat):
    wait = lat*3600*24
    waitrest = wait - x
    return(waitrest//3600)
