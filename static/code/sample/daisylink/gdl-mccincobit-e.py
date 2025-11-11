from DUELink.DUELinkController import DUELinkController
import time
availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)
x = 0
duelink.Graphics.Configuration(1, [0x3C], 128, 64, 1) # config for OLED 96

while True:
    duelink.Graphics.TextT("DUELink", 1, x, 0)
    duelink.Graphics.Show()
    x -= 1
    if x < -40:
        x = 6
    time.sleep(0.1)
    duelink.Graphics.Clear(0)