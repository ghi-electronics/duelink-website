// In this sample:
// Display the text "DUELink!"
// Wait for 1 second
// Display counting up from 0 to 99,999,999

uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  // Input mapped DUELink  pin
  // Return the actual pin (PA0, PA1.....)
  return pin_map[pin];
}

#define en getpin(9)
#define rst getpin(8)
#define cs  getpin(17)
#define clk getpin(12)
#define din getpin(14)

void Write(uint8_t d) {
  for (int i = 0; i < 8; i++) {
    digitalWrite(clk, LOW);

    if (d & 0x01)
      digitalWrite(din, HIGH);
    else
      digitalWrite(din, LOW);

    d >>= 1;
    digitalWrite(clk, HIGH);
  }
}

void VCmd(uint8_t c) {
  digitalWrite(cs, LOW);
  Write(c);
  digitalWrite(cs, HIGH);
}

void VShow() {
  VCmd(0xE8);
}

void Init() {
  pinMode(en, OUTPUT);
  pinMode(rst, OUTPUT);
  pinMode(cs, OUTPUT);
  pinMode(clk, OUTPUT);
  pinMode(din, OUTPUT);

  digitalWrite(en, HIGH);
  digitalWrite(rst, LOW);
  delay(1);
  digitalWrite(rst, HIGH);
  delay(1);

  // SET HOW MANY DIGITS
  digitalWrite(cs, LOW);
  Write(0xE0);
  delay(1);
  Write(0x07);   // 8 digits
  digitalWrite(cs, HIGH);
  delay(1);

  // SET BRIGHTNESS
  digitalWrite(cs, LOW);
  Write(0xE4);
  delay(1);
  Write(0xFF);   // max brightness (255)
  digitalWrite(cs, HIGH);
  delay(1);
}

void CPrint(uint8_t x, uint8_t c) {
  digitalWrite(cs, LOW);
  Write(0x20 + x);
  Write(c);
  digitalWrite(cs, HIGH);
}

void CPrintS(const char *str) {
  for (int i = 0; str[i] != 0; i++) {
    CPrint(i, str[i]);
  }
}

void setup() {
  Init();
  CPrintS("DUELINK!");
  VShow();
  delay(1000);
}

int x = 0;
int i = 0;

void loop() {
  CPrint(i, x + '0');
  VShow();
  x = x + 1;
  if (x == 10) {
      x = 0;
      i = i + 1;

      if (i == 8) {
          i = 0;
          VShow();
      }
  }
  delay(100);
}