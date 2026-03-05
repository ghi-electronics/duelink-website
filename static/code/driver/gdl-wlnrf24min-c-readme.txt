##### NRF24 Min #####

1. Make sure status LED on BUT is blinking first.
2. A Special Pre-programmed NRF24-min (SPNM) is required for testing.
3. Keep the distance between the SPNM and the DUT within 10 meters, with no metal objects or obstacles between them
4. If the DUT passes the test, the message “Passed, counter:” will be displayed.

Note:
If a SPNM is not available, the tester can select any NRF24-min and program it using the script below.
Once programmed, the NRF24-min becomes a SPNM and can be used for testing the DUT.

Asio(1) 
DoClient() 
fn DoClient()
    dim b2[32]
    SetMode(1, [1,2,3,4,5], 1, 1,0) 
    EnableRx() 
    while (1)
        if RxReady()
            l = ReadPl(b2)
            if l > 0
                dwrite(0,1)
            end
        end
 
        wait(50)
        dwrite(0,0)
        wait(50)
    wend
fend
 





