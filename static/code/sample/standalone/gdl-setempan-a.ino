// In this sample:
// Read temperarure every 1.5 second
// ±2°C Accuracy

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

#define SENSOR_PIN PA0
#define ADC_BITS 12
#define ADC_MAX ((1<<ADC_BITS)-1)
#define VDD 3.281
#define MCP9701_V0 0.64   // calibrated at 0°C or measured
#define MCP9701_SLOPE 0.01 // 10mV/°C
#define TEMP_OFFSET 4.5   // room calibration

// Function to read MCP9701 temperature in °C
float readTemperature() {
  int adc = analogRead(SENSOR_PIN);
  float voltage = adc * VDD / ADC_MAX;
  float tempC = (voltage - MCP9701_V0) / MCP9701_SLOPE;
  tempC += TEMP_OFFSET;
  return tempC;
}


void setup() {
#if SW_SERIAL_DBG  
  softwareSerial.begin(9600);
#endif
  analogReadResolution(12);
  // Enable VREFINT for STM32
  ADC->CCR |= ADC_CCR_VREFEN;  // enable VREFINT
}

void loop() {  
  float tempC = readTemperature();
#if SW_SERIAL_DBG         
    softwareSerial.print("Temperature: ");
    softwareSerial.print(tempC, 2);
    softwareSerial.println(" C");
#endif  

  delay(1500); // Wait 1.5 seconds between readings
}