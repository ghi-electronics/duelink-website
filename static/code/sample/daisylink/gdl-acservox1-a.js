// In this sample:
// Repeatedly set the servo position to 0, 45, 90, 135, and 180, then reset it to 0.
// There is a one-second delay after each change.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function SetServo(position) {
  if (position < 0 || position > 180) return;
  await duelink.Engine.ExecuteCommand(`ServoSt(1,${position})`);
}

async function main() {
  let degree = 0;

  while (true) {
    await SetServo(degree);
    if (degree === 180) {
      degree = 0;
    } else {
      degree += 45;
    }

    await sleep(1000); // 1 second
  }
}

main();

