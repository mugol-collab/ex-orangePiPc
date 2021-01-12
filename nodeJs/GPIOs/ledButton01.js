/**
 * https://www.npmjs.com/package/onoff
 * @brief: In this programm when the button is pressed the LED should turn on,
 *         when it's released the LED should turn off.
 * 
 *         When the program is running it can be terminated with ctrl+c.
 *         However, it doesn't free its resources.
 */
const Gpio = require('onoff').Gpio;     // Gpio class
const button = new Gpio(64, 'in', 'both'); // Export GPIO1 as an input
const led = new Gpio(65, 'out');            // Export GPIO1 as an output

button.watch((err, value) => led.writeSync(value));