// In this sample:
// Detect and display the RFID card number when the card is close enough

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsCard() {
    var ret = duelink.Engine.ExecuteCommand("IsCard()");
    return ret == 1;
}

void ReadCard(byte[] cardNumber) {
    duelink.Engine.ExecuteCommand("dim b1[16]");
    duelink.Engine.ExecuteCommand("ReadCard(b1)");

    duelink.Stream.ReadBytes("b1", cardNumber);
}

while (true) {
    if (IsCard()) {
        Console.WriteLine("Card detected:");
        var num = new byte[16];

        ReadCard(num);

        for (var i = 0; i < 16; i++) {
            var n = num[i].ToString("x2");
            Console.Write($"{n}");
            if (i < 16-1) {
                Console.Write(":");
            }
        }
        Console.WriteLine();
    }

    Thread.Sleep(500);
}
