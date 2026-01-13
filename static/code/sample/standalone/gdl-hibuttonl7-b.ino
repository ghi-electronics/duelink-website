// In this sample:
// Detect if any button (Up, Down, Left, Right, Forward, Back) is pressed; the LED corresponding to the button will turn on.
// Detect if Enter is pressed and all leds turn to off

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

void setup() {
    pinMode(getpin(9), OUTPUT);   // Led Up
    pinMode(getpin(8), OUTPUT);   // Led Down
    pinMode(getpin(17), OUTPUT);  // Led Left
    pinMode(getpin(12), OUTPUT);  // Led Right
    pinMode(getpin(13), OUTPUT);  // Led Back
    pinMode(getpin(14), OUTPUT);  // Led Forward

    // Initialize buttons as INPUT (or INPUT_PULLUP if needed)
    pinMode(getpin(1), INPUT_PULLUP); // U
    pinMode(getpin(2), INPUT_PULLUP); // D
    pinMode(getpin(3), INPUT_PULLUP); // L
    pinMode(getpin(4), INPUT_PULLUP); // R
    pinMode(getpin(5), INPUT_PULLUP); // B
    pinMode(getpin(6), INPUT_PULLUP); // F
    pinMode(getpin(7), INPUT_PULLUP); // E

    digitalWrite(getpin(9),  LOW); // Led Up
    digitalWrite(getpin(8),  LOW); // Led Down
    digitalWrite(getpin(17), LOW); // Led Left
    digitalWrite(getpin(12), LOW); // Led Right
    digitalWrite(getpin(13), LOW); // Led Back
    digitalWrite(getpin(14), LOW); // Led Forward
}

int BtnPin(char a) {
    if (a == 'U') return getpin(1);
    if (a == 'D') return getpin(2);
    if (a == 'L') return getpin(3);
    if (a == 'R') return getpin(4);
    if (a == 'B') return getpin(5);
    if (a == 'F') return getpin(6);
    if (a == 'E') return getpin(7);

    return -1;
}

void SetLed(char a, int v) {
    if (a == 'U') {
        digitalWrite(getpin(9), v);
        return;
    }
    if (a == 'D') {
        digitalWrite(getpin(8), v);
        return;
    }
    if (a == 'L') {
        digitalWrite(getpin(17), v);
        return;
    }
    if (a == 'R') {
        digitalWrite(getpin(12), v);
        return;
    }
    if (a == 'B') {
        digitalWrite(getpin(13), v);
        return;
    }
    if (a == 'F') {
        digitalWrite(getpin(14), v);
        return;
    }

    while (1) {
        Serial.println("ERROR!!");
        delay(200);
    }
}

void loop() { 
    if (!digitalRead(BtnPin('U')))
    {
        SetLed('U',1);
    }
    if (!digitalRead(BtnPin('D')))
    {
        SetLed('D',1);
    }
    if (!digitalRead(BtnPin('L')))
    {
        SetLed('L',1);
    }
    if (!digitalRead(BtnPin('R')))
    {
        SetLed('R',1);
    }
    if (!digitalRead(BtnPin('F')))
    {
        SetLed('F',1);
    }
    if (!digitalRead(BtnPin('B')))
    {
        SetLed('B',1);
    }
    if (!digitalRead(BtnPin('E')))
    {
        SetLed('U',0);
        SetLed('D',0);
        SetLed('L',0);
        SetLed('R',0);
        SetLed('B',0);
        SetLed('F',0);        

    }

    delay (10);
    
}

