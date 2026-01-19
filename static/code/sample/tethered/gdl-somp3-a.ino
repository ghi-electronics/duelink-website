// In this sample:
// Wrapper functions: Reset, Set volume, Play, Stop, Check playing status, and set loop mode.
// Reset the module
// Set volume to 30%
// Play the MP3 file named 001.mp3 inside the folder named 01
// Check if playback is active. If the file has been playing for more than 10 seconds, stop it.
// SD card structure:
// - Folder names must be in the format: 01, 02, 03, ..., 99
// - File names (songs) must be in the format: 001.mp3, 002.mp3, ..., 999.mp3
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Reset() {
    duelink.Engine.ExecuteCommand("Rst()");
    delay(1000);
}

void SetVolume(int vol) {
    if (vol >= 0 && vol <= 100) {
        char cmd[64];
        snprintf(cmd, sizeof(cmd), "SetVol(%d)", vol);
        float __ec = duelink.Engine.ExecuteCommand(cmd);
        __ec;
    }
}

void PlayFile(int folder, int file) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "PlayFile(%d,%d)", folder, file);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

void Loop(bool enable) {
    auto v = enable ? 1 : 0;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Loop(%d)", v);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}
void Stop() {
    duelink.Engine.ExecuteCommand("Stop()");
}
bool IsBusy() { // # Playing state is also considered busy
    auto ret = duelink.Engine.ExecuteCommand("IsBusy()");
    return ret != 0;
}


int count = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    Reset(); // reset the module

    SetVolume(30);

    PlayFile(1, 1); //  # Play file 001.mp3 in folder 01

    while (IsBusy()) {

    delay(1000);

    count++;

    if (count == 10) {

    Serial.println("The song is longer than 10 seconds, forcing stop");

    Stop();

    break;

    }

    }

    Serial.println("The song ended.");

        initialized = true;
    }

}