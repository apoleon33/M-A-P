const { ipcRenderer } = require("electron");

const body = document.body; // maybe useless?
const mainBox = document.getElementById("main_box")

function cleanMainBox() { ReactDOM.unmountComponentAtNode(mainBox); }


function renderPlantChoosing() { // retrieve name of the plants from the database
	ipcRenderer.send("getPlantAvailable", "");
	ipcRenderer.on("getPlantAvailable", (event, arg) => {

		ReactDOM.render(<Plantschoosing list={arg} />, mainBox)
	});
}

function Plantschoosing(props) { // render all the plants availables 
	return props.list.map((plant) =>
		<li
			key={plant.pid}
			onClick={e => chosenPlant(e, plant)}
			className="itemPlant"
		>
			<img src={plant.image} className="icon"></img>
			<h5>{plant.pid}</h5>
		</li>
	)
}

function chosenPlant(e, plante) { // the function once the chosen plant is clicked
	e.preventDefault(); // so it do not activate when the list is created
	ipcRenderer.send("plantChosen", plante.pid); // send the plant chosen to the backend
	home()
}

function Splashscreen() { // the cool flower turning
	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="animation"
				width="80"
				height="133" // height = width * 1.666
				fill="currentColor"
				className="flower"
				viewBox="0 0 16 16"
			>
				<path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
			</svg>
			<h1 className="spashText">Welcome to the M-A-P</h1>
			<h3 className="spashText">fetching data, hand tight!</h3>
		</div>
	);
}


function home() { // the function of the onclick
	cleanMainBox();
	ReactDOM.render(<Renderhome />, mainBox);
}

function Renderhome() {

	let content = ipcRenderer.sendSync("PlanteInformation", '')
	var textContent = content[0];
	const plantIcon = content[1];

	if (textContent.length > 26) { // when the name is too long (more than 26 char)
		textContent = textContent.substring(0, 23) + "..."
	}

	return (
		<div id="wrapper">
			<h1>M-A-P</h1>
			<h2 id="hh">chosen plant: {textContent} </h2>
			<img id="plantImage" src={plantIcon} alt="a photo of the plant" />
		</div>
	);
}


function Renderhumidity() {

	return (
		<div id="wrapper">
			<h3>Humidity: </h3>
			<canvas id="myChart"></canvas>
		</div>
	);
}

function humidity() {
	cleanMainBox();
	ReactDOM.render(<Renderhumidity />, mainBox);

	var ctx = document.getElementById('myChart').getContext('2d');
	var xValues = ["humidity", ""];
	let actualHumidity = ipcRenderer.sendSync("need-hum", ""); // send to the backend 
	var vide = 100 - actualHumidity;
	var yValues = [actualHumidity, vide];
	let colorLine = window.getComputedStyle(document.getElementById("wrapper"), null).getPropertyValue('background-color')
	let colorGraph = window.getComputedStyle(document.body, null).getPropertyValue('background-color')

	var barColors = [colorGraph, "transparent"];

	new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: xValues,
			datasets: [
				{
					backgroundColor: barColors,
					borderColor: colorLine,
					data: yValues,
				},
			],
		},
		options: {
			title: {
				display: false,
			},
			rotation: 215,
		},
		legend: {
			display: false,
		},
	});
}


function Rendertemperature() {
	// almost the same as Renderhumidity i know ._.

	return (
		<div id="wrapper">
			<h3 id="title">Temperature: </h3>
			<canvas id="myChart"></canvas>
		</div>
	);
}

function temperature() {
	cleanMainBox();

	ReactDOM.render(<Rendertemperature />, mainBox);

	let arge = ipcRenderer.sendSync("temp_one", ""); // temperature in the last 30h
	let arg = ipcRenderer.sendSync("temp_ultimate", ""); // max and min temperature

	let temperatureColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color')
	let minMaxTemperatureColor = window.getComputedStyle(document.getElementById("title"), null).getPropertyValue('color')
	console.log(arg)

	var xValues = [-30, -20, -10, 0];
	new Chart("myChart", {
		type: "line",
		data: {
			labels: xValues,
			datasets: [
				{
					data: arge,
					borderColor: temperatureColor,
					fill: true,
				},
				{
					data: [arg[0], arg[0], arg[0], arg[0]],
					borderColor: minMaxTemperatureColor,
					fill: false,
				},
				{
					data: [arg[1], arg[1], arg[1], arg[1]],
					borderColor: minMaxTemperatureColor,
					fill: false,
				},
			],
		},
		options: {
			legend: { display: false },
		},
	});
}

ReactDOM.render(<Splashscreen />, mainBox);
renderPlantChoosing() // while it load all the needed files (5k of json! ), it show the splash screen
