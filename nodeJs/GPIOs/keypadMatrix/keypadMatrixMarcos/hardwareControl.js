var Gpio = require('onoff').Gpio;

var colOut1
var colOut2
var colOut3
var lineIn1
var lineIn2
var lineIn3
var lineIn4
var keyPressed = ""

const PIN_ON = 1
const PIN_OFF = 0

function initGpio() {
    colOut1 = new Gpio(12, 'out'),
    colOut2 = new Gpio(11, 'out'),
    colOut3 = new Gpio(6, 'out'),
    lineIn1= new Gpio(1, 'in', 'both', { debounceTimeout:100 }  ),
    lineIn2= new Gpio(0, 'in', 'both', { debounceTimeout:100 }  ),
    lineIn3=  new Gpio(3, 'in', 'both', { debounceTimeout:100 }  ),
    lineIn4 - new Gpio(64, 'in', 'both', { debounceTimeout:100 }  )
};

function scanKeyPress(){
    for (let col = 1; col < 3; col++) {
        keyPressed = "";
        colOut1.writeSync(PIN_OFF);
        colOut2.writeSync(PIN_OFF);
        colOut3.writeSync(PIN_OFF);
        if (col == 1)
            colOut1.writeSync(PIN_ON);
        else if (col == 2)
            colOut2.writeSync(PIN_ON);
        else if (col == 3)        
            colOut3.writeSync(PIN_ON);
          
        if (lineIn1.readSync() == PIN_ON)    
        {
            switch (col) {
                case 1:
                    keyPressed = "a";
                    break;
                case 2:
                    keyPressed = "b";                    
                    break;
                case 3:
                    keyPressed = "c";                                        
                    break;            
            }
        }
        if (lineIn2.readSync() == PIN_ON)    
        {
            switch (col) {
                case 1:
                    keyPressed = "d";
                    break;
                case 2:
                    keyPressed = "e";                    
                    break;
                case 3:
                    keyPressed = "f";                                        
                    break;            
            }
        }
        if (lineIn3.readSync() == PIN_ON)    
        {
            switch (col) {
                case 1:
                    keyPressed = "g";
                    break;
                case 2:
                    keyPressed = "h";                    
                    break;
                case 3:
                    keyPressed = "i";                                        
                    break;            
            }
        }
        // if (lineIn4.readSync() == PIN_ON)    
        // {
        //     switch (col) {
        //         case 1:
        //             keyPressed = "j";
        //             break;
        //         case 2:
        //             keyPressed = "k";                    
        //             break;
        //         case 3:
        //             keyPressed = "l";                                        
        //             break;            
        //     }
        // }

    }
    return keyPressed;
}

module.exports = {
    initGpio,
    scanKeyPress
}