// In this sample:
// Continuously turn the motor forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// Function to initialize pins and PWM
void Init() {
    digitalWrite(getpin(5), HIGH);  // DWrite(5,1)
    digitalWrite(getpin(6), HIGH);  // DWrite(6,1)

    // Set PWM frequency and duty cycle
    // Freq(pin, frequency, param2, duty) -> param2 ignored
    analogWrite(getpin(7), 0); // 0 duty initially
    analogWrite(getpin(8), 0); // 0 duty initially
}

// Function to set motor speed/direction
void Set(int s) {
    if (s > 0) {
        // Forward
        analogWrite(getpin(8), 0);           // Stop L motor
        analogWrite(getpin(7),map(s, 0, 100, 0, 255));     // Set duty for R motor
    } else {
        s = -s;
        // Reverse
        analogWrite(getpin(7), 0);           // Stop R motor
        analogWrite(getpin(8), map(s, 0, 100, 0, 255));     // Set duty for L motor
    }
}

void setup() {
    // Initialize pins as outputs
    pinMode(getpin(5), OUTPUT);
    pinMode(getpin(6), OUTPUT);
    pinMode(getpin(7), OUTPUT);
    pinMode(getpin(8), OUTPUT);

    // Initialize PWM
    Init();
}

void loop() {
    // Example: set speed
    Set(50);   // Forward
    delay(2000);
    Set(-50);  // Reverse
    delay(2000);
}