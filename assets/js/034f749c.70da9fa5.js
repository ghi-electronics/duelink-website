"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[2115],{46901:(n,r,e)=>{e.r(r),e.d(r,{assets:()=>s,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"engine/samples/oled-pong","title":"OLED Pong Game","description":"---","source":"@site/docs/engine/samples/oled-pong.mdx","sourceDirName":"engine/samples","slug":"/engine/samples/oled-pong","permalink":"/docs/engine/samples/oled-pong","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/engine/samples/oled-pong.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Bouncing Ball","permalink":"/docs/engine/samples/oled-bounce"},"next":{"title":"Console","permalink":"/docs/console"}}');var o=e(74848),a=e(28453);const i={},d="OLED Pong Game",s={},l=[];function c(n){const r={code:"code",h1:"h1",header:"header",hr:"hr",img:"img",p:"p",pre:"pre",...(0,a.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.header,{children:(0,o.jsx)(r.h1,{id:"oled-pong-game",children:"OLED Pong Game"})}),"\n",(0,o.jsx)(r.hr,{}),"\n",(0,o.jsx)(r.h1,{id:"braingamer---pong",children:"BrainGamer - Pong"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.img,{alt:"BrainGamer Sketch",src:e(27430).A+"",width:"600",height:"338"})}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-py",children:'@Start\r\na = 30 #Left Player Position\r\nb = 30 #Right Player Position\r\ng = 10 #Ball x\r\nh = 2.3 #Ball x direction\r\ni = 10 #Ball y\r\nj = 2.6 #Ball y direction\r\ns = 0 #Player1 Score\r\nt = 0 #Player2 Score\r\nw = 0 #Check Win\r\n\r\n@Loop\r\n    LcdClear(0)   \r\n    g = g + h #Move Ball X\r\n    i = i + j #Move Ball Y\r\n    \r\n    if i < 5 || i> 55: #Bounce off top or bottom walls\r\n        j = j* -1\r\n    End\r\n    \r\n    LcdFill(1, g, i, 4, 4) #Draw Ball\r\n    \r\n    if g > 118:\r\n       if i >= (b - 1) && i <= (b + 12)\r\n          #Add code here when player hits ball\r\n          h = h* -1\r\n          Sound(256,100,50)\r\n       else\r\n          #Add code here when player misses\r\n          s = s + 1\r\n          g = 15\r\n          Von()#Vibrate BrainGamer\r\n          Wait(100)\r\n          Voff()#Turn off Vibrate\r\n       End\r\n    End\r\n\r\n    if g < 12:\r\n       if i >= (a - 1) && i <= (a + 12)\r\n          #Add code here when player hits ball\r\n          h = h* -1\r\n          Sound(256,100,50) \r\n       else\r\n          #Add code here when player misses\r\n          t=t+1\r\n          g=115\r\n          Von()#Vibrate BrainGamer\r\n          Wait(100)\r\n          Voff()#Turn off Vibrate\r\n       End\r\n    End\r\n    \r\n    Rocker() #Check Rocker Move\r\n    if y < 40:a = a - 4:End #Move Left Paddle Up\r\n    if y > 60:a = a + 4:End #Move Left Paddle Down\r\n    if a < 5:a = 5:End #Left Paddle Hits Top\r\n    if a > 50:a = 50:End #Left Paddle Hits Bottom\r\n    \r\n    LcdFill(1, 10, a, 2, 10) #Draw Left Paddle\r\n    \r\n    Keys() #Check Key Press\r\n    if u = 0:b = b - 4:End #Move Right Paddle Up\r\n    if d = 0:b = b + 4:End #Move Right Paddle Down\r\n    if b < 5:b = 5:End #Right Paddle Hits Top\r\n    if b > 50:b = 50:End #Right Paddle Hits Bottom\r\n     \r\n    LcdFill(1,120,b,2,10) #Draw Right Paddle\r\n    \r\n    For n = 0 to 64 step 10 #Draw Net\r\n        LcdLine(1,64,n,64,n+5)\r\n    Next   \r\n    \r\n    if s = 5\r\n       LcdClear(0)\r\n       LcdTextS("Player 1",1,5,0,2,2)\r\n       LcdTextS("WINS!",1,25,20,2,2)\r\n       LcdShow()\r\n       w=1\r\n       Wait(3000)\r\n    End\r\n\r\n    if t = 5\r\n       LcdClear(0)\r\n         LcdTextS("Player 2",1,5,0,2,2)\r\n       LcdTextS("WINS!",1,25,20,2,2)\r\n       LcdShow()\r\n       w=1\r\n       Wait(3000)\r\n    End\r\n\r\n    if w = 1 #If winner play sound and restart      \r\n       Sound(256,1000,50) \r\n       Sound(200,1000,50)\r\n       Sound(256,1000,50)  \r\n       Wait(1500)\r\n       Goto Start()\r\n    End\r\n   \r\n    LcdText(str(s),1, 50, 5);\r\n    LcdText(str(t),1, 74, 5);\r\n    LcdShow()\r\n    \r\n   Wait(10)\r\nGoto Loop\r\n\r\nExit\r\n#####################################\r\n###       BrainGamer Driver       ###\r\n#####################################\r\n###   variables used by driver    ###\r\n###         x,y,u,d,l,r           ###\r\n#####################################        \r\n\r\n### Rocker ###\r\n# Reads the rocker position into x and y\r\n@Rocker\r\nx = ARead(4)\r\ny = ARead(3)\r\nReturn\r\n\r\n### Activate Vibrator ###\r\n@Von\r\nDWrite(8,0)\r\nReturn\r\n\r\n### Deactivate Vibrator ###\r\n@Voff\r\nDWrite(8,1)\r\nReturn\r\n\r\n### Read Keypad ####\r\n# Reads the 4 buttons into U,D,L,R\r\n@Keys\r\nu = DRead(14,1)\r\nd = DRead(15,1)\r\nl = DRead(13,1)\r\nr = DRead(16,1)\r\nReturn\r\nreturn\n'})})]})}function h(n={}){const{wrapper:r}={...(0,a.R)(),...n.components};return r?(0,o.jsx)(r,{...n,children:(0,o.jsx)(c,{...n})}):c(n)}},27430:(n,r,e)=>{e.d(r,{A:()=>t});const t=e.p+"assets/images/oled-pong-7d71dcc177257663a31ea722d55743f9.gif"},28453:(n,r,e)=>{e.d(r,{R:()=>i,x:()=>d});var t=e(96540);const o={},a=t.createContext(o);function i(n){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof n?n(r):{...r,...n}}),[r,n])}function d(n){let r;return r=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:i(n.components),t.createElement(a.Provider,{value:r},n.children)}}}]);