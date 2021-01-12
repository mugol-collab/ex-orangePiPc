/**
 * https://www.npmjs.com/package/onoff
 * @brief: blink led for 5 seconds using the asynchronous read 
 *         and write methods and Promises. 
 */

 const Gpio = require('onoff').Gpio;    // Gpio class
 const led = new Gpio(1, 'out');        // Export Gpio1 as an output 

 let stopBlinking = false;

 // Toggle the state of the LED connected to GPIO1 every 200 ms
 const blinkLed = _ => {
     if (stopBlinking){
         return led.unexport();
     }

     led.read()
        .then(value => led.write(value ^ 1))
        .then(_ => setTimeout(blinkLed, 200))
        .catch(err => console.log(err));
 };

 blinkLed();

 setTimeout(_ => stopBlinking = true, 5000);