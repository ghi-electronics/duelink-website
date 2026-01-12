# In this sample:
# On receiving a CAN message, display the RX values and send a CAN message (ID: 1,
# data: {1, 2, 3, 4, 5, 6, 7, 8}). Poll interval: 1 second.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Read(data):
    cmd = f"dim b1[{1 + len(data)}]"  # length at first byte
    duelink.Engine.ExecuteCommand(cmd)

    ret = int(duelink.Engine.ExecuteCommand("RxRd(b1)"))

    if ret >= 0:
        id_val = duelink.Engine.ExecuteCommand("b1[0]")
        print(f"length: {id_val}")

        for i in range(1, len(data) + 1):
            data[i - 1] = int(duelink.Engine.ExecuteCommand(f"b1[{i}]")) & 0xFF
            val = f"{data[i - 1]:02x}"
            print(f"Rx data: 0x{val}")

    return ret

def Write(id, data):
    cmd = f"dim b0[{len(data)}]"  # data length
    duelink.Engine.ExecuteCommand(cmd)

    for i in range(len(data)):
        duelink.Engine.ExecuteCommand(f"b0[{i}]={data[i]}")

    duelink.Engine.ExecuteCommand(f"TxReq({id},len(b0),b0)")
    print(f"Sent: {id}")

read_arr = bytearray(8)
write_arr = bytearray([1, 2, 3, 4, 5, 6, 7, 8])

while True:
    if Read(read_arr) >= 0:
        Write(1, write_arr)
    time.sleep(1)