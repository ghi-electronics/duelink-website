// In this sample:
// Set the STATLED dimming based on the dial value.

#define STATLED_PIN 0
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

int Read(int i) {
    if (i > 10 || i < 1) {
        return 0;
    }

    // DRead(i, 1) -> digitalRead with pull-up logic
    // Active-low input
    return !digitalRead(getpin(i));
}

void setup() {
    // Configure input pins (1..10) with pull-up
    for (int i = 1; i <= 10; i++) {
        pinMode(getpin(i), INPUT_PULLUP);
    }

    // Status LED pin (0)
    pinMode(getpin(STATLED_PIN), OUTPUT);
}

void loop() {
    int v = 0;

    for (int i = 0; i <= 10; i++) {
        if (Read(i + 1)) {
            v = 1;
            break;
        }
    }

    // dwrite(0, v)
    digitalWrite(getpin(STATLED_PIN), v ? HIGH : LOW);

    // wait(100)
    delay(100);
}
