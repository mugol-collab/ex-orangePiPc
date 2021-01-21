/**
 * QRCode/qrcode01/app.js
 * 
 * Este projeto lê o codigo qr via porta serial 3 ('/dev/ttyS3'), 
 * desde o leitor E21W, usando um servidor em node 
 * 
 */
const fs = require('fs');
const http = require('http'); 
const SerialPort = require('serialport');
const { performance } = require('perf_hooks');

const httpPort = 3010;
const serialPort = '/dev/ttyS3';
const baudRate = 9600;

const port = new SerialPort(serialPort, {
    baudRate: baudRate,
});

var enable = false;

var bufferIn = '';
var lastBufferIn = '';
var timeLastBufferIn = 0;   // time that received the last buffer
var timer = null;
const serialNumber = fs.readFileSync('/sys/class/net/eth0/address', 'utf8').replace(/:/g, "").replace(/\r?\n|\r/g, "");

console.log('SerialNumber: ', serialNumber);

function sendBufferIn(){
    // evitar enviar el mismo búfer antes del tiempo mínimo
    if (!enable){
        bufferIn = '';
        return;
    }

    timeLastBufferIn = performance.now();
    console.log('BufferIn: ', bufferIn);
}

/* 
    monitorea el puerto, 
    - el 1er argumento es el nombre del evento
    - el 2do argumento es la función callback que será llamada cuando se genere el evento
*/
port.on('data', function(data){
    bufferIn += data.toString('utf8');

    if (timer){
        clearTimeout(timer);
    }

    timer = setTimeout(sendBufferIn, 50);
});

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.write('/ ok');
        // res.send("Test ok");
        res.end();
    }

    if (req.url === '/start'){
        enable = true;
        console.log("start");
        res.write('start ok');
        // res.send("ok");
        res.end();
    }

    if (req.url === '/stop'){
        enable = false;
        console.log("stop");
        res.write('stop ok');
        // res.send("ok");
        res.end();
    }

    if (req.url === '/status'){
        res.write(JSON.stringify({        
            enable: enable,
            serialPort: serialPort,
            baudRate: baudRate
        }));
        res.end();
    }
});

server.listen(httpPort);
console.log(`listen on port: ${httpPort}`);
