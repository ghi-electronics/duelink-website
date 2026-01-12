// In this sample:
// when received a CAN message, DUELink will write back a message [0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88]
// CAN baudrate: 500kps

#include <SPI.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// SPI (custom pins)
SPIClass mySPI(SPI1_BASE);

// ----------- CAN DRIVER ------------
uint8_t RdReg(uint8_t r) {
    digitalWrite(getpin(15), LOW);

    mySPI.transfer(3);
    mySPI.transfer(r);
    r = mySPI.transfer(0);

    digitalWrite(getpin(15), HIGH);
    return r;
}

void RdRegs(uint8_t r, uint8_t *b5, int o, int l) {
    digitalWrite(getpin(15), LOW);

    mySPI.transfer(3);
    mySPI.transfer(r);

    for (int i = o; i <= (l + o); i++) {
        b5[i] = mySPI.transfer(0);
    }

    digitalWrite(getpin(15), HIGH);
}

void ModReg(uint8_t r, uint8_t m, uint8_t d) {
    digitalWrite(getpin(15), LOW);

    mySPI.transfer(5);
    mySPI.transfer(r);
    mySPI.transfer(m);
    mySPI.transfer(d);

    digitalWrite(getpin(15), HIGH);
}

void SetMode(uint8_t m) {
    ModReg(0x0F, 0xE0, m);
    ModReg(0x0F, 0x08, 0x08);

    while (1) {
        if (RdReg(0x0E) == m) {
            return;
        }
        delay(1000);
    }
}

void SetReg(uint8_t r, uint8_t v) {
    digitalWrite(getpin(15), LOW);
    mySPI.transfer(0x02);
    mySPI.transfer(r);
    mySPI.transfer(v);
    digitalWrite(getpin(15), HIGH);
}

void SetRegs(uint8_t r, uint8_t *b2, int n) {
    digitalWrite(getpin(15), LOW);

    mySPI.transfer(0x02);
    mySPI.transfer(r);

    for (int i = 0; i < n; i++) {
        mySPI.transfer(b2[i]);
    }

    digitalWrite(getpin(15), HIGH);
}

void SetBitrate(uint32_t b) {
    SetMode(0x80);

    if (b == 125000) {
        SetReg(0x2A, 0x01);
        SetReg(0x29, 0xB1);
        SetReg(0x28, 0x85);
    }

    if (b == 250000) {
        SetReg(0x2A, 0x00);
        SetReg(0x29, 0xB1);
        SetReg(0x28, 0x85);
    }

    if (b == 500000) {
        SetReg(0x2A, 0x00);
        SetReg(0x29, 0x90);
        SetReg(0x28, 0x82);
    }

    if (b == 1000000) {
        SetReg(0x2A, 0x00);
        SetReg(0x29, 0x80);
        SetReg(0x28, 0x50);
    }
}

uint8_t getStat() {
    digitalWrite(getpin(15), LOW);
    mySPI.transfer(0xA0);
    uint8_t r = mySPI.transfer(0);
    digitalWrite(getpin(15), HIGH);
    return r;
}

bool TxFree() {
    uint8_t r = RdReg(0x30);
    return !(r & 0x08);
}

int TxReq(uint32_t i, uint8_t l, uint8_t *b4) {
    if (!TxFree()) return 0;
    if (l > 8) return -1;

    uint8_t b2[13];

    uint32_t c = i & 0x0FFFF;
    b2[3] = c & 0xFF;
    b2[2] = (c >> 8);

    c = (i >> 16);
    b2[1] = (c & 0x03);
    b2[1] += ((c & 0x1C) << 3);
    b2[0] = (c >> 5);

    b2[4] = l;
    memcpy(&b2[5], b4, l);

    SetRegs(0x31, b2, 5 + l);

    digitalWrite(getpin(15), LOW);
    mySPI.transfer(0x81);
    digitalWrite(getpin(15), HIGH);

    uint8_t r = RdReg(0x30);

    if (r & (0x40 | 0x20 | 0x10)) return -2;
    if (r & 0x08) return -3;

    return 1;
}

int32_t RxRd(uint8_t *b6) {
    uint8_t r = getStat();
    if (!(r & 0x01)) return -1;

    uint8_t b7[13];
    RdRegs(0x61, b7, 0, 5);

    uint32_t d = (b7[0] << 3) + (b7[1] >> 5);

    uint8_t l = b7[4] & 0x0F;
    if (l == 0) return d;

    uint8_t c = RdReg(0x60);
    if (c & 0x08) d |= 0x40000000;

    RdRegs(0x66, b7, 5, l);

    b6[0] = l;
    memcpy(&b6[1], &b7[5], l);

    ModReg(0x2C, 0x01, 0);
    return d;
}

bool RxFull() {
    uint8_t v = RdReg(0x2C);
    return (v & 0x01);
}

void Init() {
    pinMode(getpin(15), OUTPUT);
    digitalWrite(getpin(15), HIGH);

    mySPI.begin();
    mySPI.setMISO(PB4);
    mySPI.setMOSI(PB5);
    mySPI.setSCLK(PB3);
    mySPI.setBitOrder(MSBFIRST);

    digitalWrite(getpin(15), LOW);
    mySPI.transfer(0xC0);
    digitalWrite(getpin(15), HIGH);

    delay(10);

    SetBitrate(500000);

    ModReg(0x2B, 1, 1);
    SetReg(0x60, 0x60);
    SetReg(0x70, 0x60);

    SetMode(0);
}

// ----------- SAMPLE LOOP ------------

uint32_t _c = 0;
uint8_t b1[9] = {0};

void setup() {    
    Init();
}

void loop() {

    if (RxRd(b1) >= 0) {
        
        uint8_t b3[8] = {0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88};
        
        TxReq(_c, 8, b3);

        _c++;
    }

    delay(100);
}