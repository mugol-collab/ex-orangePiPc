/**
 * Projeto MiniPLC 
 */

const Gpio = require('onoff').Gpio;
const express = require('express');
const app = express();

const httpPort = 3030;

const ledRed = new Gpio(66, 'out');
const ledGreen = new Gpio(65, 'out');
const rele = new Gpio(64, 'out');

let tempoTimer = 0;

function ledGreenOn(){
    ledGreen.writeSync(1);
}

function ledGreenOff(){
    ledGreen.writeSync(0);
}

function ledRedOn(){
    ledRed.writeSync(1);
}

function ledRedOff(){
    ledRed.writeSync(0);
}

function releOn(){
    rele.writeSync(1);
}

function releOff(){
    rele.writeSync(0);
}

function releTemporizado(tempo){

    releOn();
    ledGreenOn();
    setTimeout(portsReleOff, tempo);                
}

function portsReleOff(){
    releOff();
    ledGreenOff();
}

app.get('/', (req, res) => {
    res.send('/ Ok!');
});

app.get('/api/ledgreen/1', (req, res) => {
    ledGreenOn();
    res.send("Led Green On");
});

app.get('/api/ledgreen/0', (req, res) => {
    ledGreenOff();
    res.send("Led Green Off");
});

app.get('/api/ledred/1', (req, res) => {
    ledRedOn();
    res.send("Led Red On");
});

app.get('/api/ledred/0', (req, res) => {
    ledRedOff();
    res.send("Led Red Off");
});

app.get('/api/ligarRele', (req, res) => {
    releOn();
    ledRedOn();
    res.send("Rele ligado");
});

app.get('/api/desligarRele', (req, res) => {
    releOff();
    ledRedOff();
    res.send("Rele desligado");
});

app.get('/api/releTemporizado', (req, res) => {
    let t = req.query.tempo;
    releTemporizado(t);
    res.send("tempo: " + t);
});


app.listen(httpPort, () => {
    console.log(`App running on port ${httpPort}`)
});
