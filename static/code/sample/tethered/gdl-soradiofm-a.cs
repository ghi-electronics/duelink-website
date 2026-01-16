// In this sample:
// Allow to set volume and channel on RadioFM module

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetVolume(int volume) {
    if (volume >= 0 && volume <= 100) {
        duelink.Engine.ExecuteCommand($"SetVol({volume})");
    }
}
void SetChannel(float channel) {
    duelink.Engine.ExecuteCommand($"SetChan({channel})");
}

SetVolume(50); // set 50%
SetChannel(100.3f); // set channel 100.3 


