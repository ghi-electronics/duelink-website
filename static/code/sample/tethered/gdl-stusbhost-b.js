// In this sample:
// - Mount a USB thumb drive formatted as FAT32
// - Open a handle for writing, write "Hello world", and close the write handle
// - Open a handle for reading, read data (expected to be "Hello world"), and close the read handle
// - Unmount the usb
// Reference: https://www.duelink.com/docs/engine/filesystem
// For more FileSystem APIs (Delete, Find, Directory, etc.)

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
async function main() {
    // Mount USB
    console.log("Mounting usb...");
    // 2: USB thumb drive
    // 0: Ignore
    // 0: Ignore
    // 4: Max 4 handle can be open at run time
    var mounted = await duelink.FileSystem.Mount(2, 0, 0, 4);

    if (mounted < 0) {
        console.log("Failed to mount the usb");
        return;
    }

    console.log("Open handle for writing...");
    const WRITE_MODE = 0x02 | 0x08;
    // 0x02: Write only (no read)
    // 0x08: Create always. Forces creation of a new file.
    //       If the file already exists, it will be deleted.
    var handle_write = await duelink.FileSystem.Open("/test.txt", WRITE_MODE);

    if (handle_write < 0) {
        console.log("Opening handle for writing failed");
        return;
    }

    console.log('Writing data: "Hello world"');
    await duelink.FileSystem.Write(
        handle_write,
        new TextEncoder().encode("Hello world")
    );

    console.log("Close handle...");
    await duelink.FileSystem.Close(handle_write);

    console.log("Open handle for reading...");
    const READ_MODE = 0x01;
    var handle_read = await duelink.FileSystem.Open("/test.txt", READ_MODE);

    if (handle_read < 0) {
        console.log("Opening handle for reading failed");
        return;
    }

    console.log("Read data...");
    var data_read = new Uint8Array(11);
    await duelink.FileSystem.Read(handle_read, data_read);

    // Display data
    console.log(`=>>>>>>> Read: ${new TextDecoder().decode(data_read)}`);

    console.log("Close handle...");
    await duelink.FileSystem.Close(handle_read);

    await duelink.FileSystem.UnMount();
    console.log("Unmounted!");
}

// Run
main();