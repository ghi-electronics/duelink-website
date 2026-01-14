// In this sample:
// Detect a fingerprint and store it in the system
// Compare the detected fingerprint with the stored fingerprints

using System;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Initialize() {
    var init = 1;

    Console.WriteLine("Wait for initialize, setting baudrate....");
    while (init != 0) {
        init = (int)duelink.Engine.ExecuteCommand("Init()");
        Thread.Sleep(1000);
    }
    Console.WriteLine("Initialize done.");
}

int GetSavedCount() {
    var ret = (int)duelink.Engine.ExecuteCommand("GetSavedCnt()");
    return ret;
}

void DeleteModel(int location) {
    duelink.Engine.ExecuteCommand($"DelModel({location})");
}

int TakeImg() {
    var ret = (int)duelink.Engine.ExecuteCommand("TakeImg()");
    return ret;
}

int ConvertImg(int id) {
    // id: 1: first time
    //     2: second time when confirm the finger
    var ret = (int)duelink.Engine.ExecuteCommand($"ConvertImg({id})");
    return ret;
}

int CreateModel() {
    var ret = (int)duelink.Engine.ExecuteCommand("CreateModel()");
    return ret;
}

int StoreModel(int location) {
    var ret = (int)duelink.Engine.ExecuteCommand($"StoreModel({location})");
    return ret;
}

int FastSearch() {
    var ret = (int)duelink.Engine.ExecuteCommand("FastSearch()");
    return ret;
}

void SetColor(int color, bool blink, int count) {
    // color: 0: off, 1:red; 2: blue; 3: purple
    var b = blink ? 1 : 0; // 1 blink; 0: always on
    // count: blink count, only applied when blink is true, 0: blink forever

    duelink.Engine.ExecuteCommand($"SetLed({color},{b},{count})");
}

bool DetectFinger() {
    // This detect finger on surface, not matched finger
    var ret = duelink.Digital.Read(4, DUELinkController.InputType.PullUp);
    return !ret;
}

var s = GetSavedCount();

if (s > 0) {
    Console.WriteLine("Detected saved, deleting....");
    DeleteModel(1);
    s = GetSavedCount();
    Console.WriteLine($"After deleted, count: {s}");
}

while (s == 0) {
    Thread.Sleep(1000);
    Console.WriteLine("No saved fingerprint found, need to add");

    if (DetectFinger()) { //# pin 4 is low: detected user finger on surface
        //duelink.Engine.ExecuteCommand("SetLed(1,1,0)"); //# Setting: Blink Red
        SetColor(1, true, 0); //Setting: Blink Red

        Console.WriteLine("Taking image of your fingerprint.....");

        while (TakeImg() != 0) {
            Console.WriteLine("Bad image! Try again");
            Thread.Sleep(1000);
        }
        Console.WriteLine("Please wait for converting....");
        while (ConvertImg(1) != 0) {
            Console.WriteLine("Bad Convert image! Try again");
            Thread.Sleep(1000);
        }

        Console.WriteLine("Converted. Remove your finger");

        while (DetectFinger()) { //# Wait till user remove their finger
            Thread.Sleep(1);
        }

        Thread.Sleep(100);

        Console.WriteLine("Place your same fingerprint again, we need to take image twice");

        while (!DetectFinger()) { //# Wait till user place their finger again
            Thread.Sleep(100);
        }

        while (TakeImg() != 0) { //# 0 FINGERPRINT_OK 
            Console.WriteLine("Bad image! Try again");
            Thread.Sleep(1000);
        }

        Console.WriteLine("Please wait for converting....");

        while (ConvertImg(2) != 0) {
            Console.WriteLine("Bad Convert image! Try again");
            Thread.Sleep(1000);
        }

        Console.WriteLine("Converted");

        if (CreateModel() == 0) { //# create model
            if (StoreModel(1) == 0) { //# store to location 1
                s = GetSavedCount();

                if (s > 0) {
                    Console.WriteLine("Your finger is saved. Remove your finger");
                    //duelink.Engine.ExecuteCommand("SetLed(2,0,0)"); //# Set led Blue
                    SetColor(2, false, 0); //Set led Blue, stay on
                }
            }
        }

    }
    Thread.Sleep(100);
}


while (DetectFinger()) {
    Thread.Sleep(500);
    Console.WriteLine("Remove your finger!!!!");
}

var found = false;

while (!found) {
    if (DetectFinger()) { //# pin 4 is low: detected user finger on surface
        //duelink.Engine.ExecuteCommand("SetLed(3,0,0)"); //# Turn led to purple
        SetColor(3, false, 0); //Set led purple, stay on
        Console.WriteLine("Detect finger. Taking image of your finger.....");

        while (TakeImg() != 0) { //# 0 FINGERPRINT_OK 
            Console.WriteLine("Bad image! Try again");
            Thread.Sleep(1000);
        }

        Console.WriteLine("Please wait for converting....");

        while (ConvertImg(1) != 0) {
            Console.WriteLine("Bad Convert image! Try again");
            Thread.Sleep(1000);
        }

        Console.WriteLine("Converted");

        if (FastSearch() == 0) {
            Console.WriteLine("Your finger FOUND in our database");
            //duelink.Engine.ExecuteCommand("SetLed(2,0,0)"); //# Turn led to Blue
            SetColor(2, false, 0); //Set led Blue, stay on
            found = true;
        }
        else {
            Console.WriteLine("Your finger does NOT match in our database");
        }
    }
    Thread.Sleep(100);
}


