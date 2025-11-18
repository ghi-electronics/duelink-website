const { SerialUSB } = require("dlserialusb");
const { DUELinkController } = require("duelink");

let duelink = new due.DUELinkController(new SerialUSB());
await duelink.Connect();

async function setLeftEye(red, green, blue) {
    const cmd = `LEye(${red},${green},${blue})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function setRightEye(red, green, blue) {
    const cmd = `REye(${red},${green},${blue})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function isButtonPressed() {
    const cmd = "dread(20,2)";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret === 1;
}

// Use ExecuteCommand to send standard library
await duelink.Engine.ExecuteCommand("statled(100, 100, 0)");

// Use defined function
while (true) {
    let delay = 500;
    const btnPress = await isButtonPressed();

    if (btnPress) {
        delay = 100;
    }
    
    await setLeftEye(255, 255, 255);
    await setRightEye(255, 255, 255);
    await new Promise(resolve => setTimeout(resolve, delay));
    await setLeftEye(0, 0, 0);
    await setRightEye(0, 0, 0);
    await new Promise(resolve => setTimeout(resolve, delay));
}
