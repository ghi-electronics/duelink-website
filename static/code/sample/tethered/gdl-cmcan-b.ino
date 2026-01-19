// In this sample:
// On receiving a CAN message, display the RX values and send a CAN message (ID: 1,
// data: {1, 2, 3, 4, 5, 6, 7, 8}). Poll interval: 1 second.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int Read(uint8_t* data, int length) {
    char cmd[64];

    // length at first byte
    snprintf(cmd, sizeof(cmd), "dim b1[%d]", 1 + length);
    duelink.Engine.ExecuteCommand(cmd);

    int ret = (int)duelink.Engine.ExecuteCommand("RxRd(b1)");

    if (ret >= 0) {
        float id = duelink.Engine.ExecuteCommand("b1[0]");
        Serial.print("length: ");
        Serial.println((int)id);

        for (int i = 1; i <= length; i++) {
            snprintf(cmd, sizeof(cmd), "b1[%d]", i);
            data[i - 1] = (uint8_t)duelink.Engine.ExecuteCommand(cmd);

            Serial.print("Rx data: 0x");
            if (data[i - 1] < 16) Serial.print("0");
            Serial.println(data[i - 1], HEX);
        }
    }

    return ret;
}

void Write(int id, const uint8_t* data, int length) {
    char cmd[64];

    snprintf(cmd, sizeof(cmd), "dim b0[%d]", length);
    duelink.Engine.ExecuteCommand(cmd);

    for (int i = 0; i < length; i++) {
        snprintf(cmd, sizeof(cmd), "b0[%d]=%d", i, data[i]);
        duelink.Engine.ExecuteCommand(cmd);
    }

    snprintf(cmd, sizeof(cmd), "TxReq(%d,len(b0),b0)", id);
    duelink.Engine.ExecuteCommand(cmd);

    Serial.print("Sent: ");
    Serial.println(id);
}

uint8_t read_arr[8];
uint8_t write_arr[8] = { 1, 2, 3, 4, 5, 6, 7, 8 };

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    if (Read(read_arr, 8) >= 0) {
        Write(1, write_arr, 8);
    }

    delay(1000);
}
