// In this sample:
// Display pressure in kPa and PSI units

#include <SoftwareSerial.h>
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// STM32C07 + XGZP6847A100KPGN sensor (3.3V system)
const float ADC_REF = 3.3f;       // STM32 3.3V reference
const float ADC_MAX = 4095.0;         // 12-bit ADC

// Measured sensor voltages
const float SENSOR_VMIN = 0.14f;  // Sensor resting voltage at 0 kPa
const float SENSOR_VMAX = 3.3f;   // Sensor output at max pressure

const float PRESSURE_MAX_KPA = 100.0f;     // Max pressure
const float KPA_TO_PSI = 0.1450377f;       // Conversion factor

SoftwareSerial softwareSerial(PA2, PA3);

void setup() {
  softwareSerial.begin(9600);
  analogReadResolution(12);   // STM32 12-bit ADC
}

void loop() {
    // 1. Read raw ADC
    uint16_t raw = analogRead(getpin(2));

    // 2. Convert ADC to voltage
    float v_sensor = (raw / ADC_MAX) * ADC_REF;

    // 3. Map voltage to kPa (linear)
    float kPa = ((v_sensor - SENSOR_VMIN) / (SENSOR_VMAX - SENSOR_VMIN)) * PRESSURE_MAX_KPA;

    // Clamp values
    if (kPa < 0) kPa = 0;
    if (kPa > PRESSURE_MAX_KPA) kPa = PRESSURE_MAX_KPA;

    // 4. Convert kPa to PSI
    float psi = kPa * KPA_TO_PSI;

    // 5. Print results   
    softwareSerial.println(psi, 2);
    softwareSerial.print(kPa, 2);

    delay(1000);
}