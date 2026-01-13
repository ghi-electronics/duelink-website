// In this sample:
// Send the message: "Hello, I am DUELink\r\n" to the PC.
// Receive the message from the PC: "Hello, I am PC".
// Check https://www.duelink.com/docs/products/cmethernet-c?show=tie-samples&lang=dotnet for reference on setting up the client on a PC.
// Require: Ethernet_Generic library

#include <SoftwareSerial.h> 
#include <SPI.h>
#include <Ethernet_Generic.h>

const int _c = 19; // CS
const int _i = 7;  // Interrupt - no need
const int _r = 15; // Reset

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial softwareSerial(PA2, PA3);
EthernetServer server(5000);   // Listen on port 5000
EthernetClient client;

void setup() {
    pinMode(getpin(0), OUTPUT);
    softwareSerial.begin(9600);
    softwareSerial.println("Starting....");

    // Setup SPI pins
    
    SPI.setMISO(PB4);
    SPI.setMOSI(PB5);
    SPI.setSCLK(PB3);
    SPI.setBitOrder(MSBFIRST);
    SPI.begin();

    // Reset W5500
    pinMode(getpin(_r), OUTPUT);
    pinMode(getpin(_c), OUTPUT);
    digitalWrite(getpin(_r), LOW);
    delay(50);
    digitalWrite(getpin(_r), HIGH);
    digitalWrite(getpin(_c), HIGH);
    delay(100);

     // Initialize Ethernet
    
    byte mac[6] = {0xDE,0xAD,0xBE,0xEF,0xFE,0xED};

    IPAddress ip(192, 168, 0, 50);       // Your device IP
    IPAddress gateway(192, 168, 0, 1);   // Gateway (usually your router)
    IPAddress subnet(255, 255, 255, 0);  // Subnet mask
    IPAddress dns(8, 8, 8, 8);           // DNS server (optional)

    Ethernet.init(getpin(_c)); // Only CS
    bool use_dhcp = 0;
    
    if (use_dhcp) {
        if (Ethernet.begin(mac) == 0) {
            softwareSerial.println("Failed to configure Ethernet using DHCP");
            // Check for Ethernet hardware present
            if (Ethernet.hardwareStatus() == EthernetNoHardware) {
                softwareSerial.println("Ethernet shield not found.");
            }
        } else {
            softwareSerial.print("DHCP: IP address: ");
            softwareSerial.println(Ethernet.localIP());
        }
    }
    else
    {
        Ethernet.begin(mac, ip, dns, gateway, subnet);
        softwareSerial.print("Static IP: ");
        softwareSerial.println(Ethernet.localIP());
    }   
    softwareSerial.println("Ethernet ready");    
}

void loop() { 
    
    client = server.available(); // Accept client if any
     if (client) {
        softwareSerial.println("Client connected!");

        // Send welcome message
        const char* welcome = "Hello, I am DUELink\r\n";
        client.write((const uint8_t*)welcome, strlen(welcome));
        softwareSerial.print("Sent: "); softwareSerial.println(welcome);

        // Receive data from client
        while (client.connected()) {
            if (client.available()) {
                char buf[128];
                int len = client.read((uint8_t*)buf, sizeof(buf)-1);
                buf[len] = '\0';
                softwareSerial.print("Received: "); softwareSerial.println(buf);

                // Echo back to client
                client.write((const uint8_t*)buf, len);
            }
        }

        client.stop();
        softwareSerial.println("Client disconnected");
    }
}

