# In this sample:
# Detect and display the RFID card number when the card is close enough

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def IsCard():
    ret = duelink.Engine.ExecuteCommand("IsCard()")
    return ret == 1


def ReadCard(cardNumber):
    duelink.Engine.ExecuteCommand("dim b1[16]")
    duelink.Engine.ExecuteCommand("ReadCard(b1)")

    duelink.Stream.ReadBytes("b1", cardNumber)


while True:
    if IsCard():
        print("Card detected:")
        num = bytearray(16)

        ReadCard(num)

        for i in range(16):
            n = f"{num[i]:02x}"
            print(n, end="")
            if i < 16 - 1:
                print(":", end="")
        print()

    time.sleep(0.5)