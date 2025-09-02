##### Button L Test #####

- Connect the button L device to PC by USB hook on U socket. We call the button device is DUT.
- Connect DUT to the test kit by D socket. 
- Select "Button L Rev A" under Hmi from list view menu.
- Make sure the image shown on the program matchs to DUT exactly. There are few kinds of buttons, be careful!

Important: If wrong DUT is selected, wrong-OTP will be written to DUT and no way to erase it. The DUT becomes garbage. 

- Once button "Do It all!" on the program is ready, click on that button.
- The program will transfer firmware, OTP, driver and test code to DUT automatically. It will take about few seconds.
- At the final step, "Device is running Test()" is shown up in progress bar of program, with green color.
    (1) Make sure the status led on the test kit is blinking 
    (2) Every time press the button on DUT: the DUT's status led should blink once.     
    
The DUT is considered PASSED the test if step(1), (2) are happened as behavior above.