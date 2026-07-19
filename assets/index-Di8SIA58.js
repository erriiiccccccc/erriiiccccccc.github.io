const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./sky-deferred-BAZKR7R6.js","./three-CElhwkys.js"])))=>i.map(i=>d[i]);
import{e as ue,f as $,d as Be,A as _t,P as ai,G as F,h as ce,V as w,a as ot,M as L,B as ze,b as Ni,S as X,c as ae,I as Nt,i as K,j as zi,k as $e,C as $i,T as Hi,l as ye,m as ys,n as He,o as Gi,p as Vi,q as Ji,r as Ki,s as Yi,L as Xi,t as vs,u as ws,F as ni,g as Qi,v as Zi,w as ta,D as oi,x as ea,R as sa,W as ia,y as ri,z as li,E as aa,H as na,J as oa,K as ms,N as ra,O as ci,U as la,X as ca,Y as Tt,Z as da,_ as ha,$ as pa,a0 as me,a1 as ua,a2 as ma,a3 as fa,a4 as _a}from"./three-CElhwkys.js";import{s as z,i as ga,C as ya,E as va,a as wa,P as ba,b as Ma,T as Sa}from"./islands-5-EQO9JV.js";import{i as La,T as Ta}from"./travel-COkmwXpu.js";import{g as de}from"./gsap-C8pce-KX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();class xa{constructor(){const e=new Float32Array(5400),s=new Float32Array(1800),a=new Float32Array(1800),n=new Float32Array(1800),o=new Float32Array(1800*3);for(let l=0;l<1800;l++){const d=160+Math.random()*60,u=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1);e[l*3]=d*Math.sin(f)*Math.cos(u),e[l*3+1]=d*Math.sin(f)*Math.sin(u),e[l*3+2]=d*Math.cos(f),s[l]=Math.random()*Math.PI*2,a[l]=.6+Math.random()*2.8,n[l]=1.2+Math.random()*2.8;const m=Math.random();m<.15?(o[l*3]=.75,o[l*3+1]=.88,o[l*3+2]=1):m<.27?(o[l*3]=1,o[l*3+1]=.93,o[l*3+2]=.65):(o[l*3]=1,o[l*3+1]=1,o[l*3+2]=1)}const r=new ue;r.setAttribute("position",new $(e,3)),r.setAttribute("phase",new $(s,1)),r.setAttribute("speed",new $(a,1)),r.setAttribute("baseSize",new $(n,1)),r.setAttribute("color",new $(o,3)),this._mat=new Be({uniforms:{time:{value:0}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:_t}),this.points=new ai(r,this._mat)}update(t){this._mat.uniforms.time.value=t}}const Ea=2,bs=[7234136,8022620,6051408,8613983],ka=[[14706748,11026462],[14262366,11565120],[8365768,5140110],[12567756,8159884]],di=i=>i[Math.random()*i.length|0];function Ca(i,t,e,s=.24){const a=i.attributes.position,n=new Float32Array(a.count*3),o=new K(t),r=new K(e),l=new K;for(let d=0;d<a.count;d++)l.copy(Math.random()<s?r:o),n[d*3]=l.r,n[d*3+1]=l.g,n[d*3+2]=l.b;i.setAttribute("color",new $(n,3))}function Aa(i){const t=new Nt(i,0),e=t.attributes.position;for(let s=0;s<e.count;s++){const a=.7+Math.random()*.6;e.setXYZ(s,e.getX(s)*a,e.getY(s)*a,e.getZ(s)*a)}return t.computeVertexNormals(),t}function Pa(){const i=new F,t=new ot({color:13225430,flatShading:!0,roughness:.55,metalness:.35,emissive:1711398,emissiveIntensity:.6});i.add(new L(new ze(1.4,1.4,2.2),t));const e=new ot({color:2845951,flatShading:!0,roughness:.4,metalness:.2,emissive:661568,emissiveIntensity:.9});for(const a of[-1,1]){const n=new L(new ze(3.2,.1,1.7),e);n.position.x=a*2.6,i.add(n);const o=new L(new ze(1.2,.12,.12),t);o.position.x=a*1.2,i.add(o)}const s=new L(new Ni(.6,.55,10,1,!0),t);return s.rotation.x=Math.PI/2,s.position.z=1.5,i.add(s),{obj:i,radius:3.6}}function Fa(){const i=new F,t=new ot({color:10134450,flatShading:!0,roughness:.45,metalness:.45,emissive:1316639,emissiveIntensity:.6}),e=new L(new X(2.6,18,12),t);e.scale.set(1,.34,1),i.add(e);const s=new L(new X(1.25,16,12,0,Math.PI*2,0,Math.PI/2),new ot({color:8189392,flatShading:!0,transparent:!0,opacity:.82,emissive:1792586,emissiveIntensity:1}));s.position.y=.45,i.add(s);const a=new ae({color:16765803});for(let n=0;n<6;n++){const o=n/6*Math.PI*2,r=new L(new X(.18,8,8),a);r.position.set(Math.cos(o)*1.85,-.32,Math.sin(o)*1.85),i.add(r)}return{obj:i,radius:2.9}}function Ia(){const i=3.4+Math.random()*3,[t,e]=di(ka),s=new Nt(i,2);return Ca(s,t,e,.22),{obj:new L(s,new ot({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:1575428,emissiveIntensity:.45})),radius:i}}function Oa(){const i=new F,t=4+(Math.random()*3|0);for(let e=0;e<t;e++){const s=.6+Math.random()*1.3,a=new L(Aa(s),new ot({color:bs[e%bs.length],flatShading:!0,roughness:1,metalness:0,emissive:657934,emissiveIntensity:.5}));a.position.set((Math.random()-.5)*7,(Math.random()-.5)*5,(Math.random()-.5)*7),i.add(a)}return{obj:i,radius:5.5}}const Ra=[Pa,Fa,Ia,Oa];class Ba{constructor(t){this.cam=t,this.group=new F,this._active=[],this._cooldown=0,this._spawning=!0}_visibleHalf(t){const e=this.cam.position.z-t,s=Math.tan(ce.degToRad(this.cam.fov)/2)*e;return{halfH:s,halfW:s*(window.innerWidth/window.innerHeight)}}_spawn(){const{obj:t,radius:e}=di(Ra)(),s=-6+Math.random()*28,{halfW:a,halfH:n}=this._visibleHalf(s),o=(Math.random()-.5)*.7*n;t.position.set(a+e+1,o,s),t.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),this.group.add(t),this._active.push({obj:t,radius:e,baseY:o,vx:-(9+Math.random()*13),spin:new w((Math.random()-.5)*.7,(Math.random()-.5)*.7,(Math.random()-.5)*.7),bobF:.6+Math.random()*1.1,bobA:.3+Math.random()*.9,age:Math.random()*10,deathX:-(a+e+4)})}update(t,e=!1){if(!e){for(let s=this._active.length-1;s>=0;s--){const a=this._active[s];a.age+=t,a.obj.position.x+=a.vx*t,a.obj.position.y=a.baseY+Math.sin(a.age*a.bobF)*a.bobA,a.obj.rotation.x+=a.spin.x*t,a.obj.rotation.y+=a.spin.y*t,a.obj.rotation.z+=a.spin.z*t,a.obj.position.x<a.deathX&&(this._disposeObj(a.obj),this._active.splice(s,1))}this._spawning&&(this._cooldown-=t,this._cooldown<=0&&this._active.length<Ea&&(this._spawn(),this._cooldown=.45+Math.random()*1.2))}}flushOut(){this._spawning=!1;for(const t of this._active)t.vx=-Math.max(55,Math.abs(t.vx)*2.6),t.bobA*=.35,t.spin.multiplyScalar(1.5);return this._active.length>0}clear(){var t,e;this._spawning=!1;for(const s of this._active)this._disposeObj(s.obj);this._active.length=0,(e=(t=this.group).clear)==null||e.call(t)}_disposeObj(t){this.group.remove(t),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class Wa{constructor(){this.sceneGroup=new F,this.sunGroup=new F;const t=new zi(15259880,.75);this.sceneGroup.add(t);const e=new $e(16770764,.28);e.position.set(30,40,20),this.sceneGroup.add(e),this.sunLight=new $e(16765056,0),this.sunLight.position.set(50,40,20),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=300,this.sunLight.shadow.camera.left=-50,this.sunLight.shadow.camera.right=50,this.sunLight.shadow.camera.top=50,this.sunLight.shadow.camera.bottom=-50,this.sceneGroup.add(this.sunLight),this.sceneGroup.add(this.sunLight.target),this.presentationSun2=new $e(16765056,0),this.sceneGroup.add(this.presentationSun2),this.sceneGroup.add(this.presentationSun2.target)}}const Ge=i=>new ot({color:i}),it=i=>new ot({color:i,flatShading:!0});class Da{constructor(){this.group=new F,this._stride=0,this._headGroup=new F,this._headGroup.position.y=.82;const t=new L(new X(.22,14,10),Ge(16768437)),e=Ge(1710638),s=new L(new X(.04,7,5),e);s.position.set(-.1,.04,.18);const a=s.clone();a.position.x=.1;const n=Ge(16755336),o=new L(new X(.05,6,4),n);o.position.set(-.15,-.04,.17);const r=o.clone();r.position.x=.15,this._headGroup.add(t,s,a,o,r);const l=new L(new X(.26,10,8),it(16766287));l.position.set(0,.97,.03),l.scale.set(1,.72,.95);const d=new L(new X(.13,7,5),it(16766287));d.position.set(0,1.02,.18),d.scale.set(.9,.7,.7);const u=new L(new $i(.16,.2,.52,7),it(4431943));u.position.y=.3;const f=it(16766720);[-.05,.05,.15].forEach(C=>{const M=new L(new X(.025,5,4),f);M.position.set(0,C+.22,.18),this.group.add(M)});const m=it(16766720),h=new L(new X(.1,6,4),m);h.position.set(-.25,.54,0),h.scale.set(1.1,.45,1);const b=h.clone();b.position.x=.25,this._scarfGroup=new F;const P=new L(new Hi(.155,.048,7,12),it(16776679));P.position.y=.62,P.rotation.x=Math.PI/2;const U=new L(new ye(.046,.3,2,7),it(16776679));U.position.set(-.08,.43,-.13),U.rotation.x=-.3;const E=new L(new ye(.046,.24,2,7),it(16776679));E.position.set(.08,.39,-.15),E.rotation.x=-.36,this._scarfGroup.add(P,U,E),this._armLPivot=new F,this._armLPivot.position.set(-.25,.52,0);const Z=new L(new ye(.068,.26,2,7),it(4431943));Z.position.y=-.18,this._armLPivot.add(Z),this._armRPivot=new F,this._armRPivot.position.set(.25,.52,0),this._armRPivot.add(Z.clone()),this._hips=new F,this._hips.position.y=-.14;const Ft=new ye(.078,.3,2,7),W=it(1713022);this._legLPivot=new F,this._legLPivot.position.x=-.11;const mt=new L(Ft,W);mt.position.y=-.24,this._legLPivot.add(mt),this._legRPivot=new F,this._legRPivot.position.x=.11,this._legRPivot.add(mt.clone());const yt=it(2171169),p=new L(new X(.095,7,5),yt);p.position.set(-.11,-.52,.04),p.scale.set(1,.6,1.25);const k=p.clone();k.position.x=.11,this._hips.add(this._legLPivot,this._legRPivot,p,k),this.group.add(u,h,b,this._scarfGroup,this._headGroup,l,d,this._armLPivot,this._armRPivot,this._hips),this.group.traverse(C=>{C.isMesh&&(C.castShadow=!0)})}update(t,e,s,a=!1){if(a){this._legLPivot.rotation.x=-.7,this._legRPivot.rotation.x=-.7,this._armLPivot.rotation.x=-1,this._armRPivot.rotation.x=-1,this._armLPivot.rotation.z=-.75,this._armRPivot.rotation.z=.75,this._scarfGroup.rotation.x=-.55,this._headGroup.rotation.x=.1,this.group.rotation.z=0,this._hips.position.y=-.14;return}this._armLPivot.rotation.z=0,this._armRPivot.rotation.z=0,this._scarfGroup.rotation.x=0,this._headGroup.rotation.x=0,e&&(this._stride+=t*4.5);const n=Math.sin(this._stride)*(e?.55:.03);this._legLPivot.rotation.x=-n,this._legRPivot.rotation.x=n,this._armLPivot.rotation.x=n*.65,this._armRPivot.rotation.x=-n*.65,this._scarfGroup.rotation.x=e?Math.sin(this._stride*2)*.09:0,this.group.rotation.z=e?0:Math.sin(s*.6)*.025,this._hips.position.y=-.14+Math.abs(Math.sin(this._stride*2))*.03}}class Ua{constructor(){this.keys=new Set,this._enabled=!0,window.addEventListener("keydown",t=>{if(!this._enabled)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||this.keys.add(t.key.toLowerCase())}),window.addEventListener("keyup",t=>{this.keys.delete(t.key.toLowerCase())}),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.keys.clear()})}setEnabled(t){this._enabled=!!t,t||this.keys.clear()}}class qa{constructor(){this._joyX=0,this._joyY=0,this._joyTouchId=null,this._joyOrigin={x:0,y:0},this.JOY_RADIUS=52,this._camTouchId=null,this._camLastX=0,this._camLastY=0,this._pendingCamDx=0,this._pendingCamDy=0,this._pendingJump=!1,this._pendingInteract=!1,this._pendingMap=!1,this._buildUI(),this._bindEvents()}_buildUI(){const t=document.createElement("div");t.id="touch-controls",t.innerHTML=`
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
        <button class="touch-btn touch-btn--map"  id="touch-map-btn"  aria-label="World Map">${z("map",20)}</button>
        <button class="touch-btn touch-btn--jump" id="touch-jump-btn" aria-label="Jump">↑</button>
        <button class="touch-btn touch-btn--e"    id="touch-e-btn"    aria-label="Explore">E</button>
      </div>
    `,document.body.appendChild(t),this._el=t,this._joyHint=t.querySelector("#joy-hint"),this._joyBase=t.querySelector("#joy-base"),this._joyThumb=t.querySelector("#joy-thumb")}_bindEvents(){document.addEventListener("touchstart",e=>{for(const s of e.changedTouches)this._joyTouchId===null&&(e.target.closest("#touch-btns, #touch-buttons")||s.clientX>window.innerWidth*.52||(this._joyTouchId=s.identifier,this._joyOrigin.x=s.clientX,this._joyOrigin.y=s.clientY,this._placeJoystick(s.clientX,s.clientY)))},{passive:!0}),document.addEventListener("touchstart",e=>{for(const s of e.changedTouches)this._camTouchId===null&&s.identifier!==this._joyTouchId&&(e.target.closest("#touch-btns, #touch-buttons")||s.clientX>window.innerWidth*.42&&(this._camTouchId=s.identifier,this._camLastX=s.clientX,this._camLastY=s.clientY))},{passive:!0}),document.addEventListener("touchmove",e=>{for(const s of e.changedTouches)if(s.identifier===this._joyTouchId){const a=s.clientX-this._joyOrigin.x,n=s.clientY-this._joyOrigin.y,o=Math.min(Math.hypot(a,n),this.JOY_RADIUS),r=Math.atan2(n,a);this._joyX=o/this.JOY_RADIUS*Math.cos(r),this._joyY=o/this.JOY_RADIUS*Math.sin(r),this._joyThumb.style.transform=`translate(${Math.cos(r)*o}px, ${Math.sin(r)*o}px)`}else s.identifier===this._camTouchId&&(this._pendingCamDx+=s.clientX-this._camLastX,this._pendingCamDy+=s.clientY-this._camLastY,this._camLastX=s.clientX,this._camLastY=s.clientY)},{passive:!0});const t=e=>{for(const s of e.changedTouches)s.identifier===this._joyTouchId&&(this._joyTouchId=null,this._joyX=0,this._joyY=0,this._joyThumb.style.transform="",this._hideJoystick()),s.identifier===this._camTouchId&&(this._camTouchId=null)};document.addEventListener("touchend",t,{passive:!0}),document.addEventListener("touchcancel",t,{passive:!0}),this._btn("#touch-jump-btn",()=>{this._pendingJump=!0}),this._btn("#touch-e-btn",()=>{this._pendingInteract=!0}),this._btn("#touch-map-btn",()=>{this._pendingMap=!0})}_btn(t,e){const s=this._el.querySelector(t);s&&(s.addEventListener("touchstart",a=>{a.preventDefault(),e()},{passive:!1}),s.addEventListener("click",a=>a.stopPropagation()))}_placeJoystick(t,e){const s=this.JOY_RADIUS+4,a=8,n=Math.max(a+s,Math.min(window.innerWidth*.52-a-s,t))-s,o=Math.max(a+s,Math.min(window.innerHeight-a-s,e))-s,r=(s+4)*2;this._joyBase.style.left=n+"px",this._joyBase.style.top=o+"px",this._joyBase.style.width=r+"px",this._joyBase.style.height=r+"px",this._joyBase.classList.add("active"),this._joyHint.classList.add("joy-hint--hidden")}_hideJoystick(){this._joyBase.classList.remove("active"),this._joyHint.classList.remove("joy-hint--hidden")}get joyX(){return this._joyX}get joyY(){return this._joyY}popCamDelta(){const t=this._pendingCamDx,e=this._pendingCamDy;return this._pendingCamDx=0,this._pendingCamDy=0,{dx:t,dy:e}}takeJump(){return this._pendingJump?(this._pendingJump=!1,!0):!1}takeInteract(){return this._pendingInteract?(this._pendingInteract=!1,!0):!1}takeMap(){return this._pendingMap?(this._pendingMap=!1,!0):!1}}const y={IDLE:"idle",WALK:"walk",RUN:"run",JUMP:"jump",WALK_JUMP:"walkJump",RUN_JUMP:"runJump",EMOTE:"emote"},Ve=new Set([y.JUMP,y.WALK_JUMP,y.RUN_JUMP]),es={IDLE_TO_WALK:.2,WALK_TO_IDLE:.3,WALK_TO_RUN:.2,RUN_TO_WALK:.25,RUN_TO_IDLE:.1,IDLE_TO_RUN:.22,IDLE_TO_JUMP:.12,WALK_TO_WALKJUMP:.1,RUN_TO_RUNJUMP:.08,JUMP_TO_IDLE:.38,JUMP_TO_WALK:.28,JUMP_TO_RUN:.22,WALKJUMP_TO_IDLE:.35,WALKJUMP_TO_WALK:.25,WALKJUMP_TO_RUN:.2,RUNJUMP_TO_IDLE:.32,RUNJUMP_TO_WALK:.25,RUNJUMP_TO_RUN:.18,IDLE_TO_EMOTE:.2,EMOTE_TO_IDLE:.28},Ot=(i,t)=>es[`${i.toUpperCase()}_TO_${t.toUpperCase()}`]??.22,Ms=9,ja=16;class Na{constructor(){this.mixer=null,this.ready=!1,this._state=y.IDLE,this._action=null,this._finishCb=null,this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._emotes=[],this.emotesEnabled=!0,this._anims={idle:null,walk:null,run:null,jump:null,walkJump:null,runJump:null,walkStart:null,runToStop:null,lookAround:null,lookAround2:null,wave:null}}get state(){return this._state}get isAirborne(){return Ve.has(this._state)}get isReady(){return this.ready}async load(t,e,s,{skipAnims:a=!1}={}){if(this.mixer=new ys(t),a){this._state=y.IDLE,this.ready=!0;return}const n=r=>new Promise((l,d)=>e.load(r,l,void 0,d)),o=[["breathingidle.fbx","idle"],["walking.fbx","walk"],["running.fbx","run"],["idlejump.fbx","jump"],["walkingjump.fbx","walkJump"],["runningjump.fbx","runJump"],["walkstart.fbx","walkStart"],["runtostop.fbx","runToStop"],["lookingaround.fbx","lookAround"],["lookingaround2.fbx","lookAround2"],["wave.fbx","wave"]];await Promise.allSettled(o.map(([r,l])=>n(s+r).then(d=>{this._stripRootMotion(d.animations),this._anims[l]=this.mixer.clipAction(d.animations[0])}).catch(d=>console.warn(`[AnimCtrl] ${r} failed:`,d)))),this._anims.idle&&(this._anims.idle.setLoop(He),this._anims.idle.play(),this._action=this._anims.idle),this._state=y.IDLE,this.ready=!0}loadGlbClips(t,e){this.mixer=new ys(t);const s=e.idle||this._makeBindPoseClip(t);this._anims.idle=this.mixer.clipAction(s);for(const a of["walk","run"]){const n=e[a];n&&(this._stripRootMotion([n]),this._anims[a]=this.mixer.clipAction(n))}Array.isArray(e.emotes)&&(this._stripRootMotion(e.emotes),this._emotes=e.emotes.map(a=>this.mixer.clipAction(a))),this._anims.idle.setLoop(He),this._anims.idle.play(),this._action=this._anims.idle,this._state=y.IDLE,this.ready=!0}_makeBindPoseClip(t){const e=[];return t.traverse(s=>{if(!s.isBone)return;const a=s.quaternion,n=s.position;e.push(new Gi(`${s.name}.quaternion`,[0,1],[a.x,a.y,a.z,a.w,a.x,a.y,a.z,a.w])),e.push(new Vi(`${s.name}.position`,[0,1],[n.x,n.y,n.z,n.x,n.y,n.z]))}),new Ji("idleStatic",1,e)}update(t,e,s,a){if(!this.ready||!this.mixer)return;if(this.mixer.update(t),Ve.has(this._state)){a||this._land(e,s);return}if(this._state===y.EMOTE){e&&this._interruptEmote(e,s);return}const n=e&&s?y.RUN:e?y.WALK:y.IDLE;if(n!==this._state){const o=this._state;this._state=n,this._transitionGround(o,n)}this._state===y.IDLE&&this.emotesEnabled?(this._idleTimer+=t,this._idleTimer>=this._emoteDelay&&(this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._playEmote())):this._idleTimer=0}triggerJump(){if(!this.ready||Ve.has(this._state))return!1;const t=this._state===y.EMOTE?y.IDLE:this._state;if(this._clearFinishCb(),t===y.RUN){const e=this._anims.runJump??this._anims.jump;this._crossFadeOnce(e,Ot(y.RUN,y.RUN_JUMP),1.2),this._state=y.RUN_JUMP}else if(t===y.WALK){const e=this._anims.walkJump??this._anims.jump;this._crossFadeOnce(e,Ot(y.WALK,y.WALK_JUMP),1.3),this._state=y.WALK_JUMP}else this._crossFadeOnce(this._anims.jump,Ot(y.IDLE,y.JUMP),1.4),this._state=y.JUMP;return!0}_land(t,e){this._clearFinishCb();const s=t&&e?y.RUN:t?y.WALK:y.IDLE,a=Ot(this._state,s);this._state=s,this._crossFadeLoop(this._anims[s],a)}_transitionGround(t,e){if(this._clearFinishCb(),t===y.RUN&&e===y.IDLE&&this._anims.runToStop){this._playOnceThenLoop(this._anims.runToStop,this._anims.idle,Ot(t,e),.2);return}this._crossFadeLoop(this._anims[e],Ot(t,e))}_playOnceThenLoop(t,e,s,a){const n=t;this._crossFadeOnce(t,s,1),this._finishCb=o=>{o.action===n&&(this._clearFinishCb(),this._action===n&&this._crossFadeLoop(e,a))},this.mixer.addEventListener("finished",this._finishCb)}_playEmote(){const t=this._emotes.filter(Boolean);if(!t.length)return;const e=t[Math.floor(Math.random()*t.length)];this._state=y.EMOTE,this._crossFadeOnce(e,es.IDLE_TO_EMOTE,1),this._finishCb=s=>{s.action===e&&(this._clearFinishCb(),this._state===y.EMOTE&&(this._state=y.IDLE,this._crossFadeLoop(this._anims.idle,es.EMOTE_TO_IDLE)))},this.mixer.addEventListener("finished",this._finishCb)}_interruptEmote(t,e){this._clearFinishCb();const s=t&&e?y.RUN:y.WALK;this._state=s,this._crossFadeLoop(this._anims[s],.22)}_clearFinishCb(){this._finishCb&&(this.mixer.removeEventListener("finished",this._finishCb),this._finishCb=null)}_crossFadeLoop(t,e){if(t){if(t===this._action){t.isRunning()||t.play();return}t.reset(),t.setLoop(He),t.setEffectiveWeight(1),t.play(),this._action&&this._action.crossFadeTo(t,e,!0),this._action=t}}_crossFadeOnce(t,e,s=1){t&&(t.reset(),t.setLoop(Ki,1),t.clampWhenFinished=!0,t.timeScale=s,t.setEffectiveWeight(1),t.play(),this._action&&this._action.crossFadeTo(t,e,!0),this._action=t)}_stripRootMotion(t){for(const e of t)e.tracks=e.tracks.filter(s=>{const a=s.name.toLowerCase();return!(a.endsWith(".position")&&(a.includes("hips")||a.includes("hip")||a.includes("root")))})}_randEmoteDelay(){return Ms+Math.random()*(ja-Ms)}}const ve=16,Gt=.38,Ss=.05,Ls=1.1,za=3.5,$a=12,Ha=22,Ga=.9,Va=.55,Ja=.4;function Ts(i){const t=Math.min(1,Math.max(0,i));return t*t*(3-2*t)}class Ka{constructor(t){this.camera=new Yi(65,t,.1,2e3),this._camPos=new w,this._pivot=new w,this._pivotSmooth=new w;const e=25,s=Math.cos(Gt)*ve*3,a=Math.sin(Gt)*ve*3;this.camera.position.set(0,e+a,s),this._pivotSmooth.set(0,e+.75,0),this._yaw=0,this._pitch=Gt,this._yawTarget=0,this._pitchTarget=Gt,this._dist=ve,this._distTarget=ve,this._pivotYExtra=0,this._inputEnabled=!0,window.addEventListener("wheel",n=>{this._inputEnabled&&(this._distTarget=Math.max(3,Math.min(60,this._distTarget+n.deltaY*.02)))},{passive:!0}),this._rmbDown=!1,this._lastMx=0,this._lastMy=0,this._snapTimer=0,window.addEventListener("mousedown",n=>{n.button!==2||!this._inputEnabled||(this._rmbDown=!0,this._lastMx=n.clientX,this._lastMy=n.clientY,this._snapTimer=0)}),window.addEventListener("mouseup",n=>{n.button===2&&(this._rmbDown=!1)}),window.addEventListener("mousemove",n=>{if(!this._rmbDown||!this._inputEnabled)return;const o=n.clientX-this._lastMx,r=n.clientY-this._lastMy;this._yawTarget-=o*.005,this._pitchTarget=Math.max(Ss,Math.min(Ls,this._pitchTarget+r*.004)),this._lastMx=n.clientX,this._lastMy=n.clientY,this._snapTimer=0}),window.addEventListener("contextmenu",n=>{n.target&&n.target.id==="canvas"&&n.preventDefault()}),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}resize(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}setInputEnabled(t){this._inputEnabled=!!t,t||(this._rmbDown=!1)}applyTouchDelta(t,e){this._inputEnabled&&(this._yawTarget-=t*.005,this._pitchTarget=Math.max(Ss,Math.min(Ls,this._pitchTarget+e*.004)),this._snapTimer=0)}setLoadingView(){this.camera.position.set(0,0,52),this.camera.lookAt(0,0,0),this._pivotSmooth.set(0,0,0),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}update(t,e,s,a,n,o,r=0,l=!1){if(l&&!this._rmbDown){if(this._snapTimer+=t,this._snapTimer>.3){let E=r-this._yawTarget;for(;E>Math.PI;)E-=Math.PI*2;for(;E<-Math.PI;)E+=Math.PI*2;this._yawTarget+=E*(1-Math.exp(-4*t)),this._pitchTarget+=(Gt-this._pitchTarget)*(1-Math.exp(-3*t))}}else if(l||(this._snapTimer=0),!this._rmbDown&&!l){let E=r-this._yawTarget;for(;E>Math.PI;)E-=Math.PI*2;for(;E<-Math.PI;)E+=Math.PI*2;this._yawTarget+=E*(1-Math.exp(-2*t))}this._yaw+=(this._yawTarget-this._yaw)*(1-Math.exp(-14*t)),this._pitch+=(this._pitchTarget-this._pitch)*(1-Math.exp(-14*t)),this._dist+=(this._distTarget-this._dist)*(1-Math.exp(-8*t));const d=s+.75+this._pivotYExtra;this._pivot.set(0,d,0);const u=Math.cos(this._pitch)*this._dist,f=Math.sin(this._pitch)*this._dist;this._camPos.set(this._pivot.x-Math.sin(this._yaw)*u,this._pivot.y+f,this._pivot.z+Math.cos(this._yaw)*u),(this.camera.position.distanceToSquared(this._camPos)<Ha||this._introKBlend>0)&&(this._introKBlend=Math.min(1,this._introKBlend+t/Ga)),this._introElapsed+=t;const h=ce.lerp(Ja,1,Ts(this._introElapsed/Va)),b=ce.lerp(za,$a,Ts(this._introKBlend))*h,P=1-Math.exp(-b*t);this._pivotSmooth.lerp(this._pivot,P);const U=1-Math.exp(-b*t);this.camera.position.lerp(this._camPos,U),this.camera.lookAt(this._pivotSmooth),this.characterRevealReady=this._introKBlend>0}}const Je=155,Vt=28,Ya=22;function Xa(){const i=Math.random()*Math.PI*2,t=.05+Math.random()*.55;return new w(Je*Math.sin(t)*Math.cos(i),Je*Math.cos(t),Je*Math.sin(t)*Math.sin(i))}function Qa(){const i=Math.random()*Math.PI*2;return new w(Math.cos(i),-.12-Math.random()*.25,Math.sin(i)).normalize()}class Za{constructor(){this.group=new F,this._active=[],this._nextSpawn=4+Math.random()*6,this._shaderMat=new Be({vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:_t})}_spawn(){const t=Xa(),e=Qa(),s=.7+Math.random()*.7,a=70+Math.random()*60,n=new Float32Array(Vt*3),o=new Float32Array(Vt);for(let d=0;d<Vt;d++)n[d*3]=t.x,n[d*3+1]=t.y,n[d*3+2]=t.z;const r=new ue;r.setAttribute("position",new $(n,3)),r.setAttribute("alpha",new $(o,1));const l=new Xi(r,this._shaderMat.clone());this.group.add(l),this._active.push({line:l,geo:r,origin:t.clone(),dir:e,progress:0,lifetime:s,speed:a})}update(t){this._nextSpawn-=t,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=5+Math.random()*12);for(let e=this._active.length-1;e>=0;e--){const s=this._active[e];s.progress+=t;const a=s.progress/s.lifetime,n=s.speed*s.progress,o=s.geo.attributes.position.array,r=s.geo.attributes.alpha.array,l=a<.12?a/.12:a>.72?(1-a)/.28:1,d=s.origin.x+s.dir.x*n,u=s.origin.y+s.dir.y*n,f=s.origin.z+s.dir.z*n;for(let m=0;m<Vt;m++){const h=m/(Vt-1),b=h*Ya;o[m*3]=d-s.dir.x*b,o[m*3+1]=u-s.dir.y*b,o[m*3+2]=f-s.dir.z*b,r[m]=Math.pow(1-h,1.6)*l*.95}s.geo.attributes.position.needsUpdate=!0,s.geo.attributes.alpha.needsUpdate=!0,s.progress>=s.lifetime&&(this.group.remove(s.line),s.geo.dispose(),s.line.material.dispose(),this._active.splice(e,1))}}}const tn="modulepreload",en=function(i,t){return new URL(i,t).href},xs={},we=function(t,e,s){let a=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=Promise.allSettled(e.map(d=>{if(d=en(d,s),d in xs)return;xs[d]=!0;const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!s)for(let b=o.length-1;b>=0;b--){const P=o[b];if(P.href===d&&(!u||P.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":tn,u||(h.as="script"),h.crossOrigin="",h.href=d,l&&h.setAttribute("nonce",l),document.head.appendChild(h),u)return new Promise((b,P)=>{h.addEventListener("load",b),h.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return a.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})},sn=new w(-44,48,-166);function Es(i="rgba(255,250,210,1)",t="rgba(255,180,80,0)"){const s=document.createElement("canvas");s.width=s.height=256;const a=s.getContext("2d"),n=a.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);n.addColorStop(0,i),n.addColorStop(.25,i),n.addColorStop(1,t),a.fillStyle=n,a.fillRect(0,0,256,256);const o=new Zi(s);return o.colorSpace=ta,o}class an{constructor(){this.group=new F,this._pos=sn.clone(),this._t=0,this._core=new F,this._core.position.copy(this._pos),this.group.add(this._core),this._glows=[];const t=new vs(new ws({map:Es("rgba(255,248,200,0.95)","rgba(255,170,70,0)"),transparent:!0,depthWrite:!1,blending:_t}));t.scale.setScalar(46);const e=new vs(new ws({map:Es("rgba(255,200,110,0.55)","rgba(255,120,40,0)"),transparent:!0,depthWrite:!1,blending:_t}));e.scale.setScalar(95),this._core.add(e,t),this._glows.push({sprite:t,base:46},{sprite:e,base:95});const s=new L(new Nt(6,2),new ae({color:16776172,flatShading:!0}));this._core.add(s);const a=new L(new X(6.1,24,24),new ae({color:16773312,transparent:!0,opacity:.55,depthWrite:!1,blending:_t,side:ni}));this._core.add(a),this._halos=[this._halo(7.6,16773024,.4),this._halo(10,16763989,.2),this._halo(15,16755251,.09)],this._haloBase=this._halos.map(n=>n.material.opacity),this._halos.forEach(n=>this._core.add(n))}_halo(t,e,s){return new L(new X(t,18,18),new ae({color:e,transparent:!0,opacity:s,depthWrite:!1,blending:_t,side:Qi}))}update(t,e,s=!1){if(s)return;this._t=e;const a=1+Math.sin(e*.6)*.035;this._core.scale.setScalar(a);const n=1+Math.sin(e*.6+.4)*.06;for(const o of this._glows)o.sprite.scale.setScalar(o.base*n);for(let o=0;o<this._halos.length;o++){const r=.85+.15*Math.sin(e*(.5+o*.18)+o);this._halos[o].material.opacity=this._haloBase[o]*r}}}const nn=[[230,200,8141549,3874406,.16],[240,230,16740277,4857429,.12],[225,180,3828735,1318485,.13],[245,260,10181887,2757968,.1],[220,150,16753226,4859152,.08]],on=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,rn=`
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
`;class ln{constructor(){this.group=new F,this._mats=[];for(const[t,e,s,a,n]of nn){const o=new Be({uniforms:{colorA:{value:new K(s)},colorB:{value:new K(a)},opacity:{value:n},time:{value:Math.random()*100}},vertexShader:on,fragmentShader:rn,transparent:!0,depthWrite:!1,blending:_t,side:oi}),r=new L(new ea(e,e),o),l=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1);r.position.set(t*Math.sin(d)*Math.cos(l),t*Math.cos(d)*.7,t*Math.sin(d)*Math.sin(l)),r.lookAt(0,0,0),r.rotation.z=Math.random()*Math.PI*2,r.userData.spin=(Math.random()-.5)*.01,this.group.add(r),this._mats.push(o)}}update(t,e,s=!1){if(!s){for(const a of this._mats)a.uniforms.time.value=e;for(const a of this.group.children)a.rotation.z+=a.userData.spin*t}}}function cn(i,t){const e=i.attributes.position,s=new Float32Array(e.count*3);i.computeBoundingBox();const{min:a,max:n}=i.boundingBox,o=n.y-a.y||1,r=new K;for(let l=0;l<e.count;l++){const d=(e.getY(l)-a.y)/o;let u=t[0][1];for(const[f,m]of t)d>=f&&(u=m);r.set(u),s[l*3]=r.r,s[l*3+1]=r.g,s[l*3+2]=r.b}i.setAttribute("color",new $(s,3))}function ks(i,t,e,s=.25){const a=i.attributes.position,n=new Float32Array(a.count*3),o=new K(t),r=new K(e),l=new K;for(let d=0;d<a.count;d++)l.copy(Math.random()<s?r:o),n[d*3]=l.r,n[d*3+1]=l.g,n[d*3+2]=l.b;i.setAttribute("color",new $(n,3))}class dn{constructor(){this.group=new F,this._bodies=[];{const t=new Nt(16,3);cn(t,[[0,9198140],[.18,13077330],[.36,14725232],[.55,13077330],[.72,14262366],[.88,11565120]]);const e=new L(t,new ot({vertexColors:!0,flatShading:!0,roughness:.9,metalness:0,emissive:2757893,emissiveIntensity:.4})),s=new L(new sa(20,30,48),new ae({color:15255702,transparent:!0,opacity:.35,side:oi,depthWrite:!1,blending:_t}));s.rotation.x=Math.PI/2,this._add({x:-28,y:52,z:199},[e,s],.18,[.4,1,.15])}{const t=new Nt(7,2);ks(t,12567756,8159884,.3);const e=new L(t,new ot({vertexColors:!0,flatShading:!0,roughness:1,metalness:0,emissive:1448482,emissiveIntensity:.6}));this._add({x:136,y:38,z:-85},[e],.12,[.2,1,.3])}{const t=new Nt(11,2);ks(t,14706748,11026462,.22);const e=new L(t,new ot({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:3149829,emissiveIntensity:.45}));this._add({x:-169,y:30,z:6},[e],.22,[.1,1,.5])}}_add(t,e,s,a){const n=new F;n.position.set(t.x,t.y,t.z);for(const r of e)r.castShadow=!1,r.receiveShadow=!1,n.add(r);const o=new w(a[0],a[1],a[2]).normalize();this._bodies.push({pivot:n,ax:o,speed:s}),this.group.add(n)}update(t,e,s=!1){if(!s)for(const a of this._bodies)a.pivot.rotateOnAxis(a.ax,a.speed*t)}}class hn{constructor(t="standard"){this.group=new F,this._skyTier=t,this._deferredEnabled=!1,this.sun=new an,this.nebula=new ln,this.bodies=new dn,this.asteroids=null,this.flyers=null,this.comet=null,this.aurora=null,this._critical=[this.sun,this.nebula,this.bodies];for(const e of this._critical)this.group.add(e.group);this._applyTierVisibility()}setSkyTier(t){this._skyTier=t||"standard",this._applyTierVisibility()}async enableDeferred(t){if(this._deferredEnabled){this.setSkyTier(t);return}if(this._deferredEnabled=!0,this._skyTier=t||this._skyTier,this._skyTier==="minimal"){this._applyTierVisibility();return}const[{Asteroids:e},{Flyers:s},{Comet:a},{Aurora:n}]=await Promise.all([we(()=>import("./sky-deferred-BAZKR7R6.js").then(o=>o.A),__vite__mapDeps([0,1]),import.meta.url),we(()=>import("./sky-deferred-BAZKR7R6.js").then(o=>o.F),__vite__mapDeps([0,1]),import.meta.url),we(()=>import("./sky-deferred-BAZKR7R6.js").then(o=>o.C),__vite__mapDeps([0,1]),import.meta.url),we(()=>import("./sky-deferred-BAZKR7R6.js").then(o=>o.a),__vite__mapDeps([0,1]),import.meta.url)]);this.asteroids=new e,this.flyers=new s,this.comet=new a,this.aurora=new n;for(const o of[this.asteroids,this.flyers,this.comet,this.aurora])o.group.visible=!1,this.group.add(o.group);this._applyTierVisibility(),this._fadeInDeferred()}_fadeInDeferred(){const t=[this.asteroids,this.flyers,this.comet,this.aurora].filter(Boolean);for(const n of t)n.group.visible=!0,n.group.traverse(o=>{if(!o.material)return;const r=Array.isArray(o.material)?o.material:[o.material];for(const l of r)l&&"opacity"in l&&(l._phfBaseOpacity==null&&(l._phfBaseOpacity=l.opacity),l.transparent=!0,l.opacity=0)});const e=performance.now(),s=900,a=()=>{const n=Math.min(1,(performance.now()-e)/s);for(const o of t)o.group.traverse(r=>{if(!r.material)return;const l=Array.isArray(r.material)?r.material:[r.material];for(const d of l)d&&d._phfBaseOpacity!=null&&(d.opacity=d._phfBaseOpacity*n)});n<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}_applyTierVisibility(){const t=this._skyTier;this.sun.group.visible=!0,this.nebula.group.visible=t!=="minimal",this.bodies.group.visible=t!=="minimal";const e=t==="full"||t==="standard";this.asteroids&&(this.asteroids.group.visible=e&&t==="full"),this.flyers&&(this.flyers.group.visible=e),this.comet&&(this.comet.group.visible=e&&t==="full"),this.aurora&&(this.aurora.group.visible=e)}update(t,e,s=!1){var a,n,o,r;for(const l of this._critical)l.update(t,e,s);(a=this.asteroids)!=null&&a.group.visible&&this.asteroids.update(t,e,s),(n=this.flyers)!=null&&n.group.visible&&this.flyers.update(t,e,s),(o=this.comet)!=null&&o.group.visible&&this.comet.update(t,e,s),(r=this.aurora)!=null&&r.group.visible&&this.aurora.update(t,e,s)}}const pn={arctic_island:{count:35,color:[.82,.92,1],pixelSize:2.5,motionType:0,shapeType:0,spread:4,fallTop:5.2,fallBot:.3,driftAmp:.12,windDrift:0,speedMid:.38,speedVar:.12},desert_island:{count:50,color:[.95,.76,.42],pixelSize:1.6,motionType:1,shapeType:0,spread:4,swirlSpd:2,bobAmp:.2,speedMid:1,speedVar:.45},meadow_island:{count:25,color:[.8,1,.45],pixelSize:2.8,motionType:2,shapeType:1,spread:3.5,driftAmp:5,bobAmp:.55,speedMid:.38,speedVar:.14},mountain_island:{count:40,color:[1,.7,.78],pixelSize:3.5,motionType:0,shapeType:1,spread:4.5,fallTop:5.5,fallBot:.3,driftAmp:1.2,windDrift:2.5,speedMid:.43,speedVar:.17},lava_island:{count:28,color:[.62,.88,.62],pixelSize:4.6,motionType:0,shapeType:3,spread:4,fallTop:7,fallBot:.3,driftAmp:.65,windDrift:.6,speedMid:.27,speedVar:.11},pirate_ship:{count:20,color:[1,.86,.18],pixelSize:3.6,motionType:3,shapeType:2,spread:2.5,speedMid:.65,speedVar:.3}},un=`
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
`,mn=`
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
`;new w;class fn{constructor(){this._systems={},this._group=new F,this._scale=1;for(const[t,e]of Object.entries(pn)){const s=this._buildSystem(e);this._systems[t]=s,this._group.add(s.points)}}get group(){return this._group}setScale(t){if(this._scale=Math.max(0,Math.min(1,t??1)),this._scale<.05)for(const e of Object.values(this._systems))e.points.visible=!1}_buildSystem(t){const e=t.count,s=new Float32Array(e*3),a=new Float32Array(e*2),n=new Float32Array(e),o=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let h=0;h<e;h++){const b=Math.random()*Math.PI*2,P=Math.sqrt(Math.random())*t.spread;a[h*2]=Math.cos(b)*P,a[h*2+1]=Math.sin(b)*P,n[h]=Math.random()*Math.PI*2,o[h]=Math.max(.05,t.speedMid+(Math.random()*2-1)*t.speedVar),r[h]=t.pixelSize*(.55+Math.random()*.9),l[h]=.45+Math.random()*.55}const d=new ue;d.setAttribute("position",new $(s,3)),d.setAttribute("aBase",new $(a,2)),d.setAttribute("aPhase",new $(n,1)),d.setAttribute("aSpeed",new $(o,1)),d.setAttribute("aSize",new $(r,1)),d.setAttribute("aBaseAlpha",new $(l,1));const u={uTime:{value:0},uOpacity:{value:0},uCenter:{value:new w(0,26,0)},uColor:{value:new w(...t.color)},uMotion:{value:t.motionType},uShape:{value:t.shapeType},uFallTop:{value:t.fallTop??5},uFallBot:{value:t.fallBot??.3},uDriftAmp:{value:t.driftAmp??.8},uWindDrift:{value:t.windDrift??0},uSwirlSpd:{value:t.swirlSpd??1.8},uBobAmp:{value:t.bobAmp??.22}},f=new Be({uniforms:u,vertexShader:un,fragmentShader:mn,transparent:!0,depthWrite:!1,blending:_t}),m=new ai(d,f);return m.frustumCulled=!1,m.visible=!1,{points:m,uniforms:u}}update(t,e,s,a,n){if(a||this._scale<.05){for(const l of Object.values(this._systems))l.points.visible=!1;return}const o=performance.now()*.001,r=this._scale;for(const[l,d]of Object.entries(this._systems)){const{points:u,uniforms:f}=d,m=l===e;if(f.uOpacity.value+=((m?r:0)-f.uOpacity.value)*Math.min(1,t*2.5),f.uOpacity.value<.01){u.visible=!1;continue}if(n&&n[l]){const h=n[l];f.uCenter.value.set(h.x*s,h.y*s,h.z*s)}else f.uCenter.value.set(0,s,0);u.visible=!0,f.uTime.value=o}}}const et={meadow_island:{iconKey:"leaf",name:"Meadow Island",section:"About Me",color:"#4CAF50",html:`
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
    `},arctic_island:{iconKey:"snowflake",name:"Arctic Island",section:"Tech Stack",color:"#64B5F6",variant:"tech",html:Sa,init:Ma},mountain_island:{iconKey:"mountain",name:"Mountain Island",section:"Projects",color:"#FF8A65",variant:"projects",html:ba,init:wa},lava_island:{iconKey:"flame",name:"Lava Island",section:"Experience",color:"#E53935",variant:"exp",html:va},desert_island:{iconKey:"sun",name:"Desert Island",section:"Contact",color:"#FB923C",variant:"contact",html:ya,init:ga},pirate_ship:{iconKey:"compass",name:"Pirate Ship",section:"Travel Log",color:"#0097A7",lightColor:"#FFFFFF",noGlow:!0,variant:"travel",html:Ta,init:La}},ne=new Map;function hi(i){const t=typeof i.html=="function"?i.html():i.html||"",e=document.createElement("div");return e.className="wp-body",e.innerHTML=t,e}function _n(i){return!!i&&ne.has(i)}function pi(i,t){return!i||!t||i==="meadow_island"?!1:(ne.has(i)||ne.set(i,hi(t)),ne.has(i))}function Cs(i,t){pi(i,t);const e=ne.get(i);return e?e.cloneNode(!0):hi(t)}function gn(){for(const[i,t]of Object.entries(et))i!=="meadow_island"&&pi(i,t)}function yn(){return gn(),Promise.resolve()}const fe=typeof window<"u"&&(new URLSearchParams(window.location.search).has("perf")||typeof import.meta<"u"&&!1)||!1,ss=new Map,ui=[];function mi(){return typeof performance<"u"?performance.now():Date.now()}function G(i){var e;if(!fe)return;const t=mi();ss.set(i,t);try{(e=performance.mark)==null||e.call(performance,`phf:${i}`)}catch{}}function ct(i,t,e=null){var o,r;if(!fe)return 0;const s=ss.get(t),a=e?ss.get(e):mi();if(s==null||a==null)return 0;const n=a-s;ui.push({name:i,start:s,end:a,duration:n});try{e?(o=performance.measure)==null||o.call(performance,`phf:${i}`,`phf:${t}`,`phf:${e}`):(r=performance.measure)==null||r.call(performance,`phf:${i}`,`phf:${t}`)}catch{}return n}function vn(){if(!fe)return null;const i=ui.map(t=>({stage:t.name,ms:Math.round(t.duration)}));return new URLSearchParams(window.location.search).has("perf")&&console.table(i),i}function Ae(){return fe}function wn(){var i,t,e,s,a,n;if(!(!fe||typeof performance>"u")){try{const o=(t=(i=performance.getEntriesByType)==null?void 0:i.call(performance,"navigation"))==null?void 0:t[0];o&&console.log("[perf] TTFB:",(s=(e=o.responseStart)==null?void 0:e.toFixed)==null?void 0:s.call(e,1),"ms | DOMContentLoaded:",(n=(a=o.domContentLoadedEventEnd)==null?void 0:a.toFixed)==null?void 0:n.call(a,1),"ms")}catch{}G("module_eval")}}const bn="ontouchstart"in window||navigator.maxTouchPoints>0;class Mn{constructor(){this._popup=document.createElement("div"),this._popup.id="island-popup",this._popup.className="hidden",this._popup.innerHTML=`
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
    `,document.body.appendChild(this._popup),this._popup.addEventListener("click",()=>{var s;(s=this.onPopupTap)==null||s.call(this)}),this._popup.addEventListener("touchend",s=>{var a;s.preventDefault(),(a=this.onPopupTap)==null||a.call(this)},{passive:!1}),this._panel=document.getElementById("world-panel"),this._icon=document.getElementById("wp-icon"),this._eyebrow=document.getElementById("wp-eyebrow"),this._title=document.getElementById("wp-title"),this._content=document.getElementById("wp-content"),this._halo=this._panel.querySelector(".wp-halo"),this._closeBtn=document.getElementById("wp-close"),this._closeBtn.innerHTML=z("close",18,2),this._closeBtn.addEventListener("click",()=>this._requestClose()),this._panel.addEventListener("click",s=>{(s.target===this._panel||s.target.classList&&s.target.classList.contains("wp-scrim"))&&this._requestClose()}),this._closeTimer=null,this._openGen=0,this.onPopupTap=null,this.onClosePanel=null;const t=document.getElementById("landmark-badge"),e=document.getElementById("hint-text");t&&(t.style.display="none"),e&&(e.style.display="none")}showPopup(t){this._popup.querySelector(".pu-icon").innerHTML=z(t.iconKey,22),this._popup.querySelector(".pu-island").textContent=t.name,this._popup.querySelector(".pu-section").textContent=t.section,this._popup.style.setProperty("--ic",t.color);const e=this._popup.querySelector(".pu-keycap"),s=this._popup.querySelector(".pu-key-label");bn?(e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/></svg>',e.classList.add("pu-keycap--tap"),s.textContent="Tap"):(e.textContent="E",e.classList.remove("pu-keycap--tap"),s.textContent="Explore"),this._popup.classList.remove("hidden")}hidePopup(){this._popup.classList.add("hidden")}openPanel(t,e){this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),this._openGen+=1;const s=this._openGen;this._icon.innerHTML=z(t.iconKey,26),this._eyebrow.textContent=t.section,this._title.textContent=t.name,this._panel.style.setProperty("--ic",t.color);const a=this._panel.querySelector(".wp-card");a.className="wp-card"+(t.variant?` wp--${t.variant}`:"");const n=e||t.section,o=t.init;this._content.scrollTop=0;const r=`panel_open_${n}`;if(Ae()&&G(`${r}_start`),_n(n)){const l=Cs(n,t);this._content.replaceChildren(l),this._panel.classList.remove("hidden","is-closing"),this._panel.offsetWidth,this._panel.classList.add("is-open"),requestAnimationFrame(()=>{s===this._openGen&&(o==null||o(this._content),Ae()&&(G(`${r}_end`),ct(r,`${r}_start`,`${r}_end`)))});return}this._content.replaceChildren(),this._panel.classList.remove("hidden","is-closing"),this._panel.offsetWidth,this._panel.classList.add("is-open"),requestAnimationFrame(()=>{if(s!==this._openGen)return;const l=Cs(n,t);this._content.replaceChildren(l),this._content.scrollTop=0,requestAnimationFrame(()=>{s===this._openGen&&(o==null||o(this._content))})})}_requestClose(){this.onClosePanel?this.onClosePanel():this.closePanel()}closePanel(){if(!this._panel.classList.contains("is-open")){this._panel.classList.add("hidden");return}this._panel.classList.remove("is-open"),this._panel.classList.add("is-closing"),this._closeTimer=setTimeout(()=>{this._panel.classList.add("hidden"),this._panel.classList.remove("is-closing"),this._content.replaceChildren(),this._closeTimer=null},320)}isPanelOpen(){return this._panel.classList.contains("is-open")}}function Rt(i){return String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}class Sn{constructor(t){this._onTeleport=t,this._visited=new Set,this._lastFocus=null,this._build()}_build(){const t=document.createElement("div");t.id="map-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","map-title");const e=Object.entries(et).map(([s,a])=>`
      <div class="map-card" data-island="${Rt(s)}" style="--ic:${Rt(a.color)}">
        <div class="map-visited-badge" aria-hidden="true">✓ found</div>
        <div class="map-card-icon" aria-hidden="true">${z(a.iconKey,30)}</div>
        <div class="map-card-name">${Rt(a.name)}</div>
        <div class="map-card-section">${Rt(a.section)}</div>
        <button class="map-card-btn" type="button" data-teleport="${Rt(s)}"
                aria-label="Warp to ${Rt(a.name)}">Warp there</button>
      </div>
    `).join("");t.innerHTML=`
      <div class="overlay-inner map-overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="map-title">${z("map",18)} Island Map</span>
          <button class="overlay-x" id="map-close" type="button" aria-label="Close map">✕</button>
        </div>
        <p class="overlay-sub">Walk there yourself, or jump straight to any island.</p>
        <div class="map-grid">${e}</div>
      </div>
    `,t.querySelector("#map-close").addEventListener("click",()=>this.close()),t.addEventListener("click",s=>{s.target===t&&this.close()}),t.querySelectorAll("[data-teleport]").forEach(s=>{s.addEventListener("click",a=>{a.stopPropagation(),this.close(),this._onTeleport(s.dataset.teleport)})}),document.body.appendChild(t),this._el=t}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#map-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}markVisited(t){if(this._visited.has(t))return;this._visited.add(t);const e=this._el.querySelector(`[data-island="${t}"]`);e&&e.classList.add("visited")}}const Bt="ontouchstart"in window||navigator.maxTouchPoints>0;class Ln{constructor(){this._lastFocus=null,this._build()}_build(){const t=document.createElement("div");t.id="help-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","help-title"),t.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="help-title">How to Play</span>
          <button class="overlay-x" id="help-close" type="button" aria-label="Close help">✕</button>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${Bt?"":"active"}" type="button" role="tab"
                  aria-selected="${!Bt}" aria-controls="help-desktop" id="tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${Bt?"active":""}" type="button" role="tab"
                  aria-selected="${Bt}" aria-controls="help-mobile" id="tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="help-desktop" class="help-section ${Bt?"help-hidden":""}">
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
        <div id="help-mobile" class="help-section ${Bt?"":"help-hidden"}">
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

      </div>
    `;const e=t.querySelector("#help-desktop"),s=t.querySelector("#help-mobile");e&&(e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","tab-desktop")),s&&(s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby","tab-mobile")),t.querySelector("#help-close").addEventListener("click",()=>this.close()),t.addEventListener("click",o=>{o.target===t&&this.close()});const a=[...t.querySelectorAll(".help-tab")];function n(o){a.forEach(l=>{const d=l===o;l.classList.toggle("active",d),l.setAttribute("aria-selected",String(d)),l.tabIndex=d?0:-1}),t.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const r=t.querySelector(`#help-${o.dataset.tab}`);r&&r.classList.remove("help-hidden")}a.forEach(o=>{o.addEventListener("click",()=>n(o)),o.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;const l=r.key==="ArrowRight"?1:-1,d=a[(a.indexOf(o)+l+a.length)%a.length];d.focus(),n(d)})}),document.body.appendChild(t),this._el=t}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#help-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}}const Wt="ontouchstart"in window||navigator.maxTouchPoints>0;class Tn{constructor(){this._lastFocus=null,this._onKey=null,this._onClick=null,this._onTouch=null,this._build()}_build(){const t=document.createElement("div");t.id="intro-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","intro-title"),t.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="intro-title">How to Play</span>
          <button class="overlay-x" id="intro-close" type="button" aria-label="Close intro">✕</button>
        </div>

        <div class="intro-welcome">
          <div class="intro-welcome-icon" id="intro-welcome-icon">${z("world",38,1.5)}</div>
          <h2 class="intro-welcome-title" id="intro-welcome-title">Welcome to Eric's World!</h2>
          <p class="intro-welcome-sub" id="intro-welcome-sub">Six islands. Explore them all.</p>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${Wt?"":"active"}" type="button" role="tab"
                  aria-selected="${!Wt}" aria-controls="intro-desktop" id="intro-tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${Wt?"active":""}" type="button" role="tab"
                  aria-selected="${Wt}" aria-controls="intro-mobile" id="intro-tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="intro-desktop" class="help-section ${Wt?"help-hidden":""}">
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
        <div id="intro-mobile" class="help-section ${Wt?"":"help-hidden"}">
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
    `;const e=t.querySelector("#intro-desktop"),s=t.querySelector("#intro-mobile");e&&(e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","intro-tab-desktop")),s&&(s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby","intro-tab-mobile")),t.querySelector("#intro-close").addEventListener("click",()=>this.close());const a=[...t.querySelectorAll(".help-tab")];function n(o){a.forEach(l=>{const d=l===o;l.classList.toggle("active",d),l.setAttribute("aria-selected",String(d)),l.tabIndex=d?0:-1}),t.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const r=t.querySelector(`#intro-${o.dataset.tab}`);r&&r.classList.remove("help-hidden")}a.forEach(o=>{o.addEventListener("click",()=>n(o)),o.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;const l=r.key==="ArrowRight"?1:-1,d=a[(a.indexOf(o)+l+a.length)%a.length];d.focus(),n(d)})}),document.body.appendChild(t),this._el=t}open(t=!1){const e=this._el.querySelector("#intro-welcome-icon"),s=this._el.querySelector("#intro-welcome-title"),a=this._el.querySelector("#intro-welcome-sub");e&&(e.innerHTML=z(t?"compass":"world",38,1.5)),s&&(s.textContent=t?"Welcome back!":"Welcome to Eric's World!"),a&&(a.textContent=t?"Here's a quick refresher in case you forgot the ropes.":"Six islands. Explore them all."),this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var n;return(n=this._el.querySelector("#intro-close"))==null?void 0:n.focus()}),this._onKey=n=>{n.target.closest("#intro-overlay")&&(n.key==="Tab"||n.key==="ArrowLeft"||n.key==="ArrowRight")||this.close()},this._onClick=n=>{n.target===this._el&&this.close()},this._onTouch=n=>{n.target===this._el&&this.close()},document.addEventListener("keydown",this._onKey,{once:!1}),this._el.addEventListener("click",this._onClick,{once:!1}),this._el.addEventListener("touchstart",this._onTouch,{once:!1,passive:!0})}close(){this._el.classList.remove("is-open"),localStorage.setItem("phf-intro-seen","1"),this._onKey&&document.removeEventListener("keydown",this._onKey),this._onClick&&this._el.removeEventListener("click",this._onClick),this._onTouch&&this._el.removeEventListener("touchstart",this._onTouch),this._onKey=this._onClick=this._onTouch=null,this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}}const fi="phf-settings-v1";function xn(){try{const i=localStorage.getItem(fi);if(!i)return null;const t=JSON.parse(i);return typeof t!="object"||t===null?null:t}catch{return null}}function En(i){try{localStorage.setItem(fi,JSON.stringify(i))}catch{}}class kn{constructor(){var s;const t=xn()??{},e=((s=window.matchMedia)==null?void 0:s.call(window,"(prefers-reduced-motion: reduce)").matches)??!1;this._quality=["low","auto","high"].includes(t.quality)?t.quality:"auto",this._reducedMotion=typeof t.reducedMotion=="boolean"?t.reducedMotion:e,this._hintsVisible=typeof t.hintsVisible=="boolean"?t.hintsVisible:!0,this._reducedMotion&&document.body.classList.add("reduced-motion"),this.onQualityChange=null,this.onReducedMotionChange=null,this.onHintsChange=null,this._lastFocus=null,this._build()}applyRestored(){var t,e,s;(t=this.onQualityChange)==null||t.call(this,this._quality),(e=this.onReducedMotionChange)==null||e.call(this,this._reducedMotion),(s=this.onHintsChange)==null||s.call(this,this._hintsVisible)}_persist(){En({quality:this._quality,reducedMotion:this._reducedMotion,hintsVisible:this._hintsVisible})}_build(){const t=this._reducedMotion,e=this._hintsVisible,s=document.createElement("div");s.id="settings-overlay",s.className="overlay-modal",s.setAttribute("aria-modal","true"),s.setAttribute("role","dialog"),s.setAttribute("aria-labelledby","settings-title");const a=(r,l)=>`
      <button class="sopt${this._quality===r?" active":""}"
              type="button"
              data-q="${r}"
              aria-pressed="${this._quality===r}">${l}</button>`;s.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="settings-title">${z("settings",18)} Options</span>
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
    `,s.querySelector("#settings-close").addEventListener("click",()=>this.close()),s.addEventListener("click",r=>{r.target===s&&this.close()}),s.querySelectorAll("[data-q]").forEach(r=>{r.addEventListener("click",()=>{var l;s.querySelectorAll("[data-q]").forEach(d=>{const u=d===r;d.classList.toggle("active",u),d.setAttribute("aria-pressed",String(u))}),this._quality=r.dataset.q,this._persist(),(l=this.onQualityChange)==null||l.call(this,this._quality)})});const n=s.querySelector("#motion-toggle");n.addEventListener("click",()=>{var r;this._reducedMotion=!this._reducedMotion,n.textContent=this._reducedMotion?"ON":"OFF",n.classList.toggle("active",this._reducedMotion),n.setAttribute("aria-pressed",String(this._reducedMotion)),document.body.classList.toggle("reduced-motion",this._reducedMotion),this._persist(),(r=this.onReducedMotionChange)==null||r.call(this,this._reducedMotion)});const o=s.querySelector("#hints-toggle");o.addEventListener("click",()=>{var r;this._hintsVisible=!this._hintsVisible,o.textContent=this._hintsVisible?"ON":"OFF",o.classList.toggle("active",this._hintsVisible),o.setAttribute("aria-pressed",String(this._hintsVisible)),this._persist(),(r=this.onHintsChange)==null||r.call(this,this._hintsVisible)}),document.body.appendChild(s),this._el=s}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#settings-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}get quality(){return this._quality}get reducedMotion(){return this._reducedMotion}get hintsVisible(){return this._hintsVisible}}const Cn="./";class An{constructor(){this._el=null,this.onStartClose=null,this.onClose=null,this.shouldCloseFromBackdrop=null,this._build()}_build(){const t=document.createElement("div");t.id="about-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","About Eric"),t.innerHTML=`
      <button class="about-close" type="button" aria-label="Close">${z("close",18,2)}</button>

      <!-- Warm spotlight grounding the character -->
      <div class="about-stage" aria-hidden="true"></div>

      <!-- Brand sign — the ERIC NG wordmark on a warm plaque, top-center -->
      <div class="about-brand">
        <img class="about-brand-img" src="${Cn}ericnglogo.png" alt="Eric Ng" width="1080" height="355" draggable="false">
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
            <div class="about-chip" aria-hidden="true">${z("leaf",26)}</div>
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
    `,document.body.appendChild(t),this._el=t,t.querySelector(".about-close").addEventListener("click",()=>this.close()),t.addEventListener("click",e=>{e.target===t&&(this.shouldCloseFromBackdrop&&!this.shouldCloseFromBackdrop(e)||this.close())})}open(){this.isOpen()||(this._el.classList.remove("is-closing"),this._el.classList.add("is-open"))}close(){var t;this.isOpen()&&((t=this.onStartClose)==null||t.call(this),this._el.classList.add("is-closing"),setTimeout(()=>{var e;this._el.classList.remove("is-open","is-closing"),(e=this.onClose)==null||e.call(this)},350))}isOpen(){return this._el.classList.contains("is-open")}}const lt={criticalCode:.08,download:.5,sceneBuilt:.1,shadersCompiled:.1,firstMeaningfulFrame:.08,playWarmed:.08,interactionShell:.06},Ke={Booting:"Starting up",LoadingAssets:"Loading the world",Unpacking:"Unpacking the world",BuildingScene:"Building the world",Compiling:"Preparing the world",FirstFrame:"Lighting the stage",WarmingPlay:"Settling into orbit",Ready:"Ready",Revealing:"Welcome in",Live:"Live",Fatal:"Something went wrong",Degraded:"Recovering graphics"},Pn=45e3,Fn=280;class In{constructor(t={}){this.onProgress=t.onProgress||null,this.onReady=t.onReady||null,this.onFatal=t.onFatal||null,this.onStateChange=t.onStateChange||null,this.reducedMotion=!!t.reducedMotion,this.state="Booting",this.fatalMessage="",this.readyAt=0,this._downloadFrac=0,this._flags={criticalCode:!1,criticalAssets:!1,sceneBuilt:!1,shadersCompiled:!1,firstMeaningfulFrame:!1,playWarmed:!1,cameraPosed:!1,interactionShell:!1},this._displayProgress=0,this._targetProgress=0,this._stallTimer=null,this._readyFired=!1,this._revealStarted=!1,this._awaitingParse=!1,this._armStallWatch(),this._setState("Booting")}setReducedMotion(t){this.reducedMotion=!!t}markCriticalCode(){this._flags.criticalCode=!0,this._flags.interactionShell=!0,this._flags.cameraPosed=!0,G("critical_code"),this._setState("LoadingAssets"),this._recompute()}setDownloadProgress(t,e){e>0&&(this._downloadFrac=Math.min(1,t/e),this._downloadFrac>=1&&!this._flags.criticalAssets&&(this._awaitingParse=!0,this._setState("Unpacking"))),this._recompute(),this._armStallWatch()}nudgeDownloadFallback(t){const e=1-Math.exp(-t*.12);this._downloadFrac=Math.max(this._downloadFrac,Math.min(.85,e)),this._recompute()}markWorldLoaded(){this._flags.criticalAssets=!0,this._downloadFrac=1,this._awaitingParse=!1,G("world_loaded"),ct("world_download","critical_code","world_loaded"),this._setState("BuildingScene"),this._recompute(),this._armStallWatch()}markSceneBuilt(){this._flags.sceneBuilt=!0,G("scene_built"),ct("scene_build","world_loaded","scene_built"),this._setState("Compiling"),this._recompute()}markShadersCompiled(){this._flags.shadersCompiled=!0,G("shaders_compiled"),ct("compile","scene_built","shaders_compiled"),this._setState("FirstFrame"),this._recompute()}markFirstMeaningfulFrame(){this._flags.firstMeaningfulFrame||(this._flags.firstMeaningfulFrame=!0,G("first_meaningful_frame"),ct("first_frame","shaders_compiled","first_meaningful_frame"),this._recompute(),this._maybeReady())}beginWarmingPlay(){this._flags.playWarmed||(this._setState("WarmingPlay"),this._recompute(),this.flush())}markPlayWarmed(){this._flags.playWarmed||(this._flags.playWarmed=!0,G("play_warmed"),ct("play_warm","first_meaningful_frame","play_warmed"),this._recompute(),this._maybeReady())}markCameraPosed(){this._flags.cameraPosed=!0,this._recompute(),this._maybeReady()}markInteractionShell(){this._flags.interactionShell=!0,this._recompute(),this._maybeReady()}get hasFirstFrame(){return this._flags.firstMeaningfulFrame}get hasPlayWarmed(){return this._flags.playWarmed}fail(t){var e;this.fatalMessage=t||"Load failed",this._setState("Fatal"),this._clearStallWatch(),(e=this.onFatal)==null||e.call(this,this.fatalMessage),this._emitProgress()}markContextLost(){this.state!=="Fatal"&&this._setState("Degraded")}markContextRestored(){this.state==="Degraded"&&this._setState("Live")}beginReveal(){this.state!=="Ready"&&this.state!=="Revealing"||(this._revealStarted=!0,this._setState("Revealing"))}markLive(){this._setState("Live"),this._clearStallWatch(),G("live"),ct("ready_to_live","ready","live")}get isReady(){return this._allReadyFlags()}get isFatal(){return this.state==="Fatal"}get isLive(){return this.state==="Live"}tick(t){if(this._awaitingParse&&!this._flags.criticalAssets){const s=(lt.criticalCode+lt.download+lt.sceneBuilt*.45)*100;this._targetProgress=Math.max(this._targetProgress,Math.min(s,this._displayProgress+t*14))}const e=1-Math.exp(-(this.reducedMotion?18:8)*t);this._displayProgress+=(this._targetProgress-this._displayProgress)*e,this._allReadyFlags()?(this._displayProgress=Math.max(this._displayProgress,100),this._targetProgress=100):this._displayProgress=Math.min(this._displayProgress,99.2),this._emitProgress()}flush(){this._displayProgress=this._targetProgress,this._emitProgress()}get displayProgress(){return this._displayProgress}get label(){return this.state==="Fatal"?this.fatalMessage||Ke.Fatal:this.state==="Compiling"||this.state==="FirstFrame"||this.state==="BuildingScene"||this.state==="WarmingPlay"||this.state==="Unpacking"?Ke[this.state]:this.state==="LoadingAssets"&&this._downloadFrac>=.98?"Preparing the world":Ke[this.state]||"Loading"}get minDwellMs(){return this.reducedMotion?0:Fn}_allReadyFlags(){const t=this._flags;return t.criticalCode&&t.criticalAssets&&t.sceneBuilt&&t.shadersCompiled&&t.firstMeaningfulFrame&&t.playWarmed&&t.cameraPosed&&t.interactionShell}_maybeReady(){var t;this._readyFired||!this._allReadyFlags()||this.state==="Fatal"||(this._readyFired=!0,this._targetProgress=100,this._displayProgress=100,this.readyAt=performance.now(),G("ready"),ct("time_to_ready","module_eval","ready"),this._setState("Ready"),this._clearStallWatch(),this._emitProgress(),(t=this.onReady)==null||t.call(this))}_recompute(){const t=this._flags;let e=0;t.criticalCode&&(e+=lt.criticalCode),e+=lt.download*this._downloadFrac,t.sceneBuilt&&(e+=lt.sceneBuilt),t.shadersCompiled&&(e+=lt.shadersCompiled),t.firstMeaningfulFrame&&(e+=lt.firstMeaningfulFrame),t.playWarmed&&(e+=lt.playWarmed),t.interactionShell&&(e+=lt.interactionShell);let s=e*100;this._allReadyFlags()?s=100:s=Math.min(s,99),this._targetProgress=s,s>this._displayProgress&&(this._displayProgress+=(s-this._displayProgress)*.35),this._emitProgress()}_emitProgress(){var e;const t=this._allReadyFlags()?100:Math.min(99,Math.floor(this._displayProgress));(e=this.onProgress)==null||e.call(this,t,this.label,this.state)}_setState(t){var e;this.state!==t&&(this.state=t,(e=this.onStateChange)==null||e.call(this,t))}_armStallWatch(){this._clearStallWatch(),this._stallTimer=setTimeout(()=>{this._readyFired||this.state==="Fatal"||this.state==="Live"||this.state==="Revealing"||this.fail("Still loading — check your connection, then retry.")},Pn)}_clearStallWatch(){this._stallTimer&&(clearTimeout(this._stallTimer),this._stallTimer=null)}dispose(){this._clearStallWatch()}}function On(){var o,r;const i=navigator.deviceMemory,t=navigator.hardwareConcurrency||4,e=window.devicePixelRatio||1,s="ontouchstart"in window||navigator.maxTouchPoints>0,a=((o=navigator.connection)==null?void 0:o.saveData)===!0,n=/2g|slow-2g/i.test(((r=navigator.connection)==null?void 0:r.effectiveType)||"");return a||n||i!=null&&i<=4||s&&(i==null||i<=6)&&t<=4?"low":e>=2.5&&s?"mid":t>=8&&(i==null||i>=8)?"high":"mid"}function _i(i,t={}){const e=t.tier||On(),s=window.devicePixelRatio||1;let a;return i==="low"?a=Jt({dpr:1,antialias:!1,shadows:!1,shadowMapSize:512,shadowType:"basic",skyTier:"minimal",particleScale:.35,adaptiveDpr:!1,glassBlur:0}):i==="high"?a=Jt({dpr:Math.min(s,2),antialias:!0,shadows:!0,shadowMapSize:2048,shadowType:"soft",skyTier:"full",particleScale:1,adaptiveDpr:!1,glassBlur:14}):e==="low"?a=Jt({dpr:1,antialias:!1,shadows:!1,shadowMapSize:512,shadowType:"basic",skyTier:"minimal",particleScale:.4,adaptiveDpr:!0,glassBlur:0}):e==="high"?a=Jt({dpr:Math.min(s,1.75),antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"soft",skyTier:"full",particleScale:1,adaptiveDpr:!0,glassBlur:14}):a=Jt({dpr:Math.min(s,1.5),antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"basic",skyTier:"standard",particleScale:.7,adaptiveDpr:!0,glassBlur:8}),a.preset=i,a.tier=e,a}function Jt(i){return{preset:"auto",tier:"mid",dpr:1,antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"soft",skyTier:"standard",particleScale:1,adaptiveDpr:!1,glassBlur:14,...i}}function gi(i){const t=document.documentElement,e=(i==null?void 0:i.glassBlur)??14;t.style.setProperty("--glass-blur",`${e}px`),t.classList.toggle("glass-solid",e===0)}const Rn=18.5,Bn=1,Wn=45;wn();ue.prototype.computeBoundsTree=ma;ue.prototype.disposeBoundsTree=fa;L.prototype.raycast=_a;const dt=Object.keys(et),ke={};for(const i of dt){const t=et[i].lightColor||et[i].color;ke[i]=parseInt(t.slice(1),16)}const We=document.getElementById("canvas");let c=null,O=_i("auto"),x;try{x=new ia({canvas:We,antialias:O.antialias,powerPreference:"high-performance",stencil:!1})}catch(i){throw console.error("WebGL init failed:",i),yi("WebGL is unavailable in this browser. Try Chrome or Firefox, or enable hardware acceleration."),i}x.setPixelRatio(O.dpr);x.setSize(window.innerWidth,window.innerHeight);x.shadowMap.enabled=O.shadows;x.shadowMap.type=O.shadowType==="soft"?ri:li;x.toneMapping=aa;x.toneMappingExposure=1;gi(O);function yi(i){const t=document.getElementById("ldr-label");t&&(t.textContent=String(i).slice(0,160));const e=document.getElementById("ldr-progress");if(e&&!document.getElementById("ldr-retry")){const s=document.createElement("button");s.id="ldr-retry",s.type="button",s.textContent="Reload",s.className="ldr-retry-btn",s.onclick=()=>location.reload(),e.appendChild(s)}}We.addEventListener("webglcontextlost",i=>{i.preventDefault(),c==null||c.markContextLost()},!1);We.addEventListener("webglcontextrestored",()=>{c==null||c.markContextRestored(),x.setSize(window.innerWidth,window.innerHeight)},!1);const I=new na;I.background=new K(854048);const _=new Ka(window.innerWidth/window.innerHeight);I.add(_.camera);_.setLoadingView();const V=new F;I.add(V);const A=new Wa;I.add(A.sceneGroup);const B=new Mn,vi="ontouchstart"in window||navigator.maxTouchPoints>0,Pe={},Kt=new Set;let oe=!1,te=0;const Dn=1.1,wi=new me,bi=new me,Un=new w(0,1,0);function qn(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function jn(i){if(!Pe[i]||oe||!ut)return;N==="detail"&&(N="near",B.closePanel()),wi.copy(V.quaternion),bi.setFromUnitVectors(Pe[i],Un),oe=!0,te=0;const t=document.getElementById("teleport-flash");t&&!J&&(t.classList.add("active"),setTimeout(()=>t.classList.remove("active"),220))}const Pt=new Sn(jn),Fe=new Ln,Nn=new Tn,gt=new kn,pt=new An;pt.onStartClose=()=>{Oe=!1,setTimeout(()=>{_._distTarget=Oi,ht&&_e?(de.killTweensOf(v.rotation),de.to(v.rotation,{y:Math.PI-ft,duration:.4,ease:"power2.inOut",onComplete:Ps})):Ps()},200)};pt.onClose=()=>{N==="detail"&&(N="near",T&&B.showPopup(et[T]))};const Ye=new oa,As=new ms;pt.shouldCloseFromBackdrop=i=>!v||!v.visible?!0:(Ye.x=i.clientX/window.innerWidth*2-1,Ye.y=-(i.clientY/window.innerHeight)*2+1,As.setFromCamera(Ye,_.camera),As.intersectObject(v,!0).length===0);function Ps(){bt&&(bt=!1,nt=!1,zt=0)}let J=gt.reducedMotion,Mi=O.adaptiveDpr,ee=0,Ce=0,xt=O.dpr;function zn(i){var e,s,a;O=_i(i),xt=O.dpr,Mi=O.adaptiveDpr,ee=0,Ce=0,x.setPixelRatio(xt),x.shadowMap.enabled=O.shadows,x.shadowMap.type=O.shadowType==="soft"?ri:li;const t=O.shadowMapSize;(s=(e=A.sunLight)==null?void 0:e.shadow)!=null&&s.mapSize&&(A.sunLight.shadow.mapSize.set(t,t),(a=A.sunLight.shadow.map)==null||a.dispose(),A.sunLight.shadow.map=null),wt.setSkyTier(O.skyTier),Ue.setScale(O.particleScale),gi(O)}gt.onQualityChange=i=>zn(i);gt.onReducedMotionChange=i=>{J=i,document.body.classList.toggle("reduced-motion",i),c==null||c.setReducedMotion(i)};const kt=document.getElementById("controls-hint"),$n=5;let Si=!0,se=!0;gt.onHintsChange=i=>{Si=i,kt&&(kt.setAttribute("aria-hidden",String(!i)),i||(kt.classList.add("faded"),se=!1))};const Mt=document.createElement("div");Mt.id="hud-buttons";Mt.classList.add("hud-hidden");Mt.innerHTML=`
  <button class="hud-btn" type="button" id="btn-map"      aria-label="Island map (M)" title="Island Map (M)">${z("map",18)}</button>
  <button class="hud-btn" type="button" id="btn-help"     aria-label="How to play"    title="How to Play">${z("help",18)}</button>
  <button class="hud-btn" type="button" id="btn-settings" aria-label="Options"        title="Options">${z("settings",18)}</button>
