# Temperature and Humidity 

---

Works with the DHT line of low-cost temperature & humidity sensors. 

- **Temperature.Read(pin, type)** - Reads sensor temperature data on connected pin <br>
**pin:** Pin number <br>
**type:** DHT11 = 11, DHT12 = 12, DHT22 = 22, DHT21 = 21 <br>
**Returns:** Temperature in Celsius. 

- **Humidity.Read(pin, type)** - Reads sensor humidity data on connected pin <br>
**pin:** Pin number <br>
**type:** DHT11 = 11, DHT12 = 12, DHT22 = 22, DHT21 = 21 <br>
**Returns:** Humidity level 0 to 100.

This example reads temperature and humidity every one second, using DHT11 sensor and connected to pin 0.

## [Python](#tab/py)
```basic
while True:
    print(duelink.Humidity.Read(0, 11))
    print(duelink.Temperature.Read(0, 11))

    time.sleep(1)
```

## [JavaScript](#tab/js)
```basic
while (true){
    console.log(await duelink.Humidity.Read(0, 11))
    console.log(await duelink.Temperature.Read(0, 11))

    await Util.sleep(1000)
}
```

## [.NET](#tab/net)
```basic
while (true){
    Console.WriteLine(duelink.Humidity.Read(0, 11));
    Console.WriteLine(duelink.Temperature.Read(0, 11));

    Thread.Sleep(1000);
}
```

---