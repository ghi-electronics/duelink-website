# In this sample:
# Implement Erase, Write, Read, Busy, and GetId
# Using Stream to write/read data at sector 1
# Sector size is 4 KB
# Flash size is 16 MB

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def GetId(id):
    duelink.Engine.ExecuteCommand("dim b0[3]")
    duelink.Engine.ExecuteCommand("SfGetid(b0)")
    duelink.Stream.ReadBytes("b0", id)


def Erase(blockAddress):
    # Each sector is 4 KB
    # Erase the starting sector only
    address = (blockAddress >> 12) * (4 * 1024)
    duelink.Engine.ExecuteCommand(f"SfErase({blockAddress})")

    # Wait for the process to complete
    time.sleep(0.1)
    while IsBusy():
        time.sleep(0.1)


def Write(address, data):
    duelink.Engine.ExecuteCommand(f"dim b1[{len(data)}]")
    duelink.Stream.WriteBytes("b1", data)
    duelink.Engine.ExecuteCommand(f"SfWrite({address},b1)")

    # Wait for the process to complete
    time.sleep(0.1)
    while IsBusy():
        time.sleep(0.1)


def Read(address, data):
    duelink.Engine.ExecuteCommand(f"dim b2[{len(data)}]")
    duelink.Engine.ExecuteCommand(f"SfRead({address},b2)")
    duelink.Stream.ReadBytes("b2", data)

    time.sleep(0.1)
    while IsBusy():
        time.sleep(0.1)


def IsBusy():
    ret = duelink.Engine.ExecuteCommand("SfIsBusy()")
    return ret != 0


print("Make sure the system is not busy before accessing data in flash")
while IsBusy():
    time.sleep(1)
    print("Flash is busy!!!!")


id = bytearray(3)
GetId(id)

# Show 3-byte ID
for b in id:
    print(f"0x{b:02x}")


test_address = 4 * 1024  # Test at sector 1

# Erase sector 1
Erase(test_address)

# Write "1111 " at the test address
data_write1 = bytearray("Test ", "utf-8")
Write(test_address, data_write1)

# Write "me" after data_write1
data_write2 = bytearray("me", "utf-8")
Write(test_address + len(data_write1), data_write2)

# Read back "1111 me"
data_read = bytearray(len(data_write1) + len(data_write2))
Read(test_address, data_read)

# Convert to string
read_str = data_read.decode("utf-8")

# Show string
print(read_str)