const { ipcRenderer } = require("electron");

function waiting() {
    console.log("ready!");
}

function home() {
    var house = document.getElementById("main_box");
    house.innerHTML = "<h1>autogrow</h1>";
    try {
        var toErase = document.getElementById("actualize");
        toErase.remove();
    } catch (error) {
        console.log("no");
    }
    let text = document.createElement("h2");
    text.id = "hh";
    text.textContent = "choosen plant:";
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
    reset(true);
    var house = document.getElementById("main_box");
    house.innerHTML = "<h3>humidity:</h3>";
    house.innerHTML += '<canvas id="myChart"></canvas>';
    var ctx = document.getElementById("myChart");
    var xValues = ["humidity", ""];
    ipcRenderer.send("need-hum", "");
    ipcRenderer.on("humidity", (event, arg) => {
        var vide = 100 - arg;
        var yValues = [arg, vide];
        var barColors = ["blue", "transparent"];
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    borderColor: "#5AA65F",
                    data: yValues,
                }, ],
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
    reset(false);
    var house = document.getElementById("main_box");
    house.innerHTML = "<h3>Temperature:</h3>";
    house.innerHTML += '<canvas id="myChart"></canvas>';
    var ctx = document.getElementById("myChart");
    ipcRenderer.send("temp_one", "");
    ipcRenderer.on("temp_one", (event, arge) => {
        ipcRenderer.send("temp_ultimate", "");
        ipcRenderer.on("temp_ultimate", (event, arg) => {
            var xValues = [-30, -20, -10, 0];
            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
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
                    legend: { display: false },
                },
            });
        });
    });
}

function reset(lik) {
    var menu = document.getElementById("menu");
    let bouton = document.createElement("button");
    let image = document.createElement("img");
    bouton.id = "actualize";
    bouton.classList = "rotation";
    image.id = "ya";
    image.classList = "rotation";
    image.src = "assets/refresh.png";
    image.width = "30";
    image.height = "30";
    if (lik) {
        bouton.onclick = humidity;
    } else {
        bouton.onclick = temperature;
    }
    try {
        var texas = document.getElementById("actualize");
        var chicago = document.getElementById("ya");
        menu.replaceChild(bouton, texas);
        menu.replaceChild(image, chicago);
    } catch (error) {
        menu.appendChild(bouton);
        var chicago = document.getElementById("actualize");
        chicago.appendChild(image);
    }
}
//since plant.ts does not work for the moment
//let plante = new Plante();
setTimeout(waiting, 1000);
home();