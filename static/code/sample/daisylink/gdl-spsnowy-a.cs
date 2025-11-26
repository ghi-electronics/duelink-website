// In this sample:
// First led: 1
// Last led: 13
// Run a cycle from LED 1 to LED 13, with a 200 ms delay between each LED.
// When LED 13 is reached, turn off all LEDs and repeat the cycle.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetLed(int led_idx, bool on) {
    if (led_idx < 1 || led_idx > 13)
        return;

    var val = on ? 1 : 0;
    var cmd = $"setled({led_idx}, {val})";
    duelink.Engine.ExecuteCommand(cmd);
}

void Clear() {
    var cmd = "SetAll(0)";
    duelink.Engine.ExecuteCommand(cmd);
}

var led_index = 1;

Clear();
while (true) {

    SetLed(led_index, true);
    Thread.Sleep(200);
    led_index++;

    if (led_index == 14) {
        Clear();

        led_index = 1;
        Thread.Sleep(200);
    }
}

