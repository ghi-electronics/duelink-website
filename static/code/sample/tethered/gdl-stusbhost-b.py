# In this sample:
# - Mount a USB thumb drive formatted as FAT32
# - Open a handle for writing, write "Hello world", and close the write handle
# - Open a handle for reading, read data (expected to be "Hello world"), and close the read handle
# - Unmount the usb
# Reference: https://www.duelink.com/docs/engine/filesystem
# For more FileSystem APIs (Delete, Find, Directory, etc.)

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
# Mount USB
print("Mounting usb...")
# 2: USB thumb drive
# 0: Ignore
# 0: Ignore
# 4: Max 4 handle can be open at run time
mounted = duelink.FileSystem.Mount(2, 0, 0, 4)

if mounted < 0:
    print("Failed to mount the usb")
    exit()

print("Open handle for writing...")
WRITE_MODE = 0x02 | 0x08
# 0x02: Write only (no read)
# 0x08: Create always. Forces creation of a new file.
#       If the file already exists, it will be deleted.
handle_write = duelink.FileSystem.Open("/test.txt", WRITE_MODE)

if handle_write < 0:
    print("Opening handle for writing failed")
    exit()

print('Writing data: "Hello world"')
duelink.FileSystem.Write(handle_write, "Hello world".encode("utf-8"))

print("Close handle...")
duelink.FileSystem.Close(handle_write)

print("Open handle for reading...")
READ_MODE = 0x01
handle_read = duelink.FileSystem.Open("/test.txt", READ_MODE)

if handle_read < 0:
    print("Opening handle for reading failed")
    exit()

print("Read data...")
data_read = bytearray(11)
duelink.FileSystem.Read(handle_read, data_read)

# Display data
print(f"=>>>>>>> Read: {data_read.decode('utf-8')}")

print("Close handle...")
duelink.FileSystem.Close(handle_read)

duelink.FileSystem.UnMount()
print("Unmounted!")