# In this sample:
# Continuously switch relay 2 on/off every 2 seconds

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Set(relay, value):
    v = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"Set({relay},{v})")

while True:
    time.sleep(2)
    Set(2, True)

    time.sleep(2)
    Set(2, False)
