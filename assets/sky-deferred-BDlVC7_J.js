import{G as f,M as d,a as m,V as p,I as W,Q as R,B as E,S as y,C as G,b as w,c as x,A as M,D as j,d as V,e as H,f as F,L as N,g as $}from"./three-kpKb0UD-.js";const X=11,I=70,A=110;function Y(s){const t=new W(s,0),a=t.attributes.position;for(let o=0;o<a.count;o++){const e=.7+Math.random()*.6;a.setXYZ(o,a.getX(o)*e,a.getY(o)*e,a.getZ(o)*e)}return t.computeVertexNormals(),t}function C(s){const t=I+Math.random()*(A-I),a=Math.random()*Math.PI*2,o=Math.acos(2*Math.random()-1);return s.set(t*Math.sin(o)*Math.cos(a),t*Math.cos(o),t*Math.sin(o)*Math.sin(a))}const D=[7234136,8022620,6051408,8613983];class Q{constructor(){this.group=new f,this._rocks=[];for(let t=0;t<X;t++){const a=.7+Math.random()*1.4,o=new d(Y(a),new m({color:D[t%D.length],flatShading:!0,roughness:1,metalness:0,emissive:657934,emissiveIntensity:.5}));o.castShadow=o.receiveShadow=!1,C(o.position),this._rocks.push({mesh:o,vel:new p((Math.random()-.5)*2.4,(Math.random()-.5)*1.2,(Math.random()-.5)*2.4),spin:new p((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5)}),this.group.add(o)}}update(t,a,o=!1){if(!o)for(const e of this._rocks){const n=e.mesh.position;n.addScaledVector(e.vel,t),e.mesh.rotation.x+=e.spin.x*t,e.mesh.rotation.y+=e.spin.y*t,e.mesh.rotation.z+=e.spin.z*t,n.lengthSq()>A*A*1.6&&C(n).multiplyScalar(-1).clampLength(I,A)}}}const dt=Object.freeze(Object.defineProperty({__proto__:null,Asteroids:Q},Symbol.toStringTag,{value:"Module"})),Z=80,O=["ufo","ufo","rocket","satellite"];function q(){const s=new f,t=i=>new m({color:i,flatShading:!0,roughness:.5,metalness:.4}),a=new d(new w(2.6,1,18),t(10135224));a.rotation.x=Math.PI,a.position.y=-.3;const o=new d(new w(2.2,.7,18),t(12174290));o.position.y=.2;const e=new d(new y(1.1,16,12,0,Math.PI*2,0,Math.PI/2),new m({color:9430015,transparent:!0,opacity:.55,flatShading:!0,emissive:2780808,emissiveIntensity:.5}));e.position.y=.45,s.add(a,o,e);const n=[],c=new y(.22,8,8),r=8;for(let i=0;i<r;i++){const h=i/r*Math.PI*2,u=new d(c,new x({color:16769126,transparent:!0,opacity:1,blending:M,depthWrite:!1}));u.position.set(Math.cos(h)*2.5,-.15,Math.sin(h)*2.5),s.add(u),n.push(u)}const l=new d(new w(2.4,7,18,1,!0),new x({color:10413823,transparent:!0,opacity:.12,side:j,depthWrite:!1,blending:M}));return l.position.y=-4,l.rotation.x=Math.PI,s.add(l),s.userData.tick=i=>{for(let h=0;h<n.length;h++)n[h].material.opacity=.25+.75*(.5+.5*Math.sin(i*6-h*.9));l.material.opacity=.09+.06*(.5+.5*Math.sin(i*2.5))},s.userData.flat=!0,s}function K(){const s=new f,t=new f;t.rotation.x=Math.PI/2,s.add(t);const a=new d(new G(.55,.7,3.2,14),new m({color:15921909,flatShading:!0,roughness:.6})),o=new d(new w(.55,1.3,14),new m({color:15224890,flatShading:!0,roughness:.6}));o.position.y=2.25,t.add(a,o);const e=new m({color:15224890,flatShading:!0,roughness:.6});for(let c=0;c<3;c++){const r=new d(new w(.5,1.2,4),e),l=c/3*Math.PI*2;r.position.set(Math.cos(l)*.7,-1.4,Math.sin(l)*.7),r.rotation.y=-l,t.add(r)}const n=new d(new w(.45,1.6,12),new x({color:16757322,transparent:!0,opacity:.9,blending:M,depthWrite:!1}));return n.rotation.x=Math.PI,n.position.y=-2.4,t.add(n),s.userData.tick=c=>{const r=.7+.3*Math.sin(c*30);n.scale.set(.8+.4*Math.random(),r+.4*Math.random(),.8+.4*Math.random()),n.material.opacity=.7+.3*Math.random()},s.userData.flat=!1,s}function J(){const s=new f,t=new d(new E(1.1,1.1,1.6),new m({color:13217914,flatShading:!0,roughness:.7,metalness:.3}));s.add(t);const a=new m({color:2908078,flatShading:!0,roughness:.4,metalness:.5,emissive:662074,emissiveIntensity:.4});for(const e of[-1,1]){const n=new d(new E(2.6,.06,1.2),a);n.position.x=e*2,s.add(n)}const o=new d(new y(.5,12,8,0,Math.PI*2,0,Math.PI/2),new m({color:15263980,flatShading:!0,roughness:.5}));return o.position.set(0,.7,.4),s.add(o),s.userData.tumble=new p(.2,.35,.1),s.userData.tick=null,s.userData.flat=!0,s}const tt={ufo:q,rocket:K,satellite:J},k=new p;function z(s,t,a,o){return o.set(s*Math.sin(a)*Math.cos(t),s*Math.cos(a),s*Math.sin(a)*Math.sin(t))}class et{constructor(){this.group=new f,this._active=[],this._nextSpawn=2+Math.random()*4}_spawn(){const t=O[Math.random()*O.length|0],a=tt[t](),o=t==="ufo"?1:t==="rocket"?.9:.8;a.scale.setScalar(o);const e=Z*(.8+Math.random()*.5),n=.5+Math.random()*.7,c=Math.random()*Math.PI*2,r=c+(Math.PI*.6+Math.random()*Math.PI*.7)*(Math.random()<.5?1:-1),l=z(e,c,n,new p),i=z(e,r,n,new p),h=l.clone().add(i).multiplyScalar(.5).multiplyScalar(1.25);h.y+=20+Math.random()*25;const u=new R(l,h,i);this.group.add(a),this._active.push({craft:a,curve:u,type:t,age:0,life:10+Math.random()*8,bob:Math.random()*Math.PI*2})}update(t,a,o=!1){if(!o){this._nextSpawn-=t,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=7+Math.random()*10);for(let e=this._active.length-1;e>=0;e--){const n=this._active[e];n.age+=t;const c=n.age/n.life;if(c>=1){this._dispose(n),this._active.splice(e,1);continue}const r=n.craft.userData;n.curve.getPoint(c,n.craft.position),r.flat?(n.craft.position.y+=Math.sin(a*1.5+n.bob)*.8,n.craft.rotation.z=Math.sin(a*.8+n.bob)*.15,n.craft.rotation.y+=t*.4,r.tumble&&(n.craft.rotation.x+=r.tumble.x*t,n.craft.rotation.y+=r.tumble.y*t,n.craft.rotation.z+=r.tumble.z*t)):(n.curve.getPoint(Math.min(1,c+.01),k),n.craft.lookAt(k));const l=Math.min(1,c/.08,(1-c)/.08);this._setOpacity(n.craft,l),r.tick&&r.tick(a,t)}}}_setOpacity(t,a){t.traverse(o=>{if(!o.isMesh)return;const e=o.material;e.transparent?(e.userData.baseOpacity===void 0&&(e.userData.baseOpacity=e.opacity),e.opacity=e.userData.baseOpacity*a):o.visible=a>.02})}_dispose(t){this.group.remove(t.craft),t.craft.traverse(a=>{a.isMesh&&(a.geometry.dispose(),a.material.dispose())})}}const ut=Object.freeze(Object.defineProperty({__proto__:null,Flyers:et},Symbol.toStringTag,{value:"Module"})),v=60,at=60,L=150,nt=`
  attribute float alpha;
  attribute float mixv;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vAlpha = alpha; vMix = mixv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ot=`
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec3 head = vec3(1.0, 0.97, 0.85);   // warm white
    vec3 tail = vec3(0.45, 0.85, 1.0);   // cyan
    gl_FragColor = vec4(mix(head, tail, vMix), vAlpha);
  }
