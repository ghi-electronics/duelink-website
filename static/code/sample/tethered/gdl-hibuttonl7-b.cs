// In this sample:
// Detect if any button (Up, Down, Left, Right, Forward, Back) is pressed; the LED corresponding to the button will turn on.
// Detect if Enter is pressed and all leds turn to off

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsBtnPressed(char button) {
    var code = (int)duelink.Engine.ExecuteCommand($"BtnPin('{button}')");
    return duelink.Button.Down(code);    
}
void SetLed(char button, bool value) { 
    var v = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"SetLed('{button}',{v})"); ;
}

while (true) {
    if (IsBtnPressed('U')) {
        Console.WriteLine("Button Up Pressed");
        SetLed('U', true);
    }
    if (IsBtnPressed('D')) {
        Console.WriteLine("Button Down Pressed");
        SetLed('D', true);
    }
    if (IsBtnPressed('L')) {
        Console.WriteLine("Button Left Pressed");
        SetLed('L', true);
    }
    if (IsBtnPressed('R')) {
        Console.WriteLine("Button Right Pressed");
        SetLed('R', true);
    }
   
    if (IsBtnPressed('F')) {
        Console.WriteLine("Button Forward Pressed");
        SetLed('F', true);
    }
    if (IsBtnPressed('B')) {
        Console.WriteLine("Button Back Pressed");
        SetLed('B', true);
    }

    if (IsBtnPressed('E')) {
        Console.WriteLine("Button Enter Pressed");
        SetLed('U', false);
        SetLed('D', false);
        SetLed('L', false);
        SetLed('R', false);
        SetLed('F', false);
        SetLed('B', false);
    }

    Thread.Sleep(100);
}

