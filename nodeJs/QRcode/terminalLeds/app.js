
const Gpio = require('onoff').Gpio;
const express = require('express');
const app = express();

var led = new Gpio(65, 'out');

app.get('/', (req, res) => {
    res.send('/ Ok!');
});

app.get('/api/led/1', (req, res) => {

    res.send("Led On");
    led.writeSync(1);
});

app.get('/api/led/0', (req, res) => {

    res.send("Led Off");
    led.writeSync(0);
});

app.listen(3333, () => {
    console.log('App running on port 3333')
});
