// In this sample:
// Get the current rotary value
// Detect if the rotary button is pressed
// Note:
// The rotary driver uses interrupts, so DUEScript user code must remain in a while-loop indefinitely.
// Append the while-loop below to ensure the user code stays in a while-loop indefinitely if the device does not already have one.
// /////// User code //////
// Asio(1) # Allow communication between host and device
// while (1) # while loop indefinitely 
//    Wait(1000)
// wend

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

var distance_bk = 0;
var button_status_bk = false;
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

