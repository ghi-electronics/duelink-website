// In this sample:
// Display Accel X, Y, and Z on the screen.
// Press the Up button: the light bulb turns red and a short beep plays.
// Press the Down button: the light bulb turns green and a short beep plays.
// Press the Left button: the light bulb turns blue and a short beep plays.

using System.Drawing;
using System.Runtime.CompilerServices;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int GetAccelX() {
    var ret = (int)duelink.Engine.ExecuteCommand("GetX()");
    return ret;
}

int GetAccelY() {
    var ret = (int)duelink.Engine.ExecuteCommand("GetY()");
    return ret;
}

int GetAccelZ() {
    var ret = (int)duelink.Engine.ExecuteCommand("GetZ()");
    return ret;
}

int GetLight() {
    var ret = (int)duelink.Engine.ExecuteCommand("Light()");
    return ret;
}

int GetTemperature() {
    var ret = (int)duelink.Engine.ExecuteCommand("ReadTemp()");
    return ret;
}

void SetBulb(uint color) {
    var cmd = $"SetBulb({color})";
    duelink.Engine.ExecuteCommand(cmd);
}

void SetServo(int servo, int degree) {
    if (servo != 5 && servo != 6)
        return;

    var cmd = $"ServoSt({servo},{degree})";
    duelink.Engine.ExecuteCommand(cmd);
}

void ClearScreen() {
    duelink.Engine.ExecuteCommand("Clear(0)");
}
void DrawText(string s, int x, int y) {
    var cmd = $"TextS(\"{s}\",1, {x}, {y}, 1,2)";
    duelink.Engine.ExecuteCommand(cmd);
}
void ShowScreen() {
    duelink.Engine.ExecuteCommand("Show()");
}

bool ButtonPressed(char button) {
    var cmd = $"BtnDown(BtnPin('{button}'))";
    var ret = duelink.Engine.ExecuteCommand(cmd);

    return ret != 0;
}

void PlayTunes(int freq, int duration ) {
    var cmd = $"freq(3,{freq},{duration},0.5)";
    duelink.Engine.ExecuteCommand(cmd);
    
}

var x_bk = 0;
var y_bk = 0;
var z_bk = 0;
var light_bk = 0;
var temp_bk = 0;

while (true) {
    var x = GetAccelX();
    var y = GetAccelY();
    var z = GetAccelZ();

    var light = GetLight();
    var temp = GetTemperature();


    // This sample retrieves Accel X, Y, Z, Light, and Temperature values, then displays them on the DueSTEM screen.
    // Additionally, when any button is pressed, the bulb shows color and the buzzer plays a short beep.    

    var cmd = string.Empty;

    // This will optimize to reduce bus traffic, only redraw if needed
    if (x_bk != x || y_bk != y || z_bk != z || light_bk != light || temp_bk != temp) {
        x_bk = x;
        y_bk = y;
        z_bk = z;
        light_bk = light;
        temp_bk = temp;
        ClearScreen();
        DrawText($"X:{x}, Y:{y}, Z:{z}", 0, 0);
        DrawText($"Light:{light}%", 0, 20);
        DrawText($"Temperature:{temp} C", 0, 40);
        ShowScreen();
    }    

    // Press any button, color will change and beep will play
    if (ButtonPressed('U')) {
        SetBulb(0xFF0000);
        PlayTunes(1000, 100);
        
    }
    if  (ButtonPressed('D')) {
        SetBulb(0x00FF00);
        PlayTunes(1000, 100);

    }
    if (ButtonPressed('L')) {
        SetBulb(0x0000FF);
        PlayTunes(1000, 100);

    }
    if (ButtonPressed('R')) {
        SetBulb(0xFFFFFF);
        PlayTunes(1000, 100);

    }
    Thread.Sleep(1);

}
