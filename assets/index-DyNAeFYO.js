const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./sky-deferred-t9gxC2AS.js","./three-CFPTl8l1.js"])))=>i.map(i=>d[i]);
import{e as we,f as H,d as Ve,A as ht,P as Li,G as I,h as Kt,V as g,a as et,M,B as Ze,b as Ei,S as Q,c as pe,I as Gt,i as K,j as ga,k as ts,C as ya,T as va,l as Te,m as Rs,n as es,o as wa,p as ba,q as Sa,r as Ma,s as La,L as Ea,t as ps,u as us,F as Ti,g as Ta,v as xi,w as ki,D as Ci,x as xa,R as ka,O as Ca,y as bt,W as Aa,z as Ai,E as Pi,H as Pa,J as Fa,K as Ia,N as As,U as Oa,X as Fi,Y as Ra,Z as Ba,_ as Da,$ as Wa,a0 as qa,a1 as be,a2 as $a,a3 as Na,a4 as ja,a5 as Ua}from"./three-CFPTl8l1.js";import{s as A,i as za,C as Ha,E as Ga,a as Va,P as Ja,b as Ka,T as Ya}from"./islands-BxYYynhM.js";import{i as Xa,T as Qa}from"./travel-DtLmRTM4.js";import{g as ge}from"./gsap-C8pce-KX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();class Za{constructor(){const e=new Float32Array(5400),s=new Float32Array(1800),a=new Float32Array(1800),n=new Float32Array(1800),o=new Float32Array(1800*3);for(let l=0;l<1800;l++){const d=160+Math.random()*60,h=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1);e[l*3]=d*Math.sin(f)*Math.cos(h),e[l*3+1]=d*Math.sin(f)*Math.sin(h),e[l*3+2]=d*Math.cos(f),s[l]=Math.random()*Math.PI*2,a[l]=.6+Math.random()*2.8,n[l]=1.2+Math.random()*2.8;const m=Math.random();m<.15?(o[l*3]=.75,o[l*3+1]=.88,o[l*3+2]=1):m<.27?(o[l*3]=1,o[l*3+1]=.93,o[l*3+2]=.65):(o[l*3]=1,o[l*3+1]=1,o[l*3+2]=1)}const r=new we;r.setAttribute("position",new H(e,3)),r.setAttribute("phase",new H(s,1)),r.setAttribute("speed",new H(a,1)),r.setAttribute("baseSize",new H(n,1)),r.setAttribute("color",new H(o,3)),this._mat=new Ve({uniforms:{time:{value:0}},vertexShader:`
        attribute float phase;
        attribute float speed;
        attribute float baseSize;
        attribute vec3  color;
        varying float vAlpha;
        varying vec3  vColor;
        uniform float time;
        void main() {
          float twinkle = 0.5 + 0.5 * sin(time * speed + phase);
          vAlpha = 0.55 + 0.45 * twinkle;
          vColor = color;
          gl_PointSize = baseSize * (0.75 + 0.25 * twinkle);
          gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying float vAlpha;
        varying vec3  vColor;
        void main() {
          vec2  uv = gl_PointCoord - vec2(0.5);
          float d  = length(uv);
          if (d > 0.5) discard;
          float a  = pow(1.0 - d * 2.0, 1.4) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,transparent:!0,depthWrite:!1,blending:ht}),this.points=new Li(r,this._mat)}update(t){this._mat.uniforms.time.value=t}}const tn=2,Bs=[7234136,8022620,6051408,8613983],en=[[14706748,11026462],[14262366,11565120],[8365768,5140110],[12567756,8159884]],Ii=i=>i[Math.random()*i.length|0];function sn(i,t,e,s=.24){const a=i.attributes.position,n=new Float32Array(a.count*3),o=new K(t),r=new K(e),l=new K;for(let d=0;d<a.count;d++)l.copy(Math.random()<s?r:o),n[d*3]=l.r,n[d*3+1]=l.g,n[d*3+2]=l.b;i.setAttribute("color",new H(n,3))}function an(i){const t=new Gt(i,0),e=t.attributes.position;for(let s=0;s<e.count;s++){const a=.7+Math.random()*.6;e.setXYZ(s,e.getX(s)*a,e.getY(s)*a,e.getZ(s)*a)}return t.computeVertexNormals(),t}function nn(){const i=new I,t=new et({color:13225430,flatShading:!0,roughness:.55,metalness:.35,emissive:1711398,emissiveIntensity:.6});i.add(new M(new Ze(1.4,1.4,2.2),t));const e=new et({color:2845951,flatShading:!0,roughness:.4,metalness:.2,emissive:661568,emissiveIntensity:.9});for(const a of[-1,1]){const n=new M(new Ze(3.2,.1,1.7),e);n.position.x=a*2.6,i.add(n);const o=new M(new Ze(1.2,.12,.12),t);o.position.x=a*1.2,i.add(o)}const s=new M(new Ei(.6,.55,10,1,!0),t);return s.rotation.x=Math.PI/2,s.position.z=1.5,i.add(s),{obj:i,radius:3.6}}function on(){const i=new I,t=new et({color:10134450,flatShading:!0,roughness:.45,metalness:.45,emissive:1316639,emissiveIntensity:.6}),e=new M(new Q(2.6,18,12),t);e.scale.set(1,.34,1),i.add(e);const s=new M(new Q(1.25,16,12,0,Math.PI*2,0,Math.PI/2),new et({color:8189392,flatShading:!0,transparent:!0,opacity:.82,emissive:1792586,emissiveIntensity:1}));s.position.y=.45,i.add(s);const a=new pe({color:16765803});for(let n=0;n<6;n++){const o=n/6*Math.PI*2,r=new M(new Q(.18,8,8),a);r.position.set(Math.cos(o)*1.85,-.32,Math.sin(o)*1.85),i.add(r)}return{obj:i,radius:2.9}}function rn(){const i=3.4+Math.random()*3,[t,e]=Ii(en),s=new Gt(i,2);return sn(s,t,e,.22),{obj:new M(s,new et({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:1575428,emissiveIntensity:.45})),radius:i}}function ln(){const i=new I,t=4+(Math.random()*3|0);for(let e=0;e<t;e++){const s=.6+Math.random()*1.3,a=new M(an(s),new et({color:Bs[e%Bs.length],flatShading:!0,roughness:1,metalness:0,emissive:657934,emissiveIntensity:.5}));a.position.set((Math.random()-.5)*7,(Math.random()-.5)*5,(Math.random()-.5)*7),i.add(a)}return{obj:i,radius:5.5}}const cn=[nn,on,rn,ln];class dn{constructor(t){this.cam=t,this.group=new I,this._active=[],this._cooldown=0,this._spawning=!0}_visibleHalf(t){const e=this.cam.position.z-t,s=Math.tan(Kt.degToRad(this.cam.fov)/2)*e;return{halfH:s,halfW:s*(window.innerWidth/window.innerHeight)}}_spawn(){const{obj:t,radius:e}=Ii(cn)(),s=-6+Math.random()*28,{halfW:a,halfH:n}=this._visibleHalf(s),o=(Math.random()-.5)*.7*n;t.position.set(a+e+1,o,s),t.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),this.group.add(t),this._active.push({obj:t,radius:e,baseY:o,vx:-(9+Math.random()*13),spin:new g((Math.random()-.5)*.7,(Math.random()-.5)*.7,(Math.random()-.5)*.7),bobF:.6+Math.random()*1.1,bobA:.3+Math.random()*.9,age:Math.random()*10,deathX:-(a+e+4)})}update(t,e=!1){if(!e){for(let s=this._active.length-1;s>=0;s--){const a=this._active[s];a.age+=t,a.obj.position.x+=a.vx*t,a.obj.position.y=a.baseY+Math.sin(a.age*a.bobF)*a.bobA,a.obj.rotation.x+=a.spin.x*t,a.obj.rotation.y+=a.spin.y*t,a.obj.rotation.z+=a.spin.z*t,a.obj.position.x<a.deathX&&(this._disposeObj(a.obj),this._active.splice(s,1))}this._spawning&&(this._cooldown-=t,this._cooldown<=0&&this._active.length<tn&&(this._spawn(),this._cooldown=.45+Math.random()*1.2))}}flushOut(){this._spawning=!1;for(const t of this._active)t.vx=-Math.max(55,Math.abs(t.vx)*2.6),t.bobA*=.35,t.spin.multiplyScalar(1.5);return this._active.length>0}clear(){var t,e;this._spawning=!1;for(const s of this._active)this._disposeObj(s.obj);this._active.length=0,(e=(t=this.group).clear)==null||e.call(t)}_disposeObj(t){this.group.remove(t),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class hn{constructor(){this.sceneGroup=new I,this.sunGroup=new I;const t=new ga(15259880,.75);this.sceneGroup.add(t);const e=new ts(16770764,.28);e.position.set(30,40,20),this.sceneGroup.add(e),this.sunLight=new ts(16765056,0),this.sunLight.position.set(50,40,20),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=300,this.sunLight.shadow.camera.left=-50,this.sunLight.shadow.camera.right=50,this.sunLight.shadow.camera.top=50,this.sunLight.shadow.camera.bottom=-50,this.sceneGroup.add(this.sunLight),this.sceneGroup.add(this.sunLight.target),this.presentationSun2=new ts(16765056,0),this.sceneGroup.add(this.presentationSun2),this.sceneGroup.add(this.presentationSun2.target)}}const ss=i=>new et({color:i}),at=i=>new et({color:i,flatShading:!0});class pn{constructor(){this.group=new I,this._stride=0,this._headGroup=new I,this._headGroup.position.y=.82;const t=new M(new Q(.22,14,10),ss(16768437)),e=ss(1710638),s=new M(new Q(.04,7,5),e);s.position.set(-.1,.04,.18);const a=s.clone();a.position.x=.1;const n=ss(16755336),o=new M(new Q(.05,6,4),n);o.position.set(-.15,-.04,.17);const r=o.clone();r.position.x=.15,this._headGroup.add(t,s,a,o,r);const l=new M(new Q(.26,10,8),at(16766287));l.position.set(0,.97,.03),l.scale.set(1,.72,.95);const d=new M(new Q(.13,7,5),at(16766287));d.position.set(0,1.02,.18),d.scale.set(.9,.7,.7);const h=new M(new ya(.16,.2,.52,7),at(4431943));h.position.y=.3;const f=at(16766720);[-.05,.05,.15].forEach(C=>{const S=new M(new Q(.025,5,4),f);S.position.set(0,C+.22,.18),this.group.add(S)});const m=at(16766720),p=new M(new Q(.1,6,4),m);p.position.set(-.25,.54,0),p.scale.set(1.1,.45,1);const b=p.clone();b.position.x=.25,this._scarfGroup=new I;const O=new M(new va(.155,.048,7,12),at(16776679));O.position.y=.62,O.rotation.x=Math.PI/2;const N=new M(new Te(.046,.3,2,7),at(16776679));N.position.set(-.08,.43,-.13),N.rotation.x=-.3;const k=new M(new Te(.046,.24,2,7),at(16776679));k.position.set(.08,.39,-.15),k.rotation.x=-.36,this._scarfGroup.add(O,N,k),this._armLPivot=new I,this._armLPivot.position.set(-.25,.52,0);const tt=new M(new Te(.068,.26,2,7),at(4431943));tt.position.y=-.18,this._armLPivot.add(tt),this._armRPivot=new I,this._armRPivot.position.set(.25,.52,0),this._armRPivot.add(tt.clone()),this._hips=new I,this._hips.position.y=-.14;const Ot=new Te(.078,.3,2,7),W=at(1713022);this._legLPivot=new I,this._legLPivot.position.x=-.11;const ft=new M(Ot,W);ft.position.y=-.24,this._legLPivot.add(ft),this._legRPivot=new I,this._legRPivot.position.x=.11,this._legRPivot.add(ft.clone());const yt=at(2171169),u=new M(new Q(.095,7,5),yt);u.position.set(-.11,-.52,.04),u.scale.set(1,.6,1.25);const x=u.clone();x.position.x=.11,this._hips.add(this._legLPivot,this._legRPivot,u,x),this.group.add(h,p,b,this._scarfGroup,this._headGroup,l,d,this._armLPivot,this._armRPivot,this._hips),this.group.traverse(C=>{C.isMesh&&(C.castShadow=!0)})}update(t,e,s,a=!1){if(a){this._legLPivot.rotation.x=-.7,this._legRPivot.rotation.x=-.7,this._armLPivot.rotation.x=-1,this._armRPivot.rotation.x=-1,this._armLPivot.rotation.z=-.75,this._armRPivot.rotation.z=.75,this._scarfGroup.rotation.x=-.55,this._headGroup.rotation.x=.1,this.group.rotation.z=0,this._hips.position.y=-.14;return}this._armLPivot.rotation.z=0,this._armRPivot.rotation.z=0,this._scarfGroup.rotation.x=0,this._headGroup.rotation.x=0,e&&(this._stride+=t*4.5);const n=Math.sin(this._stride)*(e?.55:.03);this._legLPivot.rotation.x=-n,this._legRPivot.rotation.x=n,this._armLPivot.rotation.x=n*.65,this._armRPivot.rotation.x=-n*.65,this._scarfGroup.rotation.x=e?Math.sin(this._stride*2)*.09:0,this.group.rotation.z=e?0:Math.sin(s*.6)*.025,this._hips.position.y=-.14+Math.abs(Math.sin(this._stride*2))*.03}}class un{constructor(){this.keys=new Set,this._enabled=!0,window.addEventListener("keydown",t=>{if(!this._enabled)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||this.keys.add(t.key.toLowerCase())}),window.addEventListener("keyup",t=>{this.keys.delete(t.key.toLowerCase())}),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.keys.clear()})}setEnabled(t){this._enabled=!!t,t||this.keys.clear()}}class mn{constructor(){this._joyX=0,this._joyY=0,this._joyTouchId=null,this._joyOrigin={x:0,y:0},this.JOY_RADIUS=52,this._camTouchId=null,this._camLastX=0,this._camLastY=0,this._pendingCamDx=0,this._pendingCamDy=0,this._pendingJump=!1,this._pendingInteract=!1,this._pendingMap=!1,this._buildUI(),this._bindEvents()}_buildUI(){const t=document.createElement("div");t.id="touch-controls",t.innerHTML=`
      <!-- Faded ghost hint — shows where to press for joystick -->
      <div id="joy-hint">
        <div id="joy-hint-inner"></div>
        <div class="joy-hint-arrow joy-hint-arrow--up"></div>
        <div class="joy-hint-arrow joy-hint-arrow--dn"></div>
        <div class="joy-hint-arrow joy-hint-arrow--lt"></div>
        <div class="joy-hint-arrow joy-hint-arrow--rt"></div>
      </div>
      <!-- Floating joystick — positioned dynamically at touch point -->
      <div id="joy-base"><div id="joy-thumb"></div></div>
      <!-- Action buttons -->
      <div id="touch-btns">
        <button class="touch-btn touch-btn--map"  id="touch-map-btn"  aria-label="World Map">${A("map",20)}</button>
        <button class="touch-btn touch-btn--jump" id="touch-jump-btn" aria-label="Jump">↑</button>
        <button class="touch-btn touch-btn--e"    id="touch-e-btn"    aria-label="Explore">E</button>
      </div>
    `,document.body.appendChild(t),this._el=t,this._joyHint=t.querySelector("#joy-hint"),this._joyBase=t.querySelector("#joy-base"),this._joyThumb=t.querySelector("#joy-thumb")}_bindEvents(){document.addEventListener("touchstart",e=>{for(const s of e.changedTouches)this._joyTouchId===null&&(e.target.closest("#touch-btns, #touch-buttons")||s.clientX>window.innerWidth*.52||(this._joyTouchId=s.identifier,this._joyOrigin.x=s.clientX,this._joyOrigin.y=s.clientY,this._placeJoystick(s.clientX,s.clientY)))},{passive:!0}),document.addEventListener("touchstart",e=>{for(const s of e.changedTouches)this._camTouchId===null&&s.identifier!==this._joyTouchId&&(e.target.closest("#touch-btns, #touch-buttons")||s.clientX>window.innerWidth*.42&&(this._camTouchId=s.identifier,this._camLastX=s.clientX,this._camLastY=s.clientY))},{passive:!0}),document.addEventListener("touchmove",e=>{for(const s of e.changedTouches)if(s.identifier===this._joyTouchId){const a=s.clientX-this._joyOrigin.x,n=s.clientY-this._joyOrigin.y,o=Math.min(Math.hypot(a,n),this.JOY_RADIUS),r=Math.atan2(n,a);this._joyX=o/this.JOY_RADIUS*Math.cos(r),this._joyY=o/this.JOY_RADIUS*Math.sin(r),this._joyThumb.style.transform=`translate(${Math.cos(r)*o}px, ${Math.sin(r)*o}px)`}else s.identifier===this._camTouchId&&(this._pendingCamDx+=s.clientX-this._camLastX,this._pendingCamDy+=s.clientY-this._camLastY,this._camLastX=s.clientX,this._camLastY=s.clientY)},{passive:!0});const t=e=>{for(const s of e.changedTouches)s.identifier===this._joyTouchId&&(this._joyTouchId=null,this._joyX=0,this._joyY=0,this._joyThumb.style.transform="",this._hideJoystick()),s.identifier===this._camTouchId&&(this._camTouchId=null)};document.addEventListener("touchend",t,{passive:!0}),document.addEventListener("touchcancel",t,{passive:!0}),this._btn("#touch-jump-btn",()=>{this._pendingJump=!0}),this._btn("#touch-e-btn",()=>{this._pendingInteract=!0}),this._btn("#touch-map-btn",()=>{this._pendingMap=!0})}_btn(t,e){const s=this._el.querySelector(t);s&&(s.addEventListener("touchstart",a=>{a.preventDefault(),e()},{passive:!1}),s.addEventListener("click",a=>a.stopPropagation()))}_placeJoystick(t,e){const s=this.JOY_RADIUS+4,a=8,n=Math.max(a+s,Math.min(window.innerWidth*.52-a-s,t))-s,o=Math.max(a+s,Math.min(window.innerHeight-a-s,e))-s,r=(s+4)*2;this._joyBase.style.left=n+"px",this._joyBase.style.top=o+"px",this._joyBase.style.width=r+"px",this._joyBase.style.height=r+"px",this._joyBase.classList.add("active"),this._joyHint.classList.add("joy-hint--hidden")}_hideJoystick(){this._joyBase.classList.remove("active"),this._joyHint.classList.remove("joy-hint--hidden")}get joyX(){return this._joyX}get joyY(){return this._joyY}popCamDelta(){const t=this._pendingCamDx,e=this._pendingCamDy;return this._pendingCamDx=0,this._pendingCamDy=0,{dx:t,dy:e}}takeJump(){return this._pendingJump?(this._pendingJump=!1,!0):!1}takeInteract(){return this._pendingInteract?(this._pendingInteract=!1,!0):!1}takeMap(){return this._pendingMap?(this._pendingMap=!1,!0):!1}}const v={IDLE:"idle",WALK:"walk",RUN:"run",JUMP:"jump",WALK_JUMP:"walkJump",RUN_JUMP:"runJump",EMOTE:"emote"},is=new Set([v.JUMP,v.WALK_JUMP,v.RUN_JUMP]),ms={IDLE_TO_WALK:.2,WALK_TO_IDLE:.3,WALK_TO_RUN:.2,RUN_TO_WALK:.25,RUN_TO_IDLE:.1,IDLE_TO_RUN:.22,IDLE_TO_JUMP:.12,WALK_TO_WALKJUMP:.1,RUN_TO_RUNJUMP:.08,JUMP_TO_IDLE:.38,JUMP_TO_WALK:.28,JUMP_TO_RUN:.22,WALKJUMP_TO_IDLE:.35,WALKJUMP_TO_WALK:.25,WALKJUMP_TO_RUN:.2,RUNJUMP_TO_IDLE:.32,RUNJUMP_TO_WALK:.25,RUNJUMP_TO_RUN:.18,IDLE_TO_EMOTE:.2,EMOTE_TO_IDLE:.28},Bt=(i,t)=>ms[`${i.toUpperCase()}_TO_${t.toUpperCase()}`]??.22,Ds=9,fn=16;class _n{constructor(){this.mixer=null,this.ready=!1,this._state=v.IDLE,this._action=null,this._finishCb=null,this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._emotes=[],this.emotesEnabled=!0,this._anims={idle:null,walk:null,run:null,jump:null,walkJump:null,runJump:null,walkStart:null,runToStop:null,lookAround:null,lookAround2:null,wave:null}}get state(){return this._state}get isAirborne(){return is.has(this._state)}get isReady(){return this.ready}async load(t,e,s,{skipAnims:a=!1}={}){if(this.mixer=new Rs(t),a){this._state=v.IDLE,this.ready=!0;return}const n=r=>new Promise((l,d)=>e.load(r,l,void 0,d)),o=[["breathingidle.fbx","idle"],["walking.fbx","walk"],["running.fbx","run"],["idlejump.fbx","jump"],["walkingjump.fbx","walkJump"],["runningjump.fbx","runJump"],["walkstart.fbx","walkStart"],["runtostop.fbx","runToStop"],["lookingaround.fbx","lookAround"],["lookingaround2.fbx","lookAround2"],["wave.fbx","wave"]];await Promise.allSettled(o.map(([r,l])=>n(s+r).then(d=>{this._stripRootMotion(d.animations),this._anims[l]=this.mixer.clipAction(d.animations[0])}).catch(d=>console.warn(`[AnimCtrl] ${r} failed:`,d)))),this._anims.idle&&(this._anims.idle.setLoop(es),this._anims.idle.play(),this._action=this._anims.idle),this._state=v.IDLE,this.ready=!0}loadGlbClips(t,e){this.mixer=new Rs(t);const s=e.idle||this._makeBindPoseClip(t);this._anims.idle=this.mixer.clipAction(s);for(const a of["walk","run"]){const n=e[a];n&&(this._stripRootMotion([n]),this._anims[a]=this.mixer.clipAction(n))}Array.isArray(e.emotes)&&(this._stripRootMotion(e.emotes),this._emotes=e.emotes.map(a=>this.mixer.clipAction(a))),this._anims.idle.setLoop(es),this._anims.idle.play(),this._action=this._anims.idle,this._state=v.IDLE,this.ready=!0}_makeBindPoseClip(t){const e=[];return t.traverse(s=>{if(!s.isBone)return;const a=s.quaternion,n=s.position;e.push(new wa(`${s.name}.quaternion`,[0,1],[a.x,a.y,a.z,a.w,a.x,a.y,a.z,a.w])),e.push(new ba(`${s.name}.position`,[0,1],[n.x,n.y,n.z,n.x,n.y,n.z]))}),new Sa("idleStatic",1,e)}update(t,e,s,a){if(!this.ready||!this.mixer)return;if(this.mixer.update(t),is.has(this._state)){a||this._land(e,s);return}if(this._state===v.EMOTE){e&&this._interruptEmote(e,s);return}const n=e&&s?v.RUN:e?v.WALK:v.IDLE;if(n!==this._state){const o=this._state;this._state=n,this._transitionGround(o,n)}this._state===v.IDLE&&this.emotesEnabled?(this._idleTimer+=t,this._idleTimer>=this._emoteDelay&&(this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._playEmote())):this._idleTimer=0}triggerJump(){if(!this.ready||is.has(this._state))return!1;const t=this._state===v.EMOTE?v.IDLE:this._state;if(this._clearFinishCb(),t===v.RUN){const e=this._anims.runJump??this._anims.jump;this._crossFadeOnce(e,Bt(v.RUN,v.RUN_JUMP),1.2),this._state=v.RUN_JUMP}else if(t===v.WALK){const e=this._anims.walkJump??this._anims.jump;this._crossFadeOnce(e,Bt(v.WALK,v.WALK_JUMP),1.3),this._state=v.WALK_JUMP}else this._crossFadeOnce(this._anims.jump,Bt(v.IDLE,v.JUMP),1.4),this._state=v.JUMP;return!0}_land(t,e){this._clearFinishCb();const s=t&&e?v.RUN:t?v.WALK:v.IDLE,a=Bt(this._state,s);this._state=s,this._crossFadeLoop(this._anims[s],a)}_transitionGround(t,e){if(this._clearFinishCb(),t===v.RUN&&e===v.IDLE&&this._anims.runToStop){this._playOnceThenLoop(this._anims.runToStop,this._anims.idle,Bt(t,e),.2);return}this._crossFadeLoop(this._anims[e],Bt(t,e))}_playOnceThenLoop(t,e,s,a){const n=t;this._crossFadeOnce(t,s,1),this._finishCb=o=>{o.action===n&&(this._clearFinishCb(),this._action===n&&this._crossFadeLoop(e,a))},this.mixer.addEventListener("finished",this._finishCb)}_playEmote(){const t=this._emotes.filter(Boolean);if(!t.length)return;const e=t[Math.floor(Math.random()*t.length)];this._state=v.EMOTE,this._crossFadeOnce(e,ms.IDLE_TO_EMOTE,1),this._finishCb=s=>{s.action===e&&(this._clearFinishCb(),this._state===v.EMOTE&&(this._state=v.IDLE,this._crossFadeLoop(this._anims.idle,ms.EMOTE_TO_IDLE)))},this.mixer.addEventListener("finished",this._finishCb)}_interruptEmote(t,e){this._clearFinishCb();const s=t&&e?v.RUN:v.WALK;this._state=s,this._crossFadeLoop(this._anims[s],.22)}_clearFinishCb(){this._finishCb&&(this.mixer.removeEventListener("finished",this._finishCb),this._finishCb=null)}_crossFadeLoop(t,e){if(t){if(t===this._action){t.isRunning()||t.play();return}t.reset(),t.setLoop(es),t.setEffectiveWeight(1),t.play(),this._action&&this._action.crossFadeTo(t,e,!0),this._action=t}}_crossFadeOnce(t,e,s=1){t&&(t.reset(),t.setLoop(Ma,1),t.clampWhenFinished=!0,t.timeScale=s,t.setEffectiveWeight(1),t.play(),this._action&&this._action.crossFadeTo(t,e,!0),this._action=t)}_stripRootMotion(t){for(const e of t)e.tracks=e.tracks.filter(s=>{const a=s.name.toLowerCase();return!(a.endsWith(".position")&&(a.includes("hips")||a.includes("hip")||a.includes("root")))})}_randEmoteDelay(){return Ds+Math.random()*(fn-Ds)}}const xe=16,Qt=.38,Ws=.05,qs=1.1,gn=3.5,yn=12,vn=22,wn=.9,bn=.55,Sn=.4;function $s(i){const t=Math.min(1,Math.max(0,i));return t*t*(3-2*t)}class Mn{constructor(t){this.camera=new La(65,t,.1,2e3),this._camPos=new g,this._pivot=new g,this._pivotSmooth=new g;const e=25,s=Math.cos(Qt)*xe*3,a=Math.sin(Qt)*xe*3;this.camera.position.set(0,e+a,s),this._pivotSmooth.set(0,e+.75,0),this._yaw=0,this._pitch=Qt,this._yawTarget=0,this._pitchTarget=Qt,this._dist=xe,this._distTarget=xe,this._pivotYExtra=0,this._inputEnabled=!0,window.addEventListener("wheel",n=>{this._inputEnabled&&(this._distTarget=Math.max(3,Math.min(60,this._distTarget+n.deltaY*.02)))},{passive:!0}),this._rmbDown=!1,this._lastMx=0,this._lastMy=0,this._snapTimer=0,window.addEventListener("mousedown",n=>{n.button!==2||!this._inputEnabled||(this._rmbDown=!0,this._lastMx=n.clientX,this._lastMy=n.clientY,this._snapTimer=0)}),window.addEventListener("mouseup",n=>{n.button===2&&(this._rmbDown=!1)}),window.addEventListener("mousemove",n=>{if(!this._rmbDown||!this._inputEnabled)return;const o=n.clientX-this._lastMx,r=n.clientY-this._lastMy;this._yawTarget-=o*.005,this._pitchTarget=Math.max(Ws,Math.min(qs,this._pitchTarget+r*.004)),this._lastMx=n.clientX,this._lastMy=n.clientY,this._snapTimer=0}),window.addEventListener("contextmenu",n=>{n.target&&n.target.id==="canvas"&&n.preventDefault()}),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}resize(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}setInputEnabled(t){this._inputEnabled=!!t,t||(this._rmbDown=!1)}applyTouchDelta(t,e){this._inputEnabled&&(this._yawTarget-=t*.005,this._pitchTarget=Math.max(Ws,Math.min(qs,this._pitchTarget+e*.004)),this._snapTimer=0)}setLoadingView(){this.camera.position.set(0,0,52),this.camera.lookAt(0,0,0),this._pivotSmooth.set(0,0,0),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}update(t,e,s,a,n,o,r=0,l=!1){if(l&&!this._rmbDown){if(this._snapTimer+=t,this._snapTimer>.3){let k=r-this._yawTarget;for(;k>Math.PI;)k-=Math.PI*2;for(;k<-Math.PI;)k+=Math.PI*2;this._yawTarget+=k*(1-Math.exp(-4*t)),this._pitchTarget+=(Qt-this._pitchTarget)*(1-Math.exp(-3*t))}}else if(l||(this._snapTimer=0),!this._rmbDown&&!l){let k=r-this._yawTarget;for(;k>Math.PI;)k-=Math.PI*2;for(;k<-Math.PI;)k+=Math.PI*2;this._yawTarget+=k*(1-Math.exp(-2*t))}this._yaw+=(this._yawTarget-this._yaw)*(1-Math.exp(-14*t)),this._pitch+=(this._pitchTarget-this._pitch)*(1-Math.exp(-14*t)),this._dist+=(this._distTarget-this._dist)*(1-Math.exp(-8*t));const d=s+.75+this._pivotYExtra;this._pivot.set(0,d,0);const h=Math.cos(this._pitch)*this._dist,f=Math.sin(this._pitch)*this._dist;this._camPos.set(this._pivot.x-Math.sin(this._yaw)*h,this._pivot.y+f,this._pivot.z+Math.cos(this._yaw)*h),(this.camera.position.distanceToSquared(this._camPos)<vn||this._introKBlend>0)&&(this._introKBlend=Math.min(1,this._introKBlend+t/wn)),this._introElapsed+=t;const p=Kt.lerp(Sn,1,$s(this._introElapsed/bn)),b=Kt.lerp(gn,yn,$s(this._introKBlend))*p,O=1-Math.exp(-b*t);this._pivotSmooth.lerp(this._pivot,O);const N=1-Math.exp(-b*t);this.camera.position.lerp(this._camPos,N),this.camera.lookAt(this._pivotSmooth),this.characterRevealReady=this._introKBlend>0}}const as=155,Zt=28,Ln=22;function En(){const i=Math.random()*Math.PI*2,t=.05+Math.random()*.55;return new g(as*Math.sin(t)*Math.cos(i),as*Math.cos(t),as*Math.sin(t)*Math.sin(i))}function Tn(){const i=Math.random()*Math.PI*2;return new g(Math.cos(i),-.12-Math.random()*.25,Math.sin(i)).normalize()}class xn{constructor(){this.group=new I,this._active=[],this._nextSpawn=4+Math.random()*6,this._shaderMat=new Ve({vertexShader:`
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha      = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 0.97, 0.88, vAlpha);
        }
      `,transparent:!0,depthWrite:!1,blending:ht})}_spawn(){const t=En(),e=Tn(),s=.7+Math.random()*.7,a=70+Math.random()*60,n=new Float32Array(Zt*3),o=new Float32Array(Zt);for(let d=0;d<Zt;d++)n[d*3]=t.x,n[d*3+1]=t.y,n[d*3+2]=t.z;const r=new we;r.setAttribute("position",new H(n,3)),r.setAttribute("alpha",new H(o,1));const l=new Ea(r,this._shaderMat.clone());this.group.add(l),this._active.push({line:l,geo:r,origin:t.clone(),dir:e,progress:0,lifetime:s,speed:a})}update(t){this._nextSpawn-=t,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=5+Math.random()*12);for(let e=this._active.length-1;e>=0;e--){const s=this._active[e];s.progress+=t;const a=s.progress/s.lifetime,n=s.speed*s.progress,o=s.geo.attributes.position.array,r=s.geo.attributes.alpha.array,l=a<.12?a/.12:a>.72?(1-a)/.28:1,d=s.origin.x+s.dir.x*n,h=s.origin.y+s.dir.y*n,f=s.origin.z+s.dir.z*n;for(let m=0;m<Zt;m++){const p=m/(Zt-1),b=p*Ln;o[m*3]=d-s.dir.x*b,o[m*3+1]=h-s.dir.y*b,o[m*3+2]=f-s.dir.z*b,r[m]=Math.pow(1-p,1.6)*l*.95}s.geo.attributes.position.needsUpdate=!0,s.geo.attributes.alpha.needsUpdate=!0,s.progress>=s.lifetime&&(this.group.remove(s.line),s.geo.dispose(),s.line.material.dispose(),this._active.splice(e,1))}}}const kn="modulepreload",Cn=function(i,t){return new URL(i,t).href},Ns={},ke=function(t,e,s){let a=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=Promise.allSettled(e.map(d=>{if(d=Cn(d,s),d in Ns)return;Ns[d]=!0;const h=d.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(!!s)for(let b=o.length-1;b>=0;b--){const O=o[b];if(O.href===d&&(!h||O.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${f}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":kn,h||(p.as="script"),p.crossOrigin="",p.href=d,l&&p.setAttribute("nonce",l),document.head.appendChild(p),h)return new Promise((b,O)=>{p.addEventListener("load",b),p.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return a.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})},An=new g(-44,48,-166);function js(i="rgba(255,250,210,1)",t="rgba(255,180,80,0)"){const s=document.createElement("canvas");s.width=s.height=256;const a=s.getContext("2d"),n=a.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);n.addColorStop(0,i),n.addColorStop(.25,i),n.addColorStop(1,t),a.fillStyle=n,a.fillRect(0,0,256,256);const o=new xi(s);return o.colorSpace=ki,o}class Pn{constructor(){this.group=new I,this._pos=An.clone(),this._t=0,this._core=new I,this._core.position.copy(this._pos),this.group.add(this._core),this._glows=[];const t=new ps(new us({map:js("rgba(255,248,200,0.95)","rgba(255,170,70,0)"),transparent:!0,depthWrite:!1,blending:ht}));t.scale.setScalar(46);const e=new ps(new us({map:js("rgba(255,200,110,0.55)","rgba(255,120,40,0)"),transparent:!0,depthWrite:!1,blending:ht}));e.scale.setScalar(95),this._core.add(e,t),this._glows.push({sprite:t,base:46},{sprite:e,base:95});const s=new M(new Gt(6,2),new pe({color:16776172,flatShading:!0}));this._core.add(s);const a=new M(new Q(6.1,24,24),new pe({color:16773312,transparent:!0,opacity:.55,depthWrite:!1,blending:ht,side:Ti}));this._core.add(a),this._halos=[this._halo(7.6,16773024,.4),this._halo(10,16763989,.2),this._halo(15,16755251,.09)],this._haloBase=this._halos.map(n=>n.material.opacity),this._halos.forEach(n=>this._core.add(n))}_halo(t,e,s){return new M(new Q(t,18,18),new pe({color:e,transparent:!0,opacity:s,depthWrite:!1,blending:ht,side:Ta}))}update(t,e,s=!1){if(s)return;this._t=e;const a=1+Math.sin(e*.6)*.035;this._core.scale.setScalar(a);const n=1+Math.sin(e*.6+.4)*.06;for(const o of this._glows)o.sprite.scale.setScalar(o.base*n);for(let o=0;o<this._halos.length;o++){const r=.85+.15*Math.sin(e*(.5+o*.18)+o);this._halos[o].material.opacity=this._haloBase[o]*r}}}const Fn=[[230,200,8141549,3874406,.16],[240,230,16740277,4857429,.12],[225,180,3828735,1318485,.13],[245,260,10181887,2757968,.1],[220,150,16753226,4859152,.08]],In=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,On=`
  uniform vec3  colorA;
  uniform vec3  colorB;
  uniform float opacity;
  uniform float time;
  varying vec2  vUv;

  // cheap value noise for a wispy edge
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2  c = vUv - 0.5;
    float d = length(c) * 2.0;                 // 0 centre → 1 edge
    float falloff = smoothstep(1.0, 0.1, d);   // soft round vignette

    // drifting wisps break the perfect circle
    float n = noise(vUv * 3.0 + vec2(time * 0.02, time * 0.015));
    falloff *= 0.6 + 0.4 * n;

    float breath = 0.85 + 0.15 * sin(time * 0.25);
    vec3  col = mix(colorB, colorA, falloff);
    gl_FragColor = vec4(col, falloff * opacity * breath);
  }
`;class Rn{constructor(){this.group=new I,this._mats=[];for(const[t,e,s,a,n]of Fn){const o=new Ve({uniforms:{colorA:{value:new K(s)},colorB:{value:new K(a)},opacity:{value:n},time:{value:Math.random()*100}},vertexShader:In,fragmentShader:On,transparent:!0,depthWrite:!1,blending:ht,side:Ci}),r=new M(new xa(e,e),o),l=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1);r.position.set(t*Math.sin(d)*Math.cos(l),t*Math.cos(d)*.7,t*Math.sin(d)*Math.sin(l)),r.lookAt(0,0,0),r.rotation.z=Math.random()*Math.PI*2,r.userData.spin=(Math.random()-.5)*.01,this.group.add(r),this._mats.push(o)}}update(t,e,s=!1){if(!s){for(const a of this._mats)a.uniforms.time.value=e;for(const a of this.group.children)a.rotation.z+=a.userData.spin*t}}}function Bn(i,t){const e=i.attributes.position,s=new Float32Array(e.count*3);i.computeBoundingBox();const{min:a,max:n}=i.boundingBox,o=n.y-a.y||1,r=new K;for(let l=0;l<e.count;l++){const d=(e.getY(l)-a.y)/o;let h=t[0][1];for(const[f,m]of t)d>=f&&(h=m);r.set(h),s[l*3]=r.r,s[l*3+1]=r.g,s[l*3+2]=r.b}i.setAttribute("color",new H(s,3))}function Us(i,t,e,s=.25){const a=i.attributes.position,n=new Float32Array(a.count*3),o=new K(t),r=new K(e),l=new K;for(let d=0;d<a.count;d++)l.copy(Math.random()<s?r:o),n[d*3]=l.r,n[d*3+1]=l.g,n[d*3+2]=l.b;i.setAttribute("color",new H(n,3))}class Dn{constructor(){this.group=new I,this._bodies=[];{const t=new Gt(16,3);Bn(t,[[0,9198140],[.18,13077330],[.36,14725232],[.55,13077330],[.72,14262366],[.88,11565120]]);const e=new M(t,new et({vertexColors:!0,flatShading:!0,roughness:.9,metalness:0,emissive:2757893,emissiveIntensity:.4})),s=new M(new ka(20,30,48),new pe({color:15255702,transparent:!0,opacity:.35,side:Ci,depthWrite:!1,blending:ht}));s.rotation.x=Math.PI/2,this._add({x:-28,y:52,z:199},[e,s],.18,[.4,1,.15])}{const t=new Gt(7,2);Us(t,12567756,8159884,.3);const e=new M(t,new et({vertexColors:!0,flatShading:!0,roughness:1,metalness:0,emissive:1448482,emissiveIntensity:.6}));this._add({x:136,y:38,z:-85},[e],.12,[.2,1,.3])}{const t=new Gt(11,2);Us(t,14706748,11026462,.22);const e=new M(t,new et({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:3149829,emissiveIntensity:.45}));this._add({x:-169,y:30,z:6},[e],.22,[.1,1,.5])}}_add(t,e,s,a){const n=new I;n.position.set(t.x,t.y,t.z);for(const r of e)r.castShadow=!1,r.receiveShadow=!1,n.add(r);const o=new g(a[0],a[1],a[2]).normalize();this._bodies.push({pivot:n,ax:o,speed:s}),this.group.add(n)}update(t,e,s=!1){if(!s)for(const a of this._bodies)a.pivot.rotateOnAxis(a.ax,a.speed*t)}}class Wn{constructor(t="standard"){this.group=new I,this._skyTier=t,this._deferredEnabled=!1,this.sun=new Pn,this.nebula=new Rn,this.bodies=new Dn,this.asteroids=null,this.flyers=null,this.comet=null,this.aurora=null,this._critical=[this.sun,this.nebula,this.bodies];for(const e of this._critical)this.group.add(e.group);this._applyTierVisibility()}setSkyTier(t){this._skyTier=t||"standard",this._applyTierVisibility()}async enableDeferred(t){if(this._deferredEnabled){this.setSkyTier(t);return}if(this._deferredEnabled=!0,this._skyTier=t||this._skyTier,this._skyTier==="minimal"){this._applyTierVisibility();return}const[{Asteroids:e},{Flyers:s},{Comet:a},{Aurora:n}]=await Promise.all([ke(()=>import("./sky-deferred-t9gxC2AS.js").then(o=>o.A),__vite__mapDeps([0,1]),import.meta.url),ke(()=>import("./sky-deferred-t9gxC2AS.js").then(o=>o.F),__vite__mapDeps([0,1]),import.meta.url),ke(()=>import("./sky-deferred-t9gxC2AS.js").then(o=>o.C),__vite__mapDeps([0,1]),import.meta.url),ke(()=>import("./sky-deferred-t9gxC2AS.js").then(o=>o.a),__vite__mapDeps([0,1]),import.meta.url)]);this.asteroids=new e,this.flyers=new s,this.comet=new a,this.aurora=new n;for(const o of[this.asteroids,this.flyers,this.comet,this.aurora])o.group.visible=!1,this.group.add(o.group);this._applyTierVisibility(),this._fadeInDeferred()}_fadeInDeferred(){const t=[this.asteroids,this.flyers,this.comet,this.aurora].filter(Boolean);for(const n of t)n.group.visible=!0,n.group.traverse(o=>{if(!o.material)return;const r=Array.isArray(o.material)?o.material:[o.material];for(const l of r)l&&"opacity"in l&&(l._phfBaseOpacity==null&&(l._phfBaseOpacity=l.opacity),l.transparent=!0,l.opacity=0)});const e=performance.now(),s=900,a=()=>{const n=Math.min(1,(performance.now()-e)/s);for(const o of t)o.group.traverse(r=>{if(!r.material)return;const l=Array.isArray(r.material)?r.material:[r.material];for(const d of l)d&&d._phfBaseOpacity!=null&&(d.opacity=d._phfBaseOpacity*n)});n<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}_applyTierVisibility(){const t=this._skyTier;this.sun.group.visible=!0,this.nebula.group.visible=t!=="minimal",this.bodies.group.visible=t!=="minimal";const e=t==="full"||t==="standard";this.asteroids&&(this.asteroids.group.visible=e&&t==="full"),this.flyers&&(this.flyers.group.visible=e),this.comet&&(this.comet.group.visible=e&&t==="full"),this.aurora&&(this.aurora.group.visible=e)}update(t,e,s=!1){var a,n,o,r;for(const l of this._critical)l.update(t,e,s);(a=this.asteroids)!=null&&a.group.visible&&this.asteroids.update(t,e,s),(n=this.flyers)!=null&&n.group.visible&&this.flyers.update(t,e,s),(o=this.comet)!=null&&o.group.visible&&this.comet.update(t,e,s),(r=this.aurora)!=null&&r.group.visible&&this.aurora.update(t,e,s)}}const qn={arctic_island:{count:35,color:[.82,.92,1],pixelSize:2.5,motionType:0,shapeType:0,spread:4,fallTop:5.2,fallBot:.3,driftAmp:.12,windDrift:0,speedMid:.38,speedVar:.12},desert_island:{count:50,color:[.95,.76,.42],pixelSize:1.6,motionType:1,shapeType:0,spread:4,swirlSpd:2,bobAmp:.2,speedMid:1,speedVar:.45},meadow_island:{count:25,color:[.8,1,.45],pixelSize:2.8,motionType:2,shapeType:1,spread:3.5,driftAmp:5,bobAmp:.55,speedMid:.38,speedVar:.14},mountain_island:{count:40,color:[1,.7,.78],pixelSize:3.5,motionType:0,shapeType:1,spread:4.5,fallTop:5.5,fallBot:.3,driftAmp:1.2,windDrift:2.5,speedMid:.43,speedVar:.17},lava_island:{count:28,color:[.62,.88,.62],pixelSize:4.6,motionType:0,shapeType:3,spread:4,fallTop:7,fallBot:.3,driftAmp:.65,windDrift:.6,speedMid:.27,speedVar:.11},pirate_ship:{count:20,color:[1,.86,.18],pixelSize:3.6,motionType:3,shapeType:2,spread:2.5,speedMid:.65,speedVar:.3}},$n=`
  attribute vec2  aBase;       // (x,z) spread within island-local plane
  attribute float aPhase;      // per-particle time offset 0..2π
  attribute float aSpeed;      // per-particle speed multiplier
  attribute float aSize;       // screen-space size in pixels
  attribute float aBaseAlpha;  // per-particle opacity variation

  uniform float uTime;
  uniform float uOpacity;    // system fade 0→1
  uniform vec3  uCenter;     // island center in planet-local space

  uniform int   uMotion;

  // FALL / SWEEP
  uniform float uFallTop;    // units above surface where particles spawn
  uniform float uFallBot;    // units below surface before cycle resets (keep small)
  uniform float uDriftAmp;   // oscillation amplitude (FALL) or sweep width (SWEEP)
  uniform float uWindDrift;  // progressive +X lean per cycle (0=straight, 2.5=sakura diagonal)

  // SWIRL / SWEEP
  uniform float uSwirlSpd;
  uniform float uBobAmp;     // vertical bob (SWIRL) or float height above surface (SWEEP)

  varying float vAlpha;

  void main() {
    float t   = mod(uTime * aSpeed + aPhase / 6.28318, 1.0);
    vec3  pos = uCenter;   // start at island center in planet-local space
    float a   = aBaseAlpha * uOpacity;

    if (uMotion == 0) {
      // ── FALL ──────────────────────────────────────────────────────────────
      // Particles descend in local +Y → -Y (world gravity when island is near top).
      // windDrift = 0 → nearly vertical (snow).
      // windDrift > 0 → leans progressively in +X as particle falls (sakura/bills).
      float range = uFallTop + uFallBot;
      pos.y += uFallTop - t * range;
      pos.x += aBase.x + sin(uTime * aSpeed * 0.80 + aPhase)        * uDriftAmp
               + t * uWindDrift;
      pos.z += aBase.y + cos(uTime * aSpeed * 0.55 + aPhase * 1.40) * uDriftAmp * 0.6;

    } else if (uMotion == 1) {
      // ── SWIRL ─────────────────────────────────────────────────────────────
      // Orbits around local Y (dust devil). Each particle keeps its initial
      // radius (encoded in aBase length) as it rotates.
      float r     = length(aBase);
      float angle = atan(aBase.y, aBase.x) + uTime * uSwirlSpd * aSpeed;
      pos.x += sin(angle) * r;
      pos.z += cos(angle) * r;
      pos.y += sin(uTime * 2.4 * aSpeed + aPhase) * uBobAmp;

    } else if (uMotion == 2) {
      // ── SWEEP ─────────────────────────────────────────────────────────────
      // Particles stream across the island in local +X (wind direction fixed
      // in island space). Z position is from aBase.y, giving multiple streams.
      // Soft edge fade so particles appear/disappear naturally at both sides.
      float windT = mod(uTime * aSpeed + aPhase / 6.28318, 1.0);
      pos.x += (windT - 0.5) * uDriftAmp * 2.0;  // sweeps -driftAmp..+driftAmp
      pos.z += aBase.y + sin(uTime * aSpeed * 0.45 + aPhase * 1.2) * uDriftAmp * 0.18;
      pos.y += uBobAmp + sin(uTime * aSpeed * 0.80 + aPhase) * uBobAmp * 0.70;
      a     *= smoothstep(0.0, 0.12, windT) * smoothstep(1.0, 0.88, windT);

    } else {
      // ── FOUNTAIN ──────────────────────────────────────────────────────────
      // Coins erupt upward on a sine arc then fall back. Alpha follows height
      // so they materialise going up and dissolve coming down — gold rain.
      float rise   = sin(t * 3.14159);
      float spread = t * (1.0 - t) * 7.5;
      pos.y += rise * 4.5;
      pos.x += aBase.x + sin(aPhase) * spread;
      pos.z += aBase.y + cos(aPhase) * spread;
      a     *= rise;
    }

    vAlpha       = clamp(a, 0.0, 1.0);
    vec4 mvPos   = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize;
    gl_Position  = projectionMatrix * mvPos;
  }
`,Nn=`
  uniform vec3  uColor;
  uniform int   uShape;
  varying float vAlpha;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float alpha;

    if (uShape == 0) {
      // CIRCLE — soft round dot (snow, sand)
      float d = length(uv);
      if (d > 0.5) discard;
      alpha = smoothstep(0.5, 0.05, d);

    } else if (uShape == 1) {
      // OVAL — tall narrow shape (sakura petal, leaf/seed)
      float d = length(vec2(uv.x * 2.2, uv.y));
      if (d > 0.48) discard;
      alpha = smoothstep(0.48, 0.08, d);

    } else if (uShape == 2) {
      // DISC — flat horizontal ellipse (coin side-on)
      float d    = length(vec2(uv.x, uv.y * 3.5));
      if (d > 0.5) discard;
      float base = smoothstep(0.5, 0.15, d);
      float hl   = smoothstep(0.28, 0.0, length(vec2(uv.x - 0.08, uv.y * 3.0 - 0.08)));
      alpha = clamp(base + hl * 0.38, 0.0, 1.0);

    } else {
      // RECT — dollar bill / confetti
      if (abs(uv.x) > 0.44 || abs(uv.y) > 0.22) discard;
      float ex = (0.44 - abs(uv.x)) * 7.0;
      float ey = (0.22 - abs(uv.y)) * 7.0;
      alpha = clamp(min(ex, ey), 0.0, 1.0);
    }

    gl_FragColor = vec4(uColor, alpha * vAlpha);
  }
`;new g;class jn{constructor(){this._systems={},this._group=new I,this._scale=1;for(const[t,e]of Object.entries(qn)){const s=this._buildSystem(e);this._systems[t]=s,this._group.add(s.points)}}get group(){return this._group}setScale(t){if(this._scale=Math.max(0,Math.min(1,t??1)),this._scale<.05)for(const e of Object.values(this._systems))e.points.visible=!1}_buildSystem(t){const e=t.count,s=new Float32Array(e*3),a=new Float32Array(e*2),n=new Float32Array(e),o=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let p=0;p<e;p++){const b=Math.random()*Math.PI*2,O=Math.sqrt(Math.random())*t.spread;a[p*2]=Math.cos(b)*O,a[p*2+1]=Math.sin(b)*O,n[p]=Math.random()*Math.PI*2,o[p]=Math.max(.05,t.speedMid+(Math.random()*2-1)*t.speedVar),r[p]=t.pixelSize*(.55+Math.random()*.9),l[p]=.45+Math.random()*.55}const d=new we;d.setAttribute("position",new H(s,3)),d.setAttribute("aBase",new H(a,2)),d.setAttribute("aPhase",new H(n,1)),d.setAttribute("aSpeed",new H(o,1)),d.setAttribute("aSize",new H(r,1)),d.setAttribute("aBaseAlpha",new H(l,1));const h={uTime:{value:0},uOpacity:{value:0},uCenter:{value:new g(0,26,0)},uColor:{value:new g(...t.color)},uMotion:{value:t.motionType},uShape:{value:t.shapeType},uFallTop:{value:t.fallTop??5},uFallBot:{value:t.fallBot??.3},uDriftAmp:{value:t.driftAmp??.8},uWindDrift:{value:t.windDrift??0},uSwirlSpd:{value:t.swirlSpd??1.8},uBobAmp:{value:t.bobAmp??.22}},f=new Ve({uniforms:h,vertexShader:$n,fragmentShader:Nn,transparent:!0,depthWrite:!1,blending:ht}),m=new Li(d,f);return m.frustumCulled=!1,m.visible=!1,{points:m,uniforms:h}}update(t,e,s,a,n){if(a||this._scale<.05){for(const l of Object.values(this._systems))l.points.visible=!1;return}const o=performance.now()*.001,r=this._scale;for(const[l,d]of Object.entries(this._systems)){const{points:h,uniforms:f}=d,m=l===e;if(f.uOpacity.value+=((m?r:0)-f.uOpacity.value)*Math.min(1,t*2.5),f.uOpacity.value<.01){h.visible=!1;continue}if(n&&n[l]){const p=n[l];f.uCenter.value.set(p.x*s,p.y*s,p.z*s)}else f.uCenter.value.set(0,s,0);h.visible=!0,f.uTime.value=o}}}const st={meadow_island:{iconKey:"leaf",name:"Meadow Island",section:"About Me",color:"#4CAF50",html:`
      <p>Hey, I'm <strong>Eric Ng Min Chern</strong> — a final-year Computer Science student
      at the University of Edinburgh (graduating June 2026), originally from Malaysia.</p>
      <p>I've interned at Barclays and BlackRock, built real products for real businesses,
      and I love making things that are useful, interactive, or just a bit unexpected.</p>
      <div class="tag-row">
        <span class="tag">CS @ Edinburgh</span>
        <span class="tag">Ex-Barclays &amp; BlackRock</span>
        <span class="tag">Full-Stack Dev</span>
        <span class="tag">Open to Work</span>
      </div>
    `},arctic_island:{iconKey:"snowflake",name:"Arctic Island",section:"Tech Stack",color:"#64B5F6",variant:"tech",html:Ya,init:Ka},mountain_island:{iconKey:"mountain",name:"Mountain Island",section:"Projects",color:"#FF8A65",variant:"projects",html:Ja,init:Va},lava_island:{iconKey:"flame",name:"Lava Island",section:"Experience",color:"#E53935",variant:"exp",html:Ga},desert_island:{iconKey:"sun",name:"Desert Island",section:"Contact",color:"#FB923C",variant:"contact",html:Ha,init:za},pirate_ship:{iconKey:"compass",name:"Pirate Ship",section:"Travel Log",color:"#0097A7",lightColor:"#FFFFFF",noGlow:!0,variant:"travel",html:Qa,init:Xa}},ue=new Map;function Oi(i){const t=typeof i.html=="function"?i.html():i.html||"",e=document.createElement("div");return e.className="wp-body",e.innerHTML=t,e}function Un(i){return!!i&&ue.has(i)}function Ri(i,t){return!i||!t||i==="meadow_island"?!1:(ue.has(i)||ue.set(i,Oi(t)),ue.has(i))}function zs(i,t){Ri(i,t);const e=ue.get(i);return e?e.cloneNode(!0):Oi(t)}function zn(){for(const[i,t]of Object.entries(st))i!=="meadow_island"&&Ri(i,t)}function Hn(){return zn(),Promise.resolve()}const Se=typeof window<"u"&&(new URLSearchParams(window.location.search).has("perf")||typeof import.meta<"u"&&!1)||!1,fs=new Map,Bi=[];function Di(){return typeof performance<"u"?performance.now():Date.now()}function V(i){var e;if(!Se)return;const t=Di();fs.set(i,t);try{(e=performance.mark)==null||e.call(performance,`phf:${i}`)}catch{}}function ct(i,t,e=null){var o,r;if(!Se)return 0;const s=fs.get(t),a=e?fs.get(e):Di();if(s==null||a==null)return 0;const n=a-s;Bi.push({name:i,start:s,end:a,duration:n});try{e?(o=performance.measure)==null||o.call(performance,`phf:${i}`,`phf:${t}`,`phf:${e}`):(r=performance.measure)==null||r.call(performance,`phf:${i}`,`phf:${t}`)}catch{}return n}function Gn(){if(!Se)return null;const i=Bi.map(t=>({stage:t.name,ms:Math.round(t.duration)}));return new URLSearchParams(window.location.search).has("perf")&&console.table(i),i}function $e(){return Se}function Vn(){var i,t,e,s,a,n;if(!(!Se||typeof performance>"u")){try{const o=(t=(i=performance.getEntriesByType)==null?void 0:i.call(performance,"navigation"))==null?void 0:t[0];o&&console.log("[perf] TTFB:",(s=(e=o.responseStart)==null?void 0:e.toFixed)==null?void 0:s.call(e,1),"ms | DOMContentLoaded:",(n=(a=o.domContentLoadedEventEnd)==null?void 0:a.toFixed)==null?void 0:n.call(a,1),"ms")}catch{}V("module_eval")}}const Hs="ontouchstart"in window||navigator.maxTouchPoints>0;class Jn{constructor(){this._popup=document.createElement("div"),this._popup.id="island-popup",this._popup.className="hidden",this._popup.innerHTML=`
      <div class="pu-halo" aria-hidden="true"></div>
      <div class="pu-inner">
        <span class="pu-icon"></span>
        <div class="pu-names">
          <div class="pu-island"></div>
          <div class="pu-section"></div>
        </div>
        <div class="pu-key">
          <span class="pu-pulse" aria-hidden="true"></span>
          <span class="pu-keycap"></span>
          <span class="pu-key-label"></span>
        </div>
      </div>
    `,document.body.appendChild(this._popup),this._popup.addEventListener("click",()=>{var s;(s=this.onPopupTap)==null||s.call(this)}),this._popup.addEventListener("touchend",s=>{var a;s.preventDefault(),(a=this.onPopupTap)==null||a.call(this)},{passive:!1}),this._sub=document.createElement("div"),this._sub.id="sub-popup",this._sub.className="hidden",this._sub.innerHTML=`
      <div class="sp-inner">
        <span class="sp-spark" aria-hidden="true"></span>
        <span class="sp-icon"></span>
        <div class="sp-names">
          <div class="sp-title"></div>
          <div class="sp-sub"></div>
        </div>
        <div class="sp-key">
          <span class="sp-keycap"></span>
        </div>
      </div>
    `,document.body.appendChild(this._sub),this._sub.addEventListener("click",()=>{var s;(s=this.onSubPopupTap)==null||s.call(this)}),this._sub.addEventListener("touchend",s=>{var a;s.preventDefault(),(a=this.onSubPopupTap)==null||a.call(this)},{passive:!1}),this._panel=document.getElementById("world-panel"),this._icon=document.getElementById("wp-icon"),this._eyebrow=document.getElementById("wp-eyebrow"),this._title=document.getElementById("wp-title"),this._content=document.getElementById("wp-content"),this._halo=this._panel.querySelector(".wp-halo"),this._closeBtn=document.getElementById("wp-close"),this._closeBtn.innerHTML=A("close",18,2),this._closeBtn.addEventListener("click",()=>this._requestClose()),this._panel.addEventListener("click",s=>{(s.target===this._panel||s.target.classList&&s.target.classList.contains("wp-scrim"))&&this._requestClose()}),this._closeTimer=null,this._openGen=0,this.onPopupTap=null,this.onSubPopupTap=null,this.onClosePanel=null;const t=document.getElementById("landmark-badge"),e=document.getElementById("hint-text");t&&(t.style.display="none"),e&&(e.style.display="none")}showPopup(t){this._popup.querySelector(".pu-icon").innerHTML=A(t.iconKey,22),this._popup.querySelector(".pu-island").textContent=t.name,this._popup.querySelector(".pu-section").textContent=t.section,this._popup.style.setProperty("--ic",t.color);const e=this._popup.querySelector(".pu-keycap"),s=this._popup.querySelector(".pu-key-label");Hs?(e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/></svg>',e.classList.add("pu-keycap--tap"),s.textContent="Tap"):(e.textContent="E",e.classList.remove("pu-keycap--tap"),s.textContent="Explore"),this._popup.classList.remove("hidden")}hidePopup(){this._popup.classList.add("hidden")}showSubPopup({iconKey:t,title:e,sub:s,color:a,keycap:n}){this._sub.querySelector(".sp-icon").innerHTML=A(t,18),this._sub.querySelector(".sp-title").textContent=e,this._sub.querySelector(".sp-sub").textContent=s,this._sub.style.setProperty("--ic",a);const o=this._sub.querySelector(".sp-keycap");Hs?(o.textContent="Tap",o.classList.add("sp-keycap--tap")):(o.textContent=n,o.classList.remove("sp-keycap--tap")),this._sub.classList.remove("hidden")}hideSubPopup(){this._sub.classList.add("hidden")}openPanel(t,e){this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),this._openGen+=1;const s=this._openGen;this._icon.innerHTML=A(t.iconKey,26),this._eyebrow.textContent=t.section,this._title.textContent=t.name,this._panel.style.setProperty("--ic",t.color);const a=this._panel.querySelector(".wp-card");a.className="wp-card"+(t.variant?` wp--${t.variant}`:"");const n=e||t.section,o=t.init;this._content.scrollTop=0;const r=`panel_open_${n}`;if($e()&&V(`${r}_start`),Un(n)){const l=zs(n,t);this._content.replaceChildren(l),this._panel.classList.remove("hidden","is-closing"),this._panel.offsetWidth,this._panel.classList.add("is-open"),requestAnimationFrame(()=>{s===this._openGen&&(o==null||o(this._content),$e()&&(V(`${r}_end`),ct(r,`${r}_start`,`${r}_end`)))});return}this._content.replaceChildren(),this._panel.classList.remove("hidden","is-closing"),this._panel.offsetWidth,this._panel.classList.add("is-open"),requestAnimationFrame(()=>{if(s!==this._openGen)return;const l=zs(n,t);this._content.replaceChildren(l),this._content.scrollTop=0,requestAnimationFrame(()=>{s===this._openGen&&(o==null||o(this._content))})})}_requestClose(){this.onClosePanel?this.onClosePanel():this.closePanel()}closePanel(){var t,e;if(!this._panel.classList.contains("is-open")){this._panel.classList.add("hidden");return}(e=(t=this._content)._disposeIsland)==null||e.call(t),this._content._disposeIsland=null,this._panel.classList.remove("is-open"),this._panel.classList.add("is-closing"),this._closeTimer=setTimeout(()=>{this._panel.classList.add("hidden"),this._panel.classList.remove("is-closing"),this._content.replaceChildren(),this._closeTimer=null},320)}isPanelOpen(){return this._panel.classList.contains("is-open")}}function Dt(i){return String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}class Kn{constructor(t){this._onTeleport=t,this._visited=new Set,this._lastFocus=null,this._build()}_build(){const t=document.createElement("div");t.id="map-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","map-title");const e=Object.entries(st).map(([s,a])=>`
      <div class="map-card" data-island="${Dt(s)}" style="--ic:${Dt(a.color)}">
        <div class="map-visited-badge" aria-hidden="true">✓ found</div>
        <div class="map-card-icon" aria-hidden="true">${A(a.iconKey,30)}</div>
        <div class="map-card-name">${Dt(a.name)}</div>
        <div class="map-card-section">${Dt(a.section)}</div>
        <button class="map-card-btn" type="button" data-teleport="${Dt(s)}"
                aria-label="Warp to ${Dt(a.name)}">Warp there</button>
      </div>
    `).join("");t.innerHTML=`
      <div class="overlay-inner map-overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="map-title">${A("map",18)} Island Map</span>
          <button class="overlay-x" id="map-close" type="button" aria-label="Close map">✕</button>
        </div>
        <p class="overlay-sub">Walk there yourself, or jump straight to any island.</p>
        <div class="map-grid">${e}</div>
      </div>
    `,t.querySelector("#map-close").addEventListener("click",()=>this.close()),t.addEventListener("click",s=>{s.target===t&&this.close()}),t.querySelectorAll("[data-teleport]").forEach(s=>{s.addEventListener("click",a=>{a.stopPropagation(),this.close(),this._onTeleport(s.dataset.teleport)})}),document.body.appendChild(t),this._el=t}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#map-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}markVisited(t){if(this._visited.has(t))return;this._visited.add(t);const e=this._el.querySelector(`[data-island="${t}"]`);e&&e.classList.add("visited")}}const Wt="ontouchstart"in window||navigator.maxTouchPoints>0;class Yn{constructor(){this._lastFocus=null,this._build()}_build(){const t=document.createElement("div");t.id="help-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","help-title"),t.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="help-title">How to Play</span>
          <button class="overlay-x" id="help-close" type="button" aria-label="Close help">✕</button>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${Wt?"":"active"}" type="button" role="tab"
                  aria-selected="${!Wt}" aria-controls="help-desktop" id="tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${Wt?"active":""}" type="button" role="tab"
                  aria-selected="${Wt}" aria-controls="help-mobile" id="tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="help-desktop" class="help-section ${Wt?"help-hidden":""}">
          <div class="help-desktop-layout">

            <!-- Keyboard cluster -->
            <div class="help-kb-cluster">
              <p class="help-cluster-label">Movement</p>

              <!-- WASD keys -->
              <div class="help-kb-wasd">
                <div class="help-kb-row help-kb-row--top">
                  <div class="hkey hkey--sq">W</div>
                </div>
                <div class="help-kb-row">
                  <div class="hkey hkey--sq">A</div>
                  <div class="hkey hkey--sq">S</div>
                  <div class="hkey hkey--sq">D</div>
                </div>
              </div>

              <!-- Modifier row with labels -->
              <div class="help-kb-mods">
                <div class="help-kb-mod-col">
                  <div class="hkey hkey--wide">Shift</div>
                  <span class="help-kb-mod-label">Sprint</span>
                </div>
                <div class="help-kb-mod-col help-kb-mod-col--grow">
                  <div class="hkey hkey--space">Space</div>
                  <span class="help-kb-mod-label">Jump</span>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="help-divider"></div>

            <!-- Other controls (same style as mobile) -->
            <div class="help-kb-controls">
              <div class="help-mob-row">
                <div class="help-mob-badge">E</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">F</div>
                <span>Open a marked spot</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Esc</div>
                <span>Close panel</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">RMB drag</div>
                <span>Rotate camera</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Scroll</div>
                <span>Zoom in / out</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">M</div>
                <span>World Map</span>
              </div>
            </div>

          </div>
          <p class="help-tip">Step onto a glowing island and press <kbd>E</kbd> to dive in.</p>
        </div>

        <!-- ── MOBILE TAB ───────────────────────────────────────── -->
        <div id="help-mobile" class="help-section ${Wt?"":"help-hidden"}">
          <div class="help-mobile-layout">

            <div class="help-joy-diagram">
              <div class="help-joy-ring">
                <div class="help-joy-thumb"></div>
                <div class="help-joy-arr help-joy-arr--u"></div>
                <div class="help-joy-arr help-joy-arr--d"></div>
                <div class="help-joy-arr help-joy-arr--l"></div>
                <div class="help-joy-arr help-joy-arr--r"></div>
              </div>
              <p class="help-joy-label">Touch left side<br>to move</p>
            </div>

            <div class="help-divider"></div>

            <div class="help-mobile-controls">
              <div class="help-mob-row">
                <div class="help-mob-badge">Drag right</div>
                <span>Rotate camera</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">↑ button</div>
                <span>Jump</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">E button</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Tap popup</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Tap gold prompt</div>
                <span>Open a marked spot</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Map button</div>
                <span>World Map</span>
              </div>
            </div>

          </div>
          <p class="help-tip">Step onto a glowing island and tap the prompt to dive in.</p>
        </div>

      </div>
    `;const e=t.querySelector("#help-desktop"),s=t.querySelector("#help-mobile");e&&(e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","tab-desktop")),s&&(s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby","tab-mobile")),t.querySelector("#help-close").addEventListener("click",()=>this.close()),t.addEventListener("click",o=>{o.target===t&&this.close()});const a=[...t.querySelectorAll(".help-tab")];function n(o){a.forEach(l=>{const d=l===o;l.classList.toggle("active",d),l.setAttribute("aria-selected",String(d)),l.tabIndex=d?0:-1}),t.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const r=t.querySelector(`#help-${o.dataset.tab}`);r&&r.classList.remove("help-hidden")}a.forEach(o=>{o.addEventListener("click",()=>n(o)),o.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;const l=r.key==="ArrowRight"?1:-1,d=a[(a.indexOf(o)+l+a.length)%a.length];d.focus(),n(d)})}),document.body.appendChild(t),this._el=t}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#help-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}}const qt="ontouchstart"in window||navigator.maxTouchPoints>0;class Xn{constructor(){this._lastFocus=null,this._onKey=null,this._onClick=null,this._onTouch=null,this._build()}_build(){const t=document.createElement("div");t.id="intro-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","intro-title"),t.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="intro-title">How to Play</span>
          <button class="overlay-x" id="intro-close" type="button" aria-label="Close intro">✕</button>
        </div>

        <div class="intro-welcome">
          <div class="intro-welcome-icon" id="intro-welcome-icon">${A("world",38,1.5)}</div>
          <h2 class="intro-welcome-title" id="intro-welcome-title">Welcome to Eric's World!</h2>
          <p class="intro-welcome-sub" id="intro-welcome-sub">Six islands. Explore them all.</p>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${qt?"":"active"}" type="button" role="tab"
                  aria-selected="${!qt}" aria-controls="intro-desktop" id="intro-tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${qt?"active":""}" type="button" role="tab"
                  aria-selected="${qt}" aria-controls="intro-mobile" id="intro-tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="intro-desktop" class="help-section ${qt?"help-hidden":""}">
          <div class="help-desktop-layout">

            <div class="help-kb-cluster">
              <p class="help-cluster-label">Movement</p>
              <div class="help-kb-wasd">
                <div class="help-kb-row help-kb-row--top">
                  <div class="hkey hkey--sq">W</div>
                </div>
                <div class="help-kb-row">
                  <div class="hkey hkey--sq">A</div>
                  <div class="hkey hkey--sq">S</div>
                  <div class="hkey hkey--sq">D</div>
                </div>
              </div>
              <div class="help-kb-mods">
                <div class="help-kb-mod-col">
                  <div class="hkey hkey--wide">Shift</div>
                  <span class="help-kb-mod-label">Sprint</span>
                </div>
                <div class="help-kb-mod-col help-kb-mod-col--grow">
                  <div class="hkey hkey--space">Space</div>
                  <span class="help-kb-mod-label">Jump</span>
                </div>
              </div>
            </div>

            <div class="help-divider"></div>

            <div class="help-kb-controls">
              <div class="help-mob-row">
                <div class="help-mob-badge">E</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Esc</div>
                <span>Close panel</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">RMB drag</div>
                <span>Rotate camera</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Scroll</div>
                <span>Zoom in / out</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">M</div>
                <span>World Map</span>
              </div>
            </div>

          </div>
          <p class="help-tip">Step onto a glowing island and press <kbd>E</kbd> to dive in.</p>
        </div>

        <!-- ── MOBILE TAB ───────────────────────────────────────── -->
        <div id="intro-mobile" class="help-section ${qt?"":"help-hidden"}">
          <div class="help-mobile-layout">

            <div class="help-joy-diagram">
              <div class="help-joy-ring">
                <div class="help-joy-thumb"></div>
                <div class="help-joy-arr help-joy-arr--u"></div>
                <div class="help-joy-arr help-joy-arr--d"></div>
                <div class="help-joy-arr help-joy-arr--l"></div>
                <div class="help-joy-arr help-joy-arr--r"></div>
              </div>
              <p class="help-joy-label">Touch left side<br>to move</p>
            </div>

            <div class="help-divider"></div>

            <div class="help-mobile-controls">
              <div class="help-mob-row">
                <div class="help-mob-badge">Drag right</div>
                <span>Rotate camera</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">↑ button</div>
                <span>Jump</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">E button</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Tap popup</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Map button</div>
                <span>World Map</span>
              </div>
            </div>

          </div>
          <p class="help-tip">Step onto a glowing island and tap the prompt to dive in.</p>
        </div>

        <div class="intro-press-hint" aria-hidden="true">press anything to start</div>
      </div>
    `;const e=t.querySelector("#intro-desktop"),s=t.querySelector("#intro-mobile");e&&(e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","intro-tab-desktop")),s&&(s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby","intro-tab-mobile")),t.querySelector("#intro-close").addEventListener("click",()=>this.close());const a=[...t.querySelectorAll(".help-tab")];function n(o){a.forEach(l=>{const d=l===o;l.classList.toggle("active",d),l.setAttribute("aria-selected",String(d)),l.tabIndex=d?0:-1}),t.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const r=t.querySelector(`#intro-${o.dataset.tab}`);r&&r.classList.remove("help-hidden")}a.forEach(o=>{o.addEventListener("click",()=>n(o)),o.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;const l=r.key==="ArrowRight"?1:-1,d=a[(a.indexOf(o)+l+a.length)%a.length];d.focus(),n(d)})}),document.body.appendChild(t),this._el=t}open(t=!1){const e=this._el.querySelector("#intro-welcome-icon"),s=this._el.querySelector("#intro-welcome-title"),a=this._el.querySelector("#intro-welcome-sub");e&&(e.innerHTML=A(t?"compass":"world",38,1.5)),s&&(s.textContent=t?"Welcome back!":"Welcome to Eric's World!"),a&&(a.textContent=t?"Here's a quick refresher in case you forgot the ropes.":"Six islands. Explore them all."),this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var n;return(n=this._el.querySelector("#intro-close"))==null?void 0:n.focus()}),this._onKey=n=>{n.target.closest("#intro-overlay")&&(n.key==="Tab"||n.key==="ArrowLeft"||n.key==="ArrowRight")||this.close()},this._onClick=n=>{n.target===this._el&&this.close()},this._onTouch=n=>{n.target===this._el&&this.close()},document.addEventListener("keydown",this._onKey,{once:!1}),this._el.addEventListener("click",this._onClick,{once:!1}),this._el.addEventListener("touchstart",this._onTouch,{once:!1,passive:!0})}close(){this._el.classList.remove("is-open"),localStorage.setItem("phf-intro-seen","1"),this._onKey&&document.removeEventListener("keydown",this._onKey),this._onClick&&this._el.removeEventListener("click",this._onClick),this._onTouch&&this._el.removeEventListener("touchstart",this._onTouch),this._onKey=this._onClick=this._onTouch=null,this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}}const Wi="phf-settings-v1";function Qn(){try{const i=localStorage.getItem(Wi);if(!i)return null;const t=JSON.parse(i);return typeof t!="object"||t===null?null:t}catch{return null}}function Zn(i){try{localStorage.setItem(Wi,JSON.stringify(i))}catch{}}class to{constructor(){var s;const t=Qn()??{},e=((s=window.matchMedia)==null?void 0:s.call(window,"(prefers-reduced-motion: reduce)").matches)??!1;this._quality=["low","auto","high"].includes(t.quality)?t.quality:"auto",this._reducedMotion=typeof t.reducedMotion=="boolean"?t.reducedMotion:e,this._hintsVisible=typeof t.hintsVisible=="boolean"?t.hintsVisible:!0,this._reducedMotion&&document.body.classList.add("reduced-motion"),this.onQualityChange=null,this.onReducedMotionChange=null,this.onHintsChange=null,this._lastFocus=null,this._build()}applyRestored(){var t,e,s;(t=this.onQualityChange)==null||t.call(this,this._quality),(e=this.onReducedMotionChange)==null||e.call(this,this._reducedMotion),(s=this.onHintsChange)==null||s.call(this,this._hintsVisible)}_persist(){Zn({quality:this._quality,reducedMotion:this._reducedMotion,hintsVisible:this._hintsVisible})}_build(){const t=this._reducedMotion,e=this._hintsVisible,s=document.createElement("div");s.id="settings-overlay",s.className="overlay-modal",s.setAttribute("aria-modal","true"),s.setAttribute("role","dialog"),s.setAttribute("aria-labelledby","settings-title");const a=(r,l)=>`
      <button class="sopt${this._quality===r?" active":""}"
              type="button"
              data-q="${r}"
              aria-pressed="${this._quality===r}">${l}</button>`;s.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="settings-title">${A("settings",18)} Options</span>
          <button class="overlay-x" id="settings-close" type="button" aria-label="Close settings">✕</button>
        </div>
        <div class="settings-row">
          <span class="settings-label" id="settings-q-label">Graphics</span>
          <div class="settings-opts" role="group" aria-labelledby="settings-q-label">
            ${a("low","Low")}
            ${a("auto","Auto")}
            ${a("high","High")}
          </div>
        </div>
        <div class="settings-row">
          <span class="settings-label">Reduced Motion</span>
          <button class="stoggle${t?" active":""}" id="motion-toggle" type="button" aria-pressed="${t}">${t?"ON":"OFF"}</button>
        </div>
        <div class="settings-row">
          <span class="settings-label">Control Hints</span>
          <button class="stoggle${e?" active":""}" id="hints-toggle" type="button" aria-pressed="${e}">${e?"ON":"OFF"}</button>
        </div>
        <div class="settings-row">
          <span class="settings-label">Sound</span>
          <button class="stoggle" disabled type="button" aria-disabled="true" style="opacity:.35;cursor:default">OFF</button>
          <span class="settings-note">coming soon</span>
        </div>
      </div>
    `,s.querySelector("#settings-close").addEventListener("click",()=>this.close()),s.addEventListener("click",r=>{r.target===s&&this.close()}),s.querySelectorAll("[data-q]").forEach(r=>{r.addEventListener("click",()=>{var l;s.querySelectorAll("[data-q]").forEach(d=>{const h=d===r;d.classList.toggle("active",h),d.setAttribute("aria-pressed",String(h))}),this._quality=r.dataset.q,this._persist(),(l=this.onQualityChange)==null||l.call(this,this._quality)})});const n=s.querySelector("#motion-toggle");n.addEventListener("click",()=>{var r;this._reducedMotion=!this._reducedMotion,n.textContent=this._reducedMotion?"ON":"OFF",n.classList.toggle("active",this._reducedMotion),n.setAttribute("aria-pressed",String(this._reducedMotion)),document.body.classList.toggle("reduced-motion",this._reducedMotion),this._persist(),(r=this.onReducedMotionChange)==null||r.call(this,this._reducedMotion)});const o=s.querySelector("#hints-toggle");o.addEventListener("click",()=>{var r;this._hintsVisible=!this._hintsVisible,o.textContent=this._hintsVisible?"ON":"OFF",o.classList.toggle("active",this._hintsVisible),o.setAttribute("aria-pressed",String(this._hintsVisible)),this._persist(),(r=this.onHintsChange)==null||r.call(this,this._hintsVisible)}),document.body.appendChild(s),this._el=s}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#settings-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}get quality(){return this._quality}get reducedMotion(){return this._reducedMotion}get hintsVisible(){return this._hintsVisible}}const eo="./";class so{constructor(){this._el=null,this.onStartClose=null,this.onClose=null,this.shouldCloseFromBackdrop=null,this._build()}_build(){const t=document.createElement("div");t.id="about-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","About Eric"),t.innerHTML=`
      <button class="about-close" type="button" aria-label="Close">${A("close",18,2)}</button>

      <!-- Warm spotlight grounding the character -->
      <div class="about-stage" aria-hidden="true"></div>

      <!-- Brand sign — the ERIC NG wordmark on a warm plaque, top-center -->
      <div class="about-brand">
        <img class="about-brand-img" src="${eo}ericnglogo.png" alt="Eric Ng" width="1080" height="355" draggable="false">
      </div>

      <!-- Interact hint — floats below the brand sign -->
      <div class="about-hint" aria-hidden="true">
        <span class="about-hint-dot"></span>
        move your cursor — he's watching
      </div>

      <!-- Hero nameplate dock -->
      <div class="about-dock">
        <div class="about-dock-row about-dock-top">
          <div class="about-identity">
            <div class="about-chip" aria-hidden="true">${A("leaf",26)}</div>
            <div class="about-id">
              <div class="about-eyebrow">About Me</div>
              <div class="about-name-row">
                <h2 class="about-name">Eric Ng Min Chern</h2>
                <span class="about-status"><span class="about-status-dot"></span>Open to Work</span>
              </div>
              <p class="about-role">Final-year CS @ University of Edinburgh · Graduating 2026 · Ex-Barclays &amp; BlackRock</p>
            </div>
          </div>
          <div class="about-actions">
            <a class="about-icon" href="mailto:ericng8766@gmail.com" aria-label="Email Eric">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
            </a>
            <a class="about-icon" href="https://linkedin.com/in/erriiiccccccc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a class="about-icon" href="https://github.com/erriiiccccccc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a class="about-cta" href="https://github.com/erriiiccccccc/erriiiccccccc.github.io" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              View Source
            </a>
          </div>
        </div>
        <div class="about-dock-row about-dock-bottom">
          <p class="about-tagline">I build things that are useful, interactive, or just a bit unexpected — like this whole world, written from scratch in Three.js.</p>
          <div class="about-meta">
            <span><b>6</b> islands</span>
            <span class="about-meta-dot">·</span>
            <span><b>100%</b> procedural</span>
            <span class="about-meta-dot">·</span>
            <span>built in <b>Three.js</b></span>
          </div>
        </div>
      </div>
    `,document.body.appendChild(t),this._el=t,t.querySelector(".about-close").addEventListener("click",()=>this.close()),t.addEventListener("click",e=>{e.target===t&&(this.shouldCloseFromBackdrop&&!this.shouldCloseFromBackdrop(e)||this.close())})}open(){this.isOpen()||(this._el.classList.remove("is-closing"),this._el.classList.add("is-open"))}close(){var t;this.isOpen()&&((t=this.onStartClose)==null||t.call(this),this._el.classList.add("is-closing"),setTimeout(()=>{var e;this._el.classList.remove("is-open","is-closing"),(e=this.onClose)==null||e.call(this)},350))}isOpen(){return this._el.classList.contains("is-open")}}const io="https://ericng.my",qi="ew_doodles_v1",$i="ew_doodles_hidden_v1",ao=12,no=200,oo=24,Ni=26e5;function Ps(){return/\.github\.io$/i.test(location.hostname)?`${io}/api/gallery`:"/api/gallery"}function ji(i){return String(i||"").replace(/[^\p{L}\p{N} '._-]/gu,"").replace(/\s+/g," ").trim().slice(0,oo)}function Ne(){try{const i=localStorage.getItem(qi),t=i?JSON.parse(i):[];return Array.isArray(t)?t:[]}catch{return[]}}function Gs(i){try{localStorage.setItem(qi,JSON.stringify(i.slice(0,ao)))}catch{}}function _s(){try{const i=JSON.parse(localStorage.getItem($i)||"[]");return Array.isArray(i)?i:[]}catch{return[]}}function ro(i){try{const t=[i,..._s().filter(e=>e!==i)].slice(0,no);localStorage.setItem($i,JSON.stringify(t))}catch{}}async function lo(){try{const i=await fetch(Ps(),{headers:{accept:"application/json"}});if(!i.ok)throw new Error(`HTTP ${i.status}`);const t=await i.json();if(!Array.isArray(t.items))throw new Error("bad payload");const e=new Set(Ne().map(a=>a.id)),s=new Set(_s());return{items:t.items.filter(a=>!s.has(a.id)).map(a=>({...a,mine:e.has(a.id)})),offline:!1}}catch{const i=new Set(_s());return{items:Ne().filter(t=>t.url&&!i.has(t.id)).map(t=>({...t,mine:!0})),offline:!0}}}async function co({name:i,dataUrl:t}){const e=ji(i);if(t.length>Ni)throw new Error("too-big");try{const s=await fetch(Ps(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:e,image:t})});if(!s.ok)throw new Error(`HTTP ${s.status}`);const a=await s.json();if(!a.item)throw new Error("bad payload");return Gs([{id:a.item.id,at:a.item.at,name:e},...Ne()]),{item:a.item,offline:!1}}catch(s){if(s.message==="too-big")throw s;const a={id:`local-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,url:t,name:e,at:Date.now()};return Gs([a,...Ne()]),{item:a,offline:!0}}}async function ho(i){ro(i);try{return(await fetch(`${Ps()}?action=report`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:i})})).ok}catch{return!1}}function te(i){return String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Vs(i){const t=Math.max(0,(Date.now()-Number(i))/1e3);return t<90?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<2592e3?`${Math.round(t/86400)}d ago`:`${Math.round(t/2592e3)}mo ago`}class po{constructor(){this.onDraw=null,this.onClose=null,this._items=[],this._loaded=!1,this._offline=!1,this._newId=null,this._lastFocus=null,this._pending=new Map,this._build()}_build(){const t=document.createElement("div");t.id="gallery-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","dg-title"),t.innerHTML=`
      <div class="overlay-inner dg-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="dg-title">
            ${A("telescope",18)} The Doodle Wall
          </span>
          <button class="overlay-x" id="dg-close" type="button" aria-label="Close the wall">✕</button>
        </div>
        <p class="overlay-sub">
          Scribbles left by whoever wandered past the telescope.
          <span class="dg-offline" id="dg-offline" hidden>offline here, only you can see these</span>
        </p>

        <div class="dg-body">
          <div class="dg-wall" id="dg-wall" aria-live="polite">
            <div class="dg-state" id="dg-state">loading the wall...</div>
            <div class="dg-grid" id="dg-grid"></div>
          </div>

          <aside class="dg-cta">
            <div class="dg-cta-art" aria-hidden="true">
              <span class="dg-cta-paper"></span>
              ${A("pencil",30)}
            </div>
            <h3 class="dg-cta-title">Draw your one</h3>
            <p class="dg-cta-sub">Blank paper, a few pens, no rules. Takes a minute.</p>
            <button class="dg-cta-btn" id="dg-draw" type="button">Grab a pen</button>
            <p class="dg-cta-foot">sign it, or stay a ghost</p>
          </aside>
        </div>
      </div>

      <div class="dg-light" id="dg-light" hidden>
        <button class="dg-light-x" id="dg-light-x" type="button" aria-label="Close preview">✕</button>
        <figure class="dg-light-fig">
          <img id="dg-light-img" alt="">
          <figcaption id="dg-light-cap"></figcaption>
        </figure>
      </div>
    `,document.body.appendChild(t),this._el=t,this._grid=t.querySelector("#dg-grid"),this._state=t.querySelector("#dg-state"),this._light=t.querySelector("#dg-light"),this._lightImg=t.querySelector("#dg-light-img"),this._lightCap=t.querySelector("#dg-light-cap"),t.querySelector("#dg-close").addEventListener("click",()=>this.close()),t.querySelector("#dg-draw").addEventListener("click",()=>{var e;return(e=this.onDraw)==null?void 0:e.call(this)}),t.addEventListener("click",e=>{e.target===t&&this.close()}),t.querySelector("#dg-light-x").addEventListener("click",()=>this._closeLight()),this._light.addEventListener("click",e=>{e.target===this._light&&this._closeLight()}),this._grid.addEventListener("click",e=>this._onGridClick(e))}_render(){if(!this._loaded){this._state.textContent="loading the wall...",this._state.hidden=!1,this._grid.replaceChildren();return}if(!this._items.length){this._state.innerHTML="<strong>nothing here yet.</strong><br>be the first one on the wall.",this._state.hidden=!1,this._grid.replaceChildren();return}this._state.hidden=!0,this._grid.innerHTML=this._items.map(t=>{const e=t.name?te(t.name):"anonymous";return`
        <figure class="dg-card${t.id===this._newId?" is-new":""}" data-id="${te(t.id)}">
          <button class="dg-card-open" type="button" data-open="${te(t.id)}"
                  aria-label="Open ${e}'s drawing">
            <img src="${te(t.url)}" alt="Drawing by ${e}" loading="lazy" decoding="async">
          </button>
          <figcaption class="dg-card-meta">
            <span class="dg-card-who${t.name?"":" is-anon"}">${e}</span>
            <span class="dg-card-when">${Vs(t.at)}</span>
          </figcaption>
          <button class="dg-flag" type="button" data-flag="${te(t.id)}"
                  title="Report this" aria-label="Report this drawing">${A("flag",13)}</button>
        </figure>
      `}).join("")}_onGridClick(t){const e=t.target.closest("[data-flag]");if(e){t.stopPropagation(),this._handleFlag(e);return}const s=t.target.closest("[data-open]");s&&this._openLight(s.dataset.open)}async _handleFlag(t){if(t.dataset.armed!=="1"){t.dataset.armed="1",t.classList.add("is-armed"),t.textContent="sure?",setTimeout(()=>{t.dataset.armed==="1"&&(t.dataset.armed="0",t.classList.remove("is-armed"),t.innerHTML=A("flag",13))},3200);return}const e=t.dataset.flag;t.disabled=!0,t.textContent="sent",await ho(e);const s=t.closest(".dg-card");s&&(s.classList.add("is-gone"),setTimeout(()=>{this._pending.delete(e),this._items=this._items.filter(a=>a.id!==e),this._render()},260))}_openLight(t){const e=this._items.find(a=>a.id===t);if(!e)return;const s=e.name?e.name:"anonymous";this._lightImg.src=e.url,this._lightImg.alt=`Drawing by ${s}`,this._lightCap.textContent=`${s}  ·  ${Vs(e.at)}`,this._light.hidden=!1,queueMicrotask(()=>{var a;return(a=this._el.querySelector("#dg-light-x"))==null?void 0:a.focus()})}_closeLight(){this._light.hidden=!0,this._lightImg.removeAttribute("src")}_isLightOpen(){return!this._light.hidden}async refresh(){const{items:t,offline:e}=await lo();for(const a of t)this._pending.delete(a.id);const s=[...this._pending.values()].filter(a=>!t.some(n=>n.id===a.id));this._items=[...s,...t].sort((a,n)=>n.at-a.at),this._offline=e,this._loaded=!0,this._el.querySelector("#dg-offline").hidden=!e,this._render()}addLocal(t){this._newId=t.id,this._pending.set(t.id,t),this._items=[t,...this._items.filter(e=>e.id!==t.id)],this._loaded=!0,this._render(),this.refresh().catch(()=>{})}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#dg-close"))==null?void 0:t.focus()}),this.refresh().catch(()=>{this._loaded=!0,this._render()})}close(){var t,e;if(this._isLightOpen()){this._closeLight();return}this.isOpen()&&(this._el.classList.remove("is-open"),this._newId=null,(t=this._lastFocus)!=null&&t.focus&&this._lastFocus.focus(),(e=this.onClose)==null||e.call(this))}isOpen(){return this._el.classList.contains("is-open")}}const $t=900,Nt=675,Js="#FFFFFF",Ks=["#1B1B1F","#E53935","#FB923C","#FBBF24","#4CAF50","#0EA5A5","#64B5F6","#7C3AED","#EC4899","#8D6E63"],Ce=[{key:"s",px:4,dot:6},{key:"m",px:9,dot:11},{key:"l",px:20,dot:17}];class uo{constructor(){this.onPosted=null,this.onClose=null,this._strokes=[],this._current=null,this._color=Ks[0],this._size=Ce[1],this._erase=!1,this._sending=!1,this._build()}_build(){const t=document.createElement("div");t.id="draw-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","draw-title");const e=Ks.map((a,n)=>`
      <button class="dr-swatch${n===0?" is-on":""}" type="button"
              data-color="${a}" style="--sw:${a}"
              aria-label="Pen colour ${n+1}" aria-pressed="${n===0}"></button>
    `).join(""),s=Ce.map(a=>`
      <button class="dr-size${a.key==="m"?" is-on":""}" type="button"
              data-size="${a.key}" aria-label="${a.key==="s"?"Thin":a.key==="m"?"Medium":"Thick"} pen"
              aria-pressed="${a.key==="m"}">
        <span class="dr-size-dot" style="width:${a.dot}px;height:${a.dot}px"></span>
      </button>
    `).join("");t.innerHTML=`
      <div class="overlay-inner draw-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="draw-title">
            ${A("pencil",18)} Draw Your One
          </span>
          <button class="overlay-x" id="draw-close" type="button" aria-label="Back to the wall">✕</button>
        </div>
        <p class="overlay-sub">Anything you want. It goes straight up on the wall.</p>

        <div class="dr-stage">
          <div class="dr-rail" role="toolbar" aria-label="Drawing tools">
            <div class="dr-swatches">${e}</div>
            <div class="dr-rail-div" aria-hidden="true"></div>
            <div class="dr-sizes">${s}</div>
            <div class="dr-rail-div" aria-hidden="true"></div>
            <div class="dr-tools">
              <button class="dr-tool" type="button" data-tool="eraser" aria-pressed="false"
                      aria-label="Eraser">${A("eraser",17)}<span>Erase</span></button>
              <button class="dr-tool" type="button" data-tool="undo"
                      aria-label="Undo last stroke">${A("undo",17)}<span>Undo</span></button>
              <button class="dr-tool dr-tool--warn" type="button" data-tool="clear"
                      aria-label="Clear the paper">${A("trash",17)}<span>Clear</span></button>
            </div>
          </div>

          <div class="dr-paper-wrap">
            <canvas class="dr-paper" id="dr-canvas" width="${$t}" height="${Nt}"
                    aria-label="Drawing paper" role="img"></canvas>
            <p class="dr-paper-hint" id="dr-hint">start scribbling</p>
          </div>
        </div>

        <div class="dr-sign">
          <label class="dr-name-field">
            <span class="dr-name-label">Sign it</span>
            <input id="dr-name" class="dr-name" type="text" maxlength="24"
                   placeholder="your name" autocomplete="off" spellcheck="false">
          </label>
          <button class="dr-anon" id="dr-anon" type="button" aria-pressed="false">
            ${A("ghost",15)}<span>post anonymously</span>
          </button>
          <button class="dr-post" id="dr-post" type="button">Put it on the wall</button>
        </div>
        <p class="dr-note" id="dr-note">if you're really that shy, go anonymous.</p>
      </div>
    `,document.body.appendChild(t),this._el=t,this._canvas=t.querySelector("#dr-canvas"),this._ctx=this._canvas.getContext("2d"),this._hint=t.querySelector("#dr-hint"),this._nameEl=t.querySelector("#dr-name"),this._anonEl=t.querySelector("#dr-anon"),this._postEl=t.querySelector("#dr-post"),this._noteEl=t.querySelector("#dr-note"),this._base=document.createElement("canvas"),this._base.width=$t,this._base.height=Nt,this._baseCtx=this._base.getContext("2d"),this._wireTools(),this._wirePointer(),t.querySelector("#draw-close").addEventListener("click",()=>this.close()),t.addEventListener("click",a=>{a.target===t&&this.close()}),this._repaint()}_wireTools(){const t=this._el;t.querySelectorAll(".dr-swatch").forEach(e=>{e.addEventListener("click",()=>{this._color=e.dataset.color,this._setErase(!1),t.querySelectorAll(".dr-swatch").forEach(s=>{const a=s===e;s.classList.toggle("is-on",a),s.setAttribute("aria-pressed",String(a))})})}),t.querySelectorAll(".dr-size").forEach(e=>{e.addEventListener("click",()=>{this._size=Ce.find(s=>s.key===e.dataset.size)||Ce[1],t.querySelectorAll(".dr-size").forEach(s=>{const a=s===e;s.classList.toggle("is-on",a),s.setAttribute("aria-pressed",String(a))})})}),t.querySelector('[data-tool="eraser"]').addEventListener("click",()=>{this._setErase(!this._erase)}),t.querySelector('[data-tool="undo"]').addEventListener("click",()=>this._undo()),t.querySelector('[data-tool="clear"]').addEventListener("click",()=>this._clear()),this._anonEl.addEventListener("click",()=>this._setAnon(this._anonEl.getAttribute("aria-pressed")!=="true")),this._postEl.addEventListener("click",()=>this._post()),this._nameEl.addEventListener("input",()=>{this._nameEl.value&&this._setAnon(!1)}),this._onKey=e=>{this.isOpen()&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&(e.preventDefault(),this._undo())},document.addEventListener("keydown",this._onKey)}_setErase(t){this._erase=t;const e=this._el.querySelector('[data-tool="eraser"]');e.classList.toggle("is-on",t),e.setAttribute("aria-pressed",String(t)),this._canvas.classList.toggle("is-erasing",t)}_setAnon(t){this._anonEl.classList.toggle("is-on",t),this._anonEl.setAttribute("aria-pressed",String(t)),this._nameEl.disabled=t,t&&(this._nameEl.value=""),this._nameEl.placeholder=t?"anonymous":"your name"}_wirePointer(){const t=this._canvas,e=a=>{const n=t.getBoundingClientRect();return{x:(a.clientX-n.left)*($t/n.width),y:(a.clientY-n.top)*(Nt/n.height)}};t.addEventListener("pointerdown",a=>{a.button!=null&&a.button!==0||(a.preventDefault(),t.setPointerCapture(a.pointerId),this._current={color:this._erase?Js:this._color,size:this._erase?this._size.px*2.4:this._size.px,points:[e(a)]},this._hint.classList.add("is-gone"),this._drawLive())}),t.addEventListener("pointermove",a=>{if(!this._current)return;a.preventDefault();const n=e(a),o=this._current.points[this._current.points.length-1];Math.abs(n.x-o.x)<.7&&Math.abs(n.y-o.y)<.7||(this._current.points.push(n),this._drawLive())});const s=a=>{var n;this._current&&((a==null?void 0:a.pointerId)!=null&&((n=t.hasPointerCapture)!=null&&n.call(t,a.pointerId))&&t.releasePointerCapture(a.pointerId),this._strokes.push(this._current),ns(this._baseCtx,this._current),this._current=null,this._repaint())};t.addEventListener("pointerup",s),t.addEventListener("pointercancel",s),t.addEventListener("pointerleave",s),t.addEventListener("touchstart",a=>a.preventDefault(),{passive:!1}),t.addEventListener("touchmove",a=>a.preventDefault(),{passive:!1})}_drawLive(){const t=this._ctx;t.clearRect(0,0,$t,Nt),t.drawImage(this._base,0,0),this._current&&ns(t,this._current)}_repaint(){const t=this._baseCtx;t.fillStyle=Js,t.fillRect(0,0,$t,Nt);for(const e of this._strokes)ns(t,e);this._ctx.clearRect(0,0,$t,Nt),this._ctx.drawImage(this._base,0,0),this._hint.classList.toggle("is-gone",this._strokes.length>0)}_undo(){this._strokes.length&&(this._strokes.pop(),this._repaint())}_clear(){this._strokes.length&&(this._strokes=[],this._repaint())}_note(t,e=""){this._noteEl.textContent=t,this._noteEl.className=`dr-note${e?` dr-note--${e}`:""}`}async _post(){var s;if(this._sending)return;if(!this._strokes.length){this._note("the paper is still blank!","warn");return}const t=this._anonEl.getAttribute("aria-pressed")==="true",e=t?"":ji(this._nameEl.value);if(!t&&!e){this._note("put a name on it, or go anonymous.","warn");return}this._sending=!0,this._postEl.disabled=!0,this._postEl.textContent="sending",this._note("hanging it up...");try{const a=this._canvas.toDataURL("image/png");if(a.length>Ni)throw new Error("too-big");const{item:n,offline:o}=await co({name:e,dataUrl:a});this._strokes=[],this._repaint(),this._nameEl.value="",this._setAnon(!1),(s=this.onPosted)==null||s.call(this,n,o),this.close()}catch(a){this._note((a==null?void 0:a.message)==="too-big"?"that drawing is a bit too heavy. try a simpler one.":"could not hang it up. try again in a sec.","warn")}finally{this._sending=!1,this._postEl.disabled=!1,this._postEl.textContent="Put it on the wall"}}open(){this._note("if you're really that shy, go anonymous."),this._el.classList.add("is-open"),this._repaint(),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#draw-close"))==null?void 0:t.focus()})}close(){var t;this.isOpen()&&(this._el.classList.remove("is-open"),(t=this.onClose)==null||t.call(this))}isOpen(){return this._el.classList.contains("is-open")}hasArt(){return this._strokes.length>0}}function ns(i,t){const e=t.points;if(i.save(),i.strokeStyle=t.color,i.fillStyle=t.color,i.lineWidth=t.size,i.lineCap="round",i.lineJoin="round",e.length<2){i.beginPath(),i.arc(e[0].x,e[0].y,t.size/2,0,Math.PI*2),i.fill(),i.restore();return}i.beginPath(),i.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length-1;a++){const n=(e[a].x+e[a+1].x)/2,o=(e[a].y+e[a+1].y)/2;i.quadraticCurveTo(e[a].x,e[a].y,n,o)}const s=e[e.length-1];i.lineTo(s.x,s.y),i.stroke(),i.restore()}const mo=new g(0,1,0);let ee=null;function fo(){if(ee)return ee;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,0.95)"),e.addColorStop(.22,"rgba(255,255,255,0.42)"),e.addColorStop(.55,"rgba(255,255,255,0.12)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),ee=new xi(i),ee.colorSpace=ki,ee}class _o{constructor({color:t=16498468,size:e=1.25,lift:s=1.35}={}){this._color=new K(t),this._size=e,this._lift=s,this.group=new I,this.anchor=new Ca,this.group.visible=!1;const a=new Ei(.4,.8,4);a.rotateX(Math.PI),a.rotateY(Math.PI*.25),this._mat=new et({color:this._color,emissive:this._color,emissiveIntensity:.9,roughness:.35,metalness:0,flatShading:!0}),this._arrow=new M(a,this._mat),this._arrow.position.y=.42,this.group.add(this._arrow),this._halo=new ps(new us({map:fo(),color:this._color,transparent:!0,opacity:.5,blending:ht,depthWrite:!1})),this._halo.scale.setScalar(3),this._halo.position.y=.42,this.group.add(this._halo),this._baseY=0,this._scale=1,this._near=0,this._found=0,this._discovered=!1,this._t=0,this._v=new g}attachTo(t,e){e.updateMatrixWorld(!0);const s=new bt().setFromObject(t);if(s.isEmpty())return 0;const a=s.getCenter(new g),n=s.getSize(new g),o=Math.max(n.x,n.y,n.z)*.5,r=e.worldToLocal(a.clone()),l=r.clone().normalize();return this.anchor.position.copy(r),e.add(this.anchor),this._scale=Kt.clamp(this._size*(.75+o*.35),.9,2.6),this._baseY=o+this._lift+this._scale*.5,this.group.position.copy(r),this.group.quaternion.setFromUnitVectors(mo,l),this.group.scale.setScalar(this._scale),this.group.visible=!0,e.add(this.group),this._offset=new g(0,this._baseY/this._scale,0),this._arrow.position.y=this._offset.y,this._halo.position.y=this._offset.y,o}distanceTo(t){return this.anchor.parent?(this.anchor.getWorldPosition(this._v),this._v.distanceTo(t)):1/0}setDiscovered(t=!0){this._discovered=t}update(t,e,s=!1){if(!this.group.visible)return;this._t+=t;const a=1-Math.exp(-6*t);this._near+=((e?1:0)-this._near)*a,this._found+=((this._discovered?1:0)-this._found)*(1-Math.exp(-2.5*t));const n=s?.25:1,o=1-this._found*.3,r=Math.sin(this._t*2.1)*.22*n,l=this._near*.16,d=this._offset.y+(r+l)*o;this._arrow.position.y=d,this._halo.position.y=d,this._arrow.rotation.y=s?Math.PI*.25:this._t*.85,this._arrow.scale.setScalar(o);const h=.5+.5*Math.sin(this._t*3);this._mat.emissiveIntensity=(.7+this._near*.9+h*.35)*o,this._halo.material.opacity=(.3+this._near*.45+h*.14)*o,this._halo.scale.setScalar((2.8+this._near*1+h*.3)*o)}dispose(){this.group.removeFromParent(),this.anchor.removeFromParent(),this._arrow.geometry.dispose(),this._mat.dispose(),this._halo.material.dispose()}}const lt={criticalCode:.08,download:.5,sceneBuilt:.1,shadersCompiled:.1,firstMeaningfulFrame:.08,playWarmed:.08,interactionShell:.06},os={Booting:"Starting up",LoadingAssets:"Loading the world",Unpacking:"Unpacking the world",BuildingScene:"Building the world",Compiling:"Preparing the world",FirstFrame:"Lighting the stage",WarmingPlay:"Settling into orbit",Ready:"Ready",Revealing:"Welcome in",Live:"Live",Fatal:"Something went wrong",Degraded:"Recovering graphics"},go=45e3,yo=280;class vo{constructor(t={}){this.onProgress=t.onProgress||null,this.onReady=t.onReady||null,this.onFatal=t.onFatal||null,this.onStateChange=t.onStateChange||null,this.reducedMotion=!!t.reducedMotion,this.state="Booting",this.fatalMessage="",this.readyAt=0,this._downloadFrac=0,this._flags={criticalCode:!1,criticalAssets:!1,sceneBuilt:!1,shadersCompiled:!1,firstMeaningfulFrame:!1,playWarmed:!1,cameraPosed:!1,interactionShell:!1},this._displayProgress=0,this._targetProgress=0,this._stallTimer=null,this._readyFired=!1,this._revealStarted=!1,this._awaitingParse=!1,this._armStallWatch(),this._setState("Booting")}setReducedMotion(t){this.reducedMotion=!!t}markCriticalCode(){this._flags.criticalCode=!0,this._flags.interactionShell=!0,this._flags.cameraPosed=!0,V("critical_code"),this._setState("LoadingAssets"),this._recompute()}setDownloadProgress(t,e){e>0&&(this._downloadFrac=Math.min(1,t/e),this._downloadFrac>=1&&!this._flags.criticalAssets&&(this._awaitingParse=!0,this._setState("Unpacking"))),this._recompute(),this._armStallWatch()}nudgeDownloadFallback(t){const e=1-Math.exp(-t*.12);this._downloadFrac=Math.max(this._downloadFrac,Math.min(.85,e)),this._recompute()}markWorldLoaded(){this._flags.criticalAssets=!0,this._downloadFrac=1,this._awaitingParse=!1,V("world_loaded"),ct("world_download","critical_code","world_loaded"),this._setState("BuildingScene"),this._recompute(),this._armStallWatch()}markSceneBuilt(){this._flags.sceneBuilt=!0,V("scene_built"),ct("scene_build","world_loaded","scene_built"),this._setState("Compiling"),this._recompute()}markShadersCompiled(){this._flags.shadersCompiled=!0,V("shaders_compiled"),ct("compile","scene_built","shaders_compiled"),this._setState("FirstFrame"),this._recompute()}markFirstMeaningfulFrame(){this._flags.firstMeaningfulFrame||(this._flags.firstMeaningfulFrame=!0,V("first_meaningful_frame"),ct("first_frame","shaders_compiled","first_meaningful_frame"),this._recompute(),this._maybeReady())}beginWarmingPlay(){this._flags.playWarmed||(this._setState("WarmingPlay"),this._recompute(),this.flush())}markPlayWarmed(){this._flags.playWarmed||(this._flags.playWarmed=!0,V("play_warmed"),ct("play_warm","first_meaningful_frame","play_warmed"),this._recompute(),this._maybeReady())}markCameraPosed(){this._flags.cameraPosed=!0,this._recompute(),this._maybeReady()}markInteractionShell(){this._flags.interactionShell=!0,this._recompute(),this._maybeReady()}get hasFirstFrame(){return this._flags.firstMeaningfulFrame}get hasPlayWarmed(){return this._flags.playWarmed}fail(t){var e;this.fatalMessage=t||"Load failed",this._setState("Fatal"),this._clearStallWatch(),(e=this.onFatal)==null||e.call(this,this.fatalMessage),this._emitProgress()}markContextLost(){this.state!=="Fatal"&&this._setState("Degraded")}markContextRestored(){this.state==="Degraded"&&this._setState("Live")}beginReveal(){this.state!=="Ready"&&this.state!=="Revealing"||(this._revealStarted=!0,this._setState("Revealing"))}markLive(){this._setState("Live"),this._clearStallWatch(),V("live"),ct("ready_to_live","ready","live")}get isReady(){return this._allReadyFlags()}get isFatal(){return this.state==="Fatal"}get isLive(){return this.state==="Live"}tick(t){if(this._awaitingParse&&!this._flags.criticalAssets){const s=(lt.criticalCode+lt.download+lt.sceneBuilt*.45)*100;this._targetProgress=Math.max(this._targetProgress,Math.min(s,this._displayProgress+t*14))}const e=1-Math.exp(-(this.reducedMotion?18:8)*t);this._displayProgress+=(this._targetProgress-this._displayProgress)*e,this._allReadyFlags()?(this._displayProgress=Math.max(this._displayProgress,100),this._targetProgress=100):this._displayProgress=Math.min(this._displayProgress,99.2),this._emitProgress()}flush(){this._displayProgress=this._targetProgress,this._emitProgress()}get displayProgress(){return this._displayProgress}get label(){return this.state==="Fatal"?this.fatalMessage||os.Fatal:this.state==="Compiling"||this.state==="FirstFrame"||this.state==="BuildingScene"||this.state==="WarmingPlay"||this.state==="Unpacking"?os[this.state]:this.state==="LoadingAssets"&&this._downloadFrac>=.98?"Preparing the world":os[this.state]||"Loading"}get minDwellMs(){return this.reducedMotion?0:yo}_allReadyFlags(){const t=this._flags;return t.criticalCode&&t.criticalAssets&&t.sceneBuilt&&t.shadersCompiled&&t.firstMeaningfulFrame&&t.playWarmed&&t.cameraPosed&&t.interactionShell}_maybeReady(){var t;this._readyFired||!this._allReadyFlags()||this.state==="Fatal"||(this._readyFired=!0,this._targetProgress=100,this._displayProgress=100,this.readyAt=performance.now(),V("ready"),ct("time_to_ready","module_eval","ready"),this._setState("Ready"),this._clearStallWatch(),this._emitProgress(),(t=this.onReady)==null||t.call(this))}_recompute(){const t=this._flags;let e=0;t.criticalCode&&(e+=lt.criticalCode),e+=lt.download*this._downloadFrac,t.sceneBuilt&&(e+=lt.sceneBuilt),t.shadersCompiled&&(e+=lt.shadersCompiled),t.firstMeaningfulFrame&&(e+=lt.firstMeaningfulFrame),t.playWarmed&&(e+=lt.playWarmed),t.interactionShell&&(e+=lt.interactionShell);let s=e*100;this._allReadyFlags()?s=100:s=Math.min(s,99),this._targetProgress=s,s>this._displayProgress&&(this._displayProgress+=(s-this._displayProgress)*.35),this._emitProgress()}_emitProgress(){var e;const t=this._allReadyFlags()?100:Math.min(99,Math.floor(this._displayProgress));(e=this.onProgress)==null||e.call(this,t,this.label,this.state)}_setState(t){var e;this.state!==t&&(this.state=t,(e=this.onStateChange)==null||e.call(this,t))}_armStallWatch(){this._clearStallWatch(),this._stallTimer=setTimeout(()=>{this._readyFired||this.state==="Fatal"||this.state==="Live"||this.state==="Revealing"||this.fail("Still loading — check your connection, then retry.")},go)}_clearStallWatch(){this._stallTimer&&(clearTimeout(this._stallTimer),this._stallTimer=null)}dispose(){this._clearStallWatch()}}function wo(){var o,r;const i=navigator.deviceMemory,t=navigator.hardwareConcurrency||4,e=window.devicePixelRatio||1,s="ontouchstart"in window||navigator.maxTouchPoints>0,a=((o=navigator.connection)==null?void 0:o.saveData)===!0,n=/2g|slow-2g/i.test(((r=navigator.connection)==null?void 0:r.effectiveType)||"");return a||n||i!=null&&i<=4||s&&(i==null||i<=6)&&t<=4?"low":e>=2.5&&s?"mid":t>=8&&(i==null||i>=8)?"high":"mid"}function Ui(i,t={}){const e=t.tier||wo(),s=window.devicePixelRatio||1;let a;return i==="low"?a=se({dpr:1,antialias:!1,shadows:!1,shadowMapSize:512,shadowType:"basic",skyTier:"minimal",particleScale:.35,adaptiveDpr:!1,glassBlur:0}):i==="high"?a=se({dpr:Math.min(s,2),antialias:!0,shadows:!0,shadowMapSize:2048,shadowType:"soft",skyTier:"full",particleScale:1,adaptiveDpr:!1,glassBlur:14}):e==="low"?a=se({dpr:1,antialias:!1,shadows:!1,shadowMapSize:512,shadowType:"basic",skyTier:"minimal",particleScale:.4,adaptiveDpr:!0,glassBlur:0}):e==="high"?a=se({dpr:Math.min(s,1.75),antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"soft",skyTier:"full",particleScale:1,adaptiveDpr:!0,glassBlur:14}):a=se({dpr:Math.min(s,1.5),antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"basic",skyTier:"standard",particleScale:.7,adaptiveDpr:!0,glassBlur:8}),a.preset=i,a.tier=e,a}function se(i){return{preset:"auto",tier:"mid",dpr:1,antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"soft",skyTier:"standard",particleScale:1,adaptiveDpr:!1,glassBlur:14,...i}}function zi(i){const t=document.documentElement,e=(i==null?void 0:i.glassBlur)??14;t.style.setProperty("--glass-blur",`${e}px`),t.classList.toggle("glass-solid",e===0)}const bo=18.5,So=1,Mo=45;Vn();we.prototype.computeBoundsTree=Na;we.prototype.disposeBoundsTree=ja;M.prototype.raycast=Ua;const dt=Object.keys(st),De={};for(const i of dt){const t=st[i].lightColor||st[i].color;De[i]=parseInt(t.slice(1),16)}const Je=document.getElementById("canvas");let c=null,B=Ui("auto"),T;try{T=new Aa({canvas:Je,antialias:B.antialias,powerPreference:"high-performance",stencil:!1})}catch(i){throw console.error("WebGL init failed:",i),Hi("WebGL is unavailable in this browser. Try Chrome or Firefox, or enable hardware acceleration."),i}T.setPixelRatio(B.dpr);T.setSize(window.innerWidth,window.innerHeight);T.shadowMap.enabled=B.shadows;T.shadowMap.type=B.shadowType==="soft"?Ai:Pi;T.toneMapping=Pa;T.toneMappingExposure=1;zi(B);function Hi(i){const t=document.getElementById("ldr-label");t&&(t.textContent=String(i).slice(0,160));const e=document.getElementById("ldr-progress");if(e&&!document.getElementById("ldr-retry")){const s=document.createElement("button");s.id="ldr-retry",s.type="button",s.textContent="Reload",s.className="ldr-retry-btn",s.onclick=()=>location.reload(),e.appendChild(s)}}Je.addEventListener("webglcontextlost",i=>{i.preventDefault(),c==null||c.markContextLost()},!1);Je.addEventListener("webglcontextrestored",()=>{c==null||c.markContextRestored(),T.setSize(window.innerWidth,window.innerHeight)},!1);const R=new Fa;R.background=new K(854048);const y=new Mn(window.innerWidth/window.innerHeight);R.add(y.camera);y.setLoadingView();const z=new I;R.add(z);const P=new hn;R.add(P.sceneGroup);const F=new Jn,Gi="ontouchstart"in window||navigator.maxTouchPoints>0,je={},ie=new Set;let me=!1,le=0;const Lo=1.1,Vi=new be,Ji=new be,Eo=new g(0,1,0);function To(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function xo(i){if(!je[i]||me||!mt)return;$==="detail"&&($="near",F.closePanel()),Vi.copy(z.quaternion),Ji.setFromUnitVectors(je[i],Eo),me=!0,le=0;const t=document.getElementById("teleport-flash");t&&!J&&(t.classList.add("active"),setTimeout(()=>t.classList.remove("active"),220))}const It=new Kn(xo),Ue=new Yn,ko=new Xn,gt=new to,ut=new so,Lt=new po,Yt=new uo;Lt.onDraw=()=>Yt.open();Yt.onPosted=i=>Lt.addLocal(i);Yt.onClose=()=>{Lt.isOpen()||Lt.open()};ut.onStartClose=()=>{He=!1,setTimeout(()=>{y._distTarget=ca,pt&&Le?(ge.killTweensOf(w.rotation),ge.to(w.rotation,{y:Math.PI-_t,duration:.4,ease:"power2.inOut",onComplete:Xs})):Xs()},200)};ut.onClose=()=>{$==="detail"&&($="near",E&&F.showPopup(st[E]))};const rs=new Ia,Ys=new As;ut.shouldCloseFromBackdrop=i=>!w||!w.visible?!0:(rs.x=i.clientX/window.innerWidth*2-1,rs.y=-(i.clientY/window.innerHeight)*2+1,Ys.setFromCamera(rs,y.camera),Ys.intersectObject(w,!0).length===0);function Xs(){St&&(St=!1,ot=!1,Vt=0)}let J=gt.reducedMotion,Ki=B.adaptiveDpr,ce=0,We=0,kt=B.dpr;function Co(i){var e,s,a;B=Ui(i),kt=B.dpr,Ki=B.adaptiveDpr,ce=0,We=0,T.setPixelRatio(kt),T.shadowMap.enabled=B.shadows,T.shadowMap.type=B.shadowType==="soft"?Ai:Pi;const t=B.shadowMapSize;(s=(e=P.sunLight)==null?void 0:e.shadow)!=null&&s.mapSize&&(P.sunLight.shadow.mapSize.set(t,t),(a=P.sunLight.shadow.map)==null||a.dispose(),P.sunLight.shadow.map=null),wt.setSkyTier(B.skyTier),Ke.setScale(B.particleScale),zi(B)}gt.onQualityChange=i=>Co(i);gt.onReducedMotionChange=i=>{J=i,document.body.classList.toggle("reduced-motion",i),c==null||c.setReducedMotion(i)};const At=document.getElementById("controls-hint"),Ao=5;let Yi=!0,de=!0;gt.onHintsChange=i=>{Yi=i,At&&(At.setAttribute("aria-hidden",String(!i)),i||(At.classList.add("faded"),de=!1))};const Et=document.createElement("div");Et.id="hud-buttons";Et.classList.add("hud-hidden");Et.innerHTML=`
  <button class="hud-btn" type="button" id="btn-map"      aria-label="Island map (M)" title="Island Map (M)">${A("map",18)}</button>
  <button class="hud-btn" type="button" id="btn-help"     aria-label="How to play"    title="How to Play">${A("help",18)}</button>
  <button class="hud-btn" type="button" id="btn-settings" aria-label="Options"        title="Options">${A("settings",18)}</button>
`;document.body.appendChild(Et);Et.querySelector("#btn-map").addEventListener("click",()=>It.toggle());Et.querySelector("#btn-help").addEventListener("click",()=>Ue.toggle());Et.querySelector("#btn-settings").addEventListener("click",()=>gt.toggle());function Me(){return It.isOpen()||Ue.isOpen()||gt.isOpen()||ut.isOpen()||Lt.isOpen()||Yt.isOpen()}function Po(){return Yt.isOpen()?(Yt.close(),!0):Lt.isOpen()?(Lt.close(),!0):ut.isOpen()?(ut.close(),!0):gt.isOpen()?(gt.close(),!0):Ue.isOpen()?(Ue.close(),!0):It.isOpen()?(It.close(),!0):!1}const Xt=document.createElement("div");Xt.id="hud-left";Xt.classList.add("hud-hidden");const Fo=[["github","GitHub","https://github.com/erriiiccccccc"],["linkedin","LinkedIn","https://www.linkedin.com/in/erriiiccccccc/"],["instagram","Instagram","https://www.instagram.com/ericccc____/"],["mail","Email","mailto:ericng8766@gmail.com"]];Xt.innerHTML=`
  <div class="hud-progress" aria-live="polite" aria-label="Islands discovered">
    <div class="hp-top">
      <span class="hp-ic">${A("globe",14)}</span>
      <span class="hp-count"><b id="ic-count">0</b> <span class="hp-total">/ 6</span></span>
      <span class="hp-label">Islands</span>
    </div>
    <div class="hp-pips" id="hp-pips" aria-hidden="true">${Array.from({length:6},()=>'<span class="hp-pip"></span>').join("")}</div>
  </div>
  <div class="hud-socials">
    ${Fo.map(([i,t,e])=>`<a class="hud-social" href="${e}"${e.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""} aria-label="${t}" title="${t}">${A(i,16)}</a>`).join("")}
  </div>
`;document.body.appendChild(Xt);const Qs=document.getElementById("ic-count"),Io=[...Xt.querySelectorAll(".hp-pip")],Pt=document.createElement("div");Pt.id="discover-toast";Pt.setAttribute("role","status");Pt.setAttribute("aria-live","polite");document.body.appendChild(Pt);let Zs=!1;function Oo(i,t=4500){Pt.innerHTML=i,Pt.classList.add("show"),setTimeout(()=>Pt.classList.remove("show"),t)}const Xi=document.createElement("div");Xi.id="teleport-flash";document.body.appendChild(Xi);const U=Gi?new mn:null;if(U){const i=document.getElementById("touch-controls");i&&i.classList.add("active","hud-hidden")}const Z=25,Ft=new Oa(16777215,0,Z*3,Math.PI/6,.5,2);Ft.position.set(0,Z*1.8,0);Ft.target.position.set(0,Z,0);R.add(Ft);R.add(Ft.target);const Ae=new K,Ro=[new g(55,30,-25),new g(20,45,55),new g(-55,35,20),new g(-25,28,-55),new g(35,50,35),new g(-35,38,-40)],Tt=new g,ls=new K(16765056),gs=[],xt=new g,ae=new g,Bo=new g(0,0,0),Do=new g(0,1,0),ti=new g,cs=new g,ds=new g,ze="./".replace(/\/?$/,"/"),Pe=document.getElementById("loader"),ei=document.getElementById("ldr-pct"),si=document.getElementById("ldr-bar-fill"),ne=document.getElementById("ldr-label");let ii="",ai=0,ni=!1,ys=!1,fe=!1,oi=!1,vs=!1,oe=0;function ri(i,t){const e=Math.min(100,Math.max(0,Math.floor(i)));ei&&(ei.textContent=e+"%"),si&&(si.style.width=e+"%"),t&&ne&&t!==ii&&!(c!=null&&c.isFatal)&&(ii=t,ne.style.opacity="0",setTimeout(()=>{ne&&(ne.textContent=t,ne.style.opacity="1")},160))}c=new vo({reducedMotion:J,onProgress:(i,t)=>ri(i,t),onFatal:i=>{Hi(i),ri(0,i)},onReady:()=>xs()});c.markCriticalCode();window.__PHF_LOAD_OWNED__=!0;const Fs=new Fi;Fs.setMeshoptDecoder(Ra);const Is=new Ba;Is.setTranscoderPath(ze+"basis/");Is.detectSupport(T);Fs.setKTX2Loader(Is);function X(){return new Promise(i=>{requestAnimationFrame(()=>setTimeout(i,0))})}const he=[];function Wo(){if(!he.length)return;const i=()=>{const t=performance.now();for(;he.length&&performance.now()-t<4;){const e=he.pop();if(!(!(e!=null&&e.geometry)||e.geometry.boundsTree))try{e.geometry.computeBoundsTree()}catch{}}he.length&&("requestIdleCallback"in window?requestIdleCallback(i,{timeout:200}):setTimeout(i,0))};"requestIdleCallback"in window?requestIdleCallback(i,{timeout:500}):setTimeout(i,0)}V("world_download_start");(async()=>{var t,e,s,a,n,o,r;const i=ze+"world.glb";try{const l=await fetch(i);if(!l.ok)throw new Error(`HTTP ${l.status}`);const d=Number(l.headers.get("content-length"))||0,h=(t=l.body)==null?void 0:t.getReader();let f;if(h){const u=[];let x=0,C=0;for(;;){const{done:q,value:Rt}=await h.read();if(q)break;u.push(Rt),x+=Rt.byteLength,C+=Rt.byteLength,d>0&&(c==null||c.setDownloadProgress(x,d)),C>512*1024&&(C=0,await X())}d>0?c==null||c.setDownloadProgress(d,d):c==null||c.setDownloadProgress(x,x),(e=c==null?void 0:c.flush)==null||e.call(c),await X();const S=new Uint8Array(x);let j=0;for(const q of u)S.set(q,j),j+=q.byteLength;f=S.buffer}else f=await l.arrayBuffer(),c==null||c.setDownloadProgress(1,1),(s=c==null?void 0:c.flush)==null||s.call(c),await X();const p=(await new Promise((u,x)=>{Fs.parse(f,ze,u,x)})).scene;c==null||c.markWorldLoaded(),(a=c==null?void 0:c.flush)==null||a.call(c),await X();const b=new bt().setFromObject(p),O=new Da;b.getBoundingSphere(O);const N=Z/O.radius;p.scale.setScalar(N);const tt=new bt().setFromObject(p).getCenter(new g);p.position.sub(tt),await X();const Ot=null;let W=0;p.traverse(u=>{if(u.isMesh){const S=(u.name||"").toLowerCase().includes("(terrain)");if(u.castShadow=S,u.receiveShadow=!0,u.material){const j=Array.isArray(u.material)?u.material:[u.material];for(const q of j)q&&q.opacity>=.99&&!q.transparent&&(q.side=Ti)}if(u.geometry&&!u.geometry.boundsTree)if(S)try{u.geometry.computeBoundsTree()}catch{}else he.push(u);S?(u.layers.enable(1),W++):u.layers.enable(2)}Ot&&u.name;const x=u.name;x&&st[x]&&!ci[x]&&(ci[x]=u,nt[x]=[],u.traverse(C=>{C.isMesh&&(C.material=C.material.clone(),C.material.emissive=new K(0),C.material._origColor=C.material.color.clone(),C.material.color.multiplyScalar(.35),C.material._isFloor=!0,nt[x].push(C))}))}),W>0&&(ws.layers.set(1),ta=!0),await X(),p.visible=!1,z.add(p),mt=p,z.updateMatrixWorld(!0);const ft=new bt,yt=new g;for(const u of dt)if(nt[u]&&nt[u].length){ft.makeEmpty();for(const x of nt[u])ft.expandByObject(x);ft.getCenter(yt),z.worldToLocal(yt),yt.lengthSq()>1e-4&&(je[u]=yt.clone().normalize())}await X();{const u={},x=new g;for(const S of dt){if(!((n=nt[S])!=null&&n.length))continue;const j=new bt;for(const q of nt[S])j.expandByObject(q);j.expandByScalar(3),u[S]=j}const C=new Set;for(const S of dt)(nt[S]||[]).forEach(j=>C.add(j));mt.traverse(S=>{var j;if(!(!S.isMesh||C.has(S))){new bt().setFromObject(S).getCenter(x);for(const q of dt)if((j=u[q])!=null&&j.containsPoint(x)){S.material=S.material.clone(),S.material.emissive=new K(0),S.material._origColor=S.material.color.clone(),S.material.color.multiplyScalar(.35),S.material._isFloor=!1,nt[q].push(S),C.add(S);break}}})}for(const u of dt)for(const x of nt[u]||[])ea.set(x,u);await X();{const u=p.getObjectByName($o);if(u){Mt=new _o({color:16498468});const x=Mt.attachTo(u,z);sa=Math.max(2.6,x*2.2)}}if(await X(),ni)return;ni=!0,c==null||c.markSceneBuilt(),(o=c==null?void 0:c.flush)==null||o.call(c),await X();try{T.compile(R,y.camera),c==null||c.markShadersCompiled(),(r=c==null?void 0:c.flush)==null||r.call(c)}catch(u){console.error("Shader compile failed:",u),c==null||c.fail("Could not prepare graphics. Try reloading.");return}await X(),T.render(R,y.camera),ys=!0,Xo(p)}catch(l){console.error("GLB load error:",l),c==null||c.fail("Could not load the world. Check your connection, then retry.")}})();let mt=null;const ws=new As,bs=new As;bs.layers.set(2);const Qi=new g(0,Z*2,0),Zi=new g(0,-1,0);let ta=!1;function qo(i){let t=i;for(;t;){if(st[t.name])return t.name;t=t.parent}return null}function li(){if(!mt)return Z;ws.set(Qi,Zi);const i=ws.intersectObject(mt,!0);return i.length>0?(E=ea.get(i[0].object)??qo(i[0].object),i[0].point.y):(E=null,Z)}const ci={},nt={},ea=new Map;let $="exploring",E=null;const $o="telescope",No="meadow_island";let Mt=null,sa=3.2,qe=!1,Ss=!1,ia=!1,di=null,Fe=0,hi=!0;const aa=new Za;R.add(aa.points);const ye=new dn(y.camera);R.add(ye.group);const na=new xn;R.add(na.group);const wt=new Wn(B.skyTier);R.add(wt.group);const Ke=new jn;Ke.setScale(B.particleScale);z.add(Ke.group);gt.applyRestored();const D=new pn;D.group.position.set(0,Z+.9,0);R.add(D.group);const w=new I;w.position.set(0,Z+.9,0);R.add(w);let pt=!1;const ve=new _n;let Le=!1;new Wa;const jt=ze+"locomotionNEW/",pi=new Fi;pi.load(jt+"ericlowpolyskeleton.glb",i=>{const t=i.scene,e=new bt().setFromObject(t);t.scale.setScalar(2.2/e.getSize(new g).y);const s=new bt().setFromObject(t);t.position.y=-s.min.y,t.traverse(o=>{if(!o.isMesh)return;o.castShadow=!0;const r=o.material;r&&r.isMeshStandardMaterial&&(r.roughness=.62,r.map&&(r.emissiveMap=r.map,r.emissive.setRGB(1,1,1),r.emissiveIntensity=.16,gs.push(r)),r.needsUpdate=!0)}),w.add(t),pt=!0,D.group.visible=!1;const a=o=>new Promise((r,l)=>pi.load(o,r,void 0,l)),n=o=>o.status==="fulfilled"&&o.value.animations[0]||null;Promise.allSettled([a(jt+"walk.glb"),a(jt+"run.glb"),a(jt+"idleagree.glb"),a(jt+"idlecall.glb"),a(jt+"idlegreet.glb")]).then(([o,r,l,d,h])=>{const f=n(o),m=n(r);f||console.warn("[AnimCtrl] walk.glb had no animation"),m||console.warn("[AnimCtrl] run.glb had no animation");const p=[n(l),n(d),n(h)].filter(Boolean);ve.loadGlbClips(t,{idle:null,walk:f,run:m,emotes:p}),Le=!0,t.traverse(b=>{if(!b.isBone&&b.type!=="Bone")return;const O=b.name.toLowerCase();for(const[N,k]of Object.entries(Ho))!Ht[N]&&k.some(tt=>O.includes(tt))&&(Ht[N]=b,da[N]={x:b.rotation.x,y:b.rotation.y})})})},void 0,i=>console.error("ericlowpolyskeleton.glb load error:",i));const oa=new un,ra=5,jo=22;let zt=0,Vt=0,ot=!0,St=!1,la=0,Ms=!1,ca=16,He=!1;const Ht={head:null,neck:null,spine:null,leftEye:null,rightEye:null},da={},Uo=1,zo=1,Ls={head:{x:0,y:0},neck:{x:0,y:0},spine:{x:0,y:0},leftEye:{x:0,y:0},rightEye:{x:0,y:0}};let ha=0,pa=0;document.addEventListener("mousemove",i=>{ha=i.clientX/window.innerWidth*2-1,pa=-(i.clientY/window.innerHeight)*2+1});const Ho={head:["head"],neck:["neck"],spine:["spine1","spine2","spine"],leftEye:["lefteye","eye.l","eye_l","eyel","left_eye"],rightEye:["righteye","eye.r","eye_r","eyer","right_eye"]},Ie={head:{yaw:.35,pitch:.22,lerp:.08,yc:.45,pc:.3},neck:{yaw:.18,pitch:.1,lerp:.06,yc:.25,pc:.18},spine:{yaw:.06,pitch:.03,lerp:.04,yc:.12,pc:.08},eyes:{yaw:.55,pitch:.35,lerp:.14,yc:.35,pc:.25}};function Go(){const{clamp:i,lerp:t}=Kt,e=ha,s=pa,a=[{key:"head",bone:Ht.head,cfg:Ie.head},{key:"neck",bone:Ht.neck,cfg:Ie.neck},{key:"spine",bone:Ht.spine,cfg:Ie.spine}];for(const{key:o,bone:r,cfg:l}of a){if(!r)continue;const d=Ls[o],h=Uo,f=zo;d.y=t(d.y,i(h*e*l.yaw,-l.yc,l.yc),l.lerp),d.x=t(d.x,i(f*s*l.pitch,-l.pc,l.pc),l.lerp);{const m=da[o]||{x:0,y:0};r.rotation.y=m.y+d.y,r.rotation.x=m.x+d.x}}const n=Ie.eyes;for(const o of["leftEye","rightEye"]){const r=Ht[o];if(!r)continue;const l=Ls[o];l.y=t(l.y,i(e*n.yaw,-.35,n.yc),n.lerp),l.x=t(l.x,i(-s*n.pitch,-.25,n.pc),n.lerp),r.rotation.y+=l.y,r.rotation.x+=l.x}}let Ye=!1;document.addEventListener("keydown",i=>{if(i.key!==" "&&i.key!=="Spacebar")return;const t=i.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||Me()||F.isPanelOpen()||(i.preventDefault(),Ye=!0,Es())});document.addEventListener("keyup",i=>{(i.key===" "||i.key==="Spacebar")&&(Ye=!1)});function Es(){!ot||!Le||ve.triggerJump()&&(Vt=ra,ot=!1)}function Os(){if(!($!=="near"||!E)){if($="detail",F.hidePopup(),E==="meadow_island"){Le&&(ve.triggerJump(),Vt=ra*2.5,ot=!1,pt&&(Ms=!0,ge.killTweensOf(w.rotation),ge.to(w.rotation,{y:-y._yaw,duration:.5,ease:"power2.out"}))),ca=y._distTarget,y._distTarget=2.5,setTimeout(()=>{St=!0,la=zt,ot=!0,Ms=!1;for(const i of Object.values(Ls))i.x=0,i.y=0;ut.open(),He=!0},360);return}F.openPanel(st[E],E)}}function Ge(){$==="detail"&&($="near",F.closePanel(),E&&F.showPopup(st[E]))}function ua(){!qe||Me()||F.isPanelOpen()||(ia=!0,Mt==null||Mt.setDiscovered(!0),Ss=!1,F.hideSubPopup(),Lt.open())}F.onPopupTap=Os;F.onSubPopupTap=ua;F.onClosePanel=Ge;document.addEventListener("keydown",i=>{const t=i.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))return;const e=i.key.toLowerCase();if(i.key==="Escape"){if(Po()){i.preventDefault();return}if($==="detail"){Ge(),i.preventDefault();return}}Me()||(e==="e"&&($==="detail"?Ge():Os()),e==="f"&&ua(),e==="m"&&!F.isPanelOpen()&&It.toggle())});window.addEventListener("resize",()=>{T.setSize(window.innerWidth,window.innerHeight),y.resize(window.innerWidth/window.innerHeight)});function Ts(){return Me()||F.isPanelOpen()}let ui=!1;function Vo(){const i=Ts();i!==ui&&(ui=i,oa.setEnabled(!i),y.setInputEnabled(!i),i&&(Ye=!1))}let mi=!1,Ut=-1;const Jo=.82;function Ko(i){return 1+2.6015800000000002*(i-1)**3+1.60158*(i-1)**2}const fi=55;let Jt=!1,_i=!1,_e=0,gi=!1,yi=!1,Oe=null,vi=!1;function xs(){if(oi||c!=null&&c.isFatal||!(c!=null&&c.isReady)||!fe)return;oi=!0;const i=c.minDwellMs,t=()=>{c.beginReveal(),Qo()};i>0?setTimeout(t,i):t()}async function Yo(i){if(!mt||c!=null&&c.isFatal)return;Jt=!0,c==null||c.beginWarmingPlay(),V("play_warm_start");const t=()=>i===_e&&!(c!=null&&c.hasPlayWarmed);if(await X(),!t()){Jt=!1;return}mt.visible=!0;const e=Z+.9,s=.38,a=16,n=Math.cos(s)*a,o=Math.sin(s)*a,r=e+.75;y.camera.position.set(0,r+o,n),y.camera.lookAt(0,r,0),y.camera.updateMatrixWorld(!0),z.updateMatrixWorld(!0);const l=Z+.9;D.group.position.set(0,l,0),w.position.set(0,l,0);const d=J||!!navigator.webdriver;pt?(w.visible=!0,D.group.visible=!1):(w.visible=!1,D.group.visible=!0);const h=new $a(4,4);T.setRenderTarget(h),P.sunLight.intensity=4;try{if(t()&&!d){pt&&Ct<2?(ks(!0),Ct=2):!pt&&Ct<1&&(ks(!1),Ct=1);try{T.compile(R,y.camera)}catch(m){console.warn("Play-view compile warning:",m)}}else t()&&d&&(Ct=pt?2:1);const f=d?1:3;for(let m=0;m<f&&t();m++)T.render(R,y.camera),await X(),t()&&T.setRenderTarget(h)}finally{T.setRenderTarget(null),h.dispose(),P.sunLight.intensity=0,D.group.visible=!1,w.visible=!1,y.setLoadingView()}t()&&(V("play_warm_end"),ct("play_warm_gpu","play_warm_start","play_warm_end")),i===_e&&(Jt=!1)}async function ma(){var s;if(_i||c!=null&&c.isFatal||!fe||!(c!=null&&c.hasFirstFrame))return;if(c!=null&&c.hasPlayWarmed){xs();return}_i=!0;const i=++_e;new URLSearchParams(window.location.search).has("perf")&&console.log("[load] play warm start");const t=J||navigator.webdriver?3e3:2e4,e=new Promise(a=>setTimeout(a,t));try{await Promise.race([Yo(i),e]),c!=null&&c.hasPlayWarmed||(console.warn("[load] play warm deadline — continuing"),_e++,Jt=!1,P.sunLight.intensity=0,T.setRenderTarget(null),y.setLoadingView()),c==null||c.markPlayWarmed(),(s=c==null?void 0:c.flush)==null||s.call(c)}catch(a){console.error("Play warm failed:",a),_e++,Jt=!1,P.sunLight.intensity=0,T.setRenderTarget(null),y.setLoadingView(),c==null||c.markPlayWarmed()}xs()}function Xo(i){const t=ye.flushOut(),e=i.position.x,s=()=>{fe||(fe=!0,new URLSearchParams(window.location.search).has("perf")&&console.log("[load] arrival done → play warm"),requestAnimationFrame(()=>ma()))};if(J){ye.clear(),i.position.x=e,i.rotation.y=0,i.visible=!0,s();return}const a=Math.max(1,window.innerHeight||1),n=Math.max(1,window.innerWidth||1),r=Math.tan(Kt.degToRad(y.camera.fov)/2)*y.camera.position.z*(n/a),l=e+(Number.isFinite(r)?r:40)+30;i.position.x=l,i.rotation.y=-.45,i.visible=!0;const d=Math.max(.01,l-e),h=d*.18,f=Math.min(8,Math.max(.05,(d-h)/fi)),m=Math.min(4,Math.max(.05,2*h/fi)),p=t?.25:0,b=ge.timeline({delay:p,onComplete:s});b.to(i.position,{x:e+h,duration:f,ease:"none"},0).to(i.position,{x:e,duration:m,ease:"power2.out"}),b.to(i.rotation,{y:0,duration:f+m,ease:"sine.out"},0),setTimeout(()=>{fe||(console.warn("[load] arrival failsafe"),i.position.x=e,i.rotation.y=0,s())},Math.ceil((p+f+m+1.25)*1e3))}function Qo(){ye.clear(),vs=!0,c==null||c.markLive(),V("loader_dismiss"),ct("time_to_dismiss","module_eval","loader_dismiss"),Pe&&Pe.classList.add("fade-out"),[Xt,Et,At,document.getElementById("touch-controls")].forEach((e,s)=>{e&&setTimeout(()=>e.classList.remove("hud-hidden"),(J?80:200)+s*120)}),setTimeout(()=>{Pe&&(Pe.style.display="none")},J?400:1400);const t=()=>{Hn()};"requestIdleCallback"in window?requestIdleCallback(t,{timeout:1800}):setTimeout(t,800),$e()&&setTimeout(()=>Gn(),100)}const fa=new qa;let Re=0,Be=0;const Zo=.7,wi=2.4,tr=1.8;let _t=0,re=0;const bi=new g,Si=new be,Mi=new be,hs=new be,er=1.5,sr=5,ir=9;let vt=Z,Ct=0;function ks(i){const t=w.visible,e=D.group.visible;y.camera.updateMatrixWorld(!0),z.updateMatrixWorld(!0),D.group.updateMatrixWorld(!0),w.updateMatrixWorld(!0),i&&pt&&w.children.length>0?(T.compile(w,y.camera,R),w.visible=!0,D.group.visible=!1):(T.compile(D.group,y.camera,R),w.visible=!1,D.group.visible=!0),T.render(R,y.camera),T.render(R,y.camera),w.visible=t,D.group.visible=e}let Cs=document.hidden;document.addEventListener("visibilitychange",()=>{Cs=document.hidden,Cs||fa.getDelta()});function _a(){if(requestAnimationFrame(_a),Cs||c!=null&&c.isFatal)return;const i=Math.min(fa.getDelta(),.05);if(Re+=i,Vo(),!vs){if(ai+=i,c==null||c.nudgeDownloadFallback(ai),c==null||c.tick(i),Jt)return;D.group.visible=!1,w.visible=!1,ye.update(i,J),T.render(R,y.camera),ys&&mt&&Je.clientWidth>0&&(ys=!1,c==null||c.markFirstMeaningfulFrame(),ma());return}if(oe+=i,c==null||c.tick(i),$e()&&oe<=1.05&&(Oe||(Oe=[]),Oe.push(i*1e3),oe>1&&!vi)){vi=!0;const _=Oe,L=Math.max(..._),G=_.reduce((it,rt)=>it+rt,0)/_.length;console.log(`[perf] first_1s_frames: n=${_.length} avg=${G.toFixed(1)}ms max=${L.toFixed(1)}ms`)}if(Ki&&B.preset==="auto"&&(We+=i*1e3,ce++,ce>=Mo)){const _=We/ce;ce=0,We=0;const L=_>bo?Math.max(So,kt-.15):Math.min(B.dpr,kt+.05);Math.abs(L-kt)>.04&&(kt=L,T.setPixelRatio(kt))}const t=Ts(),e=oa.keys,s=e.has("shift"),a=Zo*(s?tr:1),n=t?0:(U==null?void 0:U.joyX)??0,o=t?0:(U==null?void 0:U.joyY)??0;if(U!=null&&U.takeMap()&&!t&&It.toggle(),U&&!t){const{dx:_,dy:L}=U.popCamDelta();(_||L)&&y.applyTouchDelta(_,L)}U!=null&&U.takeInteract()&&!Me()&&($==="detail"?Ge():Os()),U!=null&&U.takeJump()&&!t&&Es();const r=o<-.15,l=o>.15,d=n<-.15,h=n>.15,f=e.has("w")||e.has("arrowup")||r,m=e.has("s")||e.has("arrowdown")||l,p=e.has("a")||e.has("arrowleft")||d,b=e.has("d")||e.has("arrowright")||h,O=f||m||p||b;O||t?Be=0:Be+=i,At&&Yi&&(O||t?de&&(de=!1,At.classList.add("faded")):Be>Ao&&!de&&(de=!0,At.classList.remove("faded")));let N=!0,k;if(me)le=Math.min(1,le+i/Lo),z.quaternion.slerpQuaternions(Vi,Ji,To(le)),le>=1&&(me=!1),re*=Math.exp(-5*i);else{p&&(_t-=wi*i*(d?Math.min(1,Math.abs(n)*1.35):1)),b&&(_t+=wi*i*(h?Math.min(1,Math.abs(n)*1.35):1));const _=f?a:m?-a:0;if(re+=(_-re)*(1-Math.exp(-5*i)),Math.abs(re)>.001&&(hs.copy(z.quaternion),bi.set(Math.cos(_t),0,Math.sin(_t)),Si.setFromAxisAngle(bi,re*i),z.quaternion.premultiply(Si),ot&&(k=li(),N=!1,k-vt>er&&(z.quaternion.copy(hs),N=!0),ta&&!N))){bs.set(Qi,Zi);const L=bs.intersectObject(mt,!0);L.length>0&&L[0].point.y>k+.25&&(z.quaternion.copy(hs),N=!0)}Be>5&&!J&&!St&&!t&&(Mi.setFromAxisAngle(new g(0,1,0),.003),z.quaternion.premultiply(Mi),N=!0)}!ot&&!St?(Vt-=jo*i,zt+=Vt*i,zt<=0&&(zt=0,Vt=0,ot=!0,Ye&&Es())):St&&(zt=la),N&&(k=li()),!ot||me?vt=k:k>vt?vt=Math.min(k,vt+sr*i):vt=Math.max(k,vt-ir*i);const tt=vt+zt,Ot=Math.PI-_t;if(Le?(ve.emotesEnabled=!St&&!ut.isOpen(),ve.update(i,O,s,!ot),ut.isOpen()&&!Gi&&Go()):D.update(i,O,Re,!ot),$!=="detail"?E?(($!=="near"||F._lastIsland!==E)&&($="near",F._lastIsland=E,F.showPopup(st[E])),ie.has(E)||(ie.add(E),It.markVisited(E),Qs&&(Qs.textContent=String(ie.size)),Io.forEach((_,L)=>_.classList.toggle("hp-pip--on",L<ie.size)),ie.size===dt.length&&!Zs&&(Zs=!0,Oo(`<span class="dt-row">${A("trophy",16)}<span><strong>All 6 islands found!</strong> You've seen everything.</span></span>`,5e3)))):$==="near"&&($="exploring",F._lastIsland=null,F.hidePopup()):(!E||E!==F._lastIsland)&&($="exploring",F._lastIsland=null,F.closePanel(),F.hidePopup()),Mt){qe=E===No&&Mt.distanceTo(w.position)<sa,Mt.update(i,qe,J);const _=qe&&$==="near"&&!Ts();_!==Ss&&(Ss=_,_?F.showSubPopup({iconKey:"telescope",title:"The Doodle Wall",sub:ia?"look again":"someone left drawings here",color:"#FBBF24",keycap:"F"}):F.hideSubPopup())}const W=1-Math.exp(-3.5*i);if(E!==di&&(Fe=.55,di=E),Fe>0&&(Fe-=i),Fe>0||hi){hi=!1;for(let _=0;_<dt.length;_++){const L=dt[_],G=nt[L];if(!G||!G.length)continue;const it=L===E,rt=it&&!st[L].noGlow?.45:0,Xe=it?1:.5;for(let Qe=0;Qe<G.length;Qe++){const Y=G[Qe],Ee=Y.material._origColor;Ee&&(Y.material.color.r+=(Ee.r*Xe-Y.material.color.r)*W,Y.material.color.g+=(Ee.g*Xe-Y.material.color.g)*W,Y.material.color.b+=(Ee.b*Xe-Y.material.color.b)*W),Y.material._isFloor&&(Y.material.emissiveIntensity+=(rt-Y.material.emissiveIntensity)*W,it?Y.material.emissive.setHex(De[L]):Y.material.emissiveIntensity<.002&&Y.material.emissive.set(0,0,0))}}}const ft=E?6:0;Ft.intensity+=(ft-Ft.intensity)*W,E&&(Ae.setHex(De[E]),Ft.color.lerp(Ae,W));const yt=E?5:4;P.sunLight.intensity+=(yt-P.sunLight.intensity)*W;const u=1-Math.exp(-1.2*i);if(E){const _=dt.indexOf(E);_>=0&&(Tt.copy(Ro[_]),P.sunLight.position.lerp(Tt,u)),Ae.setHex(De[E]),ls.set(16765056).lerp(Ae,.18),P.sunLight.color.lerp(ls,W)}else{const _=1-Math.exp(-2.5*i);Tt.set(Math.sin(_t)*55,50,-Math.cos(_t)*55),P.sunLight.position.lerp(Tt,_),P.sunLight.color.lerp(ls.set(16771264),W)}{const _=He,L=_?1.15:.16;for(let G=0;G<gs.length;G++){const it=gs[G];it.emissiveIntensity+=(L-it.emissiveIntensity)*W}y._pivotYExtra+=((_?.7:0)-y._pivotYExtra)*W}if(He){xt.copy(y.camera.position).sub(w.position),xt.y=0,xt.lengthSq()<1e-4&&xt.set(0,0,1),xt.normalize(),y.camera.getWorldDirection(ti),cs.crossVectors(ti,Do).normalize(),ae.set(w.position.x,w.position.y+1.4,w.position.z);const _=8,L=8,G=5.5,it=.7;Tt.copy(ae).addScaledVector(xt,_).addScaledVector(cs,-G),Tt.y=w.position.y+L,P.sunLight.position.lerp(Tt,u),P.sunLight.target.position.lerp(ae,u),P.sunLight.target.updateMatrixWorld(),P.sunLight.intensity+=(it-P.sunLight.intensity)*W;const rt=P.presentationSun2;ds.copy(ae).addScaledVector(xt,_).addScaledVector(cs,G),ds.y=w.position.y+L,rt.position.lerp(ds,u),rt.target.position.copy(ae),rt.target.updateMatrixWorld(),rt.color.copy(P.sunLight.color),rt.intensity+=(it-rt.intensity)*W}else P.sunLight.target.position.lerp(Bo,u),P.sunLight.target.updateMatrixWorld(),P.presentationSun2.intensity+=(0-P.presentationSun2.intensity)*W;const x=$==="detail"||ut.isOpen();T.shadowMap.autoUpdate=!x,aa.update(Re,0),x||(J||na.update(i),wt.update(i,Re,J),Ke.update(i,E,tt,J,je)),y.update(i,Z,tt,-1,null,z,_t,O);const C=vs;let S=1,j=0,q=0;if(C&&!mi&&(Ut=0),mi=C,!C)Ut=-1,D.group.scale.setScalar(1),w.scale.setScalar(1),D.group.visible=!1,w.visible=!1;else{const _=pt;if(D.group.visible=!_,w.visible=!0,Ut>=0){Ut+=i;const L=Math.min(1,Ut/Jo),G=Ko(L);S=Math.max(.04,G),j=(1-L)*(1-L)*2.4,q=Math.sin(L*Math.PI*3.25)*(1-L)*1.05,L>=1&&(Ut=-1,S=1,j=0,q=0)}}St||(w.position.set(0,tt+j,0),w.scale.setScalar(S),D.group.position.set(0,tt+j,0),D.group.scale.setScalar(S),Ms||(w.rotation.y=Ot+q,D.group.rotation.y=Ot+q)),mt&&pt&&Ct<2&&oe>2.5&&(ks(!0),Ct=2);const Rt=J||y._introKBlend>=1||oe>2.2;if(Rt&&!gi){gi=!0,Wo();const _=()=>{var L;return(L=wt==null?void 0:wt.enableDeferred)==null?void 0:L.call(wt,B.skyTier)};"requestIdleCallback"in window?requestIdleCallback(_,{timeout:1500}):setTimeout(_,200)}if(Rt&&!yi){yi=!0;const _=!!localStorage.getItem("phf-intro-seen");ko.open(_)}T.render(R,y.camera)}_a();
