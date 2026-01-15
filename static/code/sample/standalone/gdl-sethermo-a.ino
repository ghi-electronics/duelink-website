// In this sample:
// Read temperarure every 1.5 second and send to software serial

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

uint16_t ReadReg() {
    uint8_t b1[2] = {0, 0};
    uint16_t v = 0;

    digitalWrite(getpin(4), LOW);   // dwrite(4,0)

    delayMicroseconds(1);           // WaitUs(1)

    // SpiWrs([0,0], b1)
    b1[0] = mySPI.transfer(0x00);
    b1[1] = mySPI.transfer(0x00);

    digitalWrite(getpin(4), HIGH);  // dwrite(4,1)

    v = ((uint16_t)b1[0] << 8) | b1[1];

    return v;
}

float ReadTemp() {
    uint16_t v = ReadReg();
    v = v >> 3;
    float t = v * 0.25f;
    return t;
}

uint8_t IsConnect() {
    uint16_t v = ReadReg();

    if (v & 0x04) {
        return 0;
    } else {
        return 1;
    }
}

// ====================
// Arduino Entry Points
// ====================

void setup() {
    softwareSerial.begin(9600);

    // Chip Select pin
    pinMode(getpin(4), OUTPUT);
    digitalWrite(getpin(4), HIGH);

    // SPI pin remap
    mySPI.setMISO(PB4);
    mySPI.setMOSI(PB5);
    mySPI.setSCLK(PB3);
    mySPI.setBitOrder(MSBFIRST);
    mySPI.begin(); // PB3, PB4, PB5

    mySPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0));

}


void loop() {
    softwareSerial.print("Temp: ");
    softwareSerial.println(ReadTemp());
    delay(1500); // Wait(1500)
}
