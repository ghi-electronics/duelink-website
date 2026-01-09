// In this sample:
// Continuously turn the motor forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Set(int speed) {
    duelink.Engine.ExecuteCommand($"Set({speed})");
}

while (true) {
    Set(50); // forward
    Thread.Sleep(2000);
    Set(-50); // backward
    Thread.Sleep(2000);   
}
