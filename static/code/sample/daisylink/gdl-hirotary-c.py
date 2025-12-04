# In this sample:
# Get the current rotary value
# Detect if the rotary button is pressed
# Note:
# The rotary driver uses interrupts, so DUEScript user code must remain in a while-loop indefinitely.
# Append the while-loop below to ensure the user code stays in a while-loop indefinitely if the device does not already have one.
# /////// User code //////
# Asio(1) # Allow communication between host and device
# while (1) # while loop indefinitely 
#    Wait(1000)
# wend

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def GetValue():
    ret = duelink.Engine.ExecuteCommand("GetValue()")
    return int(ret)

def Pressed():
    ret = duelink.Engine.ExecuteCommand("Pressed()")
    return ret != 0

distance_bk = 0
button_status_bk = False

while True:
    distance = GetValue()
    button_status = Pressed()

    if distance_bk != distance:
        distance_bk = distance
        print(f"Value: {distance}")

    if button_status_bk != button_status:
        button_status_bk = button_status
        if button_status_bk:
            print("Button pressed!")
        else:
            print("Button released!")

    time.sleep(0.01)