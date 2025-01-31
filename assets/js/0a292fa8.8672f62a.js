"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[306],{9244:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"specs","title":"Specifications","description":"DUELink unifies many aspects allowing modules to come in any shape and form and still conform to unified user experience.","source":"@site/docs/specs.mdx","sourceDirName":".","slug":"/specs","permalink":"/docs/specs","draft":false,"unlisted":false,"editUrl":"https://ghi-electronics.github.io/duelink-website/docs/specs.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Loader","permalink":"/docs/loader"},"next":{"title":"DUELink Downloads","permalink":"/docs/downloads"}}');var i=s(4848),a=s(8453);const t={},r="Specifications",c={},l=[{value:"Connections",id:"connections",level:2},{value:"Status LED",id:"status-led",level:2},{value:"Dimensions",id:"dimensions",level:2},{value:"Processor",id:"processor",level:2}];function d(e){const n={a:"a",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"specifications",children:"Specifications"})}),"\n",(0,i.jsx)(n.p,{children:"DUELink unifies many aspects allowing modules to come in any shape and form and still conform to unified user experience."}),"\n",(0,i.jsx)(n.h2,{id:"connections",children:"Connections"}),"\n",(0,i.jsx)(n.p,{children:"Connections between modules and to mainboards is accomplished using standard 4pin 1mm JST connector. These low-cost and common connectors are very small that you can throw on anything without compromising space. They are available in SMT for fast machine placement and in TH in case you need to hand solder them."}),"\n",(0,i.jsx)(n.p,{children:"Images"}),"\n",(0,i.jsx)(n.p,{children:"The pinout consists of"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Common Ground"}),"\n",(0,i.jsx)(n.li,{children:"Regulated 3.3V"}),"\n",(0,i.jsx)(n.li,{children:"DRP"}),"\n",(0,i.jsx)(n.li,{children:"CTN"}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The DRP pin handles: ",(0,i.jsx)(n.a,{href:"interface/i2c",children:"I2C"})," SDA, ",(0,i.jsx)(n.a,{href:"interface/uart",children:"UART"})," RX, and ",(0,i.jsx)(n.a,{href:"interface/usb",children:"USB"})," D+"]}),"\n",(0,i.jsxs)(n.li,{children:["The CTN pin carries: ",(0,i.jsx)(n.a,{href:"interface/i2c",children:"I2C"})," SCL, ",(0,i.jsx)(n.a,{href:"interface/uart",children:"UART"})," TX, and ",(0,i.jsx)(n.a,{href:"interface/usb",children:"USB"})," D-"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Each module includes both Upstream and ",(0,i.jsx)(n.a,{href:"interface/downstream",children:"Downstream"})," connectors. The Upstream connector is used to connect the module to a mainboard, such as Rapberry PI or Arduino, or a PC. It automatically works with ",(0,i.jsx)(n.a,{href:"interface/i2c",children:"I2C"}),", ",(0,i.jsx)(n.a,{href:"interface/uart",children:"UART"}),", and ",(0,i.jsx)(n.a,{href:"interface/usb",children:"USB"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Image"}),"\n",(0,i.jsxs)(n.p,{children:["When USB is mostly desired on specific boards, a USB C connector is used instead of the JST Upstream socket. This is the case with ",(0,i.jsx)(n.a,{href:"catalog/mainboard/dueduino",children:"DueDuino"})," for example."]}),"\n",(0,i.jsx)(n.p,{children:"Image"}),"\n",(0,i.jsxs)(n.p,{children:["Every single module can still access USB by wiring a USB connector the Upstream socket. We also offer ",(0,i.jsx)(n.a,{href:"catalog/accessory/usb-hook",children:"USB Hook"})," for convenience."]}),"\n",(0,i.jsx)(n.p,{children:"Image of usb hook with a module"}),"\n",(0,i.jsxs)(n.p,{children:["In some rare case, a module might have both Upstream and USB connector, like we have on ",(0,i.jsx)(n.a,{href:"catalog/mainboard/john-due",children:"John Due"}),". In this case, the user can use either USB or Downstream as they are both wired together internally."]}),"\n",(0,i.jsx)(n.p,{children:"Image"}),"\n",(0,i.jsx)(n.p,{children:"Detail: DUELink Upstream connection is compatible with Sparkfun Qwiic and Adafruit STEMMA QT\r\nBoth use I2C, which is one of options available on any DUELink Upstream connection. Always connect the non-DUELink modules first in line with the mainboard then add as many DUELink modules ass the wires can handle!!\r\nImage"}),"\n",(0,i.jsxs)(n.p,{children:["The second connector is Downstream. It is used to the next module\u2019s Upstream socket. Each module has intelligence to know what to transfer and return throughout the entire stream. Only connect DUELink modules on the downstream connection. More details are on the ",(0,i.jsx)(n.a,{href:"interface/downstream",children:"Downstream"})," page."]}),"\n",(0,i.jsx)(n.p,{children:"Tip: The Upstream and Downstream connectors must be clearly marked with U and D respectively."}),"\n",(0,i.jsx)(n.p,{children:"Tip: When looking at the front of the module, we recommend placing the U socket on the left side, with D socket on the right."}),"\n",(0,i.jsx)(n.h2,{id:"status-led",children:"Status LED"}),"\n",(0,i.jsxs)(n.p,{children:["Each DUELink module must include a STAT (Status) LED. This is used to indicate the current status on the module and can also be user accessed using the ",(0,i.jsx)(n.a,{href:"/",children:"LED"})," command. On boards that have parts on both sides, STAT LED must be on the front face of the module."]}),"\n",(0,i.jsx)(n.p,{children:"Image"}),"\n",(0,i.jsx)(n.h2,{id:"dimensions",children:"Dimensions"}),"\n",(0,i.jsx)(n.p,{children:"DUELink modules can be of any size and form; however, they must include mounting holes that are placed on a 5mm grid. On boards with right angle corners, holes must be placed 3.5mm from the edges of the circuit."}),"\n",(0,i.jsx)(n.p,{children:"Image"}),"\n",(0,i.jsx)(n.p,{children:"Holes are 3mm diameter with 6.6 circle around it with copper keep out. This allows for the use of M3 screws and hardware without worrying about creating circuit shorts."}),"\n",(0,i.jsx)(n.p,{children:"Image of screw"}),"\n",(0,i.jsxs)(n.p,{children:["The 5mm grid placement of holes aids in 3D-print and laser-cut enclosures design. It also allowed us to make this ",(0,i.jsx)(n.a,{href:"catalog/accessory/holey-board",children:"Holey Board"}),"!"]}),"\n",(0,i.jsx)(n.p,{children:"Image"}),"\n",(0,i.jsxs)(n.p,{children:["And if you want more there is a ",(0,i.jsx)(n.a,{href:"catalog/accessory/holey-moley-board",children:"Holey Moley Board"}),"!"]}),"\n",(0,i.jsxs)(n.p,{children:["DUELink ",(0,i.jsx)(n.a,{href:"catalog/accessories",children:"Accessories"})," includes all the hardware you need to mount modules."]}),"\n",(0,i.jsx)(n.h2,{id:"processor",children:"Processor"}),"\n",(0,i.jsxs)(n.p,{children:["Currently, only STM32C071 is supported with DUELink. We use QFN32 package but fear not as we have a made a ",(0,i.jsx)(n.a,{href:"catalog/mainboard/duestick",children:"DueStick"})," to help you make your own modules!"]}),"\n",(0,i.jsx)(n.p,{children:"Image next to a coint and a pencil. >>>>>>>>>>>> In fact, we should have this reference for all modules images"})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>r});var o=s(6540);const i={},a=o.createContext(i);function t(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);