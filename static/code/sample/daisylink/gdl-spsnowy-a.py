# In this sample:
# First led: 1
# Last led: 13
# Run a cycle from LED 1 to LED 13, with a 200 ms delay between each LED.
# When LED 13 is reached, turn off all LEDs and repeat the cycle.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def SetLed(led_idx, on):
    if led_idx < 1 or led_idx > 13:
        return

    val = 1 if on else 0
    cmd = f"setled({led_idx}, {val})"
    duelink.Engine.ExecuteCommand(cmd)

def Clear():
    cmd = "SetAll(0)"
    duelink.Engine.ExecuteCommand(cmd)

led_index = 1

Clear()
while True:
    SetLed(led_index, True)
    time.sleep(0.2)  # 200 ms delay
    led_index += 1

    if led_index == 14:
        Clear()
        led_index = 1
        time.sleep(0.2)




