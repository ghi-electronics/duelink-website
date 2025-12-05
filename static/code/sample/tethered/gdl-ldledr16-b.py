# In this sample:
# Scan from led D1 to led D16

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def SetLed(index, value):
    val = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"SetLed({index},{val})")

count = 0
while True:
    SetLed((count % 16) + 1, (count // 16) % 2 == 0)
    count += 1
    time.sleep(0.1)  # 100 ms