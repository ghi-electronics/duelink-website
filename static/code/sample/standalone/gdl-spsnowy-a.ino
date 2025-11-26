// In this sample:
// Run a cycle from LED 1 to LED 13, with a 200 ms delay between each LED.
// When LED 13 is reached, turn off all LEDs and repeat the cycle.

const uint8_t pin_led[] = {24,2,4,8,9,15,1,3,5,11,7,6,0};

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};
int getpin(int pin) {
  // Input mapped DUELink pin
  // Return the actual pin (PA0, PA1.....)
  return pin_map[pin];
}

void setled(int led, bool value) {
  if ((led > sizeof(pin_led)) || (led < 1))
    return;

  digitalWrite(getpin(pin_led[led-1]), value);
}

void setall(bool value) {
  for (int i = 0; i <sizeof(pin_led); i++ ) {
    digitalWrite(getpin(pin_led[i]), value);
  }
}

void setup() {
  for (int i = 0; i <sizeof(pin_led); i++ ) {
    pinMode(getpin(pin_led[i]),  OUTPUT);
  }

  setall(false);  
}

void loop() {
  static int led_index = 1;

  setled(led_index, true);
  delay(200);

  led_index++;

  if (led_index > sizeof(pin_led)){
    led_index = 1;
    setall(false);
    delay(200);
  }    
}
