# CAN

---

- **Can.Initialize(baudrate)** - Initialize CAN with special baudrate <br>
**baudrate:**  Accepts 125000, 250000, 500000, 1000000 <br>

- **Can.InitializeExt(phase1, phase2, prescaler, synchronizationJumpWidth)** - User defined baudrate. Max 1000000 (1Mbs)  <br>
**phase1**: Time segment 1. Max is 15 <br>
**phase2**: Time segment 2. Max is 7 <br>
**prescaler**: Baudrate prescaler, this value defines the length of a time quanta. Max is 1023 <br>
**synchronizationJumpWidth**: Synchronization jump width. Max is 3 <br>

- **Can.Available()** - Count  <br>
**Returns:** How many messages have been buffered and ready to be read

- **Can.Write(message)** - Write message <br>
**message:** Message to send on CAN

- **Can.Read()** - Read message <br>
**Return:** Message from CAN

> [!NOTE]
> CAN peripheral clock is 80MHz

## CanMessage

To send or received a message, CanMessage class is used

- **Id** - CAN id <br>
- **Extended** - Extended flag  <br>
- **RemoteRequest** - RemoteRequest flag <br>
- **Length** - Length of data, max is 8 <br>
- **Data** - Array, max 8 bytes <br>

The example below initialize CAN at 500Kbs, check any message available, read, increase ID by 1 and write it back to sender

## [Python](#tab/py)
```py
duelink.Can.Initialize(500000)

while True :
    if (duelink.Can.Available() > 0):    
        message = duelink.Can.Read()

        # print received message detail
        print(f"id: {message.Id}, ext: {message.Extended}, rtr: {message.RemoteRequest}, data: {message.Data[0]}, {message.Data[1]}, {message.Data[2]}, {message.Data[3]}, {message.Data[4]}, {message.Data[5]}, {message.Data[6]}, {message.Data[7]}")
        
        # Increase message.Id by 1
        message.Id = message.Id + 1
        
        # send back to sender
        duelink.Can.Write(message)
    
    time.sleep(1)
```

> [!TIP]
> To use CanMessage class, need to import:  
> ```from DUELink.Can import CanMessage```

## [JavaScript](#tab/js)
```js
await duelink.Can.Initialize(500000)

while (true) {
    if (await duelink.Can.Available() > 0){
        let message = await duelink.Can.Read()
       
        // print received message detail
        console.log(`id: ${message.Id}, ext: ${message.Extended}, rtr: ${message.RemoteRequest}, data: ${message.Data[0]}, ${message.Data[1]}, ${message.Data[2]}, ${message.Data[3]}, ${message.Data[4]}, ${message.Data[5]}, ${message.Data[6]}, ${message.Data[7]}`)

        // Increase message.Id by 1
        message.Id += 1

        // send back to sender
        await duelink.Can.Write(message)
    }
    await Util.sleep(1000)
}
```

> [!TIP]
> To use CanMessage class, need to import:  
> ```import { CanMessage } from './duelink.js'```

## [.NET](#tab/net)
```cs
duelink.Can.Initialize(500000);

while (true) {
    if (duelink.Can.Available() > 0){
        var message = duelink.Can.Read();

        // print received message detail
        Console.WriteLine($"id: {read.Id}, ext: {read.Extended}, rtr: {read.RemoteRequest}, data: {read.Data[0]}, {read.Data[1]}, {read.Data[2]}, {read.Data[3]}, {read.Data[4]}, {read.Data[5]}, {read.Data[6]}, {read.Data[7]}");
        
        // Increase message.Id by 1
        message.Id += 1

        // send back to sender
        duelink.Can.Write(message);
    }
    Thread.Sleep(1000);
}
```

---


