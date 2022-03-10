const electron = require("electron");
const { ipcMain } = require("electron");
const fs = require("fs");
const path = require('path');
const { SerialPort } = require('serialport')
const DiscordRPC = require("discord-rpc");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

const directoryPath = path.join(__dirname, '/plant-database/json');


// the plant class
class Plant {
  constructor() {
    this.name = "";
    this.maxTemperature = 0;
    this.minTemperature = 0
    this.ultimateHumidity = 0;
    this.minHumidity = 0
    this.actualTemperature = 0
    this.actualHumidity = 0
    this.historicOfTemperature = [0,0,0,0,0,0] // somes 0 so if the user check tu temperture while nothin has been sent by the arduino it return a grphic with value to 0
    this.HistoricOfHumidity = [0,0,0,0]
    this.image = ""
  }

  getLast30Hour(){
    return this.historicOfTemperature.slice(-4)
  }

  setTemperature(newTemperature){
    this.historicOfTemperature.push(this.actualTemperature)
    this.actualTemperature = newTemperature
  }

  setHumidity(newHumidity){
    this.HistoricOfHumidity.push(this.actualHumidity)
    this.actualHumidity = newHumidity
  }
}


const plant = new Plant()

// all the electron stuff
function createWindow(arg) {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 320,
    fullscreen: true,
    icon: `${__dirname}/src/assets/plant.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});




// connection with de renderer via ipcMain
ipcMain.on("need-hum", (event) => {
  event.returnValue = plant.actualHumidity;
});

ipcMain.on("need-temp", (event) => {
  const hum = fs.readFileSync("data/temp.txt", "utf8");
  var hu = 45;
  event.reply("temperature", hu);
});

ipcMain.on("temp_one", (event) => {
  event.returnValue = plant.getLast30Hour()
});

ipcMain.on("temp_ultimate", (event) => {
  event.returnValue =  [
      plant.minTemperature, 
      plant.maxTemperature
    ]
});

ipcMain.on("PlanteInformation", (event) => {
  event.returnValue = [plant.name,plant.image]
});

ipcMain.on("getPlantAvailable", (event) => {
  let allPlantAvailable = []

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) { // iterate on all of the file in the directory 
      let fichier = fs.readFileSync(
        `plant-database/json/${file}`,
        "utf8"
      );
      
      if (fichier != "" && fichier != "null"){ // some files are empty or simply have "null" on it idk why (might erased them one day)
        let fileDecoded = JSON.parse(fichier)
        allPlantAvailable.push({
          "pid": fileDecoded["pid"],
          "image":fileDecoded["image"]
        })
      }
    });

    event.reply("getPlantAvailable", allPlantAvailable);
  });
})

ipcMain.on("plantChosen", (event,arg) => {
  let fichier = fs.readFileSync(
    `plant-database/json/${arg}.json`,
    "utf8"
  );
  let personne = JSON.parse(fichier);

  plant.name = arg
  plant.maxTemperature = personne["parameter"]["max_temp"]
  plant.minTemperature = personne["parameter"]["max_env_humid"]
  plant.maxHumidity = personne["parameter"]["min_temp"]
  plant.minHumidity = personne["parameter"]["min_env_humid"]
  plant.image = personne["image"]
})

// discord rich presence
const clientId = '779764098774204447'
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  const boops = await mainWindow.webContents.executeJavaScript('window.boops');

  rpc.setActivity({
    details: `temperature: ${plant.actualTemperature} °C`,
    startTimestamp,
    largeImageKey: 'plant',
    largeImageText: 'M-A-P',
    smallImageKey: 'simulation',
    smallImageText: 'using the simulator',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);