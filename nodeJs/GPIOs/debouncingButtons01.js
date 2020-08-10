/**
 * https://www.npmjs.com/package/onoff
 * @brief: example of software debouncing solution for resolving 
 *         bounce issues.
 * 
 *        - When the button is pressed the LED should toggle its state.
 *          This is a typical situation where there will be button bounce
 *          issues.
 *          The issue can be resolved by using the debounceTimeout option,
 *          set to 10 milliseconds, when creating the Gpio object for the 
 *          button.
 *          
 */

 const Gpio = require('onoff').Gpio;        // Gpio class
 const led = new Gpio(1, 'out');            // Export GPIO1 as an output
 const button = new Gpio(6, 'in', 'rising', {debounceTimeout:10});

 button.watch((err, value) => {
    if (err){
        throw err; 
    }
    led.writeSync(led.readSync() ^ 1);
 });

 process.on('SIGINT', _ => {
     led.unexport();
     button.unexport();
 });
