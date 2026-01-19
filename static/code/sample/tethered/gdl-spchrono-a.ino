// In this sample:
// Update counter from 0 to 9 every second
// Press any button (A or B) to reset the counter to 0
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool ButtonAPressed() {
    const char* cmd = "BtnA()";
    auto ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}
bool ButtonBPressed() {
    const char* cmd = "BtnB()";
    auto ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}
void DrawNumber(int number) {
    duelink.Engine.ExecuteCommand("clear(0)");
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Textt(\\"%d\\", 1, 0,0)", number);
    duelink.Engine.ExecuteCommand(cmd);
    duelink.Engine.ExecuteCommand("show()");
}

int counter = 0;

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

    if (ButtonAPressed() || ButtonBPressed()) {

    counter = 0;

    }

    

    DrawNumber(counter);

    

    counter++;

    if (counter == 10) {

    counter = 0;

    }

    

    delay(1000);

}