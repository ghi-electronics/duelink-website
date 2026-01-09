// In this sample:
//Continuously set the stepper motor to 200 steps, alternating the direction between forward and backward

#define SW_SERIAL_DBG 0 // optional: this will use PA2, PA3 as software serial for debug runtime value

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

/* ===== Alias definitions ===== */
#define s1_8   0
#define s1_2   1
#define s1_4   2
#define s1_16  3

/* ===== Global array ===== */
uint8_t a9[6];

/* ===== Initialize stepper controllers ===== */
/* s - speed */
void init(uint8_t s) {
    digitalWrite(getpin(7), HIGH);   // M1, M2, M3 Disable (high)

    digitalWrite(getpin(17), s & 1);
    digitalWrite(getpin(8),  s & 2);

    digitalWrite(getpin(6), HIGH);   // M1 RST
    digitalWrite(getpin(13), HIGH);  // M2 RST
    digitalWrite(getpin(19), HIGH);  // M3 RST

    digitalWrite(getpin(7), LOW);    // M1, M2, M3 Enable (low)
}

/* ===== Step motor 1 ===== */
/* d - direction, c - steps */
void step_m1(uint8_t d, uint16_t c) {
    digitalWrite(getpin(4), d);
    while (c > 0) {
        digitalWrite(getpin(5), HIGH);
        delay(1);
        digitalWrite(getpin(5), LOW);
        delay(1);
        c--;
    }
}

/* ===== Step motor 2 ===== */
void step_m2(uint8_t d, uint16_t c) {
    digitalWrite(getpin(12), d);
    while (c > 0) {
        digitalWrite(getpin(14), HIGH);
        delay(1);
        digitalWrite(getpin(14), LOW);
        delay(1);
        c--;
    }
}

/* ===== Step motor 3 ===== */
void step_m3(uint8_t d, uint16_t c) {
    digitalWrite(getpin(2), d);
    while (c > 0) {
        digitalWrite(getpin(1), HIGH);
        delay(1);
        digitalWrite(getpin(1), LOW);
        delay(1);
        c--;
    }
}

/* ===== Set motor parameters ===== */
void set_m(uint8_t m, uint8_t d, uint16_t c) {
    m = m - 1;
    a9[(m << 1)]     = d;
    a9[(m << 1) + 1] = c;
}

/* ===== Run all motors independently ===== */
void run_all() {
    uint16_t a = a9[1];
    uint16_t b = a9[3];
    uint16_t c = a9[5];

    digitalWrite(getpin(4),  a9[0]);
    digitalWrite(getpin(12), a9[2]);
    digitalWrite(getpin(2),  a9[4]);

    while (a || b || c) {
        if (a) {
            digitalWrite(getpin(5), HIGH);
            a--;
        }
        if (b) {
            digitalWrite(getpin(14), HIGH);
            b--;
        }
        if (c) {
            digitalWrite(getpin(1), HIGH);
            c--;
        }
        delay(1);
        digitalWrite(getpin(5), LOW);
        digitalWrite(getpin(14), LOW);
        digitalWrite(getpin(1), LOW);
        delay(1);
    }
}

/* ===== Run all motors synchronized ===== */
void sync_all() {
    uint16_t a = a9[1];
    uint16_t b = a9[3];
    uint16_t c = a9[5];

    digitalWrite(getpin(4),  a9[0]);
    digitalWrite(getpin(12), a9[2]);
    digitalWrite(getpin(2),  a9[4]);

    uint16_t m = a;
    if (b > m) m = b;
    if (c > m) m = c;

    if (m == 0) return;

    float d = (float)a / m;
    float e = (float)b / m;
    float f = (float)c / m;

    float g = 0, h = 0, i = 0;

    for (uint16_t t = 1; t <= m; t++) {
        g += d;
        if (g >= 1 && a > 0) {
            g -= 1;
            a--;
            digitalWrite(getpin(5), HIGH);
        }

        h += e;
        if (h >= 1 && b > 0) {
            h -= 1;
            b--;
            digitalWrite(getpin(14), HIGH);
        }

        i += f;
        if (i >= 1 && c > 0) {
            i -= 1;
            c--;
            digitalWrite(getpin(1), HIGH);
        }

        delay(1);
        digitalWrite(getpin(5), LOW);
        digitalWrite(getpin(14), LOW);
        digitalWrite(getpin(1), LOW);
        delay(1);
    }
}

/* ===== Arduino standard entry points ===== */
void setup() {
#if SW_SERIAL_DBG  
    softwareSerial.begin(9600);
#endif
    pinMode(getpin(1), OUTPUT);
    pinMode(getpin(2), OUTPUT);

    pinMode(getpin(4), OUTPUT); 
    pinMode(getpin(5), OUTPUT); 
    pinMode(getpin(6), OUTPUT); 
    pinMode(getpin(7), OUTPUT); 
    pinMode(getpin(8), OUTPUT); 

    pinMode(getpin(12), OUTPUT); 
    pinMode(getpin(13), OUTPUT); 
    pinMode(getpin(14), OUTPUT); 

    pinMode(getpin(17), OUTPUT); 
    pinMode(getpin(19), OUTPUT); 


    init(s1_2);   // Init motors to half steps
}

void loop() {
    step_m1(0, 200);
    delay(1000);
    step_m1(1, 200);
    delay(1000);
}