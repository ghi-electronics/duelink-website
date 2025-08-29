import sys
import time
import random
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

duelink.Engine.Run("PlayLED(0)")
duelink.Engine.Run("SetAll(0)")
duelink.Engine.Run("PlayBeep(100)")
x = 1
while True:
   r = int(random.uniform(0, 50))
   g = int(random.uniform(0, 50))
   b = int(random.uniform(0, 50))
   l = int(random.uniform(0, 30))
   c = (r << 16) | (g << 8) | b

   duelink.Engine.Run(f'SetLED({x}, {c}, {l})')

   x = x+1
   if x > 26:
       x = 1
   duelink.Engine.Run("ShowLed()")