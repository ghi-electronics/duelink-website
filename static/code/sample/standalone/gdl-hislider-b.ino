// In this sample:
// Set the STATLED dimming based on the Slide value.

#define STATLED_PIN 0
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

int Slide() {
    float voltage = analogRead(getpin(3)) * (3.3 / 4095.0); // STM32 ADC 12-bit
    int value = (int)(voltage / 3.3 * 100);
    return value;
}
void setup() {
    pinMode(getpin(STATLED_PIN), OUTPUT);
    analogReadResolution(12);   // STM32 12-bit ADC  
}

void loop() {    
    int v = map(Slide(), 0,100, 0, 255);
    analogWrite(getpin(STATLED_PIN), v);
    delay (100);
}