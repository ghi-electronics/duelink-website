// In this sample:
// Require "DHT sensor library"
// Read temperarure and humidity every 1.5 second

#include <Arduino.h>
#include "DHT.h"

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

#define DHTPIN getpin(18)

// DHT sensor type
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
#if SW_SERIAL_DBG  
  softwareSerial.begin(9600);
#endif
  dht.begin();  
}

void loop() {  
  // Reading temperature in Celsius
  float temperature = dht.readTemperature();
  
  // Reading humidity
  float humidity = dht.readHumidity();

  // Check if any reading failed
  if (isnan(temperature) || isnan(humidity)) {
#if SW_SERIAL_DBG     
    softwareSerial.println("Failed to read from DHT sensor!");
#endif    
  } else {
#if SW_SERIAL_DBG         
    softwareSerial.print("Temperature: ");
    softwareSerial.print(temperature);
    softwareSerial.print(" C\t");

    softwareSerial.print("Humidity: ");
    softwareSerial.print(humidity);
    softwareSerial.println(" %");
#endif    
  }

  delay(1500); // Wait 1.5 seconds between readings
}