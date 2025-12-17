
// In this sample:
// Read X,Y,Z and Temperature on DOF9

#include <Wire.h>
#include <SoftwareSerial.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// Custom software serial for debug - optional
SoftwareSerial softwareSerial(PA2, PA3);

// Custom I2C on pins SDA=16, SCL=15
TwoWire i2c1Wire(getpin(16), getpin(15));

// Sensor I2C addresses
#define ADXL345 0x53
#define HMC5883L 0x1E
#define QMC5883L 0x0D
#define ITG3200 0x68

int _h = 1; // default compass HMC5883L
int16_t _x, _y, _z;
int16_t _t;

uint8_t b6[6];
uint8_t b2[8];
uint8_t b3[1];

void wait(int ms) {
    delay(ms);
}

// I2C write/read function
// arrayWrite == nullptr -> read only
// arrayRead == nullptr -> write only
// both not null -> write then repeated-start read
int I2cWr(uint8_t addr, uint8_t* arrayWrite, uint8_t writeLen, uint8_t* arrayRead = nullptr, uint8_t readLen = 0) {
    if (arrayWrite && !arrayRead) {
        i2c1Wire.beginTransmission(addr);
        for (uint8_t i = 0; i < writeLen; i++) i2c1Wire.write(arrayWrite[i]);
        return i2c1Wire.endTransmission();
    } else if (!arrayWrite && arrayRead) {
        uint8_t received = i2c1Wire.requestFrom(addr, readLen);
        for (uint8_t i = 0; i < received; i++) arrayRead[i] = i2c1Wire.read();
        return received;
    } else if (arrayWrite && arrayRead) {
        // Write + repeated start + read
        i2c1Wire.beginTransmission(addr);
        for (uint8_t i = 0; i < writeLen; i++) i2c1Wire.write(arrayWrite[i]);
        if (i2c1Wire.endTransmission(false) != 0) return 0; // false = repeated start
        uint8_t received = i2c1Wire.requestFrom(addr, readLen);
        for (uint8_t i = 0; i < received; i++) arrayRead[i] = i2c1Wire.read();
        return received;
    }
    return 0;
}

// Convert high/low bytes to signed int
int16_t Convert(uint8_t u, uint8_t l) {
    int16_t v = (u << 8) | l;
    if (v > 32768) v = -((65536 - v));
    return v;
}

// Initialize sensors
void Init() {
    i2c1Wire.begin();
    i2c1Wire.setClock(100000); // 100 kHz

    // ADXL345
    uint8_t b1[2] = {0x31, 0x01};
    I2cWr(ADXL345, b1, 2);
    uint8_t b1b[2] = {0x2D, 0x08};
    I2cWr(ADXL345, b1b, 2);

    // HMC5883L Compass
    uint8_t comp_init[2] = {0x02, 0x00};
    _h = I2cWr(HMC5883L, comp_init, 2);

    if (_h != 0) { // switch to QMC5883L
        uint8_t q1[2] = {0x09, 0x1D};
        uint8_t q2[2] = {0x0A, 0x01};
        uint8_t q3[2] = {0x0B, 0x01};
        I2cWr(QMC5883L, q1, 2);
        I2cWr(QMC5883L, q2, 2);
        I2cWr(QMC5883L, q3, 2);
    }

    // ITG3200 Gyro
    uint8_t g1[2] = {0x03, 0x00};
    uint8_t g2[2] = {0x15, 0x07};
    uint8_t g3[2] = {0x16, 0x1E};
    uint8_t g4[2] = {0x17, 0x00};
    I2cWr(ITG3200, g1, 2);
    I2cWr(ITG3200, g2, 2);
    I2cWr(ITG3200, g3, 2);
    I2cWr(ITG3200, g4, 2);

    wait(10);
}

// Read accelerometer
void RAccel() {
    uint8_t reg = 0x32;
    I2cWr(ADXL345, &reg, 1);
    if (I2cWr(ADXL345, nullptr, 0, b6, 6) != 6) {
        softwareSerial.println("Init Accel failed");
        while (1);
    }
    _x = Convert(b6[1], b6[0]);
    _y = Convert(b6[3], b6[2]);
    _z = Convert(b6[5], b6[4]);
}

// Read compass
void RCompass() {
    if (_h==0) {
        uint8_t reg = 0x03;
        I2cWr(HMC5883L, &reg, 1);
        if (I2cWr(HMC5883L, nullptr, 0, b6, 6) != 6) {
            softwareSerial.println("Init compass failed");
            while (1);
        }
        _x = Convert(b6[0], b6[1]);
        _y = Convert(b6[2], b6[3]);
        _z = Convert(b6[4], b6[5]);
    } else {
        uint8_t reg = 0x06;
        I2cWr(QMC5883L, &reg, 1);
        I2cWr(QMC5883L, nullptr, 0, b3, 1);

        if (b3[0] & 1) {
            uint8_t reg0 = 0x00;
            I2cWr(QMC5883L, &reg0, 1);
            I2cWr(QMC5883L, nullptr, 0, b6, 6);
            _x = Convert(b6[1], b6[0]);
            _y = Convert(b6[3], b6[2]);
            _z = Convert(b6[5], b6[4]);
        } else {
            softwareSerial.println("Compass not ready");
        }
    }
}

// Read gyro
void RGyro() {
    uint8_t reg = 0x1B;
    I2cWr(ITG3200, &reg, 1);
    if (I2cWr(ITG3200, nullptr, 0, b2, 8) != 8) {
        softwareSerial.println("Init Gyro failed");
        while (1);
    }
    _x = Convert(b2[2], b2[3]);
    _y = Convert(b2[4], b2[5]);
    _z = Convert(b2[6], b2[7]);
    _t = Convert(b2[0], b2[1]);
    _t = 35 + (_t + 13200) / 280;
}

void setup() {
    softwareSerial.begin(9600);
    Init();
}

void loop() {
    softwareSerial.println("***********************");
    RAccel();
    softwareSerial.printf("Accel XYZ: %d %d %d\n", _x, _y, _z);
    wait(1000);

    RGyro();
    softwareSerial.printf("Gyro XYZT: %d %d %d %d\n", _x, _y, _z, _t);
    wait(1000);

    RCompass();
    softwareSerial.printf("Compass XYZ: %d %d %d\n", _x, _y, _z);
    wait(1000);
}