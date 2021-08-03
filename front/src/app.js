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
		var yValues = [arg, vide];
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
	ipcRenderer.send('temp_one','balance la tempe now')
	ipcRenderer.on('temp_one_answerd', (event, arg) =>{ 
		let temp_one = arg
		console.log(temp_one)
		ipcRenderer.send('temp_two','balance la tempe now')
		ipcRenderer.on('temp_two_answerd', (event, arg1) =>{ 
			let temp_two = arg1
			console.log(temp_two)
			ipcRenderer.send('temp_three','balance la tempe now')
			ipcRenderer.on('temp_three_answerd', (event, arg2) =>{ 
				let temp_three = arg2
				console.log(temp_three)
				ipcRenderer.send('temp_four','balance la tempe now')
				ipcRenderer.on('temp_four_answerd', (event, arg3) =>{ 
					let temp_four = arg3
					console.log(temp_four)
					var xValues = [0,10,20,30];
					new Chart("myChart", {
					  type: "line",
					  data: {
					    labels: xValues,
					    datasets: [{
					      data: [temp_one,temp_two,temp_three,temp_four],
					      borderColor: "red",
					      fill: true
					    },{
					      data: ['30','30','30','30'],
					      borderColor: "black",
					      fill: false
					    }]
					  },
					  options: {
					    legend: {display: false}
					  }
					});
				})
			})
		})
	})
}
home()