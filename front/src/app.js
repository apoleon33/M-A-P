const { ipcRenderer } = require('electron')
function home(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h1>autogrow</h1>';
	ipcRenderer.send('need-plant', 'name')
	ipcRenderer.on('plant-needed', (event, arg) => {
		console.log(arg)
		let text = document.createElement("h2")
		text.textContent = "plante choisi:"
		text.textContent += arg
		house.appendChild(text)
	})
}
function humidity(){
	ipcRenderer.send('need-hum', 'now')
	ipcRenderer.on('humidity', (event, arg) => {
		var vide =100-arg
		console.log(arg)
		console.log(vide)
		google.charts.load("current", {packages:["corechart"]});
	      google.charts.setOnLoadCallback(drawChart);
	      function drawChart() {
	        var data = google.visualization.arrayToDataTable([
<<<<<<< HEAD
	          ['humiditée', 'pourcentage'],
=======
	          ['humidité', 'pourcentage'],
>>>>>>> origin/main
	          ['humiditée',     arg],
	          ['', vide]
	        ]);

	        var options = {
<<<<<<< HEAD
	          title: 'humiditée',
	          pieSliceText: 'none',
	          pieHole: 0.4,
	          pieStartAngle: 215,
	          pieSliceBorderColor:'grey',
	          backgroundColor: {
	          	stroke:'grey',
	          	fill: 'grey'
	          },
	          slices: {
            	0: { color: '#0080FF' },
            	1: { color: 'transparent' }
          }
=======
	          title: 'humidity',
	          pieHole: 0.4,
	          pieStartAngle: 150,
	          backgroundColor: 'grey',
>>>>>>> origin/main
          }
	        var chart = new google.visualization.PieChart(document.getElementById('main_box'));
	        chart.draw(data, options);
	      }
	})
}
<<<<<<< HEAD
function temperature(){
	ipcRenderer.send('need-temp', 'now')
	ipcRenderer.on('temperature', (event, arg) => {
		google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['heure', 'temperature','temperature conseillé'],
          ['0',  45,30],
          ['5',  37,30],
          ['10',  34,30],
          ['15', 32,30],
          ['20', 26,30],
        ]);

        var options = {
          title: 'température',
          curveType: 'function',
          backgroundColor: {
	          	stroke:'grey',
	          	fill: 'grey'
	      },
	      colors:['red','black'],
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('main_box'));

        chart.draw(data, options);
      }

	})
}
=======
>>>>>>> origin/main
home()