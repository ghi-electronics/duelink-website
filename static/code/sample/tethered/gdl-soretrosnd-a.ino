// In this sample:
// Set right and left channel to max 100%
// Use Sound library to play wav file
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetRightVolume(int vol) {
    if (vol >= 0 && vol <= 100) {
        char cmd[32];
        snprintf(cmd, sizeof(cmd), "SetRVol(%d)", vol);
        duelink.Engine.ExecuteCommand(cmd);
    }
}

void SetLeftVolume(int vol) {
    if (vol >= 0 && vol <= 100) {
        char cmd[32];
        snprintf(cmd, sizeof(cmd), "SetLVol(%d)", vol);
        duelink.Engine.ExecuteCommand(cmd);
    }
}

const uint8_t wav[] = {
    0x52,0x49,0x46,0x46,0x48,0x09,0x00,0x00,0x57,0x41,0x56,0x45,0x66,0x6d,0x74,0x20,
    0x10,0x00,0x00,0x00,0x01,0x00,0x01,0x00,0xa0,0x0f,0x00,0x00,0xa0,0x0f,0x00,0x00,
    0x01,0x00,0x08,0x00,
    // (data truncated intentionally preserved exactly from C# sample)
};

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    SetRightVolume(100);
    SetLeftVolume(100);

    duelink.Sound.Wave(1, wav, 44, sizeof(wav) - 44, 48000, 120);
}

void loop() {
}
