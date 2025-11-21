# In this sample:
# Draws circles on the screen
# Plays a sweep sound when a touch is detected on pin 0, 1, or 2
# Plays a sweep sound when a pressed is detected on button A,B
# Show light value on the top of the screen

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

buzzerPin = 4
x = 50
d = 10
width = int(duelink.Engine.ExecuteCommand("getw()"))
height = int(duelink.Engine.ExecuteCommand("geth()"))

while True:
    duelink.Graphics.Circle(1, x, height // 2, 10)
    duelink.Graphics.Show()
    x = x + d

    if x > width or x < 0:
        d = d * -1
        duelink.Graphics.Clear(0)
        light = duelink.Engine.ExecuteCommand("Light()")
        duelink.Graphics.TextS(f"Light: {light}%", 1, 0, 0, 1, 1)

    for i in range(3):
        if IsTouch(i):
            duelink.Sound.Sweep(buzzerPin, 2000, 4000, 50, 255, 100)
            break

    if duelink.Engine.ExecuteCommand("BtnA()") != 0 or duelink.Engine.ExecuteCommand("BtnB()") != 0:
        duelink.Sound.Sweep(buzzerPin, 1000, 2000, 50, 255, 100)

    time.sleep(0.001)  





