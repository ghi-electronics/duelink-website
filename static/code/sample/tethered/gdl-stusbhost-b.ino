// In this sample:
// - Mount a USB thumb drive formatted as FAT32
// - Open a handle for writing, write "Hello world", and close the write handle
// - Open a handle for reading, read data (expected to be "Hello world"), and close the read handle
// - Unmount the usb
// Reference: https://www.duelink.com/docs/engine/filesystem
// For more FileSystem APIs (Delete, Find, Directory, etc.)
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Serial.println("Mounting usb...");

    float mounted = duelink.FileSystem.Mount(
        2,      // USB thumb drive
        0,      // Ignore
        0,      // Ignore
        4       // Max open handles
    );

    if (mounted < 0) {
        Serial.println("Failed mounting the usb");
        return;
    }

    Serial.println("Open handle for writing...");
    const int WRITE_MODE = 0x02 | 0x08;

    int handle_write = (int)duelink.FileSystem.Open("/test.txt", WRITE_MODE);
    if (handle_write < 0) {
        Serial.println("Opening handle for writing failed");
        return;
    }

    Serial.println("Writing data: \"Hello world\"");
    const char text[] = "Hello world";
    duelink.FileSystem.Write(handle_write, (const uint8_t*)text, sizeof(text) - 1);

    Serial.println("Close handle...");
    duelink.FileSystem.Close(handle_write);

    Serial.println("Open handle for read...");
    const int READ_MODE = 0x01;

    int handle_read = (int)duelink.FileSystem.Open("/test.txt", READ_MODE);
    if (handle_read < 0) {
        Serial.println("Opening handle for reading failed");
        return;
    }

    Serial.println("Read data...");
    uint8_t data_read[11];
    duelink.FileSystem.Read(handle_read, data_read, sizeof(data_read));

    char text_read[12];
    memcpy(text_read, data_read, sizeof(data_read));
    text_read[11] = '\\0';

    char msg[32];
    snprintf(msg, sizeof(msg), "=>>>>>>> Read: %s", text_read);
    Serial.println(msg);

    Serial.println("Close handle...");
    duelink.FileSystem.Close(handle_read);

    duelink.FileSystem.UnMount(0,0,0,0);
    Serial.println("Unmounted!");
}

void loop() {
}
