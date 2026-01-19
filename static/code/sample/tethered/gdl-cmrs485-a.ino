// In this sample:
// Send 0 or 1 to another RS485 to control the LED status.
// Receive data from the RS485.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void EnableRx(bool value) {
    duelink.Digital.Write(5, value ? 0 : 1);
}

void EnableTx(bool value) {
    duelink.Digital.Write(6, value ? 1 : 0);
}

void Initialize() {
    EnableRx(true);
    EnableTx(false);
    duelink.Uart.Configuration(9600, 128);
}

void WriteByte(uint8_t b) {
    EnableRx(false);
    EnableTx(true);

    duelink.Uart.WriteByte(b);

    EnableTx(false);
    EnableRx(true);
}

uint8_t ReadByte() {
    return (uint8_t)duelink.Uart.ReadByte();
}

int ByteToRead() {
    return duelink.Uart.BytesToRead();
}

int count_val = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Initialize();
}

void loop() {
    int v = count_val % 2;
    WriteByte((uint8_t)v);

    while (ByteToRead() == 0) {
        delay(1);
    }

    Serial.print("Rx: ");
    Serial.println(ReadByte());

    count_val++;
    delay(1000);
}
