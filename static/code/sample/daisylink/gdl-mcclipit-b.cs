// In this sample:
// When the light level is above 10%, all LEDs (5x5) turn on.
// When the light level is below 10%, all LEDs (5x5) turn off.
// Touch any touch pad (A, B, Up, Down, Left, Right): a short beep plays.


using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsTouchA() {
    var ret = (int)duelink.Engine.ExecuteCommand("TouchA()");
    return ret == 1;
}

bool IsTouchB() {
    var ret = (int)duelink.Engine.ExecuteCommand("TouchB()");
    return ret == 1;
}

bool IsTouchUp() {
    var ret = (int)duelink.Engine.ExecuteCommand("TouchUp()");
    return ret == 1;
}

bool IsTouchDown() {
    var ret = (int)duelink.Engine.ExecuteCommand("TouchDown()");
    return ret == 1;
}

bool IsTouchLeft() {
    var ret = (int)duelink.Engine.ExecuteCommand("TouchLeft()");
    return ret == 1;
}

bool IsTouchRight() {
    var ret = (int)duelink.Engine.ExecuteCommand("TouchRight()");
    return ret == 1;
}

int GetLight() {
    var ret = (int)duelink.Engine.ExecuteCommand("Light()");
    return ret;
}

void PlayBuzzer(int freq, int duration ) {
    var cmd = $"freq(7,{freq},{duration},0.5)";
    duelink.Engine.ExecuteCommand(cmd);
    
}

void TurnLedAll(bool on) {
    var cmd = "Clear(0)"; ;
    if (on) {
        cmd = "Clear(1)";
    }
    duelink.Engine.ExecuteCommand(cmd);

    duelink.Engine.ExecuteCommand("show()");
}

while (true) {

    // Turn all light on if light is 10% or higher    
    TurnLedAll(GetLight() > 10);
      
    // detect touch on A,B, Up, Down, Left, Right pads
    var touch = IsTouchA() | IsTouchB() | IsTouchUp() | IsTouchDown() | IsTouchLeft() | IsTouchRight();

    if (touch) {
        PlayBuzzer(1000, 100);
    }        
    Thread.Sleep(100);
}
