const electron = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs');
// Permet de gérer les evenements système
const app = electron.app
// Permet de gérer les fenetres
const BrowserWindow = electron.BrowserWindow
// Gardez une référence globale de l'objet "window", si vous ne le faites pas, la fenêtre se ferme automatiquement lorsque l'objet JavaScript est nettoyé.
let mainWindow
function createWindow () {
  // Création d'une fenetre en résolution 480x320
  mainWindow = new BrowserWindow({
    width: 480, 
    height: 320,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }})

  // La fenetre va charger notre fichier index.html
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  // Cet evenement est déclenché lorsque la fenetre est fermée
  mainWindow.on('closed', function () {
    // réinitialisation de l'objet "window"
    mainWindow = null
  })
}
// Cet évenement est déclenché lorsque Electron a terminé son initialisation. On lance la création de la fenêtre à ce moment là
app.on('ready', createWindow)
// Cet évenement est déclenché lorque toutes les fenêtres sont fermées (pour notre exemple nous n'avons qu'une seule fenêtre mais il est possble de gérer le multi-fentres)
app.on('window-all-closed', function () {
  // Sur OS X, il est courant que les applications puissent rester active jusqu'à ce que l'utilisateur quitte explicitement via la commande "Cmd + Q"
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // Sur OS X, il est courant de re-créer une fenêtre dans l'application lorsque l'icône du dock est cliqué et il n'y a pas d'autres fenêtres ouvertes.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('need-plant', (event, arg) => {
  console.log(arg) // affiche "ping"
  const plant= fs.readFileSync('data/choice.txt','utf8')
  event.reply('plant-needed', plant)
})
ipcMain.on('need-hum',(event, arg) => {
  console.log(arg) // affiche "ping"
  const hum= fs.readFileSync('data/hum.txt','utf8')
  console.log(hum)
  event.reply('humidity', hum)
})
ipcMain.on('need-temp',(event, arg) => {
  console.log(arg) // affiche "ping"
  const hum= fs.readFileSync('data/temp.txt','utf8')
  console.log(hum)
  var hu=45
  event.reply('temperature', hu)
})
ipcMain.on('temp_one',(event, arg) => {
  console.log('1')
  var temp0 = fs.readFileSync('data/temp_0.txt','utf8')
  var temp10 = fs.readFileSync('data/temp_10.txt','utf8')
  var temp20 = fs.readFileSync('data/temp_20.txt','utf8')
  var temp30 = fs.readFileSync('data/temp_30.txt','utf8')
  var dat= [temp0,temp10,temp20,temp30]
  console.log(dat)
  event.reply('temp_one_answerd',dat)
})
ipcMain.on('temp_ultimate',(event, arg) =>{
  var d = new Date();
  var n = d.getMonth()+1;
  const plant = fs.readFileSync('data/choice.txt','utf8')
  let fichier = fs.readFileSync('data/plant.json','utf8')
  let personne = JSON.parse(fichier)
  if ((n <4)||(n>9)){
    var name = personne[plant]["temperature"]["hiver"]}
  else{
    var name = personne[plant]["temperature"]["été"]
    console.log('j arrive ici')
  }
  event.reply('temp_ultimate_answerd',name)
})