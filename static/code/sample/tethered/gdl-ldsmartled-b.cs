// In this sample:
// Using the DUELink graphics library
// Configuration for two vertically scanned 32x8 panels creating a 64x8 LED display
// Scrolling DUELink text on the panels with red, green, and blue colors
// Visit https://www.duelink.com/docs/engine/graphics
// for more DUELink graphics APIs: DrawLine, Text with scale, Rect, Image, etc.


using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

const int SCREEN_WIDTH = 64; // this will be two pannels width: 32x2
const int SCREEN_HEIGHT = 8; // height
void Configuration() {
    var config_array = new float[] {
        14 , //Pin used
        SCREEN_WIDTH ,
        SCREEN_HEIGHT ,
        1 //Vertical scanning
    };
    duelink.Graphics.Configuration(
        3, //type 3 - WS2812
        config_array,
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        1  //buffered x1
        );
}

void Clear(uint color) {

    duelink.Graphics.Clear(color);
}

void DrawText(string text, uint color, int x, int y) {
    duelink.Graphics.Text(text, color, x, y);
}

void Show() {
    duelink.Graphics.Show();
}

var posX = SCREEN_WIDTH; // start from the left

var count = 0;

Configuration();
while (true) {
    
    var color = (uint)0xFF0000;
    if (count % 3 == 1) {
        color = (uint)0x00FF00;
    }
    if (count % 3 == 2) {
        color = (uint)0x0000FF;
    }
   
    Clear(0);
    DrawText("DUELink", (uint)color, posX, 0);
    Show();

    posX--;
    if (posX < -40) {
        posX = SCREEN_WIDTH;
        count++;
    }

    Thread.Sleep(10);
}




