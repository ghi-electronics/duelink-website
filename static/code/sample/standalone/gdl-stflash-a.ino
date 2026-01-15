// In this sample:
// Erase sector 0
// Write "Test me" at address 0
// Read and display data from address 0; it is expected to be "Test me"

#include <Arduino.h>
#include <SPI.h>
#include <SoftwareSerial.h> 

#define STATLED_PIN 0
#define BUTTON_PIN 5
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial softwareSerial(PA2, PA3); 

// Custom SPI instance (as required)
SPIClass mySPI(SPI1_BASE);

// Pin mapping (use getpin as requested)
#define PIN_CS  getpin(16)
#define PIN_WP  getpin(15)
#define PIN_RS  getpin(19)

// Forward declarations
uint8_t SfWr8(uint8_t b);
void SfInit();
void SfGetId(uint8_t *b9);
uint8_t SfIsBusy();
void SfWait();
void SfErase(uint32_t a);
void SfRead(uint32_t a, uint8_t *b9, uint32_t len);
void SfWrite(uint32_t a, const uint8_t *b9, uint32_t len);

/// Write one byte over SPI and return the received byte
uint8_t SfWr8(uint8_t b) {
    digitalWrite(PIN_CS, LOW);
    uint8_t r = mySPI.transfer(b);
    digitalWrite(PIN_CS, HIGH);
    return r;
}


void SfInit() {
    pinMode(PIN_CS, OUTPUT);
    pinMode(PIN_WP, OUTPUT);
    pinMode(PIN_RS, OUTPUT);

    digitalWrite(PIN_CS, HIGH);
    digitalWrite(PIN_WP, HIGH);
    digitalWrite(PIN_RS, LOW);
    delay(10);
    digitalWrite(PIN_RS, HIGH);

    // SPI configuration (8000 kHz)
    mySPI.begin();
    mySPI.setMISO(PB4);
    mySPI.setMOSI(PB5);
    mySPI.setSCLK(PB3);
    mySPI.setBitOrder(MSBFIRST);
    mySPI.beginTransaction(SPISettings(8000000, MSBFIRST, SPI_MODE0));
}


void SfGetId(uint8_t *b9) {
    digitalWrite(PIN_CS, LOW);
    mySPI.transfer(0x9F);
    for (int i = 0; i < 3; i++) {
        b9[i] = mySPI.transfer(0x00);
    }
    digitalWrite(PIN_CS, HIGH);
}


uint8_t SfIsBusy() {
    digitalWrite(PIN_CS, LOW);
    mySPI.transfer(0x05);
    uint8_t r = mySPI.transfer(0x00);
    digitalWrite(PIN_CS, HIGH);
    return r & 0x01;
}


void SfWait() {
    while (SfIsBusy()) {
        delay(1);
    }
}


void SfErase(uint32_t a) {
    SfWait();
    SfWr8(0x06); // Write Enable
    SfWait();

    digitalWrite(PIN_CS, LOW);
    mySPI.transfer(0x20); // Sector Erase (4 KB)
    mySPI.transfer((a >> 16) & 0xFF);
    mySPI.transfer((a >> 8) & 0xFF);
    mySPI.transfer((a >> 0) & 0xFF);
    digitalWrite(PIN_CS, HIGH);

    SfWait();
    SfWr8(0x04); // Write Disable
}


void SfRead(uint32_t a, uint8_t *b9, uint32_t len) {
    SfWait();

    digitalWrite(PIN_CS, LOW);
    mySPI.transfer(0x03); // Read command
    mySPI.transfer((a >> 16) & 0xFF);
    mySPI.transfer((a >> 8) & 0xFF);
    mySPI.transfer((a >> 0) & 0xFF);

    for (uint32_t i = 0; i < len; i++) {
        b9[i] = mySPI.transfer(0x00);
    }
    digitalWrite(PIN_CS, HIGH);
}


void SfWrite(uint32_t a, const uint8_t *b9, uint32_t len) {
    SfWait();
    SfWr8(0x06); // Write Enable

    uint32_t c = len;
    uint32_t o = 0;

    while (c > 0) {
        digitalWrite(PIN_CS, LOW);
        mySPI.transfer(0x02); // Page Program
        mySPI.transfer((a >> 16) & 0xFF);
        mySPI.transfer((a >> 8) & 0xFF);
        mySPI.transfer((a >> 0) & 0xFF);

        uint32_t n = (c > 256) ? 256 : c;
        for (uint32_t i = 0; i < n; i++) {
            mySPI.transfer(b9[o + i]);
        }

        digitalWrite(PIN_CS, HIGH);
        SfWait();

        o += n;
        c -= n;
        a += 256;
    }

    SfWr8(0x04); // Write Disable
}

// ====================
// Arduino Entry Points
// ====================

void setup() {
    softwareSerial.begin(9600);
    SfInit();

    // Erase a block at address 0
    SfErase(0);

    // Write a few bytes starting at address 0
    softwareSerial.println("Writing");
    SfWrite(0, (const uint8_t *)"Test", 4);
    SfWrite(4, (const uint8_t *)" me", 3);

    // Read back those 7 bytes
    softwareSerial.println("Reading");
    uint8_t b1[7];
    SfRead(0, b1, 7);
    softwareSerial.write(b1, 7);
    softwareSerial.println();
}


void loop() {
    // Nothing to do
}
