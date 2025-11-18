import sys
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def SetLeftEye(red:int, green:int, blue:int):  
    cmd = f"LEye({red},{green},{blue})" 
    duelink.Engine.ExecuteCommand(cmd)

def SetRightEye(red:int, green:int, blue:int):  
    cmd = f"REye({red},{green},{blue})" 
    duelink.Engine.ExecuteCommand(cmd)    

def IsButtonPressed()->bool:
    cmd = f"dread(20,2)"
    ret = duelink.Engine.ExecuteCommand(cmd)  
    return ret == 1


# Use ExecuteCommand to send standard library
duelink.Engine.ExecuteCommand("statled(100, 100, 0)")

# Use defined function
while True:
    delay = 0.5
    btnPress = IsButtonPressed()
    if btnPress:
        delay = 0.1            

    SetLeftEye(255,255,255)
    SetRightEye(255,255,255)
    time.sleep(delay)
    SetLeftEye(0,0,0)
    SetRightEye(0,0,0)
    time.sleep(delay) 
