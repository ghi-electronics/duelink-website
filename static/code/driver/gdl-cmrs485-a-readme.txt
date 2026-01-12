##### RS485  #####

1.Make sure the status LED is blinking.
2.Make sure the text “Passed” is displayed in the text log box.

Note: Before testing, ensure the following proper connections:
- This test requires a programmed RS485.
- Socket U of the programmed RS485 to socket D of the DUT.
- A to A, B to B, GND to GND

If programmed RS485 is not ready, use the script below to create one on any RS485 (with installed driver):

fn EnTest() 
    Asio(1)
    _r = 5 # re pin
    _d = 6 # de pin
    SerCfg(9600, 128)
    dwrite(_r, 0) # This pin can be low all the time
    dwrite(_d, 0)
 
    while (1)
        if (SerB2R() > 0)
            b = SerRd()
 
            if (b = 'a')
                wait(10)
                dwrite(_d, 1)
                SerWr('b')
                dwrite(_d, 0)
            end
        end
 
        wait(10)
    wend
fend

EnTest() 
    


