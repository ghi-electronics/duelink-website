# In this sample:
# Get the current rotary value
# Detect if the rotary button is pressed

_a = 0
_b = 0

_m = 0
_n = 0

while (1)
    _a = GetValue()
    _m = Pressed()
 
    if _b != _a
        _b = _a
        println(_b)
    end
    
    if (_n != _m)
        _n = _m
        if (_n)
            println("Pressed")
        else
            println("Released")
        end        
    end
    
    Wait(10)  
wend