`;document.body.appendChild(Mt);Mt.querySelector("#btn-map").addEventListener("click",()=>Pt.toggle());Mt.querySelector("#btn-help").addEventListener("click",()=>Fe.toggle());Mt.querySelector("#btn-settings").addEventListener("click",()=>gt.toggle());function De(){return Pt.isOpen()||Fe.isOpen()||gt.isOpen()||pt.isOpen()}function Hn(){return pt.isOpen()?(pt.close(),!0):gt.isOpen()?(gt.close(),!0):Fe.isOpen()?(Fe.close(),!0):Pt.isOpen()?(Pt.close(),!0):!1}const Ht=document.createElement("div");Ht.id="hud-left";Ht.classList.add("hud-hidden");const Gn=[["github","GitHub","https://github.com/erriiiccccccc"],["linkedin","LinkedIn","https://www.linkedin.com/in/erriiiccccccc/"],["instagram","Instagram","https://www.instagram.com/ericccc____/"],["mail","Email","mailto:ericng8766@gmail.com"]];Ht.innerHTML=`
  <div class="hud-progress" aria-live="polite" aria-label="Islands discovered">
    <div class="hp-top">
      <span class="hp-ic">${z("globe",14)}</span>
      <span class="hp-count"><b id="ic-count">0</b> <span class="hp-total">/ 6</span></span>
      <span class="hp-label">Islands</span>
    </div>
    <div class="hp-pips" id="hp-pips" aria-hidden="true">${Array.from({length:6},()=>'<span class="hp-pip"></span>').join("")}</div>
  </div>
  <div class="hud-socials">
    ${Gn.map(([i,t,e])=>`<a class="hud-social" href="${e}"${e.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""} aria-label="${t}" title="${t}">${z(i,16)}</a>`).join("")}
  </div>
