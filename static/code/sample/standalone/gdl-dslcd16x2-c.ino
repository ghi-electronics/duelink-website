// In this sample:
// Display the text "DUELink!" on the first row
// Continuously display '*' moving from left to right, then right to left

uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// Pin definitions (adjust if needed)
const int pin_data[4] = {4, 3, 2, 1}; // D4-D7 for data nibble
#define pin_e     getpin(6)
#define pin_rs    getpin(7)
#define pin_bl    getpin(5) // Backlight

// Row offsets for 20x4 LCD
const uint8_t ROW_OFFSETS[4] = {0x00, 0x40, 0x14, 0x54};

// ---------------- LCD Functions ----------------

void SetBrightness(int l) {
    analogWrite(pin_bl, l); // full brightness for 1
}

void Nib(uint8_t b) {
    // Set data pins D4-D7
    digitalWrite(getpin(pin_data[0]), (b >> 3) & 1);
    digitalWrite(getpin(pin_data[1]), (b >> 2) & 1);
    digitalWrite(getpin(pin_data[2]), (b >> 1) & 1);
    digitalWrite(getpin(pin_data[3]), (b >> 0) & 1);

    // Pulse enable
    digitalWrite(pin_e, HIGH);
    digitalWrite(pin_e, LOW);
    delay(1);
}

void SendCmd(uint8_t c) {
    digitalWrite(pin_rs, LOW); // command mode
    Nib(c >> 4);
    Nib(c & 0x0F);
    delay(2);
    digitalWrite(pin_rs, HIGH); // return to data mode
}

void CPos(uint8_t c, uint8_t r) {
    if (c > 15 || r > 3) 
      return;
    SendCmd(0x80 | (ROW_OFFSETS[r] + c));
}

void Home() {
    SendCmd(2);
    delay(2);
}

void Clr() {
    SendCmd(1);
    delay(2);
}

void CPrint(char c) {
    Nib(c >> 4);
    Nib(c & 0x0F);
}

void CPrintS(const char* str) {
    for (int i = 0; str[i] != 0; i++) {
        CPrint(str[i]);
    }
}

// ---------------- Arduino Main ----------------
int _i = 10;
int _d = 1;

void setup() {
    pinMode(pin_e, OUTPUT);
    pinMode(pin_rs, OUTPUT);
    for (int i = 0; i < 4; i++) 
      pinMode(getpin(pin_data[i]), OUTPUT);
    pinMode(pin_bl, OUTPUT);

    SetBrightness(255);
    SendCmd(0x33);
    SendCmd(0x32);
    SendCmd(0x0C); // display on
    Clr();
    delay(3);
}

void loop() {
    CPos(5, 0);
    CPrintS("DUELink");
    CPos(_i, 1);
    CPrint('*');
    delay(30);
    CPos(_i, 1);
    CPrint(' ');

    _i += _d;
    if (_i > 12 || _i < 3) {
        _d *= -1;
    }
}