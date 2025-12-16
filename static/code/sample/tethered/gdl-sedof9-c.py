# In this sample:
# Read X,Y,Z and Temperature on DOF9

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def GetX() -> int:
    return int(duelink.Engine.ExecuteCommand("_x"))

def GetY() -> int:
    return int(duelink.Engine.ExecuteCommand("_y"))

def GetZ() -> int:
    return int(duelink.Engine.ExecuteCommand("_z"))

def GetTemperature() -> float:
    return duelink.Engine.ExecuteCommand("_t")

def ActiveAccel():
    duelink.Engine.ExecuteCommand("RAccel()")

def ActiveGyro():
    duelink.Engine.ExecuteCommand("RGyro()")

def ActiveCompass():
    duelink.Engine.ExecuteCommand("RCompass()")

while True:
    ActiveAccel()
    print(f"Accel X = {GetX()}, Y = {GetY()}, Z = {GetZ()}")

    ActiveGyro()
    print(f"Gyro X = {GetX()}, Y = {GetY()}, Z = {GetZ()}, Temperature = {GetTemperature()}")

    ActiveCompass()
    print(f"Compass X = {GetX()}, Y = {GetY()}, Z = {GetZ()}")

    time.sleep(2)  # 2 seconds delay