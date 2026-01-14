# In this sample:
# When button isn't pressed: Led0: red; led1: green; led2: blue; Led control: on
# When button is pressed: All led off

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
button_pin = int(duelink.Engine.ExecuteCommand("BtnPin()"))

def SetLedRing(index, red, green, blue):
    duelink.Engine.ExecuteCommand(f"SetRing({index},{red},{green},{blue})")

def SetLedControl(value):
    v = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"SetCtr({v})")

def IsButtonPressed():
    return not duelink.Digital.Read(
        button_pin,
        1
    )

button_state1 = False
button_state2 = True

while True:
    button_state1 = IsButtonPressed()

    if button_state1 != button_state2:
        button_state2 = button_state1

        if button_state2:
            SetLedControl(False)
            SetLedRing(0, 0, 0, 0)
            SetLedRing(1, 0, 0, 0)
            SetLedRing(2, 0, 0, 0)
        else:
            SetLedRing(0, 255, 0, 0)
            SetLedRing(1, 0, 255, 0)
            SetLedRing(2, 0, 0, 255)
            SetLedControl(True)

    time.sleep(0.1)  # 100 ms, equivalent to Thread.Sleep(100)