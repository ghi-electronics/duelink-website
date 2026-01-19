// In this sample:
// Read and display the temperature from pixel[0] to pixel[63]
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetTemperature(int pixel) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "PixTemp(%d)", pixel);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    return (int)__ec;
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

    Serial.println("==============================");

    for (int i = 0; i < 64; i++) {

    char msg[64];
    snprintf(msg, sizeof(msg), "Temperature at pixel %d: %d", i, GetTemperature(i));
    Serial.println(msg);

    }

    

    delay(100);

}