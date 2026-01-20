// In this sample:
// Display the current minute and second on the LED (timer version).
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void DrawNumber(int led, int number) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "Seg7(%d,%d)", led, number);
    duelink.Engine.ExecuteCommand(cmd);
}

void ShowColon(int value) {
    char cmd[16];
    snprintf(cmd, sizeof(cmd), "Colon(%d)", value);
    duelink.Engine.ExecuteCommand(cmd);
}

void Show() {
    duelink.Engine.ExecuteCommand("Show()");
}

void ReadTime(int &minute, int &second) {
    duelink.Engine.ExecuteCommand("ReadTime()");
    minute = (int)duelink.Engine.ExecuteCommand("_m");
    second = (int)duelink.Engine.ExecuteCommand("_s");
}

int last_min = -1;
int last_sec = -1;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    int minute, second;
    ReadTime(minute, second);

    if (minute != last_min || second != last_sec) {
        last_min = minute;
        last_sec = second;

        DrawNumber(0, second % 10);
        DrawNumber(1, second / 10);
        DrawNumber(2, minute % 10);
        DrawNumber(3, minute / 10);
    }

    ShowColon(1);
    Show();
    delay(400);

    ShowColon(0);
    Show();
    delay(400);
}
