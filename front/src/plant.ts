import { ipcRenderer } from "electron";

class Plante {
  static plantData: number[];
  constructor(public plant: string) {
    const temperature = 0;
    const eau = 0;
    this.plant = plant;
    Plante.ChoixPlante(plant);
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

  static ChoixPlante(choixp: string) {
    ipcRenderer.send("PlanteInformation", choixp);
    ipcRenderer.on("PlanteInformation", (event, arg: number[]) => {
      //organisation de planteData:
      //[ nom scientifique , nom commun , [temperature été,hiver] , [eau été,hiver] ]
      Plante.plantData = arg;
    });
  }
}
