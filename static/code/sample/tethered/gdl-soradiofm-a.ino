// In this sample:
// Allow to set volume and channel on RadioFM module
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetVolume(int volume) {
    if (volume >= 0 && volume <= 100) {
        char cmd[32];
        snprintf(cmd, sizeof(cmd), "SetVol(%d)", volume);
        duelink.Engine.ExecuteCommand(cmd);
    }
}

void SetChannel(float channel) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "SetChan(%.1f)", channel);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    SetVolume(50);     // set 50%
    SetChannel(100.3f); // set channel 100.3
}

void loop() {
}
