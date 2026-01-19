// In this sample:
// Detect and display the RFID card number when the card is close enough
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsCard() {
    auto ret = duelink.Engine.ExecuteCommand("IsCard()");
    return ret == 1;
}

void ReadCard(uint8_t* cardNumber, int cardNumberLen) {
    duelink.Engine.ExecuteCommand("dim b1[16]");
    duelink.Engine.ExecuteCommand("ReadCard(b1)");

    duelink.Stream.ReadBytes("b1", cardNumber);
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

    if (IsCard()) {

    Serial.println("Card detected:");

    auto num = new uint8_t[16];

    

    ReadCard(num);

    

    for (int i = 0; i < 16; i++) {

    char n[3];
    snprintf(n, sizeof(n), "%02X", (unsigned int)(num[i]));

    char msg[64];
    snprintf(msg, sizeof(msg), "%d", n);
    Serial.print(msg);

    if (i < 16-1) {

    Serial.print(":");

    }

    }

    Serial.println();

    }

    

    delay(500);

}