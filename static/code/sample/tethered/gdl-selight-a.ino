// In this sample:
// Pull light value every second
// When light below 25, turn the statled on
// When light higher 25, turn the statled off
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetLight() {
    auto ret = duelink.Engine.ExecuteCommand("Light()");
    return (int)ret;
}
void SetStatLed(bool on) {
    const char* cmd = "statled(1,0,0)";

    if (!on) {
        cmd = "statled(0,1,0)";
    }

    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

        initialized = true;
    }

    auto light = GetLight();

    

    if (light < 25) {

    SetStatLed(true);

    }

    else {

    SetStatLed(false);

    }

    char msg[64];
    snprintf(msg, sizeof(msg), "Light value: %d", light);
    Serial.println(msg);

    

    delay(1000);

}