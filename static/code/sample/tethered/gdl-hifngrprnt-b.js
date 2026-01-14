// In this sample:
// Detect a fingerprint and store it in the system
// Compare the detected fingerprint with the stored fingerprints

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
async function Initialize() {
    let init = 1;

    console.log("Wait for initialization, setting baudrate....");
    while (init !== 0) {
        init = parseInt(await duelink.Engine.ExecuteCommand("Init()"));
        await sleep(1000);
    }
    console.log("Initialization done.");
}

async function GetSavedCount() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("GetSavedCnt()"));
    return ret;
}

async function DeleteModel(location) {
    await duelink.Engine.ExecuteCommand(`DelModel(${location})`);
}

async function TakeImg() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TakeImg()"));
    return ret;
}

async function ConvertImg(id) {
    // id: 1 = first time
    //     2 = second time when confirming the finger
    const ret = parseInt(await duelink.Engine.ExecuteCommand(`ConvertImg(${id})`));
    return ret;
}

async function CreateModel() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("CreateModel()"));
    return ret;
}

async function StoreModel(location) {
    const ret = parseInt(await duelink.Engine.ExecuteCommand(`StoreModel(${location})`));
    return ret;
}

async function FastSearch() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("FastSearch()"));
    return ret;
}

async function SetColor(color, blink, count) {
    // color: 0 = off, 1 = red, 2 = blue, 3 = purple
    const b = blink ? 1 : 0; // 1 = blink, 0 = always on
    // count: blink count, only applied when blink is true, 0 = blink forever
    await duelink.Engine.ExecuteCommand(`SetLed(${color},${b},${count})`);
}

async function DetectFinger() {
    // Detect a finger on the surface, not matching a stored fingerprint
    const ret = await duelink.Digital.Read(4, 1);
    return !ret;
}

(async () => {
    let s = await GetSavedCount();

    if (s > 0) {
        console.log("Saved fingerprint detected, deleting....");
        await DeleteModel(1);
        s = await GetSavedCount();
        console.log(`After deletion, count: ${s}`);
    }

    while (s === 0) {
        await sleep(1000);
        console.log("No saved fingerprint found, need to add.");

        if (await DetectFinger()) { // Pin 4 is low: user finger detected on surface
            // Set LED to blink red
            await SetColor(1, true, 0);
            console.log("Taking image of your fingerprint.....");

            while ((await TakeImg()) !== 0) {
                console.log("Bad image! Try again");
                await sleep(1000);
            }

            console.log("Please wait while converting....");
            while ((await ConvertImg(1)) !== 0) {
                console.log("Bad conversion! Try again");
                await sleep(1000);
            }

            console.log("Converted. Remove your finger.");

            while (await DetectFinger()) { // Wait until user removes finger
                await sleep(1);
            }

            await sleep(100);
            console.log("Place the same fingerprint again, we need to take image twice.");

            while (!(await DetectFinger())) { // Wait until user places finger again
                await sleep(100);
            }

            while ((await TakeImg()) !== 0) { // 0 = FINGERPRINT_OK
                console.log("Bad image! Try again");
                await sleep(1000);
            }

            console.log("Please wait while converting....");

            while ((await ConvertImg(2)) !== 0) {
                console.log("Bad conversion! Try again");
                await sleep(1000);
            }

            console.log("Converted");

            if ((await CreateModel()) === 0) { // Create model
                if ((await StoreModel(1)) === 0) { // Store to location 1
                    s = await GetSavedCount();
                    if (s > 0) {
                        console.log("Your finger is saved. Remove your finger.");
                        await SetColor(2, false, 0); // Set LED blue, stay on
                    }
                }
            }
        }

        await sleep(100);
    }

    while (await DetectFinger()) {
        await sleep(500);
        console.log("Remove your finger!!!!");
    }

    let found = false;

    while (!found) {
        if (await DetectFinger()) { // Pin 4 is low: user finger detected on surface
            await SetColor(3, false, 0); // Set LED purple, stay on
            console.log("Finger detected. Taking image of your finger.....");

            while ((await TakeImg()) !== 0) { // 0 = FINGERPRINT_OK
                console.log("Bad image! Try again");
                await sleep(1000);
            }

            console.log("Please wait while converting....");

            while ((await ConvertImg(1)) !== 0) {
                console.log("Bad conversion! Try again");
                await sleep(1000);
            }

            console.log("Converted");

            if ((await FastSearch()) === 0) {
                console.log("Your finger FOUND in the database");
                await SetColor(2, false, 0); // Set LED blue, stay on
                found = true;
            } else {
                console.log("Your finger does NOT match any in the database");
            }
        }

        await sleep(100);
    }
})();