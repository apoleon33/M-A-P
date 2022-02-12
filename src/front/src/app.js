const { ipcRenderer } = require("electron");

function waiting() {
    console.log("ready!");
}

function home() {
  var house = document.getElementById("main_box");
  house.innerHTML = "<h1>M-A-P</h1>";
  try {
    var toErase = document.getElementById("actualize");
    toErase.remove();
  } catch (error) {
    console.log("no");
  }
  let text = document.createElement("h2");
  text.id = "hh";
  text.textContent = "chosen plant: ";
  ipcRenderer.send("PlanteInformation", "");
  ipcRenderer.on("PlanteInformation", (event, arg) => {
    text.textContent += arg;
  });
  try {
    var ye = document.getElementById("hh");
    house.replaceChild(text, ye);
  } catch (error) {
    house.appendChild(text);
  }
}

function humidity() {
  var house = document.getElementById("main_box");
  house.innerHTML = "<h3>humidity:</h3>";
  house.innerHTML += '<canvas id="myChart"></canvas>';
  //var ctx = document.getElementById();
  var xValues = ["humidity", ""];
  ipcRenderer.send("need-hum", "");
  ipcRenderer.on("humidity", (event, arg) => {
    var vide = 100 - arg;
    var yValues = [arg, vide];
    var barColors = ["#0E361D", "transparent"];
    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            borderColor: "#5AA65F",
            data: yValues,
          },
        ],
      },
      options: {
        title: {
          display: false,
        },
        rotation: 215,
      },
      legend: {
        display: false,
      },
    });
  });
}

function temperature() {
  var house = document.getElementById("main_box");
  house.innerHTML = "<h3>Temperature:</h3>";
  house.innerHTML += '<canvas id="myChart"></canvas>';
  //var ctx = document.getElementById("myChart");
  ipcRenderer.send("temp_one", "");
  ipcRenderer.on("temp_one", (event, arge) => {
    ipcRenderer.send("temp_ultimate", "");
    ipcRenderer.on("temp_ultimate", (event, arg) => {
      var xValues = [-30, -20, -10, 0];
      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              data: arge,
              borderColor: "red",
              fill: true,
            },
            {
              data: [arg, arg, arg, arg],
              borderColor: "black",
              fill: false,
            },
          ],
        },
        options: {
          legend: { display: false}
        },
      });
    });
  });
}

//since plant.ts does not work for the moment
//let plante = new Plante();
setTimeout(waiting, 1000);
home();