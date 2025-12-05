// In this sample:
// Simulate tones from note C4 to C5
// Press the left arrow all leds 1,2,3,4,5 are off, play a sweep sound
// Press the right arrow all leds 1,2,3,4,5 are on, play a sweep sound

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
bool IsLeftArrowTouched() {
    var ret = duelink.Engine.ExecuteCommand("TLArrow()");
    return ret == 1;
}

bool IsRightArrowTouched() {
    var ret = duelink.Engine.ExecuteCommand("TRArrow()");
    return ret == 1;
}

bool IsPadTouched(int i) {
    var ret = duelink.Engine.ExecuteCommand($"TPad({i})");
    return ret == 1;
}

var tones = new int[] { 523, 554, 587, 622, 659, 698, 740, 784, 830, 880, 932, 987, 1047 };

while (true) {
    for (var i = 0; i < tones.Length; i++) {
        if (IsPadTouched(i)) {            
            duelink.Engine.ExecuteCommand($"freq(3, {tones[i]}, 0, 0.5)");
            while (true) {
                if (!IsPadTouched(i)) {
                    duelink.Engine.ExecuteCommand($"freq(3, {tones[i]}, 0, 1)");
                    break;
                }
                Thread.Sleep(10);
            }

        }
    }

    if (IsLeftArrowTouched()) {
        duelink.Engine.ExecuteCommand("SetLEDAll(0)");
        duelink.Engine.ExecuteCommand("sweep(3, 1000,2000,50,255,250)");
        Thread.Sleep(250);       
    }

    if (IsRightArrowTouched()) {
        duelink.Engine.ExecuteCommand("SetLEDAll(1)");
        duelink.Engine.ExecuteCommand("sweep(3, 2000,1000,255,50,250)");
        Thread.Sleep(250);        
    }
    Thread.Sleep(1);

}

