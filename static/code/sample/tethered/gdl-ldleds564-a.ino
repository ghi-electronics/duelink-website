// In this sample:
// Display the current minute and second on the LED (timer version).
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void DrawNumber(int led, int number) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Seg7(%d,%d)", led, number);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

void ShowColon(int value) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Colon(%d)", value);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

void Show() {
    duelink.Engine.ExecuteCommand("Show()");
}

int min = 0;
int sec = 0;

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

    auto minute = DateTime.UtcNow.Minute;

    auto second = DateTime.UtcNow.Second;

    if (sec != second || min != minute) {

    sec = second;

    min = minute;

    DrawNumber(0, sec % 10);

    DrawNumber(1, sec / 10);

    

    DrawNumber(2, min % 10);

    DrawNumber(3, min / 10);

    }

    ShowColon(1);

    Show();

    delay(400); // off 100ms

    ShowColon(0);

    Show();

    delay(400); // off 100ms

}