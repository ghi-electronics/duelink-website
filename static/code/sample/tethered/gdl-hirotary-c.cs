// In this sample:
// Get the current rotary value
// Detect if the rotary button is pressed

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int GetValue() {
    var ret = duelink.Engine.ExecuteCommand("GetValue()");
    return (int)ret;
}
bool Pressed() {
    var ret = duelink.Engine.ExecuteCommand("Pressed()");
    return ret != 0;
}

void Init() {
    duelink.Engine.ExecuteCommand("Scan()");
}

var distance_bk = 0;
var button_status_bk = false;

Init();

while (true) {
    var distance = GetValue();
    var button_status = Pressed();

    if (distance_bk != distance) {
        distance_bk = distance;
        Console.WriteLine($"Value: {distance}");
    }

    if (button_status_bk != button_status) {
        button_status_bk = button_status;
        if (button_status_bk)
            Console.WriteLine("Button pressed!");
        else
            Console.WriteLine("Button released!");
    }

    Thread.Sleep(10);
}
