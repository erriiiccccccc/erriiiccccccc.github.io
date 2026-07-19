const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./sky-deferred-BDlVC7_J.js","./three-kpKb0UD-.js"])))=>i.map(i=>d[i]);
import{e as ne,f as z,d as xe,A as ht,P as zs,G as A,h as ee,V as v,a as et,M as b,B as Oe,b as Ti,S as K,c as Zt,I as Ut,i as $,j as Ei,k as Re,C as xi,T as ki,l as de,m as rs,n as Be,o as Ci,p as Ai,q as Pi,r as Fi,s as Ii,L as Oi,t as ls,u as cs,F as Hs,g as Ri,v as Bi,w as Di,D as $s,x as Wi,R as Ui,W as ji,y as Gs,z as Vs,E as qi,H as Ni,J as zi,K as is,N as Hi,O as Js,U as $i,X as Gi,Y as St,Z as Vi,_ as Ji,$ as Ki,a0 as oe,a1 as Yi,a2 as Xi,a3 as Qi}from"./three-kpKb0UD-.js";import{s as N,i as Zi,C as ta,E as ea,a as sa,P as ia,b as aa,T as na}from"./islands-ClYB82yH.js";import{i as oa,T as ra}from"./travel-DWeBpQJt.js";import{g as se}from"./gsap-C8pce-KX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();class la{constructor(){const e=new Float32Array(5400),s=new Float32Array(1800),a=new Float32Array(1800),n=new Float32Array(1800),o=new Float32Array(1800*3);for(let l=0;l<1800;l++){const c=160+Math.random()*60,u=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1);e[l*3]=c*Math.sin(f)*Math.cos(u),e[l*3+1]=c*Math.sin(f)*Math.sin(u),e[l*3+2]=c*Math.cos(f),s[l]=Math.random()*Math.PI*2,a[l]=.6+Math.random()*2.8,n[l]=1.2+Math.random()*2.8;const y=Math.random();y<.15?(o[l*3]=.75,o[l*3+1]=.88,o[l*3+2]=1):y<.27?(o[l*3]=1,o[l*3+1]=.93,o[l*3+2]=.65):(o[l*3]=1,o[l*3+1]=1,o[l*3+2]=1)}const r=new ne;r.setAttribute("position",new z(e,3)),r.setAttribute("phase",new z(s,1)),r.setAttribute("speed",new z(a,1)),r.setAttribute("baseSize",new z(n,1)),r.setAttribute("color",new z(o,3)),this._mat=new xe({uniforms:{time:{value:0}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:ht}),this.points=new zs(r,this._mat)}update(t){this._mat.uniforms.time.value=t}}const ca=2,ds=[7234136,8022620,6051408,8613983],da=[[14706748,11026462],[14262366,11565120],[8365768,5140110],[12567756,8159884]],Ks=i=>i[Math.random()*i.length|0];function ha(i,t,e,s=.24){const a=i.attributes.position,n=new Float32Array(a.count*3),o=new $(t),r=new $(e),l=new $;for(let c=0;c<a.count;c++)l.copy(Math.random()<s?r:o),n[c*3]=l.r,n[c*3+1]=l.g,n[c*3+2]=l.b;i.setAttribute("color",new z(n,3))}function pa(i){const t=new Ut(i,0),e=t.attributes.position;for(let s=0;s<e.count;s++){const a=.7+Math.random()*.6;e.setXYZ(s,e.getX(s)*a,e.getY(s)*a,e.getZ(s)*a)}return t.computeVertexNormals(),t}function ua(){const i=new A,t=new et({color:13225430,flatShading:!0,roughness:.55,metalness:.35,emissive:1711398,emissiveIntensity:.6});i.add(new b(new Oe(1.4,1.4,2.2),t));const e=new et({color:2845951,flatShading:!0,roughness:.4,metalness:.2,emissive:661568,emissiveIntensity:.9});for(const a of[-1,1]){const n=new b(new Oe(3.2,.1,1.7),e);n.position.x=a*2.6,i.add(n);const o=new b(new Oe(1.2,.12,.12),t);o.position.x=a*1.2,i.add(o)}const s=new b(new Ti(.6,.55,10,1,!0),t);return s.rotation.x=Math.PI/2,s.position.z=1.5,i.add(s),{obj:i,radius:3.6}}function ma(){const i=new A,t=new et({color:10134450,flatShading:!0,roughness:.45,metalness:.45,emissive:1316639,emissiveIntensity:.6}),e=new b(new K(2.6,18,12),t);e.scale.set(1,.34,1),i.add(e);const s=new b(new K(1.25,16,12,0,Math.PI*2,0,Math.PI/2),new et({color:8189392,flatShading:!0,transparent:!0,opacity:.82,emissive:1792586,emissiveIntensity:1}));s.position.y=.45,i.add(s);const a=new Zt({color:16765803});for(let n=0;n<6;n++){const o=n/6*Math.PI*2,r=new b(new K(.18,8,8),a);r.position.set(Math.cos(o)*1.85,-.32,Math.sin(o)*1.85),i.add(r)}return{obj:i,radius:2.9}}function fa(){const i=3.4+Math.random()*3,[t,e]=Ks(da),s=new Ut(i,2);return ha(s,t,e,.22),{obj:new b(s,new et({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:1575428,emissiveIntensity:.45})),radius:i}}function _a(){const i=new A,t=4+(Math.random()*3|0);for(let e=0;e<t;e++){const s=.6+Math.random()*1.3,a=new b(pa(s),new et({color:ds[e%ds.length],flatShading:!0,roughness:1,metalness:0,emissive:657934,emissiveIntensity:.5}));a.position.set((Math.random()-.5)*7,(Math.random()-.5)*5,(Math.random()-.5)*7),i.add(a)}return{obj:i,radius:5.5}}const va=[ua,ma,fa,_a];class ga{constructor(t){this.cam=t,this.group=new A,this._active=[],this._cooldown=0,this._spawning=!0}_visibleHalf(t){const e=this.cam.position.z-t,s=Math.tan(ee.degToRad(this.cam.fov)/2)*e;return{halfH:s,halfW:s*(window.innerWidth/window.innerHeight)}}_spawn(){const{obj:t,radius:e}=Ks(va)(),s=-6+Math.random()*28,{halfW:a,halfH:n}=this._visibleHalf(s),o=(Math.random()-.5)*.7*n;t.position.set(a+e+1,o,s),t.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),this.group.add(t),this._active.push({obj:t,radius:e,baseY:o,vx:-(9+Math.random()*13),spin:new v((Math.random()-.5)*.7,(Math.random()-.5)*.7,(Math.random()-.5)*.7),bobF:.6+Math.random()*1.1,bobA:.3+Math.random()*.9,age:Math.random()*10,deathX:-(a+e+4)})}update(t,e=!1){if(!e){for(let s=this._active.length-1;s>=0;s--){const a=this._active[s];a.age+=t,a.obj.position.x+=a.vx*t,a.obj.position.y=a.baseY+Math.sin(a.age*a.bobF)*a.bobA,a.obj.rotation.x+=a.spin.x*t,a.obj.rotation.y+=a.spin.y*t,a.obj.rotation.z+=a.spin.z*t,a.obj.position.x<a.deathX&&(this._disposeObj(a.obj),this._active.splice(s,1))}this._spawning&&(this._cooldown-=t,this._cooldown<=0&&this._active.length<ca&&(this._spawn(),this._cooldown=.45+Math.random()*1.2))}}flushOut(){this._spawning=!1;for(const t of this._active)t.vx=-Math.max(55,Math.abs(t.vx)*2.6),t.bobA*=.35,t.spin.multiplyScalar(1.5);return this._active.length>0}clear(){var t,e;this._spawning=!1;for(const s of this._active)this._disposeObj(s.obj);this._active.length=0,(e=(t=this.group).clear)==null||e.call(t)}_disposeObj(t){this.group.remove(t),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class ya{constructor(){this.sceneGroup=new A,this.sunGroup=new A;const t=new Ei(15259880,.75);this.sceneGroup.add(t);const e=new Re(16770764,.28);e.position.set(30,40,20),this.sceneGroup.add(e),this.sunLight=new Re(16765056,0),this.sunLight.position.set(50,40,20),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=300,this.sunLight.shadow.camera.left=-50,this.sunLight.shadow.camera.right=50,this.sunLight.shadow.camera.top=50,this.sunLight.shadow.camera.bottom=-50,this.sceneGroup.add(this.sunLight),this.sceneGroup.add(this.sunLight.target),this.presentationSun2=new Re(16765056,0),this.sceneGroup.add(this.presentationSun2),this.sceneGroup.add(this.presentationSun2.target)}}const De=i=>new et({color:i}),Q=i=>new et({color:i,flatShading:!0});class ba{constructor(){this.group=new A,this._stride=0,this._headGroup=new A,this._headGroup.position.y=.82;const t=new b(new K(.22,14,10),De(16768437)),e=De(1710638),s=new b(new K(.04,7,5),e);s.position.set(-.1,.04,.18);const a=s.clone();a.position.x=.1;const n=De(16755336),o=new b(new K(.05,6,4),n);o.position.set(-.15,-.04,.17);const r=o.clone();r.position.x=.15,this._headGroup.add(t,s,a,o,r);const l=new b(new K(.26,10,8),Q(16766287));l.position.set(0,.97,.03),l.scale.set(1,.72,.95);const c=new b(new K(.13,7,5),Q(16766287));c.position.set(0,1.02,.18),c.scale.set(.9,.7,.7);const u=new b(new xi(.16,.2,.52,7),Q(4431943));u.position.y=.3;const f=Q(16766720);[-.05,.05,.15].forEach(E=>{const g=new b(new K(.025,5,4),f);g.position.set(0,E+.22,.18),this.group.add(g)});const y=Q(16766720),p=new b(new K(.1,6,4),y);p.position.set(-.25,.54,0),p.scale.set(1.1,.45,1);const M=p.clone();M.position.x=.25,this._scarfGroup=new A;const C=new b(new ki(.155,.048,7,12),Q(16776679));C.position.y=.62,C.rotation.x=Math.PI/2;const D=new b(new de(.046,.3,2,7),Q(16776679));D.position.set(-.08,.43,-.13),D.rotation.x=-.3;const x=new b(new de(.046,.24,2,7),Q(16776679));x.position.set(.08,.39,-.15),x.rotation.x=-.36,this._scarfGroup.add(C,D,x),this._armLPivot=new A,this._armLPivot.position.set(-.25,.52,0);const Y=new b(new de(.068,.26,2,7),Q(4431943));Y.position.y=-.18,this._armLPivot.add(Y),this._armRPivot=new A,this._armRPivot.position.set(.25,.52,0),this._armRPivot.add(Y.clone()),this._hips=new A,this._hips.position.y=-.14;const At=new de(.078,.3,2,7),B=Q(1713022);this._legLPivot=new A,this._legLPivot.position.x=-.11;const rt=new b(At,B);rt.position.y=-.24,this._legLPivot.add(rt),this._legRPivot=new A,this._legRPivot.position.x=.11,this._legRPivot.add(rt.clone());const mt=Q(2171169),h=new b(new K(.095,7,5),mt);h.position.set(-.11,-.52,.04),h.scale.set(1,.6,1.25);const T=h.clone();T.position.x=.11,this._hips.add(this._legLPivot,this._legRPivot,h,T),this.group.add(u,p,M,this._scarfGroup,this._headGroup,l,c,this._armLPivot,this._armRPivot,this._hips),this.group.traverse(E=>{E.isMesh&&(E.castShadow=!0)})}update(t,e,s,a=!1){if(a){this._legLPivot.rotation.x=-.7,this._legRPivot.rotation.x=-.7,this._armLPivot.rotation.x=-1,this._armRPivot.rotation.x=-1,this._armLPivot.rotation.z=-.75,this._armRPivot.rotation.z=.75,this._scarfGroup.rotation.x=-.55,this._headGroup.rotation.x=.1,this.group.rotation.z=0,this._hips.position.y=-.14;return}this._armLPivot.rotation.z=0,this._armRPivot.rotation.z=0,this._scarfGroup.rotation.x=0,this._headGroup.rotation.x=0,e&&(this._stride+=t*4.5);const n=Math.sin(this._stride)*(e?.55:.03);this._legLPivot.rotation.x=-n,this._legRPivot.rotation.x=n,this._armLPivot.rotation.x=n*.65,this._armRPivot.rotation.x=-n*.65,this._scarfGroup.rotation.x=e?Math.sin(this._stride*2)*.09:0,this.group.rotation.z=e?0:Math.sin(s*.6)*.025,this._hips.position.y=-.14+Math.abs(Math.sin(this._stride*2))*.03}}class wa{constructor(){this.keys=new Set,this._enabled=!0,window.addEventListener("keydown",t=>{if(!this._enabled)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||this.keys.add(t.key.toLowerCase())}),window.addEventListener("keyup",t=>{this.keys.delete(t.key.toLowerCase())}),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.keys.clear()})}setEnabled(t){this._enabled=!!t,t||this.keys.clear()}}class Ma{constructor(){this._joyX=0,this._joyY=0,this._joyTouchId=null,this._joyOrigin={x:0,y:0},this.JOY_RADIUS=52,this._camTouchId=null,this._camLastX=0,this._camLastY=0,this._pendingCamDx=0,this._pendingCamDy=0,this._pendingJump=!1,this._pendingInteract=!1,this._pendingMap=!1,this._buildUI(),this._bindEvents()}_buildUI(){const t=document.createElement("div");t.id="touch-controls",t.innerHTML=`
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
        <button class="touch-btn touch-btn--map"  id="touch-map-btn"  aria-label="World Map">${N("map",20)}</button>
        <button class="touch-btn touch-btn--jump" id="touch-jump-btn" aria-label="Jump">↑</button>
        <button class="touch-btn touch-btn--e"    id="touch-e-btn"    aria-label="Explore">E</button>
      </div>
    `,document.body.appendChild(t),this._el=t,this._joyHint=t.querySelector("#joy-hint"),this._joyBase=t.querySelector("#joy-base"),this._joyThumb=t.querySelector("#joy-thumb")}_bindEvents(){document.addEventListener("touchstart",e=>{for(const s of e.changedTouches)this._joyTouchId===null&&(e.target.closest("#touch-btns, #touch-buttons")||s.clientX>window.innerWidth*.52||(this._joyTouchId=s.identifier,this._joyOrigin.x=s.clientX,this._joyOrigin.y=s.clientY,this._placeJoystick(s.clientX,s.clientY)))},{passive:!0}),document.addEventListener("touchstart",e=>{for(const s of e.changedTouches)this._camTouchId===null&&s.identifier!==this._joyTouchId&&(e.target.closest("#touch-btns, #touch-buttons")||s.clientX>window.innerWidth*.42&&(this._camTouchId=s.identifier,this._camLastX=s.clientX,this._camLastY=s.clientY))},{passive:!0}),document.addEventListener("touchmove",e=>{for(const s of e.changedTouches)if(s.identifier===this._joyTouchId){const a=s.clientX-this._joyOrigin.x,n=s.clientY-this._joyOrigin.y,o=Math.min(Math.hypot(a,n),this.JOY_RADIUS),r=Math.atan2(n,a);this._joyX=o/this.JOY_RADIUS*Math.cos(r),this._joyY=o/this.JOY_RADIUS*Math.sin(r),this._joyThumb.style.transform=`translate(${Math.cos(r)*o}px, ${Math.sin(r)*o}px)`}else s.identifier===this._camTouchId&&(this._pendingCamDx+=s.clientX-this._camLastX,this._pendingCamDy+=s.clientY-this._camLastY,this._camLastX=s.clientX,this._camLastY=s.clientY)},{passive:!0});const t=e=>{for(const s of e.changedTouches)s.identifier===this._joyTouchId&&(this._joyTouchId=null,this._joyX=0,this._joyY=0,this._joyThumb.style.transform="",this._hideJoystick()),s.identifier===this._camTouchId&&(this._camTouchId=null)};document.addEventListener("touchend",t,{passive:!0}),document.addEventListener("touchcancel",t,{passive:!0}),this._btn("#touch-jump-btn",()=>{this._pendingJump=!0}),this._btn("#touch-e-btn",()=>{this._pendingInteract=!0}),this._btn("#touch-map-btn",()=>{this._pendingMap=!0})}_btn(t,e){const s=this._el.querySelector(t);s&&(s.addEventListener("touchstart",a=>{a.preventDefault(),e()},{passive:!1}),s.addEventListener("click",a=>a.stopPropagation()))}_placeJoystick(t,e){const s=this.JOY_RADIUS+4,a=8,n=Math.max(a+s,Math.min(window.innerWidth*.52-a-s,t))-s,o=Math.max(a+s,Math.min(window.innerHeight-a-s,e))-s,r=(s+4)*2;this._joyBase.style.left=n+"px",this._joyBase.style.top=o+"px",this._joyBase.style.width=r+"px",this._joyBase.style.height=r+"px",this._joyBase.classList.add("active"),this._joyHint.classList.add("joy-hint--hidden")}_hideJoystick(){this._joyBase.classList.remove("active"),this._joyHint.classList.remove("joy-hint--hidden")}get joyX(){return this._joyX}get joyY(){return this._joyY}popCamDelta(){const t=this._pendingCamDx,e=this._pendingCamDy;return this._pendingCamDx=0,this._pendingCamDy=0,{dx:t,dy:e}}takeJump(){return this._pendingJump?(this._pendingJump=!1,!0):!1}takeInteract(){return this._pendingInteract?(this._pendingInteract=!1,!0):!1}takeMap(){return this._pendingMap?(this._pendingMap=!1,!0):!1}}const _={IDLE:"idle",WALK:"walk",RUN:"run",JUMP:"jump",WALK_JUMP:"walkJump",RUN_JUMP:"runJump",EMOTE:"emote"},We=new Set([_.JUMP,_.WALK_JUMP,_.RUN_JUMP]),Ge={IDLE_TO_WALK:.2,WALK_TO_IDLE:.3,WALK_TO_RUN:.2,RUN_TO_WALK:.25,RUN_TO_IDLE:.1,IDLE_TO_RUN:.22,IDLE_TO_JUMP:.12,WALK_TO_WALKJUMP:.1,RUN_TO_RUNJUMP:.08,JUMP_TO_IDLE:.38,JUMP_TO_WALK:.28,JUMP_TO_RUN:.22,WALKJUMP_TO_IDLE:.35,WALKJUMP_TO_WALK:.25,WALKJUMP_TO_RUN:.2,RUNJUMP_TO_IDLE:.32,RUNJUMP_TO_WALK:.25,RUNJUMP_TO_RUN:.18,IDLE_TO_EMOTE:.2,EMOTE_TO_IDLE:.28},Pt=(i,t)=>Ge[`${i.toUpperCase()}_TO_${t.toUpperCase()}`]??.22,hs=9,Sa=16;class La{constructor(){this.mixer=null,this.ready=!1,this._state=_.IDLE,this._action=null,this._finishCb=null,this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._emotes=[],this.emotesEnabled=!0,this._anims={idle:null,walk:null,run:null,jump:null,walkJump:null,runJump:null,walkStart:null,runToStop:null,lookAround:null,lookAround2:null,wave:null}}get state(){return this._state}get isAirborne(){return We.has(this._state)}get isReady(){return this.ready}async load(t,e,s,{skipAnims:a=!1}={}){if(this.mixer=new rs(t),a){this._state=_.IDLE,this.ready=!0;return}const n=r=>new Promise((l,c)=>e.load(r,l,void 0,c)),o=[["breathingidle.fbx","idle"],["walking.fbx","walk"],["running.fbx","run"],["idlejump.fbx","jump"],["walkingjump.fbx","walkJump"],["runningjump.fbx","runJump"],["walkstart.fbx","walkStart"],["runtostop.fbx","runToStop"],["lookingaround.fbx","lookAround"],["lookingaround2.fbx","lookAround2"],["wave.fbx","wave"]];await Promise.allSettled(o.map(([r,l])=>n(s+r).then(c=>{this._stripRootMotion(c.animations),this._anims[l]=this.mixer.clipAction(c.animations[0])}).catch(c=>console.warn(`[AnimCtrl] ${r} failed:`,c)))),this._anims.idle&&(this._anims.idle.setLoop(Be),this._anims.idle.play(),this._action=this._anims.idle),this._state=_.IDLE,this.ready=!0}loadGlbClips(t,e){this.mixer=new rs(t);const s=e.idle||this._makeBindPoseClip(t);this._anims.idle=this.mixer.clipAction(s);for(const a of["walk","run"]){const n=e[a];n&&(this._stripRootMotion([n]),this._anims[a]=this.mixer.clipAction(n))}Array.isArray(e.emotes)&&(this._stripRootMotion(e.emotes),this._emotes=e.emotes.map(a=>this.mixer.clipAction(a))),this._anims.idle.setLoop(Be),this._anims.idle.play(),this._action=this._anims.idle,this._state=_.IDLE,this.ready=!0}_makeBindPoseClip(t){const e=[];return t.traverse(s=>{if(!s.isBone)return;const a=s.quaternion,n=s.position;e.push(new Ci(`${s.name}.quaternion`,[0,1],[a.x,a.y,a.z,a.w,a.x,a.y,a.z,a.w])),e.push(new Ai(`${s.name}.position`,[0,1],[n.x,n.y,n.z,n.x,n.y,n.z]))}),new Pi("idleStatic",1,e)}update(t,e,s,a){if(!this.ready||!this.mixer)return;if(this.mixer.update(t),We.has(this._state)){a||this._land(e,s);return}if(this._state===_.EMOTE){e&&this._interruptEmote(e,s);return}const n=e&&s?_.RUN:e?_.WALK:_.IDLE;if(n!==this._state){const o=this._state;this._state=n,this._transitionGround(o,n)}this._state===_.IDLE&&this.emotesEnabled?(this._idleTimer+=t,this._idleTimer>=this._emoteDelay&&(this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._playEmote())):this._idleTimer=0}triggerJump(){if(!this.ready||We.has(this._state))return!1;const t=this._state===_.EMOTE?_.IDLE:this._state;if(this._clearFinishCb(),t===_.RUN){const e=this._anims.runJump??this._anims.jump;this._crossFadeOnce(e,Pt(_.RUN,_.RUN_JUMP),1.2),this._state=_.RUN_JUMP}else if(t===_.WALK){const e=this._anims.walkJump??this._anims.jump;this._crossFadeOnce(e,Pt(_.WALK,_.WALK_JUMP),1.3),this._state=_.WALK_JUMP}else this._crossFadeOnce(this._anims.jump,Pt(_.IDLE,_.JUMP),1.4),this._state=_.JUMP;return!0}_land(t,e){this._clearFinishCb();const s=t&&e?_.RUN:t?_.WALK:_.IDLE,a=Pt(this._state,s);this._state=s,this._crossFadeLoop(this._anims[s],a)}_transitionGround(t,e){if(this._clearFinishCb(),t===_.RUN&&e===_.IDLE&&this._anims.runToStop){this._playOnceThenLoop(this._anims.runToStop,this._anims.idle,Pt(t,e),.2);return}this._crossFadeLoop(this._anims[e],Pt(t,e))}_playOnceThenLoop(t,e,s,a){const n=t;this._crossFadeOnce(t,s,1),this._finishCb=o=>{o.action===n&&(this._clearFinishCb(),this._action===n&&this._crossFadeLoop(e,a))},this.mixer.addEventListener("finished",this._finishCb)}_playEmote(){const t=this._emotes.filter(Boolean);if(!t.length)return;const e=t[Math.floor(Math.random()*t.length)];this._state=_.EMOTE,this._crossFadeOnce(e,Ge.IDLE_TO_EMOTE,1),this._finishCb=s=>{s.action===e&&(this._clearFinishCb(),this._state===_.EMOTE&&(this._state=_.IDLE,this._crossFadeLoop(this._anims.idle,Ge.EMOTE_TO_IDLE)))},this.mixer.addEventListener("finished",this._finishCb)}_interruptEmote(t,e){this._clearFinishCb();const s=t&&e?_.RUN:_.WALK;this._state=s,this._crossFadeLoop(this._anims[s],.22)}_clearFinishCb(){this._finishCb&&(this.mixer.removeEventListener("finished",this._finishCb),this._finishCb=null)}_crossFadeLoop(t,e){if(t){if(t===this._action){t.isRunning()||t.play();return}t.reset(),t.setLoop(Be),t.setEffectiveWeight(1),t.play(),this._action&&this._action.crossFadeTo(t,e,!0),this._action=t}}_crossFadeOnce(t,e,s=1){t&&(t.reset(),t.setLoop(Fi,1),t.clampWhenFinished=!0,t.timeScale=s,t.setEffectiveWeight(1),t.play(),this._action&&this._action.crossFadeTo(t,e,!0),this._action=t)}_stripRootMotion(t){for(const e of t)e.tracks=e.tracks.filter(s=>{const a=s.name.toLowerCase();return!(a.endsWith(".position")&&(a.includes("hips")||a.includes("hip")||a.includes("root")))})}_randEmoteDelay(){return hs+Math.random()*(Sa-hs)}}const he=16,Nt=.38,ps=.05,us=1.1,Ta=3.5,Ea=12,xa=22,ka=.9,Ca=.55,Aa=.4;function ms(i){const t=Math.min(1,Math.max(0,i));return t*t*(3-2*t)}class Pa{constructor(t){this.camera=new Ii(65,t,.1,2e3),this._camPos=new v,this._pivot=new v,this._pivotSmooth=new v;const e=25,s=Math.cos(Nt)*he*3,a=Math.sin(Nt)*he*3;this.camera.position.set(0,e+a,s),this._pivotSmooth.set(0,e+.75,0),this._yaw=0,this._pitch=Nt,this._yawTarget=0,this._pitchTarget=Nt,this._dist=he,this._distTarget=he,this._pivotYExtra=0,this._inputEnabled=!0,window.addEventListener("wheel",n=>{this._inputEnabled&&(this._distTarget=Math.max(3,Math.min(60,this._distTarget+n.deltaY*.02)))},{passive:!0}),this._rmbDown=!1,this._lastMx=0,this._lastMy=0,this._snapTimer=0,window.addEventListener("mousedown",n=>{n.button!==2||!this._inputEnabled||(this._rmbDown=!0,this._lastMx=n.clientX,this._lastMy=n.clientY,this._snapTimer=0)}),window.addEventListener("mouseup",n=>{n.button===2&&(this._rmbDown=!1)}),window.addEventListener("mousemove",n=>{if(!this._rmbDown||!this._inputEnabled)return;const o=n.clientX-this._lastMx,r=n.clientY-this._lastMy;this._yawTarget-=o*.005,this._pitchTarget=Math.max(ps,Math.min(us,this._pitchTarget+r*.004)),this._lastMx=n.clientX,this._lastMy=n.clientY,this._snapTimer=0}),window.addEventListener("contextmenu",n=>{n.target&&n.target.id==="canvas"&&n.preventDefault()}),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}resize(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}setInputEnabled(t){this._inputEnabled=!!t,t||(this._rmbDown=!1)}applyTouchDelta(t,e){this._inputEnabled&&(this._yawTarget-=t*.005,this._pitchTarget=Math.max(ps,Math.min(us,this._pitchTarget+e*.004)),this._snapTimer=0)}setLoadingView(){this.camera.position.set(0,0,52),this.camera.lookAt(0,0,0),this._pivotSmooth.set(0,0,0),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}update(t,e,s,a,n,o,r=0,l=!1){if(l&&!this._rmbDown){if(this._snapTimer+=t,this._snapTimer>.3){let x=r-this._yawTarget;for(;x>Math.PI;)x-=Math.PI*2;for(;x<-Math.PI;)x+=Math.PI*2;this._yawTarget+=x*(1-Math.exp(-4*t)),this._pitchTarget+=(Nt-this._pitchTarget)*(1-Math.exp(-3*t))}}else if(l||(this._snapTimer=0),!this._rmbDown&&!l){let x=r-this._yawTarget;for(;x>Math.PI;)x-=Math.PI*2;for(;x<-Math.PI;)x+=Math.PI*2;this._yawTarget+=x*(1-Math.exp(-2*t))}this._yaw+=(this._yawTarget-this._yaw)*(1-Math.exp(-14*t)),this._pitch+=(this._pitchTarget-this._pitch)*(1-Math.exp(-14*t)),this._dist+=(this._distTarget-this._dist)*(1-Math.exp(-8*t));const c=s+.75+this._pivotYExtra;this._pivot.set(0,c,0);const u=Math.cos(this._pitch)*this._dist,f=Math.sin(this._pitch)*this._dist;this._camPos.set(this._pivot.x-Math.sin(this._yaw)*u,this._pivot.y+f,this._pivot.z+Math.cos(this._yaw)*u),(this.camera.position.distanceToSquared(this._camPos)<xa||this._introKBlend>0)&&(this._introKBlend=Math.min(1,this._introKBlend+t/ka)),this._introElapsed+=t;const p=ee.lerp(Aa,1,ms(this._introElapsed/Ca)),M=ee.lerp(Ta,Ea,ms(this._introKBlend))*p,C=1-Math.exp(-M*t);this._pivotSmooth.lerp(this._pivot,C);const D=1-Math.exp(-M*t);this.camera.position.lerp(this._camPos,D),this.camera.lookAt(this._pivotSmooth),this.characterRevealReady=this._introKBlend>0}}const Ue=155,zt=28,Fa=22;function Ia(){const i=Math.random()*Math.PI*2,t=.05+Math.random()*.55;return new v(Ue*Math.sin(t)*Math.cos(i),Ue*Math.cos(t),Ue*Math.sin(t)*Math.sin(i))}function Oa(){const i=Math.random()*Math.PI*2;return new v(Math.cos(i),-.12-Math.random()*.25,Math.sin(i)).normalize()}class Ra{constructor(){this.group=new A,this._active=[],this._nextSpawn=4+Math.random()*6,this._shaderMat=new xe({vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:ht})}_spawn(){const t=Ia(),e=Oa(),s=.7+Math.random()*.7,a=70+Math.random()*60,n=new Float32Array(zt*3),o=new Float32Array(zt);for(let c=0;c<zt;c++)n[c*3]=t.x,n[c*3+1]=t.y,n[c*3+2]=t.z;const r=new ne;r.setAttribute("position",new z(n,3)),r.setAttribute("alpha",new z(o,1));const l=new Oi(r,this._shaderMat.clone());this.group.add(l),this._active.push({line:l,geo:r,origin:t.clone(),dir:e,progress:0,lifetime:s,speed:a})}update(t){this._nextSpawn-=t,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=5+Math.random()*12);for(let e=this._active.length-1;e>=0;e--){const s=this._active[e];s.progress+=t;const a=s.progress/s.lifetime,n=s.speed*s.progress,o=s.geo.attributes.position.array,r=s.geo.attributes.alpha.array,l=a<.12?a/.12:a>.72?(1-a)/.28:1,c=s.origin.x+s.dir.x*n,u=s.origin.y+s.dir.y*n,f=s.origin.z+s.dir.z*n;for(let y=0;y<zt;y++){const p=y/(zt-1),M=p*Fa;o[y*3]=c-s.dir.x*M,o[y*3+1]=u-s.dir.y*M,o[y*3+2]=f-s.dir.z*M,r[y]=Math.pow(1-p,1.6)*l*.95}s.geo.attributes.position.needsUpdate=!0,s.geo.attributes.alpha.needsUpdate=!0,s.progress>=s.lifetime&&(this.group.remove(s.line),s.geo.dispose(),s.line.material.dispose(),this._active.splice(e,1))}}}const Ba="modulepreload",Da=function(i,t){return new URL(i,t).href},fs={},pe=function(t,e,s){let a=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=Promise.allSettled(e.map(c=>{if(c=Da(c,s),c in fs)return;fs[c]=!0;const u=c.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!s)for(let M=o.length-1;M>=0;M--){const C=o[M];if(C.href===c&&(!u||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Ba,u||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),u)return new Promise((M,C)=>{p.addEventListener("load",M),p.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return a.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})},Wa=new v(-44,48,-166);function _s(i="rgba(255,250,210,1)",t="rgba(255,180,80,0)"){const s=document.createElement("canvas");s.width=s.height=256;const a=s.getContext("2d"),n=a.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);n.addColorStop(0,i),n.addColorStop(.25,i),n.addColorStop(1,t),a.fillStyle=n,a.fillRect(0,0,256,256);const o=new Bi(s);return o.colorSpace=Di,o}class Ua{constructor(){this.group=new A,this._pos=Wa.clone(),this._t=0,this._core=new A,this._core.position.copy(this._pos),this.group.add(this._core),this._glows=[];const t=new ls(new cs({map:_s("rgba(255,248,200,0.95)","rgba(255,170,70,0)"),transparent:!0,depthWrite:!1,blending:ht}));t.scale.setScalar(46);const e=new ls(new cs({map:_s("rgba(255,200,110,0.55)","rgba(255,120,40,0)"),transparent:!0,depthWrite:!1,blending:ht}));e.scale.setScalar(95),this._core.add(e,t),this._glows.push({sprite:t,base:46},{sprite:e,base:95});const s=new b(new Ut(6,2),new Zt({color:16776172,flatShading:!0}));this._core.add(s);const a=new b(new K(6.1,24,24),new Zt({color:16773312,transparent:!0,opacity:.55,depthWrite:!1,blending:ht,side:Hs}));this._core.add(a),this._halos=[this._halo(7.6,16773024,.4),this._halo(10,16763989,.2),this._halo(15,16755251,.09)],this._haloBase=this._halos.map(n=>n.material.opacity),this._halos.forEach(n=>this._core.add(n))}_halo(t,e,s){return new b(new K(t,18,18),new Zt({color:e,transparent:!0,opacity:s,depthWrite:!1,blending:ht,side:Ri}))}update(t,e,s=!1){if(s)return;this._t=e;const a=1+Math.sin(e*.6)*.035;this._core.scale.setScalar(a);const n=1+Math.sin(e*.6+.4)*.06;for(const o of this._glows)o.sprite.scale.setScalar(o.base*n);for(let o=0;o<this._halos.length;o++){const r=.85+.15*Math.sin(e*(.5+o*.18)+o);this._halos[o].material.opacity=this._haloBase[o]*r}}}const ja=[[230,200,8141549,3874406,.16],[240,230,16740277,4857429,.12],[225,180,3828735,1318485,.13],[245,260,10181887,2757968,.1],[220,150,16753226,4859152,.08]],qa=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Na=`
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
`;class za{constructor(){this.group=new A,this._mats=[];for(const[t,e,s,a,n]of ja){const o=new xe({uniforms:{colorA:{value:new $(s)},colorB:{value:new $(a)},opacity:{value:n},time:{value:Math.random()*100}},vertexShader:qa,fragmentShader:Na,transparent:!0,depthWrite:!1,blending:ht,side:$s}),r=new b(new Wi(e,e),o),l=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);r.position.set(t*Math.sin(c)*Math.cos(l),t*Math.cos(c)*.7,t*Math.sin(c)*Math.sin(l)),r.lookAt(0,0,0),r.rotation.z=Math.random()*Math.PI*2,r.userData.spin=(Math.random()-.5)*.01,this.group.add(r),this._mats.push(o)}}update(t,e,s=!1){if(!s){for(const a of this._mats)a.uniforms.time.value=e;for(const a of this.group.children)a.rotation.z+=a.userData.spin*t}}}function Ha(i,t){const e=i.attributes.position,s=new Float32Array(e.count*3);i.computeBoundingBox();const{min:a,max:n}=i.boundingBox,o=n.y-a.y||1,r=new $;for(let l=0;l<e.count;l++){const c=(e.getY(l)-a.y)/o;let u=t[0][1];for(const[f,y]of t)c>=f&&(u=y);r.set(u),s[l*3]=r.r,s[l*3+1]=r.g,s[l*3+2]=r.b}i.setAttribute("color",new z(s,3))}function vs(i,t,e,s=.25){const a=i.attributes.position,n=new Float32Array(a.count*3),o=new $(t),r=new $(e),l=new $;for(let c=0;c<a.count;c++)l.copy(Math.random()<s?r:o),n[c*3]=l.r,n[c*3+1]=l.g,n[c*3+2]=l.b;i.setAttribute("color",new z(n,3))}class $a{constructor(){this.group=new A,this._bodies=[];{const t=new Ut(16,3);Ha(t,[[0,9198140],[.18,13077330],[.36,14725232],[.55,13077330],[.72,14262366],[.88,11565120]]);const e=new b(t,new et({vertexColors:!0,flatShading:!0,roughness:.9,metalness:0,emissive:2757893,emissiveIntensity:.4})),s=new b(new Ui(20,30,48),new Zt({color:15255702,transparent:!0,opacity:.35,side:$s,depthWrite:!1,blending:ht}));s.rotation.x=Math.PI/2,this._add({x:-28,y:52,z:199},[e,s],.18,[.4,1,.15])}{const t=new Ut(7,2);vs(t,12567756,8159884,.3);const e=new b(t,new et({vertexColors:!0,flatShading:!0,roughness:1,metalness:0,emissive:1448482,emissiveIntensity:.6}));this._add({x:136,y:38,z:-85},[e],.12,[.2,1,.3])}{const t=new Ut(11,2);vs(t,14706748,11026462,.22);const e=new b(t,new et({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:3149829,emissiveIntensity:.45}));this._add({x:-169,y:30,z:6},[e],.22,[.1,1,.5])}}_add(t,e,s,a){const n=new A;n.position.set(t.x,t.y,t.z);for(const r of e)r.castShadow=!1,r.receiveShadow=!1,n.add(r);const o=new v(a[0],a[1],a[2]).normalize();this._bodies.push({pivot:n,ax:o,speed:s}),this.group.add(n)}update(t,e,s=!1){if(!s)for(const a of this._bodies)a.pivot.rotateOnAxis(a.ax,a.speed*t)}}class Ga{constructor(t="standard"){this.group=new A,this._skyTier=t,this._deferredEnabled=!1,this.sun=new Ua,this.nebula=new za,this.bodies=new $a,this.asteroids=null,this.flyers=null,this.comet=null,this.aurora=null,this._critical=[this.sun,this.nebula,this.bodies];for(const e of this._critical)this.group.add(e.group);this._applyTierVisibility()}setSkyTier(t){this._skyTier=t||"standard",this._applyTierVisibility()}async enableDeferred(t){if(this._deferredEnabled){this.setSkyTier(t);return}if(this._deferredEnabled=!0,this._skyTier=t||this._skyTier,this._skyTier==="minimal"){this._applyTierVisibility();return}const[{Asteroids:e},{Flyers:s},{Comet:a},{Aurora:n}]=await Promise.all([pe(()=>import("./sky-deferred-BDlVC7_J.js").then(o=>o.A),__vite__mapDeps([0,1]),import.meta.url),pe(()=>import("./sky-deferred-BDlVC7_J.js").then(o=>o.F),__vite__mapDeps([0,1]),import.meta.url),pe(()=>import("./sky-deferred-BDlVC7_J.js").then(o=>o.C),__vite__mapDeps([0,1]),import.meta.url),pe(()=>import("./sky-deferred-BDlVC7_J.js").then(o=>o.a),__vite__mapDeps([0,1]),import.meta.url)]);this.asteroids=new e,this.flyers=new s,this.comet=new a,this.aurora=new n;for(const o of[this.asteroids,this.flyers,this.comet,this.aurora])o.group.visible=!1,this.group.add(o.group);this._applyTierVisibility(),this._fadeInDeferred()}_fadeInDeferred(){const t=[this.asteroids,this.flyers,this.comet,this.aurora].filter(Boolean);for(const n of t)n.group.visible=!0,n.group.traverse(o=>{if(!o.material)return;const r=Array.isArray(o.material)?o.material:[o.material];for(const l of r)l&&"opacity"in l&&(l._phfBaseOpacity==null&&(l._phfBaseOpacity=l.opacity),l.transparent=!0,l.opacity=0)});const e=performance.now(),s=900,a=()=>{const n=Math.min(1,(performance.now()-e)/s);for(const o of t)o.group.traverse(r=>{if(!r.material)return;const l=Array.isArray(r.material)?r.material:[r.material];for(const c of l)c&&c._phfBaseOpacity!=null&&(c.opacity=c._phfBaseOpacity*n)});n<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}_applyTierVisibility(){const t=this._skyTier;this.sun.group.visible=!0,this.nebula.group.visible=t!=="minimal",this.bodies.group.visible=t!=="minimal";const e=t==="full"||t==="standard";this.asteroids&&(this.asteroids.group.visible=e&&t==="full"),this.flyers&&(this.flyers.group.visible=e),this.comet&&(this.comet.group.visible=e&&t==="full"),this.aurora&&(this.aurora.group.visible=e)}update(t,e,s=!1){var a,n,o,r;for(const l of this._critical)l.update(t,e,s);(a=this.asteroids)!=null&&a.group.visible&&this.asteroids.update(t,e,s),(n=this.flyers)!=null&&n.group.visible&&this.flyers.update(t,e,s),(o=this.comet)!=null&&o.group.visible&&this.comet.update(t,e,s),(r=this.aurora)!=null&&r.group.visible&&this.aurora.update(t,e,s)}}const Va={arctic_island:{count:35,color:[.82,.92,1],pixelSize:2.5,motionType:0,shapeType:0,spread:4,fallTop:5.2,fallBot:.3,driftAmp:.12,windDrift:0,speedMid:.38,speedVar:.12},desert_island:{count:50,color:[.95,.76,.42],pixelSize:1.6,motionType:1,shapeType:0,spread:4,swirlSpd:2,bobAmp:.2,speedMid:1,speedVar:.45},meadow_island:{count:25,color:[.8,1,.45],pixelSize:2.8,motionType:2,shapeType:1,spread:3.5,driftAmp:5,bobAmp:.55,speedMid:.38,speedVar:.14},mountain_island:{count:40,color:[1,.7,.78],pixelSize:3.5,motionType:0,shapeType:1,spread:4.5,fallTop:5.5,fallBot:.3,driftAmp:1.2,windDrift:2.5,speedMid:.43,speedVar:.17},lava_island:{count:28,color:[.62,.88,.62],pixelSize:4.6,motionType:0,shapeType:3,spread:4,fallTop:7,fallBot:.3,driftAmp:.65,windDrift:.6,speedMid:.27,speedVar:.11},pirate_ship:{count:20,color:[1,.86,.18],pixelSize:3.6,motionType:3,shapeType:2,spread:2.5,speedMid:.65,speedVar:.3}},Ja=`
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
`,Ka=`
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
`;new v;class Ya{constructor(){this._systems={},this._group=new A,this._scale=1;for(const[t,e]of Object.entries(Va)){const s=this._buildSystem(e);this._systems[t]=s,this._group.add(s.points)}}get group(){return this._group}setScale(t){if(this._scale=Math.max(0,Math.min(1,t??1)),this._scale<.05)for(const e of Object.values(this._systems))e.points.visible=!1}_buildSystem(t){const e=t.count,s=new Float32Array(e*3),a=new Float32Array(e*2),n=new Float32Array(e),o=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let p=0;p<e;p++){const M=Math.random()*Math.PI*2,C=Math.sqrt(Math.random())*t.spread;a[p*2]=Math.cos(M)*C,a[p*2+1]=Math.sin(M)*C,n[p]=Math.random()*Math.PI*2,o[p]=Math.max(.05,t.speedMid+(Math.random()*2-1)*t.speedVar),r[p]=t.pixelSize*(.55+Math.random()*.9),l[p]=.45+Math.random()*.55}const c=new ne;c.setAttribute("position",new z(s,3)),c.setAttribute("aBase",new z(a,2)),c.setAttribute("aPhase",new z(n,1)),c.setAttribute("aSpeed",new z(o,1)),c.setAttribute("aSize",new z(r,1)),c.setAttribute("aBaseAlpha",new z(l,1));const u={uTime:{value:0},uOpacity:{value:0},uCenter:{value:new v(0,26,0)},uColor:{value:new v(...t.color)},uMotion:{value:t.motionType},uShape:{value:t.shapeType},uFallTop:{value:t.fallTop??5},uFallBot:{value:t.fallBot??.3},uDriftAmp:{value:t.driftAmp??.8},uWindDrift:{value:t.windDrift??0},uSwirlSpd:{value:t.swirlSpd??1.8},uBobAmp:{value:t.bobAmp??.22}},f=new xe({uniforms:u,vertexShader:Ja,fragmentShader:Ka,transparent:!0,depthWrite:!1,blending:ht}),y=new zs(c,f);return y.frustumCulled=!1,y.visible=!1,{points:y,uniforms:u}}update(t,e,s,a,n){if(a||this._scale<.05){for(const l of Object.values(this._systems))l.points.visible=!1;return}const o=performance.now()*.001,r=this._scale;for(const[l,c]of Object.entries(this._systems)){const{points:u,uniforms:f}=c,y=l===e;if(f.uOpacity.value+=((y?r:0)-f.uOpacity.value)*Math.min(1,t*2.5),f.uOpacity.value<.01){u.visible=!1;continue}if(n&&n[l]){const p=n[l];f.uCenter.value.set(p.x*s,p.y*s,p.z*s)}else f.uCenter.value.set(0,s,0);u.visible=!0,f.uTime.value=o}}}const st={meadow_island:{iconKey:"leaf",name:"Meadow Island",section:"About Me",color:"#4CAF50",html:`
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
    `},arctic_island:{iconKey:"snowflake",name:"Arctic Island",section:"Tech Stack",color:"#64B5F6",variant:"tech",html:na,init:aa},mountain_island:{iconKey:"mountain",name:"Mountain Island",section:"Projects",color:"#FF8A65",variant:"projects",html:ia,init:sa},lava_island:{iconKey:"flame",name:"Lava Island",section:"Experience",color:"#E53935",variant:"exp",html:ea},desert_island:{iconKey:"sun",name:"Desert Island",section:"Contact",color:"#FB923C",variant:"contact",html:ta,init:Zi},pirate_ship:{iconKey:"compass",name:"Pirate Ship",section:"Travel Log",color:"#0097A7",lightColor:"#FFFFFF",noGlow:!0,variant:"travel",html:ra,init:oa}};function Xa(){return Promise.resolve()}const Qa="ontouchstart"in window||navigator.maxTouchPoints>0;class Za{constructor(){this._popup=document.createElement("div"),this._popup.id="island-popup",this._popup.className="hidden",this._popup.innerHTML=`
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
    `,document.body.appendChild(this._popup),this._popup.addEventListener("click",()=>{var s;(s=this.onPopupTap)==null||s.call(this)}),this._popup.addEventListener("touchend",s=>{var a;s.preventDefault(),(a=this.onPopupTap)==null||a.call(this)},{passive:!1}),this._panel=document.getElementById("world-panel"),this._icon=document.getElementById("wp-icon"),this._eyebrow=document.getElementById("wp-eyebrow"),this._title=document.getElementById("wp-title"),this._content=document.getElementById("wp-content"),this._halo=this._panel.querySelector(".wp-halo"),this._closeBtn=document.getElementById("wp-close"),this._closeBtn.innerHTML=N("close",18,2),this._closeBtn.addEventListener("click",()=>this._requestClose()),this._panel.addEventListener("click",s=>{(s.target===this._panel||s.target.classList&&s.target.classList.contains("wp-scrim"))&&this._requestClose()}),this._closeTimer=null,this.onPopupTap=null,this.onClosePanel=null;const t=document.getElementById("landmark-badge"),e=document.getElementById("hint-text");t&&(t.style.display="none"),e&&(e.style.display="none")}showPopup(t){this._popup.querySelector(".pu-icon").innerHTML=N(t.iconKey,22),this._popup.querySelector(".pu-island").textContent=t.name,this._popup.querySelector(".pu-section").textContent=t.section,this._popup.style.setProperty("--ic",t.color);const e=this._popup.querySelector(".pu-keycap"),s=this._popup.querySelector(".pu-key-label");Qa?(e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/></svg>',e.classList.add("pu-keycap--tap"),s.textContent="Tap"):(e.textContent="E",e.classList.remove("pu-keycap--tap"),s.textContent="Explore"),this._popup.classList.remove("hidden")}hidePopup(){this._popup.classList.add("hidden")}openPanel(t){this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),this._openGen=(this._openGen||0)+1;const e=this._openGen;this._icon.innerHTML=N(t.iconKey,26),this._eyebrow.textContent=t.section,this._title.textContent=t.name,this._panel.style.setProperty("--ic",t.color);const s=this._panel.querySelector(".wp-card");s.className="wp-card"+(t.variant?` wp--${t.variant}`:""),this._content.innerHTML="",this._content.scrollTop=0,this._panel.classList.remove("hidden","is-closing"),this._panel.offsetWidth,this._panel.classList.add("is-open");const a=typeof t.html=="function"?t.html():t.html,n=t.init;requestAnimationFrame(()=>{e===this._openGen&&(this._content.innerHTML=a,this._content.scrollTop=0,requestAnimationFrame(()=>{e===this._openGen&&(n==null||n(this._content))}))})}_requestClose(){this.onClosePanel?this.onClosePanel():this.closePanel()}closePanel(){if(!this._panel.classList.contains("is-open")){this._panel.classList.add("hidden");return}this._panel.classList.remove("is-open"),this._panel.classList.add("is-closing"),this._closeTimer=setTimeout(()=>{this._panel.classList.add("hidden"),this._panel.classList.remove("is-closing"),this._content.innerHTML="",this._closeTimer=null},320)}isPanelOpen(){return this._panel.classList.contains("is-open")}}function Ft(i){return String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}class tn{constructor(t){this._onTeleport=t,this._visited=new Set,this._lastFocus=null,this._build()}_build(){const t=document.createElement("div");t.id="map-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","map-title");const e=Object.entries(st).map(([s,a])=>`
      <div class="map-card" data-island="${Ft(s)}" style="--ic:${Ft(a.color)}">
        <div class="map-visited-badge" aria-hidden="true">✓ found</div>
        <div class="map-card-icon" aria-hidden="true">${N(a.iconKey,30)}</div>
        <div class="map-card-name">${Ft(a.name)}</div>
        <div class="map-card-section">${Ft(a.section)}</div>
        <button class="map-card-btn" type="button" data-teleport="${Ft(s)}"
                aria-label="Warp to ${Ft(a.name)}">Warp there</button>
      </div>
    `).join("");t.innerHTML=`
      <div class="overlay-inner map-overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="map-title">${N("map",18)} Island Map</span>
          <button class="overlay-x" id="map-close" type="button" aria-label="Close map">✕</button>
        </div>
        <p class="overlay-sub">Walk there yourself, or jump straight to any island.</p>
        <div class="map-grid">${e}</div>
      </div>
    `,t.querySelector("#map-close").addEventListener("click",()=>this.close()),t.addEventListener("click",s=>{s.target===t&&this.close()}),t.querySelectorAll("[data-teleport]").forEach(s=>{s.addEventListener("click",a=>{a.stopPropagation(),this.close(),this._onTeleport(s.dataset.teleport)})}),document.body.appendChild(t),this._el=t}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#map-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}markVisited(t){if(this._visited.has(t))return;this._visited.add(t);const e=this._el.querySelector(`[data-island="${t}"]`);e&&e.classList.add("visited")}}const It="ontouchstart"in window||navigator.maxTouchPoints>0;class en{constructor(){this._lastFocus=null,this._build()}_build(){const t=document.createElement("div");t.id="help-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","help-title"),t.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="help-title">How to Play</span>
          <button class="overlay-x" id="help-close" type="button" aria-label="Close help">✕</button>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${It?"":"active"}" type="button" role="tab"
                  aria-selected="${!It}" aria-controls="help-desktop" id="tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${It?"active":""}" type="button" role="tab"
                  aria-selected="${It}" aria-controls="help-mobile" id="tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="help-desktop" class="help-section ${It?"help-hidden":""}">
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
        <div id="help-mobile" class="help-section ${It?"":"help-hidden"}">
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
    `;const e=t.querySelector("#help-desktop"),s=t.querySelector("#help-mobile");e&&(e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","tab-desktop")),s&&(s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby","tab-mobile")),t.querySelector("#help-close").addEventListener("click",()=>this.close()),t.addEventListener("click",o=>{o.target===t&&this.close()});const a=[...t.querySelectorAll(".help-tab")];function n(o){a.forEach(l=>{const c=l===o;l.classList.toggle("active",c),l.setAttribute("aria-selected",String(c)),l.tabIndex=c?0:-1}),t.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const r=t.querySelector(`#help-${o.dataset.tab}`);r&&r.classList.remove("help-hidden")}a.forEach(o=>{o.addEventListener("click",()=>n(o)),o.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;const l=r.key==="ArrowRight"?1:-1,c=a[(a.indexOf(o)+l+a.length)%a.length];c.focus(),n(c)})}),document.body.appendChild(t),this._el=t}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#help-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}}const Ot="ontouchstart"in window||navigator.maxTouchPoints>0;class sn{constructor(){this._lastFocus=null,this._onKey=null,this._onClick=null,this._onTouch=null,this._build()}_build(){const t=document.createElement("div");t.id="intro-overlay",t.className="overlay-modal",t.setAttribute("aria-modal","true"),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","intro-title"),t.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="intro-title">How to Play</span>
          <button class="overlay-x" id="intro-close" type="button" aria-label="Close intro">✕</button>
        </div>

        <div class="intro-welcome">
          <div class="intro-welcome-icon" id="intro-welcome-icon">${N("world",38,1.5)}</div>
          <h2 class="intro-welcome-title" id="intro-welcome-title">Welcome to Eric's World!</h2>
          <p class="intro-welcome-sub" id="intro-welcome-sub">Six islands. Explore them all.</p>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${Ot?"":"active"}" type="button" role="tab"
                  aria-selected="${!Ot}" aria-controls="intro-desktop" id="intro-tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${Ot?"active":""}" type="button" role="tab"
                  aria-selected="${Ot}" aria-controls="intro-mobile" id="intro-tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="intro-desktop" class="help-section ${Ot?"help-hidden":""}">
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
        <div id="intro-mobile" class="help-section ${Ot?"":"help-hidden"}">
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
    `;const e=t.querySelector("#intro-desktop"),s=t.querySelector("#intro-mobile");e&&(e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","intro-tab-desktop")),s&&(s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby","intro-tab-mobile")),t.querySelector("#intro-close").addEventListener("click",()=>this.close());const a=[...t.querySelectorAll(".help-tab")];function n(o){a.forEach(l=>{const c=l===o;l.classList.toggle("active",c),l.setAttribute("aria-selected",String(c)),l.tabIndex=c?0:-1}),t.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const r=t.querySelector(`#intro-${o.dataset.tab}`);r&&r.classList.remove("help-hidden")}a.forEach(o=>{o.addEventListener("click",()=>n(o)),o.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;const l=r.key==="ArrowRight"?1:-1,c=a[(a.indexOf(o)+l+a.length)%a.length];c.focus(),n(c)})}),document.body.appendChild(t),this._el=t}open(t=!1){const e=this._el.querySelector("#intro-welcome-icon"),s=this._el.querySelector("#intro-welcome-title"),a=this._el.querySelector("#intro-welcome-sub");e&&(e.innerHTML=N(t?"compass":"world",38,1.5)),s&&(s.textContent=t?"Welcome back!":"Welcome to Eric's World!"),a&&(a.textContent=t?"Here's a quick refresher in case you forgot the ropes.":"Six islands. Explore them all."),this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var n;return(n=this._el.querySelector("#intro-close"))==null?void 0:n.focus()}),this._onKey=n=>{n.target.closest("#intro-overlay")&&(n.key==="Tab"||n.key==="ArrowLeft"||n.key==="ArrowRight")||this.close()},this._onClick=n=>{n.target===this._el&&this.close()},this._onTouch=n=>{n.target===this._el&&this.close()},document.addEventListener("keydown",this._onKey,{once:!1}),this._el.addEventListener("click",this._onClick,{once:!1}),this._el.addEventListener("touchstart",this._onTouch,{once:!1,passive:!0})}close(){this._el.classList.remove("is-open"),localStorage.setItem("phf-intro-seen","1"),this._onKey&&document.removeEventListener("keydown",this._onKey),this._onClick&&this._el.removeEventListener("click",this._onClick),this._onTouch&&this._el.removeEventListener("touchstart",this._onTouch),this._onKey=this._onClick=this._onTouch=null,this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}}const Ys="phf-settings-v1";function an(){try{const i=localStorage.getItem(Ys);if(!i)return null;const t=JSON.parse(i);return typeof t!="object"||t===null?null:t}catch{return null}}function nn(i){try{localStorage.setItem(Ys,JSON.stringify(i))}catch{}}class on{constructor(){var s;const t=an()??{},e=((s=window.matchMedia)==null?void 0:s.call(window,"(prefers-reduced-motion: reduce)").matches)??!1;this._quality=["low","auto","high"].includes(t.quality)?t.quality:"auto",this._reducedMotion=typeof t.reducedMotion=="boolean"?t.reducedMotion:e,this._hintsVisible=typeof t.hintsVisible=="boolean"?t.hintsVisible:!0,this._reducedMotion&&document.body.classList.add("reduced-motion"),this.onQualityChange=null,this.onReducedMotionChange=null,this.onHintsChange=null,this._lastFocus=null,this._build()}applyRestored(){var t,e,s;(t=this.onQualityChange)==null||t.call(this,this._quality),(e=this.onReducedMotionChange)==null||e.call(this,this._reducedMotion),(s=this.onHintsChange)==null||s.call(this,this._hintsVisible)}_persist(){nn({quality:this._quality,reducedMotion:this._reducedMotion,hintsVisible:this._hintsVisible})}_build(){const t=this._reducedMotion,e=this._hintsVisible,s=document.createElement("div");s.id="settings-overlay",s.className="overlay-modal",s.setAttribute("aria-modal","true"),s.setAttribute("role","dialog"),s.setAttribute("aria-labelledby","settings-title");const a=(r,l)=>`
      <button class="sopt${this._quality===r?" active":""}"
              type="button"
              data-q="${r}"
              aria-pressed="${this._quality===r}">${l}</button>`;s.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="settings-title">${N("settings",18)} Options</span>
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
    `,s.querySelector("#settings-close").addEventListener("click",()=>this.close()),s.addEventListener("click",r=>{r.target===s&&this.close()}),s.querySelectorAll("[data-q]").forEach(r=>{r.addEventListener("click",()=>{var l;s.querySelectorAll("[data-q]").forEach(c=>{const u=c===r;c.classList.toggle("active",u),c.setAttribute("aria-pressed",String(u))}),this._quality=r.dataset.q,this._persist(),(l=this.onQualityChange)==null||l.call(this,this._quality)})});const n=s.querySelector("#motion-toggle");n.addEventListener("click",()=>{var r;this._reducedMotion=!this._reducedMotion,n.textContent=this._reducedMotion?"ON":"OFF",n.classList.toggle("active",this._reducedMotion),n.setAttribute("aria-pressed",String(this._reducedMotion)),document.body.classList.toggle("reduced-motion",this._reducedMotion),this._persist(),(r=this.onReducedMotionChange)==null||r.call(this,this._reducedMotion)});const o=s.querySelector("#hints-toggle");o.addEventListener("click",()=>{var r;this._hintsVisible=!this._hintsVisible,o.textContent=this._hintsVisible?"ON":"OFF",o.classList.toggle("active",this._hintsVisible),o.setAttribute("aria-pressed",String(this._hintsVisible)),this._persist(),(r=this.onHintsChange)==null||r.call(this,this._hintsVisible)}),document.body.appendChild(s),this._el=s}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var t;return(t=this._el.querySelector("#settings-close"))==null?void 0:t.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}get quality(){return this._quality}get reducedMotion(){return this._reducedMotion}get hintsVisible(){return this._hintsVisible}}const rn="./";class ln{constructor(){this._el=null,this.onStartClose=null,this.onClose=null,this.shouldCloseFromBackdrop=null,this._build()}_build(){const t=document.createElement("div");t.id="about-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","About Eric"),t.innerHTML=`
      <button class="about-close" type="button" aria-label="Close">${N("close",18,2)}</button>

      <!-- Warm spotlight grounding the character -->
      <div class="about-stage" aria-hidden="true"></div>

      <!-- Brand sign — the ERIC NG wordmark on a warm plaque, top-center -->
      <div class="about-brand">
        <img class="about-brand-img" src="${rn}ericnglogo.png" alt="Eric Ng" width="1080" height="355" draggable="false">
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
            <div class="about-chip" aria-hidden="true">${N("leaf",26)}</div>
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
    `,document.body.appendChild(t),this._el=t,t.querySelector(".about-close").addEventListener("click",()=>this.close()),t.addEventListener("click",e=>{e.target===t&&(this.shouldCloseFromBackdrop&&!this.shouldCloseFromBackdrop(e)||this.close())})}open(){this.isOpen()||(this._el.classList.remove("is-closing"),this._el.classList.add("is-open"))}close(){var t;this.isOpen()&&((t=this.onStartClose)==null||t.call(this),this._el.classList.add("is-closing"),setTimeout(()=>{var e;this._el.classList.remove("is-open","is-closing"),(e=this.onClose)==null||e.call(this)},350))}isOpen(){return this._el.classList.contains("is-open")}}const re=typeof window<"u"&&(new URLSearchParams(window.location.search).has("perf")||typeof import.meta<"u"&&!1)||!1,Ve=new Map,Xs=[];function Qs(){return typeof performance<"u"?performance.now():Date.now()}function nt(i){var e;if(!re)return;const t=Qs();Ve.set(i,t);try{(e=performance.mark)==null||e.call(performance,`phf:${i}`)}catch{}}function Mt(i,t,e=null){var o,r;if(!re)return 0;const s=Ve.get(t),a=e?Ve.get(e):Qs();if(s==null||a==null)return 0;const n=a-s;Xs.push({name:i,start:s,end:a,duration:n});try{e?(o=performance.measure)==null||o.call(performance,`phf:${i}`,`phf:${t}`,`phf:${e}`):(r=performance.measure)==null||r.call(performance,`phf:${i}`,`phf:${t}`)}catch{}return n}function cn(){if(!re)return null;const i=Xs.map(t=>({stage:t.name,ms:Math.round(t.duration)}));return new URLSearchParams(window.location.search).has("perf")&&console.table(i),i}function dn(){return re}function hn(){var i,t,e,s,a,n;if(!(!re||typeof performance>"u")){try{const o=(t=(i=performance.getEntriesByType)==null?void 0:i.call(performance,"navigation"))==null?void 0:t[0];o&&console.log("[perf] TTFB:",(s=(e=o.responseStart)==null?void 0:e.toFixed)==null?void 0:s.call(e,1),"ms | DOMContentLoaded:",(n=(a=o.domContentLoadedEventEnd)==null?void 0:a.toFixed)==null?void 0:n.call(a,1),"ms")}catch{}nt("module_eval")}}const ct={criticalCode:.08,download:.52,sceneBuilt:.12,shadersCompiled:.12,firstMeaningfulFrame:.1,interactionShell:.06},je={Booting:"Starting up",LoadingAssets:"Loading the world",Unpacking:"Unpacking the world",BuildingScene:"Building the world",Compiling:"Preparing the world",FirstFrame:"Lighting the stage",Ready:"Ready",Revealing:"Welcome in",Live:"Live",Fatal:"Something went wrong",Degraded:"Recovering graphics"},pn=45e3,un=280;class mn{constructor(t={}){this.onProgress=t.onProgress||null,this.onReady=t.onReady||null,this.onFatal=t.onFatal||null,this.onStateChange=t.onStateChange||null,this.reducedMotion=!!t.reducedMotion,this.state="Booting",this.fatalMessage="",this.readyAt=0,this._downloadFrac=0,this._flags={criticalCode:!1,criticalAssets:!1,sceneBuilt:!1,shadersCompiled:!1,firstMeaningfulFrame:!1,cameraPosed:!1,interactionShell:!1},this._displayProgress=0,this._targetProgress=0,this._stallTimer=null,this._readyFired=!1,this._revealStarted=!1,this._awaitingParse=!1,this._armStallWatch(),this._setState("Booting")}setReducedMotion(t){this.reducedMotion=!!t}markCriticalCode(){this._flags.criticalCode=!0,this._flags.interactionShell=!0,this._flags.cameraPosed=!0,nt("critical_code"),this._setState("LoadingAssets"),this._recompute()}setDownloadProgress(t,e){e>0&&(this._downloadFrac=Math.min(1,t/e),this._downloadFrac>=1&&!this._flags.criticalAssets&&(this._awaitingParse=!0,this._setState("Unpacking"))),this._recompute(),this._armStallWatch()}nudgeDownloadFallback(t){const e=1-Math.exp(-t*.12);this._downloadFrac=Math.max(this._downloadFrac,Math.min(.85,e)),this._recompute()}markWorldLoaded(){this._flags.criticalAssets=!0,this._downloadFrac=1,this._awaitingParse=!1,nt("world_loaded"),Mt("world_download","critical_code","world_loaded"),this._setState("BuildingScene"),this._recompute(),this._armStallWatch()}markSceneBuilt(){this._flags.sceneBuilt=!0,nt("scene_built"),Mt("scene_build","world_loaded","scene_built"),this._setState("Compiling"),this._recompute()}markShadersCompiled(){this._flags.shadersCompiled=!0,nt("shaders_compiled"),Mt("compile","scene_built","shaders_compiled"),this._setState("FirstFrame"),this._recompute()}markFirstMeaningfulFrame(){this._flags.firstMeaningfulFrame||(this._flags.firstMeaningfulFrame=!0,nt("first_meaningful_frame"),Mt("first_frame","shaders_compiled","first_meaningful_frame"),this._recompute(),this._maybeReady())}markCameraPosed(){this._flags.cameraPosed=!0,this._recompute(),this._maybeReady()}markInteractionShell(){this._flags.interactionShell=!0,this._recompute(),this._maybeReady()}fail(t){var e;this.fatalMessage=t||"Load failed",this._setState("Fatal"),this._clearStallWatch(),(e=this.onFatal)==null||e.call(this,this.fatalMessage),this._emitProgress()}markContextLost(){this.state!=="Fatal"&&this._setState("Degraded")}markContextRestored(){this.state==="Degraded"&&this._setState("Live")}beginReveal(){this.state!=="Ready"&&this.state!=="Revealing"||(this._revealStarted=!0,this._setState("Revealing"))}markLive(){this._setState("Live"),this._clearStallWatch(),nt("live"),Mt("ready_to_live","ready","live")}get isReady(){return this._allReadyFlags()}get isFatal(){return this.state==="Fatal"}get isLive(){return this.state==="Live"}tick(t){if(this._awaitingParse&&!this._flags.criticalAssets){const s=(ct.criticalCode+ct.download+ct.sceneBuilt*.45)*100;this._targetProgress=Math.max(this._targetProgress,Math.min(s,this._displayProgress+t*14))}const e=1-Math.exp(-(this.reducedMotion?18:8)*t);this._displayProgress+=(this._targetProgress-this._displayProgress)*e,this._allReadyFlags()?(this._displayProgress=Math.max(this._displayProgress,100),this._targetProgress=100):this._displayProgress=Math.min(this._displayProgress,99.2),this._emitProgress()}flush(){this._displayProgress=this._targetProgress,this._emitProgress()}get displayProgress(){return this._displayProgress}get label(){return this.state==="Fatal"?this.fatalMessage||je.Fatal:this.state==="Compiling"||this.state==="FirstFrame"||this.state==="BuildingScene"?je[this.state]:this.state==="LoadingAssets"&&this._downloadFrac>=.98?"Preparing the world":je[this.state]||"Loading"}get minDwellMs(){return this.reducedMotion?0:un}_allReadyFlags(){const t=this._flags;return t.criticalCode&&t.criticalAssets&&t.sceneBuilt&&t.shadersCompiled&&t.firstMeaningfulFrame&&t.cameraPosed&&t.interactionShell}_maybeReady(){var t;this._readyFired||!this._allReadyFlags()||this.state==="Fatal"||(this._readyFired=!0,this._targetProgress=100,this._displayProgress=100,this.readyAt=performance.now(),nt("ready"),Mt("time_to_ready","module_eval","ready"),this._setState("Ready"),this._clearStallWatch(),this._emitProgress(),(t=this.onReady)==null||t.call(this))}_recompute(){const t=this._flags;let e=0;t.criticalCode&&(e+=ct.criticalCode),e+=ct.download*this._downloadFrac,t.sceneBuilt&&(e+=ct.sceneBuilt),t.shadersCompiled&&(e+=ct.shadersCompiled),t.firstMeaningfulFrame&&(e+=ct.firstMeaningfulFrame),t.interactionShell&&(e+=ct.interactionShell);let s=e*100;this._allReadyFlags()?s=100:s=Math.min(s,99),this._targetProgress=s,s>this._displayProgress&&(this._displayProgress+=(s-this._displayProgress)*.35),this._emitProgress()}_emitProgress(){var e;const t=this._allReadyFlags()?100:Math.min(99,Math.floor(this._displayProgress));(e=this.onProgress)==null||e.call(this,t,this.label,this.state)}_setState(t){var e;this.state!==t&&(this.state=t,(e=this.onStateChange)==null||e.call(this,t))}_armStallWatch(){this._clearStallWatch(),this._stallTimer=setTimeout(()=>{this._readyFired||this.state==="Fatal"||this.state==="Live"||this.state==="Revealing"||this.fail("Still loading — check your connection, then retry.")},pn)}_clearStallWatch(){this._stallTimer&&(clearTimeout(this._stallTimer),this._stallTimer=null)}dispose(){this._clearStallWatch()}}function fn(){var o,r;const i=navigator.deviceMemory,t=navigator.hardwareConcurrency||4,e=window.devicePixelRatio||1,s="ontouchstart"in window||navigator.maxTouchPoints>0,a=((o=navigator.connection)==null?void 0:o.saveData)===!0,n=/2g|slow-2g/i.test(((r=navigator.connection)==null?void 0:r.effectiveType)||"");return a||n||i!=null&&i<=4||s&&(i==null||i<=6)&&t<=4?"low":e>=2.5&&s?"mid":t>=8&&(i==null||i>=8)?"high":"mid"}function Zs(i,t={}){const e=t.tier||fn(),s=window.devicePixelRatio||1;let a;return i==="low"?a=Ht({dpr:1,antialias:!1,shadows:!1,shadowMapSize:512,shadowType:"basic",skyTier:"minimal",particleScale:.35,adaptiveDpr:!1}):i==="high"?a=Ht({dpr:Math.min(s,2),antialias:!0,shadows:!0,shadowMapSize:2048,shadowType:"soft",skyTier:"full",particleScale:1,adaptiveDpr:!1}):e==="low"?a=Ht({dpr:1,antialias:!1,shadows:!1,shadowMapSize:512,shadowType:"basic",skyTier:"minimal",particleScale:.4,adaptiveDpr:!0}):e==="high"?a=Ht({dpr:Math.min(s,1.75),antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"soft",skyTier:"full",particleScale:1,adaptiveDpr:!0}):a=Ht({dpr:Math.min(s,1.5),antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"basic",skyTier:"standard",particleScale:.7,adaptiveDpr:!0}),a.preset=i,a.tier=e,a}function Ht(i){return{preset:"auto",tier:"mid",dpr:1,antialias:!0,shadows:!0,shadowMapSize:1024,shadowType:"soft",skyTier:"standard",particleScale:1,adaptiveDpr:!1,...i}}const _n=18.5,vn=1,gn=45;hn();ne.prototype.computeBoundsTree=Yi;ne.prototype.disposeBoundsTree=Xi;b.prototype.raycast=Qi;const ot=Object.keys(st),be={};for(const i of ot){const t=st[i].lightColor||st[i].color;be[i]=parseInt(t.slice(1),16)}const ke=document.getElementById("canvas");let d=null,O=Zs("auto"),F;try{F=new ji({canvas:ke,antialias:O.antialias,powerPreference:"high-performance",stencil:!1})}catch(i){throw console.error("WebGL init failed:",i),ti("WebGL is unavailable in this browser. Try Chrome or Firefox, or enable hardware acceleration."),i}F.setPixelRatio(O.dpr);F.setSize(window.innerWidth,window.innerHeight);F.shadowMap.enabled=O.shadows;F.shadowMap.type=O.shadowType==="soft"?Gs:Vs;F.toneMapping=qi;F.toneMappingExposure=1;function ti(i){const t=document.getElementById("ldr-label");t&&(t.textContent=String(i).slice(0,160));const e=document.getElementById("ldr-progress");if(e&&!document.getElementById("ldr-retry")){const s=document.createElement("button");s.id="ldr-retry",s.type="button",s.textContent="Reload",s.className="ldr-retry-btn",s.onclick=()=>location.reload(),e.appendChild(s)}}ke.addEventListener("webglcontextlost",i=>{i.preventDefault(),d==null||d.markContextLost()},!1);ke.addEventListener("webglcontextrestored",()=>{d==null||d.markContextRestored(),F.setSize(window.innerWidth,window.innerHeight)},!1);const R=new Ni;R.background=new $(854048);const k=new Pa(window.innerWidth/window.innerHeight);R.add(k.camera);k.setLoadingView();const H=new A;R.add(H);const P=new ya;R.add(P.sceneGroup);const I=new Za,ei="ontouchstart"in window||navigator.maxTouchPoints>0,Me={},$t=new Set;let te=!1,Kt=0;const yn=1.1,si=new oe,ii=new oe,bn=new v(0,1,0);function wn(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function Mn(i){if(!Me[i]||te||!gt)return;q==="detail"&&(q="near",I.closePanel()),si.copy(H.quaternion),ii.setFromUnitVectors(Me[i],bn),te=!0,Kt=0;const t=document.getElementById("teleport-flash");t&&!X&&(t.classList.add("active"),setTimeout(()=>t.classList.remove("active"),220))}const Ct=new tn(Mn),Se=new en,Sn=new sn,pt=new on,ut=new ln;ut.onStartClose=()=>{Te=!1,setTimeout(()=>{k._distTarget=vi,kt&&le?(se.killTweensOf(S.rotation),se.to(S.rotation,{y:Math.PI-dt,duration:.4,ease:"power2.inOut",onComplete:ys})):ys()},200)};ut.onClose=()=>{q==="detail"&&(q="near",L&&I.showPopup(st[L]))};const qe=new zi,gs=new is;ut.shouldCloseFromBackdrop=i=>!S||!S.visible?!0:(qe.x=i.clientX/window.innerWidth*2-1,qe.y=-(i.clientY/window.innerHeight)*2+1,gs.setFromCamera(qe,k.camera),gs.intersectObject(S,!0).length===0);function ys(){vt&&(vt=!1,tt=!1,jt=0)}let X=pt.reducedMotion,ai=O.adaptiveDpr,Yt=0,we=0,Lt=O.dpr;function Ln(i){var e,s,a;O=Zs(i),Lt=O.dpr,ai=O.adaptiveDpr,Yt=0,we=0,F.setPixelRatio(Lt),F.shadowMap.enabled=O.shadows,F.shadowMap.type=O.shadowType==="soft"?Gs:Vs;const t=O.shadowMapSize;(s=(e=P.sunLight)==null?void 0:e.shadow)!=null&&s.mapSize&&(P.sunLight.shadow.mapSize.set(t,t),(a=P.sunLight.shadow.map)==null||a.dispose(),P.sunLight.shadow.map=null),J.setSkyTier(O.skyTier),Ae.setScale(O.particleScale)}pt.onQualityChange=i=>Ln(i);pt.onReducedMotionChange=i=>{X=i,document.body.classList.toggle("reduced-motion",i),d==null||d.setReducedMotion(i)};const Tt=document.getElementById("controls-hint"),Tn=5;let ni=!0,Xt=!0;pt.onHintsChange=i=>{ni=i,Tt&&(Tt.setAttribute("aria-hidden",String(!i)),i||(Tt.classList.add("faded"),Xt=!1))};const yt=document.createElement("div");yt.id="hud-buttons";yt.classList.add("hud-hidden");yt.innerHTML=`
  <button class="hud-btn" type="button" id="btn-map"      aria-label="Island map (M)" title="Island Map (M)">${N("map",18)}</button>
  <button class="hud-btn" type="button" id="btn-help"     aria-label="How to play"    title="How to Play">${N("help",18)}</button>
  <button class="hud-btn" type="button" id="btn-settings" aria-label="Options"        title="Options">${N("settings",18)}</button>
`;document.body.appendChild(yt);yt.querySelector("#btn-map").addEventListener("click",()=>Ct.toggle());yt.querySelector("#btn-help").addEventListener("click",()=>Se.toggle());yt.querySelector("#btn-settings").addEventListener("click",()=>pt.toggle());function Ce(){return Ct.isOpen()||Se.isOpen()||pt.isOpen()||ut.isOpen()}function En(){return ut.isOpen()?(ut.close(),!0):pt.isOpen()?(pt.close(),!0):Se.isOpen()?(Se.close(),!0):Ct.isOpen()?(Ct.close(),!0):!1}const qt=document.createElement("div");qt.id="hud-left";qt.classList.add("hud-hidden");const xn=[["github","GitHub","https://github.com/erriiiccccccc"],["linkedin","LinkedIn","https://www.linkedin.com/in/erriiiccccccc/"],["instagram","Instagram","https://www.instagram.com/ericccc____/"],["mail","Email","mailto:ericng8766@gmail.com"]];qt.innerHTML=`
  <div class="hud-progress" aria-live="polite" aria-label="Islands discovered">
    <div class="hp-top">
      <span class="hp-ic">${N("globe",14)}</span>
      <span class="hp-count"><b id="ic-count">0</b> <span class="hp-total">/ 6</span></span>
      <span class="hp-label">Islands</span>
    </div>
    <div class="hp-pips" id="hp-pips" aria-hidden="true">${Array.from({length:6},()=>'<span class="hp-pip"></span>').join("")}</div>
  </div>
  <div class="hud-socials">
    ${xn.map(([i,t,e])=>`<a class="hud-social" href="${e}"${e.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""} aria-label="${t}" title="${t}">${N(i,16)}</a>`).join("")}
  </div>
`;document.body.appendChild(qt);const bs=document.getElementById("ic-count"),kn=[...qt.querySelectorAll(".hp-pip")],Et=document.createElement("div");Et.id="discover-toast";Et.setAttribute("role","status");Et.setAttribute("aria-live","polite");document.body.appendChild(Et);let ws=!1;function Cn(i,t=4500){Et.innerHTML=i,Et.classList.add("show"),setTimeout(()=>Et.classList.remove("show"),t)}const oi=document.createElement("div");oi.id="teleport-flash";document.body.appendChild(oi);const U=ei?new Ma:null;if(U){const i=document.getElementById("touch-controls");i&&i.classList.add("active","hud-hidden")}const it=25,xt=new Hi(16777215,0,it*3,Math.PI/6,.5,2);xt.position.set(0,it*1.8,0);xt.target.position.set(0,it,0);R.add(xt);R.add(xt.target);const ue=new $,An=[new v(55,30,-25),new v(20,45,55),new v(-55,35,20),new v(-25,28,-55),new v(35,50,35),new v(-35,38,-40)],bt=new v,Ne=new $(16765056),Je=[],wt=new v,Gt=new v,Pn=new v(0,0,0),Fn=new v(0,1,0),Ms=new v,ze=new v,He=new v,Le="./".replace(/\/?$/,"/"),me=document.getElementById("loader"),Ss=document.getElementById("ldr-pct"),Ls=document.getElementById("ldr-bar-fill"),Vt=document.getElementById("ldr-label");let Ts="",Es=0,xs=!1,Ke=!1,ri=!1,ks=!1,Ye=!1;function Cs(i,t){const e=Math.min(100,Math.max(0,Math.floor(i)));Ss&&(Ss.textContent=e+"%"),Ls&&(Ls.style.width=e+"%"),t&&Vt&&t!==Ts&&!(d!=null&&d.isFatal)&&(Ts=t,Vt.style.opacity="0",setTimeout(()=>{Vt&&(Vt.textContent=t,Vt.style.opacity="1")},160))}d=new mn({reducedMotion:X,onProgress:(i,t)=>Cs(i,t),onFatal:i=>{ti(i),Cs(0,i)},onReady:()=>Mi()});d.markCriticalCode();window.__PHF_LOAD_OWNED__=!0;const as=new Js;as.setMeshoptDecoder($i);const ns=new Gi;ns.setTranscoderPath(Le+"basis/");ns.detectSupport(F);as.setKTX2Loader(ns);function at(){return new Promise(i=>{requestAnimationFrame(()=>setTimeout(i,0))})}const Qt=[];function In(){if(!Qt.length)return;const i=()=>{const t=performance.now();for(;Qt.length&&performance.now()-t<4;){const e=Qt.pop();if(!(!(e!=null&&e.geometry)||e.geometry.boundsTree))try{e.geometry.computeBoundsTree()}catch{}}Qt.length&&("requestIdleCallback"in window?requestIdleCallback(i,{timeout:200}):setTimeout(i,0))};"requestIdleCallback"in window?requestIdleCallback(i,{timeout:500}):setTimeout(i,0)}nt("world_download_start");(async()=>{var t,e,s,a,n,o,r;const i=Le+"world.glb";try{const l=await fetch(i);if(!l.ok)throw new Error(`HTTP ${l.status}`);const c=Number(l.headers.get("content-length"))||0,u=(t=l.body)==null?void 0:t.getReader();let f;if(u){const h=[];let T=0,E=0;for(;;){const{done:m,value:w}=await u.read();if(m)break;h.push(w),T+=w.byteLength,E+=w.byteLength,c>0&&(d==null||d.setDownloadProgress(T,c)),E>512*1024&&(E=0,await at())}c>0?d==null||d.setDownloadProgress(c,c):d==null||d.setDownloadProgress(T,T),(e=d==null?void 0:d.flush)==null||e.call(d),await at();const g=new Uint8Array(T);let W=0;for(const m of h)g.set(m,W),W+=m.byteLength;f=g.buffer}else f=await l.arrayBuffer(),d==null||d.setDownloadProgress(1,1),(s=d==null?void 0:d.flush)==null||s.call(d),await at();const p=(await new Promise((h,T)=>{as.parse(f,Le,h,T)})).scene;d==null||d.markWorldLoaded(),(a=d==null?void 0:d.flush)==null||a.call(d),await at();const M=new St().setFromObject(p),C=new Vi;M.getBoundingSphere(C);const D=it/C.radius;p.scale.setScalar(D);const Y=new St().setFromObject(p).getCenter(new v);p.position.sub(Y),await at();const At=null;let B=0;p.traverse(h=>{if(h.isMesh){const g=(h.name||"").toLowerCase().includes("(terrain)");if(h.castShadow=g,h.receiveShadow=!0,h.material){const W=Array.isArray(h.material)?h.material:[h.material];for(const m of W)m&&m.opacity>=.99&&!m.transparent&&(m.side=Hs)}if(h.geometry&&!h.geometry.boundsTree)if(g)try{h.geometry.computeBoundsTree()}catch{}else Qt.push(h);g?(h.layers.enable(1),B++):h.layers.enable(2)}At&&h.name;const T=h.name;T&&st[T]&&!Ps[T]&&(Ps[T]=h,Z[T]=[],h.traverse(E=>{E.isMesh&&(E.material=E.material.clone(),E.material.emissive=new $(0),E.material._origColor=E.material.color.clone(),E.material.color.multiplyScalar(.35),E.material._isFloor=!0,Z[T].push(E))}))}),B>0&&(Xe.layers.set(1),di=!0),await at(),p.visible=!1,H.add(p),gt=p,H.updateMatrixWorld(!0);const rt=new St,mt=new v;for(const h of ot)if(Z[h]&&Z[h].length){rt.makeEmpty();for(const T of Z[h])rt.expandByObject(T);rt.getCenter(mt),H.worldToLocal(mt),mt.lengthSq()>1e-4&&(Me[h]=mt.clone().normalize())}await at();{const h={},T=new v;for(const g of ot){if(!((n=Z[g])!=null&&n.length))continue;const W=new St;for(const m of Z[g])W.expandByObject(m);W.expandByScalar(3),h[g]=W}const E=new Set;for(const g of ot)(Z[g]||[]).forEach(W=>E.add(W));gt.traverse(g=>{var W;if(!(!g.isMesh||E.has(g))){new St().setFromObject(g).getCenter(T);for(const m of ot)if((W=h[m])!=null&&W.containsPoint(T)){g.material=g.material.clone(),g.material.emissive=new $(0),g.material._origColor=g.material.color.clone(),g.material.color.multiplyScalar(.35),g.material._isFloor=!1,Z[m].push(g),E.add(g);break}}})}for(const h of ot)for(const T of Z[h]||[])hi.set(T,h);if(await at(),xs)return;xs=!0,d==null||d.markSceneBuilt(),(o=d==null?void 0:d.flush)==null||o.call(d),await at();try{F.compile(R,k.camera),d==null||d.markShadersCompiled(),(r=d==null?void 0:d.flush)==null||r.call(d)}catch(h){console.error("Shader compile failed:",h),d==null||d.fail("Could not prepare graphics. Try reloading.");return}await at(),F.render(R,k.camera),Ke=!0,zn(p),In()}catch(l){console.error("GLB load error:",l),d==null||d.fail("Could not load the world. Check your connection, then retry.")}})();let gt=null;const Xe=new is,Qe=new is;Qe.layers.set(2);const li=new v(0,it*2,0),ci=new v(0,-1,0);let di=!1;function On(i){let t=i;for(;t;){if(st[t.name])return t.name;t=t.parent}return null}function As(){if(!gt)return it;Xe.set(li,ci);const i=Xe.intersectObject(gt,!0);return i.length>0?(L=hi.get(i[0].object)??On(i[0].object),i[0].point.y):(L=null,it)}const Ps={},Z={},hi=new Map;let q="exploring",L=null,Fs=null,fe=0,Is=!0;const pi=new la;R.add(pi.points);const ie=new ga(k.camera);R.add(ie.group);const ui=new Ra;R.add(ui.group);const J=new Ga(O.skyTier);R.add(J.group);const Ae=new Ya;Ae.setScale(O.particleScale);H.add(Ae.group);pt.applyRestored();const j=new ba;j.group.position.set(0,it+.9,0);R.add(j.group);const S=new A;S.position.set(0,it+.9,0);R.add(S);let kt=!1;const ae=new La;let le=!1;new Ji;const Rt=Le+"locomotionNEW/",Os=new Js;Os.load(Rt+"ericlowpolyskeleton.glb",i=>{const t=i.scene,e=new St().setFromObject(t);t.scale.setScalar(2.2/e.getSize(new v).y);const s=new St().setFromObject(t);t.position.y=-s.min.y,t.traverse(o=>{if(!o.isMesh)return;o.castShadow=!0;const r=o.material;r&&r.isMeshStandardMaterial&&(r.roughness=.62,r.map&&(r.emissiveMap=r.map,r.emissive.setRGB(1,1,1),r.emissiveIntensity=.16,Je.push(r)),r.needsUpdate=!0)}),S.add(t),kt=!0,j.group.visible=!1;const a=o=>new Promise((r,l)=>Os.load(o,r,void 0,l)),n=o=>o.status==="fulfilled"&&o.value.animations[0]||null;Promise.allSettled([a(Rt+"walk.glb"),a(Rt+"run.glb"),a(Rt+"idleagree.glb"),a(Rt+"idlecall.glb"),a(Rt+"idlegreet.glb")]).then(([o,r,l,c,u])=>{const f=n(o),y=n(r);f||console.warn("[AnimCtrl] walk.glb had no animation"),y||console.warn("[AnimCtrl] run.glb had no animation");const p=[n(l),n(c),n(u)].filter(Boolean);ae.loadGlbClips(t,{idle:null,walk:f,run:y,emotes:p}),le=!0,t.traverse(M=>{if(!M.isBone&&M.type!=="Bone")return;const C=M.name.toLowerCase();for(const[D,x]of Object.entries(Wn))!Wt[D]&&x.some(Y=>C.includes(Y))&&(Wt[D]=M,gi[D]={x:M.rotation.x,y:M.rotation.y})})})},void 0,i=>console.error("ericlowpolyskeleton.glb load error:",i));const mi=new wa,fi=5,Rn=22;let Dt=0,jt=0,tt=!0,vt=!1,_i=0,Ze=!1,vi=16,Te=!1;const Wt={head:null,neck:null,spine:null,leftEye:null,rightEye:null},gi={},Bn=1,Dn=1,ts={head:{x:0,y:0},neck:{x:0,y:0},spine:{x:0,y:0},leftEye:{x:0,y:0},rightEye:{x:0,y:0}};let yi=0,bi=0;document.addEventListener("mousemove",i=>{yi=i.clientX/window.innerWidth*2-1,bi=-(i.clientY/window.innerHeight)*2+1});const Wn={head:["head"],neck:["neck"],spine:["spine1","spine2","spine"],leftEye:["lefteye","eye.l","eye_l","eyel","left_eye"],rightEye:["righteye","eye.r","eye_r","eyer","right_eye"]},_e={head:{yaw:.35,pitch:.22,lerp:.08,yc:.45,pc:.3},neck:{yaw:.18,pitch:.1,lerp:.06,yc:.25,pc:.18},spine:{yaw:.06,pitch:.03,lerp:.04,yc:.12,pc:.08},eyes:{yaw:.55,pitch:.35,lerp:.14,yc:.35,pc:.25}};function Un(){const{clamp:i,lerp:t}=ee,e=yi,s=bi,a=[{key:"head",bone:Wt.head,cfg:_e.head},{key:"neck",bone:Wt.neck,cfg:_e.neck},{key:"spine",bone:Wt.spine,cfg:_e.spine}];for(const{key:o,bone:r,cfg:l}of a){if(!r)continue;const c=ts[o],u=Bn,f=Dn;c.y=t(c.y,i(u*e*l.yaw,-l.yc,l.yc),l.lerp),c.x=t(c.x,i(f*s*l.pitch,-l.pc,l.pc),l.lerp);{const y=gi[o]||{x:0,y:0};r.rotation.y=y.y+c.y,r.rotation.x=y.x+c.x}}const n=_e.eyes;for(const o of["leftEye","rightEye"]){const r=Wt[o];if(!r)continue;const l=ts[o];l.y=t(l.y,i(e*n.yaw,-.35,n.yc),n.lerp),l.x=t(l.x,i(-s*n.pitch,-.25,n.pc),n.lerp),r.rotation.y+=l.y,r.rotation.x+=l.x}}let Pe=!1;document.addEventListener("keydown",i=>{if(i.key!==" "&&i.key!=="Spacebar")return;const t=i.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||Ce()||I.isPanelOpen()||(i.preventDefault(),Pe=!0,es())});document.addEventListener("keyup",i=>{(i.key===" "||i.key==="Spacebar")&&(Pe=!1)});function es(){!tt||!le||ae.triggerJump()&&(jt=fi,tt=!1)}function os(){if(!(q!=="near"||!L)){if(q="detail",I.hidePopup(),L==="meadow_island"){le&&(ae.triggerJump(),jt=fi*2.5,tt=!1,kt&&(Ze=!0,se.killTweensOf(S.rotation),se.to(S.rotation,{y:-k._yaw,duration:.5,ease:"power2.out"}))),vi=k._distTarget,k._distTarget=2.5,setTimeout(()=>{vt=!0,_i=Dt,tt=!0,Ze=!1;for(const i of Object.values(ts))i.x=0,i.y=0;ut.open(),Te=!0},360);return}I.openPanel(st[L])}}function Ee(){q==="detail"&&(q="near",I.closePanel(),L&&I.showPopup(st[L]))}I.onPopupTap=os;I.onClosePanel=Ee;document.addEventListener("keydown",i=>{const t=i.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))return;const e=i.key.toLowerCase();if(i.key==="Escape"){if(En()){i.preventDefault();return}if(q==="detail"){Ee(),i.preventDefault();return}}Ce()||(e==="e"&&(q==="detail"?Ee():os()),e==="m"&&!I.isPanelOpen()&&Ct.toggle())});window.addEventListener("resize",()=>{F.setSize(window.innerWidth,window.innerHeight),k.resize(window.innerWidth/window.innerHeight)});function wi(){return Ce()||I.isPanelOpen()}let Rs=!1;function jn(){const i=wi();i!==Rs&&(Rs=i,mi.setEnabled(!i),k.setInputEnabled(!i),i&&(Pe=!1))}let Bs=!1,Bt=-1;const qn=.82;function Nn(i){return 1+2.6015800000000002*(i-1)**3+1.60158*(i-1)**2}const Ds=55;function Mi(){if(ks||d!=null&&d.isFatal||!(d!=null&&d.isReady)||!ri)return;ks=!0;const i=d.minDwellMs,t=()=>{d.beginReveal(),Hn()};i>0?setTimeout(t,i):t()}function zn(i){const t=ie.flushOut(),e=i.position.x,s=()=>{ri=!0,Mi()};if(X){ie.clear(),i.position.x=e,i.rotation.y=0,i.visible=!0,s();return}const n=Math.tan(ee.degToRad(k.camera.fov)/2)*k.camera.position.z*(window.innerWidth/window.innerHeight),o=e+n+30;i.position.x=o,i.rotation.y=-.45,i.visible=!0;const r=o-e,l=r*.18,c=(r-l)/Ds,u=2*l/Ds,f=se.timeline({delay:t?.25:0,onComplete:s});f.to(i.position,{x:e+l,duration:c,ease:"none"},0).to(i.position,{x:e,duration:u,ease:"power2.out"}),f.to(i.rotation,{y:0,duration:c+u,ease:"sine.out"},0)}function Hn(){ie.clear(),Ye=!0,d==null||d.markLive(),nt("loader_dismiss"),Mt("time_to_dismiss","module_eval","loader_dismiss"),me&&me.classList.add("fade-out"),[qt,yt,Tt,document.getElementById("touch-controls")].forEach((s,a)=>{s&&setTimeout(()=>s.classList.remove("hud-hidden"),(X?80:200)+a*120)}),setTimeout(()=>{me&&(me.style.display="none")},X?400:1400);const t=!!localStorage.getItem("phf-intro-seen");setTimeout(()=>Sn.open(t),X?400:900);const e=()=>{Xa()};"requestIdleCallback"in window?requestIdleCallback(e,{timeout:1800}):setTimeout(e,800),dn()&&setTimeout(()=>cn(),100),"requestIdleCallback"in window?requestIdleCallback(()=>{var s;return(s=J==null?void 0:J.enableDeferred)==null?void 0:s.call(J,O.skyTier)},{timeout:2e3}):setTimeout(()=>{var s;return(s=J==null?void 0:J.enableDeferred)==null?void 0:s.call(J,O.skyTier)},600)}const Si=new Ki;let ve=0,ge=0;const $n=.7,Ws=2.4,Gn=1.8;let dt=0,Jt=0;const Us=new v,js=new oe,qs=new oe,$e=new oe,Vn=1.5,Jn=5,Kn=9;let _t=it,ye=0;function Ns(i){const t=S.visible,e=j.group.visible;k.camera.updateMatrixWorld(!0),H.updateMatrixWorld(!0),j.group.updateMatrixWorld(!0),S.updateMatrixWorld(!0),i&&kt&&S.children.length>0?(F.compile(S,k.camera,R),S.visible=!0,j.group.visible=!1):(F.compile(j.group,k.camera,R),S.visible=!1,j.group.visible=!0),F.render(R,k.camera),F.render(R,k.camera),S.visible=t,j.group.visible=e}let ss=document.hidden;document.addEventListener("visibilitychange",()=>{ss=document.hidden,ss||Si.getDelta()});function Li(){if(requestAnimationFrame(Li),ss||d!=null&&d.isFatal)return;const i=Math.min(Si.getDelta(),.05);if(ve+=i,jn(),!Ye){Es+=i,d==null||d.nudgeDownloadFallback(Es),d==null||d.tick(i),j.group.visible=!1,S.visible=!1,ie.update(i,X),F.render(R,k.camera),Ke&&gt&&ke.clientWidth>0&&(Ke=!1,d==null||d.markFirstMeaningfulFrame());return}if(d==null||d.tick(i),ai&&O.preset==="auto"&&(we+=i*1e3,Yt++,Yt>=gn)){const m=we/Yt;Yt=0,we=0;const w=m>_n?Math.max(vn,Lt-.15):Math.min(O.dpr,Lt+.05);Math.abs(w-Lt)>.04&&(Lt=w,F.setPixelRatio(Lt))}const t=wi(),e=mi.keys,s=e.has("shift"),a=$n*(s?Gn:1),n=t?0:(U==null?void 0:U.joyX)??0,o=t?0:(U==null?void 0:U.joyY)??0;if(U!=null&&U.takeMap()&&!t&&Ct.toggle(),U&&!t){const{dx:m,dy:w}=U.popCamDelta();(m||w)&&k.applyTouchDelta(m,w)}U!=null&&U.takeInteract()&&!Ce()&&(q==="detail"?Ee():os()),U!=null&&U.takeJump()&&!t&&es();const r=o<-.15,l=o>.15,c=n<-.15,u=n>.15,f=e.has("w")||e.has("arrowup")||r,y=e.has("s")||e.has("arrowdown")||l,p=e.has("a")||e.has("arrowleft")||c,M=e.has("d")||e.has("arrowright")||u,C=f||y||p||M;C||t?ge=0:ge+=i,Tt&&ni&&(C||t?Xt&&(Xt=!1,Tt.classList.add("faded")):ge>Tn&&!Xt&&(Xt=!0,Tt.classList.remove("faded")));let D=!0,x;if(te)Kt=Math.min(1,Kt+i/yn),H.quaternion.slerpQuaternions(si,ii,wn(Kt)),Kt>=1&&(te=!1),Jt*=Math.exp(-5*i);else{p&&(dt-=Ws*i*(c?Math.min(1,Math.abs(n)*1.35):1)),M&&(dt+=Ws*i*(u?Math.min(1,Math.abs(n)*1.35):1));const m=f?a:y?-a:0;if(Jt+=(m-Jt)*(1-Math.exp(-5*i)),Math.abs(Jt)>.001&&($e.copy(H.quaternion),Us.set(Math.cos(dt),0,Math.sin(dt)),js.setFromAxisAngle(Us,Jt*i),H.quaternion.premultiply(js),tt&&(x=As(),D=!1,x-_t>Vn&&(H.quaternion.copy($e),D=!0),di&&!D))){Qe.set(li,ci);const w=Qe.intersectObject(gt,!0);w.length>0&&w[0].point.y>x+.25&&(H.quaternion.copy($e),D=!0)}ge>5&&!X&&!vt&&!t&&(qs.setFromAxisAngle(new v(0,1,0),.003),H.quaternion.premultiply(qs),D=!0)}!tt&&!vt?(jt-=Rn*i,Dt+=jt*i,Dt<=0&&(Dt=0,jt=0,tt=!0,Pe&&es())):vt&&(Dt=_i),D&&(x=As()),!tt||te?_t=x:x>_t?_t=Math.min(x,_t+Jn*i):_t=Math.max(x,_t-Kn*i);const Y=_t+Dt,At=Math.PI-dt;le?(ae.emotesEnabled=!vt&&!ut.isOpen(),ae.update(i,C,s,!tt),ut.isOpen()&&!ei&&Un()):j.update(i,C,ve,!tt),q!=="detail"?L?((q!=="near"||I._lastIsland!==L)&&(q="near",I._lastIsland=L,I.showPopup(st[L])),$t.has(L)||($t.add(L),Ct.markVisited(L),bs&&(bs.textContent=String($t.size)),kn.forEach((m,w)=>m.classList.toggle("hp-pip--on",w<$t.size)),$t.size===ot.length&&!ws&&(ws=!0,Cn(`<span class="dt-row">${N("trophy",16)}<span><strong>All 6 islands found!</strong> You've seen everything.</span></span>`,5e3)))):q==="near"&&(q="exploring",I._lastIsland=null,I.hidePopup()):(!L||L!==I._lastIsland)&&(q="exploring",I._lastIsland=null,I.closePanel(),I.hidePopup());const B=1-Math.exp(-3.5*i);if(L!==Fs&&(fe=.55,Fs=L),fe>0&&(fe-=i),fe>0||Is){Is=!1;for(let m=0;m<ot.length;m++){const w=ot[m],G=Z[w];if(!G||!G.length)continue;const lt=w===L,ft=lt&&!st[w].noGlow?.45:0,Fe=lt?1:.5;for(let Ie=0;Ie<G.length;Ie++){const V=G[Ie],ce=V.material._origColor;ce&&(V.material.color.r+=(ce.r*Fe-V.material.color.r)*B,V.material.color.g+=(ce.g*Fe-V.material.color.g)*B,V.material.color.b+=(ce.b*Fe-V.material.color.b)*B),V.material._isFloor&&(V.material.emissiveIntensity+=(ft-V.material.emissiveIntensity)*B,lt?V.material.emissive.setHex(be[w]):V.material.emissiveIntensity<.002&&V.material.emissive.set(0,0,0))}}}const rt=L?6:0;xt.intensity+=(rt-xt.intensity)*B,L&&(ue.setHex(be[L]),xt.color.lerp(ue,B));const mt=L?5:4;P.sunLight.intensity+=(mt-P.sunLight.intensity)*B;const h=1-Math.exp(-1.2*i);if(L){const m=ot.indexOf(L);m>=0&&(bt.copy(An[m]),P.sunLight.position.lerp(bt,h)),ue.setHex(be[L]),Ne.set(16765056).lerp(ue,.18),P.sunLight.color.lerp(Ne,B)}else{const m=1-Math.exp(-2.5*i);bt.set(Math.sin(dt)*55,50,-Math.cos(dt)*55),P.sunLight.position.lerp(bt,m),P.sunLight.color.lerp(Ne.set(16771264),B)}{const m=Te,w=m?1.15:.16;for(let G=0;G<Je.length;G++){const lt=Je[G];lt.emissiveIntensity+=(w-lt.emissiveIntensity)*B}k._pivotYExtra+=((m?.7:0)-k._pivotYExtra)*B}if(Te){wt.copy(k.camera.position).sub(S.position),wt.y=0,wt.lengthSq()<1e-4&&wt.set(0,0,1),wt.normalize(),k.camera.getWorldDirection(Ms),ze.crossVectors(Ms,Fn).normalize(),Gt.set(S.position.x,S.position.y+1.4,S.position.z);const m=8,w=8,G=5.5,lt=.7;bt.copy(Gt).addScaledVector(wt,m).addScaledVector(ze,-G),bt.y=S.position.y+w,P.sunLight.position.lerp(bt,h),P.sunLight.target.position.lerp(Gt,h),P.sunLight.target.updateMatrixWorld(),P.sunLight.intensity+=(lt-P.sunLight.intensity)*B;const ft=P.presentationSun2;He.copy(Gt).addScaledVector(wt,m).addScaledVector(ze,G),He.y=S.position.y+w,ft.position.lerp(He,h),ft.target.position.copy(Gt),ft.target.updateMatrixWorld(),ft.color.copy(P.sunLight.color),ft.intensity+=(lt-ft.intensity)*B}else P.sunLight.target.position.lerp(Pn,h),P.sunLight.target.updateMatrixWorld(),P.presentationSun2.intensity+=(0-P.presentationSun2.intensity)*B;pi.update(ve,0),X||ui.update(i),J.update(i,ve,X),Ae.update(i,L,Y,X,Me),k.update(i,it,Y,-1,null,H,dt,C);const T=Ye;let E=1,g=0,W=0;if(T&&!Bs&&(Bt=0),Bs=T,!T)Bt=-1,j.group.scale.setScalar(1),S.scale.setScalar(1),j.group.visible=!1,S.visible=!1;else{const m=kt;if(j.group.visible=!m,S.visible=!0,Bt>=0){Bt+=i;const w=Math.min(1,Bt/qn),G=Nn(w);E=Math.max(.04,G),g=(1-w)*(1-w)*2.4,W=Math.sin(w*Math.PI*3.25)*(1-w)*1.05,w>=1&&(Bt=-1,E=1,g=0,W=0)}}vt||(S.position.set(0,Y+g,0),S.scale.setScalar(E),j.group.position.set(0,Y+g,0),j.group.scale.setScalar(E),Ze||(S.rotation.y=At+W,j.group.rotation.y=At+W)),gt&&(kt&&ye<2?(Ns(!0),ye=2):!kt&&ye<1&&(Ns(!1),ye=1)),F.render(R,k.camera)}Li();
