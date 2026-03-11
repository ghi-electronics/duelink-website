// In this sample:
// Using TeraTerm, connect to the device using TCP/IP (if WiFi is used) or Serial (if Bluetooth is used).
// From TeraTerm, send 1 byte and receive that byte +1. Example: press '1', TeraTerm shows '2'.
// Setup requirements:
// Wireless ESP32 must be configured for WiFi (or Bluetooth) with AT disabled and Bridge mode disabled.

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
async function IsBluetoothConnected() {
    // Pin 5 goes low when Bluetooth is connected
    var ret = await duelink.Engine.ExecuteCommand("dread(5,1)");
    return Number(ret) === 0;
}

async function IsWiFiConnected() {
    // Pin 5 goes low when WiFi is connected
    var ret = await duelink.Engine.ExecuteCommand("dread(5,1)");
    return Number(ret) === 0;
}

async function IsTcpConnected() {
    // Pin 4 goes low when a TCP connection occurs (on mDNS "duelink", port 8080 if default)
    var ret = await duelink.Engine.ExecuteCommand("dread(4,1)");
    return Number(ret) === 0;
}

async function WirelessRead() {
    var ret = await duelink.Engine.ExecuteCommand("wlRead()");
    return Number(ret);
}

async function WirelessReadCount() {
    var ret = await duelink.Engine.ExecuteCommand("wlReadcnt()");
    return Number(ret);
}

async function WirelessWrite(data) {
    await duelink.Engine.ExecuteCommand(`wlWrite(${data})`);
}

async function main() {
    while (true) {

        if (!(await IsWiFiConnected())) {
            console.log("Wait for WiFi connection...");
            await sleep(1000);
            continue;
        }

        if (!(await IsTcpConnected())) {
            console.log("Wait for tcp connection...");
            await sleep(1000);
            continue;
        }

        if ((await WirelessReadCount()) > 0) {
            var d = await WirelessRead();

            console.log(`Received: ${String.fromCharCode(d)}`);
            await WirelessWrite(d + 1);
            console.log(`Sent: ${String.fromCharCode(d + 1)}`);
        }

        await sleep(1000);
    }
}

main();