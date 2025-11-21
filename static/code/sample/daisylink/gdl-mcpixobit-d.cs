// This sample draws circles on the screen and plays a sweep sound when a touch is detected on pin 0, 1, or 2
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
bool IsTouch(int pin) {
    if (pin < 0 || pin > 2)
        return false;

    var cmd = $"istouch({pin})";
    var ret = (int)duelink.Engine.ExecuteCommand(cmd);

    return ret ==1;
}

var x = 50;
var d = 10;
var width = (int)duelink.Engine.ExecuteCommand("getw()");
var height = (int)duelink.Engine.ExecuteCommand("geth()");

while (true) {
    duelink.Graphics.Circle(1, x, height / 2, 10);
    duelink.Graphics.Show();
    x = x + d;

    if (x > width || x < 0) {
        d = d * -1;
        duelink.Graphics.Clear(0);
    }

    for (var i = 0; i < 3;i++) {
        if (IsTouch(i)) {
            duelink.Sound.Sweep(4, 1000, 2000, 50, 255, 500);
            break;
        }
    }
    Thread.Sleep(1); 
}
