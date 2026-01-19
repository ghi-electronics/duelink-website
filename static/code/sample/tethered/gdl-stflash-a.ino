// In this sample:
// Implement Erase, Write, Read, Busy and GetID
// Using Stream to Write / Read data at sector 1
// Sector size is 4KB
// Flash size is 16MB
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsBusy() {
    float ret = duelink.Engine.ExecuteCommand("SfIsBusy()");
    return ret != 0;
}

void GetId(uint8_t* id) {
    duelink.Engine.ExecuteCommand("dim b0[3]");
    duelink.Engine.ExecuteCommand("SfGetid(b0)");
    duelink.Stream.ReadBytes("b0", id, 3);
}

void Erase(int blockAddress) {
    duelink.Engine.ExecuteCommand("SfErase(%d)", blockAddress);
    delay(100);
    while (IsBusy()) {
        delay(100);
    }
}

void WriteData(int address, const uint8_t* data, int length) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "dim b1[%d]", length);
    duelink.Engine.ExecuteCommand(cmd);
    duelink.Stream.WriteBytes("b1", data, length);
    snprintf(cmd, sizeof(cmd), "SfWrite(%d,b1)", address);
    duelink.Engine.ExecuteCommand(cmd);
    delay(100);
    while (IsBusy()) {
        delay(100);
    }
}

void ReadData(int address, uint8_t* data, int length) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "dim b2[%d]", length);
    duelink.Engine.ExecuteCommand(cmd);
    snprintf(cmd, sizeof(cmd), "SfRead(%d,b2)", address);
    duelink.Engine.ExecuteCommand(cmd);
    duelink.Stream.ReadBytes("b2", data, length);
    delay(100);
    while (IsBusy()) {
        delay(100);
    }
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Serial.println("Make sure system is not busy before accessing data in flash");
    while (IsBusy()) {
        delay(1000);
        Serial.println("Flash is busy!!!!");
    }

    uint8_t id[3];
    GetId(id);

    for (int i = 0; i < 3; i++) {
        char msg[16];
        snprintf(msg, sizeof(msg), "0x%02X", id[i]);
        Serial.println(msg);
    }

    const int test_address = 4 * 1024;

    Erase(test_address);

    const char text1[] = "Test ";
    const char text2[] = "me";

    WriteData(test_address, (const uint8_t*)text1, sizeof(text1) - 1);
    WriteData(test_address + (sizeof(text1) - 1), (const uint8_t*)text2, sizeof(text2) - 1);

    uint8_t data_read[sizeof(text1) - 1 + sizeof(text2) - 1];
    ReadData(test_address, data_read, sizeof(data_read));

    char read_str[sizeof(data_read) + 1];
    memcpy(read_str, data_read, sizeof(data_read));
    read_str[sizeof(data_read)] = '\0';

    Serial.println(read_str);
}

void loop() {
}
