// In this sample:
// Initialize the software serial at 9600 on to display values
// Read temperature, humidity

#include <SoftwareSerial.h> 
#include <Wire.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// SoftwareSerial for debugging
SoftwareSerial softwareSerial(PA2, PA3); 

// Custom I2C on pins 16=SDA, 15=SCL
TwoWire i2c1Wire(getpin(16), getpin(15));

// I2C addresses
#define AHT21_ADDR 0x38
//#define ENS160_ADDR 0x52

///////////////////////////
// AHT21 Functions
///////////////////////////
uint8_t AhtSts() {
    i2c1Wire.beginTransmission(AHT21_ADDR);
    i2c1Wire.endTransmission();
    uint8_t val = 0;
    i2c1Wire.requestFrom(AHT21_ADDR, 1);
    if (i2c1Wire.available()) val = i2c1Wire.read();
    return val;
}

bool AhtInit() {
    delay(20);

    i2c1Wire.beginTransmission(AHT21_ADDR);
    i2c1Wire.write(0xBA);
    i2c1Wire.endTransmission();
    delay(20);

    while (AhtSts() & 0x80) delay(20);

    if (!(AhtSts() & 0x08)) return false;

    return true;
}

float AhtTemp() {
    i2c1Wire.beginTransmission(AHT21_ADDR);
    i2c1Wire.write(0xAC);
    i2c1Wire.write(0x33);
    i2c1Wire.write(0x00);
    i2c1Wire.endTransmission();

    while (AhtSts() & 0x80) delay(20);

    uint8_t b[6];
    i2c1Wire.requestFrom(AHT21_ADDR, 6);
    for (int i = 0; i < 6; i++) {
        if (i2c1Wire.available()) b[i] = i2c1Wire.read();
    }

    uint32_t t = ((b[3] & 0x0F) << 16) | (b[4] << 8) | b[5];
    return (t * 200.0 / 0x100000) - 50.0;
}

float AhtHumid() {
    i2c1Wire.beginTransmission(AHT21_ADDR);
    i2c1Wire.write(0xAC);
    i2c1Wire.write(0x33);
    i2c1Wire.write(0x00);
    i2c1Wire.endTransmission();

    while (AhtSts() & 0x80) delay(20);

    uint8_t b[6];
    i2c1Wire.requestFrom(AHT21_ADDR, 6);
    for (int i = 0; i < 6; i++) {
        if (i2c1Wire.available()) b[i] = i2c1Wire.read();
    }

    uint32_t h = (b[1] << 12) | (b[2] << 4) | (b[3] >> 4);
    return (h * 100.0) / 0x100000;
}


///////////////////////////
// Init
///////////////////////////
void Init() {
    i2c1Wire.begin();
    i2c1Wire.setClock(400000); // 400 kHz

    AhtInit();
}

///////////////////////////
// Main
///////////////////////////
void setup() {
    softwareSerial.begin(9600);
    softwareSerial.print("Debug OK: ");
    Init();

    softwareSerial.print("Init OK: ");
}

void loop() {
    softwareSerial.print("temp: ");
    softwareSerial.print(AhtTemp());
    softwareSerial.print("C - humidity: ");
    softwareSerial.print(AhtHumid());
    softwareSerial.println("%");


    delay(2000);
}