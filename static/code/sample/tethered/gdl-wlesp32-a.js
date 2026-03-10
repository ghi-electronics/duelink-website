// In this sample:
// Send AT command AT+GMR
// Read responses (multiple lines)

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

async function ATCmdSend(cmd) {
    await duelink.Engine.ExecuteCommand(`ATCmd("${cmd}")`);
}

async function ATCmdReadLine(timeout) {
    await duelink.Engine.ExecuteCommand(`ReadLine(1, ${timeout})`);

    var data = new Uint8Array(1024);
    await duelink.Stream.ReadBytes("b0", data);

    var decoder = new TextDecoder("utf-8");
    var str = decoder.decode(data);

    return str;
}

async function main() {
    while (true) {
        await ATCmdSend("AT+GMR");

        var line = await ATCmdReadLine(1000);

        while (true) {
            // The version response returns multiple lines, keep reading until the end
            if (line != null && line.length != 0) {
                console.log(line);
                line = await ATCmdReadLine(1000);

                await sleep(1000);
            }
            else {
                break;
            }
        }
    }
}

main();