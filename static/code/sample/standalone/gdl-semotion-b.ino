// In this sample:
// Turn the status LED on if motion is detected
// Turn the status LED off if no motion is detected

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

#define MOTION_PIN 3
#define STATLED_PIN 0
void setup() {
   pinMode(getpin(MOTION_PIN), INPUT_PULLDOWN);
   pinMode(getpin(STATLED_PIN), OUTPUT); // Statled    
}

void loop() {
    if (digitalRead(getpin(MOTION_PIN))) {
        digitalWrite(getpin(STATLED_PIN),1);
    }
    else
    {
        digitalWrite(getpin(STATLED_PIN),0);
    }

   delay(1000);
}