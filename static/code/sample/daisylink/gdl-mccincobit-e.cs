// In this sample:
// Display a heart on 5x5 matrix 
// When light is detected below 15%, the heart will be cleared and a sweep sound will play
// Play a sweep sound when a press is detected on button A or B
// Play a sweep sound when any touch is detected on pin 0, 1, or 2

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
bool IsTouch(int pin) {
    if (pin < 0 || pin > 2)
        return false;

    var cmd = $"istouch({pin})";
    var ret = (int)duelink.Engine.ExecuteCommand(cmd);

    return ret == 1;
}

bool IsAnyButtonPressed() {
    var btA = duelink.Engine.ExecuteCommand("BtnA()");
    var btB = duelink.Engine.ExecuteCommand("BtnB()");
    if (btA == 1 || btB == 1)
        return true;
    return false;
}

void SetPixel(int x, int y) {
    var cmd = $"Pixel(1,{x},{y})";
    duelink.Engine.ExecuteCommand(cmd);
}

void ShowHeart() {
    duelink.Engine.ExecuteCommand("clear(0)");
    SetPixel(1, 0); SetPixel(3, 0);
    SetPixel(0, 1); SetPixel(1, 1); SetPixel(2, 1); SetPixel(3, 1); SetPixel(4, 1);
    SetPixel(0, 2); SetPixel(1, 2); SetPixel(2, 2); SetPixel(3, 2); SetPixel(4, 2);
    SetPixel(1, 3); SetPixel(2, 3); SetPixel(3, 3);
    SetPixel(2, 4);
    duelink.Engine.ExecuteCommand("show()");

}
void SweepSound(int freq_start, int freq_end, int vol_start, int vol_end, int duration_ms) {
    var cmd = $"sweep(4,{freq_start},{freq_end},{vol_start},{vol_end},{duration_ms})";
    duelink.Engine.ExecuteCommand(cmd);
}

int GetLight() {
    var ret = (int)duelink.Engine.ExecuteCommand("Light()");
    return ret;
}

var light_detect_backup = false;
var light_detect = false;

while (true) {
    if (GetLight() > 15) {
        light_detect = true;
    }
    else {
        light_detect = false;
    }

    if (light_detect_backup != light_detect) {
        light_detect_backup = light_detect;

        if (light_detect) {

            SweepSound(1000, 2000, 255, 50, 250);
            ShowHeart();
        }
        else {
            duelink.Engine.ExecuteCommand("clear(0)");
            duelink.Engine.ExecuteCommand("show()");
            SweepSound(2000, 1000, 255, 50, 250);
        }
    }
    else {
        if (IsTouch(0) || IsTouch(1) || IsTouch(2) || IsAnyButtonPressed()) {
            SweepSound(2000, 3000, 50, 255, 250);
        }
    }


    Thread.Sleep(250);
}

