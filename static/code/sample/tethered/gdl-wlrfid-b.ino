// In this sample:
// Detect and display the RFID card number when the card is close enough
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsCard() {
    float ret = duelink.Engine.ExecuteCommand("IsCard()");
    return ret == 1;
}

void ReadCard(uint8_t* cardNumber) {
    duelink.Engine.ExecuteCommand("dim b1[16]");
    duelink.Engine.ExecuteCommand("ReadCard(b1)");
    duelink.Stream.ReadBytes("b1", cardNumber, 16);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    if (IsCard()) {
        Serial.println("Card detected:");

        uint8_t num[16];
        ReadCard(num);

        char msg[64];
        int pos = 0;

        for (int i = 0; i < 16; i++) {
            pos += snprintf(msg + pos, sizeof(msg) - pos,
                            (i < 15) ? "%02X:" : "%02X",
                            num[i]);
        }

        Serial.println(msg);
    }

    delay(500);
}
