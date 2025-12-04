// In this sample:
// Play Jingle song

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void PlayJingle() {
    var cmd = "melodyP(7,a1)";
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

PlayJingle();


