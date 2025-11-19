
using GHIElectronics.DUELink;


var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

// Functions
void SetLed(int index, int color, int brightness) {
    var b = (int)(brightness * 31) / 100;
    var cmd = $"SetLed({index},{color},{b})";
    duelink.Engine.ExecuteCommand(cmd);
}

void SetAll(int color) {
    var cmd = $"SetAll({color})";
    duelink.Engine.ExecuteCommand(cmd);
}

void ShowLed() {
    duelink.Engine.ExecuteCommand("ShowLed()");
}

void RndLed() {
    duelink.Engine.ExecuteCommand("RndLed()");
}

void PlayLed(bool enable) {
    var e = enable ? 1 : 0;
    var cmd = $"PlayLed({e})";
    duelink.Engine.ExecuteCommand(cmd);
}

void Buzzer(int frequency, int durationMs) {
    var cmd = $"freq(1,{frequency},{durationMs},0.5)";
    duelink.Engine.ExecuteCommand(cmd);
    Thread.Sleep(durationMs);
}

bool IsButtonPressed() {
    var cmd = "dread(20,2)";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret == 1; // Assuming ExecuteCommand returns string
}

void PlayJingle() {
    var cmd = "melodyP(1,a1)";
    duelink.Engine.ExecuteCommand(cmd);
}

// Frequency-duration array
int[] freq_dur = {
    330,200, 330,200, 330,300, 0,100,
    330,200, 330,200, 330,300, 0,100,
    330,200, 392,200, 262,300, 294,100,
    330,400, 0,400, 349,200, 349,200,
    349,300, 0,0, 349,100, 349,200,
    330,200, 330,200, 0,0, 330,100,
    330,100, 392,200, 392,200, 349,200,
    294,200, 262,400, 0,400
};

// Send array to DUELink
duelink.Engine.ExecuteCommand("dim a1[31*2]");
for (var i = 0; i < freq_dur.Length; i++) {
    var cmd = $"a1[{i}]={freq_dur[i]}";
    duelink.Engine.ExecuteCommand(cmd);
}

// Main loop
SetAll(0);
var btnStatus = false;

while (true) {
    var btnPress = IsButtonPressed();

    if (btnPress != btnStatus) {
        btnStatus = btnPress;
        if (btnStatus) {
            PlayJingle();
        }
    }

    RndLed();
    Thread.Sleep(250);
}

