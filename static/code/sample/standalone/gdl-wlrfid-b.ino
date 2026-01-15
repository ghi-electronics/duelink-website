// In this sample:
// Detect and display the RFID card number when the card is close enough

#include <Arduino.h>
#include <SoftwareSerial.h> 
#include <SPI.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial softwareSerial(PA2, PA3); 
// Alias pins (user implements getpin())
#define rst getpin(3)   // Reset pin
#define cs  getpin(5)   // SPI chip select

uint32_t _z = 0; // bit leng of data, max 8bit x 16 byte

// Redefined SPI with custom pins
SPIClass mySPI(SPI1_BASE);

/* ===================== Initialization ===================== */

void Init() {
    // SPI config: mode 0, 8 MHz
    mySPI.setMISO(PB4);
    mySPI.setMOSI(PB5);
    mySPI.setSCLK(PB3);
    mySPI.setBitOrder(MSBFIRST);
    mySPI.begin();

    pinMode(rst, OUTPUT);
    pinMode(cs, OUTPUT);

    digitalWrite(rst, HIGH);
    digitalWrite(cs, HIGH);

    RstReg();

    WriteReg(0x2A, 0x8D); // TModeReg
    WriteReg(0x2B, 0x3E); // TPrescalerReg
    WriteReg(0x2D, 30);   // TReloadRegL
    WriteReg(0x2C, 0);    // TReloadRegH
    WriteReg(0x15, 0x40); // TxAutoReg
    WriteReg(0x11, 0x3D); // ModeReg

    AntenOn();
}

/* ===================== Low-Level Register Access ===================== */

void RstReg() {
    WriteReg(0x01, 0x0F); // CommandReg, PCD_RESETPHASE
}

void WriteReg(uint8_t r, uint8_t v) {
    digitalWrite(cs, LOW);

    mySPI.transfer((r << 1) & 0x7E);
    mySPI.transfer(v);

    digitalWrite(cs, HIGH);
}

uint8_t ReadReg(uint8_t r) {
    uint8_t val;

    digitalWrite(cs, LOW);

    mySPI.transfer(((r << 1) & 0x7E) | 0x80);
    val = mySPI.transfer(0x00);

    digitalWrite(cs, HIGH);
    return val;
}

void SetBitM(uint8_t r, uint8_t m) {
    uint8_t t = ReadReg(r);
    WriteReg(r, (t | m) & 0xFF);
}

void ClrBitM(uint8_t r, uint8_t m) {
    uint8_t t = ReadReg(r);
    WriteReg(r, (t & (~m)) & 0xFF);
}

/* ===================== Antenna Control ===================== */

void AntenOn() {
    uint8_t t = ReadReg(0x14); // TxControlReg
    if (!(t & 0x03)) {
        SetBitM(0x14, 0x03);
    }
}

void AntenOff() {
    uint8_t t = ReadReg(0x14); // TxControlReg
    if (t & 0x03) {
        ClrBitM(0x14, 0x03);
    }
}

/* ===================== CRC ===================== */

void Crc(uint8_t *b1, uint8_t l, uint8_t *b2) {
    ClrBitM(0x05, 0x04); // DivIrqReg
    SetBitM(0x0A, 0x80); // FIFOLevelReg

    for (uint8_t i = 0; i < l; i++) {
        WriteReg(0x09, b1[i]); // FIFODataReg
    }

    WriteReg(0x01, 0x03); // PCD_CALCCRC

    uint8_t i = 0xFF;
    uint8_t n = 0;

    while (i && !(n & 0x04)) {
        n = ReadReg(0x05);
        i--;
    }

    b2[0] = ReadReg(0x22); // CRCResultRegL
    b2[1] = ReadReg(0x21); // CRCResultRegM
}

/* ===================== Card Communication ===================== */

uint8_t toCard(uint8_t c, uint8_t *b1, uint8_t s, uint8_t *backData, uint32_t &bits) {
    uint8_t e = 2;
    uint8_t q = 0;
    uint8_t w = 0;
    uint8_t l = 0;
    uint8_t n = 0;

    if (c == 0x0E) {
        q = 0x12;
        w = 0x10;
    }

    if (c == 0x0C) {
        q = 0x77;
        w = 0x30;
    }

    WriteReg(0x02, q | 0x80);
    ClrBitM(0x04, 0x80);
    SetBitM(0x0A, 0x80);
    WriteReg(0x01, 0x00);

    for (uint8_t i = 0; i < s; i++) {
        WriteReg(0x09, b1[i]);
    }

    WriteReg(0x01, c);

    if (c == 0x0C) {
        SetBitM(0x0D, 0x80);
    }

    uint16_t i = 2000;
    while (i && !(n & 0x01) && !(n & w)) {
        n = ReadReg(0x04);
        i--;
    }

    ClrBitM(0x0D, 0x80);

    if (i && !(ReadReg(0x06) & 0x1B)) {
        e = 0;
        if (c == 0x0C) {
            n = ReadReg(0x0A);
            l = ReadReg(0x0C) & 0x07;

            bits = (l) ? ((n - 1) * 8 + l) : (n * 8);
            if (n == 0) n = 1;
            if (n > 16) n = 16;

            for (uint8_t i = 0; i < n; i++) {
                backData[i] = ReadReg(0x09);
            }
        }
    }

    return e;
}

/* ===================== High-Level Functions ===================== */

uint8_t Request(uint8_t m, uint8_t *b1) {
    WriteReg(0x0D, 0x07);
    b1[0] = m;
    uint8_t s = toCard(0x0C, b1, 1, b1, _z);
    return (s == 0) ? 0 : 2;
}

uint8_t ReadCard(uint8_t *b1) {
    WriteReg(0x0D, 0x00);

    b1[0] = 0x93;
    b1[1] = 0x20;

    uint8_t s = toCard(0x0C, b1, 2, b1, _z);
    if (s == 0) {
        uint8_t k = 0;
        for (uint8_t i = 0; i < 4; i++) {
            k ^= b1[i];
        }
        if (k != b1[4]) return 2;
    }
    return s;
}

uint8_t isCard() {
    uint8_t b1[16];
    return (Request(0x26, b1) == 0) ? 1 : 0;
}

/* ===================== Arduino Loop ===================== */

void setup() {
    softwareSerial.begin(9600);
    Init();
}

void loop() {
    uint8_t b1[16];

    if (isCard()) {
        softwareSerial.println("Card detected:");

        if (ReadCard(b1) == 0) {
            softwareSerial.println("Number received:");
            for (uint8_t i = 0; i < _z / 8; i++) {
                softwareSerial.print(" ");
                softwareSerial.print(b1[i], HEX);
            }
            softwareSerial.println();
        } else {
            softwareSerial.println("Failed to read");
        }
    } else {
        softwareSerial.println("No card found");
    }

    delay(1000);
}
