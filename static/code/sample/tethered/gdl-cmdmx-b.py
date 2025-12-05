# This includes 2 samples. The first to to control a DMX device (light) and the second is for receiving from a DMX controller.

# Example 1: Control a DMX device #########

# This driver assumes there is 4 channels
# ch1: brightness
# ch2: red
# ch3: green
# ch4: blue
# device add: d001 (our dmx light text)

from DUELink.DUELinkController import DUELinkController
import time
from array import array

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

b1 = bytearray(4)

def Init():
    duelink.Uart.Configuration(250000, 512+1)
    duelink.Digital.Write(5, 1)
    duelink.Digital.Write(6, 1)

def SetBright(value:int):
    b1[0] = value

def SetColor(red: int, green:int, blue:int):
    b1[1] = red
    b1[2] = green
    b1[3] = blue

def Flush():
    duelink.DMX.Write(b1)

i = 0
d = 1

Init()
while True:
    SetColor(255,255,255)
    SetBright(i)
    Flush()

    i = i + 5 *d

    if (i > 250):
        d = -1


    if (i < 5):
        d = 1

    time.sleep(0.01)
    
#############################
#############################
#############################

# Example 2: Read a DMX controller DMX-48
availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)


def Init():
    duelink.Uart.Configuration(250000, 512+1)
    duelink.Digital.Write(5, 0) # enable receive
    duelink.Digital.Write(6, 0) # disable transmit


x = 0
v = 0
ch1 = 0
ch2 = 0

Init()
while True:
    duelink.DMX.Update()

    while duelink.DMX.Ready() == 0:
        time.sleep(0.1)    

    if duelink.DMX.Read(0) != ch1: 
        ch1 = duelink.DMX.Read(0)
        print(ch1)

    if duelink.DMX.Read(1) != ch2:
        ch2 = duelink.DMX.Read(1)
        print(ch2)

    time.sleep(0.1)