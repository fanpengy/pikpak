var he=Object.defineProperty;var X=Object.getOwnPropertySymbols;var fe=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable;var Q=(t,e,o)=>e in t?he(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,$=(t,e)=>{for(var o in e||(e={}))fe.call(e,o)&&Q(t,o,e[o]);if(X)for(var o of X(e))ve.call(e,o)&&Q(t,o,e[o]);return t};import{d as P,u as _e,r as k,o as ee,a as te,b as E,c as oe,w as c,e as n,f as i,N as ke,g as ye,h as we,z as Fe,i as Ee,j as De,C as g,k as T,l as Be,m as xe,n as Ae,p as Ie,q as be,s as C,t as Ce,v as Se,x as Ne,y as S,A as j,B as Oe,D as Le,E as L,F as D,G as ae,H as $e,I as Pe,J as R,L as Te,K as se,M as je,O as Re,P as ze,Q as Ve,R as Me,S as Je,T as Ue,U as We,V as ie,W as He,X as Ke,Y as qe,Z as Ye,_ as Ge,$ as Ze,a0 as Xe,a1 as Qe,a2 as et,a3 as tt,a4 as ot}from"./vendor.e30ffaad.js";const at=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(s){if(s.ep)return;s.ep=!0;const l=o(s);fetch(s.href,l)}};at();const st=P({setup(t){return window.$message=_e(),(e,o)=>null}}),it=["https://pikpak.sanxingdui.cf","https://diii.tk","https://api-pikpak.tjsky.cf","https://api-pikpak.tjsky-1.cf","https://pan.yooyi.tk","https://pk.pikpakz.top","https://cc123.cf","https://cf-api.xswd.cf","https://pikpak.arielherself.xyz","https://f.nxcloud.uk","https://wkr.btstream.net","https://dns.firmant.me","https://p.emobiz.cn","https://pikpak.yang-s.online"],nt=P({setup(t){const e=k({common:{primaryColor:"#306eff",hoverColor:"#306eff",primaryColorHover:"#306eff",heightMedium:"42px"},Layout:{siderColor:"#f5f5f6"},Breadcrumb:{fontSize:"16px"},Dropdown:{optionTextColorHover:"#fff"},InternalSelectMenu:{optionTextColorActive:"#fff"},Upload:{itemColorHover:"#F3F3F5FF",itemTextColorSuccess:"#18A058FF"}});return ee(()=>{localStorage.getItem("isSettingProxy")||localStorage.setItem("proxy",JSON.stringify(it))}),(o,a)=>{const s=te("router-view");return E(),oe(i(De),{locale:i(Fe),"date-locale":i(Ee),"theme-overrides":e.value},{default:c(()=>[n(i(we),null,{default:c(()=>[n(i(ke),null,{default:c(()=>[n(i(ye),null,{default:c(()=>[n(st),n(s)]),_:1})]),_:1})]),_:1})]),_:1},8,["locale","date-locale","theme-overrides"])}}}),rt="modulepreload",ne={},ut="/pikpak/",h=function(e,o){return!o||o.length===0?e():Promise.all(o.map(a=>{if(a=`${ut}${a}`,a in ne)return;ne[a]=!0;const s=a.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${l}`))return;const r=document.createElement("link");if(r.rel=s?"stylesheet":rt,s||(r.as="script",r.crossOrigin=""),r.href=a,document.head.appendChild(r),s)return new Promise((v,d)=>{r.addEventListener("load",v),r.addEventListener("error",d)})})).then(()=>e())};var lt="/pikpak/assets/logo1.08eb9157.png";const re={query:()=>V.get("https://encrypt/api/account_get"),queryAll:()=>V.get("https://localhost:3000/api/accounts"),used:t=>V.post("https://encrypt/api/account_used",{id:t})};var z={encrypt(t,e){if(!e)return t;var o=g.enc.Utf8.parse(e),a=g.enc.Utf8.parse(t),s=g.AES.encrypt(a,o,{mode:g.mode.OFB,padding:g.pad.Pkcs7,iv:g.enc.Utf8.parse("pikpak"),blockSize:8});return s.toString()},decrypt(t,e){if(!e)return t;var o=g.enc.Utf8.parse(e),a=g.AES.decrypt(t,o,{mode:g.mode.OFB,padding:g.pad.Pkcs7,iv:g.enc.Utf8.parse("pikpak"),blockSize:8});return g.enc.Utf8.stringify(a).toString()}};const f=T.create({});f.interceptors.request.use(t=>{var o;const e=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}");if(t.headers=t.headers||{},e.access_token&&(t.headers.Authorization=`${e.token_type||"Bearer"} ${e.access_token}`),((o=t.url)==null?void 0:o.indexOf("https://",4))===-1){const a=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(a.length>0){const s=Math.floor(Math.random()*a.length);t.url=a[s]+"/"+t.url}}return t});let y=!1;f.interceptors.response.use(t=>t,t=>{var a,s,l;const{response:e,config:o}=t;if(e.status)switch(e.status){case 401:console.log(1);const r=window.localStorage.getItem("pikpakLoginData"),v=r?JSON.parse(r):{};return v.username&&v.password&&!y?(console.log("wait",o.url),y=!0,f.post("https://user.mypikpak.com/v1/auth/signin",$({captcha_token:"",client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg"},v)).then(d=>(d.data&&d.data.access_token&&window.localStorage.setItem("pikpakLogin",JSON.stringify(d.data)),y=!1,f(o))).catch(()=>(B.push("/login"),!1))):v.username&&v.password&&y?new Promise((d,x)=>{const m=setInterval(()=>{y||(clearInterval(m),d(f(o)))},100)}):(B.push("/login?redirect="+B.currentRoute.value.fullPath),Promise.reject(t));case 403:if(((a=e==null?void 0:e.data)==null?void 0:a.error)==="task_daily_create_limit"){const d=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}"),x=JSON.parse(localStorage.getItem("pikpakOptimize")||"{}");if(x.autoChangeAccount){const m=d.id?d.id:-1;m>-1&&re.used(m).catch(w=>{console.error(w)}),re.query().then(w=>{if(w.data.length<=0)window.$message.error("\u6CA1\u6709\u53EF\u7528\u8D26\u53F7\uFF0C\u5373\u5C06\u8DF3\u8F6C\u5230\u767B\u9646"),window.localStorage.removeItem("pikpakLogin"),window.localStorage.removeItem("pikpakLoginData"),B.push("/login");else{const N=w.data[0];if(y)return new Promise((A,F)=>{const b=setInterval(()=>{if(!y)return clearInterval(b),B.push("/list"),!1},100)});{const A=z.decrypt(N.email,x.key),F=z.decrypt(N.password,x.key),b={username:A,password:F};return console.debug(b),y=!0,f.post("https://user.mypikpak.com/v1/auth/signin",$({captcha_token:"",client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg"},b)).then(I=>(I.data&&I.data.access_token&&(I.data.id=N.id,window.localStorage.setItem("pikpakLogin",JSON.stringify(I.data))),y=!1,window.$message.error("\u60A8\u4ECA\u65E5\u7684\u514D\u8D39\u4F7F\u7528\u6B21\u6570\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u5207\u6362\u8D26\u53F7\u540E\u8BF7\u5237\u65B0"),B.push("/list"),!1)).catch(()=>(window.$message.error("\u81EA\u52A8\u5207\u6362\u8D26\u53F7\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u6216\u624B\u52A8\u5207\u6362"),!1))}}}).catch(w=>{console.log(w),window.$message.error("\u67E5\u8BE2\u8D26\u53F7\u5F02\u5E38\uFF0C\u8BF7\u91CD\u8BD5")})}}else window.$message.error(((s=e==null?void 0:e.data)==null?void 0:s.error_description)||"\u51FA\u9519\u4E86");break;default:window.$message.error(((l=e==null?void 0:e.data)==null?void 0:l.error_description)||"\u51FA\u9519\u4E86");break}return console.log(o.url,111),Promise.reject(t)});const ct=T.create({});ct.interceptors.request.use(t=>{t.headers={Authorization:"Bearer secret_FErDcv3kgsFNLiWUDOWYdJhNqOIKj55eteBg3vIoiLt","Notion-Version":"2021-08-16","Content-Type":"application/json"};const e=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(e.length>0){const o=Math.floor(Math.random()*e.length);t.url=e[o]+"/"+t.url}return t});const ue=T.create({});ue.interceptors.request.use(t=>{var e=t.url;if(console.log("url",e),e&&!(e==null?void 0:e.startsWith("http://localhost:3000"))){const r=JSON.parse(localStorage.getItem("pikpakOptimize")||"{}");if(r.autoChangeAccount){var o=e.indexOf("encrypt")+7,a=e.indexOf("decrypt"),s=e==null?void 0:e.substring(o,a),l=z.decrypt(s,r.key);t.url="https://"+l+e.substring(a+7)}}return t});const V=ue,le=function(t){if(isNaN(t))return"";let e=["bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],o=Math.floor(Math.log(t)/Math.log(2));o<1&&(o=0);let a=Math.floor(o/10);return t=t/Math.pow(2,10*a),t.toString().length>t.toFixed(2).toString().length&&(t=parseFloat(t.toFixed(2))),t+" "+e[a]};const pt=D("a",{href:"https://mypikpak.com/",target:"_blank",class:"logo-box"},[D("img",{src:"https://mypikpak.com/apple-touch-icon.png",class:"logo-box__icon",alt:""}),D("div",{class:"logo-box__text"},"PikPak")],-1),dt={key:0,class:"content-bottom"},mt=S("\u4F1A\u5458\u7801"),gt={style:{"margin-bottom":"0"}},ht=D("a",{style:{color:"#306eff"},target:"_blank",href:"https://www.tjsky.net/?p=220#i-21"},"\u6587\u4EF6\u5217\u8868\u5237\u4E0D\u51FA\u6765\uFF1F",-1),ft=S(" \u3010\u8BF7\u4F9D\u6B21\u70B9\u9009\uFF1A\u8BBE\u7F6E-\u4EE3\u7406\u8BBE\u7F6E-\u6062\u590D\u9ED8\u8BA4-\u4FDD\u5B58\u8BBE\u7F6E \u540E\u518D\u5237\u65B0\u8BD5\u8BD5\u3011 "),vt={class:"bottom-user-info"},_t={key:0,src:lt,class:"user-info-avatar"},kt={key:1,src:"https://www.mypikpak.com/logo.png",class:"user-info-avatar"},yt={class:"user-info-name"},wt={key:0},Ft={class:"action"},Et=S(" \u9000\u51FA\u767B\u5F55 "),Dt=S("\u6DFB\u52A0"),Bt=P({setup(t){const e=k(!1),o=u=>()=>ie(R,null,{default:()=>ie(u)}),a=Be(),s=xe(),l=k([{label:"\u6587\u4EF6",key:"list",icon:o(Ze)},{label:"\u89C6\u9891",key:"video",icon:o(He)},{label:"\u56FE\u7247",key:"image",icon:o(Ke)},{label:"\u56DE\u6536\u7AD9",key:"trash",icon:o(qe)},{label:"\u9080\u8BF7",key:"invited",icon:o(Ye)},{label:"\u8BBE\u7F6E",key:"setting",icon:o(Ge)}]),r=k(),v=()=>{f.get("https://user.mypikpak.com/v1/user/me").then(u=>{window.localStorage.setItem("pikpakUser",JSON.stringify(u.data)),r.value=u.data}).catch(u=>{console.log(u)})},d=k(),x=()=>{f.get("https://api-drive.mypikpak.com/drive/v1/about").then(u=>{d.value=u.data}).catch(u=>{console.log(u)})},m=k(),w=()=>{f.get("https://api-drive.mypikpak.com/drive/v1/privilege/vip").then(u=>{var p;m.value=(p=u.data)==null?void 0:p.data})},N=(u,p)=>{console.log(p),a.push("/"+p.key)};ee(()=>{v(),x(),w()});const A=k(),F=k(!1),b=()=>{f.post("https://api-drive.mypikpak.com/vip/v1/order/activation-code",{activation_code:A.value,data:{}}).then(u=>{window.$message.success("\u5151\u6362\u6210\u529F"),x()}).catch(u=>{console.log(u)}).finally(()=>{F.value=!1})},I=k(!1),ce=u=>{I.value=u<800,e.value||(e.value=u<800)};Ae(s,()=>{I.value&&(e.value=!0)});const pe=Ie(),de=()=>{pe.warning({title:"\u8B66\u544A",content:"\u786E\u5B9A\u9000\u51FA\uFF1F",positiveText:"\u786E\u5B9A",negativeText:"\u4E0D\u786E\u5B9A",onPositiveClick:()=>{f.post("https://user.mypikpak.com/v1/auth/revoke",{}).then(u=>{window.localStorage.removeItem("pikpakLogin"),window.localStorage.removeItem("pikpakLoginData"),window.$message.success("\u9000\u51FA\u6210\u529F"),a.push("/login")}).catch(u=>{console.log(u)})}})};return(u,p)=>{const me=te("router-view"),ge=be("resize");return E(),C(We,null,[Ce(n(i(se),{"has-sider":"",onResize:ce},{default:c(()=>[n(i(Se),{"content-style":{display:"flex",flexDirection:"column"},"collapse-mode":"width","collapsed-width":0,width:240,"show-trigger":"bar",collapsed:e.value,onCollapse:p[1]||(p[1]=_=>e.value=!0),onExpand:p[2]||(p[2]=_=>e.value=!1),bordered:""},{default:c(()=>{var _,M,J,U,W,H,K,q,Y,G,Z;return[pt,n(i(Ne),{options:l.value,value:String(i(s).name),"onUpdate:value":N},null,8,["options","value"]),e.value?L("",!0):(E(),C("div",dt,[S(j(i(le)((_=d.value)==null?void 0:_.quota.usage))+" / "+j(i(le)((M=d.value)==null?void 0:M.quota.limit))+" ",1),n(i(Oe),{type:"primary",onClick:p[0]||(p[0]=It=>F.value=!0)},{default:c(()=>[mt]),_:1}),((J=d.value)==null?void 0:J.quota)?(E(),oe(i(Le),{key:0,type:"line",percentage:Number((((U=d.value)==null?void 0:U.quota.usage)/((W=d.value)==null?void 0:W.quota.limit)*100).toFixed(2)),"indicator-placement":"inside",height:14,color:((H=m.value)==null?void 0:H.status)==="ok"?"#d1ae6a":void 0,processing:""},null,8,["percentage","color"])):L("",!0),D("p",gt,[n(i(ae),{placement:"right"},{trigger:c(()=>[ht]),default:c(()=>[ft]),_:1})])])),e.value?L("",!0):(E(),C("div",{key:1,class:$e(["sider-bottom",{vip:((K=m.value)==null?void 0:K.status)==="ok"}])},[D("div",vt,[((q=m.value)==null?void 0:q.status)==="ok"?(E(),C("img",_t)):(E(),C("img",kt)),D("div",yt,[S(j((Y=r.value)==null?void 0:Y.name)+" ",1),((G=m.value)==null?void 0:G.status)==="ok"&&((Z=m.value)==null?void 0:Z.expire)?(E(),C("div",wt,[n(i(Pe),{time:new Date(m.value.expire),type:"datetime"},null,8,["time"])])):L("",!0)]),D("div",Ft,[n(i(ae),null,{trigger:c(()=>[n(i(R),{onClick:de},{default:c(()=>[n(i(Te))]),_:1})]),default:c(()=>[Et]),_:1})])])],2))]}),_:1},8,["collapsed"]),n(i(se),null,{default:c(()=>[n(i(je),{style:{height:"100vh"}},{default:c(()=>[n(i(Re),{style:{"max-height":"100vh"}},{default:c(()=>[n(me)]),_:1})]),_:1})]),_:1})]),_:1},512),[[ge]]),n(i(Ue),{show:F.value,"onUpdate:show":p[5]||(p[5]=_=>F.value=_)},{default:c(()=>[n(i(ze),{style:{width:"600px"},title:"\u4F1A\u5458\u7801"},{"header-extra":c(()=>[n(i(R),{onClick:p[3]||(p[3]=_=>F.value=!1)},{default:c(()=>[n(i(Ve))]),_:1})]),action:c(()=>[n(i(Me),{block:!0,type:"primary",disabled:!A.value,onClick:b},{default:c(()=>[Dt]),_:1},8,["disabled"])]),default:c(()=>[n(i(Je),{placeholder:"\u4F1A\u5458\u7801",value:A.value,"onUpdate:value":p[4]||(p[4]=_=>A.value=_)},null,8,["value"])]),_:1})]),_:1},8,["show"])],64)}}}),xt=[{path:"/",name:"home",component:Bt,redirect:"/list",beforeEnter:(t,e,o)=>{const a=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}");(!a||!a.access_token)&&t.name!=="setting"?o("/login"):o()},children:[{path:"list/:id?",name:"list",component:()=>h(()=>import("./list.21a73b72.js"),["assets/list.21a73b72.js","assets/list.764e0448.css","assets/vendor.e30ffaad.js","assets/clipboard.df7e1161.js"])},{path:"video",name:"video",component:()=>h(()=>import("./list.21a73b72.js"),["assets/list.21a73b72.js","assets/list.764e0448.css","assets/vendor.e30ffaad.js","assets/clipboard.df7e1161.js"])},{path:"image",name:"image",component:()=>h(()=>import("./list.21a73b72.js"),["assets/list.21a73b72.js","assets/list.764e0448.css","assets/vendor.e30ffaad.js","assets/clipboard.df7e1161.js"])},{path:"trash",name:"trash",component:()=>h(()=>import("./trash.d70a00b1.js"),["assets/trash.d70a00b1.js","assets/trash.99a3677d.css","assets/vendor.e30ffaad.js"])},{path:"setting",name:"setting",component:()=>h(()=>import("./setting.64b7a4d1.js"),["assets/setting.64b7a4d1.js","assets/setting.f947579c.css","assets/vendor.e30ffaad.js","assets/clipboard.df7e1161.js"])},{path:"invited",name:"invited",component:()=>h(()=>import("./invited.dcbcd54a.js"),["assets/invited.dcbcd54a.js","assets/invited.74b24e1e.css","assets/clipboard.df7e1161.js","assets/vendor.e30ffaad.js"])}]},{path:"/t/:id?",name:"test",component:()=>h(()=>import("./test.d5d35180.js"),["assets/test.d5d35180.js","assets/vendor.e30ffaad.js"])},{path:"/s/:id/:password?",name:"shareInfo",component:()=>h(()=>import("./shareInfo.24ecd7cd.js"),["assets/shareInfo.24ecd7cd.js","assets/shareInfo.678356c6.css","assets/vendor.e30ffaad.js"])},{path:"/login",name:"login",component:()=>h(()=>import("./login.27cacd25.js"),["assets/login.27cacd25.js","assets/login.a8b45006.css","assets/vendor.e30ffaad.js","assets/phone-pc2.dbf6d71e.js"])},{path:"/sms",name:"sms",component:()=>h(()=>import("./sms.511ec086.js"),["assets/sms.511ec086.js","assets/sms.81a6d8ca.css","assets/phone-pc2.dbf6d71e.js","assets/vendor.e30ffaad.js"])},{path:"/register",name:"register",component:()=>h(()=>import("./register.64531ef3.js"),["assets/register.64531ef3.js","assets/register.5588ce76.css","assets/vendor.e30ffaad.js","assets/phone-pc2.dbf6d71e.js"])},{path:"/testtest",name:"testtest",component:()=>h(()=>import("./testtest.fc0d701e.js"),["assets/testtest.fc0d701e.js","assets/vendor.e30ffaad.js"])}],At=Xe({history:Qe(),routes:xt});var B=At;const O=et(nt);O.directive("resize",{mounted(t,e,o){t.$$erd=tt({strategy:"scroll"}),t.$$erd.listenTo({},t,a=>{let s=a.offsetWidth,l=a.offsetHeight;t.$$time&&clearTimeout(t.$$time),t.$$time=setTimeout(()=>{var r;(r=o.props)==null||r.onResize(s,l)},300)})},unmounted(t){t.$$erd&&t.$$erd.uninstall(t),t.$$time&&clearTimeout(t.$$time)}});O.config.globalProperties.$http=f;O.use(B);O.use(ot,{router:B,siteIdList:[1280680983]});O.mount("#app");export{z as a,le as b,f as i,it as p};
