// In this sample:
// - Mount a USB thumb drive formatted as FAT32
// - Open a handle for writing, write "Hello world", and close the write handle
// - Open a handle for reading, read data (expected to be "Hello world"), and close the read handle
// - Unmount the usb
// Reference: https://www.duelink.com/docs/engine/filesystem
// For more FileSystem APIs (Delete, Find, Directory, etc.)

using System;
using System.Diagnostics;
using System.Text;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

// Mount USB
Console.WriteLine("Mounting usb...");
// 2: USB thumb drive
// 0: Ignore
// 0: Ignore
// 4: Max 4 handle can be open at run time
var mounted = duelink.FileSystem.Mount(2, 0, 0, 4);

if (mounted < 0) {
    Console.WriteLine("Failed mounting the usb");
    return;
}

Console.WriteLine("Open handle for writing...");
const int WRITE_MODE = 0x02 | 0x08;
// 0x02: Write only - No read
// 0x08: Create always. Force create new. If file is already exit, it will be deleted for new file.
var handle_write = duelink.FileSystem.Open("/test.txt", WRITE_MODE);
if (handle_write < 0) {
    Console.WriteLine("Opening handle for writing failed");
    return;
}

Console.WriteLine("Writing data: \"Hello world\"");
duelink.FileSystem.Write(handle_write, UTF8Encoding.UTF8.GetBytes("Hello world"));

Console.WriteLine("Close handle...");
duelink.FileSystem.Close(handle_write);

Console.WriteLine("Open handle for read...");
const int READ_MODE = 0x01;
var handle_read = duelink.FileSystem.Open("/test.txt", READ_MODE);

if (handle_write < 0) {
    Console.WriteLine("Opening handle for reading failed");
    return;
}

Console.WriteLine("Read data...");
var data_read = new byte[11];
duelink.FileSystem.Read(handle_read, data_read);

// Display data
Console.WriteLine($"=>>>>>>> Read: {UTF8Encoding.UTF8.GetString(data_read)}");

Console.WriteLine("Close handle...");
duelink.FileSystem.Close(handle_read);

duelink.FileSystem.UnMount();
Console.WriteLine("Unmounted!");









