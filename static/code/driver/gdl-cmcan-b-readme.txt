##### CAN  #####

1.Make sure the status LED is blinking.
2.Make sure the text “CAN Passed” is displayed in the text log box.

Note: Before testing, ensure the following proper connections:
- This test requires a programmed CAN.
- Socket U of the programmed CAN to socket D of the DUT.
- H to H, L to L. 
- A terminal jumper may be needed on DUT.

If programmed CAN is not ready, use the script below to create one on any CAN (with installed driver):

# This is programmed CAN script
fn EnTest()    
    dim b0[8] # tx
    dim b1[9] # rx
    while (1 )
        if RxRd(b1) >=0
            for i = 1 to 9
                b0[i-1] = b1[i]+1
            next 
 
            TxReq(0x2,len(b0),b0)
        end
 
        wait(10)
    wend
fend 