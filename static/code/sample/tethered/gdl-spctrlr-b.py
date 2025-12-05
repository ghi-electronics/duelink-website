# In this sample:
# LEDs will run in circle mode.
# Press buttons U, D, L, R: LEDs turn on at positions 8, 4, 6, and 2.
# Press button A: All red LEDs turn on.
# Press button B: All red LEDs turn off.
# Press LDR button: Return to circle mode.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

run_ring = True

def IsBtnPressed(button: str) -> bool:
    ret = duelink.Engine.ExecuteCommand(f"BtnDown(BtnPin('{button}'))")
    return ret == 1

def SetLed(index: int, value: bool):
    val = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"SetLed({index},{val})")

def SetAllLed(value: bool):
    val = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"SetAllLed({val})")

count = 0
while True:
    if IsBtnPressed('U'):
        SetLed(8, True)
        run_ring = False
    if IsBtnPressed('R'):
        SetLed(2, True)
        run_ring = False
    if IsBtnPressed('D'):
        SetLed(4, True)
        run_ring = False
    if IsBtnPressed('L'):
        SetLed(6, True)
        run_ring = False
    if IsBtnPressed('A'):
        SetAllLed(True)
        run_ring = False
    if IsBtnPressed('B'):
        SetAllLed(False)
        run_ring = False

    if duelink.Engine.ExecuteCommand("dread(20,2)") != 0:
        count = 0
        SetAllLed(False)
        run_ring = True
        time.sleep(0.1)

    if run_ring:
        SetLed((count % 8) + 1, True if (count // 8) % 2 == 0 else False)

    count += 1
    time.sleep(0.1)
