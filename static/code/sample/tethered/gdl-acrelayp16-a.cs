// In this sample:
// Continuously switch relay on/off every 2 seconds

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Set(int relay, bool value) {
    var v = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"Set({relay},{v})");
}

while (true) {
    Thread.Sleep(2000);
    Set(2,true);

    Thread.Sleep(2000);
    Set(2, false);
}
