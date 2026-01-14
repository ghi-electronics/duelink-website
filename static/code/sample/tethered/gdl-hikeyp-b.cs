// In this sample:
// Detect a pressed key

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsKeyChange() {
    var ret = duelink.Engine.ExecuteCommand("IsKeyChange()");
    return ret > 0 ? true : false;
}
int ReadKey() {
    var ret = duelink.Engine.ExecuteCommand("RdKey()");
    return (int)ret;
}

while (true) {
    duelink.Engine.ExecuteCommand("Scan()"); // use this then no need to call SStart("Scan", 100, 0) in script that require while(1) loop active
    Thread.Sleep(10);
    if (IsKeyChange()) {
        var key = ReadKey();

        if (key == 0) {
            Console.WriteLine($"Key released");
        }
        else {
            Console.WriteLine($"Key pressed: {(char)ReadKey()}");
        }
    }

    Thread.Sleep(100);
}

