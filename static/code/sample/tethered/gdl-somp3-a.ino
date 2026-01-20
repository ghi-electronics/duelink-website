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

void ResetModule() {
    duelink.Engine.ExecuteCommand("Rst()");
    delay(1000);
}

void SetVolume(int vol) {
    if (vol >= 0 && vol <= 100) {
        char cmd[32];
        snprintf(cmd, sizeof(cmd), "SetVol(%d)", vol);
        duelink.Engine.ExecuteCommand(cmd);
    }
}

void PlayFile(int folder, int file) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "PlayFile(%d,%d)", folder, file);
    duelink.Engine.ExecuteCommand(cmd);
}

void LoopMode(bool enable) {
    char cmd[16];
    snprintf(cmd, sizeof(cmd), "Loop(%d)", enable ? 1 : 0);
    duelink.Engine.ExecuteCommand(cmd);
}

void StopPlay() {
    duelink.Engine.ExecuteCommand("Stop()");
}

bool IsBusy() {
    float ret = duelink.Engine.ExecuteCommand("IsBusy()");
    return ret != 0;
}

int counter = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    ResetModule();
    SetVolume(30);
    PlayFile(1, 1);
}

void loop() {
    if (IsBusy()) {
        delay(1000);
        counter++;

        if (counter == 10) {
            Serial.println("The song is longer than 10 seconds, forcing stop");
            StopPlay();
        }
    } else {
        Serial.println("The song ended.");
        while (1) {
            delay(1000);
        }
    }
}
