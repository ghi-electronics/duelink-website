// In this sample:
// When button isn't pressed: Led0: red; led1: green; led2: blue;Led control: on
// When button is pressed: All led off

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

var button_pin = (int)duelink.Engine.ExecuteCommand("BtnPin()");
void SetLedRing(int index, byte red, byte green, byte blue) {
    duelink.Engine.ExecuteCommand($"SetRing({index},{red},{green},{blue})");
}

void SetLedControl(bool value) {
    var v = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"SetCtr({v})");
}

bool IsButtonPressed() {
    return !duelink.Digital.Read(button_pin, DUELinkController.InputType.PullUp);
}

var button_state1 = false;
var button_state2 = true;

while (true) {
    button_state1 = IsButtonPressed();
    
    if (button_state1 != button_state2) {
        button_state2 = button_state1;

        if (button_state2) {
            SetLedControl(false);
            SetLedRing(0, 0, 0, 0);
            SetLedRing(1, 0, 0, 0);
            SetLedRing(2, 0, 0, 0);
        }
        else {
            SetLedRing(0, 255, 0, 0); 
            SetLedRing(1, 0, 255, 0); 
            SetLedRing(2, 0, 0, 255); 
            SetLedControl(true);
        }
    }

    Thread.Sleep(100);
}

