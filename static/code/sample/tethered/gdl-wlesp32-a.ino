// This sample runs on Arduino UNO 4 WIFI
// In this sample:
// Send AT command AT+GMR
// Read responses (multiple lines)

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void ATCmdSend(const char* cmd) {
    char cmdBuffer[64];
    snprintf(cmdBuffer, sizeof(cmdBuffer), "ATCmd(\"%s\")", cmd);
    duelink.Engine.ExecuteCommand(cmdBuffer);
}

void ATCmdReadLine(int timeout, char* outBuffer, int outBufferSize) {
    char cmdBuffer[64];
    snprintf(cmdBuffer, sizeof(cmdBuffer), "ReadLine(1, %d)", timeout);
    duelink.Engine.ExecuteCommand(cmdBuffer);

    uint8_t data[1024];
    duelink.Stream.ReadBytes("b0", data);

    int i = 0;
    for (; i < outBufferSize - 1 && i < 1024; i++) {
        if (data[i] == 0) break;
        outBuffer[i] = (char)data[i];
    }
    outBuffer[i] = '\0';
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    
}

void loop() {

   ATCmdSend("AT+GMR");

    char line[1024];
    ATCmdReadLine(1000, line, sizeof(line));

    while (true) {
        // The version response returns multiple lines; keep reading until the end
        if (line[0] != '\0') {
            Serial.println(line);
            ATCmdReadLine(1000, line, sizeof(line));

            delay(1000);
        }
        else {
            break;
        }
    }

}
