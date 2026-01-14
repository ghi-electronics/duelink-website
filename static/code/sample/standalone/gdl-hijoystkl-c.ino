// In this sample:
// Set the STATLED on when X > 90 or Y > 90 or button is pressed

#define STATLED_PIN 0
#define BUTTON_PIN 5
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

int JoystickX() {
    float v = (analogRead(getpin(4)) * 3.3f) / 4095.0f;
    return (int)(v / 3.3f * 100.0f);
}

int JoystickY() {
    float v = (analogRead(getpin(3)) * 3.3f) / 4095.0f;
    return (int)(v / 3.3f * 100.0f);
}

// ---- Arduino Setup ----
void setup() {
    pinMode(getpin(BUTTON_PIN), INPUT_PULLUP);
    pinMode(getpin(STATLED_PIN), OUTPUT);
    analogReadResolution(12);   // STM32 12-bit ADC      
}

// ---- Main Loop ----
void loop() {
    int _x = JoystickX();
    int _y = JoystickY();
    int _b = digitalRead(getpin(BUTTON_PIN));

    if (_x >90 || _y >90 || _b ==0) {
        digitalWrite(getpin(STATLED_PIN),HIGH);
    }
    else {
        digitalWrite(getpin(STATLED_PIN),LOW);
    }

    delay(100);
}
