
const Gpio = require('onoff').Gpio;

let LinIn1 = new Gpio(1, 'in', 'both', {debounceTimeout:10});
const PIN_ON = 1;
const PIN_OFF = 0;

function readLine(){
    if (LinIn1.readSync() == PIN_ON){
        console.log("Linea 1 ON");
    }
    else{
        console.log("Linea 1 OFF");
    }
}

setTimeout(readLine, 500);
// readLine();
