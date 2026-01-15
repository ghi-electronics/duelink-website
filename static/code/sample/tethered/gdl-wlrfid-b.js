// In this sample:
// Detect and display the RFID card number when the card is close enough

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
async function IsCard() {
    const ret = await duelink.Engine.ExecuteCommand("IsCard()");
    return ret === 1;
}


async function ReadCard(cardNumber) {
    await duelink.Engine.ExecuteCommand("dim b1[16]");
    await duelink.Engine.ExecuteCommand("ReadCard(b1)");

    await duelink.Stream.ReadBytes("b1", cardNumber);
}


(async function main() {
    while (true) {
        if (await IsCard()) {
            console.log("Card detected:");
            const num = new Uint8Array(16);

            await ReadCard(num);

            let output = "";
            for (let i = 0; i < 16; i++) {
                output += num[i].toString(16).padStart(2, "0");
                if (i < 16 - 1) {
                    output += ":";
                }
            }
            console.log(output);
        }

        await sleep(500);
    }
})();