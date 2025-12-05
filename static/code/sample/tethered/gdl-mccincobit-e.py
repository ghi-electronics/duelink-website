# In this sample:
# Display a heart on a 5x5 matrix
# When light is detected below 15%, the heart will be cleared and a sweep sound will play
# Play a sweep sound when a press is detected on button A or B
# Play a sweep sound when any touch is detected on pin 0, 1, or 2

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def IsTouch(pin):
    if pin < 0 or pin > 2:
        return False

    cmd = f"istouch({pin})"
    ret = int(duelink.Engine.ExecuteCommand(cmd))

    return ret == 1

def IsAnyButtonPressed():
    btA = duelink.Engine.ExecuteCommand("BtnA()")
    btB = duelink.Engine.ExecuteCommand("BtnB()")
    if btA == 1 or btB == 1:
        return True
    return False

def SetPixel(x, y):
    cmd = f"Pixel(1,{x},{y})"
    duelink.Engine.ExecuteCommand(cmd)

def ShowHeart():
    duelink.Engine.ExecuteCommand("clear(0)")
    SetPixel(1, 0); SetPixel(3, 0)
    SetPixel(0, 1); SetPixel(1, 1); SetPixel(2, 1); SetPixel(3, 1); SetPixel(4, 1)
    SetPixel(0, 2); SetPixel(1, 2); SetPixel(2, 2); SetPixel(3, 2); SetPixel(4, 2)
    SetPixel(1, 3); SetPixel(2, 3); SetPixel(3, 3)
    SetPixel(2, 4)
    duelink.Engine.ExecuteCommand("show()")

def SweepSound(freq_start, freq_end, vol_start, vol_end, duration_ms):
    cmd = f"sweep(4,{freq_start},{freq_end},{vol_start},{vol_end},{duration_ms})"
    duelink.Engine.ExecuteCommand(cmd)

def GetLight():
    ret = int(duelink.Engine.ExecuteCommand("Light()"))
    return ret

light_detect_backup = False
light_detect = False

while True:
    if GetLight() > 15:
        light_detect = True
    else:
        light_detect = False

    if light_detect_backup != light_detect:
        light_detect_backup = light_detect

        if light_detect:
            SweepSound(1000, 2000, 255, 50, 250)
            ShowHeart()
        else:
            duelink.Engine.ExecuteCommand("clear(0)")
            duelink.Engine.ExecuteCommand("show()")
            SweepSound(2000, 1000, 255, 50, 250)
    else:
        if IsTouch(0) or IsTouch(1) or IsTouch(2) or IsAnyButtonPressed():
            SweepSound(2000, 3000, 50, 255, 250)

    time.sleep(0.25)  


