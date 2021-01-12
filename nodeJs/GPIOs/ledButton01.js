/**
 * https://www.npmjs.com/package/onoff
 * @brief: In this programm when the button is pressed the LED should turn on,
 *         when it's released the LED should turn off.
 * 
 *         When the program is running it can be terminated with ctrl+c.
 *         However, it doesn't free its resources.
 */
const Gpio = require('onoff').Gpio;     // Gpio class
const led = new Gpio(66, 'out');         // Export GPIO1 as an output
const button = new Gpio(65, 'in', 'both');

button.watch((err, value) => led.writeSync(value));