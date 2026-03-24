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
void Init() {
    duelink.Engine.ExecuteCommand("Scan()");
}

Init();

while (true) {
    
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
}
