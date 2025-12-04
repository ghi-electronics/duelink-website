// In this sample:
// Scan from led D1 to led D16

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

void setup() {  
  for (int i = 0 ; i < 16; i++) {
    pinMode(getpin(i+1), OUTPUT);
  }
}

void loop() { 
  static int count = 0;

  digitalWrite(getpin((count % 16) + 1), ((count / 16) % 2 == 0) ? 1 : 0);
  count++;

  delay(100);
}