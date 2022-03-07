const electron = require("electron");
const { ipcMain } = require("electron");
const fs = require("fs");
const path = require('path');
const { SerialPort } = require('serialport')
const Plant = require('./plantClass').default

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

const directoryPath = path.join(__dirname, '/plant-database/json');


// the plant class


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



// THINGS TO CHANGE LATER
//////////////////////////
ipcMain.on("need-plant", (event) => {
  const plant = fs.readFileSync("data/choice.txt", "utf8");
  event.reply("plant-needed", plant);
});

ipcMain.on("need-hum", (event) => {
  const hum = fs.readFileSync("data/hum.txt", "utf8");
  event.reply("humidity", hum);
});

ipcMain.on("need-temp", (event) => {
  const hum = fs.readFileSync("data/temp.txt", "utf8");
  var hu = 45;
  event.reply("temperature", hu);
});

ipcMain.on("temp_one", (event) => {
  var temp0 = fs.readFileSync("data/temp_0.txt", "utf8");
  var temp10 = fs.readFileSync("data/temp_10.txt", "utf8");
  var temp20 = fs.readFileSync("data/temp_20.txt", "utf8");
  var temp30 = fs.readFileSync("data/temp_30.txt", "utf8");
  var dat = [temp30, temp20, temp10, temp0];
  event.reply("temp_one", dat);
});

ipcMain.on("temp_ultimate", (event) => {
  var d = new Date();
  var n = d.getMonth() + 1;
  const plant = fs.readFileSync("data/choice.txt", "utf8");
  let fichier = fs.readFileSync(
    `data/plant-database/json/${plant}.json`,
    "utf8"
  );
  let personne = JSON.parse(fichier);
  var name = personne["parameter"]["max_temp"];
  let ultimateTemperature = [name,personne["parameter"]["min_temp"] ]
  event.reply("temp_ultimate", ultimateTemperature);
});

ipcMain.on("PlanteInformation", (event) => {
  const plant = fs.readFileSync("data/choice.txt", "utf8");
  let fichier = fs.readFileSync(
    `data/plant-database/json/${plant}.json`,
    "utf8"
  );
  let personne = JSON.parse(fichier);
  planteInformation = [personne["pid"], personne["image"]];
  event.reply("PlanteInformation", planteInformation);
});
//////////////////////////


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
      
      if (fichier != "" && fichier != "null"){ // some files are empty or simply have "null" on it idk why
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
  let plant = new Plant(arg)
  console.log("arg received!")
  console.log(plant.name)
})