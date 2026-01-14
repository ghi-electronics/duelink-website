// In this sample:
// Scan all switches and show if any switch is ON position

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
async function Read(index) {
    const ret = await duelink.Engine.ExecuteCommand(`Read(${index})`);
    return ret !== 0;
}

(async () => {
    while (true) {
        for (let i = 0; i < 10; i++) {
            if (await Read(i + 1)) {
                console.log(`Detected ON on switch index: ${i + 1}`);
            }
        }

        await sleep(1000); 
    }
})();