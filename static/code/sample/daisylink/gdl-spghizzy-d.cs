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

void SetEar(bool left, bool right) {
    var l = left ? 1 : 0;
    var r = right ? 1 : 0;
    var cmd = $"Ear({l},{r})";
    duelink.Engine.ExecuteCommand(cmd);
}

void SetMouth(bool left, bool center, bool right) {
    var l = left ? 1 : 0;
    var c = center ? 1 : 0;
    var r = right ? 1 : 0;
    var cmd = $"Mouth({l},{c},{r})";
    duelink.Engine.ExecuteCommand(cmd);
}

void PlayBeep() {
    var cmd = "freq(3,1000,100,0.5)";
    duelink.Engine.ExecuteCommand(cmd);
    Thread.Sleep(100);
}

bool IsButtonPressed() {
    var cmd = "dread(20,2)";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret == 1;
}

// Use ExecuteCommand to send standard library
duelink.Engine.ExecuteCommand("statled(100, 100, 0)");

// Use defined function
SetEar(true, true);
PlayBeep();

while (true) {
    var delay = 500;
    var btnPress = IsButtonPressed();

    if (btnPress) {
        delay = 100;
        PlayBeep();
    }

    SetMouth(btnPress, btnPress, btnPress);
    SetLeftEye(255, 255, 255);
    SetRightEye(255, 255, 255);
    Thread.Sleep(delay);
    SetLeftEye(0, 0, 0);
    SetRightEye(0, 0, 0);
    Thread.Sleep(delay);
}
