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

	          ['humiditée',     arg],
	          ['', vide]
	        ]);

	        var options = {

          }
	        var chart = new google.visualization.PieChart(document.getElementById('main_box'));
	        chart.draw(data, options);
	      }
	})
}

home()
