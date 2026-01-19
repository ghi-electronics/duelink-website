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
        char cmd[64];
        snprintf(cmd, sizeof(cmd), "SetVol(%d)", volume);
        float __ec = duelink.Engine.ExecuteCommand(cmd);
        __ec;
    }
}
void SetChannel(float channel) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetChan(%d)", channel);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    SetVolume(50); // set 50%

    SetChannel(100.3f); // set channel 100.3

        initialized = true;
    }

}