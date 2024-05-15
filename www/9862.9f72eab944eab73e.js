"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9862],{9862:(ht,Me,_)=>{_.d(Me,{JF:()=>st,eN:()=>ie}),_(5861);var c=_(9212),Q=_(2096),ee=_(5592),Oe=_(2459),Ie=_(6328),De=_(2181),C=_(7398),te=_(4716),Ne=_(4664),W=_(6814);class U{}class j{}class E{constructor(t){this.normalizedNames=new Map,this.lazyUpdate=null,t?"string"==typeof t?this.lazyInit=()=>{this.headers=new Map,t.split("\n").forEach(r=>{const n=r.indexOf(":");if(n>0){const s=r.slice(0,n),o=s.toLowerCase(),a=r.slice(n+1).trim();this.maybeSetNormalizedName(s,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((r,n)=>{this.setHeaderEntries(n,r)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([r,n])=>{this.setHeaderEntries(r,n)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();const r=this.headers.get(t.toLowerCase());return r&&r.length>0?r[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,r){return this.clone({name:t,value:r,op:"a"})}set(t,r){return this.clone({name:t,value:r,op:"s"})}delete(t,r){return this.clone({name:t,value:r,op:"d"})}maybeSetNormalizedName(t,r){this.normalizedNames.has(r)||this.normalizedNames.set(r,t)}init(){this.lazyInit&&(this.lazyInit instanceof E?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(r=>{this.headers.set(r,t.headers.get(r)),this.normalizedNames.set(r,t.normalizedNames.get(r))})}clone(t){const r=new E;return r.lazyInit=this.lazyInit&&this.lazyInit instanceof E?this.lazyInit:this,r.lazyUpdate=(this.lazyUpdate||[]).concat([t]),r}applyUpdate(t){const r=t.name.toLowerCase();switch(t.op){case"a":case"s":let n=t.value;if("string"==typeof n&&(n=[n]),0===n.length)return;this.maybeSetNormalizedName(t.name,r);const s=("a"===t.op?this.headers.get(r):void 0)||[];s.push(...n),this.headers.set(r,s);break;case"d":const o=t.value;if(o){let a=this.headers.get(r);if(!a)return;a=a.filter(i=>-1===o.indexOf(i)),0===a.length?(this.headers.delete(r),this.normalizedNames.delete(r)):this.headers.set(r,a)}else this.headers.delete(r),this.normalizedNames.delete(r)}}setHeaderEntries(t,r){const n=(Array.isArray(r)?r:[r]).map(o=>o.toString()),s=t.toLowerCase();this.headers.set(s,n),this.maybeSetNormalizedName(t,s)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(r=>t(this.normalizedNames.get(r),this.headers.get(r)))}}class Ae{encodeKey(t){return ne(t)}encodeValue(t){return ne(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}}const xe=/%(\d[a-f0-9])/gi,Fe={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function ne(e){return encodeURIComponent(e).replace(xe,(t,r)=>{var n;return null!==(n=Fe[r])&&void 0!==n?n:t})}function B(e){return`${e}`}class w{constructor(t={}){if(this.updates=null,this.cloneFrom=null,this.encoder=t.encoder||new Ae,t.fromString){if(t.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=function ke(e,t){const r=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(s=>{const o=s.indexOf("="),[a,i]=-1==o?[t.decodeKey(s),""]:[t.decodeKey(s.slice(0,o)),t.decodeValue(s.slice(o+1))],d=r.get(a)||[];d.push(i),r.set(a,d)}),r}(t.fromString,this.encoder)}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(r=>{const n=t.fromObject[r],s=Array.isArray(n)?n.map(B):[B(n)];this.map.set(r,s)})):this.map=null}has(t){return this.init(),this.map.has(t)}get(t){this.init();const r=this.map.get(t);return r?r[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,r){return this.clone({param:t,value:r,op:"a"})}appendAll(t){const r=[];return Object.keys(t).forEach(n=>{const s=t[n];Array.isArray(s)?s.forEach(o=>{r.push({param:n,value:o,op:"a"})}):r.push({param:n,value:s,op:"a"})}),this.clone(r)}set(t,r){return this.clone({param:t,value:r,op:"s"})}delete(t,r){return this.clone({param:t,value:r,op:"d"})}toString(){return this.init(),this.keys().map(t=>{const r=this.encoder.encodeKey(t);return this.map.get(t).map(n=>r+"="+this.encoder.encodeValue(n)).join("&")}).filter(t=>""!==t).join("&")}clone(t){const r=new w({encoder:this.encoder});return r.cloneFrom=this.cloneFrom||this,r.updates=(this.updates||[]).concat(t),r}init(){null===this.map&&(this.map=new Map),null!==this.cloneFrom&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case"a":case"s":const r=("a"===t.op?this.map.get(t.param):void 0)||[];r.push(B(t.value)),this.map.set(t.param,r);break;case"d":if(void 0===t.value){this.map.delete(t.param);break}{let n=this.map.get(t.param)||[];const s=n.indexOf(B(t.value));-1!==s&&n.splice(s,1),n.length>0?this.map.set(t.param,n):this.map.delete(t.param)}}}),this.cloneFrom=this.updates=null)}}class Le{constructor(){this.map=new Map}set(t,r){return this.map.set(t,r),this}get(t){return this.map.has(t)||this.map.set(t,t.defaultValue()),this.map.get(t)}delete(t){return this.map.delete(t),this}has(t){return this.map.has(t)}keys(){return this.map.keys()}}function re(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function se(e){return typeof Blob<"u"&&e instanceof Blob}function oe(e){return typeof FormData<"u"&&e instanceof FormData}class A{constructor(t,r,n,s){var o,a;let i;if(this.url=r,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=t.toUpperCase(),function Ce(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}(this.method)||s?(this.body=void 0!==n?n:null,i=s):i=n,i&&(this.reportProgress=!!i.reportProgress,this.withCredentials=!!i.withCredentials,i.responseType&&(this.responseType=i.responseType),i.headers&&(this.headers=i.headers),i.context&&(this.context=i.context),i.params&&(this.params=i.params),this.transferCache=i.transferCache),null!==(o=this.headers)&&void 0!==o||(this.headers=new E),null!==(a=this.context)&&void 0!==a||(this.context=new Le),this.params){const d=this.params.toString();if(0===d.length)this.urlWithParams=r;else{const l=r.indexOf("?");this.urlWithParams=r+(-1===l?"?":l<r.length-1?"&":"")+d}}else this.params=new w,this.urlWithParams=r}serializeBody(){return null===this.body?null:re(this.body)||se(this.body)||oe(this.body)||function Ue(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}(this.body)||"string"==typeof this.body?this.body:this.body instanceof w?this.body.toString():"object"==typeof this.body||"boolean"==typeof this.body||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return null===this.body||oe(this.body)?null:se(this.body)?this.body.type||null:re(this.body)?null:"string"==typeof this.body?"text/plain":this.body instanceof w?"application/x-www-form-urlencoded;charset=UTF-8":"object"==typeof this.body||"number"==typeof this.body||"boolean"==typeof this.body?"application/json":null}clone(t={}){var r;const n=t.method||this.method,s=t.url||this.url,o=t.responseType||this.responseType,a=void 0!==t.body?t.body:this.body,i=void 0!==t.withCredentials?t.withCredentials:this.withCredentials,d=void 0!==t.reportProgress?t.reportProgress:this.reportProgress;let l=t.headers||this.headers,p=t.params||this.params;const R=null!==(r=t.context)&&void 0!==r?r:this.context;return void 0!==t.setHeaders&&(l=Object.keys(t.setHeaders).reduce((h,y)=>h.set(y,t.setHeaders[y]),l)),t.setParams&&(p=Object.keys(t.setParams).reduce((h,y)=>h.set(y,t.setParams[y]),p)),new A(n,s,a,{params:p,headers:l,context:R,reportProgress:d,responseType:o,withCredentials:i})}}var b=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(b||{});class K{constructor(t,r=k.Ok,n="OK"){this.headers=t.headers||new E,this.status=void 0!==t.status?t.status:r,this.statusText=t.statusText||n,this.url=t.url||null,this.ok=this.status>=200&&this.status<300}}class X extends K{constructor(t={}){super(t),this.type=b.ResponseHeader}clone(t={}){return new X({headers:t.headers||this.headers,status:void 0!==t.status?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}}class O extends K{constructor(t={}){super(t),this.type=b.Response,this.body=void 0!==t.body?t.body:null}clone(t={}){return new O({body:void 0!==t.body?t.body:this.body,headers:t.headers||this.headers,status:void 0!==t.status?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}}class N extends K{constructor(t){super(t,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.message=this.status>=200&&this.status<300?`Http failure during parsing for ${t.url||"(unknown url)"}`:`Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`,this.error=t.error||null}}var k=function(e){return e[e.Continue=100]="Continue",e[e.SwitchingProtocols=101]="SwitchingProtocols",e[e.Processing=102]="Processing",e[e.EarlyHints=103]="EarlyHints",e[e.Ok=200]="Ok",e[e.Created=201]="Created",e[e.Accepted=202]="Accepted",e[e.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",e[e.NoContent=204]="NoContent",e[e.ResetContent=205]="ResetContent",e[e.PartialContent=206]="PartialContent",e[e.MultiStatus=207]="MultiStatus",e[e.AlreadyReported=208]="AlreadyReported",e[e.ImUsed=226]="ImUsed",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.Found=302]="Found",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.Unused=306]="Unused",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.LengthRequired=411]="LengthRequired",e[e.PreconditionFailed=412]="PreconditionFailed",e[e.PayloadTooLarge=413]="PayloadTooLarge",e[e.UriTooLong=414]="UriTooLong",e[e.UnsupportedMediaType=415]="UnsupportedMediaType",e[e.RangeNotSatisfiable=416]="RangeNotSatisfiable",e[e.ExpectationFailed=417]="ExpectationFailed",e[e.ImATeapot=418]="ImATeapot",e[e.MisdirectedRequest=421]="MisdirectedRequest",e[e.UnprocessableEntity=422]="UnprocessableEntity",e[e.Locked=423]="Locked",e[e.FailedDependency=424]="FailedDependency",e[e.TooEarly=425]="TooEarly",e[e.UpgradeRequired=426]="UpgradeRequired",e[e.PreconditionRequired=428]="PreconditionRequired",e[e.TooManyRequests=429]="TooManyRequests",e[e.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",e[e.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout",e[e.HttpVersionNotSupported=505]="HttpVersionNotSupported",e[e.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",e[e.InsufficientStorage=507]="InsufficientStorage",e[e.LoopDetected=508]="LoopDetected",e[e.NotExtended=510]="NotExtended",e[e.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",e}(k||{});function V(e,t){return{body:t,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,transferCache:e.transferCache}}let ie=(()=>{var e;class t{constructor(n){this.handler=n}request(n,s,o={}){let a;if(n instanceof A)a=n;else{let l,p;l=o.headers instanceof E?o.headers:new E(o.headers),o.params&&(p=o.params instanceof w?o.params:new w({fromObject:o.params})),a=new A(n,s,void 0!==o.body?o.body:null,{headers:l,context:o.context,params:p,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}const i=(0,Q.of)(a).pipe((0,Ie.b)(l=>this.handler.handle(l)));if(n instanceof A||"events"===o.observe)return i;const d=i.pipe((0,De.h)(l=>l instanceof O));switch(o.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return d.pipe((0,C.U)(l=>{if(null!==l.body&&!(l.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return l.body}));case"blob":return d.pipe((0,C.U)(l=>{if(null!==l.body&&!(l.body instanceof Blob))throw new Error("Response is not a Blob.");return l.body}));case"text":return d.pipe((0,C.U)(l=>{if(null!==l.body&&"string"!=typeof l.body)throw new Error("Response is not a string.");return l.body}));default:return d.pipe((0,C.U)(l=>l.body))}case"response":return d;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(n,s={}){return this.request("DELETE",n,s)}get(n,s={}){return this.request("GET",n,s)}head(n,s={}){return this.request("HEAD",n,s)}jsonp(n,s){return this.request("JSONP",n,{params:(new w).append(s,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,s={}){return this.request("OPTIONS",n,s)}patch(n,s,o={}){return this.request("PATCH",n,V(o,s))}post(n,s,o={}){return this.request("POST",n,V(o,s))}put(n,s,o={}){return this.request("PUT",n,V(o,s))}}return(e=t).\u0275fac=function(n){return new(n||e)(c.LFG(U))},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac}),t})();function le(e,t){return t(e)}function ze(e,t){return(r,n)=>t.intercept(r,{handle:s=>e(s,n)})}const Ke=new c.OlP(""),x=new c.OlP(""),ce=new c.OlP(""),de=new c.OlP("");function Ve(){let e=null;return(t,r)=>{var n;null===e&&(e=(null!==(n=(0,c.f3M)(Ke,{optional:!0}))&&void 0!==n?n:[]).reduceRight(ze,le));const s=(0,c.f3M)(c.I6F),o=s.add();return e(t,r).pipe((0,te.x)(()=>s.remove(o)))}}let ue=(()=>{var e;class t extends U{constructor(n,s){super(),this.backend=n,this.injector=s,this.chain=null,this.pendingTasks=(0,c.f3M)(c.I6F);const o=(0,c.f3M)(de,{optional:!0});this.backend=null!=o?o:n}handle(n){if(null===this.chain){const o=Array.from(new Set([...this.injector.get(x),...this.injector.get(ce,[])]));this.chain=o.reduceRight((a,i)=>function We(e,t,r){return(n,s)=>(0,c.r_H)(r,()=>t(n,o=>e(o,s)))}(a,i,this.injector),le)}const s=this.pendingTasks.add();return this.chain(n,o=>this.backend.handle(o)).pipe((0,te.x)(()=>this.pendingTasks.remove(s)))}}return(e=t).\u0275fac=function(n){return new(n||e)(c.LFG(j),c.LFG(c.lqb))},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac}),t})();const He=/^\)\]\}',?\n/;let fe=(()=>{var e;class t{constructor(n){this.xhrFactory=n}handle(n){if("JSONP"===n.method)throw new c.vHH(-2800,!1);const s=this.xhrFactory;return(s.\u0275loadImpl?(0,Oe.D)(s.\u0275loadImpl()):(0,Q.of)(null)).pipe((0,Ne.w)(()=>new ee.y(a=>{const i=s.build();if(i.open(n.method,n.urlWithParams),n.withCredentials&&(i.withCredentials=!0),n.headers.forEach((u,f)=>i.setRequestHeader(u,f.join(","))),n.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!n.headers.has("Content-Type")){const u=n.detectContentTypeHeader();null!==u&&i.setRequestHeader("Content-Type",u)}if(n.responseType){const u=n.responseType.toLowerCase();i.responseType="json"!==u?u:"text"}const d=n.serializeBody();let l=null;const p=()=>{if(null!==l)return l;const u=i.statusText||"OK",f=new E(i.getAllResponseHeaders()),T=function Ye(e){return"responseURL"in e&&e.responseURL?e.responseURL:/^X-Request-URL:/m.test(e.getAllResponseHeaders())?e.getResponseHeader("X-Request-URL"):null}(i)||n.url;return l=new X({headers:f,status:i.status,statusText:u,url:T}),l},R=()=>{let{headers:u,status:f,statusText:T,url:g}=p(),m=null;f!==k.NoContent&&(m=typeof i.response>"u"?i.responseText:i.response),0===f&&(f=m?k.Ok:0);let F=f>=200&&f<300;if("json"===n.responseType&&"string"==typeof m){const L=m;m=m.replace(He,"");try{m=""!==m?JSON.parse(m):null}catch(z){m=L,F&&(F=!1,m={error:z,text:m})}}F?(a.next(new O({body:m,headers:u,status:f,statusText:T,url:g||void 0})),a.complete()):a.error(new N({error:m,headers:u,status:f,statusText:T,url:g||void 0}))},h=u=>{const{url:f}=p(),T=new N({error:u,status:i.status||0,statusText:i.statusText||"Unknown Error",url:f||void 0});a.error(T)};let y=!1;const v=u=>{y||(a.next(p()),y=!0);let f={type:b.DownloadProgress,loaded:u.loaded};u.lengthComputable&&(f.total=u.total),"text"===n.responseType&&i.responseText&&(f.partialText=i.responseText),a.next(f)},P=u=>{let f={type:b.UploadProgress,loaded:u.loaded};u.lengthComputable&&(f.total=u.total),a.next(f)};return i.addEventListener("load",R),i.addEventListener("error",h),i.addEventListener("timeout",h),i.addEventListener("abort",h),n.reportProgress&&(i.addEventListener("progress",v),null!==d&&i.upload&&i.upload.addEventListener("progress",P)),i.send(d),a.next({type:b.Sent}),()=>{i.removeEventListener("error",h),i.removeEventListener("abort",h),i.removeEventListener("load",R),i.removeEventListener("timeout",h),n.reportProgress&&(i.removeEventListener("progress",v),null!==d&&i.upload&&i.upload.removeEventListener("progress",P)),i.readyState!==i.DONE&&i.abort()}})))}}return(e=t).\u0275fac=function(n){return new(n||e)(c.LFG(W.JF))},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac}),t})();const S=new c.OlP(""),pe=new c.OlP("",{providedIn:"root",factory:()=>"XSRF-TOKEN"}),ye=new c.OlP("",{providedIn:"root",factory:()=>"X-XSRF-TOKEN"});class me{}let et=(()=>{var e;class t{constructor(n,s,o){this.doc=n,this.platform=s,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if("server"===this.platform)return null;const n=this.doc.cookie||"";return n!==this.lastCookieString&&(this.parseCount++,this.lastToken=(0,W.Mx)(n,this.cookieName),this.lastCookieString=n),this.lastToken}}return(e=t).\u0275fac=function(n){return new(n||e)(c.LFG(W.K0),c.LFG(c.Lbi),c.LFG(pe))},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac}),t})();function tt(e,t){const r=e.url.toLowerCase();if(!(0,c.f3M)(S)||"GET"===e.method||"HEAD"===e.method||r.startsWith("http://")||r.startsWith("https://"))return t(e);const n=(0,c.f3M)(me).getToken(),s=(0,c.f3M)(ye);return null!=n&&!e.headers.has(s)&&(e=e.clone({headers:e.headers.set(s,n)})),t(e)}var M=function(e){return e[e.Interceptors=0]="Interceptors",e[e.LegacyInterceptors=1]="LegacyInterceptors",e[e.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",e[e.NoXsrfProtection=3]="NoXsrfProtection",e[e.JsonpSupport=4]="JsonpSupport",e[e.RequestsMadeViaParent=5]="RequestsMadeViaParent",e[e.Fetch=6]="Fetch",e}(M||{});function I(e,t){return{\u0275kind:e,\u0275providers:t}}function nt(...e){const t=[ie,fe,ue,{provide:U,useExisting:ue},{provide:j,useExisting:fe},{provide:x,useValue:tt,multi:!0},{provide:S,useValue:!0},{provide:me,useClass:et}];for(const r of e)t.push(...r.\u0275providers);return(0,c.MR2)(t)}const ge=new c.OlP("");let st=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({providers:[nt(I(M.LegacyInterceptors,[{provide:ge,useFactory:Ve},{provide:x,useExisting:ge,multi:!0}]))]}),t})()}}]);