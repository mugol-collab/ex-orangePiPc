/**
 * https://www.npmjs.com/package/onoff
 * @brief: uses Gpio.accessible method for determine if the 
 *         current system supports GPIOs programmatically
 */

 const Gpio = require('onoff').Gpio;

 const useLed = (led, value) => led.writeSync(value);

 let led;

 if (Gpio.accessible){
     led = new Gpio(1, 'out');
     // more real code here
 } else {
     led = {
         writeSync: value => {
             console.log('virtual led now uses value: ' + value);
         }
     };
 }

 useLed(led, 1);