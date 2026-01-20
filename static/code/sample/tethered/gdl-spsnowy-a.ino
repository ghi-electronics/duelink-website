// In this sample:
// First LED: 1
// Last LED: 13
// Run a cycle from LED 1 to LED 13, with a 200 ms delay between each LED.
// When LED 13 is reached, turn off all LEDs and repeat the cycle.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller initialization
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

// Sets an individual LED on or off
void SetLed(int led_idx, bool on) {
    if (led_idx < 1 || led_idx > 13)
        return;

    int val = on ? 1 : 0;
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "setled(%d, %d)", led_idx, val);
    duelink.Engine.ExecuteCommand(cmd);
}

// Turns off all LEDs
void Clear() {
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "SetAll(0)");
    duelink.Engine.ExecuteCommand(cmd);
}

int led_index = 1;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    // Initial clear, matching C# startup behavior
    Clear();
}

void loop() {
    SetLed(led_index, true);
    delay(200);
    led_index++;

    if (led_index == 14) {
        Clear();
        led_index = 1;
        delay(200);
    }
}
