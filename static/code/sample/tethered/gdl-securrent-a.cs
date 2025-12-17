// In this sample:
// Display current (A)

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float ReadCurrent() {
    return duelink.Engine.ExecuteCommand("Current()");
}

while (true) {   
    Console.WriteLine($"Current: {ReadCurrent()} A");    

    Thread.Sleep(1000);
}


