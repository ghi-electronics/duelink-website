// In this sample:
// Work in progress

#define DMX_TX_PIN PA0
#define DMX_RX_PIN PA1
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

HardwareSerial DMXSerial(USART1); // Use USART1
uint8_t dmxData[512+1];
void setup() {
    pinMode(getpin(5), OUTPUT);
    pinMode(getpin(6), OUTPUT);

    digitalWrite(getpin(5), HIGH);
    digitalWrite(getpin(6), HIGH);
    
    DMXSerial.setTx(DMX_TX_PIN);
    DMXSerial.setRx(DMX_RX_PIN);

    //Enable TX/RX swap so PA1 acts as TX
    DMXSerial.begin(250000, SERIAL_8N2);
    USART1->CR2 |= USART_CR2_SWAP;   // Enable TX/RX swap

    dmxData[0] = 0; // start frame 0
    dmxData[1] = 255; // max brightness
    dmxData[2] = 255; // red 255
    
    dmxWrite(dmxData, 513);
}

void dmxWrite(uint8_t *data, uint16_t length) {
    if (length > 513) length = 513;

    // BREAK: disable UART and drive TX pin (PA1) low
    DMXSerial.end();
    pinMode(PA1, OUTPUT);
    digitalWrite(PA1, LOW);
    delayMicroseconds(120); // BREAK
    digitalWrite(PA1, HIGH);
    delayMicroseconds(12);  // MAB

    // Re-enable UART    
    DMXSerial.begin(250000, SERIAL_8N2);
    USART1->CR2 |= USART_CR2_SWAP;
    

    // Send DMX frame
    //DMXSerial.write(0x00); // Start code
    DMXSerial.write(data, length);
    DMXSerial.flush();
}

void loop() { 
       
    delay(25);
}

