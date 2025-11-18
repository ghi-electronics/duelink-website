#include <SPI.h>

#define NUM_LED 26
#define BUFF_LEN 4+NUM_LED*4+4 //num of led x 4, plus first and last 4 bytes
uint8_t led_data[BUFF_LEN];

SPISettings tree_settings(8*1000*1000, MSBFIRST, SPI_MODE0);

void SetLed(uint32_t index, uint32_t color, uint32_t level) {
    index = index - 1;

    if (index < 0 || index > NUM_LED)
        return;


    led_data[index*4+4+0] = 0xE0 | level;
    led_data[index*4+4+1] = ((color >> 0) & 0xFF); // blue
    led_data[index*4+4+2] = ((color >> 8) & 0xFF); // green
    led_data[index*4+4+3] = ((color >> 16) & 0xFF); // red
}

void ShowLed() {
    SPI.beginTransaction(tree_settings);
    SPI.transfer(led_data,BUFF_LEN);
    SPI.endTransaction();
}

void setup() {
  // initialize digital pin as an output.
  pinMode(PB8, OUTPUT);
  //init SPI pins
  // SCK, MISO, MOSI, CS
  SPI.begin();//PB3, PB4, PB5, PC6);
  SPI.setMISO(PB4);
  SPI.setMOSI(PB5);
  SPI.setSCLK(PB3);
  memset(led_data,0,BUFF_LEN);
  // first 4 bytes need to be 0
  for (int i = 0; i<4; i++)
      led_data[i] = 0;

  // All led off
  for (int i = 1 ; i< 10; i++)
      SetLed(i, 0, 0);

  // last 4 bytes need to be 255
  for (int i = BUFF_LEN-4; i< BUFF_LEN ; i++)
    led_data[i] = 0xFF;

  ShowLed();
}

void loop() {

  for(int led = 1; led<=10;led++){
    int32_t r = random(50);
    int32_t g = random(50);
    int32_t b = random(50);
    //int_32_t l = Rnd(31)

    SetLed(led, r<<16|g<<8|b, 10);
  }
  ShowLed();

  digitalWrite(PB8, HIGH);
  delay(500);
  digitalWrite(PB8, LOW);
  delay(500);
}