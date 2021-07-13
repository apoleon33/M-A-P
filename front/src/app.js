const { ipcRenderer } = require('electron')
function home(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h1>autogrow</h1>';
	ipcRenderer.send('need-plant', 'name')
	ipcRenderer.on('plant-needed', (event, arg) => {
		console.log(arg)
		let text = document.createElement("h2")
		text.id = 'hh'
		text.textContent = "plante choisi:"
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
	ipcRenderer.send('need-hum', 'now')
	ipcRenderer.on('humidity', (event, arg) => {
		var vide =100-arg
		console.log(arg)
		console.log(vide)
		google.charts.load("current", {packages:["corechart"]});
	      google.charts.setOnLoadCallback(drawChart);
	      function drawChart() {
	        var data = google.visualization.arrayToDataTable([
	          ['humiditée', 'pourcentage'],
	          ['humiditée',     arg],
	          ['', vide]
	        ]);

	        var options = {
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
          }
	        var chart = new google.visualization.PieChart(document.getElementById('main_box'));
	        chart.draw(data, options);
	      }
	})
}
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
home()