// In this sample:
// Continuously turn the motor A,B forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change
// There is an issue with SMotorB(-50). We tested with DUELink firmware, and it’s fine. It seems there is a bug in the built-in Arduino library

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// --- Motor Initialization ---
void Init() {
    pinMode(getpin(8), OUTPUT);  // Sleep
    pinMode(getpin(9), INPUT);   // Fault

    pinMode(getpin(4), OUTPUT);  // Motor A+
    pinMode(getpin(5), OUTPUT);  // Motor A-
    pinMode(getpin(6), OUTPUT);  // Motor B+
    pinMode(getpin(7), OUTPUT);  // Motor B-

    digitalWrite(getpin(8), 1); // no sleep

    digitalWrite(getpin(4), 0);
    digitalWrite(getpin(5), 0);
    digitalWrite(getpin(6), 0);
    digitalWrite(getpin(7), 0);
}

// --- Motor A control ---
void SMotorA(int s) {
    pinMode(getpin(4), OUTPUT);  // Motor A+
    pinMode(getpin(5), OUTPUT);  // Motor A-
    if (s > 0) {

        digitalWrite(getpin(5), LOW);
        analogWrite(getpin(4),map(s, 0, 100, 0, 255));
    } else {
        s = s*-1;

        digitalWrite(getpin(4), LOW);
        analogWrite(getpin(5),map(s, 0, 100, 0, 255));
    }
}

// --- Motor B control ---
void SMotorB(int s) {
    pinMode(getpin(6), OUTPUT);  // Motor B+
    pinMode(getpin(7), OUTPUT);  // Motor B-
    if (s > 0) {
        digitalWrite(getpin(7), LOW);
        analogWrite(getpin(6),map(s, 0, 100, 0, 255));
    } else {
        s = s*-1;
        digitalWrite(getpin(6), LOW);
        analogWrite(getpin(7),map(s, 0, 100, 0, 255));
    }
}

void setup() {
    Init();
}

void loop() {
    // Example usage: run motors forward/backward
    SMotorA(50);
    SMotorB(50);
    delay(2000);
    SMotorA(-50);
    //SMotorB(-50); There is an issue with SMotorB(-50). We tested DUELink, and it’s fine. It seems there is a bug in the built-in Arduino library
    delay(2000);
}