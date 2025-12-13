# In this sample:
# Display the text "DUELink!"
# Wait for 1 second
# Display counting up from 0 to 99,999,999

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def DrawNumber(x, number):
    number = number + 48  # 48 = '0'
    cmd = f"CPrint({x},{number})"
    duelink.Engine.ExecuteCommand(cmd)

def DrawString(text):
    cmd = f"CPrintS(\"{text}\")"
    duelink.Engine.ExecuteCommand(cmd)

def Show():
    duelink.Engine.ExecuteCommand("VShow()")

def Clear():
    DrawString("        ")
    Show()

number = 0
i = 0

Clear()
DrawString("DUELink!")
Show()
time.sleep(1)  # 1000 ms
Clear()

while True:
    DrawNumber(i, number)
    Show()
    number = number + 1

    if number == 10:
        number = 0
        i = i + 1

        if i == 8:
            i = 0
            Clear()

    time.sleep(0.01)  # 10 ms