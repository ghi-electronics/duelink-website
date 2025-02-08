"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[4713],{11683:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>x,default:()=>a,frontMatter:()=>s,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"engine/graphics","title":"Graphics","description":"---","source":"@site/docs/engine/graphics.mdx","sourceDirName":"engine","slug":"/engine/graphics","permalink":"/docs/engine/graphics","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/engine/graphics.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Standard Library","permalink":"/docs/engine/stdlib"},"next":{"title":"File System","permalink":"/docs/engine/filesystem"}}');var d=r(74848),t=r(28453);const s={},x="Graphics",c={},l=[{value:"Configuration",id:"configuration",level:2},{value:"Color",id:"color",level:2},{value:"SPI TFT Display",id:"spi-tft-display",level:2},{value:"I2C OLED Display",id:"i2c-oled-display",level:2},{value:"NeoPixel Matrix",id:"neopixel-matrix",level:2},{value:"5x5 LED Matrix",id:"5x5-led-matrix",level:2}];function o(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"graphics",children:"Graphics"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.p,{children:"The graphics support is versatile and support drawing on displays and LEDs of many types."}),"\n",(0,d.jsx)(n.admonition,{type:"tip",children:(0,d.jsxs)(n.p,{children:["The graphics libraries does not include any device initialization. An application must initialize the device as necessary and then ",(0,d.jsx)(n.code,{children:"GfxConfig()"})," before using any drawing functions, like in the examples below."]})}),"\n",(0,d.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,d.jsx)(n.p,{children:"Before any drawing operations, the systems needs ot know what device it will access and what pixel mapping it needs to process internally."}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"GfxConfig (type, cfg1, cfg2, width, height, direct, multiplier)"})," Is needed to set the device ",(0,d.jsx)(n.code,{children:"type"})," with ",(0,d.jsx)(n.code,{children:"width"})," and ",(0,d.jsx)(n.code,{children:"height"}),". The ",(0,d.jsx)(n.code,{children:"cfg1"})," and ",(0,d.jsx)(n.code,{children:"cfg2"})," are optional and depend on the device type."]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"direct"})," mode is 1 when drawing to the display directly. No need for internal buffering and no need for ",(0,d.jsx)(n.code,{children:"Show()"}),"."]}),"\n",(0,d.jsxs)(n.p,{children:["Another options for larger display is to use ",(0,d.jsx)(n.code,{children:"multiplier"}),". In this case, the engine will multiply each pixel, 2 or 3 times, to cover the entire screen. For example, 160x128 display with x2 multiplier requires only 80x64 of memory."]}),"\n",(0,d.jsxs)(n.p,{children:["When selecting to use graphics with ",(0,d.jsx)(n.code,{children:"direct"})," set to 0 (use internal buffering), make sure the overall memory need is under 10KBytes. 320x240 with 3 x multiplier is 106x80. We typically set it to 100x80 pixels, requiring 8KBytes of RAM."]}),"\n",(0,d.jsx)(n.p,{children:"Supported device types:"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Type"}),(0,d.jsx)(n.th,{children:"Description"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"0"}),(0,d.jsx)(n.td,{children:"None (default)"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"1"}),(0,d.jsxs)(n.td,{children:["I2C device, with ",(0,d.jsx)(n.code,{children:"cgf1"})," being the salve address. ",(0,d.jsx)(n.code,{children:"cfg2"})," is ignored."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"2"}),(0,d.jsxs)(n.td,{children:["SPI device, with ",(0,d.jsx)(n.code,{children:"cfg1"})," being the chip select and ",(0,d.jsx)(n.code,{children:"cfg2"})," is data control pins."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"3"}),(0,d.jsxs)(n.td,{children:["Neopixel WS2812 support. ",(0,d.jsx)(n.code,{children:"cfg1"})," is the data pin."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"4"}),(0,d.jsx)(n.td,{children:"5x5 LED matrix. The pins are fixed. Note that all argument are ignored with this type as width and height are set to 5, with no buffering and no multiplier."})]})]})]}),"\n",(0,d.jsx)(n.admonition,{type:"tip",children:(0,d.jsx)(n.p,{children:"Direct graphics is optional on SPI but always buffered on I2C."})}),"\n",(0,d.jsx)(n.h2,{id:"color",children:"Color"}),"\n",(0,d.jsx)(n.p,{children:"Any buffered graphics are done using 8BPP (256 colors). Use direct mode if more colors are required."}),"\n",(0,d.jsx)(n.p,{children:"All color arguments tke 24BPP format RRGGBB, similar to what is used on web. Buffered graphics use 8BPP 3R3G2B (256 color) which is calculated from the high bits of the input 24BPP RRGGBB. Color pallet is not supported."}),"\n",(0,d.jsx)(n.admonition,{type:"tip",children:(0,d.jsx)(n.p,{children:"Conceder that only the top 3 or 2 bits of a color are used. 0x00000F is dim blue on 24BPP but it will simply be black on 8BPP. For red and green, use values 0xC0 or higher. For blue use 0xc0 of higher."})}),"\n",(0,d.jsxs)(n.p,{children:["It is possible to get 16BPP 5:6:5 on color SPI display using ",(0,d.jsx)(n.code,{children:"direct"})," mode. This is useful to draw to 320x240 displays at 16BPP color for example. The system memory is limited and can't process 320x240 at 16BPP, which requires 150K of RAM! Instead, set direct to 1 and the graphics engine will draw directly to the display, where ",(0,d.jsx)(n.code,{children:"Show()"})," doesn't do anything."]}),"\n",(0,d.jsx)(n.admonition,{type:"tip",children:(0,d.jsx)(n.p,{children:"Color 1 is a special color that results in white 0xFFFFFF, useful for B&W displays."})}),"\n",(0,d.jsx)(n.h2,{id:"spi-tft-display",children:"SPI TFT Display"}),"\n",(0,d.jsxs)(n.p,{children:["This example uses the display a 320x240 display, like ",(0,d.jsx)(n.a,{href:"../catalog/display/tft-cp23",children:"TFT CP23"})," in buffered mode with x3 multiplier."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-py",children:"_s = 5\r\n_r = 6\r\n_x=50\r\n_d = -9\r\nInit()\r\n\r\nwhile 1\r\n    clear(0)\r\n    text(Str(_x), 0xffffff, 30, 5)\r\n    Circle(0xff,_x,50,5)\r\n    _x=_x+_d\r\n    if(_x <0 || _x >106)\r\n        _d = _d * -1\r\n    end\r\n    show()\r\nwend\r\n \r\n \r\nfn Init()\r\n\tdwrite(4,1)\r\n\tdwrite(7,1)\r\n    spicfg(0, 24000)\r\n    gfxcfg(2, _s,_r,106,80, 0, 3)\r\n\tCmd(0xc8, [0xFF])\r\n\tCmd(0x93, [0xFF])\r\n\tCmd(0x36, [0xc8])\r\n\tCmd(0x3a, [0x55])\r\n\tCmd(0xc0, [0x10,0x10])\r\n\tCmd(0xc1, [0x36])\r\n\tCmd(0xc5, [0xc3])\r\n\tCmd(0xE0, [0x00,0x05,0x08,0x02,0x1a,0x0c,0x42,0x7a,0x54,0x08,0x0d,0x0c,0x23,0x25,0x0f])\r\n\tCmd(0xE1, [0x00,0x29,0x2f,0x03,0x0f,0x05,0x42,0x55,0x53,0x06,0x0f,0x0c,0x38,0x3a,0x0f])\r\n\tCmd(0x11,[])\r\n\tWait(120)\r\n\tCmd(0x36, [0xc8])\r\n\tCmd(0x2a, [0x00,0x00,0x01,0x3d])\r\n\tCmd(0xE1, [0x00,0x00,0x00,0xef])\r\n\tCmd(0x29,[])\r\nfend\r\n\r\nfn Cmd(c, b1)\r\n    ##SendCmd(c)\r\n    dwrite(_s, 0)#select\r\n    dwrite(_r, 0)#cmd\r\n    spibyte(c)\r\n    dwrite(_r, 1)#data\r\n    for i in range(0,Len(b1))\r\n        spibyte(b1[i])\r\n    next\r\n    dwrite(_s, 1)#deselect\r\nfend\n"})}),"\n",(0,d.jsxs)(n.p,{children:["In direct mode, you will likely not clear the entire screen is this will cause flicker. Only erase specific regions. Enjoy the full resolution and full color from any ",(0,d.jsx)(n.a,{href:"../system/intro",children:"Supported System"}),"!"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-py",children:'_s = 5\r\n_r = 6\r\n_x=320/2\r\n_d = -9\r\nInit()\r\n\r\nclear(0)\r\nTextS("Amazing DUELink!", 0xFFA500, 20, 5,3,5)\r\nfor _i in range(0, 255,10) #5bit color in 5:6:5 format\r\n    _c = _i #5 bit to 8 bit\r\n    _q = (0xFF -_i) # invert count on color\r\n    Line(_q<<8 | _c, 30, 80, _i+30, 240)\r\n    Line(_q<<16 | _c, 280, 80, 280-_i, 240)\r\nnext\r\n\r\n\r\nwhile 1\r\n    Circle(0xFF00ff,_x,100,8)\r\n    wait(10)\r\n    Circle(0,_x,100,8)# clear the circle area, not the whole screen\r\n    _x=_x+_d\r\n    if(_x <120 || _x >320-120)\r\n        _d = _d * -1\r\n    end\r\nwend\r\n \r\n \r\nfn Init()\r\n\tdwrite(4,1)\r\n\tdwrite(7,1)\r\n    spicfg(0, 24000)\r\n    gfxcfg(2, _s,_r,320,240, 1, 3)\r\n\tCmd(0xc8, [0xFF])\r\n\tCmd(0x93, [0xFF])\r\n\tCmd(0x36, [0xc8])\r\n\tCmd(0x3a, [0x55])\r\n\tCmd(0xc0, [0x10,0x10])\r\n\tCmd(0xc1, [0x36])\r\n\tCmd(0xc5, [0xc3])\r\n\tCmd(0xE0, [0x00,0x05,0x08,0x02,0x1a,0x0c,0x42,0x7a,0x54,0x08,0x0d,0x0c,0x23,0x25,0x0f])\r\n\tCmd(0xE1, [0x00,0x29,0x2f,0x03,0x0f,0x05,0x42,0x55,0x53,0x06,0x0f,0x0c,0x38,0x3a,0x0f])\r\n\tCmd(0x11,[])\r\n\tWait(120)\r\n\tCmd(0x36, [0xc8])\r\n\tCmd(0x2a, [0x00,0x00,0x01,0x3d])\r\n\tCmd(0xE1, [0x00,0x00,0x00,0xef])\r\n\tCmd(0x29,[])\r\nfend\r\n\r\nfn Cmd(c, b1)\r\n    ##SendCmd(c)\r\n    dwrite(_s, 0)#select\r\n    dwrite(_r, 0)#cmd\r\n    spibyte(c)\r\n    dwrite(_r, 1)#data\r\n    for i in range(0,Len(b1))\r\n        spibyte(b1[i])\r\n    next\r\n    dwrite(_s, 1)#deselect\r\nfend\n'})}),"\n",(0,d.jsx)(n.h2,{id:"i2c-oled-display",children:"I2C OLED Display"}),"\n",(0,d.jsxs)(n.p,{children:["In this case, we are using SSD1306. This display is found on ",(0,d.jsx)(n.a,{href:"../catalog/mainboard/pixobit",children:"PixoBit"})," mainboard and ",(0,d.jsx)(n.a,{href:"../catalog/display/oled-096",children:"OLED 096"})," display."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-py",children:"dim b1[2]\r\n_x=50\r\n_d = -9\r\nInit()\r\n\r\n\r\nwhile 1\r\n    clear(1)\r\n    texts(Str(_x), 0, 50, 5,2,2)\r\n    Circle(0,_x,50,5)\r\n    _x=_x+_d\r\n    if(_x <0 || _x >106)\r\n        _d = _d * -1\r\n    end\r\n    show()\r\nwend\r\n \r\nfn Init()\r\n\tdwrite(11,1) # reset pin\r\n    # config I2C bus with 400Kz\r\n    i2ccfg(400)\r\n\tWait(20)\r\n    GfxCfg(1,0x3C,0,128,64, 0, 1)\r\n    \r\n\tSendCmd(0xAE):SendCmd(0x00):SendCmd(0x10)\r\n\tSendCmd(0x40):SendCmd(0x81):SendCmd(0xCF)\r\n\tSendCmd(0xA1):SendCmd(0xA6):SendCmd(0xA8)\r\n\tSendCmd(0x3F):SendCmd(0xD3):SendCmd(0x00)\r\n\tSendCmd(0xD5):SendCmd(0x80):SendCmd(0xD9)\r\n\tSendCmd(0xF1):SendCmd(0xDA):SendCmd(0x12)\r\n\tSendCmd(0xDB):SendCmd(0x40):SendCmd(0x8D)\r\n\tSendCmd(0x14):SendCmd(0xAF):SendCmd(0xC8)\r\n\tSendCmd(0x20):SendCmd(0x00):SendCmd(0x21)\r\n\tSendCmd(0):SendCmd(128-1)\r\n\tSendCmd(0x22):SendCmd(0):SendCmd(7)\r\nfend\r\n\r\nfn SendCmd(c)\r\n\tb1[0] = 0\r\n\tb1[1] = c\r\n    I2cBytes(0x3c, b1,2, 0, 0)    \r\nfend\n"})}),"\n",(0,d.jsx)(n.h2,{id:"neopixel-matrix",children:"NeoPixel Matrix"}),"\n",(0,d.jsx)(n.h2,{id:"5x5-led-matrix",children:"5x5 LED Matrix"}),"\n",(0,d.jsxs)(n.p,{children:["This is a perfect match for ",(0,d.jsx)(n.a,{href:"../catalog/mainboard/cincobit",children:"CincoBit"})," with its 5x5 LED matrix."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-py",children:'Gfxconfig(4,0,0,0,0,0,0) # all arguments are ignored in 5x5 LED type\r\n\r\n_x = 6\r\n# We need tiny font as we only have 5 pixels!\r\nwhile 1\r\n    TextT("DUELink", 0xFFFFFF, _x, 0) # you can also just set color to 1 since this is B&W\r\n    Show()\r\n    _x=_+1\r\n    if _x < -20\r\n        _x = 6\r\n    end    \r\n    wait(100)\r\nwend\r\n\n'})})]})}function a(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>x});var i=r(96540);const d={},t=i.createContext(d);function s(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function x(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);