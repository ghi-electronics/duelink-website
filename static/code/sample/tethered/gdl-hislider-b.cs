// In this sample:
// Update Slide value every second

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float Slide() {    
    return duelink.Engine.ExecuteCommand("Slide()");
}

while (true) {    
    Console.WriteLine($"Value: {Slide()}");
    Thread.Sleep(1000);
}

