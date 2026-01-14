// In this sample:
// Update X, Y and Button status every 100ms

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

var button_pin = (int)duelink.Engine.ExecuteCommand("BtnPin()");

int ReadX() {
    var ret = duelink.Engine.ExecuteCommand("JoystickX()");
    return (int)ret;
}
int ReadY() {
    var ret = duelink.Engine.ExecuteCommand("JoystickY()");
    return (int)ret;
}

int ReadButton() {
    var ret = duelink.Digital.Read(button_pin, DUELinkController.InputType.PullUp);
    return ret == false ? 0:1;
}

while (true) {
    var x = ReadX();
    var y = ReadY();
    var bt = ReadButton();

    Console.WriteLine($"X = {x}, Y = {y}, Button status: {bt}");

    Thread.Sleep(100);
}

