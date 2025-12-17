// In this sample:
// Read temperature every 1.5 second
// Issue: The reading temperature is about ~3 degrees Celsius higher than normal.

using System.Data.SqlTypes;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float GetTemperature() {
    return duelink.Engine.ExecuteCommand("ReadTemp()");
}

while (true) {   
    Console.WriteLine($"Temperature: {GetTemperature().ToString()} ");
    Thread.Sleep(1500);
}
