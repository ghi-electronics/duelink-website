# In this sample:
# Detect if any button (Up, Down, Left, Right, Forward, Back) is pressed;
# the LED corresponding to the button will turn on.
# Detect if Enter is pressed and all leds turn to off
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def IsBtnPressed(button):
    code = int(duelink.Engine.ExecuteCommand(f"BtnPin('{button}')"))
    return duelink.Button.Down(code)

def SetLed(button, value):
    v = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"SetLed('{button}',{v})")

while True:
    if IsBtnPressed('U'):
        print("Button Up Pressed")
        SetLed('U', True)

    if IsBtnPressed('D'):
        print("Button Down Pressed")
        SetLed('D', True)

    if IsBtnPressed('L'):
        print("Button Left Pressed")
        SetLed('L', True)

    if IsBtnPressed('R'):
        print("Button Right Pressed")
        SetLed('R', True)

    if IsBtnPressed('F'):
        print("Button Forward Pressed")
        SetLed('F', True)

    if IsBtnPressed('B'):
        print("Button Back Pressed")
        SetLed('B', True)

    if IsBtnPressed('E'):
        print("Button Enter Pressed")
        SetLed('U', False)
        SetLed('D', False)
        SetLed('L', False)
        SetLed('R', False)
        SetLed('F', False)
        SetLed('B', False)

    time.sleep(0.1)