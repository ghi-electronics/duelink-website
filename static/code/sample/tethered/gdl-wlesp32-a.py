# In this sample:
# Send the AT command AT+GMR
# Read responses (multiple lines)

import time
import codecs
from GHIElectronics.DUELink import *

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def ATCmdSend(cmd):
    duelink.Engine.ExecuteCommand(f'ATCmd("{cmd}")')

def ATCmdReadLine(timeout):
    duelink.Engine.ExecuteCommand(f"ReadLine(1, {timeout})")

    data = bytearray(1024)
    duelink.Stream.ReadBytes("b0", data)
    s = data.decode("utf-8")
    return s

while True:
    ATCmdSend("AT+GMR")

    line = ATCmdReadLine(1000)

    while True:
        # The version response returns multiple lines, keep reading until the end
        if line is not None and len(line) != 0:
            print(line)
            line = ATCmdReadLine(1000)

            time.sleep(1)
        else:
            break