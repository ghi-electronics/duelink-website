// In this sample:
// Repeatedly set the servo position to 0, 45, 90, 135, and 180, then reset it to 0.
// There is a one-second delay after each change.

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
void SetServo(int position) {
    if (position < 0 || position > 180)
    return;

    var ret = duelink.Engine.ExecuteCommand($"ServoSt(1,{position})");
}

var degree = 0;

while (true) {
    SetServo(degree);
    if (degree == 180)
        degree = 0;
    else
        degree += 45;

    Thread.Sleep(1000);
}


