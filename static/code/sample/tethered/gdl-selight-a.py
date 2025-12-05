# In this sample:
# Pull light value every second
# When light below 25, turn the statled on
# When light higher than 25, turn the statled off

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def GetLight():
    ret = duelink.Engine.ExecuteCommand("Light()")
    return int(ret)

def SetStatLed(on):
    cmd = "statled(1,0,0)"
    if not on:
        cmd = "statled(0,1,0)"
    duelink.Engine.ExecuteCommand(cmd)

while True:
    light = GetLight()

    if light < 25:
        SetStatLed(True)
    else:
        SetStatLed(False)

    print(f"Light value: {light}")
    time.sleep(1)
