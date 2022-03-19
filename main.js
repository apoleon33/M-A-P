const electron = require("electron");
const { ipcMain } = require("electron");
const fs = require("fs");
const path = require('path');
const { SerialPort } = require('serialport')
const DiscordRPC = require("discord-rpc");

// reqauired by the discord bot
const { Constants, Interaction, Structures, Utils } = require('detritus-client');
const { CommandClient } = require('detritus-client');
const { Embed, Markup } = Utils;
var Chart = require('chart.js');
require('dotenv').config()

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
    this.historicOfTemperature = [0,0,0,0,0,0] // somes 0 so if the user check tu temperture while nothin has been sent by the arduino it return a graphic with value to 0
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
  plant.minTemperature = personne["parameter"]["min_temp"]
  plant.maxHumidity = personne["parameter"]["max_env_humid"]
  plant.minHumidity = personne["parameter"]["min_env_humid"]
  plant.image = personne["image"]
})

// discord rich presence (https://github.com/discordjs/RPC/blob/master/example/main.js)
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

// discord bot
// originally on a separated repository: https://github.com/M-A-P-Organisation/discord-bot

const token = process.env.TOKEN;
const commandClient = new CommandClient(token, {
  prefix: 'map',
});

// things that don't need to be actualised
var date = new Date();
var month = date.getMonth() + 1; // +1 because im in france, change it depending where you are

commandClient.add({
  // help command
  name:'help',
  run: (context,args) => {
    const embed = new Embed()
    embed.setColor(0x325C34)
    embed.setTitle("Help")
    embed.setDescription("you need help with the map or its discord bot? It's out there!")
    embed.setThumbnail("https://raw.githubusercontent.com/apoleon33/M-A-P/main/src/front/src/assets/plant.png")

    // useful links
    embed.addField("github:","[organization](https://github.com/M-A-P-Organisation/)",false)
    embed.addField("discord","[here](https://discord.gg/hS4VgSTumn)",false)

    // commands
    embed.addField("know the general information of the plant:", "`map dashboard`",false)
    embed.addField("know the temperature of the 10 last hour:", "`map temperature`", false )
    embed.addField("know the humidity:" ,"`map humidity`", false)
    embed.addField("graphic of the last 30h:", "`map graph`", false)

    return context.editOrReply({embed, reference: true});
  },
})

commandClient.add({
  // general information about the plant
  name: 'dashboard',
  run: (context, args) => {

  	const embed = new Embed()
  	embed.setColor(0x325C34)
  	embed.setTitle("Dashboard")
  	embed.setThumbnail("https://raw.githubusercontent.com/apoleon33/M-A-P/main/src/front/src/assets/plant.png")

  	embed.addField(`plant name: `, ` ${plant.name}`, false)
  	embed.addField(`actual temperature: `, ` ${plant.actualTemperature} °C`  ,false)
  	embed.addField(`actual humidity: `, ` ${plant.actualHumidity} %`,false)
  	embed.addField(`Max temperature: `, ` ${plant.maxTemperature} °C`, false)
    embed.addField(`Min temperature: `, `${plant.minTemperature} °C`, false)

  	return context.editOrReply({embed, reference: false});
  },
});

commandClient.add({
  // temperature
  name: 'temperature',
  run: (context, args) => {

  	const embed = new Embed()
  	embed.setColor(0x850606)
  	embed.setTitle("Temperature")
  	embed.addField(`actual temperature`, `${ plant.actualTemperature }°C`,false)
  	embed.addField("max temperature", `${ plant.maxTemperature } °C`, false)
    embed.addField("min temperature", `${ plant.minTemperature } °C`, false)
  	embed.addField("temperature 10h ago", `${ plant.historicOfTemperature[plant.historicOfTemperature.length - 2] } °C`, false)

  	return context.editOrReply({embed, reference: false});
  },
});

commandClient.add({
  // humidity
  name: 'humidity',
  run: (context, args) => {

    //actual doughnut graph
    var empty = 100 - plant.actualHumidity;
    const chart = {
      type: 'doughnut',
      data: {
        labels: ["humidity", "o"],
        datasets: [
          {
            backgroundColor: ["#5AA65F", "transparent"],
            borderColor: 'transparent',
            data: [plant.actualHumidity, empty],
          },
        ],
      },      
      options: {
        title: {
          display: false,
          color:'white',
        },
        rotation: 215,
      },      
      legend: {display: false,},
    }
    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

  	const embed = new Embed()
  	embed.setColor(0x0000ff)
  	embed.setTitle("Humidity")
  	embed.addField("actual humidity",plant.actualHumidity + "%",true)
    embed.setImage(chartUrl)

  	return context.editOrReply({embed, reference: false});
  },
});

commandClient.add({
  // graph of the past 30h

  name: 'graph',
  run: (context, args) => {

    const chart = {
        type: "line",
        data: {
          labels: [-30, -20, -10, 0],
          datasets: [
            {
              data: plant.getLast30Hour(),
              borderColor: "#325C34",
              fill: true,
            },
            {
              data: [plant.maxTemperature, plant.maxTemperature , plant.maxTemperature, plant.maxTemperature],
              borderColor: "#46814A",
              fill: false,
            },
            {
              data: [plant.minTemperature, plant.minTemperature, plant.minTemperature, plant.minTemperature],
              borderColor: "#509455",
              fill: false,
            }
          ],
        },
        options: {
          legend: { display: false}
        },
      }
    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

    const embed = new Embed()
    embed.setTitle('temperature evoluton in the past 30h')
    embed.setImage(chartUrl)

    return context.editOrReply({embed, reference: false});
  },
});

(async () => {
  const client = await commandClient.run();
  console.log("succesfully launched map.exe");
})();
