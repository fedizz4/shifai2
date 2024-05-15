"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[185],{185:(re,N,f)=>{f.r(N),f.d(N,{ion_popover:()=>ee});var S=f(5861),l=f(6393),$=f(6066),P=f(2831),V=f(9229),B=f(2400),T=f(1856),h=f(9103),g=f(4459),w=f(2651),v=f(1072);f(1848),f(8739);const q=(t,e,o)=>{const r=e.getBoundingClientRect(),i=r.height;let n=r.width;return"cover"===t&&o&&(n=o.getBoundingClientRect().width),{contentWidth:n,contentHeight:i}},se=(t,e,o)=>{let r=[];switch(e){case"hover":let i;r=[{eventName:"mouseenter",callback:(n=(0,S.Z)(function*(s){s.stopPropagation(),i&&clearTimeout(i),i=setTimeout(()=>{(0,P.r)(()=>{o.presentFromTrigger(s),i=void 0})},100)}),function(a){return n.apply(this,arguments)})},{eventName:"mouseleave",callback:n=>{i&&clearTimeout(i);const s=n.relatedTarget;s&&s.closest("ion-popover")!==o&&o.dismiss(void 0,void 0,!1)}},{eventName:"click",callback:n=>n.stopPropagation()},{eventName:"ionPopoverActivateTrigger",callback:n=>o.presentFromTrigger(n,!0)}];break;case"context-menu":r=[{eventName:"contextmenu",callback:n=>{n.preventDefault(),o.presentFromTrigger(n)}},{eventName:"click",callback:n=>n.stopPropagation()},{eventName:"ionPopoverActivateTrigger",callback:n=>o.presentFromTrigger(n,!0)}];break;default:r=[{eventName:"click",callback:n=>o.presentFromTrigger(n)},{eventName:"ionPopoverActivateTrigger",callback:n=>o.presentFromTrigger(n,!0)}]}var n;return r.forEach(({eventName:i,callback:n})=>t.addEventListener(i,n)),t.setAttribute("data-ion-popover-trigger","true"),()=>{r.forEach(({eventName:i,callback:n})=>t.removeEventListener(i,n)),t.removeAttribute("data-ion-popover-trigger")}},G=(t,e)=>e&&"ION-ITEM"===e.tagName?t.findIndex(o=>o===e):-1,U=t=>{const o=(0,P.g)(t).querySelector("button");o&&(0,P.r)(()=>o.focus())},le=t=>{const e=function(){var o=(0,S.Z)(function*(r){var i;const n=document.activeElement;let s=[];const a=null===(i=r.target)||void 0===i?void 0:i.tagName;if("ION-POPOVER"===a||"ION-ITEM"===a){try{s=Array.from(t.querySelectorAll("ion-item:not(ion-popover ion-popover *):not([disabled])"))}catch{}switch(r.key){case"ArrowLeft":(yield t.getParentPopover())&&t.dismiss(void 0,void 0,!1);break;case"ArrowDown":r.preventDefault();const d=((t,e)=>t[G(t,e)+1])(s,n);void 0!==d&&U(d);break;case"ArrowUp":r.preventDefault();const y=((t,e)=>t[G(t,e)-1])(s,n);void 0!==y&&U(y);break;case"Home":r.preventDefault();const u=s[0];void 0!==u&&U(u);break;case"End":r.preventDefault();const b=s[s.length-1];void 0!==b&&U(b);break;case"ArrowRight":case" ":case"Enter":if(n&&(t=>t.hasAttribute("data-ion-popover-trigger"))(n)){const m=new CustomEvent("ionPopoverActivateTrigger");n.dispatchEvent(m)}}}});return function(i){return o.apply(this,arguments)}}();return t.addEventListener("keydown",e),()=>t.removeEventListener("keydown",e)},H=(t,e,o,r,i,n,s,a,p,d,y)=>{var u;let b={top:0,left:0,width:0,height:0};if("event"===n){if(!y)return p;b={top:y.clientY,left:y.clientX,width:1,height:1}}else{const L=d||(null===(u=null==y?void 0:y.detail)||void 0===u?void 0:u.ionShadowTarget)||(null==y?void 0:y.target);if(!L)return p;const A=L.getBoundingClientRect();b={top:A.top,left:A.left,width:A.width,height:A.height}}const m=he(s,b,e,o,r,i,t),k=ue(a,s,b,e,o),_=m.top+k.top,E=m.left+k.left,{arrowTop:x,arrowLeft:I}=fe(s,r,i,_,E,e,o,t),{originX:D,originY:C}=de(s,a,t);return{top:_,left:E,referenceCoordinates:b,arrowTop:x,arrowLeft:I,originX:D,originY:C}},de=(t,e,o)=>{switch(t){case"top":return{originX:J(e),originY:"bottom"};case"bottom":return{originX:J(e),originY:"top"};case"left":return{originX:"right",originY:z(e)};case"right":return{originX:"left",originY:z(e)};case"start":return{originX:o?"left":"right",originY:z(e)};case"end":return{originX:o?"right":"left",originY:z(e)}}},J=t=>{switch(t){case"start":return"left";case"center":return"center";case"end":return"right"}},z=t=>{switch(t){case"start":return"top";case"center":return"center";case"end":return"bottom"}},fe=(t,e,o,r,i,n,s,a)=>{const p={arrowTop:r+s/2-e/2,arrowLeft:i+n-e/2},d={arrowTop:r+s/2-e/2,arrowLeft:i-1.5*e};switch(t){case"top":return{arrowTop:r+s,arrowLeft:i+n/2-e/2};case"bottom":return{arrowTop:r-o,arrowLeft:i+n/2-e/2};case"left":return p;case"right":return d;case"start":return a?d:p;case"end":return a?p:d;default:return{arrowTop:0,arrowLeft:0}}},he=(t,e,o,r,i,n,s)=>{const a={top:e.top,left:e.left-o-i},p={top:e.top,left:e.left+e.width+i};switch(t){case"top":return{top:e.top-r-n,left:e.left};case"right":return p;case"bottom":return{top:e.top+e.height+n,left:e.left};case"left":return a;case"start":return s?p:a;case"end":return s?a:p}},ue=(t,e,o,r,i)=>{switch(t){case"center":return me(e,o,r,i);case"end":return ve(e,o,r,i);default:return{top:0,left:0}}},ve=(t,e,o,r)=>{switch(t){case"start":case"end":case"left":case"right":return{top:-(r-e.height),left:0};default:return{top:0,left:-(o-e.width)}}},me=(t,e,o,r)=>{switch(t){case"start":case"end":case"left":case"right":return{top:-(r/2-e.height/2),left:0};default:return{top:0,left:-(o/2-e.width/2)}}},Q=(t,e,o,r,i,n,s,a,p,d,y,u,b=0,m=0,k=0)=>{let _=b;const E=m;let D,x=o,I=e,C=d,O=y,c=!1,L=!1;const A=u?u.top+u.height:n/2-a/2,M=u?u.height:0;let R=!1;return x<r+p?(x=r,c=!0,C="left"):s+r+x+p>i&&(L=!0,x=i-s-r,C="right"),A+M+a>n&&("top"===t||"bottom"===t)&&(A-a>0?(I=Math.max(12,A-a-M-(k-1)),_=I+a,O="bottom",R=!0):D=r),{top:I,left:x,bottom:D,originX:C,originY:O,checkSafeAreaLeft:c,checkSafeAreaRight:L,arrowTop:_,arrowLeft:E,addPopoverBottomClass:R}},xe=(t,e)=>{var o;const{event:r,size:i,trigger:n,reference:s,side:a,align:p}=e,d=t.ownerDocument,y="rtl"===d.dir,u=d.defaultView.innerWidth,b=d.defaultView.innerHeight,m=(0,P.g)(t),k=m.querySelector(".popover-content"),_=m.querySelector(".popover-arrow"),E=n||(null===(o=null==r?void 0:r.detail)||void 0===o?void 0:o.ionShadowTarget)||(null==r?void 0:r.target),{contentWidth:x,contentHeight:I}=q(i,k,E),{arrowWidth:D,arrowHeight:C}=(t=>{if(!t)return{arrowWidth:0,arrowHeight:0};const{width:e,height:o}=t.getBoundingClientRect();return{arrowWidth:e,arrowHeight:o}})(_),c=H(y,x,I,D,C,s,a,p,{top:b/2-I/2,left:u/2-x/2,originX:y?"right":"left",originY:"top"},n,r),L="cover"===i?0:5,A="cover"===i?0:25,{originX:M,originY:R,top:j,left:W,bottom:K,checkSafeAreaLeft:X,checkSafeAreaRight:Ee,arrowTop:Ie,arrowLeft:Te,addPopoverBottomClass:Ce}=Q(a,c.top,c.left,L,u,b,x,I,A,c.originX,c.originY,c.referenceCoordinates,c.arrowTop,c.arrowLeft,C),Oe=(0,v.c)(),te=(0,v.c)(),oe=(0,v.c)();return te.addElement(m.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),oe.addElement(m.querySelector(".popover-arrow")).addElement(m.querySelector(".popover-content")).fromTo("opacity",.01,1),Oe.easing("ease").duration(100).beforeAddWrite(()=>{"cover"===i&&t.style.setProperty("--width",`${x}px`),Ce&&t.classList.add("popover-bottom"),void 0!==K&&k.style.setProperty("bottom",`${K}px`);let Z=`${W}px`;X&&(Z=`${W}px + var(--ion-safe-area-left, 0)`),Ee&&(Z=`${W}px - var(--ion-safe-area-right, 0)`),k.style.setProperty("top",`calc(${j}px + var(--offset-y, 0))`),k.style.setProperty("left",`calc(${Z} + var(--offset-x, 0))`),k.style.setProperty("transform-origin",`${R} ${M}`),null!==_&&(((t,e=!1,o,r)=>!(!o&&!r||"top"!==t&&"bottom"!==t&&e))(a,c.top!==j||c.left!==W,r,n)?(_.style.setProperty("top",`calc(${Ie}px + var(--offset-y, 0))`),_.style.setProperty("left",`calc(${Te}px + var(--offset-x, 0))`)):_.style.setProperty("display","none"))}).addAnimation([te,oe])},we=t=>{const e=(0,P.g)(t),o=e.querySelector(".popover-content"),r=e.querySelector(".popover-arrow"),i=(0,v.c)(),n=(0,v.c)(),s=(0,v.c)();return n.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),s.addElement(e.querySelector(".popover-arrow")).addElement(e.querySelector(".popover-content")).fromTo("opacity",.99,0),i.easing("ease").afterAddWrite(()=>{t.style.removeProperty("--width"),t.classList.remove("popover-bottom"),o.style.removeProperty("top"),o.style.removeProperty("left"),o.style.removeProperty("bottom"),o.style.removeProperty("transform-origin"),r&&(r.style.removeProperty("top"),r.style.removeProperty("left"),r.style.removeProperty("display"))}).duration(300).addAnimation([n,s])},ke=(t,e)=>{var o;const{event:r,size:i,trigger:n,reference:s,side:a,align:p}=e,d=t.ownerDocument,y="rtl"===d.dir,u=d.defaultView.innerWidth,b=d.defaultView.innerHeight,m=(0,P.g)(t),k=m.querySelector(".popover-content"),_=n||(null===(o=null==r?void 0:r.detail)||void 0===o?void 0:o.ionShadowTarget)||(null==r?void 0:r.target),{contentWidth:E,contentHeight:x}=q(i,k,_),D=H(y,E,x,0,0,s,a,p,{top:b/2-x/2,left:u/2-E/2,originX:y?"right":"left",originY:"top"},n,r),C="cover"===i?0:12,{originX:O,originY:c,top:L,left:A,bottom:M}=Q(a,D.top,D.left,C,u,b,E,x,0,D.originX,D.originY,D.referenceCoordinates),R=(0,v.c)(),j=(0,v.c)(),W=(0,v.c)(),K=(0,v.c)(),X=(0,v.c)();return j.addElement(m.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),W.addElement(m.querySelector(".popover-wrapper")).duration(150).fromTo("opacity",.01,1),K.addElement(k).beforeStyles({top:`calc(${L}px + var(--offset-y, 0px))`,left:`calc(${A}px + var(--offset-x, 0px))`,"transform-origin":`${c} ${O}`}).beforeAddWrite(()=>{void 0!==M&&k.style.setProperty("bottom",`${M}px`)}).fromTo("transform","scale(0.8)","scale(1)"),X.addElement(m.querySelector(".popover-viewport")).fromTo("opacity",.01,1),R.easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).beforeAddWrite(()=>{"cover"===i&&t.style.setProperty("--width",`${E}px`),"bottom"===c&&t.classList.add("popover-bottom")}).addAnimation([j,W,K,X])},Pe=t=>{const e=(0,P.g)(t),o=e.querySelector(".popover-content"),r=(0,v.c)(),i=(0,v.c)(),n=(0,v.c)();return i.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),n.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),r.easing("ease").afterAddWrite(()=>{t.style.removeProperty("--width"),t.classList.remove("popover-bottom"),o.style.removeProperty("top"),o.style.removeProperty("left"),o.style.removeProperty("bottom"),o.style.removeProperty("transform-origin")}).duration(150).addAnimation([i,n])},ee=class{constructor(t){(0,l.r)(this,t),this.didPresent=(0,l.d)(this,"ionPopoverDidPresent",7),this.willPresent=(0,l.d)(this,"ionPopoverWillPresent",7),this.willDismiss=(0,l.d)(this,"ionPopoverWillDismiss",7),this.didDismiss=(0,l.d)(this,"ionPopoverDidDismiss",7),this.didPresentShorthand=(0,l.d)(this,"didPresent",7),this.willPresentShorthand=(0,l.d)(this,"willPresent",7),this.willDismissShorthand=(0,l.d)(this,"willDismiss",7),this.didDismissShorthand=(0,l.d)(this,"didDismiss",7),this.ionMount=(0,l.d)(this,"ionMount",7),this.parentPopover=null,this.coreDelegate=(0,$.C)(),this.lockController=(0,V.c)(),this.inline=!1,this.focusDescendantOnPresent=!1,this.onBackdropTap=()=>{this.dismiss(void 0,T.B)},this.onLifecycle=e=>{const o=this.usersElement,r=Ae[e.type];if(o&&r){const i=new CustomEvent(r,{bubbles:!1,cancelable:!1,detail:e.detail});o.dispatchEvent(i)}},this.configureTriggerInteraction=()=>{const{trigger:e,triggerAction:o,el:r,destroyTriggerInteraction:i}=this;if(i&&i(),void 0===e)return;const n=this.triggerEl=void 0!==e?document.getElementById(e):null;n?this.destroyTriggerInteraction=se(n,o,r):(0,B.p)(`A trigger element with the ID "${e}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on ion-popover.`,this.el)},this.configureKeyboardInteraction=()=>{const{destroyKeyboardInteraction:e,el:o}=this;e&&e(),this.destroyKeyboardInteraction=le(o)},this.configureDismissInteraction=()=>{const{destroyDismissInteraction:e,parentPopover:o,triggerAction:r,triggerEl:i,el:n}=this;!o||!i||(e&&e(),this.destroyDismissInteraction=((t,e,o,r)=>{let i=[];const s=(0,P.g)(r).querySelector(".popover-content");return i="hover"===e?[{eventName:"mouseenter",callback:a=>{document.elementFromPoint(a.clientX,a.clientY)!==t&&o.dismiss(void 0,void 0,!1)}}]:[{eventName:"click",callback:a=>{a.target.closest("[data-ion-popover-trigger]")!==t?o.dismiss(void 0,void 0,!1):a.stopPropagation()}}],i.forEach(({eventName:a,callback:p})=>s.addEventListener(a,p)),()=>{i.forEach(({eventName:a,callback:p})=>s.removeEventListener(a,p))}})(i,r,n,o))},this.presented=!1,this.hasController=!1,this.delegate=void 0,this.overlayIndex=void 0,this.enterAnimation=void 0,this.leaveAnimation=void 0,this.component=void 0,this.componentProps=void 0,this.keyboardClose=!0,this.cssClass=void 0,this.backdropDismiss=!0,this.event=void 0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.htmlAttributes=void 0,this.triggerAction="click",this.trigger=void 0,this.size="auto",this.dismissOnSelect=!1,this.reference="trigger",this.side="bottom",this.alignment=void 0,this.arrow=!0,this.isOpen=!1,this.keyboardEvents=!1,this.keepContentsMounted=!1}onTriggerChange(){this.configureTriggerInteraction()}onIsOpenChange(t,e){!0===t&&!1===e?this.present():!1===t&&!0===e&&this.dismiss()}connectedCallback(){const{configureTriggerInteraction:t,el:e}=this;(0,T.j)(e),t()}disconnectedCallback(){const{destroyTriggerInteraction:t}=this;t&&t()}componentWillLoad(){const{el:t}=this,e=(0,T.k)(t);this.parentPopover=t.closest(`ion-popover:not(#${e})`),void 0===this.alignment&&(this.alignment="ios"===(0,h.b)(this)?"center":"start")}componentDidLoad(){const{parentPopover:t,isOpen:e}=this;!0===e&&(0,P.r)(()=>this.present()),t&&(0,P.a)(t,"ionPopoverWillDismiss",()=>{this.dismiss(void 0,void 0,!1)}),this.configureTriggerInteraction()}presentFromTrigger(t,e=!1){var o=this;return(0,S.Z)(function*(){o.focusDescendantOnPresent=e,yield o.present(t),o.focusDescendantOnPresent=!1})()}getDelegate(t=!1){if(this.workingDelegate&&!t)return{delegate:this.workingDelegate,inline:this.inline};const o=this.inline=null!==this.el.parentNode&&!this.hasController;return{inline:o,delegate:this.workingDelegate=o?this.delegate||this.coreDelegate:this.delegate}}present(t){var e=this;return(0,S.Z)(function*(){const o=yield e.lockController.lock();if(e.presented)return void o();const{el:r}=e,{inline:i,delegate:n}=e.getDelegate(!0);e.ionMount.emit(),e.usersElement=yield(0,$.a)(n,r,e.component,["popover-viewport"],e.componentProps,i),e.keyboardEvents||e.configureKeyboardInteraction(),e.configureDismissInteraction(),(0,P.m)(r)?yield(0,w.e)(e.usersElement):e.keepContentsMounted||(yield(0,w.w)()),yield(0,T.f)(e,"popoverEnter",xe,ke,{event:t||e.event,size:e.size,trigger:e.triggerEl,reference:e.reference,side:e.side,align:e.alignment}),e.focusDescendantOnPresent&&(0,T.o)(e.el,e.el),o()})()}dismiss(t,e,o=!0){var r=this;return(0,S.Z)(function*(){const i=yield r.lockController.lock(),{destroyKeyboardInteraction:n,destroyDismissInteraction:s}=r;o&&r.parentPopover&&r.parentPopover.dismiss(t,e,o);const a=yield(0,T.g)(r,t,e,"popoverLeave",we,Pe,r.event);if(a){n&&(n(),r.destroyKeyboardInteraction=void 0),s&&(s(),r.destroyDismissInteraction=void 0);const{delegate:p}=r.getDelegate();yield(0,$.d)(p,r.usersElement)}return i(),a})()}getParentPopover(){var t=this;return(0,S.Z)(function*(){return t.parentPopover})()}onDidDismiss(){return(0,T.h)(this.el,"ionPopoverDidDismiss")}onWillDismiss(){return(0,T.h)(this.el,"ionPopoverWillDismiss")}render(){const t=(0,h.b)(this),{onLifecycle:e,parentPopover:o,dismissOnSelect:r,side:i,arrow:n,htmlAttributes:s}=this,a=(0,h.a)("desktop"),p=n&&!o;return(0,l.h)(l.H,Object.assign({key:"f335ae001173483e6a973b2084f8a7b6b895ae5d","aria-modal":"true","no-router":!0,tabindex:"-1"},s,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign(Object.assign({},(0,g.g)(this.cssClass)),{[t]:!0,"popover-translucent":this.translucent,"overlay-hidden":!0,"popover-desktop":a,[`popover-side-${i}`]:!0,"popover-nested":!!o}),onIonPopoverDidPresent:e,onIonPopoverWillPresent:e,onIonPopoverWillDismiss:e,onIonPopoverDidDismiss:e,onIonBackdropTap:this.onBackdropTap}),!o&&(0,l.h)("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop,part:"backdrop"}),(0,l.h)("div",{key:"8468f39b0a0f30b42ae9cac51950e5f0b9be1069",class:"popover-wrapper ion-overlay-wrapper",onClick:r?()=>this.dismiss():void 0},p&&(0,l.h)("div",{class:"popover-arrow",part:"arrow"}),(0,l.h)("div",{key:"cb4eeaef385187f3c8e566931844e30edd5451c4",class:"popover-content",part:"content"},(0,l.h)("slot",{key:"80a5739a4beb6eba150503e426104701954c90b9"}))))}get el(){return(0,l.f)(this)}static get watchers(){return{trigger:["onTriggerChange"],triggerAction:["onTriggerChange"],isOpen:["onIsOpenChange"]}}},Ae={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"};ee.style={ios:':host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}::slotted(.popover-viewport){--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start:dir(rtl)){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end:dir(rtl)){--offset-x:5px}}:host{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}:host(.popover-desktop){--box-shadow:0px 4px 16px 0px rgba(0, 0, 0, 0.12)}.popover-content{border-radius:10px}:host(.popover-desktop) .popover-content{border:0.5px solid var(--ion-color-step-100, #e6e6e6)}.popover-arrow{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow::after{top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:"";z-index:10}@supports (inset-inline-start: 0){.popover-arrow::after{inset-inline-start:3px}}@supports not (inset-inline-start: 0){.popover-arrow::after{left:3px}:host-context([dir=rtl]) .popover-arrow::after{left:unset;right:unset;right:3px}[dir=rtl] .popover-arrow::after{left:unset;right:unset;right:3px}@supports selector(:dir(rtl)){.popover-arrow::after:dir(rtl){left:unset;right:unset;right:3px}}}:host(.popover-bottom) .popover-arrow{top:auto;bottom:-10px}:host(.popover-bottom) .popover-arrow::after{top:-6px}:host(.popover-side-left) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host(.popover-side-right) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}:host(.popover-side-top) .popover-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(.popover-side-start) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host-context([dir=rtl]):host(.popover-side-start) .popover-arrow,:host-context([dir=rtl]).popover-side-start .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}@supports selector(:dir(rtl)){:host(.popover-side-start:dir(rtl)) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}:host(.popover-side-end) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}:host-context([dir=rtl]):host(.popover-side-end) .popover-arrow,:host-context([dir=rtl]).popover-side-end .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}@supports selector(:dir(rtl)){:host(.popover-side-end:dir(rtl)) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}.popover-arrow,.popover-content{opacity:0}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.popover-translucent) .popover-content,:host(.popover-translucent) .popover-arrow::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}',md:":host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}::slotted(.popover-viewport){--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start:dir(rtl)){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end:dir(rtl)){--offset-x:5px}}:host{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]) .popover-content{-webkit-transform-origin:right top;transform-origin:right top}[dir=rtl] .popover-content{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.popover-content:dir(rtl){-webkit-transform-origin:right top;transform-origin:right top}}.popover-viewport{-webkit-transition-delay:100ms;transition-delay:100ms}.popover-wrapper{opacity:0}"}},4459:(re,N,f)=>{f.d(N,{c:()=>$,g:()=>V,h:()=>l,o:()=>T});var S=f(5861);const l=(h,g)=>null!==g.closest(h),$=(h,g)=>"string"==typeof h&&h.length>0?Object.assign({"ion-color":!0,[`ion-color-${h}`]:!0},g):g,V=h=>{const g={};return(h=>void 0!==h?(Array.isArray(h)?h:h.split(" ")).filter(w=>null!=w).map(w=>w.trim()).filter(w=>""!==w):[])(h).forEach(w=>g[w]=!0),g},B=/^[a-z][a-z0-9+\-.]*:/,T=function(){var h=(0,S.Z)(function*(g,w,v,F){if(null!=g&&"#"!==g[0]&&!B.test(g)){const Y=document.querySelector("ion-router");if(Y)return null!=w&&w.preventDefault(),Y.push(g,v,F)}return!1});return function(w,v,F,Y){return h.apply(this,arguments)}}()}}]);