(()=>{"use strict";var e,a,b,f,d,c={},t={};function r(e){var a=t[e];if(void 0!==a)return a.exports;var b=t[e]={exports:{}};return c[e].call(b.exports,b,b.exports,r),b.exports}r.m=c,e=[],r.O=(a,b,f,d)=>{if(!b){var c=1/0;for(i=0;i<e.length;i++){b=e[i][0],f=e[i][1],d=e[i][2];for(var t=!0,o=0;o<b.length;o++)(!1&d||c>=d)&&Object.keys(r.O).every((e=>r.O[e](b[o])))?b.splice(o--,1):(t=!1,d<c&&(c=d));if(t){e.splice(i--,1);var n=f();void 0!==n&&(a=n)}}return a}d=d||0;for(var i=e.length;i>0&&e[i-1][2]>d;i--)e[i]=e[i-1];e[i]=[b,f,d]},r.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return r.d(a,{a:a}),a},b=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,f){if(1&f&&(e=this(e)),8&f)return e;if("object"==typeof e&&e){if(4&f&&e.__esModule)return e;if(16&f&&"function"==typeof e.then)return e}var d=Object.create(null);r.r(d);var c={};a=a||[null,b({}),b([]),b(b)];for(var t=2&f&&e;"object"==typeof t&&!~a.indexOf(t);t=b(t))Object.getOwnPropertyNames(t).forEach((a=>c[a]=()=>e[a]));return c.default=()=>e,r.d(d,c),d},r.d=(e,a)=>{for(var b in a)r.o(a,b)&&!r.o(e,b)&&Object.defineProperty(e,b,{enumerable:!0,get:a[b]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((a,b)=>(r.f[b](e,a),a)),[])),r.u=e=>"assets/js/"+({9:"f33d41cb",35:"7b8c0ecd",48:"b5d98c20",118:"30291390",143:"e644b27d",306:"0a292fa8",368:"c384e657",373:"5f3ff697",394:"31b868da",458:"21185796",461:"db20eece",640:"cc6a45f1",664:"1c131897",670:"913c7c03",747:"ff0cbce9",749:"264c5aed",818:"03a987e8",849:"6d094485",897:"62dca7a2",904:"ae12fbbb",929:"098d7d33",945:"919d3e7f",1156:"12bad719",1189:"8b6c725e",1235:"a7456010",1254:"a23550f5",1260:"01b1293c",1310:"245a7ff8",1356:"1374db13",1530:"2efe0052",1538:"7da5b444",1625:"f902b8af",1839:"5c233e30",1886:"7636da6f",1894:"8378a24f",1958:"6b77e3ad",1989:"b0b38557",2013:"b2e9aa02",2022:"41235ee0",2175:"015d60ce",2224:"f8551aab",2262:"831f5faa",2281:"e23c6c40",2287:"c4612325",2296:"93380e32",2351:"91157c02",2364:"89289a28",2384:"f3e56503",2428:"9a88743a",2516:"268d64eb",2518:"58bee9d7",2596:"55e5eba5",2600:"cdbe586d",2633:"0e36c416",2634:"c4f5d8e4",2658:"e35970bd",2755:"2313b17c",2762:"13a0e759",2774:"fe0ab593",2929:"5b8a3d83",2930:"5892e43a",2968:"b92f7816",2996:"96a8b58f",3088:"03181aef",3123:"8bf08310",3125:"3a9eec2b",3157:"4bcf30c3",3163:"67b63c54",3200:"f12e7eb5",3225:"8ee2b8b2",3239:"fe3f0105",3268:"43f5559f",3324:"c7b56d93",3333:"1e860f04",3400:"eb0ea83e",3401:"9e02544e",3420:"ddd14f97",3560:"f931e2a2",3884:"9aa3591d",3887:"932ba16d",3941:"63d72701",4024:"577f1766",4083:"d89bfbd5",4085:"66979cb4",4116:"0913c2bc",4134:"393be207",4151:"6bad33c4",4176:"0fc5d9fb",4185:"3408d25f",4280:"88bb50bf",4282:"8b02c1de",4313:"dc0c80ee",4336:"a1a806ff",4358:"49fafabf",4378:"09a92c54",4395:"8048f158",4469:"ea58a3b5",4527:"47935bdb",4632:"67579f3f",4701:"d349a865",4704:"d96a27b2",4753:"6da0aaf7",4785:"cf9ef405",4858:"9c63ef49",4889:"94786046",4909:"2730917e",5e3:"542d90c0",5014:"13490bab",5040:"248e7f32",5179:"55772b62",5241:"5ed881e6",5459:"0b48b3cb",5494:"92ff5568",5650:"c46bd394",5681:"ab3d7a77",5742:"aba21aa0",5753:"ba0d5550",5764:"cbd09a24",5794:"c50174ef",5796:"6c6d2ca2",5855:"34cdee3c",5895:"ccb45942",5940:"4fba6633",6e3:"7b3b763a",6009:"698c3fb7",6034:"29f89ffc",6035:"8b117166",6061:"1f391b9e",6143:"82498533",6147:"d1a557b5",6148:"f236b21c",6173:"38b709fe",6223:"857c2dc8",6247:"8658699a",6362:"276d463a",6383:"1d54a5ae",6404:"58ed3af5",6569:"62f3415e",6590:"c9663871",6611:"76b9cc46",6628:"c2064a4c",6713:"baa52984",6755:"78520534",6757:"e39ada81",6773:"414fbf3d",6903:"f8409a7e",6935:"35042fe7",7017:"b46e94e4",7080:"2144c6a0",7098:"a7bd4aaa",7113:"5abfc8c4",7130:"3422c030",7159:"c688902b",7276:"2c3112b9",7369:"928dfb9d",7427:"9b83f736",7469:"3a43809b",7604:"33a4210a",7627:"ef41c8ef",7713:"0cdadd00",7718:"a19dda6c",7806:"a942cd04",7811:"9a8ebc06",7848:"3da09b8d",7867:"6c30faed",7873:"2d115d4a",7894:"e4fc0b9b",7920:"0568281a",7940:"b3234443",7950:"413b26b5",7964:"e67d4564",7978:"080fae92",8080:"4a1064ad",8138:"7f48853b",8338:"d3f6f45c",8344:"74af603d",8351:"36041992",8397:"61aaf05b",8401:"17896441",8448:"febc33ed",8492:"b4152d38",8582:"d56f161f",8631:"6daaf80b",8663:"4fcf492b",8695:"6143bf0d",8705:"54931a3b",8707:"73e451a8",8786:"dd0f43d8",8836:"f6d6eda1",8967:"70b45444",9021:"382a2208",9048:"a94703ab",9073:"81f7538f",9231:"90d83cef",9292:"30b903e1",9330:"079336d9",9374:"d665013d",9376:"883326d9",9398:"0344b729",9418:"48b5d068",9421:"c800b892",9611:"fd407551",9647:"5e95c892",9930:"ee0e501f"}[e]||e)+"."+{9:"6fe5783e",35:"2a25bf58",48:"37630efe",118:"b882e93e",143:"d3a6b11f",306:"0f5b4579",368:"07de93eb",373:"86063d61",394:"fc31f6fc",458:"81f3e120",461:"7f230850",640:"a53a8f36",664:"a434836b",670:"b04175e0",747:"31823e02",749:"f74cb76d",818:"bf2f3c82",849:"e6707cb4",897:"58239409",904:"da87d683",929:"0a76b121",945:"c3d6d060",1156:"3e128287",1189:"545bc9a8",1235:"5bcd88a6",1254:"1d02f644",1260:"45675ab4",1310:"fbd69683",1356:"7183d26a",1405:"dfa894ed",1530:"3cdd5eee",1538:"0cf7dcdc",1625:"ee61ad5c",1839:"31f27b0f",1886:"141dbc6e",1894:"cbff8986",1958:"f84209cc",1989:"7a5888d6",2013:"49711618",2022:"56f9e223",2175:"70226902",2224:"9e63a11c",2262:"6aa613a6",2281:"59872a6e",2287:"547d0138",2296:"ab0327bb",2351:"5779de54",2364:"70188779",2384:"a3dbfa62",2428:"20bca6c1",2516:"bc0931eb",2518:"42b9585b",2596:"8bb15709",2600:"3cfdf7ff",2633:"046ab6dd",2634:"573a7efc",2658:"5bb8476b",2755:"57dbd130",2762:"9caa5e4a",2774:"e3d788af",2929:"a0a70c4d",2930:"cba299a1",2968:"7dc523b7",2996:"4dd6af79",3042:"4f8c226c",3088:"3e7c301a",3123:"dc6f6325",3125:"e5f5e625",3157:"e6fb735e",3163:"5797e5fd",3200:"99c1010a",3225:"0bf8af86",3239:"729d9989",3268:"cc5db9ad",3324:"74869677",3333:"9c4c1f38",3400:"910e7565",3401:"e7a3ec6c",3420:"5525105a",3560:"63605630",3884:"727d47a2",3887:"c9bab6d0",3941:"e4c7433a",4024:"305d7a1a",4083:"3ae070cb",4085:"04bd12bc",4116:"11548566",4134:"fcadb7e6",4151:"d6168c64",4176:"2f93212c",4185:"f4b671d2",4280:"121b0d4b",4282:"014eb4bf",4313:"84590e5a",4336:"5d31083e",4358:"0da0fc09",4378:"8dac5a93",4395:"7542b1d4",4469:"2c46e974",4527:"b5ff9e5b",4632:"7cb245bf",4701:"4ca76429",4704:"f675b8e3",4753:"775c7162",4785:"4e140204",4858:"c1d21538",4889:"c3ae9723",4909:"d39e080b",5e3:"cbf7145e",5014:"0b5c7b16",5040:"81c5fd72",5179:"5b862cde",5241:"cf9f9d18",5459:"2c276e63",5494:"ea81f789",5650:"bc16898d",5681:"bd63bb20",5742:"88be74a8",5753:"af47623a",5764:"b8d4e469",5794:"f4d5db0e",5796:"001b515a",5855:"f311ba8e",5895:"a7d5a992",5940:"39509c1e",6e3:"646dafe3",6009:"b7ad97ae",6034:"84f275b0",6035:"333b61d0",6061:"1ee2a17c",6143:"d8a163ce",6147:"d3b99313",6148:"73fc961b",6173:"3300aa37",6223:"9244317a",6247:"25e62f6d",6362:"16fb2236",6383:"691eb45c",6404:"fd521bcb",6569:"f3aa3644",6590:"4a6eeb1f",6611:"bb3665fe",6628:"ef8838d2",6713:"d58667fe",6755:"6e9ac5a5",6757:"a8b9c1e5",6773:"2f2bc4e6",6903:"d552a5bf",6935:"ca10c452",7017:"f80f14d0",7080:"698e84f9",7098:"71671222",7113:"eae96d05",7130:"ab6b654d",7159:"fa649bda",7276:"da167e88",7369:"d34c3f6d",7427:"816dfc7f",7469:"9a8d0ed5",7604:"1ac97c18",7627:"e6d9ffb6",7713:"82f4f038",7718:"977a3d26",7806:"d2f5dc16",7811:"0ce26c76",7848:"31a9b474",7867:"f66de680",7873:"fc800376",7894:"b72a4049",7920:"52737096",7940:"e526fed1",7950:"d016cb27",7964:"111a7f85",7978:"1c3e34ef",8080:"1bc2d3d5",8138:"5582c23a",8338:"f718a509",8344:"b6113ffe",8351:"1bee1612",8397:"8b8102ea",8401:"db36661b",8448:"641e4693",8492:"5f23909b",8582:"34c75b4f",8631:"8bbfed9f",8663:"8134f8da",8695:"e3fd90e8",8705:"b48b4f3c",8707:"b6db316b",8786:"655ce7fc",8836:"77bbd4b0",8967:"41d67ebf",9021:"a79b721a",9048:"551a2c7a",9073:"7d74b8d7",9231:"693a8a50",9292:"dcc321a5",9330:"a2c3d8e1",9374:"a99f79c3",9376:"ce212990",9398:"4a4d5438",9418:"2a361030",9421:"8b02fde0",9611:"fc5e0d8c",9647:"13497643",9930:"36110b36"}[e]+".js",r.miniCssF=e=>{},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),f={},d="duelink:",r.l=(e,a,b,c)=>{if(f[e])f[e].push(a);else{var t,o;if(void 0!==b)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==d+b){t=u;break}}t||(o=!0,(t=document.createElement("script")).charset="utf-8",t.timeout=120,r.nc&&t.setAttribute("nonce",r.nc),t.setAttribute("data-webpack",d+b),t.src=e),f[e]=[a];var l=(a,b)=>{t.onerror=t.onload=null,clearTimeout(s);var d=f[e];if(delete f[e],t.parentNode&&t.parentNode.removeChild(t),d&&d.forEach((e=>e(b))),a)return a(b)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=l.bind(null,t.onerror),t.onload=l.bind(null,t.onload),o&&document.head.appendChild(t)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/duelink-website/",r.gca=function(e){return e={17896441:"8401",21185796:"458",30291390:"118",36041992:"8351",78520534:"6755",82498533:"6143",94786046:"4889",f33d41cb:"9","7b8c0ecd":"35",b5d98c20:"48",e644b27d:"143","0a292fa8":"306",c384e657:"368","5f3ff697":"373","31b868da":"394",db20eece:"461",cc6a45f1:"640","1c131897":"664","913c7c03":"670",ff0cbce9:"747","264c5aed":"749","03a987e8":"818","6d094485":"849","62dca7a2":"897",ae12fbbb:"904","098d7d33":"929","919d3e7f":"945","12bad719":"1156","8b6c725e":"1189",a7456010:"1235",a23550f5:"1254","01b1293c":"1260","245a7ff8":"1310","1374db13":"1356","2efe0052":"1530","7da5b444":"1538",f902b8af:"1625","5c233e30":"1839","7636da6f":"1886","8378a24f":"1894","6b77e3ad":"1958",b0b38557:"1989",b2e9aa02:"2013","41235ee0":"2022","015d60ce":"2175",f8551aab:"2224","831f5faa":"2262",e23c6c40:"2281",c4612325:"2287","93380e32":"2296","91157c02":"2351","89289a28":"2364",f3e56503:"2384","9a88743a":"2428","268d64eb":"2516","58bee9d7":"2518","55e5eba5":"2596",cdbe586d:"2600","0e36c416":"2633",c4f5d8e4:"2634",e35970bd:"2658","2313b17c":"2755","13a0e759":"2762",fe0ab593:"2774","5b8a3d83":"2929","5892e43a":"2930",b92f7816:"2968","96a8b58f":"2996","03181aef":"3088","8bf08310":"3123","3a9eec2b":"3125","4bcf30c3":"3157","67b63c54":"3163",f12e7eb5:"3200","8ee2b8b2":"3225",fe3f0105:"3239","43f5559f":"3268",c7b56d93:"3324","1e860f04":"3333",eb0ea83e:"3400","9e02544e":"3401",ddd14f97:"3420",f931e2a2:"3560","9aa3591d":"3884","932ba16d":"3887","63d72701":"3941","577f1766":"4024",d89bfbd5:"4083","66979cb4":"4085","0913c2bc":"4116","393be207":"4134","6bad33c4":"4151","0fc5d9fb":"4176","3408d25f":"4185","88bb50bf":"4280","8b02c1de":"4282",dc0c80ee:"4313",a1a806ff:"4336","49fafabf":"4358","09a92c54":"4378","8048f158":"4395",ea58a3b5:"4469","47935bdb":"4527","67579f3f":"4632",d349a865:"4701",d96a27b2:"4704","6da0aaf7":"4753",cf9ef405:"4785","9c63ef49":"4858","2730917e":"4909","542d90c0":"5000","13490bab":"5014","248e7f32":"5040","55772b62":"5179","5ed881e6":"5241","0b48b3cb":"5459","92ff5568":"5494",c46bd394:"5650",ab3d7a77:"5681",aba21aa0:"5742",ba0d5550:"5753",cbd09a24:"5764",c50174ef:"5794","6c6d2ca2":"5796","34cdee3c":"5855",ccb45942:"5895","4fba6633":"5940","7b3b763a":"6000","698c3fb7":"6009","29f89ffc":"6034","8b117166":"6035","1f391b9e":"6061",d1a557b5:"6147",f236b21c:"6148","38b709fe":"6173","857c2dc8":"6223","8658699a":"6247","276d463a":"6362","1d54a5ae":"6383","58ed3af5":"6404","62f3415e":"6569",c9663871:"6590","76b9cc46":"6611",c2064a4c:"6628",baa52984:"6713",e39ada81:"6757","414fbf3d":"6773",f8409a7e:"6903","35042fe7":"6935",b46e94e4:"7017","2144c6a0":"7080",a7bd4aaa:"7098","5abfc8c4":"7113","3422c030":"7130",c688902b:"7159","2c3112b9":"7276","928dfb9d":"7369","9b83f736":"7427","3a43809b":"7469","33a4210a":"7604",ef41c8ef:"7627","0cdadd00":"7713",a19dda6c:"7718",a942cd04:"7806","9a8ebc06":"7811","3da09b8d":"7848","6c30faed":"7867","2d115d4a":"7873",e4fc0b9b:"7894","0568281a":"7920",b3234443:"7940","413b26b5":"7950",e67d4564:"7964","080fae92":"7978","4a1064ad":"8080","7f48853b":"8138",d3f6f45c:"8338","74af603d":"8344","61aaf05b":"8397",febc33ed:"8448",b4152d38:"8492",d56f161f:"8582","6daaf80b":"8631","4fcf492b":"8663","6143bf0d":"8695","54931a3b":"8705","73e451a8":"8707",dd0f43d8:"8786",f6d6eda1:"8836","70b45444":"8967","382a2208":"9021",a94703ab:"9048","81f7538f":"9073","90d83cef":"9231","30b903e1":"9292","079336d9":"9330",d665013d:"9374","883326d9":"9376","0344b729":"9398","48b5d068":"9418",c800b892:"9421",fd407551:"9611","5e95c892":"9647",ee0e501f:"9930"}[e]||e,r.p+r.u(e)},(()=>{var e={5354:0,1869:0};r.f.j=(a,b)=>{var f=r.o(e,a)?e[a]:void 0;if(0!==f)if(f)b.push(f[2]);else if(/^(1869|5354)$/.test(a))e[a]=0;else{var d=new Promise(((b,d)=>f=e[a]=[b,d]));b.push(f[2]=d);var c=r.p+r.u(a),t=new Error;r.l(c,(b=>{if(r.o(e,a)&&(0!==(f=e[a])&&(e[a]=void 0),f)){var d=b&&("load"===b.type?"missing":b.type),c=b&&b.target&&b.target.src;t.message="Loading chunk "+a+" failed.\n("+d+": "+c+")",t.name="ChunkLoadError",t.type=d,t.request=c,f[1](t)}}),"chunk-"+a,a)}},r.O.j=a=>0===e[a];var a=(a,b)=>{var f,d,c=b[0],t=b[1],o=b[2],n=0;if(c.some((a=>0!==e[a]))){for(f in t)r.o(t,f)&&(r.m[f]=t[f]);if(o)var i=o(r)}for(a&&a(b);n<c.length;n++)d=c[n],r.o(e,d)&&e[d]&&e[d][0](),e[d]=0;return r.O(i)},b=self.webpackChunkduelink=self.webpackChunkduelink||[];b.forEach(a.bind(null,0)),b.push=a.bind(null,b.push.bind(b))})()})();