# SPI

---

- **Spi.Write(arrayWrite, indexWrite, writeCount, chipselect)** - Write data array to device <br>
**arrayWrite:** Array to send<br>
**indexWrite:** Index of data in the array (optional) <br>
**writeCount:** The number of bytes to write (optional) <br>
**chipselect:** Chip select pin (optional) <br>

- **Spi.Read(arrayRead, indexRead, readCount, chipselect)** - Read data from device <br>
**arrayRead:** Array to read<br>
**indexRead:** Index of data in the array (optional)<br>
**readCount:** The number of bytes to read (optional) <br>
**chipselect:** Chip select pin (optional) <br>

- **Spi.WriteRead(arrayWrite, indexWrite, writeCount, arrayRead, indexRead, readCount, chipselect)** - WriteRead data <br>
**arrayWrite:** Array to send<br>
**indexWrite:** Index of data in the array<br>
**writeCount:** The number of bytes to write <br>
**arrayRead:** Array to read<br>
**indexRead:** Index of data in the array <br>
**readCount:** The number of bytes to read <br>
**chipselect:** Chip select pin (optional)  <br>


## [Python](#tab/py)
```py
arrayWrite = [ 0xAA, 0x55, 0xAA, 0x55 ]
arrayRead = [0] * 4
chipselect = 2

duelink.Spi.Write(arrayWrite)
duelink.Spi.Write(arrayWrite, 0, 2, chipselect)

duelink.Spi.Read(arrayRead)
duelink.Spi.Read(arrayRead, 0, 2, chipselect)

duelink.Spi.WriteRead(arrayWrite, 0, arrayWrite.Length, arrayRead, 0, arrayRead.Length, chipselect)
```

## [JavaScript](#tab/js)
```js
let arrayWrite = [ 0xAA, 0x55, 0xAA, 0x55 ]
let arrayRead = new Uint8Array(4)
let chipselect = 2;

await duelink.Spi.Write(arrayWrite)
await duelink.Spi.Write(arrayWrite, 0, 2, chipselect)

await duelink.Spi.Read(arrayRead)
await duelink.Spi.Read(arrayRead, 0, 2, chipselect)

await duelink.Spi.WriteRead(arrayWrite, 0, arrayWrite.Length, arrayRead, 0, arrayRead.Length, chipselect)
```

## [.NET](#tab/net)
```cs
var arrayWrite = new byte[4] { 0xAA, 0x55, 0xAA, 0x55 };
var arrayRead = new byte[4];
var chipselect = 2;

duelink.Spi.Write(arrayWrite); 
duelink.Spi.Write(arrayWrite, 0, 2, chipselect);

duelink.Spi.Read(arrayRead);
duelink.Spi.Read(arrayRead, 0, 2, chipselect);

duelink.Spi.WriteRead(arrayWrite, 0, arrayWrite.Length, arrayRead, 0, arrayRead.Length, chipselect);
```

---