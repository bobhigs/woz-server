const WebSocket = require('ws');
const _ = require("lodash");
const wss = new WebSocket.Server({ port: 8083 });
const readline = require('readline');


console.log("Started");

let state = {
    locations: [],
    objects: [],
};

let connections = [];

wss.on('connection', socket => {
    console.log("Connected: " + socket.address);
    connections.push(socket);


    socket.on('message', message => {
        console.log('received: %s', message);
        // let obj = JSON.parse(message);
        // if (obj.type === 'location') {
        //     state.locations.push(obj.data);
        // }
        // else if (obj.type === 'object detected') {
        //     state.objects.push(obj.data);
        // }

        // console.log(JSON.stringify(state, null, 2));
    });

    // socket.send("You've connected! :D");
});

wss.on('error', err => {
    console.log("err:", err);
    wss.close(() => {
        console.log("closing after error D:");
        process.exit();
    });
});


process.on('SIGINT', function() {
    console.log("Caught interrupt signal, closing");

    wss.close(() => {
        console.log("closed");
        process.exit();
    });
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});


rl.on('line', function (line) {
    let val = _.toNumber(line);
    if (val > 1) {
        val = 1;
    }
    else if (val < 0) {
        val = 0;
    }

    for (let socket of connections) {
        socket.send(JSON.stringify({
            type: "SET_SPEED",
            payload: val
        }));
    }
});
