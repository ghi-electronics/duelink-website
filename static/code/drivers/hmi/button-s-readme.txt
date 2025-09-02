##### Button S Test #####

We call the button S is Device Under Test (DUT) 
- Connect the button S to the test Kit. The wire has nut will go to U socket. The other wire has no nut will go to D socket.
- From Programmer, select "Button L Rev A" under Hmi from list view menu.
- Make sure the image shown on the program matchs to the button S exactly. There are few kinds of buttons, be careful!

Important: If wrong DUT is selected, wrong-OTP will be written to DUT and no way to erase it. The DUT becomes garbage. 

- Wait 1-2 seconds for the Programmer detects device mode.
- Once button "Do It all!" on the program is ready, click on that button.
- The program will transfer firmware, OTP, driver and test code to DUT automatically. It will take about few seconds.
- At the final step, "Device is running Test()" is shown up in progress bar of program, with green color.
(1) Press the button on DUT: the DUT's status led should off. 
(2) Release the button on DUE: the DUT's status led should on. 

The test is PASSED if (1) and (2) are done exactly with those behaviors.
    