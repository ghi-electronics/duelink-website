// In this sample:
// # Warm up the sensor for 10 seconds, then read the analog value

#include <Arduino.h>

#define SW_SERIAL_DBG 1 // this will use PA2, PA3 as software serial for debug runtime value

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

void Heater() {
  digitalWrite(getpin(5),1);
}

float SensorRead() {
  int adc = analogRead(getpin(3));
  float voltage = adc * 3.3 / 4095;
  return voltage;
}

void setup() {
#if SW_SERIAL_DBG  
  softwareSerial.begin(9600);
#endif
  analogReadResolution(12);
  pinMode(getpin(5), OUTPUT);
}

int counter = 0;
void loop() {  
  delay(1000); 

  if (counter == 0) {
    Heater();
  }
  counter++;
  if (counter < 10) {
#if SW_SERIAL_DBG    
    softwareSerial.print("Wait for 10 second:");
    softwareSerial.println(counter);
#endif      
    return;
  }
  float adc_volt = SensorRead();
#if SW_SERIAL_DBG         
    softwareSerial.print("value: ");
    softwareSerial.println(adc_volt, 2);    
#endif  

  
}