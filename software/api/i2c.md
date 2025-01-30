# I2C

---

I2C is one of the protocols that is used widely in most sensors.

- **I2c.Write(address, arrayWrite, indexWrite, writeCount)** - Write an array of data to an I2C slave<br>
**address:** I2C slave address<br>
**arrayWrite:** Array to send<br>
**indexWrite:** Index of data in the array (optional, default is 0).<br>
**writeCount:** The number of bytes to write (optional, default is length of array) <br>

- **I2c.Read(address, arrayRead, indexRead, readCount)** - Read data from an I2C slave<br>
**address:** I2C slave address<br>
**arrayRead:** Array to read<br>
**indexRead:** Index of data in the array (optional, default is 0)<br>
**readCount:** The number of bytes to read (optional, default is length of array) <br>

- **I2c.WriteRead(address, arrayWrite, indexWrite, writeCount, arrayRead, indexRead, readCount)** - Write and read data  <br>
**address:** I2C slave address<br>
**arrayWrite:** Array to send<br>
**indexWrite:** Index of data in the array<br>
**writeCount:** The number of bytes to write <br>
**arrayRead:** Array to read<br>
**indexRead:** Index of data in the array <br>
**readCount:** The number of bytes to read <br>


## [Python](#tab/py)

```py
# Write 11 and 22 to a slave at address 0x2C
dataWrite = [11,22]
duelink.I2c.Write(0x2C, dataWrite)

# Read 2 bytes from address 0x2C
dataRead = [0]*2
duelink.I2c.Read(0x2C, dataRead)

# WriteRead from address 0x2C
duelink.I2c.WriteRead(0x2C, dataWrite, 0, len(dataWrite), dataRead, 0, len(dataRead))
```

## [JavaScript](#tab/js)

```js
let dataWrite = [11,22]
let data = new Uint8Array(2)

// Write 11 and 22 to a slave at address 0x2C
await duelink.I2c.Write(0x2C, dataWrite)

// Read 2 bytes from address 0x2C
await duelink.I2c.Read(0x2C, dataRead)

// WriteRead from address 0x2C
await duelink.I2c.WriteRead(0x2C, dataWrite, 0, dataWrite.length, dataRead, 0, dataRead.length)
```

## [.NET](#tab/net)

```cs
var dataWrite = new byte[] {11, 22};
var dataRead = new byte[2];

// Write 11 and 22 to a slave at address 0x2C
duelink.I2c.Write(0x2C, dataWrite);

// Read 2 bytes from address 0x2C
duelink.I2c.Read(0x2C, dataRead);

// WriteRead from address 0x2C
duelink.I2c.WriteRead(0x2C, dataWrite, 0, dataWrite.Length, dataRead, 0, dataRead.Length);
```

---

