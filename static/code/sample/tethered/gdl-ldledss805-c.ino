// In this sample:
// Show characters, dot, numbers.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void DrawText(const char* text) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "PrntStr(\\"%d\", text);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec");
}

void DrawDot(int pos, int value) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Dot(%d,%d)", pos, value);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

void DrawNumber(int number) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Digit(%d)", number);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}
void Clear() {
    duelink.Engine.ExecuteCommand("Clear(0)");
}
void Show() {
    duelink.Engine.ExecuteCommand("Show()");
}



int n = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    DrawText("ABCDE");

    Show();

    delay(1000);

    DrawText("FGHIJ");

    Show();

    delay(1000);

    DrawText("KLMNO");

    Show();

    delay(1000);

    DrawText("PQRST");

    Show();

    delay(1000);

    DrawText("UVWXY");

    Show();

    delay(1000);

    DrawText("  Z  ");

    DrawDot(0, 1); DrawDot(1, 1); DrawDot(3, 1); DrawDot(4, 1);

    Show();

    delay(1000);

        initialized = true;
    }

    Clear();

    DrawNumber(n%100000);

    n++;

    Show();

    delay(100);

}