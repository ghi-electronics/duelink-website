# In this sample:
# Continuously turn the fan forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def SetSpeed(speed):
    v = speed
    if v > 100:
        v = 100
    if v < -100:
        v = -100
    duelink.Engine.ExecuteCommand(f"Fan({v})")

while True:
    time.sleep(2)  # 2000 milliseconds
    SetSpeed(50)

    time.sleep(2)
    SetSpeed(-50)
