# In this sample:
# Get the current rotary value
# Detect if the rotary button is pressed


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

def Init():
    due.Engine.ExecuteCommand("Scan()")


distance_bk = 0
button_status_bk = False

Init()


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