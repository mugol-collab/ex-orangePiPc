#!/usr/bin/node
const fs = require('fs');
const axios = require('axios')
const config = require("./config")
const express = require('express')
const SerialPort = require('serialport')
const { performance } = require('perf_hooks');
const Gpio = require('onoff').Gpio;
const led1 = new Gpio(66, 'out');
const led2 = new Gpio(65, 'out');
const led3 = new Gpio(64, 'out');

const httpPort = 1234
const serialPort = '/dev/ttyS3'
const baudRate = 9600
const port = new SerialPort(serialPort, {
  baudRate: baudRate
})

const app = express();

var enable = false

var bufferIn = '';
var lastBufferIn = '';
var timeLastBufferIn = 0;//time that received the last buffer
var timer = null;

acessoLiberado = false;

const serialNumber = fs.readFileSync('/sys/class/net/eth0/address', 'utf8').replace(/:/g, "").replace(/\r?\n|\r/g, "");

console.log('serialNumber', serialNumber)

function ledRedOn(){
  led1.writeSync(1);
  // setTimeout(ledRedOff(), 5000);
}

function ledRedOff(){
  led1.writeSync(0);
}

function ledStatusOn(){
  led2.writeSync(1);
}

function ledStatusOff(){
  led2.writeSync(0);
}

function ledBlueOff(){
  led3.writeSync(0);
}

function ledBlueOn(){
  led3.writeSync(1);
  // setTimeout(ledBlueOff(), 5000);
}


// if (acessoLiberado){
//   ledBlueOn();
//   setTimeout(ledBlueOff(), 5000);
// }

function SendBufferIn() {
  //avoid send same buffer before minimum time
  // let t = 
  if (!enable) {
    bufferIn = '';
    return;
  }
  if ((bufferIn === lastBufferIn) && (performance.now() - timeLastBufferIn < config.timerOutSameBuffer)) {
    bufferIn = '';
    console.log('Same buffer avoided')
    return;
  }
  timeLastBufferIn = performance.now();
  console.log('BufferIn:', bufferIn);
  sendData(bufferIn)
  lastBufferIn = bufferIn;
  bufferIn = '';
}

// Switches the port into "flowing mode"
port.on('data', function (data) {

  bufferIn += data.toString('utf8');

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(SendBufferIn, 50);

})

function sendData(data) {


  try {
    console.log("post: " + config.endpoint);
    // removes NUL chars
    // removes backslash+u0000
    // const info = data.replace(/(\r\n|\n|\r)/gm, "").replace("\u0000", "").replace("\\u0000", "")
    console.log('bufferIn', data)
    const info = String(data).trim().includes("\n") ? data.split("\n")[0] : data
    console.log('bufferIn cleared info', info)

    axios.post(config.endpoint, {
      info,
      deviceType: 'qrcode',
      serialNumber
    })
      .then(function (response) {
        console.log("Post OK")
        acessoLiberado = true;
        ledBlueOn();
        // setTimeout(ledBlueOff(), 5000);

      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  } catch (error) {
    console.log("Error :" + error)
    ledRedOn();
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/configure", (req, res) => {
  if (!req.query.cmd) {
    res.send("Param cmd can not be empty")
    return
  }
  console.log("configure?cmd=" + req.query.cmd);
  const buf = Buffer.from(req.query.cmd, 'hex');
  //const buf = Buffer.from([0x08, 0xc6, 0x04, 0x08, 0x00, 0xf2, 0xff, 0x00, 0xfd, 0x35]);
  //const buf = Buffer.from([0x07, 0xc6, 0x04, 0x08, 0x00, 0x8a, 0x09, 0xfe, 0x94]);
  console.log("Hex: " + buf.toString('hex'));
  res.send("Command send to device");
})

app.get("/start", (req, res) => {
  enable = true
  console.log("start")
  res.send("ok")

  ledStatusOn();
  
})

app.get("/stop", (req, res) => {
  enable = false
  console.log("stop")
  res.send("ok")
})

app.get("/status", (req, res) => {
  res.send({
    enable: enable,
    endpoint: config.endpoint,
    timerOutSameBuffer: config.timerOutSameBuffer,
    serialPort: serialPort,
    baudRate: baudRate
  })
})

app.post("/config", (req, res) => {

  // var d = req.body
  // console.log(d)
  // console.log(d.endpoint)

  // if (d.endpoint || d.timerOutSameBuffer) {

  //   if (d.endpoint) config.endpoint = d.endpoint
  //   if (d.timerOutSameBuffer) config.timerOutSameBuffer = d.timerOutSameBuffer

  //   res.send("ok")

  // } else {
  //   res.send("wrong format format -> {endpoint : string, timerOutSameBuffer: integer }")
  // }

  // console.log('new config', req.body);

  config.config = req.body;

  res.json(config.config);

})

app.listen(httpPort, '0.0.0.0', () => {
  console.log(`listen on  ${httpPort}`)
})

