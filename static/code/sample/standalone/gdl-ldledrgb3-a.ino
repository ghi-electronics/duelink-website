// In this sample:
// Continuously change colors: white, red, green, and blue every second

#include <Arduino.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

// Setup for STM32 12-bit ADC resolution
void setup() {
    analogReadResolution(12);  // Enable 12-bit analog read
}

// Function to write analog value to a pin
void aWrite(int pin, float value) {
    // value is 0..1, convert to 12-bit PWM (0..4095)
    int pwmValue = (int)(value * 4095);
    //analogWrite(getpin(pin), 4095);
    int v = value < 1? 0:1;
    pinMode(getpin(pin), OUTPUT);
    digitalWrite(getpin(pin), v);
}

// Set LED function
void SetLed(int i, uint32_t c) {
    float r = ((c >> 16) & 0xFF) / 255.0;
    float g = ((c >> 8) & 0xFF) / 255.0;
    float b = (c & 0xFF) / 255.0;

    if (i == 0) {
        aWrite(1, b);
        aWrite(2, r);
        aWrite(3, g);
    }

    if (i == 1) {
        aWrite(4, b);
        aWrite(5, r);
        aWrite(6, g);
    }

    if (i == 2) {
        aWrite(7, b);
        aWrite(8, r);
        aWrite(11, g);
    }

}

int idx = 0;
void loop() {
    

    if (idx == 0) {  // All LEDs white
        SetLed(0, 0xFFFFFF);
        SetLed(1, 0xFFFFFF);
        SetLed(2, 0xFFFFFF);
    }

    if (idx == 1) {  // All LEDs red
        SetLed(0, 0xFF0000);
        SetLed(1, 0xFF0000);
        SetLed(2, 0xFF0000);
    }

    if (idx == 2) {  // All LEDs green
        SetLed(0, 0x00FF00);
        SetLed(1, 0x00FF00);
        SetLed(2, 0x00FF00);
    }

    if (idx == 3) {  // All LEDs blue
        SetLed(0, 0x0000FF);
        SetLed(1, 0x0000FF);
        SetLed(2, 0x0000FF);
    }


    idx = (idx + 1) % 4;
    delay(1000);  // Wait 1000 ms
    
}
