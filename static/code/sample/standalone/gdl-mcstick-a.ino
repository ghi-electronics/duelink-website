
// In this sample:
// Toggle the statled every 500ms 

#define STATLED_PIN 20 
const uint8_t pin_led[] = {9,7,8,13,17,15,14,12};

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};
int getpin(int pin) {
  // Input mapped DUELink pin
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

void setled(bool value) {
  digitalWrite(getpin(STATLED_PIN), value);
}

void setup() {
   pinMode(getpin(STATLED_PIN),  OUTPUT);
}

void loop() {
    delay(500);
    setled(true);
    delay(500);
    setled(false);
}