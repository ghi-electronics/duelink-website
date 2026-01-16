// In this sample:
// Read and send the temperature from pixel[0] to pixel[63] over debugSerial

#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial debugSerial(PA2, PA3);

// Custom I2C using user-defined pins
TwoWire i2c1Wire(getpin(16), getpin(15));

// I2C read buffer
uint8_t b1[2];

// --------------------------------------------------
// Init()
// --------------------------------------------------
void Init() {
    analogReadResolution(12);        // Enable 12-bit analog resolution (I2C-only requirement)
    i2c1Wire.begin();
    i2c1Wire.setClock(400000);        // I2cCfg(400) -> 400 kHz
}

// --------------------------------------------------
// Read 16-bit register (little-endian)
// --------------------------------------------------
int rReg16(uint8_t a) {
    // Write register address, then read 2 bytes with repeated start
    i2c1Wire.beginTransmission(0x69);
    i2c1Wire.write(a);
    i2c1Wire.endTransmission(false); // Repeated start

    i2c1Wire.requestFrom(0x69, (uint8_t)2);

    b1[0] = i2c1Wire.read(); // Low byte
    b1[1] = i2c1Wire.read(); // High byte

    int l = b1[0];
    int h = b1[1];
    int v = (h << 8) | l;

    return v;
}

// --------------------------------------------------
// Read pixel temperature
// --------------------------------------------------
float PixTemp(int p) {
    // Temperature registers are numbered 128–255
    // Each pixel has a lower and higher register
    uint8_t a = 0x80 + (2 * p);

    int v = rReg16(a);

    // Handle signed 11-bit value
    if ((v & (1 << 11)) > 0) {
        v = ~v;
        v = v + 1;
        v = v & 0x7FF;
        v = -v;
    }

    return v * 0.25f;
}

// --------------------------------------------------
// Arduino standard entry points
// --------------------------------------------------
void setup() {
    debugSerial.begin(9600);
    Init();
}

void loop() {
    float v = PixTemp(0);
    debugSerial.print("value: ");
    debugSerial.println(v);

    delay(100); // 10 FPS default
}
