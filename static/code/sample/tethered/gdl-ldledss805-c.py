# In this sample:
# Show characters, dots, and numbers.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def DrawText(text):
    duelink.Engine.ExecuteCommand(f'PrntStr("{text}")')

def DrawDot(pos, value):
    duelink.Engine.ExecuteCommand(f'Dot({pos},{value})')

def DrawNumber(number):
    duelink.Engine.ExecuteCommand(f'Digit({number})')

def Clear():
    duelink.Engine.ExecuteCommand("Clear(0)")

def Show():
    duelink.Engine.ExecuteCommand("Show()")


DrawText("ABCDE")
Show()
time.sleep(1)
DrawText("FGHIJ")
Show()
time.sleep(1)
DrawText("KLMNO")
Show()
time.sleep(1)
DrawText("PQRST")
Show()
time.sleep(1)
DrawText("UVWXY")
Show()
time.sleep(1)
DrawText("  Z  ")
DrawDot(0, 1)
DrawDot(1, 1)
DrawDot(3, 1)
DrawDot(4, 1)
Show()
time.sleep(1)

n = 0
while True:
    Clear()
    DrawNumber(n % 100000)
    n += 1
    Show()
    time.sleep(0.1)