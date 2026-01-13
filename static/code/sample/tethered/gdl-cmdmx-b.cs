// In this sample:
// Control a DMX light.
// Set the color to red, green, or blue.
// Set the brightness from 0 to 255.
// Issue: The DMX light may stop working randomly.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);


var data = new byte[4];
void Initialize() {
    duelink.Uart.Configuration(250000, 512 + 1);
    EnableTransmit(true);
}

void EnableTransmit(bool value) {
    // 5 # RE pin: Low: Enable receive
    // 6 # DE pin: High: Enable transmit        
    duelink.Digital.Write(5, value);
    duelink.Digital.Write(6, value);
}
void SetColor(byte red, byte green, byte blue) {
    data[1] = red; data[2] = green; data[3] = blue;
}

void SetBrightness(int brightness) {    
    data[0]=(byte)brightness;
}

void Flush() {
    duelink.DMX.Write(data);
    Thread.Sleep(100);
}

Initialize();

var color = 0;
var brightness = 0;
while (true) {
    var c = color % 4;

    switch (c) {
        case 0: // red
            SetColor(255, 0, 0);
            break;
        case 1: // red
            SetColor(0, 255, 0);
            break;
        case 2: // red
            SetColor(0, 0, 255);
            break;
        case 3: // red
            SetColor(255, 255, 255);
            break;
    }

    SetBrightness(brightness);
    Flush();

    brightness+=25;
    if (brightness >= 255) {
        brightness = 0;
        color++;
    }
    Thread.Sleep(10);
}

