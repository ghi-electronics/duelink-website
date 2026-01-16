// In this sample:
// Wrapper functions: Reset, Set volume, Play, Stop, Check playing status, and set loop mode.
// Reset the module
// Set volume to 30%
// Play the MP3 file named 001.mp3 inside the folder named 01
// Check if playback is active. If the file has been playing for more than 10 seconds, stop it.
// SD card structure:
// - Folder names must be in the format: 01, 02, 03, ..., 99
// - File names (songs) must be in the format: 001.mp3, 002.mp3, ..., 999.mp3

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Reset() {
    duelink.Engine.ExecuteCommand("Rst()");
    Thread.Sleep(1000);
}

void SetVolume(int vol) {
    if (vol >= 0 && vol <= 100) {
        duelink.Engine.ExecuteCommand($"SetVol({vol})");
    }
}

void PlayFile(int folder, int file) { 
    duelink.Engine.ExecuteCommand($"PlayFile({folder},{file})");
}

void Loop(bool enable) {
    var v = enable ? 1 : 0;
    duelink.Engine.ExecuteCommand($"Loop({v})");
}
void Stop() {
    duelink.Engine.ExecuteCommand("Stop()");
}
bool IsBusy() { // # Playing state is also considered busy
    var ret = duelink.Engine.ExecuteCommand("IsBusy()");
    return ret != 0;
}

Reset();  // reset the module
SetVolume(30);
PlayFile(1, 1); //  # Play file 001.mp3 in folder 01

var count = 0;
while (IsBusy()) {
    Thread.Sleep(1000);
    count++;

    if (count == 10) {
        Console.WriteLine("The song is longer than 10 seconds, forcing stop");
        Stop();
        break;
        
    }
}
Console.WriteLine("The song ended.");


