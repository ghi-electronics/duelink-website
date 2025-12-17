// In this sample:
// Detect motion

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int Detect() {
    return (int)duelink.Engine.ExecuteCommand("Detect()");
}

while (true) {
    var detect = Detect();

    if (detect != 0) {
        Console.WriteLine("Motion Detected");

    }

    Thread.Sleep(1000);
}


