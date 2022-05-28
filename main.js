const electron = require("electron");
const { ipcMain } = require("electron");
const csv = require("csv-parser");

const fs = require("fs");
const path = require("path");
const { SerialPort } = require("serialport");
const DiscordRPC = require("discord-rpc");

// required by the discord bot
const { Utils, CommandClient } = require("detritus-client");
const { Embed } = Utils;
require("dotenv").config();

const port = new SerialPort({
  // connection port for the arduino
  path: "/dev/ttyACM0",
  baudRate: 9600,
});

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

const delayOfActualisation = 36000000; // in ms <=> 10h
const args = process.argv.slice(2); // to know if the user launch the simulator

// the plant class
class Plant {
  constructor() {
    this.name = "";
    this.maxTemperature = 0;
    this.minTemperature = 0;
    this.ultimateHumidity = 0;
    this.minHumidity = 0;
    this.actualTemperature = 0;
    this.actualHumidity = 0;
    this.historicOfTemperature = [0, 0, 0, 0, 0, 0]; // somes 0 so if the user check tu temperture while nothin has been sent by the arduino it return a graphic with value to 0
    this.HistoricOfHumidity = [0, 0, 0, 0];
    this.image = "";
    this.ultimateMoist = 0;
    this.moist = 0;
  }

  getLast30Hour() {
    return this.historicOfTemperature.slice(-4);
  }

  setTemperature(newTemperature) {
    this.historicOfTemperature.push(this.actualTemperature);
    this.actualTemperature = newTemperature;
  }

  setHumidity(newHumidity) {
    this.HistoricOfHumidity.push(this.actualHumidity);
    this.actualHumidity = newHumidity;
  }

  takeDecision() {
    // The algorithm to take care of the plant
    // not elaborated at all
    if (this.actualTemperature < this.minTemperature) {
      // if its cold
      port.write("A");
    }
    if (this.moist < this.ultimateMoist) {
      // if there is not enough water
      port.write("B");
    }
  }
}

const plant = new Plant();

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

// the serial connection
port.on("open", serialCommunication);
function serialCommunication() {
  // the function that will deal with the serial communication

  function sendMessage() {
    port.write("D");
    port.on("data", function (data) {
      plant.setTemperature(data);
      plant.takeDecision();
    });
  }

  // wait 10h before checking again
  setInterval(sendMessage, delayOfActualisation);
}

// the simulator if needed

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

if (args == "-s") {
  console.log("starting simulator with a delay of 60s \n");
  function setRandomValues() {
    plant.setTemperature(getRandomInt(40));
    plant.setHumidity(getRandomInt(100));
  }

  setInterval(setRandomValues, 60000); // actualise every minutes
}

// connection with de renderer via ipcMain
ipcMain.on("need-hum", (event) => {
  event.returnValue = plant.actualHumidity;
});

ipcMain.on("temp_one", (event) => {
  event.returnValue = plant.getLast30Hour();
});

ipcMain.on("temp_ultimate", (event) => {
  event.returnValue = [plant.minTemperature, plant.maxTemperature];
});

ipcMain.on("PlanteInformation", (event) => {
  event.returnValue = [plant.name, plant.image];
});

ipcMain.on("getPlantAvailable", (event) => {
  let allPlantAvailable = [];

  fs.createReadStream("plant-database/PlantDB_5335_U0.csv")
    .pipe(csv())
    .on("data", (row) => {
      allPlantAvailable.push({
        pid: row.alias,
        image: row.image,
      });
    })
    .on("end", () => {
      event.reply("getPlantAvailable", allPlantAvailable);
    });
});

ipcMain.on("plantChosen", (event, arg) => {
  plant.name = arg;
  fs.createReadStream("plant-database/PlantDB_5335_U0.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.alias == arg) {
        let planteInformationFromRenderer = row;
        plant.maxTemperature = planteInformationFromRenderer.max_temp;
        plant.minTemperature = planteInformationFromRenderer.min_temp;
        plant.maxHumidity = planteInformationFromRenderer.max_env_humid;
        plant.minHumidity = planteInformationFromRenderer.min_env_humid;
        plant.image = planteInformationFromRenderer.image;
        plant.ultimatemoist = planteInformationFromRenderer.min_soil_moist;
      }
    })
    .on("end", () => {
      console.log(`${plant.name} succesfully chosed!`);
    });
});

// discord rich presence (https://bit.ly/36AGK8p)
const clientId = "779764098774204447";
const rpc = new DiscordRPC.Client({ transport: "ipc" });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  const boops = await mainWindow.webContents.executeJavaScript("window.boops");

  rpc.setActivity({
    details: `temperature: ${plant.actualTemperature} °C`,
    startTimestamp,
    largeImageKey: "plant",
    largeImageText: "M-A-P",
    smallImageKey: "simulation",
    smallImageText: "using the simulator",
    instance: false,
  });
}

