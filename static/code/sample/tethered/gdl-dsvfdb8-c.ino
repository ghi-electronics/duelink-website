// In this sample:
// Display the text "DUELink!"
// Wait for 1 second
// Display counting up from 0 to 99,999,999
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void DrawNumber(int x, int number) {
    number = number + 48; // 48 = '0'
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "CPrint(%d,%d)", x, number);
    duelink.Engine.ExecuteCommand(cmd);
}

void DrawString(const char* text) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "CPrintS(\"%s\")", text);
    duelink.Engine.ExecuteCommand(cmd);
}

void Show() {
    duelink.Engine.ExecuteCommand("VShow()");
}

void Clear() {
    DrawString("        "); // clear 8-character display
    Show();
}

int number = 0;
int i = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Clear();
    DrawString("DUELink!");
    Show();
    delay(1000); // wait 1 second
    Clear();
}

void loop() {
    DrawNumber(i, number);
    Show();

    number = number + 1;
    if (number == 10) {
        number = 0;
        i = i + 1;
        if (i == 8) {
            i = 0;
            Clear();
        }
    }
    delay(10);
}
