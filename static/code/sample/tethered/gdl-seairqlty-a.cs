// In this sample:
// Read temperature, humidity
// Read Air Quality Index
// Read Total Volatile Organic Compounds
// Read Equivalent CO₂

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

float ReadTemperature() {
    return duelink.Engine.ExecuteCommand("AhtTemp()");
}
float ReadHumidity() {
    return duelink.Engine.ExecuteCommand("AhtHumid()");
}
int AirQualityIndex() {
    return (int)duelink.Engine.ExecuteCommand("EnsAqi()");
}
int TVOC() { //Total Volatile Organic Compounds
    return (int)duelink.Engine.ExecuteCommand("EnsTvoc()");
}
int EquivalentCO2() { //Total Volatile Organic Compounds
    return (int)duelink.Engine.ExecuteCommand("EnsEco2()");
}

while (true) {
    Console.WriteLine($"Temp:  {ReadTemperature()}, Humidity:  {ReadHumidity()}");
    Console.WriteLine($"AirQualityIndex:  {AirQualityIndex()}, TVOC:  {TVOC()}, EquivalentCO2: {EquivalentCO2()}");
    Thread.Sleep(2000);
}

