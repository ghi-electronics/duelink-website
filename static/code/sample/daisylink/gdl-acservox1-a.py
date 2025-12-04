# In this sample:
# Repeatedly set the servo position to 0, 45, 90, 135, and 180, then reset it to 0.
# There is a one-second delay after each change.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def SetServo(position):
    if position < 0 or position > 180:
        return
    duelink.Engine.ExecuteCommand(f"ServoSt(1,{position})")

degree = 0

while True:
    SetServo(degree)
    if degree == 180:
        degree = 0
    else:
        degree += 45
    time.sleep(1)  # 1000 ms