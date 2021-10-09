import { ipcRenderer } from "electron";

class Plante {
  static plantData: number[];
  humidite: number = 0;
  constructor(public plant: string) {
    const temperature: number = 0;
    const eau: number = 0;

    this.plant = plant;
    Plante.ChoixPlante();
  }

  get eaux() {
    return this.eaux();
  }

  get scientificNom() {
    return Plante.plantData[0];
  }

  get name() {
    return Plante.plantData[1];
  }

  get tempe() {
    var date = new Date();
    var mois = date.getMonth() + 1;
    if (mois < 4 || mois > 9) {
      return Plante.plantData[2][1];
    } else {
      return Plante.plantData[2][0];
    }
  }

  get humidity() {
    ipcRenderer.send("need-hum", "");
    ipcRenderer.on("humidity", (event, arg: number) => {
      this.humidite = arg;
    });
    return this.humidite;
  }
  static ChoixPlante() {
    ipcRenderer.send("PlanteInformation", "");
    ipcRenderer.on("PlanteInformation", (event, arg: number[]) => {
      //organisation de planteData:
      //[ nom scientifique , nom commun , [temperature été,hiver] , [eau été,hiver] ]
      Plante.plantData = arg;
    });
  }
}
