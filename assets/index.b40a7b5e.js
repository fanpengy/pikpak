var _e=Object.defineProperty;var ae=Object.getOwnPropertySymbols;var ke=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var se=(e,t,o)=>t in e?_e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,V=(e,t)=>{for(var o in t||(t={}))ke.call(t,o)&&se(e,o,t[o]);if(ae)for(var o of ae(t))ye.call(t,o)&&se(e,o,t[o]);return e};import{d as J,u as we,r as E,o as re,a as ne,b as D,c as ie,w as u,e as n,f as r,N as Ae,g as Ee,h as Fe,z as De,i as Ie,j as Be,C as f,k as R,l as xe,m as Se,n as Ne,p as Le,q as Ce,s as L,t as Oe,v as Me,x as be,y as C,A as K,B as Te,D as M,R as Pe,T as Ve,E as Je,F as P,G as I,H as ue,I as Re,J as Ke,L as Ue,K as le,M as $e,O as ze,P as je,Q as He,S as We,U as Ye,V as Qe,W as Ze,X as ce,Y as Xe,Z as Ge,_ as qe,$ as et,a0 as tt,a1 as ot,a2 as at,a3 as st,a4 as rt,a5 as nt,a6 as it}from"./vendor.2a1693fe.js";const ut=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerpolicy&&(l.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?l.credentials="include":a.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=o(a);fetch(a.href,l)}};ut();const lt=J({setup(e){return window.$message=we(),(t,o)=>null}}),ct=["https://api-pikpak.tjsky.cf","https://api-pikpak.tjsky-1.cf","https://pan.yooyi.tk","https://pk.pikpakz.top","https://cc123.cf","https://cf-api.xswd.cf","https://f.nxcloud.uk","https://wkr.btstream.net","https://dns.firmant.me","https://pikpak.yang-s.online"],dt=J({setup(e){const t=E({common:{primaryColor:"#306eff",hoverColor:"#306eff",primaryColorHover:"#306eff",heightMedium:"42px"},Layout:{siderColor:"#f5f5f6"},Breadcrumb:{fontSize:"16px"},Dropdown:{optionTextColorHover:"#fff"},InternalSelectMenu:{optionTextColorActive:"#fff"},Upload:{itemColorHover:"#F3F3F5FF",itemTextColorSuccess:"#18A058FF"}});return re(()=>{localStorage.getItem("isSettingProxy")||localStorage.setItem("proxy",JSON.stringify(ct))}),(o,s)=>{const a=ne("router-view");return D(),ie(r(Be),{locale:r(De),"date-locale":r(Ie),"theme-overrides":t.value},{default:u(()=>[n(r(Fe),null,{default:u(()=>[n(r(Ae),null,{default:u(()=>[n(r(Ee),null,{default:u(()=>[n(lt),n(a)]),_:1})]),_:1})]),_:1})]),_:1},8,["locale","date-locale","theme-overrides"])}}}),pt="modulepreload",de={},mt="/pikpak/",h=function(t,o){return!o||o.length===0?t():Promise.all(o.map(s=>{if(s=`${mt}${s}`,s in de)return;de[s]=!0;const a=s.endsWith(".css"),l=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${l}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":pt,a||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),a)return new Promise((m,g)=>{c.addEventListener("load",m),c.addEventListener("error",g)})})).then(()=>t())};var gt="/pikpak/assets/logo1.08eb9157.png",ft="data:image/png;base64,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";const U={query:()=>z.get("https://encryptDzkVM9c5Up6eon7jLGIySoVv0180s2Y/cvpxfPZ5Dfs=decrypt/account/get"),queryAll:()=>z.get("https://encryptDzkVM9c5Up6eon7jLGIySoVv0180s2Y/cvpxfPZ5Dfs=decrypt/account/all"),use:e=>z.post("https://encryptDzkVM9c5Up6eon7jLGIySoVv0180s2Y/cvpxfPZ5Dfs=decrypt/account/use",{id:e})};var $={encrypt(e,t){if(!t)return e;var o=f.enc.Utf8.parse(t),s=f.enc.Utf8.parse(e),a=f.AES.encrypt(s,o,{mode:f.mode.OFB,padding:f.pad.Pkcs7,iv:f.enc.Utf8.parse("pikpak"),blockSize:8});return a.toString()},decrypt(e,t){if(!t)return e;var o=f.enc.Utf8.parse(t),s=f.AES.decrypt(e,o,{mode:f.mode.OFB,padding:f.pad.Pkcs7,iv:f.enc.Utf8.parse("pikpak"),blockSize:8});return f.enc.Utf8.stringify(s).toString()}};const v=R.create({});v.interceptors.request.use(e=>{var o;const t=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}");if(e.headers=e.headers||{},t.access_token&&(e.headers.Authorization=`${t.token_type||"Bearer"} ${t.access_token}`),((o=e.url)==null?void 0:o.indexOf("https://",4))===-1){const s=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(s.length>0){const a=Math.floor(Math.random()*s.length);e.url=s[a]+"/"+e.url}}return e});let y=!1;v.interceptors.response.use(e=>e,async e=>{var s,a,l,c,m;const{response:t,config:o}=e;if(t.status)switch(t.status){case 401:console.log(1);const g=window.localStorage.getItem("pikpakLoginData"),w=g?JSON.parse(g):{};return w.username&&w.password&&!y?(console.log("wait",o.url),y=!0,v.post("https://user.mypikpak.com/v1/auth/signin",V({captcha_token:"",client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg"},w)).then(p=>(p.data&&p.data.access_token&&window.localStorage.setItem("pikpakLogin",JSON.stringify(p.data)),y=!1,v(o))).catch(()=>(x.push("/login"),!1))):w.username&&w.password&&y?new Promise((p,F)=>{const S=setInterval(()=>{y||(clearInterval(S),p(v(o)))},100)}):(x.push("/login?redirect="+x.currentRoute.value.fullPath),Promise.reject(e));case 403:if(((s=t==null?void 0:t.data)==null?void 0:s.error)==="task_daily_create_limit"){const p=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}"),F=JSON.parse(localStorage.getItem("pikpakOptimize")||"{}");if(F==null?void 0:F.accountAutomatic){window.$message.warning((((a=t==null?void 0:t.data)==null?void 0:a.error_description)||"\u51FA\u9519\u4E86")+" \u5C1D\u8BD5\u5207\u6362\u8D26\u53F7");const S=p.id?p.id:-1;let _={};if(S>-1?await vt(S)===0?window.$message.error("\u5904\u7406\u8D26\u53F7\u5931\u8D25"):_=await me():_=await me(),_.id&&_.id>0){if(window.$message.success("\u83B7\u53D6\u8D26\u53F7\u6210\u529F: "+_.id+"\uFF0C\u5C1D\u8BD5\u767B\u9646"),y)return new Promise((O,B)=>{const k=setInterval(()=>{y||(clearInterval(k),x.push("/list"))},100)});{const O=$.decrypt(_.email,F.key),B=$.decrypt(_.password,F.key),k={username:O,password:B};return console.debug(k),y=!0,v.post("https://user.mypikpak.com/v1/auth/signin",V({captcha_token:"",client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg"},k)).then(N=>{N.data&&N.data.access_token&&(N.data.id=_.id,window.localStorage.setItem("pikpakLogin",JSON.stringify(N.data))),y=!1,window.$message.success("\u767B\u5F55\u6210\u529F"),x.push("/")}).catch(()=>{y=!1,window.$message.error("\u81EA\u52A8\u767B\u5F55\u5931\u8D25")})}}else window.$message.error("\u83B7\u53D6\u8D26\u53F7\u5931\u8D25\uFF01")}else window.$message.error(((l=t==null?void 0:t.data)==null?void 0:l.error_description)||"\u51FA\u9519\u4E86")}else window.$message.error(((c=t==null?void 0:t.data)==null?void 0:c.error_description)||"\u51FA\u9519\u4E86");break;default:window.$message.error(((m=t==null?void 0:t.data)==null?void 0:m.error_description)||"\u51FA\u9519\u4E86");break}return console.log(o.url,111),Promise.reject(e)});const ht=R.create({});ht.interceptors.request.use(e=>{e.headers={Authorization:"Bearer secret_FErDcv3kgsFNLiWUDOWYdJhNqOIKj55eteBg3vIoiLt","Notion-Version":"2021-08-16","Content-Type":"application/json"};const t=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(t.length>0){const o=Math.floor(Math.random()*t.length);e.url=t[o]+"/"+e.url}return e});const pe=R.create({});pe.interceptors.request.use(e=>{var t=e==null?void 0:e.url;const o=JSON.parse(localStorage.getItem("pikpakOptimize")||"{}");if(t&&(o==null?void 0:o.accountAutomatic))if(t.startsWith("https://localhost:3000")){if(t=t.replace("localhost:3000",o.accountHost),o.accountHost.search(/:/g)===-1){const m=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(m.length>0){const g=Math.floor(Math.random()*m.length);t=m[g]+"/"+t}}e.url=t}else{var s=t.indexOf("encrypt")+7,a=t.indexOf("decrypt"),l=t.substring(s,a),c=$.decrypt(l,o.key);e.url="https://"+c+t.substring(a+7);const m=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(m.length>0){const g=Math.floor(Math.random()*m.length);e.url=m[g]+"/"+e.url}}return e});const vt=async e=>await U.use(e).then(t=>e).catch(t=>(console.log(t),0)),me=async()=>await U.query().then(e=>e.data.length<=0?(window.$message.error("\u6CA1\u6709\u53EF\u7528\u8D26\u53F7"),{}):e.data[0]).catch(e=>(console.log(e.response),window.$message.error("\u67E5\u8BE2\u8D26\u53F7\u5931\u8D25"),{})),z=pe,ge=function(e){if(isNaN(e))return"";let t=["bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],o=Math.floor(Math.log(e)/Math.log(2));o<1&&(o=0);let s=Math.floor(o/10);return e=e/Math.pow(2,10*s),e.toString().length>e.toFixed(2).toString().length&&(e=parseFloat(e.toFixed(2))),e+" "+t[s]};const _t=I("a",{href:"https://mypikpak.com/",target:"_blank",class:"logo-box"},[I("img",{src:"https://mypikpak.com/apple-touch-icon.png",class:"logo-box__icon",alt:""}),I("div",{class:"logo-box__text"},"PikPak")],-1),kt={key:0,class:"content-bottom"},yt=C("\u4F1A\u5458\u7801 "),wt={style:{"margin-bottom":"0"}},At=I("a",{style:{color:"#306eff"},target:"_blank",href:"https://www.tjsky.net/?p=220#i-21"},"\u6587\u4EF6\u5217\u8868\u5237\u4E0D\u51FA\u6765\uFF1F",-1),Et=C(" \u3010\u8BF7\u4F9D\u6B21\u70B9\u9009\uFF1A\u8BBE\u7F6E-\u4EE3\u7406\u8BBE\u7F6E-\u6062\u590D\u9ED8\u8BA4-\u4FDD\u5B58\u8BBE\u7F6E \u540E\u518D\u5237\u65B0\u8BD5\u8BD5\u3011 "),Ft={class:"bottom-user-info"},Dt={key:0,src:gt,class:"user-info-avatar"},It={key:1,src:ft,class:"user-info-avatar"},Bt={class:"user-info-name"},xt={key:0},St={class:"action"},Nt=C(" \u9000\u51FA\u767B\u5F55 "),Lt=C("\u6DFB\u52A0"),Ct=J({setup(e){const t=E(!1),o=i=>()=>ce(M,null,{default:()=>ce(i)}),s=xe(),a=Se(),l=E([{label:"\u6587\u4EF6",key:"list",icon:o(ot)},{label:"\u89C6\u9891",key:"video",icon:o(Xe)},{label:"\u56FE\u7247",key:"image",icon:o(Ge)},{label:"\u56DE\u6536\u7AD9",key:"trash",icon:o(qe)},{label:"\u9080\u8BF7",key:"invited",icon:o(et)},{label:"\u8BBE\u7F6E",key:"setting",icon:o(tt)}]),c=E(),m=()=>{v.get("https://user.mypikpak.com/v1/user/me").then(i=>{window.localStorage.setItem("pikpakUser",JSON.stringify(i.data)),c.value=i.data}).catch(i=>{console.log(i)})},g=E(),w=()=>{v.get("https://api-drive.mypikpak.com/drive/v1/about").then(i=>{g.value=i.data}).catch(i=>{console.log(i)})},p=E(),F=()=>{v.get("https://api-drive.mypikpak.com/drive/v1/privilege/vip").then(i=>{var d;p.value=(d=i.data)==null?void 0:d.data})},S=(i,d)=>{console.log(d),s.push("/"+d.key)};re(()=>{m(),w(),F()});const _=()=>{m(),w()},O=()=>{const i=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}"),d=i.id?i.id:-1;if(d===-1){window.$message.error("\u5F53\u524D\u8D26\u53F7\u4E0D\u652F\u6301\u6B64\u64CD\u4F5C\uFF01");return}U.use(d).then(T=>{H()}).catch(T=>{console.error(T.response),window.$message.error("\u64CD\u4F5C\u8D26\u53F7\u5931\u8D25")})},B=E(),k=E(!1),N=()=>{v.post("https://api-drive.mypikpak.com/vip/v1/order/activation-code",{activation_code:B.value,data:{}}).then(i=>{window.$message.success("\u5151\u6362\u6210\u529F"),w()}).catch(i=>{console.log(i)}).finally(()=>{k.value=!1})},j=E(!1),fe=i=>{j.value=i<800,t.value||(t.value=i<800)};Ne(a,()=>{j.value&&(t.value=!0)});const he=Le(),H=()=>{he.warning({title:"\u8B66\u544A",content:"\u786E\u5B9A\u9000\u51FA\uFF1F",positiveText:"\u786E\u5B9A",negativeText:"\u4E0D\u786E\u5B9A",onPositiveClick:()=>{v.post("https://user.mypikpak.com/v1/auth/revoke",{}).then(i=>{window.localStorage.removeItem("pikpakLogin"),window.localStorage.removeItem("pikpakLoginData"),window.$message.success("\u9000\u51FA\u6210\u529F"),s.push("/login")}).catch(i=>{console.log(i)})}})};return(i,d)=>{const T=ne("router-view"),ve=Ce("resize");return D(),L(Ze,null,[Oe(n(r(le),{"has-sider":"",onResize:fe},{default:u(()=>[n(r(Me),{"content-style":{display:"flex",flexDirection:"column"},"collapse-mode":"width","collapsed-width":0,width:240,"show-trigger":"bar",collapsed:t.value,onCollapse:d[1]||(d[1]=A=>t.value=!0),onExpand:d[2]||(d[2]=A=>t.value=!1),bordered:""},{default:u(()=>{var A,W,Y,Q,Z,X,G,q,ee,te,oe;return[_t,n(r(be),{options:l.value,value:String(r(a).name),"onUpdate:value":S},null,8,["options","value"]),t.value?P("",!0):(D(),L("div",kt,[C(K(r(ge)((A=g.value)==null?void 0:A.quota.usage))+" / "+K(r(ge)((W=g.value)==null?void 0:W.quota.limit))+" ",1),n(r(Te),{type:"primary",onClick:d[0]||(d[0]=bt=>k.value=!0)},{default:u(()=>[yt]),_:1}),n(r(M),{onClick:_},{default:u(()=>[n(r(Pe))]),_:1}),n(r(M),{onClick:O},{default:u(()=>[n(r(Ve))]),_:1}),((Y=g.value)==null?void 0:Y.quota)?(D(),ie(r(Je),{key:0,type:"line",percentage:Number((((Q=g.value)==null?void 0:Q.quota.usage)/((Z=g.value)==null?void 0:Z.quota.limit)*100).toFixed(2)),"indicator-placement":"inside",height:14,color:((X=p.value)==null?void 0:X.status)==="ok"?"#d1ae6a":void 0,processing:""},null,8,["percentage","color"])):P("",!0),I("p",wt,[n(r(ue),{placement:"right"},{trigger:u(()=>[At]),default:u(()=>[Et]),_:1})])])),t.value?P("",!0):(D(),L("div",{key:1,class:Re(["sider-bottom",{vip:((G=p.value)==null?void 0:G.status)==="ok"}])},[I("div",Ft,[((q=p.value)==null?void 0:q.status)==="ok"?(D(),L("img",Dt)):(D(),L("img",It)),I("div",Bt,[C(K((ee=c.value)==null?void 0:ee.name)+" ",1),((te=p.value)==null?void 0:te.status)==="ok"&&((oe=p.value)==null?void 0:oe.expire)?(D(),L("div",xt,[n(r(Ke),{time:new Date(p.value.expire),type:"datetime"},null,8,["time"])])):P("",!0)]),I("div",St,[n(r(ue),null,{trigger:u(()=>[n(r(M),{onClick:H},{default:u(()=>[n(r(Ue))]),_:1})]),default:u(()=>[Nt]),_:1})])])],2))]}),_:1},8,["collapsed"]),n(r(le),null,{default:u(()=>[n(r($e),{style:{height:"100vh"}},{default:u(()=>[n(r(ze),{style:{"max-height":"100vh"}},{default:u(()=>[n(T)]),_:1})]),_:1})]),_:1})]),_:1},512),[[ve]]),n(r(Qe),{show:k.value,"onUpdate:show":d[5]||(d[5]=A=>k.value=A)},{default:u(()=>[n(r(je),{style:{width:"600px"},title:"\u4F1A\u5458\u7801"},{"header-extra":u(()=>[n(r(M),{onClick:d[3]||(d[3]=A=>k.value=!1)},{default:u(()=>[n(r(He))]),_:1})]),action:u(()=>[n(r(We),{block:!0,type:"primary",disabled:!B.value,onClick:N},{default:u(()=>[Lt]),_:1},8,["disabled"])]),default:u(()=>[n(r(Ye),{placeholder:"\u4F1A\u5458\u7801",value:B.value,"onUpdate:value":d[4]||(d[4]=A=>B.value=A)},null,8,["value"])]),_:1})]),_:1},8,["show"])],64)}}}),Ot=[{path:"/",name:"home",component:Ct,redirect:"/list",beforeEnter:(e,t,o)=>{const s=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}");(!s||!s.access_token)&&e.name!=="setting"?o("/login"):o()},children:[{path:"list/:id?",name:"list",component:()=>h(()=>import("./list.25b78f43.js"),["assets/list.25b78f43.js","assets/list.444552a7.css","assets/vendor.2a1693fe.js","assets/clipboard.ab5a471e.js"])},{path:"video",name:"video",component:()=>h(()=>import("./list.25b78f43.js"),["assets/list.25b78f43.js","assets/list.444552a7.css","assets/vendor.2a1693fe.js","assets/clipboard.ab5a471e.js"])},{path:"image",name:"image",component:()=>h(()=>import("./list.25b78f43.js"),["assets/list.25b78f43.js","assets/list.444552a7.css","assets/vendor.2a1693fe.js","assets/clipboard.ab5a471e.js"])},{path:"trash",name:"trash",component:()=>h(()=>import("./trash.1e621739.js"),["assets/trash.1e621739.js","assets/trash.99a3677d.css","assets/vendor.2a1693fe.js"])},{path:"setting",name:"setting",component:()=>h(()=>import("./setting.2fd547ad.js"),["assets/setting.2fd547ad.js","assets/setting.f947579c.css","assets/vendor.2a1693fe.js","assets/clipboard.ab5a471e.js"])},{path:"invited",name:"invited",component:()=>h(()=>import("./invited.2da3f28c.js"),["assets/invited.2da3f28c.js","assets/invited.74b24e1e.css","assets/clipboard.ab5a471e.js","assets/vendor.2a1693fe.js"])}]},{path:"/t/:id?",name:"test",component:()=>h(()=>import("./test.bdc2cd32.js"),["assets/test.bdc2cd32.js","assets/vendor.2a1693fe.js"])},{path:"/s/:id/:password?",name:"shareInfo",component:()=>h(()=>import("./shareInfo.d0983a2f.js"),["assets/shareInfo.d0983a2f.js","assets/shareInfo.678356c6.css","assets/vendor.2a1693fe.js"])},{path:"/login",name:"login",component:()=>h(()=>import("./login.ccf1673b.js"),["assets/login.ccf1673b.js","assets/login.a8b45006.css","assets/vendor.2a1693fe.js","assets/phone-pc2.dbf6d71e.js"])},{path:"/sms",name:"sms",component:()=>h(()=>import("./sms.642eec0c.js"),["assets/sms.642eec0c.js","assets/sms.81a6d8ca.css","assets/phone-pc2.dbf6d71e.js","assets/vendor.2a1693fe.js"])},{path:"/register",name:"register",component:()=>h(()=>import("./register.43d96707.js"),["assets/register.43d96707.js","assets/register.5588ce76.css","assets/vendor.2a1693fe.js","assets/phone-pc2.dbf6d71e.js"])},{path:"/testtest",name:"testtest",component:()=>h(()=>import("./testtest.a0a90a1c.js"),["assets/testtest.a0a90a1c.js","assets/vendor.2a1693fe.js"])}],Mt=at({history:st(),routes:Ot});var x=Mt;const b=rt(dt);b.directive("resize",{mounted(e,t,o){e.$$erd=nt({strategy:"scroll"}),e.$$erd.listenTo({},e,s=>{let a=s.offsetWidth,l=s.offsetHeight;e.$$time&&clearTimeout(e.$$time),e.$$time=setTimeout(()=>{var c;(c=o.props)==null||c.onResize(a,l)},300)})},unmounted(e){e.$$erd&&e.$$erd.uninstall(e),e.$$time&&clearTimeout(e.$$time)}});b.config.globalProperties.$http=v;b.use(x);b.use(it,{router:x,siteIdList:[1280680983]});b.mount("#app");export{$ as a,ge as b,U as c,v as i,ct as p};
