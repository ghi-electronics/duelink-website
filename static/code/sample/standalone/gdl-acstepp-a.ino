// In this sample:
// Tested on Bi-Polar Stepper Motor Driver-2M542
// Continuously move axes X, Y, and Z forward and backward for 400 steps, with a 10 ms delay per step.

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// ========================
// Global variables
// ========================
uint8_t a9[6];

// ========================
// Initialize stepper controllers
// ========================
void init_steppers() {
    pinMode(getpin(3), OUTPUT); // X pulse
    pinMode(getpin(5), OUTPUT); // Y pulse
    pinMode(getpin(9), OUTPUT); // Z pulse

    pinMode(getpin(4), OUTPUT); // X dir
    pinMode(getpin(6), OUTPUT); // Y dir
    pinMode(getpin(8), OUTPUT); // Z dir

    digitalWrite(getpin(3), LOW);
    digitalWrite(getpin(5), LOW);
    digitalWrite(getpin(9), LOW);

    digitalWrite(getpin(4), LOW);
    digitalWrite(getpin(6), LOW);
    digitalWrite(getpin(8), LOW);
}

// ========================
// Step motor Z
// ========================
void StepZ(int d, int c) {
    digitalWrite(getpin(8), d);
    while (c > 0) {
        digitalWrite(getpin(9), HIGH);
        delay(1);
        digitalWrite(getpin(9), LOW);
        delay(1);
        c--;
    }
}

// ========================
// Step motor Y
// ========================
void StepY(int d, int c) {
    digitalWrite(getpin(6), d);
    while (c > 0) {
        digitalWrite(getpin(5), HIGH);
        delay(1);
        digitalWrite(getpin(5), LOW);
        delay(1);
        c--;
    }
}

// ========================
// Step motor X
// ========================
void StepX(int d, int c) {
    digitalWrite(getpin(4), d);
    while (c > 0) {
        digitalWrite(getpin(3), HIGH);
        delay(1);
        digitalWrite(getpin(3), LOW);
        delay(1);
        c--;
    }
}

// ========================
// Set motor data
// ========================
void set_m(int m, int d, int c) {
    m = m - 1;
    a9[(m << 1)] = d;
    a9[(m << 1) + 1] = c;
}

// ========================
// Run all motors (unsynced)
// ========================
void run_all() {
    int a = a9[1];
    int b = a9[3];
    int c = a9[5];

    digitalWrite(getpin(9), a9[0]);
    digitalWrite(getpin(5), a9[2]);
    digitalWrite(getpin(3), a9[4]);

    while (a || b || c) {
        if (a) {
            digitalWrite(getpin(8), HIGH);
            a--;
        }
        if (b) {
            digitalWrite(getpin(6), HIGH);
            b--;
        }
        if (c) {
            digitalWrite(getpin(4), HIGH);
            c--;
        }

        delay(1);
        digitalWrite(getpin(8), LOW);
        digitalWrite(getpin(6), LOW);
        digitalWrite(getpin(4), LOW);
        delay(1);
    }
}

// ========================
// Run all motors synced
// ========================
void sync_all() {
    int a = a9[1];
    int b = a9[3];
    int c = a9[5];

    digitalWrite(getpin(9), a9[0]);
    digitalWrite(getpin(5), a9[2]);
    digitalWrite(getpin(3), a9[4]);

    int m = a;
    if (b > m) m = b;
    if (c > m) m = c;

    if (m == 0) return;

    float d = (float)a / m;
    float e = (float)b / m;
    float f = (float)c / m;

    float g = 0, h = 0, i = 0;

    for (int t = 1; t <= m; t++) {
        g += d;
        if (g >= 1 && a > 0) {
            g -= 1;
            a--;
            digitalWrite(getpin(8), HIGH);
        }

        h += e;
        if (h >= 1 && b > 0) {
            h -= 1;
            b--;
            digitalWrite(getpin(6), HIGH);
        }

        i += f;
        if (i >= 1 && c > 0) {
            i -= 1;
            c--;
            digitalWrite(getpin(4), HIGH);
        }

        delay(1);
        digitalWrite(getpin(8), LOW);
        digitalWrite(getpin(6), LOW);
        digitalWrite(getpin(4), LOW);
        delay(1);
    }
}

// ========================
// Set helpers
// ========================
void SetX(int d, int c) { set_m(3, d, c); }
void SetY(int d, int c) { set_m(2, d, c); }
void SetZ(int d, int c) { set_m(1, d, c); }


// ========================
// Arduino entry points
// ========================
void setup() {
    init_steppers();    
}

void loop() {
    static int count = 0;

    StepX(count % 2, 400);
    StepY(count % 2, 400);
    StepZ(count % 2, 400);
    delay(1000);

    count++;

}