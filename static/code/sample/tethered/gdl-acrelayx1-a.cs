// In this sample:
// Continuously switch relay on/off every 2 seconds

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Set(bool value) {
    var v = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"Set({v})");
}

while (true) {
    Thread.Sleep(2000);
    Set(true);

    Thread.Sleep(2000);
    Set(false);
}
