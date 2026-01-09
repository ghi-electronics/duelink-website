// In this sample:
// Continuously turn the fan forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetSpeed(int speed) {
    var v = speed > 100 ? 100 : speed;
    v = v < -100 ? -100 : v;
    duelink.Engine.ExecuteCommand($"Fan({v})");
}

while (true) {
    Thread.Sleep(2000);
    SetSpeed(50);

    Thread.Sleep(2000);
    SetSpeed(-50);
}