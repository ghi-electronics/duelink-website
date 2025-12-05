// In this sample:
// Draws circles on the screen
// Plays a sweep sound when a touch is detected on pin 0, 1, or 2
// Plays a sweep sound when a pressed is detected on button A,B
// Show light value on the top of the screen
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

var buzzerPin = 4;
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
        var light = duelink.Engine.ExecuteCommand("Light()");
        duelink.Graphics.TextS($"Light: {light}%", 1, 0, 0, 1, 1);
    }

    for (var i = 0; i < 3;i++) {
        if (IsTouch(i)) {
            duelink.Sound.Sweep(buzzerPin, 2000, 4000, 50, 255, 100);
            break;
        }
    }

    if (duelink.Engine.ExecuteCommand("BtnA()") !=0 || duelink.Engine.ExecuteCommand("BtnB()")!=0) {
        duelink.Sound.Sweep(buzzerPin, 1000, 2000, 50, 255, 100);
    }
    Thread.Sleep(1); 
}


