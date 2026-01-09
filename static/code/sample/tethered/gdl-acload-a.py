# In this sample:
# Continuously toggle P1 to P8, with a 10ms delay for each pin

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def SetPin(pin, value):
    v = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"dwrite({pin+1},{v})")

counter = 0
value = False

while True:
    time.sleep(0.01)  # 10 ms sleep, same as Thread.Sleep(10)

    SetPin(counter % 8, value)

    counter += 1

    if counter % 8 == 0:
        value = not value
