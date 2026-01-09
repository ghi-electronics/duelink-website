// In this sample:
// Continuously set servo 1 from 0 to 180 degree
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Set(int servo, int degree) {    
    duelink.Engine.ExecuteCommand($"ServoSt({servo},{degree})");
}

while (true) {
    Set(1, 0);
    Thread.Sleep(1000);
    Set(1, 45);
    Thread.Sleep(1000);
    Set(1, 90);
    Thread.Sleep(1000);
    Set(1, 135);
    Thread.Sleep(1000);
    Set(1, 180);
    Thread.Sleep(1000);
    
    Thread.Sleep(1000);
}
