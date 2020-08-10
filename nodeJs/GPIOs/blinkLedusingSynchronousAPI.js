/**
 * https://www.npmjs.com/package/onoff
 * @brief: blink led for 5 seconds using the synchronous
 *         readSync and writeSync methods.
 */

 const Gpio = require('onoff').Gpio;     // Gpio class
 const led = new Gpio(1, 'out');         // Export GPIO1 as an output

 // Toggle the state of the LED connected to the GPIO1 every 200 ms
 const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200);

 // Stop blinking the LED after 5 seconds 
 setTimeout(_ => {
     clearInterval(iv);     // stop blinking
     led.unexport();
 }, 5000);