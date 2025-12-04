// In this sample:
// Pull light value every second
// When light below 25, turn the statled on
// When light higher 25, turn the statled off

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int GetLight() {
    var ret = duelink.Engine.ExecuteCommand("Light()");
    return (int)ret;
}
void SetStatLed(bool on) {
    var cmd = "statled(1,0,0)";

    if (!on) {
        cmd = "statled(0,1,0)";
    }

    duelink.Engine.ExecuteCommand(cmd);
}

while (true) {
    var light = GetLight();

    if (light < 25) {
        SetStatLed(true);
    }
    else {
        SetStatLed(false);
    }
    Console.WriteLine($"Light value: {light}");

    Thread.Sleep(1000);
}

