const { ipcRenderer } = require("electron");

function home() {
    var main = document.getElementById("liste plante");
    ipcRenderer.send("ListPlant", "");
    ipcRenderer.on("ListPlant", (event, arg) => {
        for (var i = 0; i < arg.length; i++) {
            let name = document.createElement("li");
            name.id = arg[i];
            main.appendChild(name);
            var liste = document.getElementById(arg[i]);
            let bouton = document.createElement("button");
            bouton.textContent = arg[i];
            bouton.onclick = planteChoisi(arg[1]);
            liste.appendChild(bouton);
        }
    });
}

home()

function planteChoisi(plante) {
    //TODO
}