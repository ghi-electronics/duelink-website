// In this sample:
// Draw the text "DUELink" in multiple colors at the center of the screen.
// Draw a rectangle under the text

using System;
using System.Drawing;
using GHIElectronics.DUELink;
using static System.Net.Mime.MediaTypeNames;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Clear() {
    duelink.Engine.ExecuteCommand("DLClear()");
    duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR_COLOR,{0,0,0})");
    duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR,{})");
}
void FillRect(uint color, int x, int y, int width, int height) {
    var r = (color >> 16) & 0xFF;
    var g = (color >> 8) & 0xFF;
    var b = (color >> 0) & 0xFF;
    var cmd = "DLCmd(C_COLOR,{" + r + "," + g + "," + b + "})";
    duelink.Engine.ExecuteCommand(cmd);

    duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN, {RECTS})");

    cmd = $"DLCmd(C_VERTEX2F, {{{x<<4},{y<<4}}})";
    duelink.Engine.ExecuteCommand(cmd);

    cmd = $"DLCmd(C_VERTEX2F, {{{(width+x)<<4},{(height + y)<<4}}})";
    duelink.Engine.ExecuteCommand(cmd);

    duelink.Engine.ExecuteCommand("DLCmd(C_END,{})");
}

void DrawChar(char c, uint color, int x, int y, int size) {
    var r = (color >> 16) & 0xFF;
    var g = (color >> 8) & 0xFF;
    var b = (color >> 0) & 0xFF;
    var cmd = "DLCmd(C_COLOR,{" + r + "," + g + "," + b + "})";
    duelink.Engine.ExecuteCommand(cmd);

    duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN,{BITMAPS})");

    cmd = "DLCmd(C_VERTEX2II, {" + x + "," + y + "," + size + ",'" + c + "'})";
    duelink.Engine.ExecuteCommand(cmd);

    duelink.Engine.ExecuteCommand("DLCmd(C_END,{})");
}

void Show() {
    duelink.Engine.ExecuteCommand("DLCmd(C_DISPLAY,{})");
    duelink.Engine.ExecuteCommand("DLSwap()");
}

Clear();
DrawChar('D', 0xff0000, 300, 192, 31);
DrawChar('U', 0x00ff00, 335, 192, 31);
DrawChar('E', 0x0000ff, 370, 192, 31);
DrawChar('L', 0x00ffff, 405, 192, 31);
DrawChar('i', 0xff00ff, 435, 192, 31);
DrawChar('n', 0xffff00, 460, 192, 31);
DrawChar('k', 0xffffff, 495, 192, 31);


FillRect(0xF0000F, 300, 250, 224, 10);
Show();

