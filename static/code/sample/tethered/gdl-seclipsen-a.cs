// In this sample:
// Touch on pin 2, status LED turns on
// Touch on pin 7, status LED turns off


using System.Net.NetworkInformation;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetStatLed(bool value) {
    var high = value ? 1 : 0;
    var low = !value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"Statled({high},{low},0)");
}

bool Touched(int pin) {
   var ret = duelink.Engine.ExecuteCommand($"PulseIn({pin},1000, 0, 100)");

    if (ret > 110) {
        return true;
    }

    return false;
   
}

while (true) {
    if (Touched(2))
        SetStatLed(true);
    if (Touched(7))
        SetStatLed(false);

    Thread.Sleep(50);
}


