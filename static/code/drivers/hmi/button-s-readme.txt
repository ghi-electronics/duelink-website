##### Button S Test #####

- Connect button device to test kit by downlink connector side. We call it Device Under Test (DUT)
- Make sure the image shown on the program matchs to DUT exactly. There are few kinds of buttons, be careful!

Important: If wrong device is selected, wrong-OTP will be written to DUT and no way to erase it. The DUT becomes garbage. 

- Once button "Do It all!" on the program is ready, click on that button.
- The program will transfer firmware, OTP, driver and test code to DUT automatically. It will take about few seconds.
- After some progresses, "Device is running Test()" is shown up in progress bar of program, with green color.
    (1) Make sure the status led on test kit is blinking 
    (2) Press the button on DUT: the DUT's status led should be on. 
    (3) Release the button DUT: the DUT's status led should be off.
    
The DUT is considered pass the test if step(1), (2), (3) are happened as above.