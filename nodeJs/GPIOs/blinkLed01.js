const Gpio = require('onoff').Gpio;
const led1 = new Gpio(66, 'out');

function ledOn(){
    led1.writeSync(1);
}

function ledOff(){
    led1.writeSync(0);
}

ledOn();
// setTimeout(ledOff(), 500);