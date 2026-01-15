# In this sample:
# Continuously change colors: white, red, green, and blue every second

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Setled(led, color):
    duelink.Engine.ExecuteCommand(f"SetLed({led},{color})")

count = 0
while True:
    match count % 4:
        case 0:  # White
            Setled(0, 0xFFFFFF)
            Setled(1, 0xFFFFFF)
            Setled(2, 0xFFFFFF)
        case 1:  # Red
            Setled(0, 0xFF0000)
            Setled(1, 0xFF0000)
            Setled(2, 0xFF0000)
        case 2:  # Green
            Setled(0, 0x00FF00)
            Setled(1, 0x00FF00)
            Setled(2, 0x00FF00)
        case 3:  # Blue
            Setled(0, 0x0000FF)
            Setled(1, 0x0000FF)
            Setled(2, 0x0000FF)

    count += 1
    time.sleep(1)