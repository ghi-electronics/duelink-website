// In this sample:
// Read X,Y,Z and Temperature on DOF9

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
async function GetX() {
    return parseInt(await duelink.Engine.ExecuteCommand("_x"));
}

async function GetY() {
    return parseInt(await duelink.Engine.ExecuteCommand("_y"));
}

async function GetZ() {
    return parseInt(await duelink.Engine.ExecuteCommand("_z"));
}

async function GetTemperature() {
    return await duelink.Engine.ExecuteCommand("_t");
}

async function ActiveAccel() {
    await duelink.Engine.ExecuteCommand("RAccel()");
}

async function ActiveGyro() {
    await duelink.Engine.ExecuteCommand("RGyro()");
}

async function ActiveCompass() {
    await duelink.Engine.ExecuteCommand("RCompass()");
}

async function mainLoop() {
    while (true) {
        await ActiveAccel();
        console.log(`Accel X = ${await GetX()}, Y = ${await GetY()}, Z = ${await GetZ()}`);

        await ActiveGyro();
        console.log(`Gyro X = ${await GetX()}, Y = ${await GetY()}, Z = ${await GetZ()}, Temperature = ${await GetTemperature()}`);

        await ActiveCompass();
        console.log(`Compass X = ${await GetX()}, Y = ${await GetY()}, Z = ${await GetZ()}`);

        await sleep(2000); // 2 seconds
    }
}

mainLoop();