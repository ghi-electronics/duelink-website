// In this sample:
// Read temperature and humidity every 1.5 second

using System.Data.SqlTypes;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float GetTemperature() {
    return duelink.Engine.ExecuteCommand("Temp(SenPin(), SenType())");
}

float GetHumidity() {
    return duelink.Engine.ExecuteCommand("Humid(SenPin(), SenType())");
}

while (true) {   
    Console.WriteLine($"Temperature: {GetTemperature().ToString()} ");
    Console.WriteLine($"Humidity: {GetHumidity().ToString()} ");

    Thread.Sleep(1500);
}
