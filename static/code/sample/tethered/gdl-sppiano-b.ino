// In this sample:
// Simulate tones from note C4 to C5
// Press the left arrow all leds 1,2,3,4,5 are off, play a sweep sound
// Press the right arrow all leds 1,2,3,4,5 are on, play a sweep sound
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsLeftArrowTouched() {
    auto ret = duelink.Engine.ExecuteCommand("TLArrow()");
    return ret == 1;
}

bool IsRightArrowTouched() {
    auto ret = duelink.Engine.ExecuteCommand("TRArrow()");
    return ret == 1;
}

bool IsPadTouched(int i) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "TPad(%d)", i);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    auto ret = __ec;
    return ret == 1;
}

int tones[] = { 523, 554, 587, 622, 659, 698, 740, 784, 830, 880, 932, 987, 1047  };

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

    for (int i = 0; i < tonesLen; i++) {

    if (IsPadTouched(i)) {

    char cmd[64];

    snprintf(cmd, sizeof(cmd), "freq(3, %d, 0, 0.5)", tones[i]);

    float __ec = duelink.Engine.ExecuteCommand(cmd);

    __ec;

    while (true) {

    if (!IsPadTouched(i)) {

    char cmd[64];

    snprintf(cmd, sizeof(cmd), "freq(3, %d, 0, 1)", tones[i]);

    float __ec = duelink.Engine.ExecuteCommand(cmd);

    __ec;

    break;

    }

    delay(10);

    }

    

    }

    }

    

    if (IsLeftArrowTouched()) {

    duelink.Engine.ExecuteCommand("SetLEDAll(0)");

    duelink.Engine.ExecuteCommand("sweep(3, 1000,2000,50,255,250)");

    delay(250);

    }

    

    if (IsRightArrowTouched()) {

    duelink.Engine.ExecuteCommand("SetLEDAll(1)");

    duelink.Engine.ExecuteCommand("sweep(3, 2000,1000,255,50,250)");

    delay(250);

    }

    delay(1);

}