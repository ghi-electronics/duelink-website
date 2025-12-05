// In this sample:
// Update distance in cm every second

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float GetDistance() {
    var ret = duelink.Engine.ExecuteCommand("Distance()");
    return ret;
}

while (true) {
    var distance = GetDistance();
    Console.WriteLine($"Distance: {distance} cm");
    Thread.Sleep(1000);
}

