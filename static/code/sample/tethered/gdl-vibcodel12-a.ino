// In this sample:
// Set the scanner to Continuous mode
// Show the barcode when the barcode is close enough to the scanner
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetMode(int mode) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "SetMode(%d)", mode);
    duelink.Engine.ExecuteCommand(cmd);
}

int ByteToRead() {
    return (int)duelink.Uart.BytesToRead();
}

uint8_t ReadByte() {
    return duelink.Uart.ReadByte();
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    SetMode(2); // Continuous mode
}

void loop() {
    int available1 = ByteToRead();

    delay(250); // wait for 250ms

    int available2 = ByteToRead();

    if (available2 > 0 && available1 == available2) {
        Serial.println("Detect barcode:");

        for (int i = 0; i < available1; i++) {
            uint8_t b = ReadByte();
            Serial.print((char)b);
        }
        Serial.println();
    }

    delay(250);
}
