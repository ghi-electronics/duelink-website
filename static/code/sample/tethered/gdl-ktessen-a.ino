// In this sample:
// 1. Read the distance and display it on the TFT N18
// 2. Continuously scan LEDs from D1 to D16 (play LEDs in a circular - circle mode)
// 3. When the rotary button is pressed:
//  - All LEDs from D1 to D16 on LEDR16 turn on.
//  - The servo rotates to 180 degrees.
// 4. When the rotary button is released:
//  - All LEDs from D1 to D16 on LEDR16 return to circular mode.
//  - The servo rotates back to 0 degrees.
// 5. When light detection is below 10%, the buzzer repeatedly beeps. If it is above 20%, the buzzer stays quiet.
// 6. Changes in distance will adjust the LED circle speed. For example:
//    5 cm = 5 ms delay, 10 cm = 10 ms delay, and so on.

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

const int DISTANCE_ADDRESS = 1;
const int DISPLAY_ADDRESS = 2;
const int SERVO_ADDRESS = 3;
const int LEDR16_ADDRESS = 4;
const int BUZER_ADDRESS = 5;
const int ROTARY_ADDRESS = 6;
const int LIGHT_ADDRESS = 7;

int currentAddress = -1;

float distance_val = -1.0f;
int rotary_val = 0;
unsigned long counter = 0;
bool doUpdateScreen = false;
bool rotary_button_pressed = false;
int light_val = 0;

void SelectDevice(int deviceAddress) {
    // Optimize the bus, reduce bus traffic
    // Do not send command if addresses are the same
    if (currentAddress != deviceAddress) {
        currentAddress = deviceAddress;
        char buf[64];
        snprintf(buf, sizeof(buf), "sel(%d)", currentAddress);
        duelink.Engine.ExecuteCommand(buf);
        delay(2); // give some delay
    }
}

// Display
void DrawText(const char* text, int color, int x, int y, int scalex, int scaley) {
    SelectDevice(DISPLAY_ADDRESS);
    char buf[64];
    snprintf(buf, sizeof(buf), "textS(\"%s\", %d, %d, %d, %d, %d)", text, color, x, y, scalex, scaley);
    duelink.Engine.ExecuteCommand(buf);
}

void ClearScreen(int color) {
    SelectDevice(DISPLAY_ADDRESS);
    char buf[64];
    snprintf(buf, sizeof(buf), "clear(%d)", color);
    duelink.Engine.ExecuteCommand(buf);
}

void Show() {
    SelectDevice(DISPLAY_ADDRESS);
    duelink.Engine.ExecuteCommand("show()");
}

int RGB(int r, int g, int b) {
    return (r << 16) | (g << 8) | b;
}

void UpdateScreen(bool update) {
    if (update) {
        ClearScreen(0);

        DrawText("Distance:", RGB(255, 255, 255), 0, 0, 1, 1);
        char dis_buf[16];
        snprintf(dis_buf, sizeof(dis_buf), "%.2f cm", distance_val);
        DrawText(dis_buf, RGB(0, 255, 0), 5, 10, 1, 1);

        DrawText("Rotary button:", RGB(255, 255, 255), 0, 20, 1, 1);
        DrawText(rotary_button_pressed ? "Pressed" : "Released", RGB(0, 255, 0), 5, 30, 1, 1);

        DrawText("Light:", RGB(255, 255, 255), 0, 40, 1, 1);
        char light_buf[16];
        snprintf(light_buf, sizeof(light_buf), "%d%%", light_val);
        DrawText(light_buf, RGB(0, 255, 0), 5, 50, 1, 1);

        Show();
    }
}

// Distance
float GetDistance() {
    SelectDevice(DISTANCE_ADDRESS);
    float ret = duelink.Engine.ExecuteCommand("Distance()");
    int ret1 = (int)(ret * 10);
    ret = ret1 / 10.0f;
    return ret;
}

// Rotary button
bool GetRotaryPress() {
    SelectDevice(ROTARY_ADDRESS);
    int ret = duelink.Engine.ExecuteCommand("Pressed()");
    return ret != 0;
}

// LedR16
void SetLedR16(int led, bool value) {
    SelectDevice(LEDR16_ADDRESS);
    char buf[64];
    snprintf(buf, sizeof(buf), "SetLed(%d,%d)", led, value ? 1 : 0);
    duelink.Engine.ExecuteCommand(buf);
}

void SetLedR16All(bool value) {
    SelectDevice(LEDR16_ADDRESS);
    if (value) {
        for (int led = 1; led <= 16; led++) {
            char buf[64];
            snprintf(buf, sizeof(buf), "SetLed(%d,%d)", led, 1);
            duelink.Engine.ExecuteCommand(buf);
        }
    } else {
        duelink.Engine.ExecuteCommand("LedOff()");
    }
}

// Servo
void SetServo(int position) {
    SelectDevice(SERVO_ADDRESS);
    char buf[64];
    snprintf(buf, sizeof(buf), "ServoSt(1,%d)", position);
    duelink.Engine.ExecuteCommand(buf);
}

// Light
int GetLight() {
    SelectDevice(LIGHT_ADDRESS);
    int ret = duelink.Engine.ExecuteCommand("Light()");
    return ret;
}

// Buzzer
void PlaySound() {
    SelectDevice(BUZER_ADDRESS);
    duelink.Engine.ExecuteCommand("freq(7, 1000, 250, 0.5)");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    if (counter % 10 == 0) {
        float cur_distance = GetDistance();
        if (cur_distance != distance_val) {
            distance_val = cur_distance;
            doUpdateScreen = true;
        }
    }

    if (counter % 11 == 0) {
        bool pressed = GetRotaryPress();
        if (pressed != rotary_button_pressed) {
            rotary_button_pressed = pressed;
            if (rotary_button_pressed) {
                SetLedR16All(true);
                SetServo(180);
            } else {
                SetLedR16All(false);
                SetServo(0);
            }
        }
    }

    if (counter % 12 == 0) {
        int light_tmp = GetLight();
        if (light_val != light_tmp) {
            light_val = light_tmp;
            doUpdateScreen = true;
        }

        if (light_val < 10) {
            PlaySound();
        }
    }

    if (!rotary_button_pressed) {
        SetLedR16((counter % 16) + 1, ((counter / 16) % 2) == 0);
    }

    if (counter % 16 == 0) {
        UpdateScreen(doUpdateScreen);
        doUpdateScreen = false;
    }

    counter++;
    const int DELAY_MAX = 100;
    const int DELAY_MIN = 5;

    if (distance_val < DELAY_MIN) distance_val = DELAY_MIN;
    if (distance_val > DELAY_MAX) distance_val = DELAY_MAX;

    delay((int)distance_val);
}
