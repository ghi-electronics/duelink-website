// In this sample:
// Read temperature, humidity
// Read Air Quality Index
// Read Total Volatile Organic Compounds
// Read Equivalent CO₂


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
async function ReadTemperature() {
    return await duelink.Engine.ExecuteCommand("AhtTemp()");
}

async function ReadHumidity() {
    return await duelink.Engine.ExecuteCommand("AhtHumid()");
}

async function AirQualityIndex() {
    return parseInt(await duelink.Engine.ExecuteCommand("EnsAqi()"));
}

async function TVOC() {  // Total Volatile Organic Compounds
    return parseInt(await duelink.Engine.ExecuteCommand("EnsTvoc()"));
}

async function EquivalentCO2() {  // Equivalent CO₂
    return parseInt(await duelink.Engine.ExecuteCommand("EnsEco2()"));
}

(async function main() {
    while (true) {
        const temp = await ReadTemperature();
        const hum = await ReadHumidity();
        const aqi = await AirQualityIndex();
        const tvoc = await TVOC();
        const eco2 = await EquivalentCO2();

        console.log(`Temp: ${temp}, Humidity: ${hum}`);
        console.log(`AirQualityIndex: ${aqi}, TVOC: ${tvoc}, EquivalentCO2: ${eco2}`);

        await sleep(2000); // 2 seconds
    }
})();
