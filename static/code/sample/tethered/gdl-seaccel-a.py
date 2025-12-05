from DUELink.DUELinkController import DUELinkController
import time
availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

while 1:
    wait(1000)
    
    println("x = ", GetX())
    println("y = ", GetY())
    println("z = ", GetZ())

wend