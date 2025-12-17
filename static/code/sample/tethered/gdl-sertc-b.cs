// In this sample:
// Set local date/time and read every second.

using System.Data.SqlTypes;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetDateTime(DateTime dt) {
    var year = dt.Year;
    var month = dt.Month;
    var day = dt.Day;
    var hour = dt.Hour;
    var minute = dt.Minute;
    var second = dt.Second;

    duelink.Engine.ExecuteCommand($"SetTime({year}, {month},{day},{hour},{minute},{second})");
}

DateTime GetDateTime() {
    duelink.Engine.ExecuteCommand("ReadTime()");

    var year = (int)duelink.Engine.ExecuteCommand("_y"); ;
    var month = (int)duelink.Engine.ExecuteCommand("_n"); ;
    var day = (int)duelink.Engine.ExecuteCommand("_d"); ;
    var hour = (int)duelink.Engine.ExecuteCommand("_h"); ;
    var minute = (int)duelink.Engine.ExecuteCommand("_m"); ;
    var second = (int)duelink.Engine.ExecuteCommand("_s"); ;

    return new DateTime(year,month,day,hour,minute,second);
}

SetDateTime(DateTime.Now);

while (true) {   
    Console.WriteLine($"Now: {GetDateTime().ToString()} ");    

    Thread.Sleep(1000);
}


