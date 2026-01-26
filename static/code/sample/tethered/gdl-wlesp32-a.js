// In this sample:
// Enable Wi-Fi and set the multicast DNS name to "duelink".
// A TCP client (for example, the Tera Term application) can connect to
// "duelink" on port 8080 to send and receive commands.

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
    const ret = await duelink.Engine.ExecuteCommand("dread(5,1)");
    return ret === 0;
}

async function IsWiFiConnected() {
    const ret = await duelink.Engine.ExecuteCommand("dread(5,1)");
    return ret === 0;
}

async function IsSocketConnected() {
    const ret = await duelink.Engine.ExecuteCommand("dread(4,1)");
    return ret === 0;
}

async function StartBluetooth(name) {
    await duelink.Engine.ExecuteCommand(`StartBT("${name}")`);
}

async function StartWiFi(ssid, pwd) {
    await duelink.Engine.ExecuteCommand(`StartWiFi("${ssid}","${pwd}")`);
}

async function SetMulticastDns(mdns_name) {
    await duelink.Engine.ExecuteCommand(`StartTcp("${mdns_name}")`);
}

async function EnableBrigde() {
    await duelink.Engine.ExecuteCommand("Bridge()");
}

// Start Wi-Fi connection
await StartWiFi("ssid", "pwd");

// The Wi-Fi connection can take up to 30 seconds.
// For testing, sleep for 10 seconds first.
await sleep(1000 * 10);

while ((await IsWiFiConnected()) === false) {
    await sleep(1000);
    console.log("Waiting for Wi-Fi connection...");
}

await SetMulticastDns("duelink");

while ((await IsSocketConnected()) === false) {
    await sleep(1000);
    console.log("Waiting for TCP connection...");
}

await EnableBrigde();

console.log("The bridge is ready for sending and receiving commands from TeraTerm");