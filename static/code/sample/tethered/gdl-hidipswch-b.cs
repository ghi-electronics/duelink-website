// In this sample:
// Scan all switches and indicate if any switch is in the ON position.

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool Read(int index) {
    var ret = duelink.Engine.ExecuteCommand($"Read({index})");
    return ret != 0;
}

while (true) {
    for (var i = 0; i < 10; i++) {
        if (Read(i + 1)) {
            Console.WriteLine($"Detected ON on switch index: {(i + 1)}");
        }
    }
        
    Thread.Sleep(1000);
}