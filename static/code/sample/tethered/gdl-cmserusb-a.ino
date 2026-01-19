// In this sample:
// Receive a byte
// Send back (byte + 1)
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Initialize() {
    duelink.Uart.Configuration(9600, 128);
}

void WriteByte(uint8_t b) {
    duelink.Uart.WriteByte(b);
}

uint8_t ReadByte() {
    return (uint8_t)duelink.Uart.ReadByte();
}

int ByteToRead() {
    return duelink.Uart.BytesToRead();
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Initialize();
}

void loop() {
    while (ByteToRead() == 0) {
        delay(100);
    }

    uint8_t b = ReadByte();
    b++;

    WriteByte(b);
}
