// In this sample:
// Set local date/time and read every second.

#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

#define SW_SERIAL_DBG 1 // this will use PA2, PA3 as software serial for debug runtime value

#if SW_SERIAL_DBG
#include <SoftwareSerial.h> 
SoftwareSerial softwareSerial(PA2, PA3);
#endif
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}


uint8_t b1[8];
uint8_t b2[1];

TwoWire i2c1Wire(getpin(16), getpin(15));

void I2cCfg(uint32_t khz) {
    i2c1Wire.begin();
    i2c1Wire.setClock(khz * 1000);
}

// I2cWr = I2C write/read with repeat-start support
void I2cWr(uint8_t address, const uint8_t* arrayWrite, uint8_t writeLen,
           uint8_t* arrayRead, uint8_t readLen) {

    if (arrayWrite != nullptr && writeLen > 0) {
        i2c1Wire.beginTransmission(address);
        for (uint8_t i = 0; i < writeLen; i++) {
            i2c1Wire.write(arrayWrite[i]);
        }

        // If read follows, send RESTART instead of STOP
        if (arrayRead != nullptr && readLen > 0) {
            i2c1Wire.endTransmission(false);
        } else {
            i2c1Wire.endTransmission(true);
        }
    }

    if (arrayRead != nullptr && readLen > 0) {
        i2c1Wire.requestFrom(address, readLen);
        for (uint8_t i = 0; i < readLen && i2c1Wire.available(); i++) {
            arrayRead[i] = i2c1Wire.read();
        }
    }
}

// -----------------------
// Functions
// -----------------------
uint8_t toBCD(uint8_t v) {
    return ((v / 10) << 4) | (v % 10);
}

uint8_t toDEC(uint8_t v) {
    uint8_t l = v & 0x0F;
    v = (v >> 4) * 10;
    v = v + l;
    return v;
}

void SetTime(uint16_t y, uint8_t n, uint8_t d,
             uint8_t h, uint8_t m, uint8_t s) {

    b1[0] = 0x11;             // Start register
    b1[1] = toBCD(s);         // seconds
    b1[2] = toBCD(m);         // minutes
    b1[3] = toBCD(h);         // hours
    b1[4] = 4;                // weekday (only one bit set)
    b1[5] = toBCD(d);         // day
    b1[6] = toBCD(n);         // month
    b1[7] = toBCD(y - 2000);  // year

    // Write time
    I2cWr(0x32, b1, 8, nullptr, 0);

    // Read control register 0x1F
    uint8_t cmd = 0x1F;
    I2cWr(0x32, &cmd, 1, b2, 1);

    // Clear STOP bit
    b2[0] &= 0xFE;

    uint8_t writeBuf[2] = { 0x1F, b2[0] };
    I2cWr(0x32, writeBuf, 2, nullptr, 0);
}

void ReadTime() {
    uint8_t cmd = 0x00;

    // Read time registers
    I2cWr(0x32, &cmd, 1, b1, 7);

    uint8_t _s = toDEC(b1[0]);
    uint8_t _m = toDEC(b1[1]);
    uint8_t _h = toDEC(b1[2]);
    // uint8_t _w = toDEC(b1[3]);
    uint8_t _d = toDEC(b1[4]);
    uint8_t _n = toDEC(b1[5]);
    uint16_t _y = toDEC(b1[6]) + 2000;
#if SW_SERIAL_DBG
    // Example output
    softwareSerial.print("Time: ");
    softwareSerial.print(_y); softwareSerial.print("-");
    softwareSerial.print(_n); softwareSerial.print("-");
    softwareSerial.print(_d); softwareSerial.print(" ");
    softwareSerial.print(_h); softwareSerial.print(":");
    softwareSerial.print(_m); softwareSerial.print(":");
    softwareSerial.println(_s);
#endif    
}

void setup() {
#if SW_SERIAL_DBG  
  softwareSerial.begin(9600);
#endif

  I2cCfg(400); // 400 KHz
}

void loop() {
  ReadTime();
  delay(1000);
}