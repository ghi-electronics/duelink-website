// In this sample:
// When button isn't pressed: Led0: red; led1: green; led2: blue;Led control: on
// When button is pressed: All led off

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

void SetRing(int i, int r, int g, int b) {

    if (i == 0) {
        analogWrite(getpin(3),  b / 100);
        analogWrite(getpin(1),  r / 100);
        analogWrite(getpin(2),  g / 100);
    }

    if (i == 1) {
        analogWrite(getpin(6),  b / 100);
        analogWrite(getpin(4),  r / 100);
        analogWrite(getpin(5),  g / 100);
    }

    if (i == 2) {
        analogWrite(getpin(11), b / 100);
        analogWrite(getpin(7),  r / 100);
        analogWrite(getpin(8),  g / 100);
    }
}

void SetCtr(int b) {
    digitalWrite(getpin(9), b ? HIGH : LOW);
}

int BtnPin() {
    return getpin(12);
}

void setup() {

    // Configure output pins
    pinMode(getpin(1), OUTPUT);
    pinMode(getpin(2), OUTPUT);
    pinMode(getpin(3), OUTPUT);

    pinMode(getpin(4), OUTPUT);
    pinMode(getpin(5), OUTPUT);
    pinMode(getpin(6), OUTPUT);

    pinMode(getpin(7), OUTPUT);
    pinMode(getpin(8), OUTPUT);
    pinMode(getpin(11), OUTPUT);

    pinMode(getpin(9), OUTPUT);

    // Button input with pull-up
    pinMode(getpin(12), INPUT_PULLUP);
}

void loop() {

    static int _a = 1;
    static int _b = 0;

    _a = digitalRead(BtnPin()); // pull-up input

    if (_a != _b) {
        _b = _a;

        if (_b == 0) {
            SetRing(0, 0, 0, 0);
            SetRing(1, 0, 0, 0);
            SetRing(2, 0, 0, 0);
            SetCtr(0);
        }
        else {
            SetRing(0, 255, 0, 0);
            SetRing(1, 0, 255, 0);
            SetRing(2, 0, 0, 255);
            SetCtr(1);
        }
    }

    delay(10); // wait(10)
}

