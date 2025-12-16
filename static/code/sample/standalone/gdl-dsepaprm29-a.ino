// In this sample:
// Fill the screen with white color
// Display the text "DUELink" in black color
// Display the text "DUELink" in red color
// Draw a red box

#define ENABLE_GxEPD2_display 0
#include <GxEPD2_3C.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

// ================= PIN DEFINITIONS =================
#define EPD_CS   getpin(1)
#define EPD_DC   getpin(3)
#define EPD_RST  getpin(2)
#define EPD_BUSY getpin(4)

// ================= DISPLAY SELECTION =================
GxEPD2_3C<GxEPD2_290_C90c, GxEPD2_290_C90c::HEIGHT> display(GxEPD2_290_C90c(EPD_CS, EPD_DC, EPD_RST, EPD_BUSY));
//GxEPD2_3C<GxEPD2_420c_Z21, GxEPD2_420c_Z21::HEIGHT> display(GxEPD2_420c_Z21(EPD_CS, EPD_DC, EPD_RST, EPD_BUSY));

const char HelloWorld[] = "Hello World!";
void setup() {
    SPI.setMISO(PB4);
    SPI.setMOSI(PB5);
    SPI.setSCLK(PB3);

    display.init();

    display.setRotation(1);

    display.setFullWindow();
    display.firstPage();
    do {
        display.fillScreen(GxEPD_WHITE);  // Clears black/white layer
    } while (display.nextPage());
    delay(200);

    display.setFullWindow();
    display.firstPage();
    do {
        // Black rectangle as background
        display.fillRect(0, 0, display.width(), display.height(), GxEPD_WHITE); // White background

        // Black text
        display.setTextColor(GxEPD_BLACK);
        display.setCursor(10, 30);
        display.print("DUElink - Black color");

        // Red text
        display.setTextColor(GxEPD_RED);
        display.setCursor(10, 60);
        display.print("DUElink - Red color");

        // Red rectangle
        display.fillRect(10, 70, 100, 30, GxEPD_RED);

    } while (display.nextPage());
}

void loop() {
    
}