`,g=new p,S=new p;function U(s,t,a,o){return o.set(s*Math.sin(a)*Math.cos(t),s*Math.cos(a),s*Math.sin(a)*Math.sin(t))}class st{constructor(){this.group=new f,this._active=null,this._nextSpawn=15+Math.random()*20,this._tailMat=new V({vertexShader:nt,fragmentShader:ot,transparent:!0,depthWrite:!1,blending:M})}_spawn(){const t=.4+Math.random()*.5,a=Math.random()*Math.PI*2,o=a+(Math.PI*.7+Math.random()*Math.PI*.6)*(Math.random()<.5?1:-1),e=U(L,a,t,new p),n=U(L,o,t,new p),c=e.clone().add(n).multiplyScalar(.5);c.y+=30;const r=new R(e,c,n),l=new Float32Array(v*3),i=new Float32Array(v),h=new Float32Array(v);for(let b=0;b<v;b++)h[b]=b/(v-1);const u=new H;u.setAttribute("position",new F(l,3)),u.setAttribute("alpha",new F(i,1)),u.setAttribute("mixv",new F(h,1));const P=new N(u,this._tailMat),_=new f;_.add(new d(new y(1.1,12,12),new x({color:16776688,blending:M,depthWrite:!1,transparent:!0}))),_.add(new d(new y(3,16,16),new x({color:13625599,transparent:!0,opacity:.35,blending:M,depthWrite:!1,side:$}))),this.group.add(P,_),this._active={curve:r,line:P,geo:u,head:_,age:0,life:5.5}}update(t,a,o=!1){if(o)return;if(!this._active){this._nextSpawn-=t,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=35+Math.random()*35);return}const e=this._active;e.age+=t;const n=Math.min(1,e.age/e.life);e.curve.getPoint(n,g),e.curve.getTangent(n,S),e.head.position.copy(g);const c=Math.min(1,n/.12,(1-n)/.18),r=e.geo.attributes.position.array,l=e.geo.attributes.alpha.array;for(let i=0;i<v;i++){const h=i/(v-1),u=h*at;r[i*3]=g.x-S.x*u,r[i*3+1]=g.y-S.y*u,r[i*3+2]=g.z-S.z*u,l[i]=Math.pow(1-h,1.5)*c}e.geo.attributes.position.needsUpdate=!0,e.geo.attributes.alpha.needsUpdate=!0,e.head.scale.setScalar(c),n>=1&&(this.group.remove(e.line,e.head),e.geo.dispose(),e.head.traverse(i=>{i.isMesh&&(i.geometry.dispose(),i.material.dispose())}),this._active=null)}}const pt=Object.freeze(Object.defineProperty({__proto__:null,Comet:st},Symbol.toStringTag,{value:"Module"})),T=48,it=34,B=Math.PI*1.15,rt=`
  uniform float time;
  uniform float motion;            // 0 = frozen (reduced motion), 1 = full
  varying vec2  vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // gentle horizontal wave that grows toward the top edge → classic curtain sway
    float sway = sin(uv.x * 9.0 + time * 0.8) * 1.6
               + sin(uv.x * 4.0 - time * 0.5) * 2.4;
    float k = uv.y * motion;
    vec3 outward = normalize(vec3(p.x, 0.0, p.z));
    p += outward * sway * k;
    p.y += sin(uv.x * 6.0 + time * 0.6) * 2.0 * k;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,ct=`
  uniform float time;
  uniform float motion;
  varying vec2  vUv;
  void main() {
    // vertical gradient: teal/green at the base → purple → fade out at the top
    vec3 green  = vec3(0.30, 0.85, 0.55);
    vec3 purple = vec3(0.55, 0.30, 0.95);
    vec3 col = mix(green, purple, smoothstep(0.0, 1.0, vUv.y));

    // vertical curtains scrolling sideways
    float curtains = 0.6 + 0.4 * sin(vUv.x * 24.0 + time * motion * 1.5)
                         * sin(vUv.x * 10.0 - time * motion * 0.7);

    // fade top & bottom edges, plus the arc ends
    float vFade = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
    float xFade = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));

    float a = vFade * xFade * curtains * 0.2;
    gl_FragColor = vec4(col, a);
  }
`;class lt{constructor(){this.group=new f,this._mat=new V({uniforms:{time:{value:Math.random()*100},motion:{value:1}},vertexShader:rt,fragmentShader:ct,transparent:!0,depthWrite:!1,blending:M,side:j});const t=new G(T,T,it,96,12,!0,-B/2,B),a=new d(t,this._mat);a.position.y=14,this.group.add(a)}update(t,a,o=!1){this._mat.uniforms.motion.value=o?0:1,o||(this._mat.uniforms.time.value=a)}}const mt=Object.freeze(Object.defineProperty({__proto__:null,Aurora:lt},Symbol.toStringTag,{value:"Module"}));export{dt as A,pt as C,ut as F,mt as a};
