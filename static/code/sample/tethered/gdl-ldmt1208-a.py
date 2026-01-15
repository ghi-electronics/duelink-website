# In this sample:
# Display "Hello World" and scroll the text across the screen

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
x = 12
while True:
    duelink.Graphics.Clear(0)
    duelink.Graphics.Text("Hello world!", 1, x, 0)
    x -= 1

    if x < -70:
        x = 12

    duelink.Graphics.Show()
    time.sleep(0.030) 