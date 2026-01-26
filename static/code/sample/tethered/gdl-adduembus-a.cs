// In this sample:
// Reading analog value from the pin AN

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float ReadAnalog() {
    return duelink.Engine.ExecuteCommand("vread(5)");
}

while (true) {
    Console.WriteLine($"Analog: {ReadAnalog()}");
    Thread.Sleep(1000);
}


