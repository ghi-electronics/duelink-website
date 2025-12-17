// In this sample:
// If current(A) >= 1, turn statled on
// If current(A) < 1, turn statled off

#define SW_SERIAL_DBG 0 // this will use PA2, PA3 as software serial for debug runtime value

#if SW_SERIAL_DBG
#include <SoftwareSerial.h> 
SoftwareSerial softwareSerial(PA2, PA3);
#endif
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

const int sensorPin = getpin(3);         // Analog input pin connected to ACS723 OUT

void setup() {
#if SW_SERIAL_DBG  
  softwareSerial.begin(9600);
#endif

  pinMode(getpin(0), OUTPUT);
  analogReadResolution(12);   // STM32 12-bit ADC  
}

void loop() {
  // 2058 is average when 0A
  // 0.0147 is sensitive from 0.0, 0.5, 1.0, 1.5 and 2A        
  int raw = analogRead(sensorPin);      
  float current = (raw - 2058) * 0.0147;

  if (current >= 1.0)
    digitalWrite(getpin(0),1);
  else
    digitalWrite(getpin(0),0);
  
  
#if SW_SERIAL_DBG
  softwareSerial.print("raw = "); softwareSerial.println(raw);
  softwareSerial.print("Current = "); softwareSerial.println(current);
#endif

  delay(1000);
}