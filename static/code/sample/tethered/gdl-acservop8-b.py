# In this sample:
# Continuously set servo 1 from 0 to 180 degree

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Set(servo, degree):
    duelink.Engine.ExecuteCommand(f"ServoSt({servo},{degree})")

while True:
    Set(1, 0)
    time.sleep(1)
    Set(1, 45)
    time.sleep(1)
    Set(1, 90)
    time.sleep(1)
    Set(1, 135)
    time.sleep(1)
    Set(1, 180)
    time.sleep(1)

    time.sleep(1)
