// In this sample:
// Read and display the temperature from pixel[0] to pixel[63]
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetTemperature(int pixel) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "PixTemp(%d)", pixel);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    Serial.println("==============================");

    for (int i = 0; i < 64; i++) {
        int temp = GetTemperature(i);

        char msg[64];
        snprintf(msg, sizeof(msg), "Temperature at pixel %d: %d", i, temp);
        Serial.println(msg);
    }

    delay(100);
}
