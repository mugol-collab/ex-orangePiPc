/**
 * https://www.npmjs.com/package/onoff
 *  * @brief: In this programm when the button is pressed the LED should turn on,
 *         when it's released the LED should turn off.
 * 
 *         When the program is running it can be terminated with ctrl+c.
 *         However, and the resources used by the led and button Gpio 
 *         are released by invoking their unexport method.
 */
const Gpio = require('onoff').Gpio;     // Gpio class
const led = new Gpio(1, 'out');         // Export GPIO1 as an output
const button = new Gpio(6, 'in', 'both');

button.watch((err, value) => {
    if (err){
        throw err;
    }
    led.writeSync(value);
});

process.on('SIGINT', _ =>{
    led.unexport();
    button.unexport();
});