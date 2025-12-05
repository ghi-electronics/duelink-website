# In this sample:
# The left and right ears stay on.
# When no button is pressed: the left and right eyes blink every second.
# When the LDR button is pressed: the left and right eyes blink every 200 ms, and a beep plays as long as the button is held down.

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

def SetEar(left: bool, right:bool):
    l = {True:1,False:0}[left == True]  
    r = {True:1,False:0}[right == True]  
    cmd = f"Ear({l},{r})" 
    duelink.Engine.ExecuteCommand(cmd) 

def SetMouth(left:bool, center:bool,right:bool):
    l = {True:1,False:0}[left == True]  
    c = {True:1,False:0}[center == True]  
    r = {True:1,False:0}[right == True] 
    cmd = f"Mouth({l},{c},{r})"
    duelink.Engine.ExecuteCommand(cmd)  

def PlayBeep() :
    cmd = f"freq(3,1000,100,0.5)"
    duelink.Engine.ExecuteCommand(cmd)  
    time.sleep(0.1)

def IsButtonPressed()->bool:
    cmd = f"dread(20,2)"
    ret = duelink.Engine.ExecuteCommand(cmd)  
    return ret == 1


# Use ExecuteCommand to send standard library
duelink.Engine.ExecuteCommand("statled(100, 100, 0)")

# Use defined function
SetEar(True,True)
PlayBeep()

while True:
    delay = 0.5
    btnPress = IsButtonPressed()
    if btnPress:
        delay = 0.1 
        PlayBeep()       

    SetMouth(btnPress, btnPress,btnPress)
    SetLeftEye(255,255,255)
    SetRightEye(255,255,255)
    time.sleep(delay)
    SetLeftEye(0,0,0)
    SetRightEye(0,0,0)
    time.sleep(delay) 
