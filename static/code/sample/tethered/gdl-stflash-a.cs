// In this sample:
// Implement Erase, Write, Read, Busy and GetID
// Using Stream to Write / Read data at sector 1
// Sector size is 4KB
// Flash size is 16MB

using System;
using System.Diagnostics;
using System.Text;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void GetId(byte[] id) {    
    duelink.Engine.ExecuteCommand("dim b0[3]");
    duelink.Engine.ExecuteCommand("SfGetid(b0)");
    duelink.Stream.ReadBytes("b0", id);
}

void Erase(int blockAddress) {
    // Each sector is 4K
    // Erase start sector only;
    var address = (blockAddress >> 12) * (4*1024);
    duelink.Engine.ExecuteCommand($"SfErase({blockAddress})");

    // Wait for process is done
    Thread.Sleep(100);
    while (IsBusy()) {
        Thread.Sleep(100);
    }
}

void Write(int address, byte[] data) {
    duelink.Engine.ExecuteCommand($"dim b1[{data.Length}]");
    duelink.Stream.WriteBytes("b1", data);
    duelink.Engine.ExecuteCommand($"SfWrite({address},b1)");
    // Wait for process is done
    Thread.Sleep(100);
    while (IsBusy()) {
        Thread.Sleep(100);
    }
}

void Read(int address, byte[] data) {
    duelink.Engine.ExecuteCommand($"dim b2[{data.Length}]");
    duelink.Engine.ExecuteCommand($"SfRead({address},b2)");
    duelink.Stream.ReadBytes("b2", data);
    Thread.Sleep(100);
    while (IsBusy()) {
        Thread.Sleep(100);
    }
}


bool IsBusy() {
    var ret = duelink.Engine.ExecuteCommand("SfIsBusy()");

    return ret != 0;
}

Console.WriteLine("Make sure system is not busy before accessing data in flash");
while (IsBusy()) {
    Thread.Sleep(1000);
    Console.WriteLine("Flash is busy!!!!");
}


var id = new byte[3];
GetId(id);

// Show 3 bytes ID
for (var i = 0;i < id.Length; i++) {
    var x = id[i].ToString("x2");
    Console.WriteLine($"0x{x}");   
}

var test_address = 4 * 1024; // test at sector 1
// Erase sector 1
Erase(test_address);

// Write a string "Test " at address 0
var data_write1 = UTF8Encoding.UTF8.GetBytes("Test ");
Write(test_address, data_write1);

// Write "me" after data_write1
var data_write2 = UTF8Encoding.UTF8.GetBytes("me");
Write(test_address + data_write1.Length, data_write2);

// Read "Test me"
var data_read = new byte[data_write1.Length + data_write2.Length];
Read(test_address, data_read);

// Convert to string
var read_str = Encoding.UTF8.GetString(data_read);

// Show string
Console.WriteLine(read_str);

