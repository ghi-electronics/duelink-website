// In this sample:
// Implement Erase, Write, Read, Busy, and GetId
// Using Stream to write/read data at sector 1
// Sector size is 4 KB
// Flash size is 16 MB

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Sleep helper (ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Methods
async function GetId(id) {
    await duelink.Engine.ExecuteCommand("dim b0[3]");
    await duelink.Engine.ExecuteCommand("SfGetid(b0)");
    await duelink.Stream.ReadBytes("b0", id);
}


async function Erase(blockAddress) {
    // Each sector is 4 KB
    // Erase the starting sector only
    var address = (blockAddress >> 12) * (4 * 1024);
    await duelink.Engine.ExecuteCommand(`SfErase(${blockAddress})`);

    // Wait for the process to complete
    await sleep(100);
    while (await IsBusy()) {
        await sleep(100);
    }
}


async function Write(address, data) {
    await duelink.Engine.ExecuteCommand(`dim b1[${data.length}]`);
    await duelink.Stream.WriteBytes("b1", data);
    await duelink.Engine.ExecuteCommand(`SfWrite(${address},b1)`);

    // Wait for the process to complete
    await sleep(100);
    while (await IsBusy()) {
        await sleep(100);
    }
}


async function Read(address, data) {
    await duelink.Engine.ExecuteCommand(`dim b2[${data.length}]`);
    await duelink.Engine.ExecuteCommand(`SfRead(${address},b2)`);
    await duelink.Stream.ReadBytes("b2", data);

    await sleep(100);
    while (await IsBusy()) {
        await sleep(100);
    }
}


async function IsBusy() {
    var ret = await duelink.Engine.ExecuteCommand("SfIsBusy()");
    return ret !== 0;
}


// Main execution flow

console.log("Make sure the system is not busy before accessing data in flash");
while (await IsBusy()) {
    await sleep(1000);
    console.log("Flash is busy!!!!");
}

var id = new Uint8Array(3);
await GetId(id);

// Show 3-byte ID
for (let i = 0; i < id.length; i++) {
    console.log(`0x${id[i].toString(16).padStart(2, "0")}`);
}

var test_address = 4 * 1024; // Test at sector 1

// Erase sector 1
await Erase(test_address);

// Write "1111 " at the test address
var data_write1 = new TextEncoder().encode("Test ");
await Write(test_address, data_write1);

// Write "me" after data_write1
var data_write2 = new TextEncoder().encode("me");
await Write(test_address + data_write1.length, data_write2);

// Read back "1111 me"
var data_read = new Uint8Array(data_write1.length + data_write2.length);
await Read(test_address, data_read);

// Convert to string
var read_str = new TextDecoder().decode(data_read);

// Show string
console.log(read_str);