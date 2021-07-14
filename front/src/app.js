const { ipcRenderer } = require('electron')
function home(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h1>autogrow</h1>';
	ipcRenderer.send('need-plant', 'name')
	ipcRenderer.on('plant-needed', (event, arg) => {
		console.log(arg)
		let text = document.createElement("h2")
		text.id = 'hh'
		text.textContent = "plante choisie:"
		text.textContent += arg
		try{
			var ye= document.getElementById('hh')
			house.replaceChild(text,ye);
		}
		catch(error){
			console.log(error);
			house.appendChild(text);
	}
	})
}
function humidity(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h3>humiditée:</h3>'
	house.innerHTML += '<canvas id="myChart"></canvas>'
	var ctx = document.getElementById('myChart');
	ipcRenderer.send('need-hum', 'now')
	ipcRenderer.on('humidity', (event, arg) => {
		var vide =100-arg
		var xValues = ["humiditée", ""];
		var yValues = [55, 49];
		var barColors = ["blue", "transparent"];
		new Chart(ctx, {
	  type: "doughnut",
	  data: {
	    labels: xValues,
	    datasets: [{
	      backgroundColor: barColors,
	      borderColor:'grey',
	      data: yValues
	    }]
	  },
	  options: {
	    title: {
	      display: false
	    },
	    rotation:215,
	  }
	});
	})
}
function temperature(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h3>temperature:</h3>'
	house.innerHTML += '<canvas id="myChart"></canvas>'
	var ctx = document.getElementById('myChart');
	ipcRenderer.send('need-temp', 'now')
	ipcRenderer.on('temperature', (event, arg) => {
		var xValues = [0,10,20,30,40,50,60,70,80,90,100];
		new Chart("myChart", {
		  type: "line",
		  data: {
		    labels: xValues,
		    datasets: [{
		      data: [36,30,27,26,30,33,31,30,28,29,30],
		      borderColor: "red",
		      fill: false
		    },{
		      data: [30,30,30,30,30,30,30,30,30,30,30],
		      borderColor: "black",
		      fill: false
		    }]
		  },
		  options: {
		    legend: {display: false}
		  }
		});
	})
}
home()