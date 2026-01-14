// In this sample:
// When a button is pressed, set light to white color 100% brightness on that button.

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetColor(char button, bool red, bool green, bool blue, int brightness) {
    var c = red ? 1 : 0;

    c = green ? (c |(1<<1)) : c;
    c = blue ? (c | (1 << 2)) : c;
    brightness = (brightness > 100)? 100:brightness;
    brightness = (brightness <0) ? 0 : brightness;
    var index = 0;

    switch (button) {
        case 'A':
            index = 0;
            break;
        case 'B':
            index = 1;
            break;
        case 'C':
            index = 2;
            break;
        case 'D':
            index = 3;
            break;

    }
    duelink.Engine.ExecuteCommand($"SetClr({index},{c},{brightness})");
}

bool IsButtonPressed(char button) {   
    var pressed = duelink.Engine.ExecuteCommand($"Dread(BtnPin('{button}'),1)") == 0 ? true: false;    
    return pressed;
}


var buttonA_state1 = false;
var buttonA_state2 = true;

var buttonB_state1 = false;
var buttonB_state2 = true;

var buttonC_state1 = false;
var buttonC_state2 = true;

var buttonD_state1 = false;
var buttonD_state2 = true;

while (true) {
    buttonA_state1 = IsButtonPressed('A');
    buttonB_state1 = IsButtonPressed('B');
    buttonC_state1 = IsButtonPressed('C');
    buttonD_state1 = IsButtonPressed('D');

    if (buttonA_state1 != buttonA_state2) {
        buttonA_state2 = buttonA_state1;

        if (buttonA_state2) {
            SetColor('A',true,true,true, 100);
        }
        else {
            SetColor('A', false, false, false, 0);
        }
    }
    if (buttonB_state1 != buttonB_state2) {
        buttonB_state2 = buttonB_state1;

        if (buttonB_state2) {
            SetColor('B', true, true, true, 100);
        }
        else {
            SetColor('B', false, false, false, 0);
        }
    }
    if (buttonC_state1 != buttonC_state2) {
        buttonC_state2 = buttonC_state1;

        if (buttonC_state2) {
            SetColor('C', true, true, true, 100);
        }
        else {
            SetColor('C', false, false, false, 0);
        }
    }
    if (buttonD_state1 != buttonD_state2) {
        buttonD_state2 = buttonD_state1;

        if (buttonD_state2) {
            SetColor('D', true, true, true, 100);
        }
        else {
            SetColor('D', false, false, false, 0);
        }
    }

    Thread.Sleep(50);
}

