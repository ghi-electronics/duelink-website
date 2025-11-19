##### IR #####

1. Make sure status LED on BUT is blinking first.
2. A Special Pre-programmed Infrared Module (SPIM) is required for testing.
3. Move the SPIM to the DUT and ensure they are aligned face-to-face.
4. If the DUT passes, the text “Passed, count rec:” will be displayed.
5. When the SPIM and DUT are properly aligned, the count number increases by one approximately every second.

Note:
If a SPIM is not available, the tester can select any Infrared module and program it using the script below.
Once programmed, the Infrared module becomes a SPIM and can be used for testing the DUT.

Asio(1) 
IrEn(5,3)
while (1)
    _r = irread()
    
    if _r != -1
        irwrite(_r+1)
    end
    wait(10)
wend


