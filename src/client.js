const readline = require('readline');
const WebSocket = require('ws');


let data = [{
	type: "location",
	data: {
		x: 5,
		y: 12,
	}
},
{
	type: "location",
	data: {
		x: 5,
		y: 12,
	}
},
{
	type: "location",
	data: {
		x: 5,
		y: 12,
	}
},
{
	type: "object detected",
	data: {
		x: 1,
		y: 2,
		z: 3,
		type: "human",
	},
}];



const ws = new WebSocket("ws://localhost:8083");

ws.onopen = () => {
	console.log("Connected to server");
};


ws.onmessage = data => {
    console.log("received: " + data);
}

ws.onerror = err => console.log(err);


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false,
});

let count = 0;
rl.on('line', function (line) {
	let loc = data[count];
	loc.data.timestamp = new Date();

	let jsonStr = JSON.stringify(loc, null, 2);
    ws.send(jsonStr);

    count++;
});

process.on('SIGINT', function() {
    console.log("Caught interrupt signal, closing");

    ws.close();
    process.exit()
});