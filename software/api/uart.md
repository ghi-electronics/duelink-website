# UART

---

- **Uart.Enable(baudRate)** - Sets the baud rate UART   <br>
**baudRate:** Any commonly used standard baud rate 

- **Uart.Read()** - Read UART data  <br>
**Returns:** A byte read from UART

- **Uart.Write(data)** - Write UART data <br>
**data:** Data byte to send on UART

- **Uart.BytesToRead()** - Count  <br>
**Returns:** How many bytes have been buffered and ready to be read

The example below enables UART at baudrate 115200, check how many bytes buffered, read and plus 1, then send back to sender

## [Python](#tab/py)
```py
duelink.Uart.Enable(115200)
while True:
    if (duelink.Uart.BytesToRead() > 0):    
        data = duelink.Uart.Read()
        duelink.Uart.Write(data + 1)
        time.sleep(0.1)
```

## [JavaScript](#tab/js)
```js
await duelink.Uart.Enable(115200)
while (true){
    if (await duelink.Uart.BytesToRead() > 0){
        let data = await duelink.Uart.Read()
        await duelink.Uart.Write(data + 1)
    }
    await Util.sleep(100)
}
```

## [.NET](#tab/net)
```cs
duelink.Uart.Enable(115200);
while (true){
    if (duelink.Uart.BytesToRead() > 0){
        var data = duelink.Uart.Read();
        duelink.Uart.Write((byte)(data + 1));
    }
    Thread.Sleep(100);
}
```

---