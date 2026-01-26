// In this sample:
// Reading analog value from the pin AN
// If AN value smaller than 25%, turn light on

#define PIN_AN   getpin(5) 
#define PIN_STATLED getpin(0) // Statled pin

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

int read() {
  int sensorValue = analogRead(PIN_AN); // return 0 to 4095
  int scaled = map(sensorValue, 0, 4095, 0, 100);

  return scaled;
}

void setup() {  
  pinMode(PIN_STATLED, OUTPUT);
  analogReadResolution(12); // set to 12 bit

}

void loop() { 
  if (read() < 25)
    digitalWrite(PIN_STATLED, 1);
  else
    digitalWrite(PIN_STATLED, 0);
  

  delay(1000);  
}