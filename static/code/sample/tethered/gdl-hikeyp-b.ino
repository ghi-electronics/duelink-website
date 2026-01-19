// In this sample:
// Detect a pressed key
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsKeyChange() {
    auto ret = duelink.Engine.ExecuteCommand("IsKeyChange()");
    return ret > 0 ? true : false;
}
int ReadKey() {
    auto ret = duelink.Engine.ExecuteCommand("RdKey()");
    return (int)ret;
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

    duelink.Engine.ExecuteCommand("Scan()"); // use this then no need to call SStart("Scan", 100, 0) in script that require while(1) loop active

    delay(10);

    if (IsKeyChange()) {

    auto key = ReadKey();

    

    if (key == 0) {

    char msg[64];
    snprintf(msg, sizeof(msg), "Key released");
    Serial.println(msg);

    }

    else {

    char msg[64];
    snprintf(msg, sizeof(msg), "Key pressed: %d", (char)ReadKey());
    Serial.println(msg);

    }

    }

    

    delay(100);

}