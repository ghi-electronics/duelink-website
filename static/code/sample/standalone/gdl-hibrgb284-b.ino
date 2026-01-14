// In this sample:
// When a button is pressed, set light to white color 100% brightness on that button.

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

// b2 array → byte array
uint8_t b2[] = {
    16,14,15,8,7,
    18,10,24,1,2,
    13,19,12,6,5,
    11,9,17,4,3
};

void SetClr(int i, int c, int l) {
    digitalWrite(getpin(b2[i * 5 + 0]), (c & 1) == 0 ? HIGH : LOW);
    digitalWrite(getpin(b2[i * 5 + 1]), (c & 2) == 0 ? HIGH : LOW);
    digitalWrite(getpin(b2[i * 5 + 2]), (c & 4) == 0 ? HIGH : LOW);

    // l is 0–100 → scale to PWM (0–255)
    int pwm = (l * 255) / 100;
    analogWrite(getpin(b2[i * 5 + 3]), pwm);
}

void InitOutput() {
    for (int i = 0; i < 4; i++) {
        pinMode(getpin(b2[i * 5 + 0]), OUTPUT);
        pinMode(getpin(b2[i * 5 + 1]), OUTPUT);
        pinMode(getpin(b2[i * 5 + 2]), OUTPUT);
        pinMode(getpin(b2[i * 5 + 3]), OUTPUT);
    }
}
void setup() {
    // Button inputs with pullups
    pinMode(getpin(7), INPUT_PULLUP);
    pinMode(getpin(2), INPUT_PULLUP);
    pinMode(getpin(5), INPUT_PULLUP);
    pinMode(getpin(3), INPUT_PULLUP);

    // RGB + PWM pins
    InitOutput();


}

int a = 1;
int b = 1;
int c = 1;
int d = 1;

int x = 1;
int y = 1;
int m = 1;
int n = 1;

void loop() {

    
   
    a = digitalRead(getpin(7)); // INPUT_PULLUP
    b = digitalRead(getpin(2));
    c = digitalRead(getpin(5));
    d = digitalRead(getpin(3));

    if (a != x) {
        InitOutput();
        x = a;
        if (a == LOW) {
            SetClr(0, (1 << 0) | (1 << 1) | (1 << 2), 100);
        } else {
            SetClr(0, 0, 100);
        }
    }

    if (b != y) {
        InitOutput();
        y = b;
        if (b == LOW) {
            SetClr(1, (1 << 0) | (1 << 1) | (1 << 2), 100);
        } else {
            SetClr(1, 0, 100);
        }
    }

    if (c != m) {
        InitOutput();
        m = c;
        if (c == LOW) {
            SetClr(2, (1 << 0) | (1 << 1) | (1 << 2), 100);
        } else {
            SetClr(2, 0, 100);
        }
    }

    if (d != n) {
        InitOutput();
        n = d;
        if (d == LOW) {
            SetClr(3, (1 << 0) | (1 << 1) | (1 << 2), 100);
        } else {
            SetClr(3, 0, 100);
        }
    }

    delay(100);
    
}
