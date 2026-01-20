// In this sample:
// Get 7 channel data from Spectrum and show it on the console
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

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

    auto data = new uint8_t[7];

    

    duelink.Engine.ExecuteCommand("UpdBnd()");

    duelink.Stream.ReadBytes("b1",data);

    Serial.println("============================");

    for (int i = 0; i < 7; i++) {

    char msg[64];
    snprintf(msg, sizeof(msg), "data %d: %d", i, data[i]);
    Serial.println(msg);

    }

    delay(1);

}