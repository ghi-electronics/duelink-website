from DUELink.DUELinkController import DUELinkController
import time
availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

x = 50
d = 10
width = int(float(duelink.Engine.Run("getw()")))
height = int(float(duelink.Engine.Run("geth()")))

while True:
    duelink.Graphics.Circle(1, x, height//2, 10)
    duelink.Graphics.Show()
    x = x + d
    if (x > width or x < 0):
        d = d * -1
        duelink.Graphics.Clear(0)
    time.sleep(0.1)