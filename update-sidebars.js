// Script to update sidebars.js to remove revision suffixes
const fs = require('fs');
const path = require('path');

// Read the sidebars.js file
const sidebarPath = path.join(__dirname, 'sidebars.js');
let content = fs.readFileSync(sidebarPath, 'utf8');

// List of all products that need updating (removing -a, -b, -c, -d, -e suffixes)
const replacements = [
  // Microcomputers
  ['products/cincobit-e', 'products/cincobit'],
  ['products/clipit-b', 'products/clipit'],
  ['products/dueduino-a', 'products/dueduino'],
  ['products/duestem-b', 'products/duestem'],
  ['products/pixobit-d', 'products/pixobit'],
  ['products/stamp-a', 'products/stamp'],
  ['products/stick-a', 'products/stick'],
  
  // Special
  ['products/ghizzy-jr-a', 'products/ghizzy-jr'],
  ['products/ghizzy-b', 'products/ghizzy'],
  ['products/holiday-tree-b', 'products/holiday-tree'],
  
  // Displays
  ['products/epaper-m29-a', 'products/epaper-m29'],
  ['products/epaper-m42-a', 'products/epaper-m42'],
  ['products/hdmi-b', 'products/hdmi'],
  ['products/lcd-16x2-c', 'products/lcd-16x2'],
  ['products/lcd-20x4-b', 'products/lcd-20x4'],
  ['products/portal-cp70-b', 'products/portal-cp70'],
  ['products/tft-cp23-b', 'products/tft-cp23'],
  ['products/tft-n18-b', 'products/tft-n18'],
  ['products/tft-r128-b', 'products/tft-r128'],
  ['products/tft-t32-c', 'products/tft-t32'],
  ['products/vfd-b8-c', 'products/vfd-b8'],
  
  // Actuators
  ['products/fan-b', 'products/fan'],
  ['products/load-a', 'products/load'],
  ['products/motomax-b', 'products/motomax'],
  ['products/mototwin-b', 'products/mototwin'],
  ['products/relay-p16-a', 'products/relay-p16'],
  ['products/relay-p4-c', 'products/relay-p4'],
  ['products/relay-x1-a', 'products/relay-x1'],
  ['products/servo-p8-b', 'products/servo-p8'],
  ['products/servo-x1-a', 'products/servo-x1'],
  ['products/steppulse-a', 'products/steppulse'],
  ['products/stepdrive-p1-a', 'products/stepdrive-p1'],
  ['products/stepdrive-p3-b', 'products/stepdrive-p3'],
  
  // Communication
  ['products/can-b', 'products/can'],
  ['products/dmx-b', 'products/dmx'],
  ['products/ethernet-c', 'products/ethernet'],
  ['products/midi-a', 'products/midi'],
  ['products/rs485-a', 'products/rs485'],
  ['products/serial-usb-a', 'products/serial-usb'],
  ['products/usb-host-b', 'products/usb-host'],
  ['products/usb-client-a', 'products/usb-client'],
  
  // HMI
  ['products/button-ar100-b', 'products/button-ar100'],
  ['products/btn-rgb28x4-b', 'products/btn-rgb28x4'],
  ['products/button-l-a', 'products/button-l'],
  ['products/button-l7-b', 'products/button-l7'],
  ['products/button-s-a', 'products/button-s'],
  ['products/dial-a', 'products/dial'],
  ['products/dipswitch-b', 'products/dipswitch'],
  ['products/fingerprint-b', 'products/fingerprint'],
  ['products/joystick-l-b', 'products/joystick-l'],
  ['products/keypad-3x4-b', 'products/keypad-3x4'],
  ['products/keypad-4x4-b', 'products/keypad-4x4'],
  ['products/rotary-c', 'products/rotary'],
  
  // Storage
  ['products/flash-a', 'products/flash'],
  ['products/sd-card-b', 'products/sd-card'],
  ['products/microsd-a', 'products/microsd'],
  
  // Wireless
  ['products/gnss-wa-a', 'products/gnss-wa'],
  ['products/gnss-b', 'products/gnss'],
  ['products/infrared-a', 'products/infrared'],
  ['products/nrf24-max-c', 'products/nrf24-max'],
  ['products/nrf24-min-c', 'products/nrf24-min'],
  ['products/rfid-b', 'products/rfid'],
  
  // Sensors
  ['products/accel-a', 'products/accel'],
  ['products/airquality-a', 'products/airquality'],
  ['products/barometer-b', 'products/barometer'],
  ['products/clipsense-a', 'products/clipsense'],
  ['products/current-a', 'products/current'],
  ['products/distance-b', 'products/distance'],
  ['products/dof9-c', 'products/dof9'],
  ['products/ekg-a', 'products/ekg'],
  ['products/gas-b', 'products/gas'],
  ['products/light-a', 'products/light'],
  ['products/motion-b', 'products/motion'],
  ['products/pressure-b', 'products/pressure'],
  ['products/rtc-b', 'products/rtc'],
  ['products/temphmd-b', 'products/temphmd'],
  ['products/temprtd-b', 'products/temprtd'],
  
  // LEDs (already done earlier)
  ['products/smart-led-a', 'products/smart-led'],
  
  // Sound
  ['products/buzzer-b', 'products/buzzer'],
  ['products/mp3-a', 'products/mp3'],
  ['products/radio-fm-a', 'products/radio-fm'],
  ['products/spectrum-a', 'products/spectrum'],
  
  // Vision
  ['products/barcode-l1d2d-a', 'products/barcode-l1d2d'],
  ['products/thermal-a', 'products/thermal'],
  
  // Adapters
  ['products/dio-x12-a', 'products/dio-x12'],
  ['products/dueclick-a', 'products/dueclick'],
  ['products/duepi-b', 'products/duepi'],
  ['products/duepico-b', 'products/duepico']
];

// Apply all replacements
replacements.forEach(([oldPath, newPath]) => {
  const regex = new RegExp(`"${oldPath}"`, 'g');
  content = content.replace(regex, `"${newPath}"`);
});

// Write the updated content back
fs.writeFileSync(sidebarPath, content);
console.log('Successfully updated sidebars.js');