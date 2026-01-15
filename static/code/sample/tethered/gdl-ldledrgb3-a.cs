// In this sample:
// Continuously change colors: white, red, green, and blue, every second

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Setled(int led, uint color) {
    duelink.Engine.ExecuteCommand($"SetLed({led},{color})");
}

var count = 0;
while (true) {
    switch (count%4) {
        case 0: // white
            Setled(0, 0xFFFFFF);
            Setled(1, 0xFFFFFF);
            Setled(2, 0xFFFFFF);
            break;
        case 1: // red
            Setled(0, 0xFF0000);
            Setled(1, 0xFF0000);
            Setled(2, 0xFF0000);
            break;
        case 2:// green
            Setled(0, 0x00FF00);
            Setled(1, 0x00FF00);
            Setled(2, 0x00FF00);
            break;
        case 3:// blue
            Setled(0, 0x0000FF);
            Setled(1, 0x0000FF);
            Setled(2, 0x0000FF);
            break;        
    }
    count++;
    Thread.Sleep(1000);
}
