(this.webpackJsonpjscity=this.webpackJsonpjscity||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){"use strict";a.r(t);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var n=a(30),r=a.n(n),i=a(0),l=a.n(i),o=a(4),c=a(2),s=a.n(c),u=a(3),m={Project:"#757575",File:"#bdbdbd",FunctionDeclaration:"#e41a1c"},d={FILE:"File",PROJECT:"Project",FUNCTION:"FunctionDeclaration",PROGRAM:"Program",BLOCK:"BlockStatement",EXPRESSION:"ExpressionStatement",CALL_EXPRESSION:"CallExpression"};function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function E(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(a,!0).forEach((function(t){Object(u.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g=1;function f(e,t){var a=e.children.reduce((function(e,a){return e+(t[a].cec||1)+1}),0);return[(e.cec||1)+a,e.type===d.FUNCTION&&e.loc||1,(e.cec||1)+a]}var v=function(e){var t={},a=e[d.PROJECT],n=[a.id],r=0,i=0,l=0;for(t[a.id]=E({},a,{color:m[a.type],position:[r,i,l]});n.length;){var o=t[n.pop()],c=s()(t,"".concat(o.parent,".position[0]"),0),u=s()(t,"".concat(o.parent,".position[2]"),0);r=o.position[0]+c,l=o.position[2]+u;var p=s()(t,"".concat(o.id,".type"));p===d.FUNCTION?(r=r-o.size[0]/2+g,i=o.position[1]+o.size[1]/2,l=l-o.size[2]/2+g):p===d.FILE?(r=r-o.size[0]/2+g,i=o.position[1]+.5,l=l-o.size[2]/2+g):i=o.position[1]+.5;for(var v=0;v<o.children.length;v++){var b=e[o.children[v]],h=f(b,e),y=r,O=i+h[1]/2,N=l;b.type===d.FUNCTION&&(y+=h[0]/2,N+=h[2]/2),t[b.id]=E({},b,{color:m[b.type],position:[y,O,N],size:h}),r=r+h[0]+g,l=l+h[2]+g,n.unshift(b.id)}}return t[a.id].size=function(e){return e[d.PROJECT].children.reduce((function(t,a){var n=s()(e,"".concat(a,".size"));return[n[0]+t[0],1,n[2]+t[2]]}),[1,1,1])}(t),t},b=a(31);function h(e){return s()(e,"loc.start.line")}function y(e){return s()(e,"loc.end.line")}function O(e){return s()(e,"id.name","")}function N(e){var t=e.loc,a=t.start.line;return t.end.line-a+1}function _(e,t,a,n){var r=0;switch(e.type){case d.FUNCTION:case d.FILE:var i=function(e,t){return{id:t(),name:O(e),type:e.type,loc:N(e),startLine:h(e),endLine:y(e),children:[]}}(e,n);return a[i.id]=i,a[t].children.push(i.id),a[i.id].parent=t,r=i.type===d.FUNCTION?_(e.body,i.id,a,n):_(e.program,i.id,a,n),a[i.id].cec=r,r;case d.PROGRAM:case d.BLOCK:return e.body.reduce((function(e,r){return e+_(r,t,a,n)}),0);case d.EXPRESSION:return _(e.expression,t,a,n);case d.CALL_EXPRESSION:return 1;default:return 0}}var j=function(e){var t=0,a={},n={id:d.PROJECT,type:d.PROJECT,children:[]};a[n.id]=n,_(b.parse(e,{sourceType:"module",plugins:["jsx"]}),d.PROJECT,a,(function(){return t++}));var r=Object.keys(a).filter((function(e){return a[e].type===d.FILE})),i=r.reduce((function(e,t){return e+(a[t].loc||0)}),0),l=r.reduce((function(e,t){return e+(a[t].cec||0)}),0);return a[n.id].loc=i,a[n.id].cec=l,a},S=a(7),P=a.n(S);var C=function(e){var t=e.autoRotate,a=e.setAutoRotate,n=e.handleUpload,r=Object(i.useState)(!1),c=Object(o.a)(r,2),s=c[0],u=c[1];return l.a.createElement("nav",{className:P.a.navigation},l.a.createElement("h1",null,"JSCity"),l.a.createElement("div",{className:P.a.menu},l.a.createElement("div",{className:P.a.settings},l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"upload"},l.a.createElement("span",{role:"img","aria-label":"upload"},"\ud83d\udcc2")," ","upload file"),l.a.createElement("input",{style:{display:"none"},id:"upload",type:"file",accept:".js,.jsx",onChange:function(e){return n(e.target.files)}})),l.a.createElement("button",{className:P.a.toggle,onClick:function(){return u(!s)}},l.a.createElement("span",{role:"img","aria-label":"open settings"},"\u2699\ufe0f"))),s&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:P.a.divider}),l.a.createElement("div",{className:P.a.options},l.a.createElement("div",{className:P.a.option},l.a.createElement("input",{id:"autoRotate",type:"checkbox",value:t,checked:t,onChange:a}),l.a.createElement("label",{htmlFor:"autoRotate"},"auto rotate"))),l.a.createElement("div",{className:P.a.options},l.a.createElement("a",{href:"https://peaonunes.github.io/jscity/example.js",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("span",{role:"img","aria-label":"download example 1"},"\u2b07")," ","Example file 1"),l.a.createElement("a",{href:"https://peaonunes.github.io/jscity/example2.js",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("span",{role:"img","aria-label":"download example 2"},"\u2b07")," ","Example file 2")))))},k=a(5),w=a.n(k);var R=function(e){var t=e.block,a=Object(i.useState)(!0),n=Object(o.a)(a,2),r=n[0],c=n[1];return l.a.createElement("div",{className:w.a.details},l.a.createElement("div",{className:w.a.title},l.a.createElement("strong",{className:w.a.ellipsis,title:s()(t,"name","")},s()(t,"name","")),l.a.createElement("button",{className:w.a.toggle,onClick:function(){return c(!r)}},r&&"\ud83d\ude48",!r&&"\ud83d\udc35")),r&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:w.a.divider}),l.a.createElement("div",{className:w.a.content},l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"id","")},l.a.createElement("strong",null,"Id: "),s()(t,"id","")),l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"type","")},l.a.createElement("strong",null,"Type: "),l.a.createElement("span",{style:{color:m[s()(t,"type","")]}},"\u25cf"," "),s()(t,"type","")),l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"loc","")},l.a.createElement("strong",null,"Lines of Code: "),s()(t,"loc","")),l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"cec","")},l.a.createElement("strong",null,"Call Expressions: "),s()(t,"cec","")),l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"startLine","")},l.a.createElement("strong",null,"Start line: "),s()(t,"startLine","")),l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"endLine","")},l.a.createElement("strong",null,"End line: "),s()(t,"endLine","")),l.a.createElement("div",{className:w.a.ellipsis,title:s()(t,"parent","")},l.a.createElement("strong",null,"Parent id: "),s()(t,"parent","")))))},F=a(32),x=a.n(F);var L=function(){return l.a.createElement("div",{className:x.a.github},l.a.createElement("a",{href:"https://github.com/peaonunes/jscity",target:"_blank",rel:"noopener noreferrer"},"GitHub"))},I=a(8),B=a(1),D=a(33);Object(I.b)({OrbitControls:D.a});var T=function(e){var t=e.autoRotate,a=Object(i.useRef)(),n=Object(I.d)(),r=n.camera,o=n.gl;return Object(I.c)((function(){return a.current.update()})),l.a.createElement("orbitControls",{autoRotate:t,ref:a,args:[r,o.domElement],enableDamping:!0,dampingFactor:.1,maxZoom:40,minZoom:1,maxPolarAngle:Math.PI/2})},M=a(17),z=a(6);var J=function(e){var t=e.block,a=e.selectedBlock,n=e.onSelect,r=Object(i.useMemo)((function(){return Object(M.a)(B.BoxBufferGeometry,Object(z.a)(t.size))}),[t]),o=s()(a,"id")===t.id?"white":t.color;return l.a.createElement("mesh",{userData:t,position:t.position,onClick:function(e){e.stopPropagation(),n(e.eventObject.userData)},castShadow:!0,receiveShadow:!0},l.a.createElement("meshPhysicalMaterial",{attach:"material",color:o}),l.a.createElement("boxBufferGeometry",{attach:"geometry",args:t.size}),l.a.createElement("lineSegments",null,l.a.createElement("edgesGeometry",{attach:"geometry",args:[r]}),l.a.createElement("lineBasicMaterial",{color:"black",attach:"material"})))},A=function(){return l.a.createElement("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.5,0],receiveShadow:!0},l.a.createElement("planeBufferGeometry",{attach:"geometry",args:[100,100]}),l.a.createElement("meshPhysicalMaterial",{attach:"material",color:"#377eb8"}))};var G=function(e){var t=e.city,a=e.selectedBlock,n=e.onSelect;return l.a.createElement(l.a.Fragment,null,l.a.createElement("group",null,Object.keys(t).map((function(e){return l.a.createElement(J,{key:e,block:t[e],selectedBlock:a,onSelect:n})}))),l.a.createElement(A,null))};var U=function(e){var t=e.city,a=e.selectedBlock,n=e.onSelect,r=e.autoRotate;return l.a.createElement(I.a,{className:"canva",orthographic:!0,camera:{position:[25,25,55],zoom:5,up:[0,1,0],far:1e3},onCreated:function(e){var t=e.gl;t.shadowMap.enabled=!0,t.shadowMap.type=B.PCFSoftShadowMap}},l.a.createElement("ambientLight",{intensity:.75}),l.a.createElement("spotLight",{position:[0,50,100],penumbra:1,castShadow:!0}),l.a.createElement(G,{city:t,selectedBlock:a,onSelect:n}),l.a.createElement(T,{autoRotate:r}))};var X=function(){var e=Object(i.useState)(!0),t=Object(o.a)(e,2),a=t[0],n=t[1],r=Object(i.useState)(null),c=Object(o.a)(r,2),u=c[0],m=c[1],d=Object(i.useState)(),p=Object(o.a)(d,2),E=p[0],g=p[1],f=Object(i.useMemo)((function(){if(!E)return{};var e=j(E);return v(e)}),[E]);return l.a.createElement(l.a.Fragment,null,l.a.createElement(C,{autoRotate:a,setAutoRotate:function(){return n(!a)},handleUpload:function(e){if(null!=e){var t=new FileReader;t.onloadend=function(){g(t.result)},t.readAsText(e[0])}}}),u&&l.a.createElement(R,{block:u}),l.a.createElement(U,{city:f,selectedBlock:u,onSelect:function(e){e.id===s()(u,"id","")?m(null):m(e)},autoRotate:a}),l.a.createElement(L,null))};a(105);r.a.render(l.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},32:function(e,t,a){e.exports={github:"GitHub_github__A_70Z"}},38:function(e,t,a){e.exports=a(106)},5:function(e,t,a){e.exports={details:"Details_details__S35Wv",title:"Details_title__nJ_Go",ellipsis:"Details_ellipsis__237XE",toggle:"Details_toggle__2D3gZ",divider:"Details_divider__29NC1",content:"Details_content__9f6wH"}},7:function(e,t,a){e.exports={navigation:"Navigation_navigation__Weesd",menu:"Navigation_menu__2d1Hw",settings:"Navigation_settings__20t9x",toggle:"Navigation_toggle__1Xtjc",divider:"Navigation_divider__3PBSu",options:"Navigation_options__1gFcg"}}},[[38,1,2]]]);
//# sourceMappingURL=main.c2f5f7e3.chunk.js.map