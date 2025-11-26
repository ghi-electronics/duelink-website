// In this sample:
// Simulate tones from note C4 to C5
// Press the left or right arrow to play a sweep sound
// All leds 1,2,3,4,5 turn to ON

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void CreateArray(string array, int[] data) {
    var cmd = string.Empty;

    cmd = $"dim {array}";
    duelink.Engine.ExecuteCommand(cmd);

    for (var i = 0; i < data.Length; i++) {
        cmd = $"{array}[{i}]=data[{i}]";
        duelink.Engine.ExecuteCommand(cmd);
        Thread.Sleep(1);
    }
}

bool IsTouch(int pin) {
    var cmd = $"PulseIn({pin}, 500, 1,100)";
    var ret = duelink.Engine.ExecuteCommand(cmd);

    if (ret > 150 && ret < 65000)
        return true;
    return false;
}

void PlayTone(int tone) {
    var cmd = $"freq(3, {tone}, 500, 0.5)";
    duelink.Engine.ExecuteCommand(cmd);
}

void SweepSound() {
    var cmd = $"sweep(3, 2000,4000,50,255,100)";
    duelink.Engine.ExecuteCommand(cmd);
}

void SetAllLed(bool on) {
    var value = on ? 1 : 0;
    for (var i = 0; i < 5; i++) {
        var cmd = $"SetLED({i+1},{value})";
        duelink.Engine.ExecuteCommand(cmd);
    }
}

var b1 = new int[] { 23, 19, 12, 13, 14, 15, 16, 18, 24, 10, 9, 8, 17 };
var a1 = new int[] { 261, 277, 293, 311, 329, 349, 369, 392, 415, 440, 466, 493, 523 };

var b3 = new bool[] { false, false, false, false, false, false, false, false, false, false, false, false, false };
var b4 = new bool[] { false, false, false, false, false, false, false, false, false, false, false, false, false };

CreateArray("b1", b1);
CreateArray("a1", a1);

SetAllLed(true);

while (true) {
    for (var i = 0; i < b1.Length; i++) {
        b3[i] = IsTouch(b1[i]);

        if (b4[i] != b3[i]) {
            b4[i] = b3[i];

            if (b4[i]) {
                PlayTone(a1[i]);
            }
        }
    }

    if (IsTouch(7) || IsTouch(11)) {
        SweepSound();
    }
    Thread.Sleep(1);
}

