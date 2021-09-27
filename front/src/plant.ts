import { ipcRenderer } from 'electron';
class plante {
    constructor(
        public temperature:number[],
        public eau:number[],
    ){
        this.temperature = temperature;
        this.eau = eau;
    }

    get water(){
        return this.eaux();
    }
    
    eaux(){
        ipcRenderer.send('temp_ultimate','')
        ipcRenderer.on('temp_ultimate', (event, arg) =>{
            return arg
        })
    }
}