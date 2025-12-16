# In this sample:
# Reading X,Y,Z values

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def GetX():
    return int(duelink.Engine.ExecuteCommand("getx()"))


def GetY():
    return int(duelink.Engine.ExecuteCommand("gety()"))


def GetZ():
    return int(duelink.Engine.ExecuteCommand("getz()"))


while True:
    print(f"X = {GetX()}, Y = {GetY()}, Z = {GetZ()}")
    time.sleep(1)   # 1000 ms, correctly ported from Thread.Sleep(1000)
