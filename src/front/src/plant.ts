//not working
//work in progress :)
const { ipcRenderer } = require("electron");

class Plante {
  static planStat: number[];
  humidite: number = 0;
  static plantData;
  nomm: string;
  useless: boolean = false;
  constructor(public plant: string) {
    const temperature: number = 0;
    this.plant = plant;
    ipcRenderer.send("PlanteInformation", "");
    ipcRenderer.on("PlanteInformation", (event, arg: string) => {
      this.nomm = arg;
    });
    console.log(this.nomm);
    ipcRenderer.send("temp_one", "balance la tempe now");
    ipcRenderer.on("temp_one_answerd", (event, arg: number[]) => {
      Plante.planStat = arg;
    });
  }

  get name() {
    console.log(this.nomm);
    return this.nomm;
  }

  get tempe() {
    console.log(Plante.planStat);
    var date = new Date();
    var mois = date.getMonth() + 1;
    if (mois < 4 || mois > 9) {
      return Plante.planStat["temperature"]["hiver"];
    } else {
      return Plante.planStat["temperature"]["été"];
    }
  }

  get humidity() {
    ipcRenderer.send("need-hum", "");
    ipcRenderer.on("humidity", (event, arg: number) => {
      this.humidite = arg;
    });
    return this.humidite;
  }

  get allTemperature() {
    return Plante.planStat;
  }
}
