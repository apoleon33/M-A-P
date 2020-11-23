class Plante():
    def __init__ (self,nom,temps,humidite,chaleur,arrosage):
        self.name = nom
        self.time = temps #en secondes
        self.humidite = humidite #en %
        self.chaleur = chaleur #en degrés celsus
        self.arrosage = arrosage #en jour
        self.arrosagetemps = 0 #secondes

def lastdata(fichier):
    content_variable = open(fichier, "r")
    file_lines = content_variable.readlines () 
    content_variable.close ()
    last_line = file_lines [ len ( file_lines ) -1]
    datal = last_line.split(",")
    data = datal[1]
    return(data)
