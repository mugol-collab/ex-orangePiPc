/**
 * https://www.npmjs.com/package/onoff
 * @brief: blink led for 5 seconds using the asynchronous
 *         read and write methods and completion callbacks.
 */

const Gpio = require('onoff').Gpio;     // Gpio class 
const led = new Gpio(1, 'out');         // Export GPIO1 as an output
let stopBlinking = false; 

 // Toggle the state of the LED connected to the GPIO1 every 200 ms
 const blinkLed = _ => {
     if (stopBlinking){
         return led.unexport();
     }

     led.read((err, value) => {         // Asynchronous read
         if (err){
             throw erro;
         }

    led.write(value ^ 1, err => {       // Asynchronous write          
        if (err){
            throw erro;
        }
        });
     });

     setTimeout(blinkLed, 200);
 };

 blinkLed();

 // Stop blinking the LED after 5 seconds 
 setTimeout(_ => stopBlinking = true, 5000);
