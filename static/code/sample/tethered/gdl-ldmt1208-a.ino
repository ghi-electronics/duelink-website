// In this sample:
// Display "Hello World" and scroll the text across the screen
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int x = 12;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    duelink.Graphics.Clear(0);
    duelink.Graphics.Text("Hello world!", 1, x, 0);
    x--;

    if (x < -70) {
        x = 12;
    }

    duelink.Graphics.Show();
    delay(1);
}
