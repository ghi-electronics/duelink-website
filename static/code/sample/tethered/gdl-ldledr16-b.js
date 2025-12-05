// In this sample:
// Scan from led D1 to led D16

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function SetLed(index, value) {
  const val = value ? 1 : 0;
  await duelink.Engine.ExecuteCommand(`SetLed(${index},${val})`);
}

async function main() {
  let count = 0;

  while (true) {
    await SetLed((count % 16) + 1, Math.floor(count / 16) % 2 === 0);
    count++;
    await sleep(100); // 100 ms
  }
}

main();

