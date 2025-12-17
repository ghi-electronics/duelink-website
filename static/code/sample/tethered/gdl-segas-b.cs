// In this sample:
// Warm up the sensor for 10 seconds, then read the analog value

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Heater(bool value) {
    var v = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"Heater({v})");
}

float SensorRead() {
    var ret = duelink.Engine.ExecuteCommand("SenRead()"); 
    return ret;
}

var counter = 0;

while (true) {
    Thread.Sleep(1000);

    // Wait for heat on for 10 seconds
    if (counter == 0) {
        Heater(true);
    }
    counter++;

    if (counter < 10) {
        Console.WriteLine($"Wait for {counter}/10 seconds");
        continue;
    }

    var volt = SensorRead();

    Console.WriteLine($"Volt: {volt}");
}
