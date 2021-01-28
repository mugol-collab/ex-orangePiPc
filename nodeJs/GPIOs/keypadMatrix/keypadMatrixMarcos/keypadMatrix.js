const keypad = require("./hardwareControl");

var keyPressed = "";

keypad.initGpio();

function monitoringKeypad(){        
   keyPressed = keypad.scanKeyPress();
    if (keypad)
      console.log(keyPressed);  
}
setInterval(monitoringKeypad, 1000);