rpc.on("ready", () => {
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
  prefix: "map",
});

// things that don't need to be actualised
var date = new Date();
var month = date.getMonth() + 1; // +1 because im in france, change it depending where you are

commandClient.add({
  // help command
  name: "help",
  run: (context, args) => {
    const embed = new Embed();
    embed.setColor(0x325c34);
    embed.setTitle("Help");
    embed.setDescription(
      "you need help with the map or its discord bot? It's out there!"
    );
    embed.setThumbnail(
      "https://raw.githubusercontent.com/apoleon33/M-A-P/main/src/front/src/assets/plant.png"
    );

    // useful links
    embed.addField(
      "github:",
      "[organization](https://github.com/M-A-P-Organisation/)",
      false
    );
    embed.addField("discord", "[here](https://discord.gg/hS4VgSTumn)", false);

    // commands
    embed.addField(
      "know the general information of the plant:",
      "`map dashboard`",
      false
    );
    embed.addField(
      "know the temperature of the 10 last hour:",
      "`map temperature`",
      false
    );
    embed.addField("know the humidity:", "`map humidity`", false);
    embed.addField("graphic of the last 30h:", "`map graph`", false);

    return context.editOrReply({ embed, reference: true });
  },
});

commandClient.add({
  // general information about the plant
  name: "dashboard",
  run: (context, args) => {
    const embed = new Embed();
    embed.setColor(0x325c34);
    embed.setTitle("Dashboard");
    embed.setThumbnail(
      "https://raw.githubusercontent.com/apoleon33/M-A-P/main/src/front/src/assets/plant.png"
    );

    embed.addField(`plant name: `, ` ${plant.name}`, false);
    embed.addField(
      `actual temperature: `,
      ` ${plant.actualTemperature} °C`,
      false
    );
    embed.addField(`actual humidity: `, ` ${plant.actualHumidity} %`, false);
    embed.addField(`Max temperature: `, ` ${plant.maxTemperature} °C`, false);
    embed.addField(`Min temperature: `, `${plant.minTemperature} °C`, false);

    return context.editOrReply({ embed, reference: false });
  },
});

commandClient.add({
  // temperature
  name: "temperature",
  run: (context, args) => {
    const embed = new Embed();
    embed.setColor(0x850606);
    embed.setTitle("Temperature");
    embed.addField(`actual temperature`, `${plant.actualTemperature}°C`, false);
    embed.addField("max temperature", `${plant.maxTemperature} °C`, false);
    embed.addField("min temperature", `${plant.minTemperature} °C`, false);
    embed.addField(
      "temperature 10h ago",
      `${
        plant.historicOfTemperature[plant.historicOfTemperature.length - 2]
      } °C`,
      false
    );

    return context.editOrReply({ embed, reference: false });
  },
});

commandClient.add({
  // humidity
  name: "humidity",
  run: (context, args) => {
    //actual doughnut graph
    var empty = 100 - plant.actualHumidity;
    const chart = {
      type: "doughnut",
      data: {
        labels: ["humidity", "o"],
        datasets: [
          {
            backgroundColor: ["#5AA65F", "transparent"],
            borderColor: "transparent",
            data: [plant.actualHumidity, empty],
          },
        ],
      },
      options: {
        title: {
          display: false,
          color: "white",
        },
        rotation: 215,
      },
      legend: { display: false },
    };
    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

    const embed = new Embed();
    embed.setColor(0x0000ff);
    embed.setTitle("Humidity");
    embed.addField("actual humidity", plant.actualHumidity + "%", true);
    embed.setImage(chartUrl);

    return context.editOrReply({ embed, reference: false });
  },
});

commandClient.add({
  // graph of the past 30h

  name: "graph",
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
            data: [
              plant.maxTemperature,
              plant.maxTemperature,
              plant.maxTemperature,
              plant.maxTemperature,
            ],
            borderColor: "#46814A",
            fill: false,
          },
          {
            data: [
              plant.minTemperature,
              plant.minTemperature,
              plant.minTemperature,
              plant.minTemperature,
            ],
            borderColor: "#509455",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    };
    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

    const embed = new Embed();
    embed.setTitle("temperature evoluton in the past 30h");
    embed.setImage(chartUrl);

    return context.editOrReply({ embed, reference: false });
  },
});

(async () => {
  const client = await commandClient.run();
  console.log("succesfully launched map.exe");
})();
