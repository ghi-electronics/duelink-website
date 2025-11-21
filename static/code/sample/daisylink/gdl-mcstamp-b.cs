// In this sample:
// STATLED blinks every 100 ms.
// Press and hold the LDR button: STATLED stops blinking and stays on.
// Release the LDR button: STATLED resumes blinking every 100 ms.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

var ldr_btn_state = false;
var ldr_btn_state_backup = false;

bool LdrPressed() {
    var cmd = "dread(20,2)";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}

duelink.Engine.ExecuteCommand("statled(100,100,0)"); // blink 100ms

while (true) {
    ldr_btn_state = LdrPressed();

    if (ldr_btn_state_backup != ldr_btn_state) {
        ldr_btn_state_backup = ldr_btn_state;

        if (ldr_btn_state_backup) {
            duelink.Engine.ExecuteCommand("statled(1,0,0)"); // stay on
        }
        else {
            duelink.Engine.ExecuteCommand("statled(100,100,0)"); // blink 100ms
        }
    }

    Thread.Sleep(10);
}

