// In this sample:
// Update Dial value every second

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float Dial() {    
    return duelink.Engine.ExecuteCommand("Dial()");
}

while (true) {    
    Console.WriteLine($"Value: {Dial()}");
    Thread.Sleep(1000);
}

