# In this sample:
# Detect if the button is pressed
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def IsBtnPressed():
    return duelink.Button.Down(1)

while True:
    if IsBtnPressed():
        print("Button Pressed")
    time.sleep(0.1)  # 100 ms