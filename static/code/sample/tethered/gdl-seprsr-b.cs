// In this sample:
// Display pressure in kPa and PSI units

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController("COM38");

float ReadPSI() {
    return duelink.Engine.ExecuteCommand("PSI()");
}

float ReadkPa() {
    return duelink.Engine.ExecuteCommand("kPa()");
}

while (true) {
    
    Console.WriteLine($"PSI: {ReadPSI()}");
    Console.WriteLine($"kPa: {ReadkPa()}");

    Thread.Sleep(1000);
}


