// In this sample:
// Initialize the software serial at 9600 to display values
// Read X, Y, and Z, then send them via software serial

#include <SoftwareSerial.h> 
#include <Wire.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// I2C address of MC3216
#define ACCEL_ADDR 0x4C

SoftwareSerial softwareSerial(PA2, PA3); 
TwoWire i2c1Wire(getpin(16), getpin(15)); 

// ----------------------------
// Convert function
// ----------------------------
int Convert(int8_t c) {
    if (c > 127) {
        c = c - 256;
    }

    int val = c * 1024 / 64;

    if (val > 1024) val = 1024;
    if (val < -1024) val = -1024;

    return val;
}

// ----------------------------
// Initialize accelerometer
// ----------------------------
void Init() {
    softwareSerial.begin(9600);

    i2c1Wire.begin(PB6, PB7); // start I2C
    i2c1Wire.setClock(400000); // 400 kHz 

    // Write 0x20,2 to register 0x4C (MC3216_Outcfg)
    i2c1Wire.beginTransmission(ACCEL_ADDR);
    i2c1Wire.write(0x20);
    i2c1Wire.write(2);
    i2c1Wire.endTransmission();

    // Write 0x07,1 to register 0x4C (MC3216_Mode)
    i2c1Wire.beginTransmission(ACCEL_ADDR);
    i2c1Wire.write(0x07);
    i2c1Wire.write(1);
    i2c1Wire.endTransmission();
}

// ----------------------------
// Read one register from accelerometer
// ----------------------------
uint8_t ReadReg(uint8_t reg) {
    i2c1Wire.beginTransmission(ACCEL_ADDR);
    i2c1Wire.write(reg);
    i2c1Wire.endTransmission(false); // send repeated start

    i2c1Wire.requestFrom(ACCEL_ADDR, 1);
    if (i2c1Wire.available()) {
        return i2c1Wire.read();
    }
    return 0;
}

// ----------------------------
// Get X, Y, Z
// ----------------------------
int GetX() {
    b1 = ReadReg(0x0D); // MC3216_XOut
    return Convert((int8_t)b1);
}

int GetY() {
    b1 = ReadReg(0x0F); // MC3216_YOut
    return Convert((int8_t)b1);
}

int GetZ() {
    b1 = ReadReg(0x11); // MC3216_ZOut
    return Convert((int8_t)b1);
}

// ----------------------------
// Arduino setup
// ----------------------------
void setup() {
    Init();
}

// ----------------------------
// Arduino loop
// ----------------------------
void loop() {
    int x = GetX();
    int y = GetY();
    int z = GetZ();

    softwareSerial.print("X = "); softwareSerial.print(x);
    softwareSerial.print(", Y = "); softwareSerial.print(y);
    softwareSerial.print(", Z = "); softwareSerial.println(z);

    delay(1000); 
}
