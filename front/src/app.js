import * as typee from "plant.js"
const { ipcRenderer } = require('electron')
function home(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h1>autogrow</h1>';
	ipcRenderer.send('need-plant', 'name')
	try{
		var toErase= document.getElementById('actualize');
		toErase.remove();
	}
	catch(error){
		console.log("no")
	}
	ipcRenderer.on('plant-needed', (event, arg) => {
		let text = document.createElement("h2")
		text.id = 'hh'
		text.textContent = "choosen plant:"
		text.textContent += arg
		try{
			var ye= document.getElementById('hh')
			house.replaceChild(text,ye);
		}
		catch(error){
			house.appendChild(text);
	}
	})
}
function humidity(){
	reset(true);
	var house = document.getElementById('main_box');
	house.innerHTML = '<h3>humidity:</h3>'
	house.innerHTML += '<canvas id="myChart"></canvas>'
	var ctx = document.getElementById('myChart');
	ipcRenderer.send('need-hum', 'now')
	ipcRenderer.on('humidity', (event, arg8) => {
		var vide =100-arg8
		var xValues = ["humidity", ""];
		var yValues = [arg8, vide];
		var barColors = ["blue", "transparent"];
		new Chart(ctx, {
	  type: "doughnut",
	  data: {
	    labels: xValues,
	    datasets: [{
	      backgroundColor: barColors,
	      borderColor:'#5AA65F',
	      data: yValues
	    }]
	  },
	  options: {
	    title: {
	      display: false
	    },
	    rotation:215,
	  },
	  legend: {
	  	display: false,
	  },
	});
	})
}
function temperature(){
	reset(false);
	var house = document.getElementById('main_box');
	house.innerHTML = '<h3>temperature:</h3>'
	house.innerHTML += '<canvas id="myChart"></canvas>'
	var ctx = document.getElementById('myChart');
	ipcRenderer.send('temp_one','balance la tempe now')
	ipcRenderer.on('temp_one_answerd', (event, arg) =>{
		ipcRenderer.send('temp_ultimate','tada')
		ipcRenderer.on('temp_ultimate_answerd', (event, arg2) =>{
			var xValues = [0,10,20,30];
			new Chart("myChart", {
				type: "line",
				data: {
					labels: xValues,
					datasets: [{
						data: arg,
						borderColor: "red",
						fill: true
					},{
						data: [arg2,arg2,arg2,arg2],
						borderColor: "black",
						fill: false
					}]
				},
				options: {
					legend: {display: false}
				}
			})
		})
	})
}
function reset(lik){
	var menu = document.getElementById('menu');
	let bouton = document.createElement("button");
	let image = document.createElement("img");
	bouton.id = 'actualize';
	image.id = 'ya'
	image.src = "assets/refresh.png";
	image.width = "30";
	image.height = "30";
	if (lik) {
		bouton.onclick = humidity;
	}
	else {
		bouton.onclick = temperature;
	}
	try{
		var texas= document.getElementById('actualize');
		var chicago= document.getElementById('ya');
		menu.replaceChild(bouton,texas);
		menu.replaceChild(image,chicago);
	}
	catch(error){
		menu.appendChild(bouton);
		var chicago= document.getElementById('actualize');
		chicago.appendChild(image);
	}
}	
home()