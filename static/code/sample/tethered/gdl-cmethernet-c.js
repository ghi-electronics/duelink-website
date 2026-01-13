// In this sample:
// Implement Listen, Accept, Send, Receive, and Available.
// Send the message: "Hello, I am DUELink\r\n" to the PC.
// Receive the message from the PC: "Hello, I am PC".
// Check https://www.duelink.com/docs/products/cmethernet-c?show=tie-samples&lang=dotnet for reference on setting up the client on a PC.

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
async function Initialize(ip_add, gw_add) {
    const ip = ip_add.split('.').map(x => parseInt(x));
    const gw = gw_add.split('.').map(x => parseInt(x));

    const cmd = `Init([${ip[0]},${ip[1]},${ip[2]},${ip[3]}],[${gw[0]},${gw[1]},${gw[2]},${gw[3]}],[255,255,255,0])`;
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return parseInt(ret);
}

async function Listen(socket, port) {
    const cmd = `Listen(${socket},${port})`;
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return parseInt(ret);
}

async function Accept(socket) {
    const cmd = `Accept(${socket})`;
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return parseInt(ret);
}

async function Send(socket, data) {
    const to_write = Buffer.from(data, 'utf-8');
    await duelink.Engine.ExecuteCommand(`dim b6[${to_write.length}]`);

    for (let i = 0; i < to_write.length; i++) {
        await duelink.Engine.ExecuteCommand(`b6[${i}]=${to_write[i]}`);
    }

    const cmd = `Send(${socket},b6)`;
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return parseInt(ret);
}

async function Receive(socket, data) {
    await duelink.Engine.ExecuteCommand(`dim b7[${data.length}]`);
    const rev_len = parseInt(await duelink.Engine.ExecuteCommand(`Recv(${socket},b7)`));

    const len = rev_len < data.length ? rev_len : data.length;

    for (let i = 0; i < len; i++) {
        data[i] = parseInt(await duelink.Engine.ExecuteCommand(`b7[${i}]`));
    }

    return len;
}

async function Available(socket) {
    const ret = parseInt(await duelink.Engine.ExecuteCommand(`Avail(${socket})`));
    return ret;
}

// -----------------------
// Main Program
// -----------------------
(async () => {
    await Initialize("192.168.0.50", "192.168.0.1");
    const socket = 0;
    const port = 5000;

    while (true) {
        await sleep(1000); // 1000 ms

        await Listen(socket, port);
        console.log("Listening...");
        await Accept(socket);

        console.log("Socket connected!");
        await Send(socket, "Hello, I am DUELink\r\n");

        while (true) {
            await sleep(1); // 1 ms
            const read = await Available(socket);

            if (read !== 0) {
                const data = new Uint8Array(read);
                await Receive(socket, data);
                const msg = Buffer.from(data).toString('utf-8');
                if (msg) {
                    console.log(msg);
                }
            }
        }
    }
})();