// In this sample:
// Draw a red circle with white borders.
// Display the text "DUELink" in white at the center of the circle.
// Draw a white rectangle at the top of the circle.
// Display the text "!Smart module!" in red at the top of the circle.
// Show() takes 20 seconds to flush the current buffer to the screen.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Sleep helper (milliseconds → seconds handled correctly)
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}


async function DrawOnBlackWhite() {
  await duelink.Engine.ExecuteCommand("DrawOnBW()");
}

async function DrawOnRed() {
  await duelink.Engine.ExecuteCommand("DrawOnRed()");
}

async function DrawText(text, color, x, y, scalex, scaley) {
  const c = color > 0 ? 1 : 0;
  const cmd = `texts("${text}",${c},${x},${y},${scalex},${scaley})`;
  await duelink.Engine.ExecuteCommand(cmd);
}

async function DrawCircle(color, x, y, radius) {
  const c = color > 0 ? 1 : 0;
  const cmd = `circle(${c},${x},${y},${radius})`;
  await duelink.Engine.ExecuteCommand(cmd);
}

async function Fillrect(color, x, y, width, height) {
  const c = color > 0 ? 1 : 0;
  const cmd = `Fill(${c}, ${x},${y},${width},${height})`;
  await duelink.Engine.ExecuteCommand(cmd);
}

async function Clear(color) {
  const c = color > 0 ? 1 : 0;
  await duelink.Engine.ExecuteCommand(`Clear(${c})`);
}

async function Show() {
  // when show, device is busy ~15 seconds, so there is no respone if timeout less than 15 second.
  // default response timeout is 3 seconds, there will be "No response"  thrown out but not issue.
  //let tmp = duelink.ReadTimeout;
  //duelink.ReadTimeout = 20*1000;
  await duelink.Engine.ExecuteCommand("show()");
  //duelink.ReadTimeout = tmp; 

}


// --- Main sequence ---
DrawOnBlackWhite();
await Clear(0);
await DrawText("DUELink", 1, 60, 70, 2, 3);
await DrawCircle(1, 100, 65, 56);
await DrawCircle(1, 100, 65, 57);
await DrawCircle(1, 100, 65, 63);
await DrawCircle(1, 100, 65, 64);
await Fillrect(1, 53, 40, 95, 20);
await Show();

// Wait for 20 seconds to flush the screen
await sleep(20);

await DrawOnRed();
await Clear(0);
await DrawText("!Smart Modules!", 1, 55, 47, 1, 1);
await DrawCircle(1, 100, 65, 58);
await DrawCircle(1, 100, 65, 59);
await DrawCircle(1, 100, 65, 60);
await DrawCircle(1, 100, 65, 61);
await DrawCircle(1, 100, 65, 62);
await Show();

// Wait for 20 seconds to flush the screen
await sleep(20);
