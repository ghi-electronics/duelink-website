// In this sample:
// Scan from led D1 to led D16

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetLed(int index, bool value) {
    var val = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"SetLed({index},{val})");
}

var count = 0;
while (true) {
    SetLed((count % 16) + 1, (count / 16) % 2 == 0 ? true : false);
    count++;

    Thread.Sleep(100);
}


