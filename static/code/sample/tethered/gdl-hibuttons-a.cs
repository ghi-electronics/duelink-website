// In this sample:
// Detect if the button is pressed

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsBtnPressed() {
    return duelink.Button.Down(1);    
}

while (true) {
    if (IsBtnPressed()) {
        Console.WriteLine("Button Pressed");
    }
    Thread.Sleep(100);
}
