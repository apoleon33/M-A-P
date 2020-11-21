class Plante():
    def __init__ (self,nom,temps,humidite,chaleur,arrosage,ph):
        self.name = nom
        self.time = temps #en secondes
        self.humidite = humidite #en %
        self.chaleur = chaleur #en degrés celsus
        self.arrosage = arrosage #en jour
        self.ph = ph 