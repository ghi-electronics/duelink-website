// In this sample:
// LEDs will run in circle mode.
// Press buttons U, D, L, R: LEDs turn on at positions 8, 4, 6, and 2.
// Press button A: All red LEDs turn on.
// Press button B: All red LEDs turn off.
// Press LDR button: Return to circle mode.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

var run_ring = true;
bool IsBtnPressed(char button) {
    var ret = duelink.Engine.ExecuteCommand($"BtnDown(BtnPin('{button}'))");
    return ret == 1;
}
void SetLed(int index, bool value) {
    var val = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"SetLed({index},{val})");
   
}
void SetAllLed(bool value) {
    var val = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"SetAllLed({val})");
    
}

var count = 0;
while (true) {
    
    if (IsBtnPressed('U')) {
        SetLed(8, true);
        run_ring = false;
    }
    if (IsBtnPressed('R')) {
        SetLed(2, true);
        run_ring = false;
    }
    if (IsBtnPressed('D')) {
        SetLed(4, true);
        run_ring = false;
    }
    if (IsBtnPressed('L')) {
        SetLed(6, true);
        run_ring = false;
    }
    if (IsBtnPressed('A')) {
        SetAllLed(true);
        run_ring = false;
    }
    if (IsBtnPressed('B')) {
        SetAllLed(false);
        run_ring = false;
    }

    if (duelink.Engine.ExecuteCommand("dread(20,2)") !=0) {
        count = 0;
        SetAllLed(false);
        run_ring = true;
        Thread.Sleep(100);
    }

    if (run_ring) {
        SetLed((count % 8) + 1, (count / 8) % 2 == 0 ? true : false);
    }
    count++;

    Thread.Sleep(100);
}

