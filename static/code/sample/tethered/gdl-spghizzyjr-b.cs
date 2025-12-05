// In this sample:
// When the LDR button is not pressed: the left and right eyes blink every second.
// When the LDR button is pressed: the left and right eyes blink every 200 ms.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetLeftEye(int red, int green, int blue) {
    var cmd = $"LEye({red},{green},{blue})";
    duelink.Engine.ExecuteCommand(cmd);
}

void SetRightEye(int red, int green, int blue) {
    var cmd = $"REye({red},{green},{blue})";
    duelink.Engine.ExecuteCommand(cmd);
}


bool IsButtonPressed() {
    var cmd = "dread(20,2)";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret == 1;
}

// Use ExecuteCommand to send standard library
duelink.Engine.ExecuteCommand("statled(100, 100, 0)");

// Use defined function
while (true) {
    var delay = 500;
    var btnPress = IsButtonPressed();

    if (btnPress) {
        delay = 100;        
    }
    
    SetLeftEye(255, 255, 255);
    SetRightEye(255, 255, 255);
    Thread.Sleep(delay);
    SetLeftEye(0, 0, 0);
    SetRightEye(0, 0, 0);
    Thread.Sleep(delay);
}