`;document.body.appendChild(Ht);const Fs=document.getElementById("ic-count"),Vn=[...Ht.querySelectorAll(".hp-pip")],Ct=document.createElement("div");Ct.id="discover-toast";Ct.setAttribute("role","status");Ct.setAttribute("aria-live","polite");document.body.appendChild(Ct);let Is=!1;function Jn(i,t=4500){Ct.innerHTML=i,Ct.classList.add("show"),setTimeout(()=>Ct.classList.remove("show"),t)}const Li=document.createElement("div");Li.id="teleport-flash";document.body.appendChild(Li);const j=vi?new qa:null;if(j){const i=document.getElementById("touch-controls");i&&i.classList.add("active","hud-hidden")}const Q=25,At=new ra(16777215,0,Q*3,Math.PI/6,.5,2);At.position.set(0,Q*1.8,0);At.target.position.set(0,Q,0);I.add(At);I.add(At.target);const be=new K,Kn=[new w(55,30,-25),new w(20,45,55),new w(-55,35,20),new w(-25,28,-55),new w(35,50,35),new w(-35,38,-40)],St=new w,Xe=new K(16765056),is=[],Lt=new w,Yt=new w,Yn=new w(0,0,0),Xn=new w(0,1,0),Os=new w,Qe=new w,Ze=new w,Ie="./".replace(/\/?$/,"/"),Me=document.getElementById("loader"),Rs=document.getElementById("ldr-pct"),Bs=document.getElementById("ldr-bar-fill"),Xt=document.getElementById("ldr-label");let Ws="",Ds=0,Us=!1,as=!1,re=!1,qs=!1,ns=!1,Qt=0;function js(i,t){const e=Math.min(100,Math.max(0,Math.floor(i)));Rs&&(Rs.textContent=e+"%"),Bs&&(Bs.style.width=e+"%"),t&&Xt&&t!==Ws&&!(c!=null&&c.isFatal)&&(Ws=t,Xt.style.opacity="0",setTimeout(()=>{Xt&&(Xt.textContent=t,Xt.style.opacity="1")},160))}c=new In({reducedMotion:J,onProgress:(i,t)=>js(i,t),onFatal:i=>{yi(i),js(0,i)},onReady:()=>hs()});c.markCriticalCode();window.__PHF_LOAD_OWNED__=!0;const fs=new ci;fs.setMeshoptDecoder(la);const _s=new ca;_s.setTranscoderPath(Ie+"basis/");_s.detectSupport(x);fs.setKTX2Loader(_s);function tt(){return new Promise(i=>{requestAnimationFrame(()=>setTimeout(i,0))})}const ie=[];function Qn(){if(!ie.length)return;const i=()=>{const t=performance.now();for(;ie.length&&performance.now()-t<4;){const e=ie.pop();if(!(!(e!=null&&e.geometry)||e.geometry.boundsTree))try{e.geometry.computeBoundsTree()}catch{}}ie.length&&("requestIdleCallback"in window?requestIdleCallback(i,{timeout:200}):setTimeout(i,0))};"requestIdleCallback"in window?requestIdleCallback(i,{timeout:500}):setTimeout(i,0)}G("world_download_start");(async()=>{var t,e,s,a,n,o,r;const i=Ie+"world.glb";try{const l=await fetch(i);if(!l.ok)throw new Error(`HTTP ${l.status}`);const d=Number(l.headers.get("content-length"))||0,u=(t=l.body)==null?void 0:t.getReader();let f;if(u){const p=[];let k=0,C=0;for(;;){const{done:D,value:It}=await u.read();if(D)break;p.push(It),k+=It.byteLength,C+=It.byteLength,d>0&&(c==null||c.setDownloadProgress(k,d)),C>512*1024&&(C=0,await tt())}d>0?c==null||c.setDownloadProgress(d,d):c==null||c.setDownloadProgress(k,k),(e=c==null?void 0:c.flush)==null||e.call(c),await tt();const M=new Uint8Array(k);let q=0;for(const D of p)M.set(D,q),q+=D.byteLength;f=M.buffer}else f=await l.arrayBuffer(),c==null||c.setDownloadProgress(1,1),(s=c==null?void 0:c.flush)==null||s.call(c),await tt();const h=(await new Promise((p,k)=>{fs.parse(f,Ie,p,k)})).scene;c==null||c.markWorldLoaded(),(a=c==null?void 0:c.flush)==null||a.call(c),await tt();const b=new Tt().setFromObject(h),P=new da;b.getBoundingSphere(P);const U=Q/P.radius;h.scale.setScalar(U);const Z=new Tt().setFromObject(h).getCenter(new w);h.position.sub(Z),await tt();const Ft=null;let W=0;h.traverse(p=>{if(p.isMesh){const M=(p.name||"").toLowerCase().includes("(terrain)");if(p.castShadow=M,p.receiveShadow=!0,p.material){const q=Array.isArray(p.material)?p.material:[p.material];for(const D of q)D&&D.opacity>=.99&&!D.transparent&&(D.side=ni)}if(p.geometry&&!p.geometry.boundsTree)if(M)try{p.geometry.computeBoundsTree()}catch{}else ie.push(p);M?(p.layers.enable(1),W++):p.layers.enable(2)}Ft&&p.name;const k=p.name;k&&et[k]&&!zs[k]&&(zs[k]=p,at[k]=[],p.traverse(C=>{C.isMesh&&(C.material=C.material.clone(),C.material.emissive=new K(0),C.material._origColor=C.material.color.clone(),C.material.color.multiplyScalar(.35),C.material._isFloor=!0,at[k].push(C))}))}),W>0&&(os.layers.set(1),Ei=!0),await tt(),h.visible=!1,V.add(h),ut=h,V.updateMatrixWorld(!0);const mt=new Tt,yt=new w;for(const p of dt)if(at[p]&&at[p].length){mt.makeEmpty();for(const k of at[p])mt.expandByObject(k);mt.getCenter(yt),V.worldToLocal(yt),yt.lengthSq()>1e-4&&(Pe[p]=yt.clone().normalize())}await tt();{const p={},k=new w;for(const M of dt){if(!((n=at[M])!=null&&n.length))continue;const q=new Tt;for(const D of at[M])q.expandByObject(D);q.expandByScalar(3),p[M]=q}const C=new Set;for(const M of dt)(at[M]||[]).forEach(q=>C.add(q));ut.traverse(M=>{var q;if(!(!M.isMesh||C.has(M))){new Tt().setFromObject(M).getCenter(k);for(const D of dt)if((q=p[D])!=null&&q.containsPoint(k)){M.material=M.material.clone(),M.material.emissive=new K(0),M.material._origColor=M.material.color.clone(),M.material.color.multiplyScalar(.35),M.material._isFloor=!1,at[D].push(M),C.add(M);break}}})}for(const p of dt)for(const k of at[p]||[])ki.set(k,p);if(await tt(),Us)return;Us=!0,c==null||c.markSceneBuilt(),(o=c==null?void 0:c.flush)==null||o.call(c),await tt();try{x.compile(I,_.camera),c==null||c.markShadersCompiled(),(r=c==null?void 0:c.flush)==null||r.call(c)}catch(p){console.error("Shader compile failed:",p),c==null||c.fail("Could not prepare graphics. Try reloading.");return}await tt(),x.render(I,_.camera),as=!0,co(h)}catch(l){console.error("GLB load error:",l),c==null||c.fail("Could not load the world. Check your connection, then retry.")}})();let ut=null;const os=new ms,rs=new ms;rs.layers.set(2);const Ti=new w(0,Q*2,0),xi=new w(0,-1,0);let Ei=!1;function Zn(i){let t=i;for(;t;){if(et[t.name])return t.name;t=t.parent}return null}function Ns(){if(!ut)return Q;os.set(Ti,xi);const i=os.intersectObject(ut,!0);return i.length>0?(T=ki.get(i[0].object)??Zn(i[0].object),i[0].point.y):(T=null,Q)}const zs={},at={},ki=new Map;let N="exploring",T=null,$s=null,Se=0,Hs=!0;const Ci=new xa;I.add(Ci.points);const he=new Ba(_.camera);I.add(he.group);const Ai=new Za;I.add(Ai.group);const wt=new hn(O.skyTier);I.add(wt.group);const Ue=new fn;Ue.setScale(O.particleScale);V.add(Ue.group);gt.applyRestored();const R=new Da;R.group.position.set(0,Q+.9,0);I.add(R.group);const v=new F;v.position.set(0,Q+.9,0);I.add(v);let ht=!1;const pe=new Na;let _e=!1;new ha;const Dt=Ie+"locomotionNEW/",Gs=new ci;Gs.load(Dt+"ericlowpolyskeleton.glb",i=>{const t=i.scene,e=new Tt().setFromObject(t);t.scale.setScalar(2.2/e.getSize(new w).y);const s=new Tt().setFromObject(t);t.position.y=-s.min.y,t.traverse(o=>{if(!o.isMesh)return;o.castShadow=!0;const r=o.material;r&&r.isMeshStandardMaterial&&(r.roughness=.62,r.map&&(r.emissiveMap=r.map,r.emissive.setRGB(1,1,1),r.emissiveIntensity=.16,is.push(r)),r.needsUpdate=!0)}),v.add(t),ht=!0,R.group.visible=!1;const a=o=>new Promise((r,l)=>Gs.load(o,r,void 0,l)),n=o=>o.status==="fulfilled"&&o.value.animations[0]||null;Promise.allSettled([a(Dt+"walk.glb"),a(Dt+"run.glb"),a(Dt+"idleagree.glb"),a(Dt+"idlecall.glb"),a(Dt+"idlegreet.glb")]).then(([o,r,l,d,u])=>{const f=n(o),m=n(r);f||console.warn("[AnimCtrl] walk.glb had no animation"),m||console.warn("[AnimCtrl] run.glb had no animation");const h=[n(l),n(d),n(u)].filter(Boolean);pe.loadGlbClips(t,{idle:null,walk:f,run:m,emotes:h}),_e=!0,t.traverse(b=>{if(!b.isBone&&b.type!=="Bone")return;const P=b.name.toLowerCase();for(const[U,E]of Object.entries(io))!jt[U]&&E.some(Z=>P.includes(Z))&&(jt[U]=b,Ri[U]={x:b.rotation.x,y:b.rotation.y})})})},void 0,i=>console.error("ericlowpolyskeleton.glb load error:",i));const Pi=new Ua,Fi=5,to=22;let qt=0,zt=0,nt=!0,bt=!1,Ii=0,ls=!1,Oi=16,Oe=!1;const jt={head:null,neck:null,spine:null,leftEye:null,rightEye:null},Ri={},eo=1,so=1,cs={head:{x:0,y:0},neck:{x:0,y:0},spine:{x:0,y:0},leftEye:{x:0,y:0},rightEye:{x:0,y:0}};let Bi=0,Wi=0;document.addEventListener("mousemove",i=>{Bi=i.clientX/window.innerWidth*2-1,Wi=-(i.clientY/window.innerHeight)*2+1});const io={head:["head"],neck:["neck"],spine:["spine1","spine2","spine"],leftEye:["lefteye","eye.l","eye_l","eyel","left_eye"],rightEye:["righteye","eye.r","eye_r","eyer","right_eye"]},Le={head:{yaw:.35,pitch:.22,lerp:.08,yc:.45,pc:.3},neck:{yaw:.18,pitch:.1,lerp:.06,yc:.25,pc:.18},spine:{yaw:.06,pitch:.03,lerp:.04,yc:.12,pc:.08},eyes:{yaw:.55,pitch:.35,lerp:.14,yc:.35,pc:.25}};function ao(){const{clamp:i,lerp:t}=ce,e=Bi,s=Wi,a=[{key:"head",bone:jt.head,cfg:Le.head},{key:"neck",bone:jt.neck,cfg:Le.neck},{key:"spine",bone:jt.spine,cfg:Le.spine}];for(const{key:o,bone:r,cfg:l}of a){if(!r)continue;const d=cs[o],u=eo,f=so;d.y=t(d.y,i(u*e*l.yaw,-l.yc,l.yc),l.lerp),d.x=t(d.x,i(f*s*l.pitch,-l.pc,l.pc),l.lerp);{const m=Ri[o]||{x:0,y:0};r.rotation.y=m.y+d.y,r.rotation.x=m.x+d.x}}const n=Le.eyes;for(const o of["leftEye","rightEye"]){const r=jt[o];if(!r)continue;const l=cs[o];l.y=t(l.y,i(e*n.yaw,-.35,n.yc),n.lerp),l.x=t(l.x,i(-s*n.pitch,-.25,n.pc),n.lerp),r.rotation.y+=l.y,r.rotation.x+=l.x}}let qe=!1;document.addEventListener("keydown",i=>{if(i.key!==" "&&i.key!=="Spacebar")return;const t=i.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||De()||B.isPanelOpen()||(i.preventDefault(),qe=!0,ds())});document.addEventListener("keyup",i=>{(i.key===" "||i.key==="Spacebar")&&(qe=!1)});function ds(){!nt||!_e||pe.triggerJump()&&(zt=Fi,nt=!1)}function gs(){if(!(N!=="near"||!T)){if(N="detail",B.hidePopup(),T==="meadow_island"){_e&&(pe.triggerJump(),zt=Fi*2.5,nt=!1,ht&&(ls=!0,de.killTweensOf(v.rotation),de.to(v.rotation,{y:-_._yaw,duration:.5,ease:"power2.out"}))),Oi=_._distTarget,_._distTarget=2.5,setTimeout(()=>{bt=!0,Ii=qt,nt=!0,ls=!1;for(const i of Object.values(cs))i.x=0,i.y=0;pt.open(),Oe=!0},360);return}B.openPanel(et[T],T)}}function Re(){N==="detail"&&(N="near",B.closePanel(),T&&B.showPopup(et[T]))}B.onPopupTap=gs;B.onClosePanel=Re;document.addEventListener("keydown",i=>{const t=i.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))return;const e=i.key.toLowerCase();if(i.key==="Escape"){if(Hn()){i.preventDefault();return}if(N==="detail"){Re(),i.preventDefault();return}}De()||(e==="e"&&(N==="detail"?Re():gs()),e==="m"&&!B.isPanelOpen()&&Pt.toggle())});window.addEventListener("resize",()=>{x.setSize(window.innerWidth,window.innerHeight),_.resize(window.innerWidth/window.innerHeight)});function Di(){return De()||B.isPanelOpen()}let Vs=!1;function no(){const i=Di();i!==Vs&&(Vs=i,Pi.setEnabled(!i),_.setInputEnabled(!i),i&&(qe=!1))}let Js=!1,Ut=-1;const oo=.82;function ro(i){return 1+2.6015800000000002*(i-1)**3+1.60158*(i-1)**2}const Ks=55;let $t=!1,Ys=!1,le=0,Xs=!1,Qs=!1,Te=null,Zs=!1;function hs(){if(qs||c!=null&&c.isFatal||!(c!=null&&c.isReady)||!re)return;qs=!0;const i=c.minDwellMs,t=()=>{c.beginReveal(),ho()};i>0?setTimeout(t,i):t()}async function lo(i){if(!ut||c!=null&&c.isFatal)return;$t=!0,c==null||c.beginWarmingPlay(),G("play_warm_start");const t=()=>i===le&&!(c!=null&&c.hasPlayWarmed);if(await tt(),!t()){$t=!1;return}ut.visible=!0;const e=Q+.9,s=.38,a=16,n=Math.cos(s)*a,o=Math.sin(s)*a,r=e+.75;_.camera.position.set(0,r+o,n),_.camera.lookAt(0,r,0),_.camera.updateMatrixWorld(!0),V.updateMatrixWorld(!0);const l=Q+.9;R.group.position.set(0,l,0),v.position.set(0,l,0);const d=J||!!navigator.webdriver;ht?(v.visible=!0,R.group.visible=!1):(v.visible=!1,R.group.visible=!0);const u=new ua(4,4);x.setRenderTarget(u),A.sunLight.intensity=4;try{if(t()&&!d){ht&&Et<2?(ps(!0),Et=2):!ht&&Et<1&&(ps(!1),Et=1);try{x.compile(I,_.camera)}catch(m){console.warn("Play-view compile warning:",m)}}else t()&&d&&(Et=ht?2:1);const f=d?1:3;for(let m=0;m<f&&t();m++)x.render(I,_.camera),await tt(),t()&&x.setRenderTarget(u)}finally{x.setRenderTarget(null),u.dispose(),A.sunLight.intensity=0,R.group.visible=!1,v.visible=!1,_.setLoadingView()}t()&&(G("play_warm_end"),ct("play_warm_gpu","play_warm_start","play_warm_end")),i===le&&($t=!1)}async function Ui(){var s;if(Ys||c!=null&&c.isFatal||!re||!(c!=null&&c.hasFirstFrame))return;if(c!=null&&c.hasPlayWarmed){hs();return}Ys=!0;const i=++le;new URLSearchParams(window.location.search).has("perf")&&console.log("[load] play warm start");const t=J||navigator.webdriver?3e3:2e4,e=new Promise(a=>setTimeout(a,t));try{await Promise.race([lo(i),e]),c!=null&&c.hasPlayWarmed||(console.warn("[load] play warm deadline — continuing"),le++,$t=!1,A.sunLight.intensity=0,x.setRenderTarget(null),_.setLoadingView()),c==null||c.markPlayWarmed(),(s=c==null?void 0:c.flush)==null||s.call(c)}catch(a){console.error("Play warm failed:",a),le++,$t=!1,A.sunLight.intensity=0,x.setRenderTarget(null),_.setLoadingView(),c==null||c.markPlayWarmed()}hs()}function co(i){const t=he.flushOut(),e=i.position.x,s=()=>{re||(re=!0,new URLSearchParams(window.location.search).has("perf")&&console.log("[load] arrival done → play warm"),requestAnimationFrame(()=>Ui()))};if(J){he.clear(),i.position.x=e,i.rotation.y=0,i.visible=!0,s();return}const a=Math.max(1,window.innerHeight||1),n=Math.max(1,window.innerWidth||1),r=Math.tan(ce.degToRad(_.camera.fov)/2)*_.camera.position.z*(n/a),l=e+(Number.isFinite(r)?r:40)+30;i.position.x=l,i.rotation.y=-.45,i.visible=!0;const d=Math.max(.01,l-e),u=d*.18,f=Math.min(8,Math.max(.05,(d-u)/Ks)),m=Math.min(4,Math.max(.05,2*u/Ks)),h=t?.25:0,b=de.timeline({delay:h,onComplete:s});b.to(i.position,{x:e+u,duration:f,ease:"none"},0).to(i.position,{x:e,duration:m,ease:"power2.out"}),b.to(i.rotation,{y:0,duration:f+m,ease:"sine.out"},0),setTimeout(()=>{re||(console.warn("[load] arrival failsafe"),i.position.x=e,i.rotation.y=0,s())},Math.ceil((h+f+m+1.25)*1e3))}function ho(){he.clear(),ns=!0,c==null||c.markLive(),G("loader_dismiss"),ct("time_to_dismiss","module_eval","loader_dismiss"),Me&&Me.classList.add("fade-out"),[Ht,Mt,kt,document.getElementById("touch-controls")].forEach((e,s)=>{e&&setTimeout(()=>e.classList.remove("hud-hidden"),(J?80:200)+s*120)}),setTimeout(()=>{Me&&(Me.style.display="none")},J?400:1400);const t=()=>{yn()};"requestIdleCallback"in window?requestIdleCallback(t,{timeout:1800}):setTimeout(t,800),Ae()&&setTimeout(()=>vn(),100)}const qi=new pa;let xe=0,Ee=0;const po=.7,ti=2.4,uo=1.8;let ft=0,Zt=0;const ei=new w,si=new me,ii=new me,ts=new me,mo=1.5,fo=5,_o=9;let vt=Q,Et=0;function ps(i){const t=v.visible,e=R.group.visible;_.camera.updateMatrixWorld(!0),V.updateMatrixWorld(!0),R.group.updateMatrixWorld(!0),v.updateMatrixWorld(!0),i&&ht&&v.children.length>0?(x.compile(v,_.camera,I),v.visible=!0,R.group.visible=!1):(x.compile(R.group,_.camera,I),v.visible=!1,R.group.visible=!0),x.render(I,_.camera),x.render(I,_.camera),v.visible=t,R.group.visible=e}let us=document.hidden;document.addEventListener("visibilitychange",()=>{us=document.hidden,us||qi.getDelta()});function ji(){if(requestAnimationFrame(ji),us||c!=null&&c.isFatal)return;const i=Math.min(qi.getDelta(),.05);if(xe+=i,no(),!ns){if(Ds+=i,c==null||c.nudgeDownloadFallback(Ds),c==null||c.tick(i),$t)return;R.group.visible=!1,v.visible=!1,he.update(i,J),x.render(I,_.camera),as&&ut&&We.clientWidth>0&&(as=!1,c==null||c.markFirstMeaningfulFrame(),Ui());return}if(Qt+=i,c==null||c.tick(i),Ae()&&Qt<=1.05&&(Te||(Te=[]),Te.push(i*1e3),Qt>1&&!Zs)){Zs=!0;const g=Te,S=Math.max(...g),H=g.reduce((st,rt)=>st+rt,0)/g.length;console.log(`[perf] first_1s_frames: n=${g.length} avg=${H.toFixed(1)}ms max=${S.toFixed(1)}ms`)}if(Mi&&O.preset==="auto"&&(Ce+=i*1e3,ee++,ee>=Wn)){const g=Ce/ee;ee=0,Ce=0;const S=g>Rn?Math.max(Bn,xt-.15):Math.min(O.dpr,xt+.05);Math.abs(S-xt)>.04&&(xt=S,x.setPixelRatio(xt))}const t=Di(),e=Pi.keys,s=e.has("shift"),a=po*(s?uo:1),n=t?0:(j==null?void 0:j.joyX)??0,o=t?0:(j==null?void 0:j.joyY)??0;if(j!=null&&j.takeMap()&&!t&&Pt.toggle(),j&&!t){const{dx:g,dy:S}=j.popCamDelta();(g||S)&&_.applyTouchDelta(g,S)}j!=null&&j.takeInteract()&&!De()&&(N==="detail"?Re():gs()),j!=null&&j.takeJump()&&!t&&ds();const r=o<-.15,l=o>.15,d=n<-.15,u=n>.15,f=e.has("w")||e.has("arrowup")||r,m=e.has("s")||e.has("arrowdown")||l,h=e.has("a")||e.has("arrowleft")||d,b=e.has("d")||e.has("arrowright")||u,P=f||m||h||b;P||t?Ee=0:Ee+=i,kt&&Si&&(P||t?se&&(se=!1,kt.classList.add("faded")):Ee>$n&&!se&&(se=!0,kt.classList.remove("faded")));let U=!0,E;if(oe)te=Math.min(1,te+i/Dn),V.quaternion.slerpQuaternions(wi,bi,qn(te)),te>=1&&(oe=!1),Zt*=Math.exp(-5*i);else{h&&(ft-=ti*i*(d?Math.min(1,Math.abs(n)*1.35):1)),b&&(ft+=ti*i*(u?Math.min(1,Math.abs(n)*1.35):1));const g=f?a:m?-a:0;if(Zt+=(g-Zt)*(1-Math.exp(-5*i)),Math.abs(Zt)>.001&&(ts.copy(V.quaternion),ei.set(Math.cos(ft),0,Math.sin(ft)),si.setFromAxisAngle(ei,Zt*i),V.quaternion.premultiply(si),nt&&(E=Ns(),U=!1,E-vt>mo&&(V.quaternion.copy(ts),U=!0),Ei&&!U))){rs.set(Ti,xi);const S=rs.intersectObject(ut,!0);S.length>0&&S[0].point.y>E+.25&&(V.quaternion.copy(ts),U=!0)}Ee>5&&!J&&!bt&&!t&&(ii.setFromAxisAngle(new w(0,1,0),.003),V.quaternion.premultiply(ii),U=!0)}!nt&&!bt?(zt-=to*i,qt+=zt*i,qt<=0&&(qt=0,zt=0,nt=!0,qe&&ds())):bt&&(qt=Ii),U&&(E=Ns()),!nt||oe?vt=E:E>vt?vt=Math.min(E,vt+fo*i):vt=Math.max(E,vt-_o*i);const Z=vt+qt,Ft=Math.PI-ft;_e?(pe.emotesEnabled=!bt&&!pt.isOpen(),pe.update(i,P,s,!nt),pt.isOpen()&&!vi&&ao()):R.update(i,P,xe,!nt),N!=="detail"?T?((N!=="near"||B._lastIsland!==T)&&(N="near",B._lastIsland=T,B.showPopup(et[T])),Kt.has(T)||(Kt.add(T),Pt.markVisited(T),Fs&&(Fs.textContent=String(Kt.size)),Vn.forEach((g,S)=>g.classList.toggle("hp-pip--on",S<Kt.size)),Kt.size===dt.length&&!Is&&(Is=!0,Jn(`<span class="dt-row">${z("trophy",16)}<span><strong>All 6 islands found!</strong> You've seen everything.</span></span>`,5e3)))):N==="near"&&(N="exploring",B._lastIsland=null,B.hidePopup()):(!T||T!==B._lastIsland)&&(N="exploring",B._lastIsland=null,B.closePanel(),B.hidePopup());const W=1-Math.exp(-3.5*i);if(T!==$s&&(Se=.55,$s=T),Se>0&&(Se-=i),Se>0||Hs){Hs=!1;for(let g=0;g<dt.length;g++){const S=dt[g],H=at[S];if(!H||!H.length)continue;const st=S===T,rt=st&&!et[S].noGlow?.45:0,je=st?1:.5;for(let Ne=0;Ne<H.length;Ne++){const Y=H[Ne],ge=Y.material._origColor;ge&&(Y.material.color.r+=(ge.r*je-Y.material.color.r)*W,Y.material.color.g+=(ge.g*je-Y.material.color.g)*W,Y.material.color.b+=(ge.b*je-Y.material.color.b)*W),Y.material._isFloor&&(Y.material.emissiveIntensity+=(rt-Y.material.emissiveIntensity)*W,st?Y.material.emissive.setHex(ke[S]):Y.material.emissiveIntensity<.002&&Y.material.emissive.set(0,0,0))}}}const mt=T?6:0;At.intensity+=(mt-At.intensity)*W,T&&(be.setHex(ke[T]),At.color.lerp(be,W));const yt=T?5:4;A.sunLight.intensity+=(yt-A.sunLight.intensity)*W;const p=1-Math.exp(-1.2*i);if(T){const g=dt.indexOf(T);g>=0&&(St.copy(Kn[g]),A.sunLight.position.lerp(St,p)),be.setHex(ke[T]),Xe.set(16765056).lerp(be,.18),A.sunLight.color.lerp(Xe,W)}else{const g=1-Math.exp(-2.5*i);St.set(Math.sin(ft)*55,50,-Math.cos(ft)*55),A.sunLight.position.lerp(St,g),A.sunLight.color.lerp(Xe.set(16771264),W)}{const g=Oe,S=g?1.15:.16;for(let H=0;H<is.length;H++){const st=is[H];st.emissiveIntensity+=(S-st.emissiveIntensity)*W}_._pivotYExtra+=((g?.7:0)-_._pivotYExtra)*W}if(Oe){Lt.copy(_.camera.position).sub(v.position),Lt.y=0,Lt.lengthSq()<1e-4&&Lt.set(0,0,1),Lt.normalize(),_.camera.getWorldDirection(Os),Qe.crossVectors(Os,Xn).normalize(),Yt.set(v.position.x,v.position.y+1.4,v.position.z);const g=8,S=8,H=5.5,st=.7;St.copy(Yt).addScaledVector(Lt,g).addScaledVector(Qe,-H),St.y=v.position.y+S,A.sunLight.position.lerp(St,p),A.sunLight.target.position.lerp(Yt,p),A.sunLight.target.updateMatrixWorld(),A.sunLight.intensity+=(st-A.sunLight.intensity)*W;const rt=A.presentationSun2;Ze.copy(Yt).addScaledVector(Lt,g).addScaledVector(Qe,H),Ze.y=v.position.y+S,rt.position.lerp(Ze,p),rt.target.position.copy(Yt),rt.target.updateMatrixWorld(),rt.color.copy(A.sunLight.color),rt.intensity+=(st-rt.intensity)*W}else A.sunLight.target.position.lerp(Yn,p),A.sunLight.target.updateMatrixWorld(),A.presentationSun2.intensity+=(0-A.presentationSun2.intensity)*W;const k=N==="detail"||pt.isOpen();x.shadowMap.autoUpdate=!k,Ci.update(xe,0),k||(J||Ai.update(i),wt.update(i,xe,J),Ue.update(i,T,Z,J,Pe)),_.update(i,Q,Z,-1,null,V,ft,P);const C=ns;let M=1,q=0,D=0;if(C&&!Js&&(Ut=0),Js=C,!C)Ut=-1,R.group.scale.setScalar(1),v.scale.setScalar(1),R.group.visible=!1,v.visible=!1;else{const g=ht;if(R.group.visible=!g,v.visible=!0,Ut>=0){Ut+=i;const S=Math.min(1,Ut/oo),H=ro(S);M=Math.max(.04,H),q=(1-S)*(1-S)*2.4,D=Math.sin(S*Math.PI*3.25)*(1-S)*1.05,S>=1&&(Ut=-1,M=1,q=0,D=0)}}bt||(v.position.set(0,Z+q,0),v.scale.setScalar(M),R.group.position.set(0,Z+q,0),R.group.scale.setScalar(M),ls||(v.rotation.y=Ft+D,R.group.rotation.y=Ft+D)),ut&&ht&&Et<2&&Qt>2.5&&(ps(!0),Et=2);const It=J||_._introKBlend>=1||Qt>2.2;if(It&&!Xs){Xs=!0,Qn();const g=()=>{var S;return(S=wt==null?void 0:wt.enableDeferred)==null?void 0:S.call(wt,O.skyTier)};"requestIdleCallback"in window?requestIdleCallback(g,{timeout:1500}):setTimeout(g,200)}if(It&&!Qs){Qs=!0;const g=!!localStorage.getItem("phf-intro-seen");Nn.open(g)}x.render(I,_.camera)}ji();
