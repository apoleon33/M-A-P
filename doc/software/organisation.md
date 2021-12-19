# Organisation
How the files are organised

## tree structure
```
doc/ where you are at the moment :)
src/ directory with all the source code
   |->Arduino/main/ code flashed on the arduino
   |->front/ the nodejs directory
      |->main.js server-side js file
      |->data/ written/read data
         |->plant.json all plant's data useful
         |->choice.txt plant choosed by the user
         |->hum.txt humidity of the plant
         |->temp_0\_10\_20\30.txt temperature of the plant
         |->src/ everything rendered by the electron app
             |->index.html the html file
             |->app.css generic css file
             |->app.js everything logic for the ui/ux
             |->navbar.css the navbar
   |->DiscordIntegration.py the rich presence in case of the simulator
   |->editing_command.py all functions for file modifications
   |->plantChoice.py the ui to make the user choose his/her plant
   |->serial_communication.py the algorithm to manage the plant and decoding of the serial part
   |->launch.sh bash script to coordonate everything

```

## communications between each scripts
<img src="https://github.com/apoleon33/M-A-P/blob/main/doc/software/organisation_map.jpg" alt="" width="960" height="540">

<p></p>

### the electron app
<img src="https://github.com/apoleon33/M-A-P/blob/main/doc/software/organisation_map_electron.jpg" alt="" width="960" height="540">