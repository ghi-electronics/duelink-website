# In this sample:
# Touch on pin 2, status LED turns on
# Touch on pin 7, status LED turns off

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def SetStatLed(value: bool):
    high = 1 if value else 0
    low = 0 if value else 1
    duelink.Engine.ExecuteCommand(f"Statled({high},{low},0)")

def Touched(pin: int) -> bool:
    ret = duelink.Engine.ExecuteCommand(f"PulseIn({pin},1000, 0, 100)")
    return ret > 110

while True:
    if Touched(2):
        SetStatLed(True)
    if Touched(7):
        SetStatLed(False)

    time.sleep(0.05)  # 50 ms delay