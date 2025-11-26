// In this sample:
// STATLED blinks every 100 ms.
// Press and hold the LDR button: STATLED stops blinking and stays on.
// Release the LDR button: STATLED resumes blinking every 100 ms.

// Setup IDE
// Select DUELink from board manager
#define STATLED_PIN 0
#define LDR_BUTTON_PIN 20

// DUELink map pins
uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  // Input mapped DUELink pin
  // Return the actual pin (PA0, PA1.....)
  return pin_map[pin];
}

void setup() { 
  pinMode(getpin(STATLED_PIN), OUTPUT);
  pinMode(getpin(LDR_BUTTON_PIN), INPUT_PULLDOWN);  
}

int counter = 0;
void loop() {
  
  if (digitalRead(getpin(LDR_BUTTON_PIN)) == 1) {
    digitalWrite (getpin(STATLED_PIN),1);
    return;
  }

  counter++;

  digitalWrite (getpin(STATLED_PIN),(counter % 2) == 0);
  delay(100);
}