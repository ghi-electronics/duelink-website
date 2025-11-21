# This sample draws circles on the screen and plays a sweep sound when a touch is detected on pin 0, 1, or 2
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

    for i in range(3):
        if IsTouch(i):
            duelink.Sound.Sweep(4, 1000, 2000, 50, 255, 500)
            break

    time.sleep(0.001)  # Thread.Sleep(1) in C# is 1 ms


