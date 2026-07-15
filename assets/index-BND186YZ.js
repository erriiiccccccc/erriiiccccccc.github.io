(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $u="170",L0=0,ef=1,I0=2,qm=1,jm=2,Li=3,yi=0,ln=1,vn=2,fs=0,Xr=1,Yt=2,tf=3,nf=4,D0=5,zs=100,F0=101,U0=102,N0=103,O0=104,B0=200,k0=201,z0=202,V0=203,Ih=204,Dh=205,H0=206,G0=207,W0=208,X0=209,q0=210,j0=211,Y0=212,$0=213,K0=214,Fh=0,Uh=1,Nh=2,ta=3,Oh=4,Bh=5,kh=6,zh=7,oc=0,J0=1,Z0=2,ps=0,Q0=1,ev=2,tv=3,Ym=4,nv=5,iv=6,sv=7,sf="attached",rv="detached",$m=300,na=301,ia=302,Gl=303,Vh=304,lc=306,_s=1e3,gi=1001,Wl=1002,pn=1003,Km=1004,Xa=1005,Pn=1006,Cl=1007,Oi=1008,Hi=1009,Jm=1010,Zm=1011,co=1012,Ku=1013,Zs=1014,si=1015,Po=1016,Ju=1017,Zu=1018,sa=1020,Qm=35902,eg=1021,tg=1022,Wn=1023,ng=1024,ig=1025,qr=1026,ra=1027,Qu=1028,ed=1029,sg=1030,td=1031,nd=1033,Pl=33776,Ll=33777,Il=33778,Dl=33779,Hh=35840,Gh=35841,Wh=35842,Xh=35843,qh=36196,jh=37492,Yh=37496,$h=37808,Kh=37809,Jh=37810,Zh=37811,Qh=37812,eu=37813,tu=37814,nu=37815,iu=37816,su=37817,ru=37818,au=37819,ou=37820,lu=37821,Fl=36492,cu=36494,hu=36495,rg=36283,uu=36284,du=36285,fu=36286,ag=2200,Ul=2201,av=2202,ho=2300,uo=2301,Sc=2302,Nr=2400,Or=2401,Xl=2402,id=2500,ov=2501,lv=0,og=1,pu=2,cv=3200,hv=3201,cc=0,uv=1,as="",nt="srgb",mn="srgb-linear",hc="linear",lt="srgb",or=7680,rf=519,dv=512,fv=513,pv=514,lg=515,mv=516,gv=517,_v=518,vv=519,mu=35044,af="300 es",Bi=2e3,ql=2001;class sr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let of=1234567;const Za=Math.PI/180,aa=180/Math.PI;function ri(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[r&255]+tn[r>>8&255]+tn[r>>16&255]+tn[r>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function zt(r,e,t){return Math.max(e,Math.min(t,r))}function sd(r,e){return(r%e+e)%e}function yv(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function xv(r,e,t){return r!==e?(t-r)/(e-r):0}function Qa(r,e,t){return(1-t)*r+t*e}function Mv(r,e,t,n){return Qa(r,e,1-Math.exp(-t*n))}function Sv(r,e=1){return e-Math.abs(sd(r,e*2)-e)}function bv(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function wv(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Tv(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ev(r,e){return r+Math.random()*(e-r)}function Av(r){return r*(.5-Math.random())}function Rv(r){r!==void 0&&(of=r);let e=of+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cv(r){return r*Za}function Pv(r){return r*aa}function Lv(r){return(r&r-1)===0&&r!==0}function Iv(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Dv(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fv(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*p,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*p,o*c);break;case"ZYZ":r.set(l*p,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ii(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ot(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Dt={DEG2RAD:Za,RAD2DEG:aa,generateUUID:ri,clamp:zt,euclideanModulo:sd,mapLinear:yv,inverseLerp:xv,lerp:Qa,damp:Mv,pingpong:Sv,smoothstep:bv,smootherstep:wv,randInt:Tv,randFloat:Ev,randFloatSpread:Av,seededRandom:Rv,degToRad:Cv,radToDeg:Pv,isPowerOfTwo:Lv,ceilPowerOfTwo:Iv,floorPowerOfTwo:Dv,setQuaternionFromProperEuler:Fv,normalize:ot,denormalize:ii};class ie{constructor(e=0,t=0){ie.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,t,n,i,s,a,o,l,c){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],x=i[1],y=i[4],v=i[7],E=i[2],b=i[5],T=i[8];return s[0]=a*_+o*x+l*E,s[3]=a*g+o*y+l*b,s[6]=a*m+o*v+l*T,s[1]=c*_+h*x+u*E,s[4]=c*g+h*y+u*b,s[7]=c*m+h*v+u*T,s[2]=d*_+f*x+p*E,s[5]=d*g+f*y+p*b,s[8]=d*m+f*v+p*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(bc.makeScale(e,t)),this}rotate(e){return this.premultiply(bc.makeRotation(-e)),this}translate(e,t){return this.premultiply(bc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bc=new Fe;function cg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function fo(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Uv(){const r=fo("canvas");return r.style.display="block",r}const lf={};function qa(r){r in lf||(lf[r]=!0,console.warn(r))}function Nv(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Ov(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Bv(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const De={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===lt&&(r.r=ki(r.r),r.g=ki(r.g),r.b=ki(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===lt&&(r.r=jr(r.r),r.g=jr(r.g),r.b=jr(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===as?hc:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function jr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const cf=[.64,.33,.3,.6,.15,.06],hf=[.2126,.7152,.0722],uf=[.3127,.329],df=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ff=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);De.define({[mn]:{primaries:cf,whitePoint:uf,transfer:hc,toXYZ:df,fromXYZ:ff,luminanceCoefficients:hf,workingColorSpaceConfig:{unpackColorSpace:nt},outputColorSpaceConfig:{drawingBufferColorSpace:nt}},[nt]:{primaries:cf,whitePoint:uf,transfer:lt,toXYZ:df,fromXYZ:ff,luminanceCoefficients:hf,outputColorSpaceConfig:{drawingBufferColorSpace:nt}}});let lr;class kv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{lr===void 0&&(lr=fo("canvas")),lr.width=e.width,lr.height=e.height;const n=lr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=lr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ki(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ki(t[n]/255)*255):t[n]=ki(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zv=0;class hg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zv++}),this.uuid=ri(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(wc(i[a].image)):s.push(wc(i[a]))}else s=wc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function wc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?kv.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vv=0;class kt extends sr{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=gi,i=gi,s=Pn,a=Oi,o=Wn,l=Hi,c=kt.DEFAULT_ANISOTROPY,h=as){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vv++}),this.uuid=ri(),this.name="",this.source=new hg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$m)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _s:e.x=e.x-Math.floor(e.x);break;case gi:e.x=e.x<0?0:1;break;case Wl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _s:e.y=e.y-Math.floor(e.y);break;case gi:e.y=e.y<0?0:1;break;case Wl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=$m;kt.DEFAULT_ANISOTROPY=1;class We{constructor(e=0,t=0,n=0,i=1){We.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(f+1)/2,E=(m+1)/2,b=(h+d)/4,T=(u+_)/4,R=(p+g)/4;return y>v&&y>E?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=b/n,s=T/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=b/i,s=R/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=T/s,i=R/s),this.set(n,i,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hv extends sr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new We(0,0,e,t),this.scissorTest=!1,this.viewport=new We(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new kt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new hg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qs extends Hv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ug extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gv extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class St{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],p=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==p){let g=1-o;const m=l*d+c*f+h*p+u*_,x=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const E=Math.sqrt(y),b=Math.atan2(E,m*x);g=Math.sin(g*b)/E,o=Math.sin(o*b)/E}const v=o*x;if(l=l*g+d*v,c=c*g+f*v,h=h*g+p*v,u=u*g+_*v,g===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tc.copy(this).projectOnVector(e),this.sub(Tc)}reflect(e){return this.sub(Tc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Tc=new C,pf=new St;class rn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,$n):$n.fromBufferAttribute(s,a),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ko.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ko.copy(n.boundingBox)),ko.applyMatrix4(e.matrixWorld),this.union(ko)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ba),zo.subVectors(this.max,ba),cr.subVectors(e.a,ba),hr.subVectors(e.b,ba),ur.subVectors(e.c,ba),Ji.subVectors(hr,cr),Zi.subVectors(ur,hr),ws.subVectors(cr,ur);let t=[0,-Ji.z,Ji.y,0,-Zi.z,Zi.y,0,-ws.z,ws.y,Ji.z,0,-Ji.x,Zi.z,0,-Zi.x,ws.z,0,-ws.x,-Ji.y,Ji.x,0,-Zi.y,Zi.x,0,-ws.y,ws.x,0];return!Ec(t,cr,hr,ur,zo)||(t=[1,0,0,0,1,0,0,0,1],!Ec(t,cr,hr,ur,zo))?!1:(Vo.crossVectors(Ji,Zi),t=[Vo.x,Vo.y,Vo.z],Ec(t,cr,hr,ur,zo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ti=[new C,new C,new C,new C,new C,new C,new C,new C],$n=new C,ko=new rn,cr=new C,hr=new C,ur=new C,Ji=new C,Zi=new C,ws=new C,ba=new C,zo=new C,Vo=new C,Ts=new C;function Ec(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ts.fromArray(r,s);const o=i.x*Math.abs(Ts.x)+i.y*Math.abs(Ts.y)+i.z*Math.abs(Ts.z),l=e.dot(Ts),c=t.dot(Ts),h=n.dot(Ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Wv=new rn,wa=new C,Ac=new C;class ci{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Wv.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wa.subVectors(e,this.center);const t=wa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(wa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wa.copy(e.center).add(Ac)),this.expandByPoint(wa.copy(e.center).sub(Ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ei=new C,Rc=new C,Ho=new C,Qi=new C,Cc=new C,Go=new C,Pc=new C;class Lo{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Rc.copy(e).add(t).multiplyScalar(.5),Ho.copy(t).sub(e).normalize(),Qi.copy(this.origin).sub(Rc);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ho),o=Qi.dot(this.direction),l=-Qi.dot(Ho),c=Qi.lengthSq(),h=Math.abs(1-a*a);let u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Rc).addScaledVector(Ho,d),f}intersectSphere(e,t){Ei.subVectors(e.center,this.origin);const n=Ei.dot(this.direction),i=Ei.dot(Ei)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,n,i,s){Cc.subVectors(t,e),Go.subVectors(n,e),Pc.crossVectors(Cc,Go);let a=this.direction.dot(Pc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qi.subVectors(this.origin,e);const l=o*this.direction.dot(Go.crossVectors(Qi,Go));if(l<0)return null;const c=o*this.direction.dot(Cc.cross(Qi));if(c<0||l+c>a)return null;const h=-o*Qi.dot(Pc);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fe{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,p,_,g){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,p,_,g)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/dr.setFromMatrixColumn(e,0).length(),s=1/dr.setFromMatrixColumn(e,1).length(),a=1/dr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xv,e,qv)}lookAt(e,t,n){const i=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),es.crossVectors(n,En),es.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),es.crossVectors(n,En)),es.normalize(),Wo.crossVectors(En,es),i[0]=es.x,i[4]=Wo.x,i[8]=En.x,i[1]=es.y,i[5]=Wo.y,i[9]=En.y,i[2]=es.z,i[6]=Wo.z,i[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],x=n[3],y=n[7],v=n[11],E=n[15],b=i[0],T=i[4],R=i[8],M=i[12],S=i[1],L=i[5],F=i[9],I=i[13],D=i[2],z=i[6],N=i[10],G=i[14],V=i[3],$=i[7],ne=i[11],de=i[15];return s[0]=a*b+o*S+l*D+c*V,s[4]=a*T+o*L+l*z+c*$,s[8]=a*R+o*F+l*N+c*ne,s[12]=a*M+o*I+l*G+c*de,s[1]=h*b+u*S+d*D+f*V,s[5]=h*T+u*L+d*z+f*$,s[9]=h*R+u*F+d*N+f*ne,s[13]=h*M+u*I+d*G+f*de,s[2]=p*b+_*S+g*D+m*V,s[6]=p*T+_*L+g*z+m*$,s[10]=p*R+_*F+g*N+m*ne,s[14]=p*M+_*I+g*G+m*de,s[3]=x*b+y*S+v*D+E*V,s[7]=x*T+y*L+v*z+E*$,s[11]=x*R+y*F+v*N+E*ne,s[15]=x*M+y*I+v*G+E*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+_*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+g*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+m*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],x=u*g*c-_*d*c+_*l*f-o*g*f-u*l*m+o*d*m,y=p*d*c-h*g*c-p*l*f+a*g*f+h*l*m-a*d*m,v=h*_*c-p*u*c+p*o*f-a*_*f-h*o*m+a*u*m,E=p*u*l-h*_*l-p*o*d+a*_*d+h*o*g-a*u*g,b=t*x+n*y+i*v+s*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=x*T,e[1]=(_*d*s-u*g*s-_*i*f+n*g*f+u*i*m-n*d*m)*T,e[2]=(o*g*s-_*l*s+_*i*c-n*g*c-o*i*m+n*l*m)*T,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*T,e[4]=y*T,e[5]=(h*g*s-p*d*s+p*i*f-t*g*f-h*i*m+t*d*m)*T,e[6]=(p*l*s-a*g*s-p*i*c+t*g*c+a*i*m-t*l*m)*T,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*T,e[8]=v*T,e[9]=(p*u*s-h*_*s-p*n*f+t*_*f+h*n*m-t*u*m)*T,e[10]=(a*_*s-p*o*s+p*n*c-t*_*c-a*n*m+t*o*m)*T,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*T,e[12]=E*T,e[13]=(h*_*i-p*u*i+p*n*d-t*_*d-h*n*g+t*u*g)*T,e[14]=(p*o*i-a*_*i-p*n*l+t*_*l+a*n*g-t*o*g)*T,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,p=s*u,_=a*h,g=a*u,m=o*u,x=l*c,y=l*h,v=l*u,E=n.x,b=n.y,T=n.z;return i[0]=(1-(_+m))*E,i[1]=(f+v)*E,i[2]=(p-y)*E,i[3]=0,i[4]=(f-v)*b,i[5]=(1-(d+m))*b,i[6]=(g+x)*b,i[7]=0,i[8]=(p+y)*T,i[9]=(g-x)*T,i[10]=(1-(d+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=dr.set(i[0],i[1],i[2]).length();const a=dr.set(i[4],i[5],i[6]).length(),o=dr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Kn.copy(this);const c=1/s,h=1/a,u=1/o;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=h,Kn.elements[5]*=h,Kn.elements[6]*=h,Kn.elements[8]*=u,Kn.elements[9]*=u,Kn.elements[10]*=u,t.setFromRotationMatrix(Kn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Bi){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,p;if(o===Bi)f=-(a+s)/(a-s),p=-2*a*s/(a-s);else if(o===ql)f=-a/(a-s),p=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Bi){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,f=(n+i)*h;let p,_;if(o===Bi)p=(a+s)*u,_=-2*u;else if(o===ql)p=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const dr=new C,Kn=new fe,Xv=new C(0,0,0),qv=new C(1,1,1),es=new C,Wo=new C,En=new C,mf=new fe,gf=new St;class Vt{constructor(e=0,t=0,n=0,i=Vt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gf.setFromEuler(this),this.setFromQuaternion(gf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vt.DEFAULT_ORDER="XYZ";class rd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jv=0;const _f=new C,fr=new St,Ai=new fe,Xo=new C,Ta=new C,Yv=new C,$v=new St,vf=new C(1,0,0),yf=new C(0,1,0),xf=new C(0,0,1),Mf={type:"added"},Kv={type:"removed"},pr={type:"childadded",child:null},Lc={type:"childremoved",child:null};class ct extends sr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jv++}),this.uuid=ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ct.DEFAULT_UP.clone();const e=new C,t=new Vt,n=new St,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new fe},normalMatrix:{value:new Fe}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.multiply(fr),this}rotateOnWorldAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.premultiply(fr),this}rotateX(e){return this.rotateOnAxis(vf,e)}rotateY(e){return this.rotateOnAxis(yf,e)}rotateZ(e){return this.rotateOnAxis(xf,e)}translateOnAxis(e,t){return _f.copy(e).applyQuaternion(this.quaternion),this.position.add(_f.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vf,e)}translateY(e){return this.translateOnAxis(yf,e)}translateZ(e){return this.translateOnAxis(xf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xo.copy(e):Xo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Ta,Xo,this.up):Ai.lookAt(Xo,Ta,this.up),this.quaternion.setFromRotationMatrix(Ai),i&&(Ai.extractRotation(i.matrixWorld),fr.setFromRotationMatrix(Ai),this.quaternion.premultiply(fr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mf),pr.child=e,this.dispatchEvent(pr),pr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kv),Lc.child=e,this.dispatchEvent(Lc),Lc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mf),pr.child=e,this.dispatchEvent(pr),pr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,e,Yv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,$v,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ct.DEFAULT_UP=new C(0,1,0);ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jn=new C,Ri=new C,Ic=new C,Ci=new C,mr=new C,gr=new C,Sf=new C,Dc=new C,Fc=new C,Uc=new C,Nc=new We,Oc=new We,Bc=new We;class Hn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Jn.subVectors(e,t),i.cross(Jn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Jn.subVectors(i,t),Ri.subVectors(n,t),Ic.subVectors(e,t);const a=Jn.dot(Jn),o=Jn.dot(Ri),l=Jn.dot(Ic),c=Ri.dot(Ri),h=Ri.dot(Ic),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Nc.setScalar(0),Oc.setScalar(0),Bc.setScalar(0),Nc.fromBufferAttribute(e,t),Oc.fromBufferAttribute(e,n),Bc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Nc,s.x),a.addScaledVector(Oc,s.y),a.addScaledVector(Bc,s.z),a}static isFrontFacing(e,t,n,i){return Jn.subVectors(n,t),Ri.subVectors(e,t),Jn.cross(Ri).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),Jn.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Hn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;mr.subVectors(i,n),gr.subVectors(s,n),Dc.subVectors(e,n);const l=mr.dot(Dc),c=gr.dot(Dc);if(l<=0&&c<=0)return t.copy(n);Fc.subVectors(e,i);const h=mr.dot(Fc),u=gr.dot(Fc);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(mr,a);Uc.subVectors(e,s);const f=mr.dot(Uc),p=gr.dot(Uc);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(gr,o);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Sf.subVectors(s,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(Sf,o);const m=1/(g+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(mr,a).addScaledVector(gr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const dg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ts={h:0,s:0,l:0},qo={h:0,s:0,l:0};function kc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,De.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=De.workingColorSpace){return this.r=e,this.g=t,this.b=n,De.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=De.workingColorSpace){if(e=sd(e,1),t=zt(t,0,1),n=zt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=kc(a,s,e+1/3),this.g=kc(a,s,e),this.b=kc(a,s,e-1/3)}return De.toWorkingColorSpace(this,i),this}setStyle(e,t=nt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){const n=dg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=jr(e.r),this.g=jr(e.g),this.b=jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return De.fromWorkingColorSpace(nn.copy(this),e),Math.round(zt(nn.r*255,0,255))*65536+Math.round(zt(nn.g*255,0,255))*256+Math.round(zt(nn.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=De.workingColorSpace){De.fromWorkingColorSpace(nn.copy(this),t);const n=nn.r,i=nn.g,s=nn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=De.workingColorSpace){return De.fromWorkingColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=nt){De.fromWorkingColorSpace(nn.copy(this),e);const t=nn.r,n=nn.g,i=nn.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ts),this.setHSL(ts.h+e,ts.s+t,ts.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ts),e.getHSL(qo);const n=Qa(ts.h,qo.h,t),i=Qa(ts.s,qo.s,t),s=Qa(ts.l,qo.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new oe;oe.NAMES=dg;let Jv=0;class Dn extends sr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jv++}),this.uuid=ri(),this.name="",this.blending=Xr,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ih,this.blendDst=Dh,this.blendEquation=zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=or,this.stencilZFail=or,this.stencilZPass=or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xr&&(n.blending=this.blending),this.side!==yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ih&&(n.blendSrc=this.blendSrc),this.blendDst!==Dh&&(n.blendDst=this.blendDst),this.blendEquation!==zs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ta&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==or&&(n.stencilFail=this.stencilFail),this.stencilZFail!==or&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==or&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Zt extends Dn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new C,jo=new ie;class Je{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=mu,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)jo.fromBufferAttribute(this,t),jo.applyMatrix3(e),this.setXY(t,jo.x,jo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mu&&(e.usage=this.usage),e}}class ad extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class fg extends Je{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Qe extends Je{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Zv=0;const kn=new fe,zc=new ct,_r=new C,An=new rn,Ea=new rn,Xt=new C;class wt extends sr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zv++}),this.uuid=ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cg(e)?fg:ad)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Fe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return zc.lookAt(e),zc.updateMatrix(),this.applyMatrix4(zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_r).negate(),this.translate(_r.x,_r.y,_r.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qe(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];An.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ea.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(An.min,Ea.min),An.expandByPoint(Xt),Xt.addVectors(An.max,Ea.max),An.expandByPoint(Xt)):(An.expandByPoint(Ea.min),An.expandByPoint(Ea.max))}An.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Xt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Xt.fromBufferAttribute(o,c),l&&(_r.fromBufferAttribute(e,c),Xt.add(_r)),i=Math.max(i,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new C,l[R]=new C;const c=new C,h=new C,u=new C,d=new ie,f=new ie,p=new ie,_=new C,g=new C;function m(R,M,S){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,S),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const L=1/(f.x*p.y-p.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(L),o[R].add(_),o[M].add(_),o[S].add(_),l[R].add(g),l[M].add(g),l[S].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let R=0,M=x.length;R<M;++R){const S=x[R],L=S.start,F=S.count;for(let I=L,D=L+F;I<D;I+=3)m(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const y=new C,v=new C,E=new C,b=new C;function T(R){E.fromBufferAttribute(i,R),b.copy(E);const M=o[R];y.copy(M),y.sub(E.multiplyScalar(E.dot(M))).normalize(),v.crossVectors(b,M);const L=v.dot(l[R])<0?-1:1;a.setXYZW(R,y.x,y.y,y.z,L)}for(let R=0,M=x.length;R<M;++R){const S=x[R],L=S.start,F=S.count;for(let I=L,D=L+F;I<D;I+=3)T(e.getX(I+0)),T(e.getX(I+1)),T(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Je(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bf=new fe,Es=new Lo,Yo=new ci,wf=new C,$o=new C,Ko=new C,Jo=new C,Vc=new C,Zo=new C,Tf=new C,Qo=new C;class ve extends ct{constructor(e=new wt,t=new Zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Zo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Vc.fromBufferAttribute(u,e),a?Zo.addScaledVector(Vc,h):Zo.addScaledVector(Vc.sub(t),h))}t.add(Zo)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(s),Es.copy(e.ray).recast(e.near),!(Yo.containsPoint(Es.origin)===!1&&(Es.intersectSphere(Yo,wf)===null||Es.origin.distanceToSquared(wf)>(e.far-e.near)**2))&&(bf.copy(s).invert(),Es.copy(e.ray).applyMatrix4(bf),!(n.boundingBox!==null&&Es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Es)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=x,E=y;v<E;v+=3){const b=o.getX(v),T=o.getX(v+1),R=o.getX(v+2);i=el(this,m,e,n,c,h,u,b,T,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const x=o.getX(g),y=o.getX(g+1),v=o.getX(g+2);i=el(this,a,e,n,c,h,u,x,y,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=x,E=y;v<E;v+=3){const b=v,T=v+1,R=v+2;i=el(this,m,e,n,c,h,u,b,T,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const x=g,y=g+1,v=g+2;i=el(this,a,e,n,c,h,u,x,y,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Qv(r,e,t,n,i,s,a,o){let l;if(e.side===ln?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===yi,o),l===null)return null;Qo.copy(o),Qo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Qo);return c<t.near||c>t.far?null:{distance:c,point:Qo.clone(),object:r}}function el(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,$o),r.getVertexPosition(l,Ko),r.getVertexPosition(c,Jo);const h=Qv(r,e,t,n,$o,Ko,Jo,Tf);if(h){const u=new C;Hn.getBarycoord(Tf,$o,Ko,Jo,u),i&&(h.uv=Hn.getInterpolatedAttribute(i,o,l,c,u,new ie)),s&&(h.uv1=Hn.getInterpolatedAttribute(s,o,l,c,u,new ie)),a&&(h.normal=Hn.getInterpolatedAttribute(a,o,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new C,materialIndex:0};Hn.getNormal($o,Ko,Jo,d.normal),h.face=d,h.barycoord=u}return h}class vi extends wt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(u,2));function p(_,g,m,x,y,v,E,b,T,R,M){const S=v/T,L=E/R,F=v/2,I=E/2,D=b/2,z=T+1,N=R+1;let G=0,V=0;const $=new C;for(let ne=0;ne<N;ne++){const de=ne*L-I;for(let we=0;we<z;we++){const Ce=we*S-F;$[_]=Ce*x,$[g]=de*y,$[m]=D,c.push($.x,$.y,$.z),$[_]=0,$[g]=0,$[m]=b>0?1:-1,h.push($.x,$.y,$.z),u.push(we/T),u.push(1-ne/R),G+=1}}for(let ne=0;ne<R;ne++)for(let de=0;de<T;de++){const we=d+de+z*ne,Ce=d+de+z*(ne+1),q=d+(de+1)+z*(ne+1),Z=d+(de+1)+z*ne;l.push(we,Ce,Z),l.push(Ce,q,Z),V+=6}o.addGroup(f,V,M),f+=V,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function oa(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function un(r){const e={};for(let t=0;t<r.length;t++){const n=oa(r[t]);for(const i in n)e[i]=n[i]}return e}function ey(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function pg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:De.workingColorSpace}const ty={clone:oa,merge:un};var ny=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Dn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ny,this.fragmentShader=iy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oa(e.uniforms),this.uniformsGroups=ey(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}let mg=class extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};const ns=new C,Ef=new ie,Af=new ie;class sn extends mg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=aa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Za*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return aa*2*Math.atan(Math.tan(Za*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ns.x,ns.y).multiplyScalar(-e/ns.z),ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ns.x,ns.y).multiplyScalar(-e/ns.z)}getViewSize(e,t){return this.getViewBounds(e,Ef,Af),t.subVectors(Af,Ef)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Za*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vr=-90,yr=1;class sy extends ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new sn(vr,yr,e,t);i.layers=this.layers,this.add(i);const s=new sn(vr,yr,e,t);s.layers=this.layers,this.add(s);const a=new sn(vr,yr,e,t);a.layers=this.layers,this.add(a);const o=new sn(vr,yr,e,t);o.layers=this.layers,this.add(o);const l=new sn(vr,yr,e,t);l.layers=this.layers,this.add(l);const c=new sn(vr,yr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ql)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class gg extends kt{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:na,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ry extends Qs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new gg(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vi(5,5,5),s=new bn({name:"CubemapFromEquirect",uniforms:oa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:fs});s.uniforms.tEquirect.value=t;const a=new ve(i,s),o=t.minFilter;return t.minFilter===Oi&&(t.minFilter=Pn),new sy(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const Hc=new C,ay=new C,oy=new Fe;class Os{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Hc.subVectors(n,t).cross(ay.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Hc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||oy.getNormalMatrix(e),i=this.coplanarPoint(Hc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const As=new ci,tl=new C;class od{constructor(e=new Os,t=new Os,n=new Os,i=new Os,s=new Os,a=new Os){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bi){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],_=i[10],g=i[11],m=i[12],x=i[13],y=i[14],v=i[15];if(n[0].setComponents(l-s,d-c,g-f,v-m).normalize(),n[1].setComponents(l+s,d+c,g+f,v+m).normalize(),n[2].setComponents(l+a,d+h,g+p,v+x).normalize(),n[3].setComponents(l-a,d-h,g-p,v-x).normalize(),n[4].setComponents(l-o,d-u,g-_,v-y).normalize(),t===Bi)n[5].setComponents(l+o,d+u,g+_,v+y).normalize();else if(t===ql)n[5].setComponents(o,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),As.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),As.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(As)}intersectsSprite(e){return As.center.set(0,0,0),As.radius=.7071067811865476,As.applyMatrix4(e.matrixWorld),this.intersectsSphere(As)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(tl.x=i.normal.x>0?e.max.x:e.min.x,tl.y=i.normal.y>0?e.max.y:e.min.y,tl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(tl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _g(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function ly(r){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class Io extends wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const x=m*d-a;for(let y=0;y<c;y++){const v=y*u-s;p.push(v,-x,0),_.push(0,0,1),g.push(y/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const y=x+c*m,v=x+c*(m+1),E=x+1+c*(m+1),b=x+1+c*m;f.push(y,v,b),f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new Qe(p,3)),this.setAttribute("normal",new Qe(_,3)),this.setAttribute("uv",new Qe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.width,e.height,e.widthSegments,e.heightSegments)}}var cy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,uy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,py=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,my=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_y=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,My=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Sy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,by=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ty=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ay=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ry=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Py=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ly=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Iy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Dy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Uy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ny=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Oy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,By=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ky="gl_FragColor = linearToOutputTexel( gl_FragColor );",zy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Hy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Wy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$y=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ky=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Jy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ex=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,tx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ix=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ax=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ox=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ux=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,px=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_x=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Tx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ex=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ax=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Px=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ix=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ux=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ox=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Xx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$x=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Kx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,nM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,iM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,aM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,oM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_M=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,MM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,AM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,CM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,PM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,DM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,OM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,BM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,VM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:cy,alphahash_pars_fragment:hy,alphamap_fragment:uy,alphamap_pars_fragment:dy,alphatest_fragment:fy,alphatest_pars_fragment:py,aomap_fragment:my,aomap_pars_fragment:gy,batching_pars_vertex:_y,batching_vertex:vy,begin_vertex:yy,beginnormal_vertex:xy,bsdfs:My,iridescence_fragment:Sy,bumpmap_pars_fragment:by,clipping_planes_fragment:wy,clipping_planes_pars_fragment:Ty,clipping_planes_pars_vertex:Ey,clipping_planes_vertex:Ay,color_fragment:Ry,color_pars_fragment:Cy,color_pars_vertex:Py,color_vertex:Ly,common:Iy,cube_uv_reflection_fragment:Dy,defaultnormal_vertex:Fy,displacementmap_pars_vertex:Uy,displacementmap_vertex:Ny,emissivemap_fragment:Oy,emissivemap_pars_fragment:By,colorspace_fragment:ky,colorspace_pars_fragment:zy,envmap_fragment:Vy,envmap_common_pars_fragment:Hy,envmap_pars_fragment:Gy,envmap_pars_vertex:Wy,envmap_physical_pars_fragment:tx,envmap_vertex:Xy,fog_vertex:qy,fog_pars_vertex:jy,fog_fragment:Yy,fog_pars_fragment:$y,gradientmap_pars_fragment:Ky,lightmap_pars_fragment:Jy,lights_lambert_fragment:Zy,lights_lambert_pars_fragment:Qy,lights_pars_begin:ex,lights_toon_fragment:nx,lights_toon_pars_fragment:ix,lights_phong_fragment:sx,lights_phong_pars_fragment:rx,lights_physical_fragment:ax,lights_physical_pars_fragment:ox,lights_fragment_begin:lx,lights_fragment_maps:cx,lights_fragment_end:hx,logdepthbuf_fragment:ux,logdepthbuf_pars_fragment:dx,logdepthbuf_pars_vertex:fx,logdepthbuf_vertex:px,map_fragment:mx,map_pars_fragment:gx,map_particle_fragment:_x,map_particle_pars_fragment:vx,metalnessmap_fragment:yx,metalnessmap_pars_fragment:xx,morphinstance_vertex:Mx,morphcolor_vertex:Sx,morphnormal_vertex:bx,morphtarget_pars_vertex:wx,morphtarget_vertex:Tx,normal_fragment_begin:Ex,normal_fragment_maps:Ax,normal_pars_fragment:Rx,normal_pars_vertex:Cx,normal_vertex:Px,normalmap_pars_fragment:Lx,clearcoat_normal_fragment_begin:Ix,clearcoat_normal_fragment_maps:Dx,clearcoat_pars_fragment:Fx,iridescence_pars_fragment:Ux,opaque_fragment:Nx,packing:Ox,premultiplied_alpha_fragment:Bx,project_vertex:kx,dithering_fragment:zx,dithering_pars_fragment:Vx,roughnessmap_fragment:Hx,roughnessmap_pars_fragment:Gx,shadowmap_pars_fragment:Wx,shadowmap_pars_vertex:Xx,shadowmap_vertex:qx,shadowmask_pars_fragment:jx,skinbase_vertex:Yx,skinning_pars_vertex:$x,skinning_vertex:Kx,skinnormal_vertex:Jx,specularmap_fragment:Zx,specularmap_pars_fragment:Qx,tonemapping_fragment:eM,tonemapping_pars_fragment:tM,transmission_fragment:nM,transmission_pars_fragment:iM,uv_pars_fragment:sM,uv_pars_vertex:rM,uv_vertex:aM,worldpos_vertex:oM,background_vert:lM,background_frag:cM,backgroundCube_vert:hM,backgroundCube_frag:uM,cube_vert:dM,cube_frag:fM,depth_vert:pM,depth_frag:mM,distanceRGBA_vert:gM,distanceRGBA_frag:_M,equirect_vert:vM,equirect_frag:yM,linedashed_vert:xM,linedashed_frag:MM,meshbasic_vert:SM,meshbasic_frag:bM,meshlambert_vert:wM,meshlambert_frag:TM,meshmatcap_vert:EM,meshmatcap_frag:AM,meshnormal_vert:RM,meshnormal_frag:CM,meshphong_vert:PM,meshphong_frag:LM,meshphysical_vert:IM,meshphysical_frag:DM,meshtoon_vert:FM,meshtoon_frag:UM,points_vert:NM,points_frag:OM,shadow_vert:BM,shadow_frag:kM,sprite_vert:zM,sprite_frag:VM},re={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},fi={basic:{uniforms:un([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:un([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new oe(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:un([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:un([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:un([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new oe(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:un([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:un([re.points,re.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:un([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:un([re.common,re.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:un([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:un([re.sprite,re.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:un([re.common,re.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:un([re.lights,re.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};fi.physical={uniforms:un([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const nl={r:0,b:0,g:0},Rs=new Vt,HM=new fe;function GM(r,e,t,n,i,s,a){const o=new oe(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function p(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function _(x){let y=!1;const v=p(x);v===null?m(o,l):v&&v.isColor&&(m(v,1),y=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,y){const v=p(y);v&&(v.isCubeTexture||v.mapping===lc)?(h===void 0&&(h=new ve(new vi(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:oa(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Rs.copy(y.backgroundRotation),Rs.x*=-1,Rs.y*=-1,Rs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Rs.y*=-1,Rs.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(HM.makeRotationFromEuler(Rs)),h.material.toneMapped=De.getTransfer(v.colorSpace)!==lt,(u!==v||d!==v.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ve(new Io(2,2),new bn({name:"BackgroundMaterial",uniforms:oa(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=De.getTransfer(v.colorSpace)!==lt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,y){x.getRGB(nl,pg(r)),n.buffers.color.setClear(nl.r,nl.g,nl.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,m(o,l)},render:_,addToRenderList:g}}function WM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(S,L,F,I,D){let z=!1;const N=u(I,F,L);s!==N&&(s=N,c(s.object)),z=f(S,I,F,D),z&&p(S,I,F,D),D!==null&&e.update(D,r.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,v(S,L,F,I),D!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return r.createVertexArray()}function c(S){return r.bindVertexArray(S)}function h(S){return r.deleteVertexArray(S)}function u(S,L,F){const I=F.wireframe===!0;let D=n[S.id];D===void 0&&(D={},n[S.id]=D);let z=D[L.id];z===void 0&&(z={},D[L.id]=z);let N=z[I];return N===void 0&&(N=d(l()),z[I]=N),N}function d(S){const L=[],F=[],I=[];for(let D=0;D<t;D++)L[D]=0,F[D]=0,I[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:I,object:S,attributes:{},index:null}}function f(S,L,F,I){const D=s.attributes,z=L.attributes;let N=0;const G=F.getAttributes();for(const V in G)if(G[V].location>=0){const ne=D[V];let de=z[V];if(de===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(de=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(de=S.instanceColor)),ne===void 0||ne.attribute!==de||de&&ne.data!==de.data)return!0;N++}return s.attributesNum!==N||s.index!==I}function p(S,L,F,I){const D={},z=L.attributes;let N=0;const G=F.getAttributes();for(const V in G)if(G[V].location>=0){let ne=z[V];ne===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(ne=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(ne=S.instanceColor));const de={};de.attribute=ne,ne&&ne.data&&(de.data=ne.data),D[V]=de,N++}s.attributes=D,s.attributesNum=N,s.index=I}function _(){const S=s.newAttributes;for(let L=0,F=S.length;L<F;L++)S[L]=0}function g(S){m(S,0)}function m(S,L){const F=s.newAttributes,I=s.enabledAttributes,D=s.attributeDivisors;F[S]=1,I[S]===0&&(r.enableVertexAttribArray(S),I[S]=1),D[S]!==L&&(r.vertexAttribDivisor(S,L),D[S]=L)}function x(){const S=s.newAttributes,L=s.enabledAttributes;for(let F=0,I=L.length;F<I;F++)L[F]!==S[F]&&(r.disableVertexAttribArray(F),L[F]=0)}function y(S,L,F,I,D,z,N){N===!0?r.vertexAttribIPointer(S,L,F,D,z):r.vertexAttribPointer(S,L,F,I,D,z)}function v(S,L,F,I){_();const D=I.attributes,z=F.getAttributes(),N=L.defaultAttributeValues;for(const G in z){const V=z[G];if(V.location>=0){let $=D[G];if($===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&($=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&($=S.instanceColor)),$!==void 0){const ne=$.normalized,de=$.itemSize,we=e.get($);if(we===void 0)continue;const Ce=we.buffer,q=we.type,Z=we.bytesPerElement,_e=q===r.INT||q===r.UNSIGNED_INT||$.gpuType===Ku;if($.isInterleavedBufferAttribute){const se=$.data,Te=se.stride,Pe=$.offset;if(se.isInstancedInterleavedBuffer){for(let ze=0;ze<V.locationSize;ze++)m(V.location+ze,se.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ze=0;ze<V.locationSize;ze++)g(V.location+ze);r.bindBuffer(r.ARRAY_BUFFER,Ce);for(let ze=0;ze<V.locationSize;ze++)y(V.location+ze,de/V.locationSize,q,ne,Te*Z,(Pe+de/V.locationSize*ze)*Z,_e)}else{if($.isInstancedBufferAttribute){for(let se=0;se<V.locationSize;se++)m(V.location+se,$.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let se=0;se<V.locationSize;se++)g(V.location+se);r.bindBuffer(r.ARRAY_BUFFER,Ce);for(let se=0;se<V.locationSize;se++)y(V.location+se,de/V.locationSize,q,ne,de*Z,de/V.locationSize*se*Z,_e)}}else if(N!==void 0){const ne=N[G];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(V.location,ne);break;case 3:r.vertexAttrib3fv(V.location,ne);break;case 4:r.vertexAttrib4fv(V.location,ne);break;default:r.vertexAttrib1fv(V.location,ne)}}}}x()}function E(){R();for(const S in n){const L=n[S];for(const F in L){const I=L[F];for(const D in I)h(I[D].object),delete I[D];delete L[F]}delete n[S]}}function b(S){if(n[S.id]===void 0)return;const L=n[S.id];for(const F in L){const I=L[F];for(const D in I)h(I[D].object),delete I[D];delete L[F]}delete n[S.id]}function T(S){for(const L in n){const F=n[L];if(F[S.id]===void 0)continue;const I=F[S.id];for(const D in I)h(I[D].object),delete I[D];delete F[S.id]}}function R(){M(),a=!0,s!==i&&(s=i,c(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:g,disableUnusedAttributes:x}}function XM(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)a(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_]*d[_];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function qM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==Wn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const R=T===Po&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Hi&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==si&&!R)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:E,maxSamples:b}}function jM(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Os,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{const x=s?0:n,y=x*4;let v=m.clippingState||null;l.value=v,v=h(p,d,y,f);for(let E=0;E!==y;++E)v[E]=t[E];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,v=f;y!==_;++y,v+=4)a.copy(u[y]).applyMatrix4(x,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function YM(r){let e=new WeakMap;function t(a,o){return o===Gl?a.mapping=na:o===Vh&&(a.mapping=ia),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Gl||o===Vh)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ry(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ld extends mg{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Br=4,Rf=[.125,.215,.35,.446,.526,.582],Vs=20,Gc=new ld,Cf=new oe;let Wc=null,Xc=0,qc=0,jc=!1;const Bs=(1+Math.sqrt(5))/2,xr=1/Bs,Pf=[new C(-Bs,xr,0),new C(Bs,xr,0),new C(-xr,0,Bs),new C(xr,0,Bs),new C(0,Bs,-xr),new C(0,Bs,xr),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Lf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Wc=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wc,Xc,qc),this._renderer.xr.enabled=jc,e.scissorTest=!1,il(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===na||e.mapping===ia?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wc=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:Po,format:Wn,colorSpace:mn,depthBuffer:!1},i=If(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=If(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$M(s)),this._blurMaterial=KM(s,e,t)}return i}_compileMaterial(e){const t=new ve(this._lodPlanes[0],e);this._renderer.compile(t,Gc)}_sceneToCubeUV(e,t,n,i){const o=new sn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Cf),h.toneMapping=ps,h.autoClear=!1;const f=new Zt({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),p=new ve(new vi,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(Cf),_=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):x===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const y=this._cubeSize;il(i,x*y,m>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(p,o),h.render(e,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===na||e.mapping===ia;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Df());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new ve(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;il(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Gc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Pf[(i-s-1)%Pf.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ve(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Vs-1),_=s/p,g=isFinite(s)?1+Math.floor(h*_):Vs;g>Vs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Vs}`);const m=[];let x=0;for(let T=0;T<Vs;++T){const R=T/_,M=Math.exp(-R*R/2);m.push(M),T===0?x+=M:T<g&&(x+=2*M)}for(let T=0;T<m.length;T++)m[T]=m[T]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const v=this._sizeLods[i],E=3*v*(i>y-Br?i-y+Br:0),b=4*(this._cubeSize-v);il(t,E,b,3*v,2*v),l.setRenderTarget(t),l.render(u,Gc)}}function $M(r){const e=[],t=[],n=[];let i=r;const s=r-Br+1+Rf.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Br?l=Rf[a-r+Br-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,g=2,m=1,x=new Float32Array(_*p*f),y=new Float32Array(g*p*f),v=new Float32Array(m*p*f);for(let b=0;b<f;b++){const T=b%3*2/3-1,R=b>2?0:-1,M=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];x.set(M,_*p*b),y.set(d,g*p*b);const S=[b,b,b,b,b,b];v.set(S,m*p*b)}const E=new wt;E.setAttribute("position",new Je(x,_)),E.setAttribute("uv",new Je(y,g)),E.setAttribute("faceIndex",new Je(v,m)),e.push(E),i>Br&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function If(r,e,t){const n=new Qs(r,e,t);return n.texture.mapping=lc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function il(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function KM(r,e,t){const n=new Float32Array(Vs),i=new C(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Df(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Ff(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function cd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function JM(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Gl||l===Vh,h=l===na||l===ia;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Lf(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Lf(r)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ZM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&qa("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function QM(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const _=d.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)e.remove(_[g])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)e.update(d[p],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)e.update(_[g],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let y=0,v=x.length;y<v;y+=3){const E=x[y+0],b=x[y+1],T=x[y+2];d.push(E,b,b,T,T,E)}}else if(p!==void 0){const x=p.array;_=p.version;for(let y=0,v=x.length/3-1;y<v;y+=3){const E=y+0,b=y+1,T=y+2;d.push(E,b,b,T,T,E)}}else return;const g=new(cg(d)?fg:ad)(d,1);g.version=_;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function eS(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,p){p!==0&&(r.drawElementsInstanced(n,f,s,d*a,p),t.update(f,n,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function u(d,f,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/a,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,p);let m=0;for(let x=0;x<p;x++)m+=f[x]*_[x];t.update(m,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function tS(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function nS(r,e,t){const n=new WeakMap,i=new We;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let v=0;p===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let E=o.attributes.position.count*v,b=1;E>e.maxTextureSize&&(b=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const T=new Float32Array(E*b*4*u),R=new ug(T,E,b,u);R.type=si,R.needsUpdate=!0;const M=v*4;for(let L=0;L<u;L++){const F=m[L],I=x[L],D=y[L],z=E*b*4*L;for(let N=0;N<F.count;N++){const G=N*M;p===!0&&(i.fromBufferAttribute(F,N),T[z+G+0]=i.x,T[z+G+1]=i.y,T[z+G+2]=i.z,T[z+G+3]=0),_===!0&&(i.fromBufferAttribute(I,N),T[z+G+4]=i.x,T[z+G+5]=i.y,T[z+G+6]=i.z,T[z+G+7]=0),g===!0&&(i.fromBufferAttribute(D,N),T[z+G+8]=i.x,T[z+G+9]=i.y,T[z+G+10]=i.z,T[z+G+11]=D.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new ie(E,b)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function iS(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class vg extends kt{constructor(e,t,n,i,s,a,o,l,c,h=qr){if(h!==qr&&h!==ra)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===qr&&(n=Zs),n===void 0&&h===ra&&(n=sa),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:pn,this.minFilter=l!==void 0?l:pn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yg=new kt,Uf=new vg(1,1),xg=new ug,Mg=new Gv,Sg=new gg,Nf=[],Of=[],Bf=new Float32Array(16),kf=new Float32Array(9),zf=new Float32Array(4);function ma(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Nf[i];if(s===void 0&&(s=new Float32Array(i),Nf[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Gt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Wt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function uc(r,e){let t=Of[e];t===void 0&&(t=new Int32Array(e),Of[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function sS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function rS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2fv(this.addr,e),Wt(t,e)}}function aS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;r.uniform3fv(this.addr,e),Wt(t,e)}}function oS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4fv(this.addr,e),Wt(t,e)}}function lS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;zf.set(n),r.uniformMatrix2fv(this.addr,!1,zf),Wt(t,n)}}function cS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;kf.set(n),r.uniformMatrix3fv(this.addr,!1,kf),Wt(t,n)}}function hS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;Bf.set(n),r.uniformMatrix4fv(this.addr,!1,Bf),Wt(t,n)}}function uS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function dS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2iv(this.addr,e),Wt(t,e)}}function fS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3iv(this.addr,e),Wt(t,e)}}function pS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4iv(this.addr,e),Wt(t,e)}}function mS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function gS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2uiv(this.addr,e),Wt(t,e)}}function _S(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3uiv(this.addr,e),Wt(t,e)}}function vS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4uiv(this.addr,e),Wt(t,e)}}function yS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Uf.compareFunction=lg,s=Uf):s=yg,t.setTexture2D(e||s,i)}function xS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Mg,i)}function MS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Sg,i)}function SS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||xg,i)}function bS(r){switch(r){case 5126:return sS;case 35664:return rS;case 35665:return aS;case 35666:return oS;case 35674:return lS;case 35675:return cS;case 35676:return hS;case 5124:case 35670:return uS;case 35667:case 35671:return dS;case 35668:case 35672:return fS;case 35669:case 35673:return pS;case 5125:return mS;case 36294:return gS;case 36295:return _S;case 36296:return vS;case 35678:case 36198:case 36298:case 36306:case 35682:return yS;case 35679:case 36299:case 36307:return xS;case 35680:case 36300:case 36308:case 36293:return MS;case 36289:case 36303:case 36311:case 36292:return SS}}function wS(r,e){r.uniform1fv(this.addr,e)}function TS(r,e){const t=ma(e,this.size,2);r.uniform2fv(this.addr,t)}function ES(r,e){const t=ma(e,this.size,3);r.uniform3fv(this.addr,t)}function AS(r,e){const t=ma(e,this.size,4);r.uniform4fv(this.addr,t)}function RS(r,e){const t=ma(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function CS(r,e){const t=ma(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function PS(r,e){const t=ma(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function LS(r,e){r.uniform1iv(this.addr,e)}function IS(r,e){r.uniform2iv(this.addr,e)}function DS(r,e){r.uniform3iv(this.addr,e)}function FS(r,e){r.uniform4iv(this.addr,e)}function US(r,e){r.uniform1uiv(this.addr,e)}function NS(r,e){r.uniform2uiv(this.addr,e)}function OS(r,e){r.uniform3uiv(this.addr,e)}function BS(r,e){r.uniform4uiv(this.addr,e)}function kS(r,e,t){const n=this.cache,i=e.length,s=uc(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||yg,s[a])}function zS(r,e,t){const n=this.cache,i=e.length,s=uc(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Mg,s[a])}function VS(r,e,t){const n=this.cache,i=e.length,s=uc(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Sg,s[a])}function HS(r,e,t){const n=this.cache,i=e.length,s=uc(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||xg,s[a])}function GS(r){switch(r){case 5126:return wS;case 35664:return TS;case 35665:return ES;case 35666:return AS;case 35674:return RS;case 35675:return CS;case 35676:return PS;case 5124:case 35670:return LS;case 35667:case 35671:return IS;case 35668:case 35672:return DS;case 35669:case 35673:return FS;case 5125:return US;case 36294:return NS;case 36295:return OS;case 36296:return BS;case 35678:case 36198:case 36298:case 36306:case 35682:return kS;case 35679:case 36299:case 36307:return zS;case 35680:case 36300:case 36308:case 36293:return VS;case 36289:case 36303:case 36311:case 36292:return HS}}class WS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bS(t.type)}}class XS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=GS(t.type)}}class qS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Yc=/(\w+)(\])?(\[|\.)?/g;function Vf(r,e){r.seq.push(e),r.map[e.id]=e}function jS(r,e,t){const n=r.name,i=n.length;for(Yc.lastIndex=0;;){const s=Yc.exec(n),a=Yc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Vf(t,c===void 0?new WS(o,r,e):new XS(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new qS(o),Vf(t,u)),t=u}}}class Nl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);jS(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Hf(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const YS=37297;let $S=0;function KS(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Gf=new Fe;function JS(r){De._getMatrix(Gf,De.workingColorSpace,r);const e=`mat3( ${Gf.elements.map(t=>t.toFixed(4))} )`;switch(De.getTransfer(r)){case hc:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Wf(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+KS(r.getShaderSource(e),a)}else return i}function ZS(r,e){const t=JS(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function QS(r,e){let t;switch(e){case Q0:t="Linear";break;case ev:t="Reinhard";break;case tv:t="Cineon";break;case Ym:t="ACESFilmic";break;case iv:t="AgX";break;case sv:t="Neutral";break;case nv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const sl=new C;function eb(){De.getLuminanceCoefficients(sl);const r=sl.x.toFixed(4),e=sl.y.toFixed(4),t=sl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ja).join(`
`)}function nb(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ib(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ja(r){return r!==""}function Xf(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qf(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sb=/^[ \t]*#include +<([\w\d./]+)>/gm;function gu(r){return r.replace(sb,ab)}const rb=new Map;function ab(r,e){let t=ke[e];if(t===void 0){const n=rb.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return gu(t)}const ob=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jf(r){return r.replace(ob,lb)}function lb(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yf(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cb(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===qm?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===jm?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function hb(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case na:case ia:e="ENVMAP_TYPE_CUBE";break;case lc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ub(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ia:e="ENVMAP_MODE_REFRACTION";break}return e}function db(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case oc:e="ENVMAP_BLENDING_MULTIPLY";break;case J0:e="ENVMAP_BLENDING_MIX";break;case Z0:e="ENVMAP_BLENDING_ADD";break}return e}function fb(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function pb(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=cb(t),c=hb(t),h=ub(t),u=db(t),d=fb(t),f=tb(t),p=nb(s),_=i.createProgram();let g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ja).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ja).join(`
`),m.length>0&&(m+=`
`)):(g=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ja).join(`
`),m=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ps?"#define TONE_MAPPING":"",t.toneMapping!==ps?ke.tonemapping_pars_fragment:"",t.toneMapping!==ps?QS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,ZS("linearToOutputTexel",t.outputColorSpace),eb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ja).join(`
`)),a=gu(a),a=Xf(a,t),a=qf(a,t),o=gu(o),o=Xf(o,t),o=qf(o,t),a=jf(a),o=jf(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===af?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===af?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=x+g+a,v=x+m+o,E=Hf(i,i.VERTEX_SHADER,y),b=Hf(i,i.FRAGMENT_SHADER,v);i.attachShader(_,E),i.attachShader(_,b),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(L){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(_).trim(),I=i.getShaderInfoLog(E).trim(),D=i.getShaderInfoLog(b).trim();let z=!0,N=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,E,b);else{const G=Wf(i,E,"vertex"),V=Wf(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+G+`
`+V)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(I===""||D==="")&&(N=!1);N&&(L.diagnostics={runnable:z,programLog:F,vertexShader:{log:I,prefix:g},fragmentShader:{log:D,prefix:m}})}i.deleteShader(E),i.deleteShader(b),R=new Nl(i,_),M=ib(i,_)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,YS)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$S++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=b,this}let mb=0;class gb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _b(e),t.set(e,n)),n}}class _b{constructor(e){this.id=mb++,this.code=e,this.usedTimes=0}}function vb(r,e,t,n,i,s,a){const o=new rd,l=new gb,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,L,F,I){const D=F.fog,z=I.geometry,N=M.isMeshStandardMaterial?F.environment:null,G=(M.isMeshStandardMaterial?t:e).get(M.envMap||N),V=G&&G.mapping===lc?G.image.height:null,$=p[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ne=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,de=ne!==void 0?ne.length:0;let we=0;z.morphAttributes.position!==void 0&&(we=1),z.morphAttributes.normal!==void 0&&(we=2),z.morphAttributes.color!==void 0&&(we=3);let Ce,q,Z,_e;if($){const at=fi[$];Ce=at.vertexShader,q=at.fragmentShader}else Ce=M.vertexShader,q=M.fragmentShader,l.update(M),Z=l.getVertexShaderID(M),_e=l.getFragmentShaderID(M);const se=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),Pe=I.isInstancedMesh===!0,ze=I.isBatchedMesh===!0,pt=!!M.map,Ge=!!M.matcap,Mt=!!G,k=!!M.aoMap,On=!!M.lightMap,je=!!M.bumpMap,Ye=!!M.normalMap,Ae=!!M.displacementMap,_t=!!M.emissiveMap,Ee=!!M.metalnessMap,P=!!M.roughnessMap,w=M.anisotropy>0,H=M.clearcoat>0,K=M.dispersion>0,Q=M.iridescence>0,Y=M.sheen>0,Se=M.transmission>0,le=w&&!!M.anisotropyMap,pe=H&&!!M.clearcoatMap,Ze=H&&!!M.clearcoatNormalMap,ee=H&&!!M.clearcoatRoughnessMap,me=Q&&!!M.iridescenceMap,Re=Q&&!!M.iridescenceThicknessMap,Le=Y&&!!M.sheenColorMap,ge=Y&&!!M.sheenRoughnessMap,$e=!!M.specularMap,Be=!!M.specularColorMap,mt=!!M.specularIntensityMap,U=Se&&!!M.transmissionMap,ae=Se&&!!M.thicknessMap,j=!!M.gradientMap,J=!!M.alphaMap,ue=M.alphaTest>0,ce=!!M.alphaHash,Ne=!!M.extensions;let Pt=ps;M.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Pt=r.toneMapping);const en={shaderID:$,shaderType:M.type,shaderName:M.name,vertexShader:Ce,fragmentShader:q,defines:M.defines,customVertexShaderID:Z,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:ze,batchingColor:ze&&I._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&I.instanceColor!==null,instancingMorph:Pe&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?r.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:mn,alphaToCoverage:!!M.alphaToCoverage,map:pt,matcap:Ge,envMap:Mt,envMapMode:Mt&&G.mapping,envMapCubeUVHeight:V,aoMap:k,lightMap:On,bumpMap:je,normalMap:Ye,displacementMap:d&&Ae,emissiveMap:_t,normalMapObjectSpace:Ye&&M.normalMapType===uv,normalMapTangentSpace:Ye&&M.normalMapType===cc,metalnessMap:Ee,roughnessMap:P,anisotropy:w,anisotropyMap:le,clearcoat:H,clearcoatMap:pe,clearcoatNormalMap:Ze,clearcoatRoughnessMap:ee,dispersion:K,iridescence:Q,iridescenceMap:me,iridescenceThicknessMap:Re,sheen:Y,sheenColorMap:Le,sheenRoughnessMap:ge,specularMap:$e,specularColorMap:Be,specularIntensityMap:mt,transmission:Se,transmissionMap:U,thicknessMap:ae,gradientMap:j,opaque:M.transparent===!1&&M.blending===Xr&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:ue,alphaHash:ce,combine:M.combine,mapUv:pt&&_(M.map.channel),aoMapUv:k&&_(M.aoMap.channel),lightMapUv:On&&_(M.lightMap.channel),bumpMapUv:je&&_(M.bumpMap.channel),normalMapUv:Ye&&_(M.normalMap.channel),displacementMapUv:Ae&&_(M.displacementMap.channel),emissiveMapUv:_t&&_(M.emissiveMap.channel),metalnessMapUv:Ee&&_(M.metalnessMap.channel),roughnessMapUv:P&&_(M.roughnessMap.channel),anisotropyMapUv:le&&_(M.anisotropyMap.channel),clearcoatMapUv:pe&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(M.sheenRoughnessMap.channel),specularMapUv:$e&&_(M.specularMap.channel),specularColorMapUv:Be&&_(M.specularColorMap.channel),specularIntensityMapUv:mt&&_(M.specularIntensityMap.channel),transmissionMapUv:U&&_(M.transmissionMap.channel),thicknessMapUv:ae&&_(M.thicknessMap.channel),alphaMapUv:J&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ye||w),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!z.attributes.uv&&(pt||J),fog:!!D,useFog:M.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Te,skinning:I.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:we,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Pt,decodeVideoTexture:pt&&M.map.isVideoTexture===!0&&De.getTransfer(M.map.colorSpace)===lt,decodeVideoTextureEmissive:_t&&M.emissiveMap.isVideoTexture===!0&&De.getTransfer(M.emissiveMap.colorSpace)===lt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===vn,flipSided:M.side===ln,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ne&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&M.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return en.vertexUv1s=c.has(1),en.vertexUv2s=c.has(2),en.vertexUv3s=c.has(3),c.clear(),en}function m(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)S.push(L),S.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(x(S,M),y(S,M),S.push(r.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function x(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),M.push(o.mask)}function v(M){const S=p[M.type];let L;if(S){const F=fi[S];L=ty.clone(F.uniforms)}else L=M.uniforms;return L}function E(M,S){let L;for(let F=0,I=h.length;F<I;F++){const D=h[F];if(D.cacheKey===S){L=D,++L.usedTimes;break}}return L===void 0&&(L=new pb(r,S,M,s),h.push(L)),L}function b(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:v,acquireProgram:E,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:R}}function yb(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function xb(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function $f(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Kf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,p,_,g){let m=r[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:_,group:g},r[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=_,m.group=g),e++,m}function o(u,d,f,p,_,g){const m=a(u,d,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,p,_,g){const m=a(u,d,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||xb),n.length>1&&n.sort(d||$f),i.length>1&&i.sort(d||$f)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function Mb(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Kf,r.set(n,[a])):i>=s.length?(a=new Kf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Sb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new oe};break;case"SpotLight":t={position:new C,direction:new C,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":t={color:new oe,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function bb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let wb=0;function Tb(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Eb(r){const e=new Sb,t=bb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,s=new fe,a=new fe;function o(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,x=0,y=0,v=0,E=0,b=0,T=0;c.sort(Tb);for(let M=0,S=c.length;M<S;M++){const L=c[M],F=L.color,I=L.intensity,D=L.distance,z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=F.r*I,u+=F.g*I,d+=F.b*I;else if(L.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(L.sh.coefficients[N],I);T++}else if(L.isDirectionalLight){const N=e.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const G=L.shadow,V=t.get(L);V.shadowIntensity=G.intensity,V.shadowBias=G.bias,V.shadowNormalBias=G.normalBias,V.shadowRadius=G.radius,V.shadowMapSize=G.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=L.shadow.matrix,x++}n.directional[f]=N,f++}else if(L.isSpotLight){const N=e.get(L);N.position.setFromMatrixPosition(L.matrixWorld),N.color.copy(F).multiplyScalar(I),N.distance=D,N.coneCos=Math.cos(L.angle),N.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),N.decay=L.decay,n.spot[_]=N;const G=L.shadow;if(L.map&&(n.spotLightMap[E]=L.map,E++,G.updateMatrices(L),L.castShadow&&b++),n.spotLightMatrix[_]=G.matrix,L.castShadow){const V=t.get(L);V.shadowIntensity=G.intensity,V.shadowBias=G.bias,V.shadowNormalBias=G.normalBias,V.shadowRadius=G.radius,V.shadowMapSize=G.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=z,v++}_++}else if(L.isRectAreaLight){const N=e.get(L);N.color.copy(F).multiplyScalar(I),N.halfWidth.set(L.width*.5,0,0),N.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=N,g++}else if(L.isPointLight){const N=e.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity),N.distance=L.distance,N.decay=L.decay,L.castShadow){const G=L.shadow,V=t.get(L);V.shadowIntensity=G.intensity,V.shadowBias=G.bias,V.shadowNormalBias=G.normalBias,V.shadowRadius=G.radius,V.shadowMapSize=G.mapSize,V.shadowCameraNear=G.camera.near,V.shadowCameraFar=G.camera.far,n.pointShadow[p]=V,n.pointShadowMap[p]=z,n.pointShadowMatrix[p]=L.shadow.matrix,y++}n.point[p]=N,p++}else if(L.isHemisphereLight){const N=e.get(L);N.skyColor.copy(L.color).multiplyScalar(I),N.groundColor.copy(L.groundColor).multiplyScalar(I),n.hemi[m]=N,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==p||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==x||R.numPointShadows!==y||R.numSpotShadows!==v||R.numSpotMaps!==E||R.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+E-b,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,R.directionalLength=f,R.pointLength=p,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=x,R.numPointShadows=y,R.numSpotShadows=v,R.numSpotMaps=E,R.numLightProbes=T,n.version=wb++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){const y=c[m];if(y.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),u++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const v=n.rectArea[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),p++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function Jf(r){const e=new Eb(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Ab(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Jf(r),e.set(i,[o])):s>=a.length?(o=new Jf(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Rb extends Dn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=cv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cb extends Dn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Pb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ib(r,e,t){let n=new od;const i=new ie,s=new ie,a=new We,o=new Rb({depthPacking:hv}),l=new Cb,c={},h=t.maxTextureSize,u={[yi]:ln,[ln]:yi,[vn]:vn},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:Pb,fragmentShader:Lb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new wt;p.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ve(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qm;let m=this.type;this.render=function(b,T,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const M=r.getRenderTarget(),S=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),F=r.state;F.setBlending(fs),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const I=m!==Li&&this.type===Li,D=m===Li&&this.type!==Li;for(let z=0,N=b.length;z<N;z++){const G=b[z],V=G.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const $=V.getFrameExtents();if(i.multiply($),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/$.x),i.x=s.x*$.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/$.y),i.y=s.y*$.y,V.mapSize.y=s.y)),V.map===null||I===!0||D===!0){const de=this.type!==Li?{minFilter:pn,magFilter:pn}:{};V.map!==null&&V.map.dispose(),V.map=new Qs(i.x,i.y,de),V.map.texture.name=G.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const ne=V.getViewportCount();for(let de=0;de<ne;de++){const we=V.getViewport(de);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),F.viewport(a),V.updateMatrices(G,de),n=V.getFrustum(),v(T,R,V.camera,G,this.type)}V.isPointLightShadow!==!0&&this.type===Li&&x(V,R),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(M,S,L)};function x(b,T){const R=e.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Qs(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(T,null,R,d,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(T,null,R,f,_,null)}function y(b,T,R,M){let S=null;const L=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)S=L;else if(S=R.isPointLight===!0?l:o,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const F=S.uuid,I=T.uuid;let D=c[F];D===void 0&&(D={},c[F]=D);let z=D[I];z===void 0&&(z=S.clone(),D[I]=z,T.addEventListener("dispose",E)),S=z}if(S.visible=T.visible,S.wireframe=T.wireframe,M===Li?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:u[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=r.properties.get(S);F.light=R}return S}function v(b,T,R,M,S){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Li)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);const I=e.update(b),D=b.material;if(Array.isArray(D)){const z=I.groups;for(let N=0,G=z.length;N<G;N++){const V=z[N],$=D[V.materialIndex];if($&&$.visible){const ne=y(b,$,M,S);b.onBeforeShadow(r,b,T,R,I,ne,V),r.renderBufferDirect(R,null,I,ne,b,V),b.onAfterShadow(r,b,T,R,I,ne,V)}}}else if(D.visible){const z=y(b,D,M,S);b.onBeforeShadow(r,b,T,R,I,z,null),r.renderBufferDirect(R,null,I,z,b,null),b.onAfterShadow(r,b,T,R,I,z,null)}}const F=b.children;for(let I=0,D=F.length;I<D;I++)v(F[I],T,R,M,S)}function E(b){b.target.removeEventListener("dispose",E);for(const R in c){const M=c[R],S=b.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const Db={[Fh]:Uh,[Nh]:kh,[Oh]:zh,[ta]:Bh,[Uh]:Fh,[kh]:Nh,[zh]:Oh,[Bh]:ta};function Fb(r,e){function t(){let U=!1;const ae=new We;let j=null;const J=new We(0,0,0,0);return{setMask:function(ue){j!==ue&&!U&&(r.colorMask(ue,ue,ue,ue),j=ue)},setLocked:function(ue){U=ue},setClear:function(ue,ce,Ne,Pt,en){en===!0&&(ue*=Pt,ce*=Pt,Ne*=Pt),ae.set(ue,ce,Ne,Pt),J.equals(ae)===!1&&(r.clearColor(ue,ce,Ne,Pt),J.copy(ae))},reset:function(){U=!1,j=null,J.set(-1,0,0,0)}}}function n(){let U=!1,ae=!1,j=null,J=null,ue=null;return{setReversed:function(ce){if(ae!==ce){const Ne=e.get("EXT_clip_control");ae?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT);const Pt=ue;ue=null,this.setClear(Pt)}ae=ce},getReversed:function(){return ae},setTest:function(ce){ce?se(r.DEPTH_TEST):Te(r.DEPTH_TEST)},setMask:function(ce){j!==ce&&!U&&(r.depthMask(ce),j=ce)},setFunc:function(ce){if(ae&&(ce=Db[ce]),J!==ce){switch(ce){case Fh:r.depthFunc(r.NEVER);break;case Uh:r.depthFunc(r.ALWAYS);break;case Nh:r.depthFunc(r.LESS);break;case ta:r.depthFunc(r.LEQUAL);break;case Oh:r.depthFunc(r.EQUAL);break;case Bh:r.depthFunc(r.GEQUAL);break;case kh:r.depthFunc(r.GREATER);break;case zh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=ce}},setLocked:function(ce){U=ce},setClear:function(ce){ue!==ce&&(ae&&(ce=1-ce),r.clearDepth(ce),ue=ce)},reset:function(){U=!1,j=null,J=null,ue=null,ae=!1}}}function i(){let U=!1,ae=null,j=null,J=null,ue=null,ce=null,Ne=null,Pt=null,en=null;return{setTest:function(at){U||(at?se(r.STENCIL_TEST):Te(r.STENCIL_TEST))},setMask:function(at){ae!==at&&!U&&(r.stencilMask(at),ae=at)},setFunc:function(at,jn,bi){(j!==at||J!==jn||ue!==bi)&&(r.stencilFunc(at,jn,bi),j=at,J=jn,ue=bi)},setOp:function(at,jn,bi){(ce!==at||Ne!==jn||Pt!==bi)&&(r.stencilOp(at,jn,bi),ce=at,Ne=jn,Pt=bi)},setLocked:function(at){U=at},setClear:function(at){en!==at&&(r.clearStencil(at),en=at)},reset:function(){U=!1,ae=null,j=null,J=null,ue=null,ce=null,Ne=null,Pt=null,en=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,x=null,y=null,v=null,E=null,b=null,T=new oe(0,0,0),R=0,M=!1,S=null,L=null,F=null,I=null,D=null;const z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,G=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(V)[1]),N=G>=1):V.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),N=G>=2);let $=null,ne={};const de=r.getParameter(r.SCISSOR_BOX),we=r.getParameter(r.VIEWPORT),Ce=new We().fromArray(de),q=new We().fromArray(we);function Z(U,ae,j,J){const ue=new Uint8Array(4),ce=r.createTexture();r.bindTexture(U,ce),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ne=0;Ne<j;Ne++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(ae,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ue):r.texImage2D(ae+Ne,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ue);return ce}const _e={};_e[r.TEXTURE_2D]=Z(r.TEXTURE_2D,r.TEXTURE_2D,1),_e[r.TEXTURE_CUBE_MAP]=Z(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[r.TEXTURE_2D_ARRAY]=Z(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),_e[r.TEXTURE_3D]=Z(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(r.DEPTH_TEST),a.setFunc(ta),je(!1),Ye(ef),se(r.CULL_FACE),k(fs);function se(U){h[U]!==!0&&(r.enable(U),h[U]=!0)}function Te(U){h[U]!==!1&&(r.disable(U),h[U]=!1)}function Pe(U,ae){return u[U]!==ae?(r.bindFramebuffer(U,ae),u[U]=ae,U===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ae),U===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ae),!0):!1}function ze(U,ae){let j=f,J=!1;if(U){j=d.get(ae),j===void 0&&(j=[],d.set(ae,j));const ue=U.textures;if(j.length!==ue.length||j[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,Ne=ue.length;ce<Ne;ce++)j[ce]=r.COLOR_ATTACHMENT0+ce;j.length=ue.length,J=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,J=!0);J&&r.drawBuffers(j)}function pt(U){return p!==U?(r.useProgram(U),p=U,!0):!1}const Ge={[zs]:r.FUNC_ADD,[F0]:r.FUNC_SUBTRACT,[U0]:r.FUNC_REVERSE_SUBTRACT};Ge[N0]=r.MIN,Ge[O0]=r.MAX;const Mt={[B0]:r.ZERO,[k0]:r.ONE,[z0]:r.SRC_COLOR,[Ih]:r.SRC_ALPHA,[q0]:r.SRC_ALPHA_SATURATE,[W0]:r.DST_COLOR,[H0]:r.DST_ALPHA,[V0]:r.ONE_MINUS_SRC_COLOR,[Dh]:r.ONE_MINUS_SRC_ALPHA,[X0]:r.ONE_MINUS_DST_COLOR,[G0]:r.ONE_MINUS_DST_ALPHA,[j0]:r.CONSTANT_COLOR,[Y0]:r.ONE_MINUS_CONSTANT_COLOR,[$0]:r.CONSTANT_ALPHA,[K0]:r.ONE_MINUS_CONSTANT_ALPHA};function k(U,ae,j,J,ue,ce,Ne,Pt,en,at){if(U===fs){_===!0&&(Te(r.BLEND),_=!1);return}if(_===!1&&(se(r.BLEND),_=!0),U!==D0){if(U!==g||at!==M){if((m!==zs||v!==zs)&&(r.blendEquation(r.FUNC_ADD),m=zs,v=zs),at)switch(U){case Xr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Yt:r.blendFunc(r.ONE,r.ONE);break;case tf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Xr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Yt:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case tf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}x=null,y=null,E=null,b=null,T.set(0,0,0),R=0,g=U,M=at}return}ue=ue||ae,ce=ce||j,Ne=Ne||J,(ae!==m||ue!==v)&&(r.blendEquationSeparate(Ge[ae],Ge[ue]),m=ae,v=ue),(j!==x||J!==y||ce!==E||Ne!==b)&&(r.blendFuncSeparate(Mt[j],Mt[J],Mt[ce],Mt[Ne]),x=j,y=J,E=ce,b=Ne),(Pt.equals(T)===!1||en!==R)&&(r.blendColor(Pt.r,Pt.g,Pt.b,en),T.copy(Pt),R=en),g=U,M=!1}function On(U,ae){U.side===vn?Te(r.CULL_FACE):se(r.CULL_FACE);let j=U.side===ln;ae&&(j=!j),je(j),U.blending===Xr&&U.transparent===!1?k(fs):k(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const J=U.stencilWrite;o.setTest(J),J&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),_t(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):Te(r.SAMPLE_ALPHA_TO_COVERAGE)}function je(U){S!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),S=U)}function Ye(U){U!==L0?(se(r.CULL_FACE),U!==L&&(U===ef?r.cullFace(r.BACK):U===I0?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Te(r.CULL_FACE),L=U}function Ae(U){U!==F&&(N&&r.lineWidth(U),F=U)}function _t(U,ae,j){U?(se(r.POLYGON_OFFSET_FILL),(I!==ae||D!==j)&&(r.polygonOffset(ae,j),I=ae,D=j)):Te(r.POLYGON_OFFSET_FILL)}function Ee(U){U?se(r.SCISSOR_TEST):Te(r.SCISSOR_TEST)}function P(U){U===void 0&&(U=r.TEXTURE0+z-1),$!==U&&(r.activeTexture(U),$=U)}function w(U,ae,j){j===void 0&&($===null?j=r.TEXTURE0+z-1:j=$);let J=ne[j];J===void 0&&(J={type:void 0,texture:void 0},ne[j]=J),(J.type!==U||J.texture!==ae)&&($!==j&&(r.activeTexture(j),$=j),r.bindTexture(U,ae||_e[U]),J.type=U,J.texture=ae)}function H(){const U=ne[$];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function K(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ze(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Le(U){Ce.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Ce.copy(U))}function ge(U){q.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),q.copy(U))}function $e(U,ae){let j=c.get(ae);j===void 0&&(j=new WeakMap,c.set(ae,j));let J=j.get(U);J===void 0&&(J=r.getUniformBlockIndex(ae,U.name),j.set(U,J))}function Be(U,ae){const J=c.get(ae).get(U);l.get(ae)!==J&&(r.uniformBlockBinding(ae,J,U.__bindingPointIndex),l.set(ae,J))}function mt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},$=null,ne={},u={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,x=null,y=null,v=null,E=null,b=null,T=new oe(0,0,0),R=0,M=!1,S=null,L=null,F=null,I=null,D=null,Ce.set(0,0,r.canvas.width,r.canvas.height),q.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:Te,bindFramebuffer:Pe,drawBuffers:ze,useProgram:pt,setBlending:k,setMaterial:On,setFlipSided:je,setCullFace:Ye,setLineWidth:Ae,setPolygonOffset:_t,setScissorTest:Ee,activeTexture:P,bindTexture:w,unbindTexture:H,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:me,texImage3D:Re,updateUBOMapping:$e,uniformBlockBinding:Be,texStorage2D:Ze,texStorage3D:ee,texSubImage2D:Y,texSubImage3D:Se,compressedTexSubImage2D:le,compressedTexSubImage3D:pe,scissor:Le,viewport:ge,reset:mt}}function Zf(r,e,t,n){const i=Ub(n);switch(t){case eg:return r*e;case ng:return r*e;case ig:return r*e*2;case Qu:return r*e/i.components*i.byteLength;case ed:return r*e/i.components*i.byteLength;case sg:return r*e*2/i.components*i.byteLength;case td:return r*e*2/i.components*i.byteLength;case tg:return r*e*3/i.components*i.byteLength;case Wn:return r*e*4/i.components*i.byteLength;case nd:return r*e*4/i.components*i.byteLength;case Pl:case Ll:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Il:case Dl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Gh:case Xh:return Math.max(r,16)*Math.max(e,8)/4;case Hh:case Wh:return Math.max(r,8)*Math.max(e,8)/2;case qh:case jh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Yh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case $h:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Kh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Jh:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Zh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Qh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case eu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case tu:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case nu:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case iu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case su:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case ru:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case au:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case ou:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case lu:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Fl:case cu:case hu:return Math.ceil(r/4)*Math.ceil(e/4)*16;case rg:case uu:return Math.ceil(r/4)*Math.ceil(e/4)*8;case du:case fu:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ub(r){switch(r){case Hi:case Jm:return{byteLength:1,components:1};case co:case Zm:case Po:return{byteLength:2,components:1};case Ju:case Zu:return{byteLength:2,components:4};case Zs:case Ku:case si:return{byteLength:4,components:1};case Qm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Nb(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,w){return f?new OffscreenCanvas(P,w):fo("canvas")}function _(P,w,H){let K=1;const Q=Ee(P);if((Q.width>H||Q.height>H)&&(K=H/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Y=Math.floor(K*Q.width),Se=Math.floor(K*Q.height);u===void 0&&(u=p(Y,Se));const le=w?p(Y,Se):u;return le.width=Y,le.height=Se,le.getContext("2d").drawImage(P,0,0,Y,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Se+")."),le}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function g(P){return P.generateMipmaps}function m(P){r.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(P,w,H,K,Q=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Y=w;if(w===r.RED&&(H===r.FLOAT&&(Y=r.R32F),H===r.HALF_FLOAT&&(Y=r.R16F),H===r.UNSIGNED_BYTE&&(Y=r.R8)),w===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(Y=r.R8UI),H===r.UNSIGNED_SHORT&&(Y=r.R16UI),H===r.UNSIGNED_INT&&(Y=r.R32UI),H===r.BYTE&&(Y=r.R8I),H===r.SHORT&&(Y=r.R16I),H===r.INT&&(Y=r.R32I)),w===r.RG&&(H===r.FLOAT&&(Y=r.RG32F),H===r.HALF_FLOAT&&(Y=r.RG16F),H===r.UNSIGNED_BYTE&&(Y=r.RG8)),w===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(Y=r.RG8UI),H===r.UNSIGNED_SHORT&&(Y=r.RG16UI),H===r.UNSIGNED_INT&&(Y=r.RG32UI),H===r.BYTE&&(Y=r.RG8I),H===r.SHORT&&(Y=r.RG16I),H===r.INT&&(Y=r.RG32I)),w===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(Y=r.RGB8UI),H===r.UNSIGNED_SHORT&&(Y=r.RGB16UI),H===r.UNSIGNED_INT&&(Y=r.RGB32UI),H===r.BYTE&&(Y=r.RGB8I),H===r.SHORT&&(Y=r.RGB16I),H===r.INT&&(Y=r.RGB32I)),w===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(Y=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(Y=r.RGBA16UI),H===r.UNSIGNED_INT&&(Y=r.RGBA32UI),H===r.BYTE&&(Y=r.RGBA8I),H===r.SHORT&&(Y=r.RGBA16I),H===r.INT&&(Y=r.RGBA32I)),w===r.RGB&&H===r.UNSIGNED_INT_5_9_9_9_REV&&(Y=r.RGB9_E5),w===r.RGBA){const Se=Q?hc:De.getTransfer(K);H===r.FLOAT&&(Y=r.RGBA32F),H===r.HALF_FLOAT&&(Y=r.RGBA16F),H===r.UNSIGNED_BYTE&&(Y=Se===lt?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(Y=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(Y=r.RGB5_A1)}return(Y===r.R16F||Y===r.R32F||Y===r.RG16F||Y===r.RG32F||Y===r.RGBA16F||Y===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function v(P,w){let H;return P?w===null||w===Zs||w===sa?H=r.DEPTH24_STENCIL8:w===si?H=r.DEPTH32F_STENCIL8:w===co&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Zs||w===sa?H=r.DEPTH_COMPONENT24:w===si?H=r.DEPTH_COMPONENT32F:w===co&&(H=r.DEPTH_COMPONENT16),H}function E(P,w){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==pn&&P.minFilter!==Pn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function b(P){const w=P.target;w.removeEventListener("dispose",b),R(w),w.isVideoTexture&&h.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),S(w)}function R(P){const w=n.get(P);if(w.__webglInit===void 0)return;const H=P.source,K=d.get(H);if(K){const Q=K[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(P),Object.keys(K).length===0&&d.delete(H)}n.remove(P)}function M(P){const w=n.get(P);r.deleteTexture(w.__webglTexture);const H=P.source,K=d.get(H);delete K[w.__cacheKey],a.memory.textures--}function S(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(w.__webglFramebuffer[K]))for(let Q=0;Q<w.__webglFramebuffer[K].length;Q++)r.deleteFramebuffer(w.__webglFramebuffer[K][Q]);else r.deleteFramebuffer(w.__webglFramebuffer[K]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[K])}else{if(Array.isArray(w.__webglFramebuffer))for(let K=0;K<w.__webglFramebuffer.length;K++)r.deleteFramebuffer(w.__webglFramebuffer[K]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let K=0;K<w.__webglColorRenderbuffer.length;K++)w.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[K]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=P.textures;for(let K=0,Q=H.length;K<Q;K++){const Y=n.get(H[K]);Y.__webglTexture&&(r.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(H[K])}n.remove(P)}let L=0;function F(){L=0}function I(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function D(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function z(P,w){const H=n.get(P);if(P.isVideoTexture&&Ae(P),P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){const K=P.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(H,P,w);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+w)}function N(P,w){const H=n.get(P);if(P.version>0&&H.__version!==P.version){q(H,P,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+w)}function G(P,w){const H=n.get(P);if(P.version>0&&H.__version!==P.version){q(H,P,w);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+w)}function V(P,w){const H=n.get(P);if(P.version>0&&H.__version!==P.version){Z(H,P,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+w)}const $={[_s]:r.REPEAT,[gi]:r.CLAMP_TO_EDGE,[Wl]:r.MIRRORED_REPEAT},ne={[pn]:r.NEAREST,[Km]:r.NEAREST_MIPMAP_NEAREST,[Xa]:r.NEAREST_MIPMAP_LINEAR,[Pn]:r.LINEAR,[Cl]:r.LINEAR_MIPMAP_NEAREST,[Oi]:r.LINEAR_MIPMAP_LINEAR},de={[dv]:r.NEVER,[vv]:r.ALWAYS,[fv]:r.LESS,[lg]:r.LEQUAL,[pv]:r.EQUAL,[_v]:r.GEQUAL,[mv]:r.GREATER,[gv]:r.NOTEQUAL};function we(P,w){if(w.type===si&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Pn||w.magFilter===Cl||w.magFilter===Xa||w.magFilter===Oi||w.minFilter===Pn||w.minFilter===Cl||w.minFilter===Xa||w.minFilter===Oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,$[w.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,$[w.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,$[w.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,ne[w.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,ne[w.minFilter]),w.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,de[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===pn||w.minFilter!==Xa&&w.minFilter!==Oi||w.type===si&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ce(P,w){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",b));const K=w.source;let Q=d.get(K);Q===void 0&&(Q={},d.set(K,Q));const Y=D(w);if(Y!==P.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Q[Y].usedTimes++;const Se=Q[P.__cacheKey];Se!==void 0&&(Q[P.__cacheKey].usedTimes--,Se.usedTimes===0&&M(w)),P.__cacheKey=Y,P.__webglTexture=Q[Y].texture}return H}function q(P,w,H){let K=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(K=r.TEXTURE_3D);const Q=Ce(P,w),Y=w.source;t.bindTexture(K,P.__webglTexture,r.TEXTURE0+H);const Se=n.get(Y);if(Y.version!==Se.__version||Q===!0){t.activeTexture(r.TEXTURE0+H);const le=De.getPrimaries(De.workingColorSpace),pe=w.colorSpace===as?null:De.getPrimaries(w.colorSpace),Ze=w.colorSpace===as||le===pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let ee=_(w.image,!1,i.maxTextureSize);ee=_t(w,ee);const me=s.convert(w.format,w.colorSpace),Re=s.convert(w.type);let Le=y(w.internalFormat,me,Re,w.colorSpace,w.isVideoTexture);we(K,w);let ge;const $e=w.mipmaps,Be=w.isVideoTexture!==!0,mt=Se.__version===void 0||Q===!0,U=Y.dataReady,ae=E(w,ee);if(w.isDepthTexture)Le=v(w.format===ra,w.type),mt&&(Be?t.texStorage2D(r.TEXTURE_2D,1,Le,ee.width,ee.height):t.texImage2D(r.TEXTURE_2D,0,Le,ee.width,ee.height,0,me,Re,null));else if(w.isDataTexture)if($e.length>0){Be&&mt&&t.texStorage2D(r.TEXTURE_2D,ae,Le,$e[0].width,$e[0].height);for(let j=0,J=$e.length;j<J;j++)ge=$e[j],Be?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,ge.width,ge.height,me,Re,ge.data):t.texImage2D(r.TEXTURE_2D,j,Le,ge.width,ge.height,0,me,Re,ge.data);w.generateMipmaps=!1}else Be?(mt&&t.texStorage2D(r.TEXTURE_2D,ae,Le,ee.width,ee.height),U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee.width,ee.height,me,Re,ee.data)):t.texImage2D(r.TEXTURE_2D,0,Le,ee.width,ee.height,0,me,Re,ee.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Be&&mt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ae,Le,$e[0].width,$e[0].height,ee.depth);for(let j=0,J=$e.length;j<J;j++)if(ge=$e[j],w.format!==Wn)if(me!==null)if(Be){if(U)if(w.layerUpdates.size>0){const ue=Zf(ge.width,ge.height,w.format,w.type);for(const ce of w.layerUpdates){const Ne=ge.data.subarray(ce*ue/ge.data.BYTES_PER_ELEMENT,(ce+1)*ue/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,ce,ge.width,ge.height,1,me,Ne)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,ge.width,ge.height,ee.depth,me,ge.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,Le,ge.width,ge.height,ee.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,ge.width,ge.height,ee.depth,me,Re,ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,j,Le,ge.width,ge.height,ee.depth,0,me,Re,ge.data)}else{Be&&mt&&t.texStorage2D(r.TEXTURE_2D,ae,Le,$e[0].width,$e[0].height);for(let j=0,J=$e.length;j<J;j++)ge=$e[j],w.format!==Wn?me!==null?Be?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(r.TEXTURE_2D,j,Le,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,ge.width,ge.height,me,Re,ge.data):t.texImage2D(r.TEXTURE_2D,j,Le,ge.width,ge.height,0,me,Re,ge.data)}else if(w.isDataArrayTexture)if(Be){if(mt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ae,Le,ee.width,ee.height,ee.depth),U)if(w.layerUpdates.size>0){const j=Zf(ee.width,ee.height,w.format,w.type);for(const J of w.layerUpdates){const ue=ee.data.subarray(J*j/ee.data.BYTES_PER_ELEMENT,(J+1)*j/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,ee.width,ee.height,1,me,Re,ue)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,me,Re,ee.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Le,ee.width,ee.height,ee.depth,0,me,Re,ee.data);else if(w.isData3DTexture)Be?(mt&&t.texStorage3D(r.TEXTURE_3D,ae,Le,ee.width,ee.height,ee.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,me,Re,ee.data)):t.texImage3D(r.TEXTURE_3D,0,Le,ee.width,ee.height,ee.depth,0,me,Re,ee.data);else if(w.isFramebufferTexture){if(mt)if(Be)t.texStorage2D(r.TEXTURE_2D,ae,Le,ee.width,ee.height);else{let j=ee.width,J=ee.height;for(let ue=0;ue<ae;ue++)t.texImage2D(r.TEXTURE_2D,ue,Le,j,J,0,me,Re,null),j>>=1,J>>=1}}else if($e.length>0){if(Be&&mt){const j=Ee($e[0]);t.texStorage2D(r.TEXTURE_2D,ae,Le,j.width,j.height)}for(let j=0,J=$e.length;j<J;j++)ge=$e[j],Be?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,me,Re,ge):t.texImage2D(r.TEXTURE_2D,j,Le,me,Re,ge);w.generateMipmaps=!1}else if(Be){if(mt){const j=Ee(ee);t.texStorage2D(r.TEXTURE_2D,ae,Le,j.width,j.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,me,Re,ee)}else t.texImage2D(r.TEXTURE_2D,0,Le,me,Re,ee);g(w)&&m(K),Se.__version=Y.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Z(P,w,H){if(w.image.length!==6)return;const K=Ce(P,w),Q=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+H);const Y=n.get(Q);if(Q.version!==Y.__version||K===!0){t.activeTexture(r.TEXTURE0+H);const Se=De.getPrimaries(De.workingColorSpace),le=w.colorSpace===as?null:De.getPrimaries(w.colorSpace),pe=w.colorSpace===as||Se===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ze=w.isCompressedTexture||w.image[0].isCompressedTexture,ee=w.image[0]&&w.image[0].isDataTexture,me=[];for(let J=0;J<6;J++)!Ze&&!ee?me[J]=_(w.image[J],!0,i.maxCubemapSize):me[J]=ee?w.image[J].image:w.image[J],me[J]=_t(w,me[J]);const Re=me[0],Le=s.convert(w.format,w.colorSpace),ge=s.convert(w.type),$e=y(w.internalFormat,Le,ge,w.colorSpace),Be=w.isVideoTexture!==!0,mt=Y.__version===void 0||K===!0,U=Q.dataReady;let ae=E(w,Re);we(r.TEXTURE_CUBE_MAP,w);let j;if(Ze){Be&&mt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ae,$e,Re.width,Re.height);for(let J=0;J<6;J++){j=me[J].mipmaps;for(let ue=0;ue<j.length;ue++){const ce=j[ue];w.format!==Wn?Le!==null?Be?U&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,ce.width,ce.height,Le,ce.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,ce.width,ce.height,Le,ge,ce.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,ce.width,ce.height,0,Le,ge,ce.data)}}}else{if(j=w.mipmaps,Be&&mt){j.length>0&&ae++;const J=Ee(me[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ae,$e,J.width,J.height)}for(let J=0;J<6;J++)if(ee){Be?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,me[J].width,me[J].height,Le,ge,me[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,me[J].width,me[J].height,0,Le,ge,me[J].data);for(let ue=0;ue<j.length;ue++){const Ne=j[ue].image[J].image;Be?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Ne.width,Ne.height,Le,ge,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Ne.width,Ne.height,0,Le,ge,Ne.data)}}else{Be?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,ge,me[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Le,ge,me[J]);for(let ue=0;ue<j.length;ue++){const ce=j[ue];Be?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Le,ge,ce.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Le,ge,ce.image[J])}}}g(w)&&m(r.TEXTURE_CUBE_MAP),Y.__version=Q.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function _e(P,w,H,K,Q,Y){const Se=s.convert(H.format,H.colorSpace),le=s.convert(H.type),pe=y(H.internalFormat,Se,le,H.colorSpace),Ze=n.get(w),ee=n.get(H);if(ee.__renderTarget=w,!Ze.__hasExternalTextures){const me=Math.max(1,w.width>>Y),Re=Math.max(1,w.height>>Y);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,pe,me,Re,w.depth,0,Se,le,null):t.texImage2D(Q,Y,pe,me,Re,0,Se,le,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),Ye(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,Q,ee.__webglTexture,0,je(w)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,Q,ee.__webglTexture,Y),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(P,w,H){if(r.bindRenderbuffer(r.RENDERBUFFER,P),w.depthBuffer){const K=w.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Y=v(w.stencilBuffer,Q),Se=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,le=je(w);Ye(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,le,Y,w.width,w.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,le,Y,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Y,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Se,r.RENDERBUFFER,P)}else{const K=w.textures;for(let Q=0;Q<K.length;Q++){const Y=K[Q],Se=s.convert(Y.format,Y.colorSpace),le=s.convert(Y.type),pe=y(Y.internalFormat,Se,le,Y.colorSpace),Ze=je(w);H&&Ye(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ze,pe,w.width,w.height):Ye(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ze,pe,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,pe,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Te(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(w.depthTexture);K.__renderTarget=w,(!K.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),z(w.depthTexture,0);const Q=K.__webglTexture,Y=je(w);if(w.depthTexture.format===qr)Ye(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(w.depthTexture.format===ra)Ye(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Pe(P){const w=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const K=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),K){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=K}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Te(w.__webglFramebuffer,P)}else if(H){w.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[K]),w.__webglDepthbuffer[K]===void 0)w.__webglDepthbuffer[K]=r.createRenderbuffer(),se(w.__webglDepthbuffer[K],P,!1);else{const Q=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),se(w.__webglDepthbuffer,P,!1);else{const K=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,Q)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ze(P,w,H){const K=n.get(P);w!==void 0&&_e(K.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&Pe(P)}function pt(P){const w=P.texture,H=n.get(P),K=n.get(w);P.addEventListener("dispose",T);const Q=P.textures,Y=P.isWebGLCubeRenderTarget===!0,Se=Q.length>1;if(Se||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=w.version,a.memory.textures++),Y){H.__webglFramebuffer=[];for(let le=0;le<6;le++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[le]=[];for(let pe=0;pe<w.mipmaps.length;pe++)H.__webglFramebuffer[le][pe]=r.createFramebuffer()}else H.__webglFramebuffer[le]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let le=0;le<w.mipmaps.length;le++)H.__webglFramebuffer[le]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(Se)for(let le=0,pe=Q.length;le<pe;le++){const Ze=n.get(Q[le]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=r.createTexture(),a.memory.textures++)}if(P.samples>0&&Ye(P)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let le=0;le<Q.length;le++){const pe=Q[le];H.__webglColorRenderbuffer[le]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[le]);const Ze=s.convert(pe.format,pe.colorSpace),ee=s.convert(pe.type),me=y(pe.internalFormat,Ze,ee,pe.colorSpace,P.isXRRenderTarget===!0),Re=je(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,me,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.RENDERBUFFER,H.__webglColorRenderbuffer[le])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),se(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Y){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),we(r.TEXTURE_CUBE_MAP,w);for(let le=0;le<6;le++)if(w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)_e(H.__webglFramebuffer[le][pe],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,pe);else _e(H.__webglFramebuffer[le],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);g(w)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let le=0,pe=Q.length;le<pe;le++){const Ze=Q[le],ee=n.get(Ze);t.bindTexture(r.TEXTURE_2D,ee.__webglTexture),we(r.TEXTURE_2D,Ze),_e(H.__webglFramebuffer,P,Ze,r.COLOR_ATTACHMENT0+le,r.TEXTURE_2D,0),g(Ze)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let le=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(le,K.__webglTexture),we(le,w),w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)_e(H.__webglFramebuffer[pe],P,w,r.COLOR_ATTACHMENT0,le,pe);else _e(H.__webglFramebuffer,P,w,r.COLOR_ATTACHMENT0,le,0);g(w)&&m(le),t.unbindTexture()}P.depthBuffer&&Pe(P)}function Ge(P){const w=P.textures;for(let H=0,K=w.length;H<K;H++){const Q=w[H];if(g(Q)){const Y=x(P),Se=n.get(Q).__webglTexture;t.bindTexture(Y,Se),m(Y),t.unbindTexture()}}}const Mt=[],k=[];function On(P){if(P.samples>0){if(Ye(P)===!1){const w=P.textures,H=P.width,K=P.height;let Q=r.COLOR_BUFFER_BIT;const Y=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Se=n.get(P),le=w.length>1;if(le)for(let pe=0;pe<w.length;pe++)t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let pe=0;pe<w.length;pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),le){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Se.__webglColorRenderbuffer[pe]);const Ze=n.get(w[pe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ze,0)}r.blitFramebuffer(0,0,H,K,0,0,H,K,Q,r.NEAREST),l===!0&&(Mt.length=0,k.length=0,Mt.push(r.COLOR_ATTACHMENT0+pe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Mt.push(Y),k.push(Y),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,k)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),le)for(let pe=0;pe<w.length;pe++){t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,Se.__webglColorRenderbuffer[pe]);const Ze=n.get(w[pe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,Ze,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function je(P){return Math.min(i.maxSamples,P.samples)}function Ye(P){const w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ae(P){const w=a.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function _t(P,w){const H=P.colorSpace,K=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==mn&&H!==as&&(De.getTransfer(H)===lt?(K!==Wn||Q!==Hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Ee(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=F,this.setTexture2D=z,this.setTexture2DArray=N,this.setTexture3D=G,this.setTextureCube=V,this.rebindTextures=ze,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=On,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ye}function Ob(r,e){function t(n,i=as){let s;const a=De.getTransfer(i);if(n===Hi)return r.UNSIGNED_BYTE;if(n===Ju)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Zu)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Qm)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Jm)return r.BYTE;if(n===Zm)return r.SHORT;if(n===co)return r.UNSIGNED_SHORT;if(n===Ku)return r.INT;if(n===Zs)return r.UNSIGNED_INT;if(n===si)return r.FLOAT;if(n===Po)return r.HALF_FLOAT;if(n===eg)return r.ALPHA;if(n===tg)return r.RGB;if(n===Wn)return r.RGBA;if(n===ng)return r.LUMINANCE;if(n===ig)return r.LUMINANCE_ALPHA;if(n===qr)return r.DEPTH_COMPONENT;if(n===ra)return r.DEPTH_STENCIL;if(n===Qu)return r.RED;if(n===ed)return r.RED_INTEGER;if(n===sg)return r.RG;if(n===td)return r.RG_INTEGER;if(n===nd)return r.RGBA_INTEGER;if(n===Pl||n===Ll||n===Il||n===Dl)if(a===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Pl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ll)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Pl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ll)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Il)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Hh||n===Gh||n===Wh||n===Xh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Hh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qh||n===jh||n===Yh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===qh||n===jh)return a===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Yh)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===$h||n===Kh||n===Jh||n===Zh||n===Qh||n===eu||n===tu||n===nu||n===iu||n===su||n===ru||n===au||n===ou||n===lu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===$h)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Kh)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jh)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zh)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qh)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===eu)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tu)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nu)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===iu)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===su)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ru)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===au)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ou)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lu)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fl||n===cu||n===hu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Fl)return a===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rg||n===uu||n===du||n===fu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Fl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===uu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===du)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sa?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class Bb extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ue extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kb={type:"move"};class $c{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kb)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ue;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const zb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Hb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new kt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bn({vertexShader:zb,fragmentShader:Vb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ve(new Io(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gb extends sr{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const _=new Hb,g=t.getContextAttributes();let m=null,x=null;const y=[],v=[],E=new ie;let b=null;const T=new sn;T.viewport=new We;const R=new sn;R.viewport=new We;const M=[T,R],S=new Bb;let L=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=y[q];return Z===void 0&&(Z=new $c,y[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=y[q];return Z===void 0&&(Z=new $c,y[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=y[q];return Z===void 0&&(Z=new $c,y[q]=Z),Z.getHandSpace()};function I(q){const Z=v.indexOf(q.inputSource);if(Z===-1)return;const _e=y[Z];_e!==void 0&&(_e.update(q.inputSource,q.frame,c||a),_e.dispatchEvent({type:q.type,data:q.inputSource}))}function D(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",z);for(let q=0;q<y.length;q++){const Z=v[q];Z!==null&&(v[q]=null,y[q].disconnect(Z))}L=null,F=null,_.reset(),e.setRenderTarget(m),f=null,d=null,u=null,i=null,x=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",D),i.addEventListener("inputsourceschange",z),g.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0){const Z={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Z),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Qs(f.framebufferWidth,f.framebufferHeight,{format:Wn,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let Z=null,_e=null,se=null;g.depth&&(se=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=g.stencil?ra:qr,_e=g.stencil?sa:Zs);const Te={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Qs(d.textureWidth,d.textureHeight,{format:Wn,type:Hi,depthTexture:new vg(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ce.setContext(i),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z(q){for(let Z=0;Z<q.removed.length;Z++){const _e=q.removed[Z],se=v.indexOf(_e);se>=0&&(v[se]=null,y[se].disconnect(_e))}for(let Z=0;Z<q.added.length;Z++){const _e=q.added[Z];let se=v.indexOf(_e);if(se===-1){for(let Pe=0;Pe<y.length;Pe++)if(Pe>=v.length){v.push(_e),se=Pe;break}else if(v[Pe]===null){v[Pe]=_e,se=Pe;break}if(se===-1)break}const Te=y[se];Te&&Te.connect(_e)}}const N=new C,G=new C;function V(q,Z,_e){N.setFromMatrixPosition(Z.matrixWorld),G.setFromMatrixPosition(_e.matrixWorld);const se=N.distanceTo(G),Te=Z.projectionMatrix.elements,Pe=_e.projectionMatrix.elements,ze=Te[14]/(Te[10]-1),pt=Te[14]/(Te[10]+1),Ge=(Te[9]+1)/Te[5],Mt=(Te[9]-1)/Te[5],k=(Te[8]-1)/Te[0],On=(Pe[8]+1)/Pe[0],je=ze*k,Ye=ze*On,Ae=se/(-k+On),_t=Ae*-k;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(_t),q.translateZ(Ae),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Te[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Ee=ze+Ae,P=pt+Ae,w=je-_t,H=Ye+(se-_t),K=Ge*pt/P*Ee,Q=Mt*pt/P*Ee;q.projectionMatrix.makePerspective(w,H,K,Q,Ee,P),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function $(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let Z=q.near,_e=q.far;_.texture!==null&&(_.depthNear>0&&(Z=_.depthNear),_.depthFar>0&&(_e=_.depthFar)),S.near=R.near=T.near=Z,S.far=R.far=T.far=_e,(L!==S.near||F!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),L=S.near,F=S.far),T.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,S.layers.mask=T.layers.mask|R.layers.mask;const se=q.parent,Te=S.cameras;$(S,se);for(let Pe=0;Pe<Te.length;Pe++)$(Te[Pe],se);Te.length===2?V(S,T,R):S.projectionMatrix.copy(T.projectionMatrix),ne(q,S,se)};function ne(q,Z,_e){_e===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(_e.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=aa*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let de=null;function we(q,Z){if(h=Z.getViewerPose(c||a),p=Z,h!==null){const _e=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let se=!1;_e.length!==S.cameras.length&&(S.cameras.length=0,se=!0);for(let Pe=0;Pe<_e.length;Pe++){const ze=_e[Pe];let pt=null;if(f!==null)pt=f.getViewport(ze);else{const Mt=u.getViewSubImage(d,ze);pt=Mt.viewport,Pe===0&&(e.setRenderTargetTextures(x,Mt.colorTexture,d.ignoreDepthValues?void 0:Mt.depthStencilTexture),e.setRenderTarget(x))}let Ge=M[Pe];Ge===void 0&&(Ge=new sn,Ge.layers.enable(Pe),Ge.viewport=new We,M[Pe]=Ge),Ge.matrix.fromArray(ze.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(ze.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(pt.x,pt.y,pt.width,pt.height),Pe===0&&(S.matrix.copy(Ge.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),se===!0&&S.cameras.push(Ge)}const Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")){const Pe=u.getDepthInformation(_e[0]);Pe&&Pe.isValid&&Pe.texture&&_.init(e,Pe,i.renderState)}}for(let _e=0;_e<y.length;_e++){const se=v[_e],Te=y[_e];se!==null&&Te!==void 0&&Te.update(se,Z,c||a)}de&&de(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),p=null}const Ce=new _g;Ce.setAnimationLoop(we),this.setAnimationLoop=function(q){de=q},this.dispose=function(){}}}const Cs=new Vt,Wb=new fe;function Xb(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,pg(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,y,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,v)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,x,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===ln&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===ln&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=e.get(m),y=x.envMap,v=x.envMapRotation;y&&(g.envMap.value=y,Cs.copy(v),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),g.envMapRotation.value.setFromMatrix4(Wb.makeRotationFromEuler(Cs)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ln&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function qb(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const v=y.program;n.uniformBlockBinding(x,v)}function c(x,y){let v=i[x.id];v===void 0&&(p(x),v=h(x),i[x.id]=v,x.addEventListener("dispose",g));const E=y.program;n.updateUBOMapping(x,E);const b=e.render.frame;s[x.id]!==b&&(d(x),s[x.id]=b)}function h(x){const y=u();x.__bindingPointIndex=y;const v=r.createBuffer(),E=x.__size,b=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],v=x.uniforms,E=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let b=0,T=v.length;b<T;b++){const R=Array.isArray(v[b])?v[b]:[v[b]];for(let M=0,S=R.length;M<S;M++){const L=R[M];if(f(L,b,M,E)===!0){const F=L.__offset,I=Array.isArray(L.value)?L.value:[L.value];let D=0;for(let z=0;z<I.length;z++){const N=I[z],G=_(N);typeof N=="number"||typeof N=="boolean"?(L.__data[0]=N,r.bufferSubData(r.UNIFORM_BUFFER,F+D,L.__data)):N.isMatrix3?(L.__data[0]=N.elements[0],L.__data[1]=N.elements[1],L.__data[2]=N.elements[2],L.__data[3]=0,L.__data[4]=N.elements[3],L.__data[5]=N.elements[4],L.__data[6]=N.elements[5],L.__data[7]=0,L.__data[8]=N.elements[6],L.__data[9]=N.elements[7],L.__data[10]=N.elements[8],L.__data[11]=0):(N.toArray(L.__data,D),D+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,y,v,E){const b=x.value,T=y+"_"+v;if(E[T]===void 0)return typeof b=="number"||typeof b=="boolean"?E[T]=b:E[T]=b.clone(),!0;{const R=E[T];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return E[T]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function p(x){const y=x.uniforms;let v=0;const E=16;for(let T=0,R=y.length;T<R;T++){const M=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,L=M.length;S<L;S++){const F=M[S],I=Array.isArray(F.value)?F.value:[F.value];for(let D=0,z=I.length;D<z;D++){const N=I[D],G=_(N),V=v%E,$=V%G.boundary,ne=V+$;v+=$,ne!==0&&E-ne<G.storage&&(v+=E-ne),F.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=G.storage}}}const b=v%E;return b>0&&(v+=E-b),x.__size=v,x.__cache={},this}function _(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function g(x){const y=x.target;y.removeEventListener("dispose",g);const v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class jb{constructor(e={}){const{canvas:t=Uv(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this.toneMapping=ps,this.toneMappingExposure=1;const v=this;let E=!1,b=0,T=0,R=null,M=-1,S=null;const L=new We,F=new We;let I=null;const D=new oe(0);let z=0,N=t.width,G=t.height,V=1,$=null,ne=null;const de=new We(0,0,N,G),we=new We(0,0,N,G);let Ce=!1;const q=new od;let Z=!1,_e=!1;const se=new fe,Te=new fe,Pe=new C,ze=new We,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function Mt(){return R===null?V:1}let k=n;function On(A,O){return t.getContext(A,O)}try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$u}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",ce,!1),k===null){const O="webgl2";if(k=On(O,A),k===null)throw On(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let je,Ye,Ae,_t,Ee,P,w,H,K,Q,Y,Se,le,pe,Ze,ee,me,Re,Le,ge,$e,Be,mt,U;function ae(){je=new ZM(k),je.init(),Be=new Ob(k,je),Ye=new qM(k,je,e,Be),Ae=new Fb(k,je),Ye.reverseDepthBuffer&&d&&Ae.buffers.depth.setReversed(!0),_t=new tS(k),Ee=new yb,P=new Nb(k,je,Ae,Ee,Ye,Be,_t),w=new YM(v),H=new JM(v),K=new ly(k),mt=new WM(k,K),Q=new QM(k,K,_t,mt),Y=new iS(k,Q,K,_t),Le=new nS(k,Ye,P),ee=new jM(Ee),Se=new vb(v,w,H,je,Ye,mt,ee),le=new Xb(v,Ee),pe=new Mb,Ze=new Ab(je),Re=new GM(v,w,H,Ae,Y,f,l),me=new Ib(v,Y,Ye),U=new qb(k,_t,Ye,Ae),ge=new XM(k,je,_t),$e=new eS(k,je,_t),_t.programs=Se.programs,v.capabilities=Ye,v.extensions=je,v.properties=Ee,v.renderLists=pe,v.shadowMap=me,v.state=Ae,v.info=_t}ae();const j=new Gb(v,k);this.xr=j,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const A=je.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=je.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(A){A!==void 0&&(V=A,this.setSize(N,G,!1))},this.getSize=function(A){return A.set(N,G)},this.setSize=function(A,O,W=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,G=O,t.width=Math.floor(A*V),t.height=Math.floor(O*V),W===!0&&(t.style.width=A+"px",t.style.height=O+"px"),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(N*V,G*V).floor()},this.setDrawingBufferSize=function(A,O,W){N=A,G=O,V=W,t.width=Math.floor(A*W),t.height=Math.floor(O*W),this.setViewport(0,0,A,O)},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(de)},this.setViewport=function(A,O,W,X){A.isVector4?de.set(A.x,A.y,A.z,A.w):de.set(A,O,W,X),Ae.viewport(L.copy(de).multiplyScalar(V).round())},this.getScissor=function(A){return A.copy(we)},this.setScissor=function(A,O,W,X){A.isVector4?we.set(A.x,A.y,A.z,A.w):we.set(A,O,W,X),Ae.scissor(F.copy(we).multiplyScalar(V).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(A){Ae.setScissorTest(Ce=A)},this.setOpaqueSort=function(A){$=A},this.setTransparentSort=function(A){ne=A},this.getClearColor=function(A){return A.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(A=!0,O=!0,W=!0){let X=0;if(A){let B=!1;if(R!==null){const te=R.texture.format;B=te===nd||te===td||te===ed}if(B){const te=R.texture.type,he=te===Hi||te===Zs||te===co||te===sa||te===Ju||te===Zu,ye=Re.getClearColor(),xe=Re.getClearAlpha(),Ie=ye.r,Oe=ye.g,Me=ye.b;he?(p[0]=Ie,p[1]=Oe,p[2]=Me,p[3]=xe,k.clearBufferuiv(k.COLOR,0,p)):(_[0]=Ie,_[1]=Oe,_[2]=Me,_[3]=xe,k.clearBufferiv(k.COLOR,0,_))}else X|=k.COLOR_BUFFER_BIT}O&&(X|=k.DEPTH_BUFFER_BIT),W&&(X|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),pe.dispose(),Ze.dispose(),Ee.dispose(),w.dispose(),H.dispose(),Y.dispose(),mt.dispose(),U.dispose(),Se.dispose(),j.dispose(),j.removeEventListener("sessionstart",qd),j.removeEventListener("sessionend",jd),bs.stop()};function J(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=_t.autoReset,O=me.enabled,W=me.autoUpdate,X=me.needsUpdate,B=me.type;ae(),_t.autoReset=A,me.enabled=O,me.autoUpdate=W,me.needsUpdate=X,me.type=B}function ce(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ne(A){const O=A.target;O.removeEventListener("dispose",Ne),Pt(O)}function Pt(A){en(A),Ee.remove(A)}function en(A){const O=Ee.get(A).programs;O!==void 0&&(O.forEach(function(W){Se.releaseProgram(W)}),A.isShaderMaterial&&Se.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,W,X,B,te){O===null&&(O=pt);const he=B.isMesh&&B.matrixWorld.determinant()<0,ye=R0(A,O,W,X,B);Ae.setMaterial(X,he);let xe=W.index,Ie=1;if(X.wireframe===!0){if(xe=Q.getWireframeAttribute(W),xe===void 0)return;Ie=2}const Oe=W.drawRange,Me=W.attributes.position;let et=Oe.start*Ie,gt=(Oe.start+Oe.count)*Ie;te!==null&&(et=Math.max(et,te.start*Ie),gt=Math.min(gt,(te.start+te.count)*Ie)),xe!==null?(et=Math.max(et,0),gt=Math.min(gt,xe.count)):Me!=null&&(et=Math.max(et,0),gt=Math.min(gt,Me.count));const vt=gt-et;if(vt<0||vt===1/0)return;mt.setup(B,X,ye,W,xe);let gn,it=ge;if(xe!==null&&(gn=K.get(xe),it=$e,it.setIndex(gn)),B.isMesh)X.wireframe===!0?(Ae.setLineWidth(X.wireframeLinewidth*Mt()),it.setMode(k.LINES)):it.setMode(k.TRIANGLES);else if(B.isLine){let be=X.linewidth;be===void 0&&(be=1),Ae.setLineWidth(be*Mt()),B.isLineSegments?it.setMode(k.LINES):B.isLineLoop?it.setMode(k.LINE_LOOP):it.setMode(k.LINE_STRIP)}else B.isPoints?it.setMode(k.POINTS):B.isSprite&&it.setMode(k.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)it.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))it.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const be=B._multiDrawStarts,wi=B._multiDrawCounts,st=B._multiDrawCount,Yn=xe?K.get(xe).bytesPerElement:1,ar=Ee.get(X).currentProgram.getUniforms();for(let Tn=0;Tn<st;Tn++)ar.setValue(k,"_gl_DrawID",Tn),it.render(be[Tn]/Yn,wi[Tn])}else if(B.isInstancedMesh)it.renderInstances(et,vt,B.count);else if(W.isInstancedBufferGeometry){const be=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,wi=Math.min(W.instanceCount,be);it.renderInstances(et,vt,wi)}else it.render(et,vt)};function at(A,O,W){A.transparent===!0&&A.side===vn&&A.forceSinglePass===!1?(A.side=ln,A.needsUpdate=!0,Bo(A,O,W),A.side=yi,A.needsUpdate=!0,Bo(A,O,W),A.side=vn):Bo(A,O,W)}this.compile=function(A,O,W=null){W===null&&(W=A),m=Ze.get(W),m.init(O),y.push(m),W.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),A!==W&&A.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const X=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const te=B.material;if(te)if(Array.isArray(te))for(let he=0;he<te.length;he++){const ye=te[he];at(ye,W,B),X.add(ye)}else at(te,W,B),X.add(te)}),y.pop(),m=null,X},this.compileAsync=function(A,O,W=null){const X=this.compile(A,O,W);return new Promise(B=>{function te(){if(X.forEach(function(he){Ee.get(he).currentProgram.isReady()&&X.delete(he)}),X.size===0){B(A);return}setTimeout(te,10)}je.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let jn=null;function bi(A){jn&&jn(A)}function qd(){bs.stop()}function jd(){bs.start()}const bs=new _g;bs.setAnimationLoop(bi),typeof self<"u"&&bs.setContext(self),this.setAnimationLoop=function(A){jn=A,j.setAnimationLoop(A),A===null?bs.stop():bs.start()},j.addEventListener("sessionstart",qd),j.addEventListener("sessionend",jd),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(O),O=j.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,O,R),m=Ze.get(A,y.length),m.init(O),y.push(m),Te.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),q.setFromProjectionMatrix(Te),_e=this.localClippingEnabled,Z=ee.init(this.clippingPlanes,_e),g=pe.get(A,x.length),g.init(),x.push(g),j.enabled===!0&&j.isPresenting===!0){const te=v.xr.getDepthSensingMesh();te!==null&&Mc(te,O,-1/0,v.sortObjects)}Mc(A,O,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort($,ne),Ge=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Ge&&Re.addToRenderList(g,A),this.info.render.frame++,Z===!0&&ee.beginShadows();const W=m.state.shadowsArray;me.render(W,A,O),Z===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=g.opaque,B=g.transmissive;if(m.setupLights(),O.isArrayCamera){const te=O.cameras;if(B.length>0)for(let he=0,ye=te.length;he<ye;he++){const xe=te[he];$d(X,B,A,xe)}Ge&&Re.render(A);for(let he=0,ye=te.length;he<ye;he++){const xe=te[he];Yd(g,A,xe,xe.viewport)}}else B.length>0&&$d(X,B,A,O),Ge&&Re.render(A),Yd(g,A,O);R!==null&&(P.updateMultisampleRenderTarget(R),P.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(v,A,O),mt.resetDefaultState(),M=-1,S=null,y.pop(),y.length>0?(m=y[y.length-1],Z===!0&&ee.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function Mc(A,O,W,X){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){X&&ze.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Te);const he=Y.update(A),ye=A.material;ye.visible&&g.push(A,he,ye,W,ze.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){const he=Y.update(A),ye=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ze.copy(A.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),ze.copy(he.boundingSphere.center)),ze.applyMatrix4(A.matrixWorld).applyMatrix4(Te)),Array.isArray(ye)){const xe=he.groups;for(let Ie=0,Oe=xe.length;Ie<Oe;Ie++){const Me=xe[Ie],et=ye[Me.materialIndex];et&&et.visible&&g.push(A,he,et,W,ze.z,Me)}}else ye.visible&&g.push(A,he,ye,W,ze.z,null)}}const te=A.children;for(let he=0,ye=te.length;he<ye;he++)Mc(te[he],O,W,X)}function Yd(A,O,W,X){const B=A.opaque,te=A.transmissive,he=A.transparent;m.setupLightsView(W),Z===!0&&ee.setGlobalState(v.clippingPlanes,W),X&&Ae.viewport(L.copy(X)),B.length>0&&Oo(B,O,W),te.length>0&&Oo(te,O,W),he.length>0&&Oo(he,O,W),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function $d(A,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[X.id]===void 0&&(m.state.transmissionRenderTarget[X.id]=new Qs(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?Po:Hi,minFilter:Oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:De.workingColorSpace}));const te=m.state.transmissionRenderTarget[X.id],he=X.viewport||L;te.setSize(he.z,he.w);const ye=v.getRenderTarget();v.setRenderTarget(te),v.getClearColor(D),z=v.getClearAlpha(),z<1&&v.setClearColor(16777215,.5),v.clear(),Ge&&Re.render(W);const xe=v.toneMapping;v.toneMapping=ps;const Ie=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),m.setupLightsView(X),Z===!0&&ee.setGlobalState(v.clippingPlanes,X),Oo(A,W,X),P.updateMultisampleRenderTarget(te),P.updateRenderTargetMipmap(te),je.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let Me=0,et=O.length;Me<et;Me++){const gt=O[Me],vt=gt.object,gn=gt.geometry,it=gt.material,be=gt.group;if(it.side===vn&&vt.layers.test(X.layers)){const wi=it.side;it.side=ln,it.needsUpdate=!0,Kd(vt,W,X,gn,it,be),it.side=wi,it.needsUpdate=!0,Oe=!0}}Oe===!0&&(P.updateMultisampleRenderTarget(te),P.updateRenderTargetMipmap(te))}v.setRenderTarget(ye),v.setClearColor(D,z),Ie!==void 0&&(X.viewport=Ie),v.toneMapping=xe}function Oo(A,O,W){const X=O.isScene===!0?O.overrideMaterial:null;for(let B=0,te=A.length;B<te;B++){const he=A[B],ye=he.object,xe=he.geometry,Ie=X===null?he.material:X,Oe=he.group;ye.layers.test(W.layers)&&Kd(ye,O,W,xe,Ie,Oe)}}function Kd(A,O,W,X,B,te){A.onBeforeRender(v,O,W,X,B,te),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(v,O,W,X,A,te),B.transparent===!0&&B.side===vn&&B.forceSinglePass===!1?(B.side=ln,B.needsUpdate=!0,v.renderBufferDirect(W,O,X,B,A,te),B.side=yi,B.needsUpdate=!0,v.renderBufferDirect(W,O,X,B,A,te),B.side=vn):v.renderBufferDirect(W,O,X,B,A,te),A.onAfterRender(v,O,W,X,B,te)}function Bo(A,O,W){O.isScene!==!0&&(O=pt);const X=Ee.get(A),B=m.state.lights,te=m.state.shadowsArray,he=B.state.version,ye=Se.getParameters(A,B.state,te,O,W),xe=Se.getProgramCacheKey(ye);let Ie=X.programs;X.environment=A.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(A.isMeshStandardMaterial?H:w).get(A.envMap||X.environment),X.envMapRotation=X.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,Ie===void 0&&(A.addEventListener("dispose",Ne),Ie=new Map,X.programs=Ie);let Oe=Ie.get(xe);if(Oe!==void 0){if(X.currentProgram===Oe&&X.lightsStateVersion===he)return Zd(A,ye),Oe}else ye.uniforms=Se.getUniforms(A),A.onBeforeCompile(ye,v),Oe=Se.acquireProgram(ye,xe),Ie.set(xe,Oe),X.uniforms=ye.uniforms;const Me=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Me.clippingPlanes=ee.uniform),Zd(A,ye),X.needsLights=P0(A),X.lightsStateVersion=he,X.needsLights&&(Me.ambientLightColor.value=B.state.ambient,Me.lightProbe.value=B.state.probe,Me.directionalLights.value=B.state.directional,Me.directionalLightShadows.value=B.state.directionalShadow,Me.spotLights.value=B.state.spot,Me.spotLightShadows.value=B.state.spotShadow,Me.rectAreaLights.value=B.state.rectArea,Me.ltc_1.value=B.state.rectAreaLTC1,Me.ltc_2.value=B.state.rectAreaLTC2,Me.pointLights.value=B.state.point,Me.pointLightShadows.value=B.state.pointShadow,Me.hemisphereLights.value=B.state.hemi,Me.directionalShadowMap.value=B.state.directionalShadowMap,Me.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Me.spotShadowMap.value=B.state.spotShadowMap,Me.spotLightMatrix.value=B.state.spotLightMatrix,Me.spotLightMap.value=B.state.spotLightMap,Me.pointShadowMap.value=B.state.pointShadowMap,Me.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Oe,X.uniformsList=null,Oe}function Jd(A){if(A.uniformsList===null){const O=A.currentProgram.getUniforms();A.uniformsList=Nl.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function Zd(A,O){const W=Ee.get(A);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function R0(A,O,W,X,B){O.isScene!==!0&&(O=pt),P.resetTextureUnits();const te=O.fog,he=X.isMeshStandardMaterial?O.environment:null,ye=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:mn,xe=(X.isMeshStandardMaterial?H:w).get(X.envMap||he),Ie=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Oe=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Me=!!W.morphAttributes.position,et=!!W.morphAttributes.normal,gt=!!W.morphAttributes.color;let vt=ps;X.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(vt=v.toneMapping);const gn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,it=gn!==void 0?gn.length:0,be=Ee.get(X),wi=m.state.lights;if(Z===!0&&(_e===!0||A!==S)){const Bn=A===S&&X.id===M;ee.setState(X,A,Bn)}let st=!1;X.version===be.__version?(be.needsLights&&be.lightsStateVersion!==wi.state.version||be.outputColorSpace!==ye||B.isBatchedMesh&&be.batching===!1||!B.isBatchedMesh&&be.batching===!0||B.isBatchedMesh&&be.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&be.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&be.instancing===!1||!B.isInstancedMesh&&be.instancing===!0||B.isSkinnedMesh&&be.skinning===!1||!B.isSkinnedMesh&&be.skinning===!0||B.isInstancedMesh&&be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&be.instancingMorph===!1&&B.morphTexture!==null||be.envMap!==xe||X.fog===!0&&be.fog!==te||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==ee.numPlanes||be.numIntersection!==ee.numIntersection)||be.vertexAlphas!==Ie||be.vertexTangents!==Oe||be.morphTargets!==Me||be.morphNormals!==et||be.morphColors!==gt||be.toneMapping!==vt||be.morphTargetsCount!==it)&&(st=!0):(st=!0,be.__version=X.version);let Yn=be.currentProgram;st===!0&&(Yn=Bo(X,O,B));let ar=!1,Tn=!1,Ma=!1;const yt=Yn.getUniforms(),ui=be.uniforms;if(Ae.useProgram(Yn.program)&&(ar=!0,Tn=!0,Ma=!0),X.id!==M&&(M=X.id,Tn=!0),ar||S!==A){Ae.buffers.depth.getReversed()?(se.copy(A.projectionMatrix),Ov(se),Bv(se),yt.setValue(k,"projectionMatrix",se)):yt.setValue(k,"projectionMatrix",A.projectionMatrix),yt.setValue(k,"viewMatrix",A.matrixWorldInverse);const $i=yt.map.cameraPosition;$i!==void 0&&$i.setValue(k,Pe.setFromMatrixPosition(A.matrixWorld)),Ye.logarithmicDepthBuffer&&yt.setValue(k,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&yt.setValue(k,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Tn=!0,Ma=!0)}if(B.isSkinnedMesh){yt.setOptional(k,B,"bindMatrix"),yt.setOptional(k,B,"bindMatrixInverse");const Bn=B.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),yt.setValue(k,"boneTexture",Bn.boneTexture,P))}B.isBatchedMesh&&(yt.setOptional(k,B,"batchingTexture"),yt.setValue(k,"batchingTexture",B._matricesTexture,P),yt.setOptional(k,B,"batchingIdTexture"),yt.setValue(k,"batchingIdTexture",B._indirectTexture,P),yt.setOptional(k,B,"batchingColorTexture"),B._colorsTexture!==null&&yt.setValue(k,"batchingColorTexture",B._colorsTexture,P));const Sa=W.morphAttributes;if((Sa.position!==void 0||Sa.normal!==void 0||Sa.color!==void 0)&&Le.update(B,W,Yn),(Tn||be.receiveShadow!==B.receiveShadow)&&(be.receiveShadow=B.receiveShadow,yt.setValue(k,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(ui.envMap.value=xe,ui.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(ui.envMapIntensity.value=O.environmentIntensity),Tn&&(yt.setValue(k,"toneMappingExposure",v.toneMappingExposure),be.needsLights&&C0(ui,Ma),te&&X.fog===!0&&le.refreshFogUniforms(ui,te),le.refreshMaterialUniforms(ui,X,V,G,m.state.transmissionRenderTarget[A.id]),Nl.upload(k,Jd(be),ui,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Nl.upload(k,Jd(be),ui,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&yt.setValue(k,"center",B.center),yt.setValue(k,"modelViewMatrix",B.modelViewMatrix),yt.setValue(k,"normalMatrix",B.normalMatrix),yt.setValue(k,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Bn=X.uniformsGroups;for(let $i=0,Ki=Bn.length;$i<Ki;$i++){const Qd=Bn[$i];U.update(Qd,Yn),U.bind(Qd,Yn)}}return Yn}function C0(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function P0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,O,W){Ee.get(A.texture).__webglTexture=O,Ee.get(A.depthTexture).__webglTexture=W;const X=Ee.get(A);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,O){const W=Ee.get(A);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(A,O=0,W=0){R=A,b=O,T=W;let X=!0,B=null,te=!1,he=!1;if(A){const xe=Ee.get(A);if(xe.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(k.FRAMEBUFFER,null),X=!1;else if(xe.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(xe.__hasExternalTextures)P.rebindTextures(A,Ee.get(A.texture).__webglTexture,Ee.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Me=A.depthTexture;if(xe.__boundDepthTexture!==Me){if(Me!==null&&Ee.has(Me)&&(A.width!==Me.image.width||A.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const Ie=A.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(he=!0);const Oe=Ee.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Oe[O])?B=Oe[O][W]:B=Oe[O],te=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?B=Ee.get(A).__webglMultisampledFramebuffer:Array.isArray(Oe)?B=Oe[W]:B=Oe,L.copy(A.viewport),F.copy(A.scissor),I=A.scissorTest}else L.copy(de).multiplyScalar(V).floor(),F.copy(we).multiplyScalar(V).floor(),I=Ce;if(Ae.bindFramebuffer(k.FRAMEBUFFER,B)&&X&&Ae.drawBuffers(A,B),Ae.viewport(L),Ae.scissor(F),Ae.setScissorTest(I),te){const xe=Ee.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+O,xe.__webglTexture,W)}else if(he){const xe=Ee.get(A.texture),Ie=O||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,xe.__webglTexture,W||0,Ie)}M=-1},this.readRenderTargetPixels=function(A,O,W,X,B,te,he){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Ee.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&he!==void 0&&(ye=ye[he]),ye){Ae.bindFramebuffer(k.FRAMEBUFFER,ye);try{const xe=A.texture,Ie=xe.format,Oe=xe.type;if(!Ye.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-X&&W>=0&&W<=A.height-B&&k.readPixels(O,W,X,B,Be.convert(Ie),Be.convert(Oe),te)}finally{const xe=R!==null?Ee.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(k.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(A,O,W,X,B,te,he){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Ee.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&he!==void 0&&(ye=ye[he]),ye){const xe=A.texture,Ie=xe.format,Oe=xe.type;if(!Ye.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=A.width-X&&W>=0&&W<=A.height-B){Ae.bindFramebuffer(k.FRAMEBUFFER,ye);const Me=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Me),k.bufferData(k.PIXEL_PACK_BUFFER,te.byteLength,k.STREAM_READ),k.readPixels(O,W,X,B,Be.convert(Ie),Be.convert(Oe),0);const et=R!==null?Ee.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(k.FRAMEBUFFER,et);const gt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Nv(k,gt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Me),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,te),k.deleteBuffer(Me),k.deleteSync(gt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,O=null,W=0){A.isTexture!==!0&&(qa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,A=arguments[1]);const X=Math.pow(2,-W),B=Math.floor(A.image.width*X),te=Math.floor(A.image.height*X),he=O!==null?O.x:0,ye=O!==null?O.y:0;P.setTexture2D(A,0),k.copyTexSubImage2D(k.TEXTURE_2D,W,0,0,he,ye,B,te),Ae.unbindTexture()},this.copyTextureToTexture=function(A,O,W=null,X=null,B=0){A.isTexture!==!0&&(qa("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1],O=arguments[2],B=arguments[3]||0,W=null);let te,he,ye,xe,Ie,Oe,Me,et,gt;const vt=A.isCompressedTexture?A.mipmaps[B]:A.image;W!==null?(te=W.max.x-W.min.x,he=W.max.y-W.min.y,ye=W.isBox3?W.max.z-W.min.z:1,xe=W.min.x,Ie=W.min.y,Oe=W.isBox3?W.min.z:0):(te=vt.width,he=vt.height,ye=vt.depth||1,xe=0,Ie=0,Oe=0),X!==null?(Me=X.x,et=X.y,gt=X.z):(Me=0,et=0,gt=0);const gn=Be.convert(O.format),it=Be.convert(O.type);let be;O.isData3DTexture?(P.setTexture3D(O,0),be=k.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(P.setTexture2DArray(O,0),be=k.TEXTURE_2D_ARRAY):(P.setTexture2D(O,0),be=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,O.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,O.unpackAlignment);const wi=k.getParameter(k.UNPACK_ROW_LENGTH),st=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Yn=k.getParameter(k.UNPACK_SKIP_PIXELS),ar=k.getParameter(k.UNPACK_SKIP_ROWS),Tn=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,vt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,vt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,xe),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ie),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Oe);const Ma=A.isDataArrayTexture||A.isData3DTexture,yt=O.isDataArrayTexture||O.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const ui=Ee.get(A),Sa=Ee.get(O),Bn=Ee.get(ui.__renderTarget),$i=Ee.get(Sa.__renderTarget);Ae.bindFramebuffer(k.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Ae.bindFramebuffer(k.DRAW_FRAMEBUFFER,$i.__webglFramebuffer);for(let Ki=0;Ki<ye;Ki++)Ma&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ee.get(A).__webglTexture,B,Oe+Ki),A.isDepthTexture?(yt&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ee.get(O).__webglTexture,B,gt+Ki),k.blitFramebuffer(xe,Ie,te,he,Me,et,te,he,k.DEPTH_BUFFER_BIT,k.NEAREST)):yt?k.copyTexSubImage3D(be,B,Me,et,gt+Ki,xe,Ie,te,he):k.copyTexSubImage2D(be,B,Me,et,gt+Ki,xe,Ie,te,he);Ae.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else yt?A.isDataTexture||A.isData3DTexture?k.texSubImage3D(be,B,Me,et,gt,te,he,ye,gn,it,vt.data):O.isCompressedArrayTexture?k.compressedTexSubImage3D(be,B,Me,et,gt,te,he,ye,gn,vt.data):k.texSubImage3D(be,B,Me,et,gt,te,he,ye,gn,it,vt):A.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,B,Me,et,te,he,gn,it,vt.data):A.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,B,Me,et,vt.width,vt.height,gn,vt.data):k.texSubImage2D(k.TEXTURE_2D,B,Me,et,te,he,gn,it,vt);k.pixelStorei(k.UNPACK_ROW_LENGTH,wi),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,st),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Yn),k.pixelStorei(k.UNPACK_SKIP_ROWS,ar),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Tn),B===0&&O.generateMipmaps&&k.generateMipmap(be),Ae.unbindTexture()},this.copyTextureToTexture3D=function(A,O,W=null,X=null,B=0){return A.isTexture!==!0&&(qa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,A=arguments[2],O=arguments[3],B=arguments[4]||0),qa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,O,W,X,B)},this.initRenderTarget=function(A){Ee.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),Ae.unbindTexture()},this.resetState=function(){b=0,T=0,R=null,Ae.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=De._getDrawingBufferColorSpace(e),t.unpackColorSpace=De._getUnpackColorSpace()}}class Yb extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vt,this.environmentIntensity=1,this.environmentRotation=new Vt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class bg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=mu,this.updateRanges=[],this.version=0,this.uuid=ri()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const hn=new C;class po{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ii(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new po(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class _u extends Dn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Mr;const Aa=new C,Sr=new C,br=new C,wr=new ie,Ra=new ie,wg=new fe,rl=new C,Ca=new C,al=new C,Qf=new ie,Kc=new ie,ep=new ie;class tp extends ct{constructor(e=new _u){if(super(),this.isSprite=!0,this.type="Sprite",Mr===void 0){Mr=new wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new bg(t,5);Mr.setIndex([0,1,2,0,2,3]),Mr.setAttribute("position",new po(n,3,0,!1)),Mr.setAttribute("uv",new po(n,2,3,!1))}this.geometry=Mr,this.material=e,this.center=new ie(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Sr.setFromMatrixScale(this.matrixWorld),wg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),br.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Sr.multiplyScalar(-br.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;ol(rl.set(-.5,-.5,0),br,a,Sr,i,s),ol(Ca.set(.5,-.5,0),br,a,Sr,i,s),ol(al.set(.5,.5,0),br,a,Sr,i,s),Qf.set(0,0),Kc.set(1,0),ep.set(1,1);let o=e.ray.intersectTriangle(rl,Ca,al,!1,Aa);if(o===null&&(ol(Ca.set(-.5,.5,0),br,a,Sr,i,s),Kc.set(0,1),o=e.ray.intersectTriangle(rl,al,Ca,!1,Aa),o===null))return;const l=e.ray.origin.distanceTo(Aa);l<e.near||l>e.far||t.push({distance:l,point:Aa.clone(),uv:Hn.getInterpolation(Aa,rl,Ca,al,Qf,Kc,ep,new ie),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ol(r,e,t,n,i,s){wr.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Ra.x=s*wr.x-i*wr.y,Ra.y=i*wr.x+s*wr.y):Ra.copy(wr),r.copy(e),r.x+=Ra.x,r.y+=Ra.y,r.applyMatrix4(wg)}const np=new C,ip=new We,sp=new We,$b=new C,rp=new fe,ll=new C,Jc=new ci,ap=new fe,Zc=new Lo;class Tg extends ve{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sf,this.bindMatrix=new fe,this.bindMatrixInverse=new fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new rn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ll),this.boundingBox.expandByPoint(ll)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ci),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ll),this.boundingSphere.expandByPoint(ll)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jc.copy(this.boundingSphere),Jc.applyMatrix4(i),e.ray.intersectsSphere(Jc)!==!1&&(ap.copy(i).invert(),Zc.copy(e.ray).applyMatrix4(ap),!(this.boundingBox!==null&&Zc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Zc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new We,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rv?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ip.fromBufferAttribute(i.attributes.skinIndex,e),sp.fromBufferAttribute(i.attributes.skinWeight,e),np.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=sp.getComponent(s);if(a!==0){const o=ip.getComponent(s);rp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector($b.copy(np).applyMatrix4(rp),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class jl extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Eg extends kt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=pn,h=pn,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const op=new fe,Kb=new fe;class dc{constructor(e=[],t=[]){this.uuid=ri(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new fe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Kb;op.multiplyMatrices(o,t[s]),op.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new dc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Eg(t,e,e,Wn,si);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new jl),this.bones.push(a),this.boneInverses.push(new fe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class vu extends Je{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Tr=new fe,lp=new fe,cl=[],cp=new rn,Jb=new fe,Pa=new ve,La=new ci;class Zb extends ve{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Jb)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new rn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Tr),cp.copy(e.boundingBox).applyMatrix4(Tr),this.boundingBox.union(cp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Tr),La.copy(e.boundingSphere).applyMatrix4(Tr),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Pa.geometry=this.geometry,Pa.material=this.material,Pa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Tr),lp.multiplyMatrices(n,Tr),Pa.matrixWorld=lp,Pa.raycast(e,cl);for(let a=0,o=cl.length;a<o;a++){const l=cl[a];l.instanceId=s,l.object=this,t.push(l)}cl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new vu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Eg(new Float32Array(i*this.count),i,this.count,Qu,si));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class hd extends Dn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Yl=new C,$l=new C,hp=new fe,Ia=new Lo,hl=new ci,Qc=new C,up=new C;class ga extends ct{constructor(e=new wt,t=new hd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Yl.fromBufferAttribute(t,i-1),$l.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Yl.distanceTo($l);e.setAttribute("lineDistance",new Qe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hl.copy(n.boundingSphere),hl.applyMatrix4(i),hl.radius+=s,e.ray.intersectsSphere(hl)===!1)return;hp.copy(i).invert(),Ia.copy(e.ray).applyMatrix4(hp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=h.getX(_),x=h.getX(_+1),y=ul(this,e,Ia,l,m,x);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=ul(this,e,Ia,l,_,g);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=ul(this,e,Ia,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=ul(this,e,Ia,l,p-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ul(r,e,t,n,i,s){const a=r.geometry.attributes.position;if(Yl.fromBufferAttribute(a,i),$l.fromBufferAttribute(a,s),t.distanceSqToSegment(Yl,$l,Qc,up)>n)return;Qc.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Qc);if(!(l<e.near||l>e.far))return{distance:l,point:up.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const dp=new C,fp=new C;class Qb extends ga{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)dp.fromBufferAttribute(t,i),fp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+dp.distanceTo(fp);e.setAttribute("lineDistance",new Qe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class e1 extends ga{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ag extends Dn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pp=new fe,yu=new Lo,dl=new ci,fl=new C;class ud extends ct{constructor(e=new wt,t=new Ag){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dl.copy(n.boundingSphere),dl.applyMatrix4(i),dl.radius+=s,e.ray.intersectsSphere(dl)===!1)return;pp.copy(i).invert(),yu.copy(e.ray).applyMatrix4(pp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,_=f;p<_;p++){const g=c.getX(p);fl.fromBufferAttribute(u,g),mp(fl,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,_=f;p<_;p++)fl.fromBufferAttribute(u,p),mp(fl,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function mp(r,e,t,n,i,s,a){const o=yu.distanceSqToPoint(r);if(o<t){const l=new C;yu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class t1 extends kt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new ie:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,i=[],s=[],a=[],o=new C,l=new fe;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new C)}s[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(zt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(zt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class dd extends hi{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ie){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class n1 extends dd{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function fd(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const pl=new C,eh=new fd,th=new fd,nh=new fd;class i1 extends hi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(pl.subVectors(i[0],i[1]).add(i[0]),c=pl);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(pl.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=pl),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),eh.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,_,g),th.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,_,g),nh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(eh.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),th.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),nh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(eh.calc(l),th.calc(l),nh.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function gp(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function s1(r,e){const t=1-r;return t*t*e}function r1(r,e){return 2*(1-r)*r*e}function a1(r,e){return r*r*e}function eo(r,e,t,n){return s1(r,e)+r1(r,t)+a1(r,n)}function o1(r,e){const t=1-r;return t*t*t*e}function l1(r,e){const t=1-r;return 3*t*t*r*e}function c1(r,e){return 3*(1-r)*r*r*e}function h1(r,e){return r*r*r*e}function to(r,e,t,n,i){return o1(r,e)+l1(r,t)+c1(r,n)+h1(r,i)}class Rg extends hi{constructor(e=new ie,t=new ie,n=new ie,i=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ie){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(to(e,i.x,s.x,a.x,o.x),to(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class u1 extends hi{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(to(e,i.x,s.x,a.x,o.x),to(e,i.y,s.y,a.y,o.y),to(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Cg extends hi{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class d1 extends hi{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pg extends hi{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(eo(e,i.x,s.x,a.x),eo(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pd extends hi{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(eo(e,i.x,s.x,a.x),eo(e,i.y,s.y,a.y),eo(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lg extends hi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(gp(o,l.x,c.x,h.x,u.x),gp(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ie().fromArray(i))}return this}}var _p=Object.freeze({__proto__:null,ArcCurve:n1,CatmullRomCurve3:i1,CubicBezierCurve:Rg,CubicBezierCurve3:u1,EllipseCurve:dd,LineCurve:Cg,LineCurve3:d1,QuadraticBezierCurve:Pg,QuadraticBezierCurve3:pd,SplineCurve:Lg});class f1 extends hi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _p[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new _p[i.type]().fromJSON(i))}return this}}class p1 extends f1{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Cg(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Pg(this.currentPoint.clone(),new ie(e,t),new ie(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new Rg(this.currentPoint.clone(),new ie(e,t),new ie(n,i),new ie(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Lg(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new dd(e,t,n,i,s,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class md extends wt{constructor(e=[new ie(0,-.5),new ie(.5,0),new ie(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=zt(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],h=1/t,u=new C,d=new ie,f=new C,p=new C,_=new C;let g=0,m=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let x=0;x<=t;x++){const y=n+x*h*i,v=Math.sin(y),E=Math.cos(y);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*v,u.y=e[b].y,u.z=e[b].x*E,a.push(u.x,u.y,u.z),d.x=x/t,d.y=b/(e.length-1),o.push(d.x,d.y);const T=l[3*b+0]*v,R=l[3*b+1],M=l[3*b+0]*E;c.push(T,R,M)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const v=y+x*e.length,E=v,b=v+e.length,T=v+e.length+1,R=v+1;s.push(E,b,R),s.push(T,R,b)}this.setIndex(s),this.setAttribute("position",new Qe(a,3)),this.setAttribute("uv",new Qe(o,2)),this.setAttribute("normal",new Qe(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new md(e.points,e.segments,e.phiStart,e.phiLength)}}class kr extends md{constructor(e=1,t=1,n=4,i=8){const s=new p1;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new kr(e.radius,e.length,e.capSegments,e.radialSegments)}}class _a extends wt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Qe(u,3)),this.setAttribute("normal",new Qe(d,3)),this.setAttribute("uv",new Qe(f,2));function x(){const v=new C,E=new C;let b=0;const T=(t-e)/n;for(let R=0;R<=s;R++){const M=[],S=R/s,L=S*(t-e)+e;for(let F=0;F<=i;F++){const I=F/i,D=I*l+o,z=Math.sin(D),N=Math.cos(D);E.x=L*z,E.y=-S*n+g,E.z=L*N,u.push(E.x,E.y,E.z),v.set(z,T,N).normalize(),d.push(v.x,v.y,v.z),f.push(I,1-S),M.push(p++)}_.push(M)}for(let R=0;R<i;R++)for(let M=0;M<s;M++){const S=_[M][R],L=_[M+1][R],F=_[M+1][R+1],I=_[M][R+1];(e>0||M!==0)&&(h.push(S,L,I),b+=3),(t>0||M!==s-1)&&(h.push(L,F,I),b+=3)}c.addGroup(m,b,0),m+=b}function y(v){const E=p,b=new ie,T=new C;let R=0;const M=v===!0?e:t,S=v===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,g*S,0),d.push(0,S,0),f.push(.5,.5),p++;const L=p;for(let F=0;F<=i;F++){const D=F/i*l+o,z=Math.cos(D),N=Math.sin(D);T.x=M*N,T.y=g*S,T.z=M*z,u.push(T.x,T.y,T.z),d.push(0,S,0),b.x=z*.5+.5,b.y=N*.5*S+.5,f.push(b.x,b.y),p++}for(let F=0;F<i;F++){const I=E+F,D=L+F;v===!0?h.push(D,D+1,I):h.push(D+1,D,I),R+=3}c.addGroup(m,R,v===!0?1:2),m+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _a(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zi extends _a{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new zi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gd extends wt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Qe(s,3)),this.setAttribute("normal",new Qe(s.slice(),3)),this.setAttribute("uv",new Qe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const y=new C,v=new C,E=new C;for(let b=0;b<t.length;b+=3)f(t[b+0],y),f(t[b+1],v),f(t[b+2],E),l(y,v,E,x)}function l(x,y,v,E){const b=E+1,T=[];for(let R=0;R<=b;R++){T[R]=[];const M=x.clone().lerp(v,R/b),S=y.clone().lerp(v,R/b),L=b-R;for(let F=0;F<=L;F++)F===0&&R===b?T[R][F]=M:T[R][F]=M.clone().lerp(S,F/L)}for(let R=0;R<b;R++)for(let M=0;M<2*(b-R)-1;M++){const S=Math.floor(M/2);M%2===0?(d(T[R][S+1]),d(T[R+1][S]),d(T[R][S])):(d(T[R][S+1]),d(T[R+1][S+1]),d(T[R+1][S]))}}function c(x){const y=new C;for(let v=0;v<s.length;v+=3)y.x=s[v+0],y.y=s[v+1],y.z=s[v+2],y.normalize().multiplyScalar(x),s[v+0]=y.x,s[v+1]=y.y,s[v+2]=y.z}function h(){const x=new C;for(let y=0;y<s.length;y+=3){x.x=s[y+0],x.y=s[y+1],x.z=s[y+2];const v=g(x)/2/Math.PI+.5,E=m(x)/Math.PI+.5;a.push(v,1-E)}p(),u()}function u(){for(let x=0;x<a.length;x+=6){const y=a[x+0],v=a[x+2],E=a[x+4],b=Math.max(y,v,E),T=Math.min(y,v,E);b>.9&&T<.1&&(y<.2&&(a[x+0]+=1),v<.2&&(a[x+2]+=1),E<.2&&(a[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,y){const v=x*3;y.x=e[v+0],y.y=e[v+1],y.z=e[v+2]}function p(){const x=new C,y=new C,v=new C,E=new C,b=new ie,T=new ie,R=new ie;for(let M=0,S=0;M<s.length;M+=9,S+=6){x.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),v.set(s[M+6],s[M+7],s[M+8]),b.set(a[S+0],a[S+1]),T.set(a[S+2],a[S+3]),R.set(a[S+4],a[S+5]),E.copy(x).add(y).add(v).divideScalar(3);const L=g(E);_(b,S+0,x,L),_(T,S+2,y,L),_(R,S+4,v,L)}}function _(x,y,v,E){E<0&&x.x===1&&(a[y]=x.x-1),v.x===0&&v.z===0&&(a[y]=E/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gd(e.vertices,e.indices,e.radius,e.details)}}const m1={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Ig(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,f;if(n&&(s=x1(r,e,s,t)),r.length>80*t){o=c=r[0],l=h=r[1];for(let p=t;p<i;p+=t)u=r[p],d=r[p+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return mo(s,a,t,o,l,f,0),a}};function Ig(r,e,t,n,i){let s,a;if(i===L1(r,e,t,n)>0)for(s=e;s<t;s+=n)a=vp(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=vp(s,r[s],r[s+1],a);return a&&fc(a,a.next)&&(_o(a),a=a.next),a}function er(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(fc(t,t.next)||At(t.prev,t,t.next)===0)){if(_o(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function mo(r,e,t,n,i,s,a){if(!r)return;!a&&s&&T1(r,n,i,s);let o=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?_1(r,n,i,s):g1(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),_o(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=v1(er(r),e,t),mo(r,e,t,n,i,s,2)):a===2&&y1(r,e,t,n,i,s):mo(er(r),e,t,n,i,s,1);break}}}function g1(r){const e=r.prev,t=r,n=r.next;if(At(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<s?i<a?i:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,d=i>s?i>a?i:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&zr(i,o,s,l,a,c,p.x,p.y)&&At(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function _1(r,e,t,n){const i=r.prev,s=r,a=r.next;if(At(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,_=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,m=xu(f,p,e,t,n),x=xu(_,g,e,t,n);let y=r.prevZ,v=r.nextZ;for(;y&&y.z>=m&&v&&v.z<=x;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&zr(o,h,l,u,c,d,y.x,y.y)&&At(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=f&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==a&&zr(o,h,l,u,c,d,v.x,v.y)&&At(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&zr(o,h,l,u,c,d,y.x,y.y)&&At(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=x;){if(v.x>=f&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==a&&zr(o,h,l,u,c,d,v.x,v.y)&&At(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function v1(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!fc(i,s)&&Dg(i,n,n.next,s)&&go(i,s)&&go(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),_o(n),_o(n.next),n=r=s),n=n.next}while(n!==r);return er(n)}function y1(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&R1(a,o)){let l=Fg(a,o);a=er(a,a.next),l=er(l,l.next),mo(a,e,t,n,i,s,0),mo(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function x1(r,e,t,n){const i=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=Ig(r,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(A1(c));for(i.sort(M1),s=0;s<i.length;s++)t=S1(i[s],t);return t}function M1(r,e){return r.x-e.x}function S1(r,e){const t=b1(r,e);if(!t)return e;const n=Fg(t,r);return er(n,n.next),er(t,t.next)}function b1(r,e){let t=e,n=-1/0,i;const s=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&zr(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),go(t,r)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&w1(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function w1(r,e){return At(r.prev,r,e.prev)<0&&At(e.next,r,r.next)<0}function T1(r,e,t,n){let i=r;do i.z===0&&(i.z=xu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,E1(i)}function E1(r){let e,t,n,i,s,a,o,l,c=1;do{for(t=r,r=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(a>1);return r}function xu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function A1(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function zr(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function R1(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!C1(r,e)&&(go(r,e)&&go(e,r)&&P1(r,e)&&(At(r.prev,r,e.prev)||At(r,e.prev,e))||fc(r,e)&&At(r.prev,r,r.next)>0&&At(e.prev,e,e.next)>0)}function At(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function fc(r,e){return r.x===e.x&&r.y===e.y}function Dg(r,e,t,n){const i=gl(At(r,e,t)),s=gl(At(r,e,n)),a=gl(At(t,n,r)),o=gl(At(t,n,e));return!!(i!==s&&a!==o||i===0&&ml(r,t,e)||s===0&&ml(r,n,e)||a===0&&ml(t,r,n)||o===0&&ml(t,e,n))}function ml(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function gl(r){return r>0?1:r<0?-1:0}function C1(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Dg(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function go(r,e){return At(r.prev,r,r.next)<0?At(r,e,r.next)>=0&&At(r,r.prev,e)>=0:At(r,e,r.prev)<0||At(r,r.next,e)<0}function P1(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Fg(r,e){const t=new Mu(r.i,r.x,r.y),n=new Mu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function vp(r,e,t,n){const i=new Mu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function _o(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Mu(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function L1(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class _d{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return _d.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];yp(e),xp(n,e);let a=e.length;t.forEach(yp);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,xp(n,t[l]);const o=m1.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function yp(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function xp(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Vi extends gd{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vi(e.radius,e.detail)}}class vd extends wt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new C,p=new ie;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const x=m+g,y=x,v=x+n+1,E=x+n+2,b=x+1;o.push(y,v,b),o.push(v,E,b)}}this.setIndex(o),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vd(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ot extends wt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const x=[],y=m/n;let v=0;m===0&&a===0?v=.5/t:m===n&&l===Math.PI&&(v=-.5/t);for(let E=0;E<=t;E++){const b=E/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(b+v,1-y),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const y=h[m][x+1],v=h[m][x],E=h[m+1][x],b=h[m+1][x+1];(m!==0||a>0)&&f.push(y,v,b),(m!==n-1||l<Math.PI)&&f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new Qe(p,3)),this.setAttribute("normal",new Qe(_,3)),this.setAttribute("uv",new Qe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class yd extends wt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const _=p/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const _=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,x=(i+1)*f+p;a.push(_,g,x),a.push(g,m,x)}this.setIndex(a),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yd(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ct extends Dn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cc,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mi extends Ct{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ih extends Dn{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new oe(16777215),this.specular=new oe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cc,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class I1 extends Dn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cc,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function _l(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function D1(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function F1(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Mp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Ug(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class Do{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class U1 extends Do{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nr,endingEnd:Nr}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Or:s=e,o=2*t-n;break;case Xl:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Or:a=e,l=2*n-t;break;case Xl:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,x=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,y=(-1-f)*g+(1.5+f)*_+.5*p,v=f*g-f*_;for(let E=0;E!==o;++E)s[E]=m*a[h+E]+x*a[c+E]+y*a[l+E]+v*a[u+E];return s}}class Ng extends Do{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class N1 extends Do{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Si{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_l(t,this.TimeBufferType),this.values=_l(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_l(e.times,Array),values:_l(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new N1(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ng(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new U1(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ho:t=this.InterpolantFactoryMethodDiscrete;break;case uo:t=this.InterpolantFactoryMethodLinear;break;case Sc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ho;case this.InterpolantFactoryMethodLinear:return uo;case this.InterpolantFactoryMethodSmooth:return Sc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&D1(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Sc,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Si.prototype.TimeBufferType=Float32Array;Si.prototype.ValueBufferType=Float32Array;Si.prototype.DefaultInterpolation=uo;class va extends Si{constructor(e,t,n){super(e,t,n)}}va.prototype.ValueTypeName="bool";va.prototype.ValueBufferType=Array;va.prototype.DefaultInterpolation=ho;va.prototype.InterpolantFactoryMethodLinear=void 0;va.prototype.InterpolantFactoryMethodSmooth=void 0;class Og extends Si{}Og.prototype.ValueTypeName="color";class tr extends Si{}tr.prototype.ValueTypeName="number";class O1 extends Do{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)St.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Gi extends Si{InterpolantFactoryMethodLinear(e){return new O1(this.times,this.values,this.getValueSize(),e)}}Gi.prototype.ValueTypeName="quaternion";Gi.prototype.InterpolantFactoryMethodSmooth=void 0;class ya extends Si{constructor(e,t,n){super(e,t,n)}}ya.prototype.ValueTypeName="string";ya.prototype.ValueBufferType=Array;ya.prototype.DefaultInterpolation=ho;ya.prototype.InterpolantFactoryMethodLinear=void 0;ya.prototype.InterpolantFactoryMethodSmooth=void 0;class vs extends Si{}vs.prototype.ValueTypeName="vector";class vo{constructor(e="",t=-1,n=[],i=id){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ri(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(k1(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(Si.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=F1(l);l=Mp(l,1,h),c=Mp(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new tr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,_){if(f.length!==0){const g=[],m=[];Ug(f,g,m,p),g.length!==0&&_.push(new u(d,g,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let x=0;x!==d[p].morphTargets.length;++x){const y=d[p];g.push(y.time),m.push(y.morphTarget===_?1:0)}i.push(new tr(".morphTargetInfluence["+_+"]",g,m))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(vs,f+".position",d,"pos",i),n(Gi,f+".quaternion",d,"rot",i),n(vs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function B1(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return tr;case"vector":case"vector2":case"vector3":case"vector4":return vs;case"color":return Og;case"quaternion":return Gi;case"bool":case"boolean":return va;case"string":return ya}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function k1(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=B1(r.type);if(r.times===void 0){const t=[],n=[];Ug(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const cs={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class z1{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const V1=new z1;class Wi{constructor(e){this.manager=e!==void 0?e:V1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Wi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pi={};class H1 extends Error{constructor(e,t){super(e),this.response=t}}class xd extends Wi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=cs.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Pi[e]!==void 0){Pi[e].push({onLoad:t,onProgress:n,onError:i});return}Pi[e]=[],Pi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Pi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){x();function x(){u.read().then(({done:y,value:v})=>{if(y)m.close();else{_+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let b=0,T=h.length;b<T;b++){const R=h[b];R.onProgress&&R.onProgress(E)}m.enqueue(v),x()}},y=>{m.error(y)})}}});return new Response(g)}else throw new H1(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{cs.add(e,c);const h=Pi[e];delete Pi[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Pi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Pi[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class G1 extends Wi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=cs.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=fo("img");function l(){h(),cs.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Bg extends Wi{constructor(e){super(e)}load(e,t,n,i){const s=new kt,a=new G1(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class pc extends ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const sh=new fe,Sp=new C,bp=new C;class Md{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new od,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new We(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Sp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sp),bp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bp),t.updateMatrixWorld(),sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class W1 extends Md{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=aa*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Sd extends pc{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new W1}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const wp=new fe,Da=new C,rh=new C;class X1 extends Md{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ie(4,2),this._viewportCount=6,this._viewports=[new We(2,1,1,1),new We(0,1,1,1),new We(3,1,1,1),new We(1,1,1,1),new We(3,0,1,1),new We(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Da.setFromMatrixPosition(e.matrixWorld),n.position.copy(Da),rh.copy(n.position),rh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(rh),n.updateMatrixWorld(),i.makeTranslation(-Da.x,-Da.y,-Da.z),wp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wp)}}class Su extends pc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new X1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class q1 extends Md{constructor(){super(new ld(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class no extends pc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new q1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class kg extends pc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Yr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class j1 extends Wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=cs.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return cs.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),cs.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});cs.add(e,l),s.manager.itemStart(e)}}class Y1{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Tp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Tp();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Tp(){return performance.now()}class $1{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){St.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;St.multiplyQuaternionsFlat(e,a,e,t,e,n),St.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const bd="\\[\\]\\.:\\/",K1=new RegExp("["+bd+"]","g"),wd="[^"+bd+"]",J1="[^"+bd.replace("\\.","")+"]",Z1=/((?:WC+[\/:])*)/.source.replace("WC",wd),Q1=/(WCOD+)?/.source.replace("WCOD",J1),ew=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wd),tw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wd),nw=new RegExp("^"+Z1+Q1+ew+tw+"$"),iw=["material","materials","bones","map"];class sw{constructor(e,t,n){const i=n||Ke.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ke{constructor(e,t,n){this.path=t,this.parsedPath=n||Ke.parseTrackName(t),this.node=Ke.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ke.Composite(e,t,n):new Ke(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(K1,"")}static parseTrackName(e){const t=nw.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);iw.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Ke.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ke.Composite=sw;Ke.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ke.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ke.prototype.GetterByBindingType=[Ke.prototype._getValue_direct,Ke.prototype._getValue_array,Ke.prototype._getValue_arrayElement,Ke.prototype._getValue_toArray];Ke.prototype.SetterByBindingTypeAndVersioning=[[Ke.prototype._setValue_direct,Ke.prototype._setValue_direct_setNeedsUpdate,Ke.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_array,Ke.prototype._setValue_array_setNeedsUpdate,Ke.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_arrayElement,Ke.prototype._setValue_arrayElement_setNeedsUpdate,Ke.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_fromArray,Ke.prototype._setValue_fromArray_setNeedsUpdate,Ke.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class rw{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Nr,endingEnd:Nr};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ul,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case ov:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case id:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===av;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===ag){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Or,i.endingEnd=Or):(e?i.endingStart=this.zeroSlopeAtStart?Or:Nr:i.endingStart=Xl,t?i.endingEnd=this.zeroSlopeAtEnd?Or:Nr:i.endingEnd=Xl)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const aw=new Float32Array(1);class Ep extends sr{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,a[u]=p;else{if(p=a[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;p=new $1(Ke.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ng(new Float32Array(2),new Float32Array(2),1,aw),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?vo.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=id),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new rw(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?vo.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Ap=new fe;class Td{constructor(e,t,n=0,i=1/0){this.ray=new Lo(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new rd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ap.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ap),this}intersectObject(e,t=!0,n=[]){return bu(e,this,n,t),n.sort(Rp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)bu(e[i],this,n,t);return n.sort(Rp),n}}function Rp(r,e){return r.distance-e.distance}function bu(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)bu(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$u}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$u);/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var Gn=Uint8Array,Vr=Uint16Array,ow=Int32Array,zg=new Gn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Vg=new Gn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),lw=new Gn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Hg=function(r,e){for(var t=new Vr(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var i=new ow(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return{b:t,r:i}},Gg=Hg(zg,2),Wg=Gg.b,cw=Gg.r;Wg[28]=258,cw[258]=28;var hw=Hg(Vg,0),uw=hw.b,wu=new Vr(32768);for(var xt=0;xt<32768;++xt){var is=(xt&43690)>>1|(xt&21845)<<1;is=(is&52428)>>2|(is&13107)<<2,is=(is&61680)>>4|(is&3855)<<4,wu[xt]=((is&65280)>>8|(is&255)<<8)>>1}var io=function(r,e,t){for(var n=r.length,i=0,s=new Vr(e);i<n;++i)r[i]&&++s[r[i]-1];var a=new Vr(e);for(i=1;i<e;++i)a[i]=a[i-1]+s[i-1]<<1;var o;if(t){o=new Vr(1<<e);var l=15-e;for(i=0;i<n;++i)if(r[i])for(var c=i<<4|r[i],h=e-r[i],u=a[r[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)o[wu[u]>>l]=c}else for(o=new Vr(n),i=0;i<n;++i)r[i]&&(o[i]=wu[a[r[i]-1]++]>>15-r[i]);return o},Fo=new Gn(288);for(var xt=0;xt<144;++xt)Fo[xt]=8;for(var xt=144;xt<256;++xt)Fo[xt]=9;for(var xt=256;xt<280;++xt)Fo[xt]=7;for(var xt=280;xt<288;++xt)Fo[xt]=8;var Xg=new Gn(32);for(var xt=0;xt<32;++xt)Xg[xt]=5;var dw=io(Fo,9,1),fw=io(Xg,5,1),ah=function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},Zn=function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},oh=function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},pw=function(r){return(r+7)/8|0},mw=function(r,e,t){return(t==null||t>r.length)&&(t=r.length),new Gn(r.subarray(e,t))},gw=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ti=function(r,e,t){var n=new Error(e||gw[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,ti),!t)throw n;return n},_w=function(r,e,t,n){var i=r.length,s=0;if(!i||e.f&&!e.l)return t||new Gn(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new Gn(i*3));var c=function(pt){var Ge=t.length;if(pt>Ge){var Mt=new Gn(Math.max(Ge*2,pt));Mt.set(t),t=Mt}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,p=e.d,_=e.m,g=e.n,m=i*8;do{if(!f){h=Zn(r,u,1);var x=Zn(r,u+1,3);if(u+=3,x)if(x==1)f=dw,p=fw,_=9,g=5;else if(x==2){var b=Zn(r,u,31)+257,T=Zn(r,u+10,15)+4,R=b+Zn(r,u+5,31)+1;u+=14;for(var M=new Gn(R),S=new Gn(19),L=0;L<T;++L)S[lw[L]]=Zn(r,u+L*3,7);u+=T*3;for(var F=ah(S),I=(1<<F)-1,D=io(S,F,1),L=0;L<R;){var z=D[Zn(r,u,I)];u+=z&15;var y=z>>4;if(y<16)M[L++]=y;else{var N=0,G=0;for(y==16?(G=3+Zn(r,u,3),u+=2,N=M[L-1]):y==17?(G=3+Zn(r,u,7),u+=3):y==18&&(G=11+Zn(r,u,127),u+=7);G--;)M[L++]=N}}var V=M.subarray(0,b),$=M.subarray(b);_=ah(V),g=ah($),f=io(V,_,1),p=io($,g,1)}else ti(1);else{var y=pw(u)+4,v=r[y-4]|r[y-3]<<8,E=y+v;if(E>i){l&&ti(0);break}o&&c(d+v),t.set(r.subarray(y,E),d),e.b=d+=v,e.p=u=E*8,e.f=h;continue}if(u>m){l&&ti(0);break}}o&&c(d+131072);for(var ne=(1<<_)-1,de=(1<<g)-1,we=u;;we=u){var N=f[oh(r,u)&ne],Ce=N>>4;if(u+=N&15,u>m){l&&ti(0);break}if(N||ti(2),Ce<256)t[d++]=Ce;else if(Ce==256){we=u,f=null;break}else{var q=Ce-254;if(Ce>264){var L=Ce-257,Z=zg[L];q=Zn(r,u,(1<<Z)-1)+Wg[L],u+=Z}var _e=p[oh(r,u)&de],se=_e>>4;_e||ti(3),u+=_e&15;var $=uw[se];if(se>3){var Z=Vg[se];$+=oh(r,u)&(1<<Z)-1,u+=Z}if(u>m){l&&ti(0);break}o&&c(d+131072);var Te=d+q;if(d<$){var Pe=s-$,ze=Math.min($,Te);for(Pe+d<0&&ti(3);d<ze;++d)t[d]=n[Pe+d]}for(;d<Te;++d)t[d]=t[d-$]}}e.l=f,e.p=we,e.b=d,e.f=h,f&&(h=1,e.m=_,e.d=p,e.n=g)}while(!h);return d!=t.length&&a?mw(t,0,d):t.subarray(0,d)},vw=new Gn(0),yw=function(r,e){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&ti(6,"invalid zlib data"),(r[1]>>5&1)==1&&ti(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function xw(r,e){return _w(r.subarray(yw(r),-4),{i:2},e,e)}var Mw=typeof TextDecoder<"u"&&new TextDecoder,Sw=0;try{Mw.decode(vw,{stream:!0}),Sw=1}catch{}function qg(r,e,t){const n=t.length-r-1;if(e>=t[n])return n-1;if(e<=t[r])return r;let i=r,s=n,a=Math.floor((i+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:i=a,a=Math.floor((i+s)/2);return a}function bw(r,e,t,n){const i=[],s=[],a=[];i[0]=1;for(let o=1;o<=t;++o){s[o]=e-n[r+1-o],a[o]=n[r+o]-e;let l=0;for(let c=0;c<o;++c){const h=a[c+1],u=s[o-c],d=i[c]/(h+u);i[c]=l+h*d,l=u*d}i[o]=l}return i}function ww(r,e,t,n){const i=qg(r,n,e),s=bw(i,n,r,e),a=new We(0,0,0,0);for(let o=0;o<=r;++o){const l=t[i-r+o],c=s[o],h=l.w*c;a.x+=l.x*h,a.y+=l.y*h,a.z+=l.z*h,a.w+=l.w*c}return a}function Tw(r,e,t,n,i){const s=[];for(let u=0;u<=t;++u)s[u]=0;const a=[];for(let u=0;u<=n;++u)a[u]=s.slice(0);const o=[];for(let u=0;u<=t;++u)o[u]=s.slice(0);o[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let u=1;u<=t;++u){l[u]=e-i[r+1-u],c[u]=i[r+u]-e;let d=0;for(let f=0;f<u;++f){const p=c[f+1],_=l[u-f];o[u][f]=p+_;const g=o[f][u-1]/o[u][f];o[f][u]=d+p*g,d=_*g}o[u][u]=d}for(let u=0;u<=t;++u)a[0][u]=o[u][t];for(let u=0;u<=t;++u){let d=0,f=1;const p=[];for(let _=0;_<=t;++_)p[_]=s.slice(0);p[0][0]=1;for(let _=1;_<=n;++_){let g=0;const m=u-_,x=t-_;u>=_&&(p[f][0]=p[d][0]/o[x+1][m],g=p[f][0]*o[m][x]);const y=m>=-1?1:-m,v=u-1<=x?_-1:t-u;for(let b=y;b<=v;++b)p[f][b]=(p[d][b]-p[d][b-1])/o[x+1][m+b],g+=p[f][b]*o[m+b][x];u<=x&&(p[f][_]=-p[d][_-1]/o[x+1][u],g+=p[f][_]*o[u][x]),a[_][u]=g;const E=d;d=f,f=E}}let h=t;for(let u=1;u<=n;++u){for(let d=0;d<=t;++d)a[u][d]*=h;h*=t-u}return a}function Ew(r,e,t,n,i){const s=i<r?i:r,a=[],o=qg(r,n,e),l=Tw(o,n,r,s,e),c=[];for(let h=0;h<t.length;++h){const u=t[h].clone(),d=u.w;u.x*=d,u.y*=d,u.z*=d,c[h]=u}for(let h=0;h<=s;++h){const u=c[o-r].clone().multiplyScalar(l[h][0]);for(let d=1;d<=r;++d)u.add(c[o-r+d].clone().multiplyScalar(l[h][d]));a[h]=u}for(let h=s+1;h<=i+1;++h)a[h]=new We(0,0,0);return a}function Aw(r,e){let t=1;for(let i=2;i<=r;++i)t*=i;let n=1;for(let i=2;i<=e;++i)n*=i;for(let i=2;i<=r-e;++i)n*=i;return t/n}function Rw(r){const e=r.length,t=[],n=[];for(let s=0;s<e;++s){const a=r[s];t[s]=new C(a.x,a.y,a.z),n[s]=a.w}const i=[];for(let s=0;s<e;++s){const a=t[s].clone();for(let o=1;o<=s;++o)a.sub(i[s-o].clone().multiplyScalar(Aw(s,o)*n[o]));i[s]=a.divideScalar(n[0])}return i}function Cw(r,e,t,n,i){const s=Ew(r,e,t,n,i);return Rw(s)}class Pw extends hi{constructor(e,t,n,i,s){super();const a=t?t.length-1:0,o=n?n.length:0;this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=i||0,this.endKnot=s||a;for(let l=0;l<o;++l){const c=n[l];this.controlPoints[l]=new We(c.x,c.y,c.z,c.w)}}getPoint(e,t=new C){const n=t,i=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=ww(this.degree,this.knots,this.controlPoints,i);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new C){const n=t,i=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=Cw(this.degree,this.knots,this.controlPoints,i,1);return n.copy(s[1]).normalize(),n}toJSON(){const e=super.toJSON();return e.degree=this.degree,e.knots=[...this.knots],e.controlPoints=this.controlPoints.map(t=>t.toArray()),e.startKnot=this.startKnot,e.endKnot=this.endKnot,e}fromJSON(e){return super.fromJSON(e),this.degree=e.degree,this.knots=[...e.knots],this.controlPoints=e.controlPoints.map(t=>new We(t[0],t[1],t[2],t[3])),this.startKnot=e.startKnot,this.endKnot=e.endKnot,this}}let Ve,It,dn;class Lw extends Wi{constructor(e){super(e)}load(e,t,n,i){const s=this,a=s.path===""?Yr.extractUrlBase(e):s.path,o=new xd(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){i?i(c):console.error(c),s.manager.itemError(e)}},n,i)}parse(e,t){if(Ow(e))Ve=new Nw().parse(e);else{const i=$g(e);if(!Bw(i))throw new Error("THREE.FBXLoader: Unknown format.");if(Pp(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Pp(i));Ve=new Uw().parse(i)}const n=new Bg(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new Iw(n,this.manager).parse(Ve)}}class Iw{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){It=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),i=this.parseDeformers(),s=new Dw().parse(i);return this.parseScene(i,s,n),dn}parseConnections(){const e=new Map;return"Connections"in Ve&&Ve.Connections.connections.forEach(function(n){const i=n[0],s=n[1],a=n[2];e.has(i)||e.set(i,{parents:[],children:[]});const o={ID:s,relationship:a};e.get(i).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:i,relationship:a};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in Ve.Objects){const n=Ve.Objects.Video;for(const i in n){const s=n[i],a=parseInt(i);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){const o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(o||l){const c=this.parseImage(n[i]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const i=e[n];t[i]!==void 0?e[n]=t[i]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(i){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in Ve.Objects){const n=Ve.Objects.Texture;for(const i in n){const s=this.parseTexture(n[i],e);t.set(parseInt(i),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const i=e.WrapModeU,s=e.WrapModeV,a=i!==void 0?i.value:0,o=s!==void 0?s.value:0;if(n.wrapS=a===0?_s:gi,n.wrapT=o===0?_s:gi,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){const n=new Set(["tga","tif","tiff","exr","dds","hdr","ktx2"]),i=e.FileName.split(".").pop().toLowerCase(),s=n.has(i)?this.manager.getHandler(`.${i}`):this.textureLoader;if(!s)return console.warn(`FBXLoader: ${i.toUpperCase()} loader not found, creating placeholder texture for`,e.RelativeFilename),new kt;const a=s.path;a||s.setPath(this.textureLoader.path);const o=It.get(e.id).children;let l;o!==void 0&&o.length>0&&t[o[0].ID]!==void 0&&(l=t[o[0].ID],(l.indexOf("blob:")===0||l.indexOf("data:")===0)&&s.setPath(void 0));const c=s.load(l);return s.setPath(a),c}parseMaterials(e){const t=new Map;if("Material"in Ve.Objects){const n=Ve.Objects.Material;for(const i in n){const s=this.parseMaterial(n[i],e);s!==null&&t.set(parseInt(i),s)}}return t}parseMaterial(e,t){const n=e.id,i=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!It.has(n))return null;const a=this.parseParameters(e,t,n);let o;switch(s.toLowerCase()){case"phong":o=new ih;break;case"lambert":o=new I1;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new ih;break}return o.setValues(a),o.name=i,o}parseParameters(e,t,n){const i={};e.BumpFactor&&(i.bumpScale=e.BumpFactor.value),e.Diffuse?i.color=De.toWorkingColorSpace(new oe().fromArray(e.Diffuse.value),nt):e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(i.color=De.toWorkingColorSpace(new oe().fromArray(e.DiffuseColor.value),nt)),e.DisplacementFactor&&(i.displacementScale=e.DisplacementFactor.value),e.Emissive?i.emissive=De.toWorkingColorSpace(new oe().fromArray(e.Emissive.value),nt):e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(i.emissive=De.toWorkingColorSpace(new oe().fromArray(e.EmissiveColor.value),nt)),e.EmissiveFactor&&(i.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),i.opacity=1-(e.TransparencyFactor?parseFloat(e.TransparencyFactor.value):0),(i.opacity===1||i.opacity===0)&&(i.opacity=e.Opacity?parseFloat(e.Opacity.value):null,i.opacity===null&&(i.opacity=1-(e.TransparentColor?parseFloat(e.TransparentColor.value[0]):0))),i.opacity<1&&(i.transparent=!0),e.ReflectionFactor&&(i.reflectivity=e.ReflectionFactor.value),e.Shininess&&(i.shininess=e.Shininess.value),e.Specular?i.specular=De.toWorkingColorSpace(new oe().fromArray(e.Specular.value),nt):e.SpecularColor&&e.SpecularColor.type==="Color"&&(i.specular=De.toWorkingColorSpace(new oe().fromArray(e.SpecularColor.value),nt));const s=this;return It.get(n).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":i.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":i.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=s.getTexture(t,a.ID),i.map!==void 0&&(i.map.colorSpace=nt);break;case"DisplacementColor":i.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":i.emissiveMap=s.getTexture(t,a.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=nt);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":i.envMap=s.getTexture(t,a.ID),i.envMap!==void 0&&(i.envMap.mapping=Gl,i.envMap.colorSpace=nt);break;case"SpecularColor":i.specularMap=s.getTexture(t,a.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=nt);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=s.getTexture(t,a.ID),i.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),i}getTexture(e,t){return"LayeredTexture"in Ve.Objects&&t in Ve.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=It.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in Ve.Objects){const n=Ve.Objects.Deformer;for(const i in n){const s=n[i],a=It.get(parseInt(i));if(s.attrType==="Skin"){const o=this.parseSkeleton(a,n);o.ID=i,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[i]=o}else if(s.attrType==="BlendShape"){const o={id:i};o.rawTargets=this.parseMorphTargets(a,n),o.id=i,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[i]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(i){const s=t[i.ID];if(s.attrType!=="Cluster")return;const a={ID:i.ID,indices:[],weights:[],transformLink:new fe().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),n.push(a)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let i=0;i<e.children.length;i++){const s=e.children[i],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=It.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(o)}return n}parseScene(e,t,n){dn=new Ue;const i=this.parseModels(e.skeletons,t,n),s=Ve.Objects.Model,a=this;i.forEach(function(l){const c=s[l.ID];a.setLookAtProperties(l,c),It.get(l.ID).parents.forEach(function(u){const d=i.get(u.ID);d!==void 0&&d.add(l)}),l.parent===null&&dn.add(l)}),this.bindSkeleton(e.skeletons,t,i),this.addGlobalSceneSettings(),dn.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);const c=Yg(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});const o=new Fw().parse();dn.children.length===1&&dn.children[0].isGroup&&(dn.children[0].animations=o,dn=dn.children[0]),dn.animations=o}parseModels(e,t,n){const i=new Map,s=Ve.Objects.Model;for(const a in s){const o=parseInt(a),l=s[a],c=It.get(o);let h=this.buildSkeleton(c,e,o,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,t,n);break;case"NurbsCurve":h=this.createCurve(c,t);break;case"LimbNode":case"Root":h=new jl;break;case"Null":default:h=new Ue;break}h.name=l.attrName?Ke.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=o}this.getTransformData(h,l),i.set(o,h)}return i}buildSkeleton(e,t,n,i){let s=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(c,h){if(c.ID===a.ID){const u=s;s=new jl,s.matrixWorld.copy(c.transformLink),s.name=i?Ke.sanitizeNodeName(i):"",s.userData.originalName=i,s.ID=n,l.bones[h]=s,u!==null&&s.add(u)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(i){const s=Ve.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new ct;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let a=1e3;n.FarPlane!==void 0&&(a=n.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(o=n.AspectWidth.value,l=n.AspectHeight.value);const c=o/l;let h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);const u=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:t=new sn(h,c,s,a),u!==null&&t.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),t=new ct;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),t=new ct;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(i){const s=Ve.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new ct;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=De.toWorkingColorSpace(new oe().fromArray(n.Color.value),nt));let a=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(a=0);let o=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?o=0:o=n.FarAttenuationEnd.value);const l=1;switch(i){case 0:t=new Su(s,a,o,l);break;case 1:t=new no(s,a);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=Dt.degToRad(n.InnerAngle.value));let h=0;n.OuterAngle!==void 0&&(h=Dt.degToRad(n.OuterAngle.value),h=Math.max(h,1)),t=new Sd(s,a,o,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new Su(s,a);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let i,s=null,a=null;const o=[];return e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&o.push(n.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new ih({name:Wi.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(l){l.vertexColors=!0}),s.FBX_Deformer?(i=new Tg(s,a),i.normalizeSkinWeights()):i=new ve(s,a),i}createCurve(e,t){const n=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),i=new hd({name:Wi.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new ga(n,i)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=yo(t.RotationOrder.value):n.eulerOrder=yo(0),"Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&It.get(e.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){const s=Ve.Objects.Model[i.ID];if("Lcl_Translation"in s){const a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),dn.add(e.target)):e.lookAt(new C().fromArray(a))}}})}bindSkeleton(e,t,n){const i=this.parsePoseNodes();for(const s in e){const a=e[s];It.get(parseInt(a.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;It.get(c).parents.forEach(function(u){n.has(u.ID)&&n.get(u.ID).bind(new dc(a.bones),i[u.ID])})}})}}parsePoseNodes(){const e={};if("Pose"in Ve.Objects){const t=Ve.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const i=t[n].PoseNode;Array.isArray(i)?i.forEach(function(s){e[s.Node]=new fe().fromArray(s.Matrix.a)}):e[i.Node]=new fe().fromArray(i.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in Ve){if("AmbientColor"in Ve.GlobalSettings){const e=Ve.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],i=e[2];if(t!==0||n!==0||i!==0){const s=new oe().setRGB(t,n,i,nt);dn.add(new kg(s,1))}}"UnitScaleFactor"in Ve.GlobalSettings&&(dn.userData.unitScaleFactor=Ve.GlobalSettings.UnitScaleFactor.value)}}}class Dw{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in Ve.Objects){const n=Ve.Objects.Geometry;for(const i in n){const s=It.get(parseInt(i)),a=this.parseGeometry(s,n[i],e);t.set(parseInt(i),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const i=n.skeletons,s=[],a=e.parents.map(function(u){return Ve.Objects.Model[u.ID]});if(a.length===0)return;const o=e.children.reduce(function(u,d){return i[d.ID]!==void 0&&(u=i[d.ID]),u},null);e.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&s.push(n.morphTargets[u.ID])});const l=a[0],c={};"RotationOrder"in l&&(c.eulerOrder=yo(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const h=Yg(c);return this.genGeometry(t,o,s,h)}genGeometry(e,t,n,i){const s=new wt;e.attrName&&(s.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new Qe(o.vertex,3);if(l.applyMatrix4(i),s.setAttribute("position",l),o.colors.length>0&&s.setAttribute("color",new Qe(o.colors,3)),t&&(s.setAttribute("skinIndex",new ad(o.weightsIndices,4)),s.setAttribute("skinWeight",new Qe(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){const c=new Fe().getNormalMatrix(i),h=new Qe(o.normal,3);h.applyNormalMatrix(c),s.setAttribute("normal",h)}if(o.uvs.forEach(function(c,h){const u=h===0?"uv":`uv${h}`;s.setAttribute(u,new Qe(o.uvs[h],2))}),a.material&&a.material.mappingType!=="AllSame"){let c=o.materialIndex[0],h=0;if(o.materialIndex.forEach(function(u,d){u!==c&&(s.addGroup(h,d-h,c),c=u,h=d)}),s.groups.length>0){const u=s.groups[s.groups.length-1],d=u.start+u.count;d!==o.materialIndex.length&&s.addGroup(d,o.materialIndex.length-d,c)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,n,i),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let i=0;for(;e.LayerElementUV[i];)e.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[i])),i++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(i,s){i.indices.forEach(function(a,o){n.weightTable[a]===void 0&&(n.weightTable[a]=[]),n.weightTable[a].push({id:s,weight:i.weights[o]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,i=0,s=!1,a=[],o=[],l=[],c=[],h=[],u=[];const d=this;return e.vertexIndices.forEach(function(f,p){let _,g=!1;f<0&&(f=f^-1,g=!0);let m=[],x=[];if(a.push(f*3,f*3+1,f*3+2),e.color){const y=vl(p,n,f,e.color);l.push(y[0],y[1],y[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(y){x.push(y.weight),m.push(y.id)}),x.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const y=[0,0,0,0],v=[0,0,0,0];x.forEach(function(E,b){let T=E,R=m[b];v.forEach(function(M,S,L){if(T>M){L[S]=T,T=M;const F=y[S];y[S]=R,R=F}})}),m=y,x=v}for(;x.length<4;)x.push(0),m.push(0);for(let y=0;y<4;++y)h.push(x[y]),u.push(m[y])}if(e.normal){const y=vl(p,n,f,e.normal);o.push(y[0],y[1],y[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=vl(p,n,f,e.material)[0],_<0&&(d.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(y,v){const E=vl(p,n,f,y);c[v]===void 0&&(c[v]=[]),c[v].push(E[0]),c[v].push(E[1])}),i++,g&&(d.genFace(t,e,a,_,o,l,c,h,u,i),n++,i=0,a=[],o=[],l=[],c=[],h=[],u=[])}),t}getNormalNewell(e){const t=new C(0,0,0);for(let n=0;n<e.length;n++){const i=e[n],s=e[(n+1)%e.length];t.x+=(i.y-s.y)*(i.z+s.z),t.y+=(i.z-s.z)*(i.x+s.x),t.z+=(i.x-s.x)*(i.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),i=(Math.abs(t.z)>.5?new C(0,1,0):new C(0,0,1)).cross(t).normalize(),s=t.clone().cross(i).normalize();return{normal:t,tangent:i,bitangent:s}}flattenVertex(e,t,n){return new ie(e.dot(t),e.dot(n))}genFace(e,t,n,i,s,a,o,l,c,h){let u;if(h>3){const d=[],f=t.baseVertexPositions||t.vertexPositions;for(let m=0;m<n.length;m+=3)d.push(new C(f[n[m]],f[n[m+1]],f[n[m+2]]));const{tangent:p,bitangent:_}=this.getNormalTangentAndBitangent(d),g=[];for(const m of d)g.push(this.flattenVertex(m,p,_));u=_d.triangulateShape(g,[])}else u=[[0,1,2]];for(const[d,f,p]of u)e.vertex.push(t.vertexPositions[n[d*3]]),e.vertex.push(t.vertexPositions[n[d*3+1]]),e.vertex.push(t.vertexPositions[n[d*3+2]]),e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[p*3]]),e.vertex.push(t.vertexPositions[n[p*3+1]]),e.vertex.push(t.vertexPositions[n[p*3+2]]),t.skeleton&&(e.vertexWeights.push(l[d*4]),e.vertexWeights.push(l[d*4+1]),e.vertexWeights.push(l[d*4+2]),e.vertexWeights.push(l[d*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[p*4]),e.vertexWeights.push(l[p*4+1]),e.vertexWeights.push(l[p*4+2]),e.vertexWeights.push(l[p*4+3]),e.weightsIndices.push(c[d*4]),e.weightsIndices.push(c[d*4+1]),e.weightsIndices.push(c[d*4+2]),e.weightsIndices.push(c[d*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[p*4]),e.weightsIndices.push(c[p*4+1]),e.weightsIndices.push(c[p*4+2]),e.weightsIndices.push(c[p*4+3])),t.color&&(e.colors.push(a[d*3]),e.colors.push(a[d*3+1]),e.colors.push(a[d*3+2]),e.colors.push(a[f*3]),e.colors.push(a[f*3+1]),e.colors.push(a[f*3+2]),e.colors.push(a[p*3]),e.colors.push(a[p*3+1]),e.colors.push(a[p*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(i),e.materialIndex.push(i),e.materialIndex.push(i)),t.normal&&(e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2])),t.uv&&t.uv.forEach(function(_,g){e.uvs[g]===void 0&&(e.uvs[g]=[]),e.uvs[g].push(o[g][d*2]),e.uvs[g].push(o[g][d*2+1]),e.uvs[g].push(o[g][f*2]),e.uvs[g].push(o[g][f*2+1]),e.uvs[g].push(o[g][p*2]),e.uvs[g].push(o[g][p*2+1])})}addMorphTargets(e,t,n,i){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=this;n.forEach(function(a){a.rawTargets.forEach(function(o){const l=Ve.Objects.Geometry[o.geoID];l!==void 0&&s.genMorphGeometry(e,t,l,i,o.name)})})}genMorphGeometry(e,t,n,i,s){const a=t.Vertices!==void 0?t.Vertices.a:[],o=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=e.attributes.position.count*3,u=new Float32Array(h);for(let _=0;_<c.length;_++){const g=c[_]*3;u[g]=l[_*3],u[g+1]=l[_*3+1],u[g+2]=l[_*3+2]}const d={vertexIndices:o,vertexPositions:u,baseVertexPositions:a},f=this.genBuffers(d),p=new Qe(f.vertex,3);p.name=s||n.attrName,p.applyMatrix4(i),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:i,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:i,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new oe;a<i.length;a+=4)o.fromArray(i,a),De.toWorkingColorSpace(o,nt),o.toArray(i,a);return{dataSize:4,buffer:i,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const i=e.Materials.a,s=[];for(let a=0;a<i.length;++a)s.push(a);return{dataSize:1,buffer:i,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new wt;const n=t-1,i=e.KnotVector.a,s=[],a=e.Points.a;for(let u=0,d=a.length;u<d;u+=4)s.push(new We().fromArray(a,u));let o,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=n,l=i.length-1-o;for(let u=0;u<n;++u)s.push(s[u])}const h=new Pw(n,i,s,o,l).getPoints(s.length*12);return new wt().setFromPoints(h)}}class Fw{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const i=t[n],s=this.addClip(i);e.push(s)}return e}parseClips(){if(Ve.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=Ve.Objects.AnimationCurveNode,t=new Map;for(const n in e){const i=e[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:i.id,attr:i.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=Ve.Objects.AnimationCurve;for(const n in t){const i={id:t[n].id,times:t[n].KeyTime.a.map(kw),values:t[n].KeyValueFloat.a},s=It.get(i.id);if(s!==void 0){const a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=i:o.match(/Y/)?e.get(a).curves.y=i:o.match(/Z/)?e.get(a).curves.z=i:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=i)}}}parseAnimationLayers(e){const t=Ve.Objects.AnimationLayer,n=new Map;for(const i in t){const s=[],a=It.get(parseInt(i));a!==void 0&&(a.children.forEach(function(l,c){if(e.has(l.ID)){const h=e.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(s[c]===void 0){const u=It.get(l.ID).parents.filter(function(d){return d.relationship!==void 0})[0].ID;if(u!==void 0){const d=Ve.Objects.Model[u.toString()];if(d===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const f={modelName:d.attrName?Ke.sanitizeNodeName(d.attrName):"",ID:d.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};dn.traverse(function(p){p.ID===d.id&&(f.transform=p.matrix,p.userData.transformData&&(f.eulerOrder=p.userData.transformData.eulerOrder))}),f.transform||(f.transform=new fe),"PreRotation"in d&&(f.preRotation=d.PreRotation.value),"PostRotation"in d&&(f.postRotation=d.PostRotation.value),s[c]=f}}s[c]&&(s[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(s[c]===void 0){const u=It.get(l.ID).parents.filter(function(m){return m.relationship!==void 0})[0].ID,d=It.get(u).parents[0].ID,f=It.get(d).parents[0].ID,p=It.get(f).parents[0].ID,_=Ve.Objects.Model[p],g={modelName:_.attrName?Ke.sanitizeNodeName(_.attrName):"",morphName:Ve.Objects.Deformer[u].attrName};s[c]=g}s[c][h.attr]=h}}}),n.set(parseInt(i),s))}return n}parseAnimStacks(e){const t=Ve.Objects.AnimationStack,n={};for(const i in t){const s=It.get(parseInt(i)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(s[0].ID);n[i]={name:t[i].attrName,layer:a}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(i){t=t.concat(n.generateTracks(i))}),new vo(e.name,-1,t)}generateTracks(e){const t=[];let n=new C,i=new C;if(e.transform&&e.transform.decompose(n,new St,i),n=n.toArray(),i=i.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,i,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,i){const s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,n);return new vs(e+"."+i,s,a)}generateRotationTrack(e,t,n,i,s){let a,o;if(t.x!==void 0&&t.y!==void 0&&t.z!==void 0){const d=this.interpolateRotations(t.x,t.y,t.z,s);a=d[0],o=d[1]}const l=yo(0);n!==void 0&&(n=n.map(Dt.degToRad),n.push(l),n=new Vt().fromArray(n),n=new St().setFromEuler(n)),i!==void 0&&(i=i.map(Dt.degToRad),i.push(l),i=new Vt().fromArray(i),i=new St().setFromEuler(i).invert());const c=new St,h=new Vt,u=[];if(!o||!a)return new Gi(e+".quaternion",[0],[0]);for(let d=0;d<o.length;d+=3)h.set(o[d],o[d+1],o[d+2],s),c.setFromEuler(h),n!==void 0&&c.premultiply(n),i!==void 0&&c.multiply(i),d>2&&new St().fromArray(u,(d-3)/3*4).dot(c)<0&&c.set(-c.x,-c.y,-c.z,-c.w),c.toArray(u,d/3*4);return new Gi(e+".quaternion",a,u)}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),i=dn.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new tr(e.modelName+".morphTargetInfluences["+i+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,i){return n-i}),t.length>1){let n=1,i=t[0];for(let s=1;s<t.length;s++){const a=t[s];a!==i&&(t[n]=a,i=a,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const i=n,s=[];let a=-1,o=-1,l=-1;return e.forEach(function(c){if(t.x&&(a=t.x.times.indexOf(c)),t.y&&(o=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),a!==-1){const h=t.x.values[a];s.push(h),i[0]=h}else s.push(i[0]);if(o!==-1){const h=t.y.values[o];s.push(h),i[1]=h}else s.push(i[1]);if(l!==-1){const h=t.z.values[l];s.push(h),i[2]=h}else s.push(i[2])}),s}interpolateRotations(e,t,n,i){const s=[],a=[];s.push(e.times[0]),a.push(Dt.degToRad(e.values[0])),a.push(Dt.degToRad(t.values[0])),a.push(Dt.degToRad(n.values[0]));for(let o=1;o<e.values.length;o++){const l=[e.values[o-1],t.values[o-1],n.values[o-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(Dt.degToRad),h=[e.values[o],t.values[o],n.values[o]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;const u=h.map(Dt.degToRad),d=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],f=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const _=Math.max(...f)/180,g=new Vt(...c,i),m=new Vt(...u,i),x=new St().setFromEuler(g),y=new St().setFromEuler(m);x.dot(y)&&y.set(-y.x,-y.y,-y.z,-y.w);const v=e.times[o-1],E=e.times[o]-v,b=new St,T=new Vt;for(let R=0;R<1;R+=1/_)b.copy(x.clone().slerp(y.clone(),R)),s.push(v+R*E),T.setFromQuaternion(b,i),a.push(T.x),a.push(T.y),a.push(T.z)}else s.push(e.times[o]),a.push(Dt.degToRad(e.values[o])),a.push(Dt.degToRad(t.values[o])),a.push(Dt.degToRad(n.values[o]))}return[s,a]}}class Uw{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new jg,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(i,s){const a=i.match(/^[\s\t]*;/),o=i.match(/^[\s\t]*$/);if(a||o)return;const l=i.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=i.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=i.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(i,l):c?t.parseNodeProperty(i,c,n[++s]):h?t.popStack():i.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),i=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},a=this.parseNodeAttr(i),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in o?(n==="PoseNode"?o.PoseNode.push(s):o[n].id!==void 0&&(o[n]={},o[n][o[n].id]=o[n]),a.id!==""&&(o[n][a.id]=s)):typeof a.id=="number"?(o[n]={},o[n][a.id]=s):n!=="Properties70"&&(n==="PoseNode"?o[n]=[s]:o[n]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",i="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),i=e[2]),{id:t,name:n,type:i}}parseNodeProperty(e,t,n){let i=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,i,s);return}if(i==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]);let u=s.split(",").slice(3);u=u.map(function(d){return d.trim().replace(/^"/,"")}),i="connections",s=[c,h],Vw(s,u),a[i]===void 0&&(a[i]=[])}i==="Node"&&(a.id=s),i in a&&Array.isArray(a[i])?a[i].push(s):i!=="a"?a[i]=s:a.a=s,this.setCurrentProp(a,i),i==="a"&&s.slice(-1)!==","&&(a.a=ch(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=ch(t.a))}parseNodeSpecialProperty(e,t,n){const i=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=i[0],a=i[1],o=i[2],l=i[3];let c=i[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=ch(c);break}this.getPrevNode()[s]={type:a,type2:o,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class Nw{parse(e){const t=new Cp(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const i=new jg;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&i.add(s.name,s)}return i}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},i=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(i===0)return null;const l=[];for(let d=0;d<s;d++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===i;i>e.getOffset();){const d=this.parseNode(e,t);d!==null&&this.parseSubNode(o,n,d)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),o!==""&&(n.name=o),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const i=n.propertyList[0];Array.isArray(i)?(t[n.name]=n,n.a=i):t[n.name]=i}else if(e==="Connections"&&n.name==="C"){const i=[];n.propertyList.forEach(function(s,a){a!==0&&i.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let i=n.propertyList[0],s=n.propertyList[1];const a=n.propertyList[2],o=n.propertyList[3];let l;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[i]={type:s,type2:a,flag:o,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const i=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(i);case"d":return e.getFloat64Array(i);case"f":return e.getFloat32Array(i);case"i":return e.getInt32Array(i);case"l":return e.getInt64Array(i)}const o=xw(new Uint8Array(e.getArrayBuffer(a))),l=new Cp(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(i);case"d":return l.getFloat64Array(i);case"f":return l.getFloat32Array(i);case"i":return l.getInt32Array(i);case"l":return l.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class Cp{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,t,i)),this._textDecoder.decode(n)}}class jg{add(e,t){this[e]=t}}function Ow(r){const e="Kaydara FBX Binary  \0";return r.byteLength>=e.length&&e===$g(r,0,e.length)}function Bw(r){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(i){const s=r[i-1];return r=r.slice(t+i),t++,s}for(let i=0;i<e.length;++i)if(n(1)===e[i])return!1;return!0}function Pp(r){const e=/FBXVersion: (\d+)/,t=r.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function kw(r){return r/46186158e3}const zw=[];function vl(r,e,t,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=r;break;case"ByPolygon":i=e;break;case"ByVertice":i=t;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);const s=i*n.dataSize,a=s+n.dataSize;return Hw(zw,n.buffer,s,a)}const lh=new Vt,Er=new C;function Yg(r){const e=new fe,t=new fe,n=new fe,i=new fe,s=new fe,a=new fe,o=new fe,l=new fe,c=new fe,h=new fe,u=new fe,d=new fe,f=r.inheritType?r.inheritType:0;r.translation&&e.setPosition(Er.fromArray(r.translation));const p=yo(0);if(r.preRotation){const L=r.preRotation.map(Dt.degToRad);L.push(p),t.makeRotationFromEuler(lh.fromArray(L))}if(r.rotation){const L=r.rotation.map(Dt.degToRad);L.push(r.eulerOrder||p),n.makeRotationFromEuler(lh.fromArray(L))}if(r.postRotation){const L=r.postRotation.map(Dt.degToRad);L.push(p),i.makeRotationFromEuler(lh.fromArray(L)),i.invert()}r.scale&&s.scale(Er.fromArray(r.scale)),r.scalingOffset&&o.setPosition(Er.fromArray(r.scalingOffset)),r.scalingPivot&&a.setPosition(Er.fromArray(r.scalingPivot)),r.rotationOffset&&l.setPosition(Er.fromArray(r.rotationOffset)),r.rotationPivot&&c.setPosition(Er.fromArray(r.rotationPivot)),r.parentMatrixWorld&&(u.copy(r.parentMatrix),h.copy(r.parentMatrixWorld));const _=t.clone().multiply(n).multiply(i),g=new fe;g.extractRotation(h);const m=new fe;m.copyPosition(h);const x=m.clone().invert().multiply(h),y=g.clone().invert().multiply(x),v=s,E=new fe;if(f===0)E.copy(g).multiply(_).multiply(y).multiply(v);else if(f===1)E.copy(g).multiply(y).multiply(_).multiply(v);else{const F=new fe().scale(new C().setFromMatrixScale(u)).clone().invert(),I=y.clone().multiply(F);E.copy(g).multiply(_).multiply(I).multiply(v)}const b=c.clone().invert(),T=a.clone().invert();let R=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(i).multiply(b).multiply(o).multiply(a).multiply(s).multiply(T);const M=new fe().copyPosition(R),S=h.clone().multiply(M);return d.copyPosition(S),R=d.clone().multiply(E),R.premultiply(h.invert()),R}function yo(r){r=r||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return r===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[r]}function ch(r){return r.split(",").map(function(t){return parseFloat(t)})}function $g(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=r.byteLength),new TextDecoder().decode(new Uint8Array(r,e,t))}function Vw(r,e){for(let t=0,n=r.length,i=e.length;t<i;t++,n++)r[n]=e[t]}function Hw(r,e,t,n){for(let i=t,s=0;i<n;i++,s++)r[s]=e[i];return r}function Lp(r,e){if(e===lv)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===pu||e===og){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===pu)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Kg extends Wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new jw(t)}),this.register(function(t){return new Yw(t)}),this.register(function(t){return new iT(t)}),this.register(function(t){return new sT(t)}),this.register(function(t){return new rT(t)}),this.register(function(t){return new Kw(t)}),this.register(function(t){return new Jw(t)}),this.register(function(t){return new Zw(t)}),this.register(function(t){return new Qw(t)}),this.register(function(t){return new qw(t)}),this.register(function(t){return new eT(t)}),this.register(function(t){return new $w(t)}),this.register(function(t){return new nT(t)}),this.register(function(t){return new tT(t)}),this.register(function(t){return new Ww(t)}),this.register(function(t){return new aT(t)}),this.register(function(t){return new oT(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Yr.extractUrlBase(e);a=Yr.resolveURL(c,this.path)}else a=Yr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new xd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Jg){try{a[He.KHR_BINARY_GLTF]=new lT(e)}catch(u){i&&i(u);return}s=JSON.parse(a[He.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new MT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case He.KHR_MATERIALS_UNLIT:a[u]=new Xw;break;case He.KHR_DRACO_MESH_COMPRESSION:a[u]=new cT(s,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:a[u]=new hT;break;case He.KHR_MESH_QUANTIZATION:a[u]=new uT;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Gw(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ww{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new oe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],mn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new no(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Su(h),c.distance=u;break;case"spot":c=new Sd(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Di(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class Xw{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return Zt}extendParams(e,t,n){const i=[];e.color=new oe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],mn),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,nt))}return Promise.all(i)}}class qw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class jw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ie(o,o)}return Promise.all(s)}}class Yw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class $w{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class Kw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new oe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],mn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,nt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class Jw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class Zw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new oe().setRGB(o[0],o[1],o[2],mn),Promise.all(s)}}class Qw{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class eT{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new oe().setRGB(o[0],o[1],o[2],mn),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,nt)),Promise.all(s)}}class tT{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class nT{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class iT{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class sT{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class rT{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class aT{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class oT{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Vn.TRIANGLES&&c.mode!==Vn.TRIANGLE_STRIP&&c.mode!==Vn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const _=new fe,g=new C,m=new St,x=new C(1,1,1),y=new Zb(p.geometry,p.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,v),l.SCALE&&x.fromBufferAttribute(l.SCALE,v),y.setMatrixAt(v,_.compose(g,m,x));for(const v in l)if(v==="_COLOR_0"){const E=l[v];y.instanceColor=new vu(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&p.geometry.setAttribute(v,l[v]);ct.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Jg="glTF",Fa=12,Ip={JSON:1313821514,BIN:5130562};class lT{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Fa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Jg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Fa,s=new DataView(e,Fa);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===Ip.JSON){const c=new Uint8Array(e,Fa+a,o);this.content=n.decode(c)}else if(l===Ip.BIN){const c=Fa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class cT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Tu[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Tu[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=$r[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const _=f.attributes[p],g=l[p];g!==void 0&&(_.normalized=g)}u(f)},o,c,mn,d)})})}}class hT{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class uT{constructor(){this.name=He.KHR_MESH_QUANTIZATION}}class Zg extends Do{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,_=p-c,g=-2*f+3*d,m=f-d,x=1-g,y=m-d+u;for(let v=0;v!==o;v++){const E=a[_+v+o],b=a[_+v+l]*h,T=a[p+v+o],R=a[p+v]*h;s[v]=x*E+y*b+g*T+m*R}return s}}const dT=new St;class fT extends Zg{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return dT.fromArray(s).normalize().toArray(s),s}}const Vn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},$r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Dp={9728:pn,9729:Pn,9984:Km,9985:Cl,9986:Xa,9987:Oi},Fp={33071:gi,33648:Wl,10497:_s},hh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Tu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ss={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},pT={CUBICSPLINE:void 0,LINEAR:uo,STEP:ho},uh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Ct({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:yi})),r.DefaultMaterial}function Ps(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Di(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function _T(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function vT(r){let e;const t=r.extensions&&r.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+dh(t.attributes):e=r.indices+":"+dh(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+dh(r.targets[n]);return e}function dh(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Eu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const xT=new fe;class MT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Gw,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Bg(this.options.manager):this.textureLoader=new j1(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ps(s,o,i),Di(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Yr.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=hh[i.type],o=$r[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Je(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=hh[i.type],c=$r[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,g;if(f&&f!==u){const m=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let y=t.cache.get(x);y||(_=new c(o,m*f,i.count*f/h),y=new bg(_,f/h),t.cache.add(x,y)),g=new po(y,l,d%f/h,p)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),g=new Je(_,l,p);if(i.sparse!==void 0){const m=hh.SCALAR,x=$r[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new x(a[1],y,i.sparse.count*m),b=new c(a[2],v,i.sparse.count*l);o!==null&&(g=new Je(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,R=E.length;T<R;T++){const M=E[T];if(g.setX(M,b[T*l]),l>=2&&g.setY(M,b[T*l+1]),l>=3&&g.setZ(M,b[T*l+2]),l>=4&&g.setW(M,b[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Dp[d.magFilter]||Pn,h.minFilter=Dp[d.minFilter]||Oi,h.wrapS=Fp[d.wrapS]||_s,h.wrapT=Fp[d.wrapT]||_s,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==pn&&h.minFilter!==Pn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){const g=new kt(_);g.needsUpdate=!0,d(g)}),t.load(Yr.resolveURL(u,s.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Di(u,a),u.userData.mimeType=a.mimeType||yT(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[He.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ag,Dn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new hd,Dn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ct}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[He.KHR_MATERIALS_UNLIT]){const u=i[He.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new oe(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],mn),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,nt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=vn);const h=s.alphaMode||uh.OPAQUE;if(h===uh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===uh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Zt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ie(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==Zt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Zt){const u=s.emissiveFactor;o.emissive=new oe().setRGB(u[0],u[1],u[2],mn)}return s.emissiveTexture!==void 0&&a!==Zt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,nt)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),Di(u,s),t.associations.set(u,{materials:e}),s.extensions&&Ps(i,u,s),u})}createUniqueName(e){const t=Ke.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Up(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=vT(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[He.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Up(new wt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?mT(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const _=h[f],g=a[f];let m;const x=c[f];if(g.mode===Vn.TRIANGLES||g.mode===Vn.TRIANGLE_STRIP||g.mode===Vn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Tg(_,x):new ve(_,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===Vn.TRIANGLE_STRIP?m.geometry=Lp(m.geometry,og):g.mode===Vn.TRIANGLE_FAN&&(m.geometry=Lp(m.geometry,pu));else if(g.mode===Vn.LINES)m=new Qb(_,x);else if(g.mode===Vn.LINE_STRIP)m=new ga(_,x);else if(g.mode===Vn.LINE_LOOP)m=new e1(_,x);else if(g.mode===Vn.POINTS)m=new ud(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&_T(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Di(m,s),g.extensions&&Ps(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Ps(i,u[0],s),u[0];const d=new Ue;s.extensions&&Ps(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Dt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ld(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Di(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new fe;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new dc(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],_=f.target,g=_.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,x=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",x)),c.push(p),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],_=u[3],g=u[4],m=[];for(let x=0,y=d.length;x<y;x++){const v=d[x],E=f[x],b=p[x],T=_[x],R=g[x];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const M=n._createAnimationTracks(v,E,b,T,R);if(M)for(let S=0;S<M.length;S++)m.push(M[S])}return new vo(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,xT)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new jl:c.length>1?h=new Ue:c.length===1?h=c[0]:h=new ct,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Di(h,s),s.extensions&&Ps(n,h,s),s.matrix!==void 0){const u=new fe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Ue;n.name&&(s.name=i.createUniqueName(n.name)),Di(s,n),n.extensions&&Ps(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Dn||d instanceof kt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,l=[];ss[s.path]===ss.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(ss[s.path]){case ss.weights:c=tr;break;case ss.rotation:c=Gi;break;case ss.position:case ss.scale:c=vs;break;default:switch(n.itemSize){case 1:c=tr;break;case 2:case 3:default:c=vs;break}break}const h=i.interpolation!==void 0?pT[i.interpolation]:uo,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+ss[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),a.push(p)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Eu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Gi?fT:Zg;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ST(r,e,t){const n=e.attributes,i=new rn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const h=Eu($r[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const _=Eu($r[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new ci;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Up(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=Tu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return De.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${De.workingColorSpace}" not supported.`),Di(r,e),ST(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?gT(r,e.targets,t):r})}class bT{constructor(){const t=new Float32Array(5400),n=new Float32Array(1800),i=new Float32Array(1800),s=new Float32Array(1800),a=new Float32Array(1800*3);for(let l=0;l<1800;l++){const c=160+Math.random()*60,h=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1);t[l*3]=c*Math.sin(u)*Math.cos(h),t[l*3+1]=c*Math.sin(u)*Math.sin(h),t[l*3+2]=c*Math.cos(u),n[l]=Math.random()*Math.PI*2,i[l]=.6+Math.random()*2.8,s[l]=1.2+Math.random()*2.8;const d=Math.random();d<.15?(a[l*3]=.75,a[l*3+1]=.88,a[l*3+2]=1):d<.27?(a[l*3]=1,a[l*3+1]=.93,a[l*3+2]=.65):(a[l*3]=1,a[l*3+1]=1,a[l*3+2]=1)}const o=new wt;o.setAttribute("position",new Je(t,3)),o.setAttribute("phase",new Je(n,1)),o.setAttribute("speed",new Je(i,1)),o.setAttribute("baseSize",new Je(s,1)),o.setAttribute("color",new Je(a,3)),this._mat=new bn({uniforms:{time:{value:0}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:Yt}),this.points=new ud(o,this._mat)}update(e){this._mat.uniforms.time.value=e}}const wT=2,Np=[7234136,8022620,6051408,8613983],TT=[[14706748,11026462],[14262366,11565120],[8365768,5140110],[12567756,8159884]],Qg=r=>r[Math.random()*r.length|0];function ET(r,e,t,n=.24){const i=r.attributes.position,s=new Float32Array(i.count*3),a=new oe(e),o=new oe(t),l=new oe;for(let c=0;c<i.count;c++)l.copy(Math.random()<n?o:a),s[c*3]=l.r,s[c*3+1]=l.g,s[c*3+2]=l.b;r.setAttribute("color",new Je(s,3))}function AT(r){const e=new Vi(r,0),t=e.attributes.position;for(let n=0;n<t.count;n++){const i=.7+Math.random()*.6;t.setXYZ(n,t.getX(n)*i,t.getY(n)*i,t.getZ(n)*i)}return e.computeVertexNormals(),e}function RT(){const r=new Ue,e=new Ct({color:13225430,flatShading:!0,roughness:.55,metalness:.35,emissive:1711398,emissiveIntensity:.6});r.add(new ve(new vi(1.4,1.4,2.2),e));const t=new Ct({color:2845951,flatShading:!0,roughness:.4,metalness:.2,emissive:661568,emissiveIntensity:.9});for(const i of[-1,1]){const s=new ve(new vi(3.2,.1,1.7),t);s.position.x=i*2.6,r.add(s);const a=new ve(new vi(1.2,.12,.12),e);a.position.x=i*1.2,r.add(a)}const n=new ve(new zi(.6,.55,10,1,!0),e);return n.rotation.x=Math.PI/2,n.position.z=1.5,r.add(n),{obj:r,radius:3.6}}function CT(){const r=new Ue,e=new Ct({color:10134450,flatShading:!0,roughness:.45,metalness:.45,emissive:1316639,emissiveIntensity:.6}),t=new ve(new Ot(2.6,18,12),e);t.scale.set(1,.34,1),r.add(t);const n=new ve(new Ot(1.25,16,12,0,Math.PI*2,0,Math.PI/2),new Ct({color:8189392,flatShading:!0,transparent:!0,opacity:.82,emissive:1792586,emissiveIntensity:1}));n.position.y=.45,r.add(n);const i=new Zt({color:16765803});for(let s=0;s<6;s++){const a=s/6*Math.PI*2,o=new ve(new Ot(.18,8,8),i);o.position.set(Math.cos(a)*1.85,-.32,Math.sin(a)*1.85),r.add(o)}return{obj:r,radius:2.9}}function PT(){const r=3.4+Math.random()*3,[e,t]=Qg(TT),n=new Vi(r,2);return ET(n,e,t,.22),{obj:new ve(n,new Ct({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:1575428,emissiveIntensity:.45})),radius:r}}function LT(){const r=new Ue,e=4+(Math.random()*3|0);for(let t=0;t<e;t++){const n=.6+Math.random()*1.3,i=new ve(AT(n),new Ct({color:Np[t%Np.length],flatShading:!0,roughness:1,metalness:0,emissive:657934,emissiveIntensity:.5}));i.position.set((Math.random()-.5)*7,(Math.random()-.5)*5,(Math.random()-.5)*7),r.add(i)}return{obj:r,radius:5.5}}const IT=[RT,CT,PT,LT];class DT{constructor(e){this.cam=e,this.group=new Ue,this._active=[],this._cooldown=0,this._spawning=!0}_visibleHalf(e){const t=this.cam.position.z-e,n=Math.tan(Dt.degToRad(this.cam.fov)/2)*t;return{halfH:n,halfW:n*(window.innerWidth/window.innerHeight)}}_spawn(){const{obj:e,radius:t}=Qg(IT)(),n=-6+Math.random()*28,{halfW:i,halfH:s}=this._visibleHalf(n),a=(Math.random()-.5)*.7*s;e.position.set(i+t+1,a,n),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),this.group.add(e),this._active.push({obj:e,radius:t,baseY:a,vx:-(9+Math.random()*13),spin:new C((Math.random()-.5)*.7,(Math.random()-.5)*.7,(Math.random()-.5)*.7),bobF:.6+Math.random()*1.1,bobA:.3+Math.random()*.9,age:Math.random()*10,deathX:-(i+t+4)})}update(e,t=!1){if(!t){for(let n=this._active.length-1;n>=0;n--){const i=this._active[n];i.age+=e,i.obj.position.x+=i.vx*e,i.obj.position.y=i.baseY+Math.sin(i.age*i.bobF)*i.bobA,i.obj.rotation.x+=i.spin.x*e,i.obj.rotation.y+=i.spin.y*e,i.obj.rotation.z+=i.spin.z*e,i.obj.position.x<i.deathX&&(this._disposeObj(i.obj),this._active.splice(n,1))}this._spawning&&(this._cooldown-=e,this._cooldown<=0&&this._active.length<wT&&(this._spawn(),this._cooldown=.45+Math.random()*1.2))}}flushOut(){this._spawning=!1;for(const e of this._active)e.vx=-Math.max(55,Math.abs(e.vx)*2.6),e.bobA*=.35,e.spin.multiplyScalar(1.5);return this._active.length>0}clear(){var e,t;this._spawning=!1;for(const n of this._active)this._disposeObj(n.obj);this._active.length=0,(t=(e=this.group).clear)==null||t.call(e)}_disposeObj(e){this.group.remove(e),e.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}}class FT{constructor(){this.sceneGroup=new Ue,this.sunGroup=new Ue;const e=new kg(15259880,.75);this.sceneGroup.add(e);const t=new no(16770764,.28);t.position.set(30,40,20),this.sceneGroup.add(t),this.sunLight=new no(16765056,0),this.sunLight.position.set(50,40,20),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=300,this.sunLight.shadow.camera.left=-50,this.sunLight.shadow.camera.right=50,this.sunLight.shadow.camera.top=50,this.sunLight.shadow.camera.bottom=-50,this.sceneGroup.add(this.sunLight),this.sceneGroup.add(this.sunLight.target),this.presentationSun2=new no(16765056,0),this.sceneGroup.add(this.presentationSun2),this.sceneGroup.add(this.presentationSun2.target)}}const fh=r=>new Ct({color:r}),Qn=r=>new Ct({color:r,flatShading:!0});class UT{constructor(){this.group=new Ue,this._stride=0,this._headGroup=new Ue,this._headGroup.position.y=.82;const e=new ve(new Ot(.22,14,10),fh(16768437)),t=fh(1710638),n=new ve(new Ot(.04,7,5),t);n.position.set(-.1,.04,.18);const i=n.clone();i.position.x=.1;const s=fh(16755336),a=new ve(new Ot(.05,6,4),s);a.position.set(-.15,-.04,.17);const o=a.clone();o.position.x=.15,this._headGroup.add(e,n,i,a,o);const l=new ve(new Ot(.26,10,8),Qn(16766287));l.position.set(0,.97,.03),l.scale.set(1,.72,.95);const c=new ve(new Ot(.13,7,5),Qn(16766287));c.position.set(0,1.02,.18),c.scale.set(.9,.7,.7);const h=new ve(new _a(.16,.2,.52,7),Qn(4431943));h.position.y=.3;const u=Qn(16766720);[-.05,.05,.15].forEach(M=>{const S=new ve(new Ot(.025,5,4),u);S.position.set(0,M+.22,.18),this.group.add(S)});const d=Qn(16766720),f=new ve(new Ot(.1,6,4),d);f.position.set(-.25,.54,0),f.scale.set(1.1,.45,1);const p=f.clone();p.position.x=.25,this._scarfGroup=new Ue;const _=new ve(new yd(.155,.048,7,12),Qn(16776679));_.position.y=.62,_.rotation.x=Math.PI/2;const g=new ve(new kr(.046,.3,2,7),Qn(16776679));g.position.set(-.08,.43,-.13),g.rotation.x=-.3;const m=new ve(new kr(.046,.24,2,7),Qn(16776679));m.position.set(.08,.39,-.15),m.rotation.x=-.36,this._scarfGroup.add(_,g,m),this._armLPivot=new Ue,this._armLPivot.position.set(-.25,.52,0);const x=new ve(new kr(.068,.26,2,7),Qn(4431943));x.position.y=-.18,this._armLPivot.add(x),this._armRPivot=new Ue,this._armRPivot.position.set(.25,.52,0),this._armRPivot.add(x.clone()),this._hips=new Ue,this._hips.position.y=-.14;const y=new kr(.078,.3,2,7),v=Qn(1713022);this._legLPivot=new Ue,this._legLPivot.position.x=-.11;const E=new ve(y,v);E.position.y=-.24,this._legLPivot.add(E),this._legRPivot=new Ue,this._legRPivot.position.x=.11,this._legRPivot.add(E.clone());const b=Qn(2171169),T=new ve(new Ot(.095,7,5),b);T.position.set(-.11,-.52,.04),T.scale.set(1,.6,1.25);const R=T.clone();R.position.x=.11,this._hips.add(this._legLPivot,this._legRPivot,T,R),this.group.add(h,f,p,this._scarfGroup,this._headGroup,l,c,this._armLPivot,this._armRPivot,this._hips),this.group.traverse(M=>{M.isMesh&&(M.castShadow=!0)})}update(e,t,n,i=!1){if(i){this._legLPivot.rotation.x=-.7,this._legRPivot.rotation.x=-.7,this._armLPivot.rotation.x=-1,this._armRPivot.rotation.x=-1,this._armLPivot.rotation.z=-.75,this._armRPivot.rotation.z=.75,this._scarfGroup.rotation.x=-.55,this._headGroup.rotation.x=.1,this.group.rotation.z=0,this._hips.position.y=-.14;return}this._armLPivot.rotation.z=0,this._armRPivot.rotation.z=0,this._scarfGroup.rotation.x=0,this._headGroup.rotation.x=0,t&&(this._stride+=e*4.5);const s=Math.sin(this._stride)*(t?.55:.03);this._legLPivot.rotation.x=-s,this._legRPivot.rotation.x=s,this._armLPivot.rotation.x=s*.65,this._armRPivot.rotation.x=-s*.65,this._scarfGroup.rotation.x=t?Math.sin(this._stride*2)*.09:0,this.group.rotation.z=t?0:Math.sin(n*.6)*.025,this._hips.position.y=-.14+Math.abs(Math.sin(this._stride*2))*.03}}class NT{constructor(){this.keys=new Set,this._enabled=!0,window.addEventListener("keydown",e=>{if(!this._enabled)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||this.keys.add(e.key.toLowerCase())}),window.addEventListener("keyup",e=>{this.keys.delete(e.key.toLowerCase())}),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.keys.clear()})}setEnabled(e){this._enabled=!!e,e||this.keys.clear()}}const Op={leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',snowflake:'<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',mountain:'<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',compass:'<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>',map:'<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',world:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',mapPin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',instagram:'<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'},Bp={github:'<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>',linkedin:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'};function tt(r,e=24,t=1.6){if(Bp[r])return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${Bp[r]}</svg>`;const n=Op[r]||Op.compass;return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${t}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`}class OT{constructor(){this._joyX=0,this._joyY=0,this._joyTouchId=null,this._joyOrigin={x:0,y:0},this.JOY_RADIUS=52,this._camTouchId=null,this._camLastX=0,this._camLastY=0,this._pendingCamDx=0,this._pendingCamDy=0,this._pendingJump=!1,this._pendingInteract=!1,this._pendingMap=!1,this._buildUI(),this._bindEvents()}_buildUI(){const e=document.createElement("div");e.id="touch-controls",e.innerHTML=`
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
        <button class="touch-btn touch-btn--map"  id="touch-map-btn"  aria-label="World Map">${tt("map",20)}</button>
        <button class="touch-btn touch-btn--jump" id="touch-jump-btn" aria-label="Jump">↑</button>
        <button class="touch-btn touch-btn--e"    id="touch-e-btn"    aria-label="Explore">E</button>
      </div>
    `,document.body.appendChild(e),this._el=e,this._joyHint=e.querySelector("#joy-hint"),this._joyBase=e.querySelector("#joy-base"),this._joyThumb=e.querySelector("#joy-thumb")}_bindEvents(){document.addEventListener("touchstart",t=>{for(const n of t.changedTouches)this._joyTouchId===null&&(t.target.closest("#touch-btns, #touch-buttons")||n.clientX>window.innerWidth*.52||(this._joyTouchId=n.identifier,this._joyOrigin.x=n.clientX,this._joyOrigin.y=n.clientY,this._placeJoystick(n.clientX,n.clientY)))},{passive:!0}),document.addEventListener("touchstart",t=>{for(const n of t.changedTouches)this._camTouchId===null&&n.identifier!==this._joyTouchId&&(t.target.closest("#touch-btns, #touch-buttons")||n.clientX>window.innerWidth*.42&&(this._camTouchId=n.identifier,this._camLastX=n.clientX,this._camLastY=n.clientY))},{passive:!0}),document.addEventListener("touchmove",t=>{for(const n of t.changedTouches)if(n.identifier===this._joyTouchId){const i=n.clientX-this._joyOrigin.x,s=n.clientY-this._joyOrigin.y,a=Math.min(Math.hypot(i,s),this.JOY_RADIUS),o=Math.atan2(s,i);this._joyX=a/this.JOY_RADIUS*Math.cos(o),this._joyY=a/this.JOY_RADIUS*Math.sin(o),this._joyThumb.style.transform=`translate(${Math.cos(o)*a}px, ${Math.sin(o)*a}px)`}else n.identifier===this._camTouchId&&(this._pendingCamDx+=n.clientX-this._camLastX,this._pendingCamDy+=n.clientY-this._camLastY,this._camLastX=n.clientX,this._camLastY=n.clientY)},{passive:!0});const e=t=>{for(const n of t.changedTouches)n.identifier===this._joyTouchId&&(this._joyTouchId=null,this._joyX=0,this._joyY=0,this._joyThumb.style.transform="",this._hideJoystick()),n.identifier===this._camTouchId&&(this._camTouchId=null)};document.addEventListener("touchend",e,{passive:!0}),document.addEventListener("touchcancel",e,{passive:!0}),this._btn("#touch-jump-btn",()=>{this._pendingJump=!0}),this._btn("#touch-e-btn",()=>{this._pendingInteract=!0}),this._btn("#touch-map-btn",()=>{this._pendingMap=!0})}_btn(e,t){const n=this._el.querySelector(e);n&&(n.addEventListener("touchstart",i=>{i.preventDefault(),t()},{passive:!1}),n.addEventListener("click",i=>i.stopPropagation()))}_placeJoystick(e,t){const n=this.JOY_RADIUS+4,i=8,s=Math.max(i+n,Math.min(window.innerWidth*.52-i-n,e))-n,a=Math.max(i+n,Math.min(window.innerHeight-i-n,t))-n,o=(n+4)*2;this._joyBase.style.left=s+"px",this._joyBase.style.top=a+"px",this._joyBase.style.width=o+"px",this._joyBase.style.height=o+"px",this._joyBase.classList.add("active"),this._joyHint.classList.add("joy-hint--hidden")}_hideJoystick(){this._joyBase.classList.remove("active"),this._joyHint.classList.remove("joy-hint--hidden")}get joyX(){return this._joyX}get joyY(){return this._joyY}popCamDelta(){const e=this._pendingCamDx,t=this._pendingCamDy;return this._pendingCamDx=0,this._pendingCamDy=0,{dx:e,dy:t}}takeJump(){return this._pendingJump?(this._pendingJump=!1,!0):!1}takeInteract(){return this._pendingInteract?(this._pendingInteract=!1,!0):!1}takeMap(){return this._pendingMap?(this._pendingMap=!1,!0):!1}}const Xe={IDLE:"idle",WALK:"walk",RUN:"run",JUMP:"jump",WALK_JUMP:"walkJump",RUN_JUMP:"runJump",EMOTE:"emote"},ph=new Set([Xe.JUMP,Xe.WALK_JUMP,Xe.RUN_JUMP]),Au={IDLE_TO_WALK:.2,WALK_TO_IDLE:.3,WALK_TO_RUN:.2,RUN_TO_WALK:.25,RUN_TO_IDLE:.1,IDLE_TO_RUN:.22,IDLE_TO_JUMP:.12,WALK_TO_WALKJUMP:.1,RUN_TO_RUNJUMP:.08,JUMP_TO_IDLE:.38,JUMP_TO_WALK:.28,JUMP_TO_RUN:.22,WALKJUMP_TO_IDLE:.35,WALKJUMP_TO_WALK:.25,WALKJUMP_TO_RUN:.2,RUNJUMP_TO_IDLE:.32,RUNJUMP_TO_WALK:.25,RUNJUMP_TO_RUN:.18,IDLE_TO_EMOTE:.2,EMOTE_TO_IDLE:.28},Ar=(r,e)=>Au[`${r.toUpperCase()}_TO_${e.toUpperCase()}`]??.22,kp=9,BT=16;class kT{constructor(){this.mixer=null,this.ready=!1,this._state=Xe.IDLE,this._action=null,this._finishCb=null,this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._emotes=[],this.emotesEnabled=!0,this._anims={idle:null,walk:null,run:null,jump:null,walkJump:null,runJump:null,walkStart:null,runToStop:null,lookAround:null,lookAround2:null,wave:null}}get state(){return this._state}get isAirborne(){return ph.has(this._state)}get isReady(){return this.ready}async load(e,t,n,{skipAnims:i=!1}={}){if(this.mixer=new Ep(e),i){this._state=Xe.IDLE,this.ready=!0;return}const s=o=>new Promise((l,c)=>t.load(o,l,void 0,c)),a=[["breathingidle.fbx","idle"],["walking.fbx","walk"],["running.fbx","run"],["idlejump.fbx","jump"],["walkingjump.fbx","walkJump"],["runningjump.fbx","runJump"],["walkstart.fbx","walkStart"],["runtostop.fbx","runToStop"],["lookingaround.fbx","lookAround"],["lookingaround2.fbx","lookAround2"],["wave.fbx","wave"]];await Promise.allSettled(a.map(([o,l])=>s(n+o).then(c=>{this._stripRootMotion(c.animations),this._anims[l]=this.mixer.clipAction(c.animations[0])}).catch(c=>console.warn(`[AnimCtrl] ${o} failed:`,c)))),this._anims.idle&&(this._anims.idle.setLoop(Ul),this._anims.idle.play(),this._action=this._anims.idle),this._state=Xe.IDLE,this.ready=!0}loadGlbClips(e,t){this.mixer=new Ep(e);const n=t.idle||this._makeBindPoseClip(e);this._anims.idle=this.mixer.clipAction(n);for(const i of["walk","run"]){const s=t[i];s&&(this._stripRootMotion([s]),this._anims[i]=this.mixer.clipAction(s))}Array.isArray(t.emotes)&&(this._stripRootMotion(t.emotes),this._emotes=t.emotes.map(i=>this.mixer.clipAction(i))),this._anims.idle.setLoop(Ul),this._anims.idle.play(),this._action=this._anims.idle,this._state=Xe.IDLE,this.ready=!0}_makeBindPoseClip(e){const t=[];return e.traverse(n=>{if(!n.isBone)return;const i=n.quaternion,s=n.position;t.push(new Gi(`${n.name}.quaternion`,[0,1],[i.x,i.y,i.z,i.w,i.x,i.y,i.z,i.w])),t.push(new vs(`${n.name}.position`,[0,1],[s.x,s.y,s.z,s.x,s.y,s.z]))}),new vo("idleStatic",1,t)}update(e,t,n,i){if(!this.ready||!this.mixer)return;if(this.mixer.update(e),ph.has(this._state)){i||this._land(t,n);return}if(this._state===Xe.EMOTE){t&&this._interruptEmote(t,n);return}const s=t&&n?Xe.RUN:t?Xe.WALK:Xe.IDLE;if(s!==this._state){const a=this._state;this._state=s,this._transitionGround(a,s)}this._state===Xe.IDLE&&this.emotesEnabled?(this._idleTimer+=e,this._idleTimer>=this._emoteDelay&&(this._idleTimer=0,this._emoteDelay=this._randEmoteDelay(),this._playEmote())):this._idleTimer=0}triggerJump(){if(!this.ready||ph.has(this._state))return!1;const e=this._state===Xe.EMOTE?Xe.IDLE:this._state;if(this._clearFinishCb(),e===Xe.RUN){const t=this._anims.runJump??this._anims.jump;this._crossFadeOnce(t,Ar(Xe.RUN,Xe.RUN_JUMP),1.2),this._state=Xe.RUN_JUMP}else if(e===Xe.WALK){const t=this._anims.walkJump??this._anims.jump;this._crossFadeOnce(t,Ar(Xe.WALK,Xe.WALK_JUMP),1.3),this._state=Xe.WALK_JUMP}else this._crossFadeOnce(this._anims.jump,Ar(Xe.IDLE,Xe.JUMP),1.4),this._state=Xe.JUMP;return!0}_land(e,t){this._clearFinishCb();const n=e&&t?Xe.RUN:e?Xe.WALK:Xe.IDLE,i=Ar(this._state,n);this._state=n,this._crossFadeLoop(this._anims[n],i)}_transitionGround(e,t){if(this._clearFinishCb(),e===Xe.RUN&&t===Xe.IDLE&&this._anims.runToStop){this._playOnceThenLoop(this._anims.runToStop,this._anims.idle,Ar(e,t),.2);return}this._crossFadeLoop(this._anims[t],Ar(e,t))}_playOnceThenLoop(e,t,n,i){const s=e;this._crossFadeOnce(e,n,1),this._finishCb=a=>{a.action===s&&(this._clearFinishCb(),this._action===s&&this._crossFadeLoop(t,i))},this.mixer.addEventListener("finished",this._finishCb)}_playEmote(){const e=this._emotes.filter(Boolean);if(!e.length)return;const t=e[Math.floor(Math.random()*e.length)];this._state=Xe.EMOTE,this._crossFadeOnce(t,Au.IDLE_TO_EMOTE,1),this._finishCb=n=>{n.action===t&&(this._clearFinishCb(),this._state===Xe.EMOTE&&(this._state=Xe.IDLE,this._crossFadeLoop(this._anims.idle,Au.EMOTE_TO_IDLE)))},this.mixer.addEventListener("finished",this._finishCb)}_interruptEmote(e,t){this._clearFinishCb();const n=e&&t?Xe.RUN:Xe.WALK;this._state=n,this._crossFadeLoop(this._anims[n],.22)}_clearFinishCb(){this._finishCb&&(this.mixer.removeEventListener("finished",this._finishCb),this._finishCb=null)}_crossFadeLoop(e,t){if(e){if(e===this._action){e.isRunning()||e.play();return}e.reset(),e.setLoop(Ul),e.setEffectiveWeight(1),e.play(),this._action&&this._action.crossFadeTo(e,t,!0),this._action=e}}_crossFadeOnce(e,t,n=1){e&&(e.reset(),e.setLoop(ag,1),e.clampWhenFinished=!0,e.timeScale=n,e.setEffectiveWeight(1),e.play(),this._action&&this._action.crossFadeTo(e,t,!0),this._action=e)}_stripRootMotion(e){for(const t of e)t.tracks=t.tracks.filter(n=>{const i=n.name.toLowerCase();return!(i.endsWith(".position")&&(i.includes("hips")||i.includes("hip")||i.includes("root")))})}_randEmoteDelay(){return kp+Math.random()*(BT-kp)}}const yl=16,Ua=.38,zp=.05,Vp=1.1,zT=3.5,VT=12,HT=22,GT=.9,WT=.55,XT=.4;function Hp(r){const e=Math.min(1,Math.max(0,r));return e*e*(3-2*e)}class qT{constructor(e){this.camera=new sn(65,e,.1,2e3),this._camPos=new C,this._pivot=new C,this._pivotSmooth=new C;const t=25,n=Math.cos(Ua)*yl*3,i=Math.sin(Ua)*yl*3;this.camera.position.set(0,t+i,n),this._pivotSmooth.set(0,t+.75,0),this._yaw=0,this._pitch=Ua,this._yawTarget=0,this._pitchTarget=Ua,this._dist=yl,this._distTarget=yl,this._pivotYExtra=0,this._inputEnabled=!0,window.addEventListener("wheel",s=>{this._inputEnabled&&(this._distTarget=Math.max(3,Math.min(60,this._distTarget+s.deltaY*.02)))},{passive:!0}),this._rmbDown=!1,this._lastMx=0,this._lastMy=0,this._snapTimer=0,window.addEventListener("mousedown",s=>{s.button!==2||!this._inputEnabled||(this._rmbDown=!0,this._lastMx=s.clientX,this._lastMy=s.clientY,this._snapTimer=0)}),window.addEventListener("mouseup",s=>{s.button===2&&(this._rmbDown=!1)}),window.addEventListener("mousemove",s=>{if(!this._rmbDown||!this._inputEnabled)return;const a=s.clientX-this._lastMx,o=s.clientY-this._lastMy;this._yawTarget-=a*.005,this._pitchTarget=Math.max(zp,Math.min(Vp,this._pitchTarget+o*.004)),this._lastMx=s.clientX,this._lastMy=s.clientY,this._snapTimer=0}),window.addEventListener("contextmenu",s=>{s.target&&s.target.id==="canvas"&&s.preventDefault()}),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}resize(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}setInputEnabled(e){this._inputEnabled=!!e,e||(this._rmbDown=!1)}applyTouchDelta(e,t){this._inputEnabled&&(this._yawTarget-=e*.005,this._pitchTarget=Math.max(zp,Math.min(Vp,this._pitchTarget+t*.004)),this._snapTimer=0)}setLoadingView(){this.camera.position.set(0,0,52),this.camera.lookAt(0,0,0),this._pivotSmooth.set(0,0,0),this._introKBlend=0,this._introElapsed=0,this.characterRevealReady=!1}update(e,t,n,i,s,a,o=0,l=!1){if(l&&!this._rmbDown){if(this._snapTimer+=e,this._snapTimer>.3){let m=o-this._yawTarget;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;this._yawTarget+=m*(1-Math.exp(-4*e)),this._pitchTarget+=(Ua-this._pitchTarget)*(1-Math.exp(-3*e))}}else if(l||(this._snapTimer=0),!this._rmbDown&&!l){let m=o-this._yawTarget;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;this._yawTarget+=m*(1-Math.exp(-2*e))}this._yaw+=(this._yawTarget-this._yaw)*(1-Math.exp(-14*e)),this._pitch+=(this._pitchTarget-this._pitch)*(1-Math.exp(-14*e)),this._dist+=(this._distTarget-this._dist)*(1-Math.exp(-8*e));const c=n+.75+this._pivotYExtra;this._pivot.set(0,c,0);const h=Math.cos(this._pitch)*this._dist,u=Math.sin(this._pitch)*this._dist;this._camPos.set(this._pivot.x-Math.sin(this._yaw)*h,this._pivot.y+u,this._pivot.z+Math.cos(this._yaw)*h),(this.camera.position.distanceToSquared(this._camPos)<HT||this._introKBlend>0)&&(this._introKBlend=Math.min(1,this._introKBlend+e/GT)),this._introElapsed+=e;const f=Dt.lerp(XT,1,Hp(this._introElapsed/WT)),p=Dt.lerp(zT,VT,Hp(this._introKBlend))*f,_=1-Math.exp(-p*e);this._pivotSmooth.lerp(this._pivot,_);const g=1-Math.exp(-p*e);this.camera.position.lerp(this._camPos,g),this.camera.lookAt(this._pivotSmooth),this.characterRevealReady=this._introKBlend>0}}const mh=155,Na=28,jT=22;function YT(){const r=Math.random()*Math.PI*2,e=.05+Math.random()*.55;return new C(mh*Math.sin(e)*Math.cos(r),mh*Math.cos(e),mh*Math.sin(e)*Math.sin(r))}function $T(){const r=Math.random()*Math.PI*2;return new C(Math.cos(r),-.12-Math.random()*.25,Math.sin(r)).normalize()}class KT{constructor(){this.group=new Ue,this._active=[],this._nextSpawn=4+Math.random()*6,this._shaderMat=new bn({vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:Yt})}_spawn(){const e=YT(),t=$T(),n=.7+Math.random()*.7,i=70+Math.random()*60,s=new Float32Array(Na*3),a=new Float32Array(Na);for(let c=0;c<Na;c++)s[c*3]=e.x,s[c*3+1]=e.y,s[c*3+2]=e.z;const o=new wt;o.setAttribute("position",new Je(s,3)),o.setAttribute("alpha",new Je(a,1));const l=new ga(o,this._shaderMat.clone());this.group.add(l),this._active.push({line:l,geo:o,origin:e.clone(),dir:t,progress:0,lifetime:n,speed:i})}update(e){this._nextSpawn-=e,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=5+Math.random()*12);for(let t=this._active.length-1;t>=0;t--){const n=this._active[t];n.progress+=e;const i=n.progress/n.lifetime,s=n.speed*n.progress,a=n.geo.attributes.position.array,o=n.geo.attributes.alpha.array,l=i<.12?i/.12:i>.72?(1-i)/.28:1,c=n.origin.x+n.dir.x*s,h=n.origin.y+n.dir.y*s,u=n.origin.z+n.dir.z*s;for(let d=0;d<Na;d++){const f=d/(Na-1),p=f*jT;a[d*3]=c-n.dir.x*p,a[d*3+1]=h-n.dir.y*p,a[d*3+2]=u-n.dir.z*p,o[d]=Math.pow(1-f,1.6)*l*.95}n.geo.attributes.position.needsUpdate=!0,n.geo.attributes.alpha.needsUpdate=!0,n.progress>=n.lifetime&&(this.group.remove(n.line),n.geo.dispose(),n.line.material.dispose(),this._active.splice(t,1))}}}const JT=new C(-44,48,-166);function Gp(r="rgba(255,250,210,1)",e="rgba(255,180,80,0)"){const n=document.createElement("canvas");n.width=n.height=256;const i=n.getContext("2d"),s=i.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);s.addColorStop(0,r),s.addColorStop(.25,r),s.addColorStop(1,e),i.fillStyle=s,i.fillRect(0,0,256,256);const a=new t1(n);return a.colorSpace=nt,a}class ZT{constructor(){this.group=new Ue,this._pos=JT.clone(),this._t=0,this._core=new Ue,this._core.position.copy(this._pos),this.group.add(this._core),this._glows=[];const e=new tp(new _u({map:Gp("rgba(255,248,200,0.95)","rgba(255,170,70,0)"),transparent:!0,depthWrite:!1,blending:Yt}));e.scale.setScalar(46);const t=new tp(new _u({map:Gp("rgba(255,200,110,0.55)","rgba(255,120,40,0)"),transparent:!0,depthWrite:!1,blending:Yt}));t.scale.setScalar(95),this._core.add(t,e),this._glows.push({sprite:e,base:46},{sprite:t,base:95});const n=new ve(new Vi(6,2),new Zt({color:16776172,flatShading:!0}));this._core.add(n);const i=new ve(new Ot(6.1,24,24),new Zt({color:16773312,transparent:!0,opacity:.55,depthWrite:!1,blending:Yt,side:yi}));this._core.add(i),this._halos=[this._halo(7.6,16773024,.4),this._halo(10,16763989,.2),this._halo(15,16755251,.09)],this._haloBase=this._halos.map(s=>s.material.opacity),this._halos.forEach(s=>this._core.add(s))}_halo(e,t,n){return new ve(new Ot(e,18,18),new Zt({color:t,transparent:!0,opacity:n,depthWrite:!1,blending:Yt,side:ln}))}update(e,t,n=!1){if(n)return;this._t=t;const i=1+Math.sin(t*.6)*.035;this._core.scale.setScalar(i);const s=1+Math.sin(t*.6+.4)*.06;for(const a of this._glows)a.sprite.scale.setScalar(a.base*s);for(let a=0;a<this._halos.length;a++){const o=.85+.15*Math.sin(t*(.5+a*.18)+a);this._halos[a].material.opacity=this._haloBase[a]*o}}}const QT=[[230,200,8141549,3874406,.16],[240,230,16740277,4857429,.12],[225,180,3828735,1318485,.13],[245,260,10181887,2757968,.1],[220,150,16753226,4859152,.08]],eE=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,tE=`
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
`;class nE{constructor(){this.group=new Ue,this._mats=[];for(const[e,t,n,i,s]of QT){const a=new bn({uniforms:{colorA:{value:new oe(n)},colorB:{value:new oe(i)},opacity:{value:s},time:{value:Math.random()*100}},vertexShader:eE,fragmentShader:tE,transparent:!0,depthWrite:!1,blending:Yt,side:vn}),o=new ve(new Io(t,t),a),l=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);o.position.set(e*Math.sin(c)*Math.cos(l),e*Math.cos(c)*.7,e*Math.sin(c)*Math.sin(l)),o.lookAt(0,0,0),o.rotation.z=Math.random()*Math.PI*2,o.userData.spin=(Math.random()-.5)*.01,this.group.add(o),this._mats.push(a)}}update(e,t,n=!1){if(!n){for(const i of this._mats)i.uniforms.time.value=t;for(const i of this.group.children)i.rotation.z+=i.userData.spin*e}}}function iE(r,e){const t=r.attributes.position,n=new Float32Array(t.count*3);r.computeBoundingBox();const{min:i,max:s}=r.boundingBox,a=s.y-i.y||1,o=new oe;for(let l=0;l<t.count;l++){const c=(t.getY(l)-i.y)/a;let h=e[0][1];for(const[u,d]of e)c>=u&&(h=d);o.set(h),n[l*3]=o.r,n[l*3+1]=o.g,n[l*3+2]=o.b}r.setAttribute("color",new Je(n,3))}function Wp(r,e,t,n=.25){const i=r.attributes.position,s=new Float32Array(i.count*3),a=new oe(e),o=new oe(t),l=new oe;for(let c=0;c<i.count;c++)l.copy(Math.random()<n?o:a),s[c*3]=l.r,s[c*3+1]=l.g,s[c*3+2]=l.b;r.setAttribute("color",new Je(s,3))}class sE{constructor(){this.group=new Ue,this._bodies=[];{const e=new Vi(16,3);iE(e,[[0,9198140],[.18,13077330],[.36,14725232],[.55,13077330],[.72,14262366],[.88,11565120]]);const t=new ve(e,new Ct({vertexColors:!0,flatShading:!0,roughness:.9,metalness:0,emissive:2757893,emissiveIntensity:.4})),n=new ve(new vd(20,30,48),new Zt({color:15255702,transparent:!0,opacity:.35,side:vn,depthWrite:!1,blending:Yt}));n.rotation.x=Math.PI/2,this._add({x:-28,y:52,z:199},[t,n],.18,[.4,1,.15])}{const e=new Vi(7,2);Wp(e,12567756,8159884,.3);const t=new ve(e,new Ct({vertexColors:!0,flatShading:!0,roughness:1,metalness:0,emissive:1448482,emissiveIntensity:.6}));this._add({x:136,y:38,z:-85},[t],.12,[.2,1,.3])}{const e=new Vi(11,2);Wp(e,14706748,11026462,.22);const t=new ve(e,new Ct({vertexColors:!0,flatShading:!0,roughness:.85,metalness:0,emissive:3149829,emissiveIntensity:.45}));this._add({x:-169,y:30,z:6},[t],.22,[.1,1,.5])}}_add(e,t,n,i){const s=new Ue;s.position.set(e.x,e.y,e.z);for(const o of t)o.castShadow=!1,o.receiveShadow=!1,s.add(o);const a=new C(i[0],i[1],i[2]).normalize();this._bodies.push({pivot:s,ax:a,speed:n}),this.group.add(s)}update(e,t,n=!1){if(!n)for(const i of this._bodies)i.pivot.rotateOnAxis(i.ax,i.speed*e)}}const rE=11,Ru=70,Ol=110;function aE(r){const e=new Vi(r,0),t=e.attributes.position;for(let n=0;n<t.count;n++){const i=.7+Math.random()*.6;t.setXYZ(n,t.getX(n)*i,t.getY(n)*i,t.getZ(n)*i)}return e.computeVertexNormals(),e}function Xp(r){const e=Ru+Math.random()*(Ol-Ru),t=Math.random()*Math.PI*2,n=Math.acos(2*Math.random()-1);return r.set(e*Math.sin(n)*Math.cos(t),e*Math.cos(n),e*Math.sin(n)*Math.sin(t))}const qp=[7234136,8022620,6051408,8613983];class oE{constructor(){this.group=new Ue,this._rocks=[];for(let e=0;e<rE;e++){const t=.7+Math.random()*1.4,n=new ve(aE(t),new Ct({color:qp[e%qp.length],flatShading:!0,roughness:1,metalness:0,emissive:657934,emissiveIntensity:.5}));n.castShadow=n.receiveShadow=!1,Xp(n.position),this._rocks.push({mesh:n,vel:new C((Math.random()-.5)*2.4,(Math.random()-.5)*1.2,(Math.random()-.5)*2.4),spin:new C((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5)}),this.group.add(n)}}update(e,t,n=!1){if(!n)for(const i of this._rocks){const s=i.mesh.position;s.addScaledVector(i.vel,e),i.mesh.rotation.x+=i.spin.x*e,i.mesh.rotation.y+=i.spin.y*e,i.mesh.rotation.z+=i.spin.z*e,s.lengthSq()>Ol*Ol*1.6&&Xp(s).multiplyScalar(-1).clampLength(Ru,Ol)}}}const lE=80,jp=["ufo","ufo","rocket","satellite"];function cE(){const r=new Ue,e=c=>new Ct({color:c,flatShading:!0,roughness:.5,metalness:.4}),t=new ve(new zi(2.6,1,18),e(10135224));t.rotation.x=Math.PI,t.position.y=-.3;const n=new ve(new zi(2.2,.7,18),e(12174290));n.position.y=.2;const i=new ve(new Ot(1.1,16,12,0,Math.PI*2,0,Math.PI/2),new Ct({color:9430015,transparent:!0,opacity:.55,flatShading:!0,emissive:2780808,emissiveIntensity:.5}));i.position.y=.45,r.add(t,n,i);const s=[],a=new Ot(.22,8,8),o=8;for(let c=0;c<o;c++){const h=c/o*Math.PI*2,u=new ve(a,new Zt({color:16769126,transparent:!0,opacity:1,blending:Yt,depthWrite:!1}));u.position.set(Math.cos(h)*2.5,-.15,Math.sin(h)*2.5),r.add(u),s.push(u)}const l=new ve(new zi(2.4,7,18,1,!0),new Zt({color:10413823,transparent:!0,opacity:.12,side:vn,depthWrite:!1,blending:Yt}));return l.position.y=-4,l.rotation.x=Math.PI,r.add(l),r.userData.tick=c=>{for(let h=0;h<s.length;h++)s[h].material.opacity=.25+.75*(.5+.5*Math.sin(c*6-h*.9));l.material.opacity=.09+.06*(.5+.5*Math.sin(c*2.5))},r.userData.flat=!0,r}function hE(){const r=new Ue,e=new Ue;e.rotation.x=Math.PI/2,r.add(e);const t=new ve(new _a(.55,.7,3.2,14),new Ct({color:15921909,flatShading:!0,roughness:.6})),n=new ve(new zi(.55,1.3,14),new Ct({color:15224890,flatShading:!0,roughness:.6}));n.position.y=2.25,e.add(t,n);const i=new Ct({color:15224890,flatShading:!0,roughness:.6});for(let a=0;a<3;a++){const o=new ve(new zi(.5,1.2,4),i),l=a/3*Math.PI*2;o.position.set(Math.cos(l)*.7,-1.4,Math.sin(l)*.7),o.rotation.y=-l,e.add(o)}const s=new ve(new zi(.45,1.6,12),new Zt({color:16757322,transparent:!0,opacity:.9,blending:Yt,depthWrite:!1}));return s.rotation.x=Math.PI,s.position.y=-2.4,e.add(s),r.userData.tick=a=>{const o=.7+.3*Math.sin(a*30);s.scale.set(.8+.4*Math.random(),o+.4*Math.random(),.8+.4*Math.random()),s.material.opacity=.7+.3*Math.random()},r.userData.flat=!1,r}function uE(){const r=new Ue,e=new ve(new vi(1.1,1.1,1.6),new Ct({color:13217914,flatShading:!0,roughness:.7,metalness:.3}));r.add(e);const t=new Ct({color:2908078,flatShading:!0,roughness:.4,metalness:.5,emissive:662074,emissiveIntensity:.4});for(const i of[-1,1]){const s=new ve(new vi(2.6,.06,1.2),t);s.position.x=i*2,r.add(s)}const n=new ve(new Ot(.5,12,8,0,Math.PI*2,0,Math.PI/2),new Ct({color:15263980,flatShading:!0,roughness:.5}));return n.position.set(0,.7,.4),r.add(n),r.userData.tumble=new C(.2,.35,.1),r.userData.tick=null,r.userData.flat=!0,r}const dE={ufo:cE,rocket:hE,satellite:uE},Yp=new C;function $p(r,e,t,n){return n.set(r*Math.sin(t)*Math.cos(e),r*Math.cos(t),r*Math.sin(t)*Math.sin(e))}class fE{constructor(){this.group=new Ue,this._active=[],this._nextSpawn=2+Math.random()*4}_spawn(){const e=jp[Math.random()*jp.length|0],t=dE[e](),n=e==="ufo"?1:e==="rocket"?.9:.8;t.scale.setScalar(n);const i=lE*(.8+Math.random()*.5),s=.5+Math.random()*.7,a=Math.random()*Math.PI*2,o=a+(Math.PI*.6+Math.random()*Math.PI*.7)*(Math.random()<.5?1:-1),l=$p(i,a,s,new C),c=$p(i,o,s,new C),h=l.clone().add(c).multiplyScalar(.5).multiplyScalar(1.25);h.y+=20+Math.random()*25;const u=new pd(l,h,c);this.group.add(t),this._active.push({craft:t,curve:u,type:e,age:0,life:10+Math.random()*8,bob:Math.random()*Math.PI*2})}update(e,t,n=!1){if(!n){this._nextSpawn-=e,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=7+Math.random()*10);for(let i=this._active.length-1;i>=0;i--){const s=this._active[i];s.age+=e;const a=s.age/s.life;if(a>=1){this._dispose(s),this._active.splice(i,1);continue}const o=s.craft.userData;s.curve.getPoint(a,s.craft.position),o.flat?(s.craft.position.y+=Math.sin(t*1.5+s.bob)*.8,s.craft.rotation.z=Math.sin(t*.8+s.bob)*.15,s.craft.rotation.y+=e*.4,o.tumble&&(s.craft.rotation.x+=o.tumble.x*e,s.craft.rotation.y+=o.tumble.y*e,s.craft.rotation.z+=o.tumble.z*e)):(s.curve.getPoint(Math.min(1,a+.01),Yp),s.craft.lookAt(Yp));const l=Math.min(1,a/.08,(1-a)/.08);this._setOpacity(s.craft,l),o.tick&&o.tick(t,e)}}}_setOpacity(e,t){e.traverse(n=>{if(!n.isMesh)return;const i=n.material;i.transparent?(i.userData.baseOpacity===void 0&&(i.userData.baseOpacity=i.opacity),i.opacity=i.userData.baseOpacity*t):n.visible=t>.02})}_dispose(e){this.group.remove(e.craft),e.craft.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material.dispose())})}}const Ls=60,pE=60,Kp=150,mE=`
  attribute float alpha;
  attribute float mixv;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vAlpha = alpha; vMix = mixv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,gE=`
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec3 head = vec3(1.0, 0.97, 0.85);   // warm white
    vec3 tail = vec3(0.45, 0.85, 1.0);   // cyan
    gl_FragColor = vec4(mix(head, tail, vMix), vAlpha);
  }
`,Oa=new C,xl=new C;function Jp(r,e,t,n){return n.set(r*Math.sin(t)*Math.cos(e),r*Math.cos(t),r*Math.sin(t)*Math.sin(e))}class _E{constructor(){this.group=new Ue,this._active=null,this._nextSpawn=15+Math.random()*20,this._tailMat=new bn({vertexShader:mE,fragmentShader:gE,transparent:!0,depthWrite:!1,blending:Yt})}_spawn(){const e=.4+Math.random()*.5,t=Math.random()*Math.PI*2,n=t+(Math.PI*.7+Math.random()*Math.PI*.6)*(Math.random()<.5?1:-1),i=Jp(Kp,t,e,new C),s=Jp(Kp,n,e,new C),a=i.clone().add(s).multiplyScalar(.5);a.y+=30;const o=new pd(i,a,s),l=new Float32Array(Ls*3),c=new Float32Array(Ls),h=new Float32Array(Ls);for(let p=0;p<Ls;p++)h[p]=p/(Ls-1);const u=new wt;u.setAttribute("position",new Je(l,3)),u.setAttribute("alpha",new Je(c,1)),u.setAttribute("mixv",new Je(h,1));const d=new ga(u,this._tailMat),f=new Ue;f.add(new ve(new Ot(1.1,12,12),new Zt({color:16776688,blending:Yt,depthWrite:!1,transparent:!0}))),f.add(new ve(new Ot(3,16,16),new Zt({color:13625599,transparent:!0,opacity:.35,blending:Yt,depthWrite:!1,side:ln}))),this.group.add(d,f),this._active={curve:o,line:d,geo:u,head:f,age:0,life:5.5}}update(e,t,n=!1){if(n)return;if(!this._active){this._nextSpawn-=e,this._nextSpawn<=0&&(this._spawn(),this._nextSpawn=35+Math.random()*35);return}const i=this._active;i.age+=e;const s=Math.min(1,i.age/i.life);i.curve.getPoint(s,Oa),i.curve.getTangent(s,xl),i.head.position.copy(Oa);const a=Math.min(1,s/.12,(1-s)/.18),o=i.geo.attributes.position.array,l=i.geo.attributes.alpha.array;for(let c=0;c<Ls;c++){const h=c/(Ls-1),u=h*pE;o[c*3]=Oa.x-xl.x*u,o[c*3+1]=Oa.y-xl.y*u,o[c*3+2]=Oa.z-xl.z*u,l[c]=Math.pow(1-h,1.5)*a}i.geo.attributes.position.needsUpdate=!0,i.geo.attributes.alpha.needsUpdate=!0,i.head.scale.setScalar(a),s>=1&&(this.group.remove(i.line,i.head),i.geo.dispose(),i.head.traverse(c=>{c.isMesh&&(c.geometry.dispose(),c.material.dispose())}),this._active=null)}}const Zp=48,vE=34,Qp=Math.PI*1.15,yE=`
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
`,xE=`
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
`;class ME{constructor(){this.group=new Ue,this._mat=new bn({uniforms:{time:{value:Math.random()*100},motion:{value:1}},vertexShader:yE,fragmentShader:xE,transparent:!0,depthWrite:!1,blending:Yt,side:vn});const e=new _a(Zp,Zp,vE,96,12,!0,-Qp/2,Qp),t=new ve(e,this._mat);t.position.y=14,this.group.add(t)}update(e,t,n=!1){this._mat.uniforms.motion.value=n?0:1,n||(this._mat.uniforms.time.value=t)}}class SE{constructor(){this.group=new Ue,this.sun=new ZT,this.nebula=new nE,this.bodies=new sE,this.asteroids=new oE,this.flyers=new fE,this.comet=new _E,this.aurora=new ME,this._children=[this.sun,this.nebula,this.bodies,this.asteroids,this.flyers,this.comet,this.aurora];for(const e of this._children)this.group.add(e.group)}update(e,t,n=!1){for(const i of this._children)i.update(e,t,n)}}const bE={arctic_island:{count:35,color:[.82,.92,1],pixelSize:2.5,motionType:0,shapeType:0,spread:4,fallTop:5.2,fallBot:.3,driftAmp:.12,windDrift:0,speedMid:.38,speedVar:.12},desert_island:{count:50,color:[.95,.76,.42],pixelSize:1.6,motionType:1,shapeType:0,spread:4,swirlSpd:2,bobAmp:.2,speedMid:1,speedVar:.45},meadow_island:{count:25,color:[.8,1,.45],pixelSize:2.8,motionType:2,shapeType:1,spread:3.5,driftAmp:5,bobAmp:.55,speedMid:.38,speedVar:.14},mountain_island:{count:40,color:[1,.7,.78],pixelSize:3.5,motionType:0,shapeType:1,spread:4.5,fallTop:5.5,fallBot:.3,driftAmp:1.2,windDrift:2.5,speedMid:.43,speedVar:.17},lava_island:{count:28,color:[.62,.88,.62],pixelSize:4.6,motionType:0,shapeType:3,spread:4,fallTop:7,fallBot:.3,driftAmp:.65,windDrift:.6,speedMid:.27,speedVar:.11},pirate_ship:{count:20,color:[1,.86,.18],pixelSize:3.6,motionType:3,shapeType:2,spread:2.5,speedMid:.65,speedVar:.3}},wE=`
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
`,TE=`
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
`;new C;class EE{constructor(){this._systems={},this._group=new Ue;for(const[e,t]of Object.entries(bE)){const n=this._buildSystem(t);this._systems[e]=n,this._group.add(n.points)}}get group(){return this._group}_buildSystem(e){const t=e.count,n=new Float32Array(t*3),i=new Float32Array(t*2),s=new Float32Array(t),a=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t);for(let f=0;f<t;f++){const p=Math.random()*Math.PI*2,_=Math.sqrt(Math.random())*e.spread;i[f*2]=Math.cos(p)*_,i[f*2+1]=Math.sin(p)*_,s[f]=Math.random()*Math.PI*2,a[f]=Math.max(.05,e.speedMid+(Math.random()*2-1)*e.speedVar),o[f]=e.pixelSize*(.55+Math.random()*.9),l[f]=.45+Math.random()*.55}const c=new wt;c.setAttribute("position",new Je(n,3)),c.setAttribute("aBase",new Je(i,2)),c.setAttribute("aPhase",new Je(s,1)),c.setAttribute("aSpeed",new Je(a,1)),c.setAttribute("aSize",new Je(o,1)),c.setAttribute("aBaseAlpha",new Je(l,1));const h={uTime:{value:0},uOpacity:{value:0},uCenter:{value:new C(0,26,0)},uColor:{value:new C(...e.color)},uMotion:{value:e.motionType},uShape:{value:e.shapeType},uFallTop:{value:e.fallTop??5},uFallBot:{value:e.fallBot??.3},uDriftAmp:{value:e.driftAmp??.8},uWindDrift:{value:e.windDrift??0},uSwirlSpd:{value:e.swirlSpd??1.8},uBobAmp:{value:e.bobAmp??.22}},u=new bn({uniforms:h,vertexShader:wE,fragmentShader:TE,transparent:!0,depthWrite:!1,blending:Yt}),d=new ud(c,u);return d.frustumCulled=!1,d.visible=!1,{points:d,uniforms:h}}update(e,t,n,i,s){if(i){for(const o of Object.values(this._systems))o.points.visible=!1;return}const a=performance.now()*.001;for(const[o,l]of Object.entries(this._systems)){const{points:c,uniforms:h}=l,u=o===t;if(h.uOpacity.value+=((u?1:0)-h.uOpacity.value)*Math.min(1,e*2.5),h.uOpacity.value<.01){c.visible=!1;continue}if(s&&s[o]){const d=s[o];h.uCenter.value.set(d.x*n,d.y*n,d.z*n)}else h.uCenter.value.set(0,n,0);c.visible=!0,h.uTime.value=a}}}function AE(r,e=document){return typeof r=="string"?Array.from(e.querySelectorAll(r)):r instanceof Element?[r]:r instanceof NodeList?Array.from(r):r instanceof Array?r:[]}function RE(r){const e=document.createElement("div");e.className=`scrollama__debug-step ${r}`,e.style.position="fixed",e.style.left="0",e.style.width="100%",e.style.zIndex="9999",e.style.borderTop="2px solid black",e.style.borderBottom="2px solid black";const t=document.createElement("p");return t.style.position="absolute",t.style.left="0",t.style.height="1px",t.style.width="100%",t.style.borderTop="1px dashed black",e.appendChild(t),document.body.appendChild(e),e}function CE({id:r,step:e,marginTop:t}){const{index:n,height:i}=e,s=`scrollama__debug-step--${r}-${n}`;let a=document.querySelector(`.${s}`);a||(a=RE(s)),a.style.top=`${t*-1}px`,a.style.height=`${i}px`,a.querySelector("p").style.top=`${i/2}px`}function PE(){const r="abcdefghijklmnopqrstuvwxyz",e=Date.now(),t=[];for(let n=0;n<6;n+=1){const i=r[Math.floor(Math.random()*r.length)];t.push(i)}return`${t.join("")}${e}`}function Ml(r){console.error(`scrollama error: ${r}`)}function Ba(r){return+r.getAttribute("data-scrollama-index")}function LE(r,e){const t=Math.ceil(r/e),n=[],i=1/t;for(let s=0;s<t+1;s+=1)n.push(s*i);return n}function gh(r){if(typeof r=="string"&&r.indexOf("px")>0){const e=+r.replace("px","");return isNaN(e)?(err("offset value must be in 'px' format. Fallback to 0.5."),{format:"percent",value:.5}):{format:"pixels",value:e}}else if(typeof r=="number"||!isNaN(+r))return r>1&&err("offset value is greater than 1. Fallback to 1."),r<0&&err("offset value is lower than 0. Fallback to 0."),{format:"percent",value:Math.min(Math.max(0,r),1)};return null}function IE(r){r.forEach(e=>e.node.setAttribute("data-scrollama-index",e.index))}function DE(r){const{top:e}=r.getBoundingClientRect(),t=window.pageYOffset,n=document.body.clientTop||0;return e+t-n}let Fr,Bl,Fi;function e_(r){const e=r?r.scrollTop:window.pageYOffset;Fr!==e&&(Fr=e,Fr>Bl?Fi="down":Fr<Bl&&(Fi="up"),Bl=Fr)}function FE(r){Fr=0,Bl=0,document.addEventListener("scroll",()=>e_(r))}function UE(){let r={},e=PE(),t=[],n,i,s,a=0,o=!1,l=!1,c=!1,h=!1,u=[];function d(){r={stepEnter:()=>{},stepExit:()=>{},stepProgress:()=>{}},u=[]}function f(D){D&&!o&&F(),!D&&o&&E(),o=D}function p(D,z){const N=Ba(D),G=t[N];z!==void 0&&(G.progress=z);const V={element:D,index:N,progress:z,direction:Fi};G.state==="enter"&&r.stepProgress(V)}function _(D,z=!0){const N=Ba(D),G=t[N],V={element:D,index:N,direction:Fi};G.direction=Fi,G.state="enter",u[N]||r.stepEnter(V),h&&(u[N]=!0)}function g(D,z=!0){const N=Ba(D),G=t[N];if(!G.state)return!1;const V={element:D,index:N,direction:Fi};l&&(Fi==="down"&&G.progress<1?p(D,1):Fi==="up"&&G.progress>0&&p(D,0)),G.direction=Fi,G.state="exit",r.stepExit(V)}function m([D]){const z=Ba(D.target),N=t[z],G=D.target.offsetHeight;G!==N.height&&(N.height=G,v(N),R(N),b(N))}function x([D]){e_(i);const{isIntersecting:z,target:N}=D;z?_(N):g(N)}function y([D]){const z=Ba(D.target),N=t[z],{isIntersecting:G,intersectionRatio:V,target:$}=D;G&&N.state==="enter"&&p($,V)}function v({observers:D}){Object.keys(D).map(z=>{D[z].disconnect()})}function E(){t.forEach(v)}function b(D){const z=new ResizeObserver(m);z.observe(D.node),D.observers.resize=z}function T(){t.forEach(b)}function R(D){const z=window.innerHeight,N=D.offset||n,G=N.format==="pixels"?1:z,V=N.value*G,$=D.height/2-V,ne=D.height/2-(z-V),q={rootMargin:`${$}px 0px ${ne}px 0px`,threshold:.5,root:s},Z=new IntersectionObserver(x,q);Z.observe(D.node),D.observers.step=Z,c&&CE({id:e,step:D,marginTop:$})}function M(){t.forEach(R)}function S(D){const z=window.innerHeight,N=D.offset||n,G=N.format==="pixels"?1:z,V=N.value*G,$=-V+D.height,ne=V-z,de=`${$}px 0px ${ne}px 0px`,we=LE(D.height,a),Ce={rootMargin:de,threshold:we},q=new IntersectionObserver(y,Ce);q.observe(D.node),D.observers.progress=q}function L(){t.forEach(S)}function F(){E(),T(),M(),l&&L()}const I={};return I.setup=({step:D,parent:z,offset:N=.5,threshold:G=4,progress:V=!1,once:$=!1,debug:ne=!1,container:de=void 0,root:we=null})=>(FE(de),t=AE(D,z).map((Ce,q)=>({index:q,direction:void 0,height:Ce.offsetHeight,node:Ce,observers:{},offset:gh(Ce.dataset.offset),top:DE(Ce),progress:0,state:void 0})),t.length?(l=V,h=$,c=ne,a=Math.max(1,+G),n=gh(N),i=de,s=we,d(),IE(t),f(!0),I):(Ml("no step elements"),I)),I.enable=()=>(f(!0),I),I.disable=()=>(f(!1),I),I.destroy=()=>(f(!1),d(),I),I.resize=()=>(F(),I),I.offset=D=>D==null?n.value:(n=gh(D),F(),I),I.onStepEnter=D=>(typeof D=="function"?r.stepEnter=D:Ml("onStepEnter requires a function"),I),I.onStepExit=D=>(typeof D=="function"?r.stepExit=D:Ml("onStepExit requires a function"),I),I.onStepProgress=D=>(typeof D=="function"?r.stepProgress=D:Ml("onStepProgress requires a function"),I),I}const t_="./",NE=[{label:"Languages",items:[{k:"python",n:"Python"},{k:"java",n:"Java"},{k:"c",n:"C"},{k:"cpp",n:"C++"},{k:"csharp",n:"C#"},{k:"javascript",n:"JavaScript"},{k:"typescript",n:"TypeScript"},{k:"haskell",n:"Haskell"},{k:"bash",n:"Bash"},{m:"MIPS",n:"MIPS Assembly"}]},{label:"Frontend & Creative Web",items:[{k:"react",n:"React"},{k:"nodejs",n:"Node.js"},{k:"express",n:"Express",inv:!0},{k:"flask",n:"Flask",inv:!0},{m:"JSP",n:"JSP"},{k:"html5",n:"HTML5"},{k:"css3",n:"CSS3"},{k:"threejs",n:"Three.js"},{k:"d3",n:"D3.js"},{k:"gsap",n:"GSAP",inv:!0}]},{label:"Data & AI",items:[{k:"pandas",n:"pandas"},{k:"numpy",n:"NumPy"},{k:"matplotlib",n:"Matplotlib"},{k:"scikitlearn",n:"scikit-learn"},{k:"pytorch",n:"PyTorch"},{k:"huggingface",n:"Hugging Face"}]},{label:"Search, Databases & Infra",items:[{k:"elasticsearch",n:"Elasticsearch"},{k:"kibana",n:"Kibana"},{k:"logstash",n:"Logstash",inv:!0},{k:"postgresql",n:"PostgreSQL"},{k:"mysql",n:"MySQL"},{k:"oracle",n:"Oracle DB"},{k:"docker",n:"Docker"},{k:"kubernetes",n:"Kubernetes"},{k:"linux",n:"Linux"},{k:"nginx",n:"Nginx"},{k:"git",n:"Git"}]},{label:"Robotics & Hardware",items:[{k:"ros",n:"ROS 2",inv:!0},{m:"TB",n:"TurtleBot"},{k:"raspberrypi",n:"Raspberry Pi"},{k:"arduino",n:"Arduino"}]},{label:"3D, CAD & Fabrication",items:[{k:"blender",n:"Blender"},{k:"unity",n:"Unity",inv:!0},{m:"F360",n:"Fusion 360"},{k:"openscad",n:"OpenSCAD",inv:!0},{m:"BL",n:"Bambu Lab"},{m:"UM",n:"Ultimaker"},{m:"xT",n:"xTool"}]},{label:"Tools & Ways of Working",items:[{k:"postman",n:"Postman"},{k:"jira",n:"Jira"},{k:"confluence",n:"Confluence"},{k:"figma",n:"Figma"},{m:"SAFe",n:"SAFe Agile"},{m:"MOS",n:"MOS Certified"}]}];function OE(r,e){const t=r.k?`<span class="tech-logo"><img src="${t_}tech/${r.k}.svg" alt="" loading="lazy" width="36" height="36" draggable="false"></span>`:`<span class="tech-logo tech-mono">${r.m}</span>`;return`
    <figure class="tech-chip${r.inv?" tech-chip--invert":""}" style="--i:${e}">
      ${t}
      <figcaption class="tech-name">${r.n}</figcaption>
    </figure>`}const BE=`
  <div class="tech-layout">
    <aside class="tech-photo" style="background-image:url('${t_}islandphoto/arcticislandphoto.jpeg')">
      <div class="tech-photo-cap">
        <span class="tech-photo-eyebrow">Field notes</span>
        <span class="tech-photo-line">Out on the glacier</span>
      </div>
    </aside>
    <div class="tech-groups">
      ${NE.map(r=>`
        <section class="tech-group">
          <h3 class="tech-group-label">
            <span>${r.label}</span>
            <span class="tech-group-count">${r.items.length}</span>
          </h3>
          <div class="tech-grid">${r.items.map(OE).join("")}</div>
        </section>
      `).join("")}
    </div>
  </div>
`;let Is=null;function _h(r){const e=r.getBoundingClientRect();r.querySelectorAll(".tech-group:not(.is-in)").forEach(t=>{const n=t.getBoundingClientRect();n.top<e.bottom-40&&n.bottom>e.top&&t.classList.add("is-in")})}function kE(r){const e=r.querySelectorAll(".tech-group");if(!e.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.forEach(n=>n.classList.add("is-in"));return}if(Is){try{Is.destroy()}catch{}Is=null}Is=UE(),Is.setup({step:".tech-group",offset:.85,once:!0}).onStepEnter(({element:n})=>n.classList.add("is-in")),requestAnimationFrame(()=>requestAnimationFrame(()=>{_h(r),Is&&Is.resize()}));const t=r.querySelector(".tech-groups")||r;t.addEventListener("scroll",()=>_h(r),{passive:!0}),t!==r&&r.addEventListener("scroll",()=>_h(r),{passive:!0})}const em="./";var Xm;const zE=(Xm=window.matchMedia)==null?void 0:Xm.call(window,"(prefers-reduced-motion: reduce)").matches,Hs=[{slug:"erics-world",title:"Eric's World",year:"2026",role:"Creative Dev",blurb:"The 3D walkable planet you're standing on right now — a Little Prince-inspired portfolio, fully procedural, built from Three.js primitives and a hand-rolled glass UI.",tags:["Three.js","Vite","GLSL"],accent:"#FF8A65",href:"https://erriiiccccccc.github.io",repo:"https://github.com/erriiiccccccc/erriiiccccccc.github.io"},{slug:"foundtech",title:"FoundTech",year:"2024",role:"Web Dev",blurb:"A clean, responsive marketing site for a Malaysian tech company — built and shipped live, with a smooth scrolling story from hero to footer.",tags:["Web","Responsive","Frontend"],accent:"#26C6DA",href:"https://foundtech.com.my"},{slug:"petaling-utama",title:"Petaling Utama Motor",year:"2024",role:"Full-Stack",blurb:"Full-stack e-commerce site for a real Malaysian motor business — live and in production, handling a real catalogue and real customers.",tags:["React","Node.js","PostgreSQL","Nginx"],accent:"#4CAF50",href:"https://petalingutamamotor.com"},{slug:"medmatch",title:"MedMatch",year:"2024",role:"Web Dev",blurb:"A matching platform that connects medical students with clinicians through verified profiles, purpose-built matching, and streamlined selection — research, without the friction.",tags:["Web","Platform","Frontend"],accent:"#EC407A",href:"https://www.medmatch.institute"},{slug:"ygo",title:"YGo Tours",year:"2024",role:"Web Dev",blurb:"A polished site for a Kuala Lumpur travel agency (est. 1994) — private journeys, corporate incentives, and specialty trips, presented with an editorial, magazine-style feel.",tags:["Web","Editorial","Frontend"],accent:"#7E57C2",href:"https://ygowebsite.vercel.app"},{slug:"sotwds",title:"Scotland on the Web",year:"2024",role:"Data Story",blurb:"A scrollytelling data story reading two web-archiving systems side by side — a manually curated seed list vs an automated stream — to surface what each kind of memory infrastructure preserves and misses.",tags:["Scrollytelling","Data Viz","D3"],accent:"#29B6F6",href:"https://sotwds.vercel.app"},{slug:"elk-pipeline",title:"ELK Logging Pipeline",year:"2023",role:"Internship",blurb:"An Elasticsearch + Kibana + Logstash pipeline on Oracle Linux for a fintech platform at Finexus — turning raw server logs into searchable, alertable dashboards.",tags:["Elasticsearch","Kibana","Linux"],accent:"#64B5F6"},{slug:"blender",title:"First Blender Project",year:"2023",role:"Personal",blurb:"Dove into 3D modeling and built a full scene from scratch — lighting, materials, the lot. Pretty proud of how it turned out for a first go.",tags:["Blender","3D Art"],accent:"#FBBF24"},{slug:"ada-hack",title:"Ada Hack 2022 — HumanEd",year:"2022",role:"Hackathon",blurb:"Hackathon winner at the University of Edinburgh, built for the Rubik's Cube Painting Challenge under a tight 24-hour clock.",tags:["Hackathon"],accent:"#7C3AED",badge:"Winner"}],Ws=r=>String(r).padStart(2,"0");function VE(r,e){const t=r.tags.slice(0,3).join(" · ");return`
    <button class="pj-item${e===0?" is-active":""}" type="button" role="tab"
            aria-selected="${e===0}" data-i="${e}" style="--pc:${r.accent}">
      <span class="pj-item-index">${Ws(e+1)}</span>
      <span class="pj-item-main">
        <span class="pj-item-title">${r.title}</span>
        <span class="pj-item-meta">${t}</span>
      </span>
      ${r.badge?`<span class="pj-item-badge">${tt("trophy",12)}</span>`:""}
      <span class="pj-item-go">${tt("arrowRight",16)}</span>
    </button>`}const HE=`
  <div class="pj-spread" style="--pc:${Hs[0].accent}">
    <section class="pj-feature" aria-live="polite">
      <div class="pj-stage">
        <div class="pj-stage-glow" aria-hidden="true"></div>
        <span class="pj-stage-index" aria-hidden="true">${Ws(1)}</span>
        <div class="pj-stage-ph" aria-hidden="true">${tt("mountain",52)}</div>
        <img class="pj-stage-poster" alt="" aria-hidden="true" />
        <video class="pj-stage-video" muted loop playsinline preload="none"></video>
        <span class="pj-stage-badge" hidden>${tt("trophy",13)} <span class="pj-stage-badge-txt"></span></span>
      </div>
      <div class="pj-feature-body">
        <div class="pj-feature-eyebrow">
          <span class="pj-kicker">Featured</span>
          <span class="pj-counter">${Ws(1)} / ${Ws(Hs.length)}</span>
        </div>
        <h3 class="pj-feature-title"></h3>
        <div class="pj-feature-sub"></div>
        <p class="pj-feature-blurb"></p>
        <div class="pj-feature-tags"></div>
        <div class="pj-feature-links"></div>
      </div>
    </section>

    <div class="pj-list" role="tablist" aria-label="Projects" aria-orientation="vertical">
      ${Hs.map(VE).join("")}
    </div>
  </div>
`;function GE(r){const e=r.querySelector(".pj-spread");if(!e)return;const t=[...r.querySelectorAll(".pj-item")],n=r.querySelector(".pj-feature"),i=r.querySelector(".pj-stage"),s=r.querySelector(".pj-stage-video"),a=r.querySelector(".pj-stage-poster"),o=r.querySelector(".pj-stage-index"),l=r.querySelector(".pj-stage-badge"),c=r.querySelector(".pj-stage-badge-txt"),h=r.querySelector(".pj-feature-title"),u=r.querySelector(".pj-feature-sub"),d=r.querySelector(".pj-feature-blurb"),f=r.querySelector(".pj-feature-tags"),p=r.querySelector(".pj-feature-links"),_=r.querySelector(".pj-counter");let g=-1;const m=(y,v)=>{e.style.setProperty("--pc",y.accent),o.textContent=Ws(v+1),_.textContent=`${Ws(v+1)} / ${Ws(Hs.length)}`,h.textContent=y.title,u.innerHTML=`<span>${y.role}</span><span class="pj-dot"></span><span>${y.year}</span>`,d.textContent=y.blurb,f.innerHTML=y.tags.map(R=>`<span class="tag">${R}</span>`).join("")+(y.badge?`<span class="tag tag--accent">${tt("trophy",13)} ${y.badge}</span>`:"");const E=[y.href?`<a class="pj-btn pj-btn--primary" href="${y.href}" target="_blank" rel="noopener noreferrer">${tt("external",15)} Visit live</a>`:"",y.repo?`<a class="pj-btn" href="${y.repo}" target="_blank" rel="noopener noreferrer">${tt("github",15)} Source</a>`:""].filter(Boolean).join("");p.innerHTML=E,s.pause(),s.removeAttribute("src"),s.load(),a.removeAttribute("src"),i.classList.remove("has-media","has-poster");const b=`${em}projects/${y.slug}.jpg`,T=`${em}projects/${y.slug}.webm`;a.onload=()=>i.classList.add("has-poster"),a.onerror=()=>i.classList.remove("has-poster"),a.src=b,s.poster=b,s.muted=!0,s.playsInline=!0,s.src=T,s.oncanplay=()=>{i.classList.add("has-media"),s.play().catch(()=>{})},s.onerror=()=>i.classList.remove("has-media"),s.play().catch(()=>{}),y.badge?(c.textContent=y.badge,l.hidden=!1):l.hidden=!0},x=(y,v=!1)=>{if(y===g)return;if(g=y,t.forEach((b,T)=>{const R=T===y;b.classList.toggle("is-active",R),b.setAttribute("aria-selected",String(R))}),v&&t[y].focus(),zE){m(Hs[y],y);return}n.classList.add("is-swapping");const E=()=>{m(Hs[y],y),requestAnimationFrame(()=>n.classList.remove("is-swapping"))};clearTimeout(x._t),x._t=setTimeout(E,150)};t.forEach((y,v)=>{y.addEventListener("click",()=>x(v))}),e.addEventListener("keydown",y=>{const v=y.key;v==="ArrowDown"||v==="ArrowRight"?(y.preventDefault(),x((g+1)%t.length,!0)):v==="ArrowUp"||v==="ArrowLeft"?(y.preventDefault(),x((g-1+t.length)%t.length,!0)):v==="Home"?(y.preventDefault(),x(0,!0)):v==="End"&&(y.preventDefault(),x(t.length-1,!0))}),m(Hs[0],0),g=0}const WE="./",XE=[{year:"2026",role:"Teaching Assistant",org:"University of Edinburgh",mono:"UoE",logo:"uoe.svg",desc:"System Design & Mobile Robotics, guiding students through architecture and robotics labs."},{year:"2025",role:"Technology Analyst Intern",org:"Barclays",mono:"B",logo:"barclays.svg",desc:"Automated a 45-minute manual workflow down to near-instant."},{year:"2024–25",role:"AI Coding Trainer",org:"Outlier",mono:"O",desc:"Trained and evaluated LLM coding outputs."},{year:"2024–25",role:"Full-Stack Developer",org:"Freelance",mono:"PUM",desc:"Built & deployed petalingutamamotor.com end-to-end."},{year:"2024",role:"Technology Spring Intern",org:"BlackRock",mono:"BR",logo:"blackrock.svg",desc:"Aladdin engineering operations & systems."},{year:"2023",role:"Software Engineer Intern",org:"Finexus Group",mono:"F",desc:"ELK pipeline with a Java EE + Python backend."},{year:"2023–24",role:"Marketing Executive",org:"AMEU",mono:"A",desc:"Grew to 6,000+ accounts and a 120% engagement increase."}];function qE(r,e){const t=e===0?" exp-item--now":"",n=r.logo?`<img class="exp-logo" src="${WE}experience/${r.logo}" alt="${r.org} logo" loading="lazy" onerror="this.remove()">`:"";return`
    <li class="exp-item${t}">
      <span class="exp-tile">${n}<span class="exp-mono">${r.mono}</span></span>
      <div class="exp-content">
        <div class="exp-headline">
          <h4 class="exp-role">${r.role}</h4>
          ${e===0?'<span class="exp-now">Now</span>':""}
        </div>
        <div class="exp-meta">${r.org} · ${r.year}</div>
        <p class="exp-desc">${r.desc}</p>
      </div>
    </li>`}const jE=`
  <ol class="exp-list">
    ${XE.map(qE).join("")}
  </ol>
`,YE="./",n_="a6074af4-eff5-4f1f-8ffe-b1f0fcf63f9a",$E=!n_.startsWith("YOUR_"),KE=[["mail","Email","ericng8766@gmail.com","mailto:ericng8766@gmail.com"],["linkedin","LinkedIn","in/erriiiccccccc","https://www.linkedin.com/in/erriiiccccccc/"],["github","GitHub","erriiiccccccc","https://github.com/erriiiccccccc"],["instagram","Instagram","@ericccc____","https://www.instagram.com/ericccc____/"]],JE=KE.map(([r,e,t,n])=>`
  <a class="contact-row" href="${n}"${n.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""}>
    <span class="contact-ic">${tt(r,18)}</span>
    <span class="contact-meta">
      <span class="contact-label">${e}</span>
      <span class="contact-text">${t}</span>
    </span>
    <span class="contact-go">${tt("arrowRight",16)}</span>
  </a>`).join(""),ZE=$E?`
  <form class="contact-form" id="contact-form" novalidate>
    <input type="hidden" name="access_key" value="${n_}">
    <input type="hidden" name="subject" value="New message from Eric's World">
    <input type="hidden" name="from_name" value="Eric's World">
    <input type="checkbox" name="botcheck" class="cf-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="cf-row">
      <label class="cf-field">
        <span class="cf-label">Name</span>
        <input class="cf-input" type="text" name="name" required autocomplete="name" placeholder="Your name">
        <span class="cf-error" data-for="name" aria-live="polite"></span>
      </label>
      <label class="cf-field">
        <span class="cf-label">Email</span>
        <input class="cf-input" type="email" name="email" required autocomplete="email" placeholder="you@example.com">
        <span class="cf-error" data-for="email" aria-live="polite"></span>
      </label>
    </div>
    <label class="cf-field">
      <span class="cf-label">Message</span>
      <textarea class="cf-input cf-textarea" name="message" required rows="4" placeholder="What's on your mind?"></textarea>
      <span class="cf-error" data-for="message" aria-live="polite"></span>
    </label>
    <div class="cf-actions">
      <button class="cf-submit" type="submit">${tt("send",16)} <span>Send message</span></button>
      <span class="cf-status" role="status" aria-live="polite"></span>
    </div>
  </form>`:`
  <div class="cf-notice">The contact form isn't configured yet. Reach me directly on the left.</div>`,QE=`
  <div class="ca-photo" style="background-image:url('${YE}islandphoto/travelislandphoto.jpeg')" aria-hidden="true"></div>
  <div class="ca-scrim" aria-hidden="true"></div>`,eA=`
  <div class="contact-split">
    <aside class="contact-aside">
      ${QE}
      <div class="ca-body">
        <span class="ca-eyebrow">Say hey</span>
        <h2 class="ca-title">Let's build something cool.</h2>
        <p class="ca-blurb">Got a project, a role, or just wanna say hi? Drop me a line.
        I read everything and reply fast.</p>
        <div class="ca-pills">
          <span class="ca-pill ca-pill--live"><span class="ca-dot"></span>Open to work</span>
          <span class="ca-pill">${tt("mapPin",13)}London, UK</span>
          <span class="ca-pill">${tt("clock",13)}Replies in ~a day</span>
        </div>
      </div>
      <div class="ca-socials">${JE}</div>
    </aside>

    <div class="contact-main">
      <div class="cf-head">
        <h3 class="cf-head-title">Drop me a message</h3>
        <p class="cf-head-sub">this goes straight to my inbox :)</p>
      </div>
      ${ZE}
    </div>
  </div>
`;function tA(r){const e=r.querySelector("#contact-form");if(!e)return;const t=e.querySelector(".cf-status"),n=e.querySelector(".cf-submit"),i=[...e.querySelectorAll(".cf-input")],s=o=>e.querySelector(`.cf-error[data-for="${o}"]`),a=o=>{const l=s(o.name);let c="";return o.value.trim()?o.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.value)&&(c="Enter a valid email address."):c="This field is required.",l&&(l.textContent=c),o.classList.toggle("cf-input--invalid",!!c),!c};i.forEach(o=>{o.addEventListener("blur",()=>a(o)),o.addEventListener("input",()=>{o.classList.contains("cf-input--invalid")&&a(o)})}),e.addEventListener("submit",async o=>{var c;if(o.preventDefault(),!i.map(a).every(Boolean)){(c=i.find(h=>h.classList.contains("cf-input--invalid")))==null||c.focus();return}n.disabled=!0,t.textContent="Sending…",t.className="cf-status cf-status--pending";try{const h=await fetch("https://api.web3forms.com/submit",{method:"POST",body:new FormData(e)}),u=await h.json().catch(()=>({}));if(h.ok&&u.success)e.innerHTML=`
          <div class="cf-success">
            <div class="cf-success-ic">${tt("mail",26)}</div>
            <h4>Message sent!</h4>
            <p>Thanks for reaching out — I'll get back to you soon.</p>
          </div>`;else throw new Error(u.message||`HTTP ${h.status}`)}catch(h){t.textContent=`Couldn't send (${h.message}). Try again or email me directly.`,t.className="cf-status cf-status--error",n.disabled=!1}})}const Ed="./",nA="/api/refresh-travel-stats",iA="https://www.google.com/maps/d/u/0/embed?mid=1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8&ehbc=2E312F",tm="Malaysia",sA=[{name:"Great Wall of China",seen:!1},{name:"Petra",seen:!1},{name:"Christ the Redeemer",seen:!1},{name:"Machu Picchu",seen:!1},{name:"Chichén Itzá",seen:!1},{name:"Colosseum",seen:!1},{name:"Taj Mahal",seen:!1}];function rA(r,e){const n=c=>c*Math.PI/180,i=n(e[0]-r[0]),s=n(e[1]-r[1]),a=n(r[0]),o=n(e[0]),l=Math.sin(i/2)**2+Math.cos(a)*Math.cos(o)*Math.sin(s/2)**2;return 2*6371*Math.asin(Math.sqrt(l))}function aA(r){var n;const e=(n=r.find(i=>i.name===tm))==null?void 0:n.latlng;if(!e)return null;let t=null;for(const i of r){if(i.name===tm||!i.latlng)continue;const s=rA(e,i.latlng);(!t||s>t.km)&&(t={name:i.name,km:s})}return t}let ka=null;function ai(r){return document.getElementById(r)}const oA=`
  <div class="travel-split">
    <div class="travel-map-col">
      <!-- Click-to-load Google Maps embed — avoids loading Google's tracking
           iframe on panel open; user opts in explicitly. -->
      <div id="tp-map-slot">
        <div class="tp-map-consent">
          <span>Show Eric's travel map?<br>
            <small>Loads an embed from Google Maps which may set cookies.</small>
          </span>
          <button id="tp-map-load" type="button">Load map</button>
        </div>
      </div>
    </div>

    <div class="travel-info-col">
      <!-- TEST: photo overlay card. To remove, delete this figure + the
           .tp-photo* rules in overlay.css. -->
      <figure class="tp-photo" style="background-image:url('${Ed}islandphoto/pirateislandphoto.jpeg')">
        <figcaption class="tp-photo-cap">
          <span class="tp-photo-eyebrow">From the log</span>
          <span class="tp-photo-line">Reeled one in off the coast</span>
        </figcaption>
      </figure>

      <div class="tp-actions">
        <button id="travel-refresh" class="tp-btn" type="button">${tt("compass",14)} Reload</button>
        <span id="travel-status" class="tp-status" aria-live="polite">Loading…</span>
      </div>

      <div class="tp-stats" id="tp-stats"></div>

      <div class="tp-cloud-head">
        <span class="tp-cloud-title">Countries visited</span>
        <span class="tp-cloud-count" id="tp-cloud-count">–</span>
      </div>
      <div class="tp-flags" id="tp-flags" aria-label="Countries visited"></div>
    </div>
  </div>
`;function i_({label:r,value:e,sub:t,link:n}){return n?`
      <button type="button" class="tp-box tp-box--link" data-scroll="flags" aria-label="Jump to the countries visited">
        <p class="tp-label">${r}</p>
        <p class="tp-value">${e??"–"}</p>
        <p class="tp-sub">${t??""} ${tt("arrowRight",11)}</p>
      </button>`:`
    <div class="tp-box">
      <p class="tp-label">${r}</p>
      <p class="tp-value">${e??"–"}</p>
      <p class="tp-sub">${t??""}</p>
    </div>`}function lA(r){const e=r.countriesList||[],t=r.countryData&&r.countryData.length?r.countryData:e.map(c=>({name:c,iso:null,continent:"Other",latlng:null})),n=t.length?new Set(t.map(c=>c.continent)).size:null,i=sA.filter(c=>c.seen).length,s=t.length?aA(t):null,a=[{label:"Countries",value:r.countries??(e.length||"–"),sub:"visited",link:!0},{label:"Continents",value:n??"–",sub:"of 7"},{label:"Places pinned",value:r.landmarks!=null?r.landmarks.toLocaleString("en-GB"):"–",sub:"on the map"},{label:"% of world",value:r.worldPct!=null?`${r.worldPct}%`:"–",sub:"explored"},{label:"New 7 Wonders",value:`${i}/7`,sub:"seen"},{label:"Furthest flung",value:s?s.name:"–",sub:s?`${(Math.round(s.km/10)*10).toLocaleString("en-GB")} km from home`:""}],o=ai("tp-stats");o&&(o.innerHTML=a.map(i_).join("")),cA(t);const l=ai("travel-status");if(l)if(r.error)l.textContent=`Error: ${r.error}`;else if(r.updatedAt){const c=new Date(r.updatedAt),h=isNaN(c.getTime())?r.updatedAt:c.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1});l.textContent=`Updated ${h}`}else l.textContent="No data yet"}function cA(r){const e=ai("tp-flags"),t=ai("tp-cloud-count");if(t&&(t.textContent=r.length||"–"),!!e){if(!r.length){e.innerHTML="";return}e.innerHTML=r.slice().sort((n,i)=>n.name.localeCompare(i.name)).map(({name:n,iso:i})=>{if(!i)return`<span class="tp-flag tp-flag--plain" title="${n}"><span class="tp-flag-name">${n}</span></span>`;const s=`${Ed}flags/${i}.svg`;return`<span class="tp-flag" title="${n}" style="background-image:url('${s}')"><span class="tp-flag-name">${n}</span></span>`}).join("")}}function s_(r){const e=ai("tp-stats");e&&(e.innerHTML=[{label:"Countries",value:"–",sub:"visited"},{label:"Continents",value:"–",sub:"of 7"},{label:"Places pinned",value:"–",sub:"on the map"},{label:"% of world",value:"–",sub:"explored"},{label:"New 7 Wonders",value:"–",sub:"seen"},{label:"Furthest flung",value:"–",sub:""}].map(i_).join(""));const t=ai("travel-status");t&&r&&(t.textContent=r)}async function nm(r=!1){const e=ai("travel-status");e&&(e.textContent=r?"Refreshing…":"Loading…"),ka&&ka.abort();const t=ka=new AbortController,n=()=>fetch(`${Ed}travel-stats.json?_=${Date.now()}`,{signal:t.signal});try{let i;if(r)try{i=await fetch(nA,{signal:t.signal}),i.ok||(i=await n())}catch(a){if(a.name==="AbortError")return;i=await n()}else i=await n();if(!i.ok)throw new Error(`HTTP ${i.status}`);const s=await i.json();if(s.error)throw new Error(s.error);lA(s)}catch(i){if(i.name==="AbortError")return;s_(`Error: ${i.message}`),console.error("[TravelStats]",i)}finally{ka===t&&(ka=null)}}function im(){const r=ai("tp-map-slot");if(!r)return;const e=document.createElement("iframe");e.src=iA,e.width="100%",e.height="100%",e.loading="lazy",e.referrerPolicy="no-referrer-when-downgrade",e.title="Eric's travel map (Google My Maps embed)",e.style.cssText="border:none;border-radius:14px;display:block;width:100%;height:100%;min-height:300px;",e.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups"),r.replaceChildren(e);try{localStorage.setItem("phf-travel-map-loaded","1")}catch{}}function hA(){const r=ai("tp-map-load");if(r){r.onclick=im;try{localStorage.getItem("phf-travel-map-loaded")==="1"&&im()}catch{}}const e=document.querySelector(".travel-info-col"),t=ai("tp-stats");t&&t.addEventListener("click",i=>{if(!i.target.closest('[data-scroll="flags"]'))return;const s=document.querySelector(".tp-cloud-head");s?s.scrollIntoView({behavior:"smooth",block:"start"}):e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})});const n=ai("travel-refresh");n&&(n.title="Re-scan the travel map for newly pinned places",n.onclick=async()=>{n.disabled=!0;try{await nm(!0)}finally{n.disabled=!1}}),s_(),nm(!1)}const oi={meadow_island:{iconKey:"leaf",name:"Meadow Island",section:"About Me",color:"#4CAF50",html:`
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
    `},arctic_island:{iconKey:"snowflake",name:"Arctic Island",section:"Tech Stack",color:"#64B5F6",variant:"tech",html:BE,init:kE},mountain_island:{iconKey:"mountain",name:"Mountain Island",section:"Projects",color:"#FF8A65",variant:"projects",html:HE,init:GE},lava_island:{iconKey:"flame",name:"Lava Island",section:"Experience",color:"#E53935",variant:"exp",html:jE},desert_island:{iconKey:"sun",name:"Desert Island",section:"Contact",color:"#FB923C",variant:"contact",html:eA,init:tA},pirate_ship:{iconKey:"compass",name:"Pirate Ship",section:"Travel Log",color:"#0097A7",lightColor:"#FFFFFF",noGlow:!0,variant:"travel",html:oA,init:hA}},uA="ontouchstart"in window||navigator.maxTouchPoints>0;class dA{constructor(){this._popup=document.createElement("div"),this._popup.id="island-popup",this._popup.className="hidden",this._popup.innerHTML=`
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
    `,document.body.appendChild(this._popup),this._popup.addEventListener("click",()=>{var n;(n=this.onPopupTap)==null||n.call(this)}),this._popup.addEventListener("touchend",n=>{var i;n.preventDefault(),(i=this.onPopupTap)==null||i.call(this)},{passive:!1}),this._panel=document.getElementById("world-panel"),this._icon=document.getElementById("wp-icon"),this._eyebrow=document.getElementById("wp-eyebrow"),this._title=document.getElementById("wp-title"),this._content=document.getElementById("wp-content"),this._halo=this._panel.querySelector(".wp-halo"),this._closeBtn=document.getElementById("wp-close"),this._closeBtn.innerHTML=tt("close",18,2),this._closeBtn.addEventListener("click",()=>this._requestClose()),this._panel.addEventListener("click",n=>{(n.target===this._panel||n.target.classList&&n.target.classList.contains("wp-scrim"))&&this._requestClose()}),this._closeTimer=null,this.onPopupTap=null,this.onClosePanel=null;const e=document.getElementById("landmark-badge"),t=document.getElementById("hint-text");e&&(e.style.display="none"),t&&(t.style.display="none")}showPopup(e){this._popup.querySelector(".pu-icon").innerHTML=tt(e.iconKey,22),this._popup.querySelector(".pu-island").textContent=e.name,this._popup.querySelector(".pu-section").textContent=e.section,this._popup.style.setProperty("--ic",e.color);const t=this._popup.querySelector(".pu-keycap"),n=this._popup.querySelector(".pu-key-label");uA?(t.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/></svg>',t.classList.add("pu-keycap--tap"),n.textContent="Tap"):(t.textContent="E",t.classList.remove("pu-keycap--tap"),n.textContent="Explore"),this._popup.classList.remove("hidden")}hidePopup(){this._popup.classList.add("hidden")}openPanel(e){var n;this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),this._icon.innerHTML=tt(e.iconKey,26),this._eyebrow.textContent=e.section,this._title.textContent=e.name,this._content.innerHTML=typeof e.html=="function"?e.html():e.html,this._content.scrollTop=0,this._panel.style.setProperty("--ic",e.color);const t=this._panel.querySelector(".wp-card");t.className="wp-card"+(e.variant?` wp--${e.variant}`:""),this._panel.classList.remove("hidden","is-closing"),this._panel.offsetWidth,this._panel.classList.add("is-open"),(n=e.init)==null||n.call(e,this._content)}_requestClose(){this.onClosePanel?this.onClosePanel():this.closePanel()}closePanel(){if(!this._panel.classList.contains("is-open")){this._panel.classList.add("hidden");return}this._panel.classList.remove("is-open"),this._panel.classList.add("is-closing"),this._closeTimer=setTimeout(()=>{this._panel.classList.add("hidden"),this._panel.classList.remove("is-closing"),this._closeTimer=null},320)}isPanelOpen(){return this._panel.classList.contains("is-open")}}function Rr(r){return String(r).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}class fA{constructor(e){this._onTeleport=e,this._visited=new Set,this._lastFocus=null,this._build()}_build(){const e=document.createElement("div");e.id="map-overlay",e.className="overlay-modal",e.setAttribute("aria-modal","true"),e.setAttribute("role","dialog"),e.setAttribute("aria-labelledby","map-title");const t=Object.entries(oi).map(([n,i])=>`
      <div class="map-card" data-island="${Rr(n)}" style="--ic:${Rr(i.color)}">
        <div class="map-visited-badge" aria-hidden="true">✓ found</div>
        <div class="map-card-icon" aria-hidden="true">${tt(i.iconKey,30)}</div>
        <div class="map-card-name">${Rr(i.name)}</div>
        <div class="map-card-section">${Rr(i.section)}</div>
        <button class="map-card-btn" type="button" data-teleport="${Rr(n)}"
                aria-label="Warp to ${Rr(i.name)}">Warp there</button>
      </div>
    `).join("");e.innerHTML=`
      <div class="overlay-inner map-overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="map-title">${tt("map",18)} Island Map</span>
          <button class="overlay-x" id="map-close" type="button" aria-label="Close map">✕</button>
        </div>
        <p class="overlay-sub">Walk there yourself, or jump straight to any island.</p>
        <div class="map-grid">${t}</div>
      </div>
    `,e.querySelector("#map-close").addEventListener("click",()=>this.close()),e.addEventListener("click",n=>{n.target===e&&this.close()}),e.querySelectorAll("[data-teleport]").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation(),this.close(),this._onTeleport(n.dataset.teleport)})}),document.body.appendChild(e),this._el=e}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var e;return(e=this._el.querySelector("#map-close"))==null?void 0:e.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}markVisited(e){if(this._visited.has(e))return;this._visited.add(e);const t=this._el.querySelector(`[data-island="${e}"]`);t&&t.classList.add("visited")}}const Cr="ontouchstart"in window||navigator.maxTouchPoints>0;class pA{constructor(){this._lastFocus=null,this._build()}_build(){const e=document.createElement("div");e.id="help-overlay",e.className="overlay-modal",e.setAttribute("aria-modal","true"),e.setAttribute("role","dialog"),e.setAttribute("aria-labelledby","help-title"),e.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="help-title">How to Play</span>
          <button class="overlay-x" id="help-close" type="button" aria-label="Close help">✕</button>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${Cr?"":"active"}" type="button" role="tab"
                  aria-selected="${!Cr}" aria-controls="help-desktop" id="tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${Cr?"active":""}" type="button" role="tab"
                  aria-selected="${Cr}" aria-controls="help-mobile" id="tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="help-desktop" class="help-section ${Cr?"help-hidden":""}">
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
        <div id="help-mobile" class="help-section ${Cr?"":"help-hidden"}">
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
    `;const t=e.querySelector("#help-desktop"),n=e.querySelector("#help-mobile");t&&(t.setAttribute("role","tabpanel"),t.setAttribute("aria-labelledby","tab-desktop")),n&&(n.setAttribute("role","tabpanel"),n.setAttribute("aria-labelledby","tab-mobile")),e.querySelector("#help-close").addEventListener("click",()=>this.close()),e.addEventListener("click",a=>{a.target===e&&this.close()});const i=[...e.querySelectorAll(".help-tab")];function s(a){i.forEach(l=>{const c=l===a;l.classList.toggle("active",c),l.setAttribute("aria-selected",String(c)),l.tabIndex=c?0:-1}),e.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const o=e.querySelector(`#help-${a.dataset.tab}`);o&&o.classList.remove("help-hidden")}i.forEach(a=>{a.addEventListener("click",()=>s(a)),a.addEventListener("keydown",o=>{if(o.key!=="ArrowLeft"&&o.key!=="ArrowRight")return;const l=o.key==="ArrowRight"?1:-1,c=i[(i.indexOf(a)+l+i.length)%i.length];c.focus(),s(c)})}),document.body.appendChild(e),this._el=e}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var e;return(e=this._el.querySelector("#help-close"))==null?void 0:e.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}}const Pr="ontouchstart"in window||navigator.maxTouchPoints>0;class mA{constructor(){this._lastFocus=null,this._onKey=null,this._onClick=null,this._onTouch=null,this._build()}_build(){const e=document.createElement("div");e.id="intro-overlay",e.className="overlay-modal",e.setAttribute("aria-modal","true"),e.setAttribute("role","dialog"),e.setAttribute("aria-labelledby","intro-title"),e.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="intro-title">How to Play</span>
          <button class="overlay-x" id="intro-close" type="button" aria-label="Close intro">✕</button>
        </div>

        <div class="intro-welcome">
          <div class="intro-welcome-icon" id="intro-welcome-icon">${tt("world",38,1.5)}</div>
          <h2 class="intro-welcome-title" id="intro-welcome-title">Welcome to Eric's World!</h2>
          <p class="intro-welcome-sub" id="intro-welcome-sub">Six islands. Explore them all.</p>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${Pr?"":"active"}" type="button" role="tab"
                  aria-selected="${!Pr}" aria-controls="intro-desktop" id="intro-tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${Pr?"active":""}" type="button" role="tab"
                  aria-selected="${Pr}" aria-controls="intro-mobile" id="intro-tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="intro-desktop" class="help-section ${Pr?"help-hidden":""}">
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
        <div id="intro-mobile" class="help-section ${Pr?"":"help-hidden"}">
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
    `;const t=e.querySelector("#intro-desktop"),n=e.querySelector("#intro-mobile");t&&(t.setAttribute("role","tabpanel"),t.setAttribute("aria-labelledby","intro-tab-desktop")),n&&(n.setAttribute("role","tabpanel"),n.setAttribute("aria-labelledby","intro-tab-mobile")),e.querySelector("#intro-close").addEventListener("click",()=>this.close());const i=[...e.querySelectorAll(".help-tab")];function s(a){i.forEach(l=>{const c=l===a;l.classList.toggle("active",c),l.setAttribute("aria-selected",String(c)),l.tabIndex=c?0:-1}),e.querySelectorAll(".help-section").forEach(l=>l.classList.add("help-hidden"));const o=e.querySelector(`#intro-${a.dataset.tab}`);o&&o.classList.remove("help-hidden")}i.forEach(a=>{a.addEventListener("click",()=>s(a)),a.addEventListener("keydown",o=>{if(o.key!=="ArrowLeft"&&o.key!=="ArrowRight")return;const l=o.key==="ArrowRight"?1:-1,c=i[(i.indexOf(a)+l+i.length)%i.length];c.focus(),s(c)})}),document.body.appendChild(e),this._el=e}open(e=!1){const t=this._el.querySelector("#intro-welcome-icon"),n=this._el.querySelector("#intro-welcome-title"),i=this._el.querySelector("#intro-welcome-sub");t&&(t.innerHTML=tt(e?"compass":"world",38,1.5)),n&&(n.textContent=e?"Welcome back!":"Welcome to Eric's World!"),i&&(i.textContent=e?"Here's a quick refresher in case you forgot the ropes.":"Six islands. Explore them all."),this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var s;return(s=this._el.querySelector("#intro-close"))==null?void 0:s.focus()}),this._onKey=s=>{s.target.closest("#intro-overlay")&&(s.key==="Tab"||s.key==="ArrowLeft"||s.key==="ArrowRight")||this.close()},this._onClick=s=>{s.target===this._el&&this.close()},this._onTouch=s=>{s.target===this._el&&this.close()},document.addEventListener("keydown",this._onKey,{once:!1}),this._el.addEventListener("click",this._onClick,{once:!1}),this._el.addEventListener("touchstart",this._onTouch,{once:!1,passive:!0})}close(){this._el.classList.remove("is-open"),localStorage.setItem("phf-intro-seen","1"),this._onKey&&document.removeEventListener("keydown",this._onKey),this._onClick&&this._el.removeEventListener("click",this._onClick),this._onTouch&&this._el.removeEventListener("touchstart",this._onTouch),this._onKey=this._onClick=this._onTouch=null,this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}}const r_="phf-settings-v1";function gA(){try{const r=localStorage.getItem(r_);if(!r)return null;const e=JSON.parse(r);return typeof e!="object"||e===null?null:e}catch{return null}}function _A(r){try{localStorage.setItem(r_,JSON.stringify(r))}catch{}}class vA{constructor(){var n;const e=gA()??{},t=((n=window.matchMedia)==null?void 0:n.call(window,"(prefers-reduced-motion: reduce)").matches)??!1;this._quality=["low","auto","high"].includes(e.quality)?e.quality:"auto",this._reducedMotion=typeof e.reducedMotion=="boolean"?e.reducedMotion:t,this._hintsVisible=typeof e.hintsVisible=="boolean"?e.hintsVisible:!0,this._reducedMotion&&document.body.classList.add("reduced-motion"),this.onQualityChange=null,this.onReducedMotionChange=null,this.onHintsChange=null,this._lastFocus=null,this._build()}applyRestored(){var e,t,n;(e=this.onQualityChange)==null||e.call(this,this._quality),(t=this.onReducedMotionChange)==null||t.call(this,this._reducedMotion),(n=this.onHintsChange)==null||n.call(this,this._hintsVisible)}_persist(){_A({quality:this._quality,reducedMotion:this._reducedMotion,hintsVisible:this._hintsVisible})}_build(){const e=this._reducedMotion,t=this._hintsVisible,n=document.createElement("div");n.id="settings-overlay",n.className="overlay-modal",n.setAttribute("aria-modal","true"),n.setAttribute("role","dialog"),n.setAttribute("aria-labelledby","settings-title");const i=(o,l)=>`
      <button class="sopt${this._quality===o?" active":""}"
              type="button"
              data-q="${o}"
              aria-pressed="${this._quality===o}">${l}</button>`;n.innerHTML=`
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="settings-title">${tt("settings",18)} Options</span>
          <button class="overlay-x" id="settings-close" type="button" aria-label="Close settings">✕</button>
        </div>
        <div class="settings-row">
          <span class="settings-label" id="settings-q-label">Graphics</span>
          <div class="settings-opts" role="group" aria-labelledby="settings-q-label">
            ${i("low","Low")}
            ${i("auto","Auto")}
            ${i("high","High")}
          </div>
        </div>
        <div class="settings-row">
          <span class="settings-label">Reduced Motion</span>
          <button class="stoggle${e?" active":""}" id="motion-toggle" type="button" aria-pressed="${e}">${e?"ON":"OFF"}</button>
        </div>
        <div class="settings-row">
          <span class="settings-label">Control Hints</span>
          <button class="stoggle${t?" active":""}" id="hints-toggle" type="button" aria-pressed="${t}">${t?"ON":"OFF"}</button>
        </div>
        <div class="settings-row">
          <span class="settings-label">Sound</span>
          <button class="stoggle" disabled type="button" aria-disabled="true" style="opacity:.35;cursor:default">OFF</button>
          <span class="settings-note">coming soon</span>
        </div>
      </div>
    `,n.querySelector("#settings-close").addEventListener("click",()=>this.close()),n.addEventListener("click",o=>{o.target===n&&this.close()}),n.querySelectorAll("[data-q]").forEach(o=>{o.addEventListener("click",()=>{var l;n.querySelectorAll("[data-q]").forEach(c=>{const h=c===o;c.classList.toggle("active",h),c.setAttribute("aria-pressed",String(h))}),this._quality=o.dataset.q,this._persist(),(l=this.onQualityChange)==null||l.call(this,this._quality)})});const s=n.querySelector("#motion-toggle");s.addEventListener("click",()=>{var o;this._reducedMotion=!this._reducedMotion,s.textContent=this._reducedMotion?"ON":"OFF",s.classList.toggle("active",this._reducedMotion),s.setAttribute("aria-pressed",String(this._reducedMotion)),document.body.classList.toggle("reduced-motion",this._reducedMotion),this._persist(),(o=this.onReducedMotionChange)==null||o.call(this,this._reducedMotion)});const a=n.querySelector("#hints-toggle");a.addEventListener("click",()=>{var o;this._hintsVisible=!this._hintsVisible,a.textContent=this._hintsVisible?"ON":"OFF",a.classList.toggle("active",this._hintsVisible),a.setAttribute("aria-pressed",String(this._hintsVisible)),this._persist(),(o=this.onHintsChange)==null||o.call(this,this._hintsVisible)}),document.body.appendChild(n),this._el=n}open(){this._lastFocus=document.activeElement,this._el.classList.add("is-open"),queueMicrotask(()=>{var e;return(e=this._el.querySelector("#settings-close"))==null?void 0:e.focus()})}close(){this._el.classList.remove("is-open"),this._lastFocus&&typeof this._lastFocus.focus=="function"&&this._lastFocus.focus()}isOpen(){return this._el.classList.contains("is-open")}toggle(){this.isOpen()?this.close():this.open()}get quality(){return this._quality}get reducedMotion(){return this._reducedMotion}get hintsVisible(){return this._hintsVisible}}const yA="./";class xA{constructor(){this._el=null,this.onStartClose=null,this.onClose=null,this.shouldCloseFromBackdrop=null,this._build()}_build(){const e=document.createElement("div");e.id="about-overlay",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","About Eric"),e.innerHTML=`
      <button class="about-close" type="button" aria-label="Close">${tt("close",18,2)}</button>

      <!-- Warm spotlight grounding the character -->
      <div class="about-stage" aria-hidden="true"></div>

      <!-- Brand sign — the ERIC NG wordmark on a warm plaque, top-center -->
      <div class="about-brand">
        <img class="about-brand-img" src="${yA}ericnglogo.png" alt="Eric Ng" width="1080" height="355" draggable="false">
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
            <div class="about-chip" aria-hidden="true">${tt("leaf",26)}</div>
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
    `,document.body.appendChild(e),this._el=e,e.querySelector(".about-close").addEventListener("click",()=>this.close()),e.addEventListener("click",t=>{t.target===e&&(this.shouldCloseFromBackdrop&&!this.shouldCloseFromBackdrop(t)||this.close())})}open(){this.isOpen()||(this._el.classList.remove("is-closing"),this._el.classList.add("is-open"))}close(){var e;this.isOpen()&&((e=this.onStartClose)==null||e.call(this),this._el.classList.add("is-closing"),setTimeout(()=>{var t;this._el.classList.remove("is-open","is-closing"),(t=this.onClose)==null||t.call(this)},350))}isOpen(){return this._el.classList.contains("is-open")}}function Ui(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function a_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Fn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},la={duration:.5,overwrite:!1,delay:0},Ad,Qt,bt,Xn=1e8,dt=1/Xn,Cu=Math.PI*2,MA=Cu/4,SA=0,o_=Math.sqrt,bA=Math.cos,wA=Math.sin,$t=function(e){return typeof e=="string"},Lt=function(e){return typeof e=="function"},Xi=function(e){return typeof e=="number"},Rd=function(e){return typeof e>"u"},xi=function(e){return typeof e=="object"},yn=function(e){return e!==!1},Cd=function(){return typeof window<"u"},Sl=function(e){return Lt(e)||$t(e)},l_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},cn=Array.isArray,TA=/random\([^)]+\)/g,EA=/,\s*/g,sm=/(?:-?\.?\d|\.)+/gi,c_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Hr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,vh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,h_=/[+-]=-?[.\d]+/,AA=/[^,'"\[\]\s]+/gi,RA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Et,di,Pu,Pd,Un={},Kl={},u_,d_=function(e){return(Kl=ca(e,Un))&&wn},Ld=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},xo=function(e,t){return!t&&console.warn(e)},f_=function(e,t){return e&&(Un[e]=t)&&Kl&&(Kl[e]=t)||Un},Mo=function(){return 0},CA={suppressEvents:!0,isStart:!0,kill:!1},kl={suppressEvents:!0,kill:!1},PA={suppressEvents:!0},Id={},ms=[],Lu={},p_,Rn={},yh={},rm=30,zl=[],Dd="",Fd=function(e){var t=e[0],n,i;if(xi(t)||Lt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=zl.length;i--&&!zl[i].targetTest(t););n=zl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new B_(e[i],n)))||e.splice(i,1);return e},Xs=function(e){return e._gsap||Fd(qn(e))[0]._gsap},m_=function(e,t,n){return(n=e[t])&&Lt(n)?e[t]():Rd(n)&&e.getAttribute&&e.getAttribute(t)||n},xn=function(e,t){return(e=e.split(",")).forEach(t)||e},Ft=function(e){return Math.round(e*1e5)/1e5||0},Tt=function(e){return Math.round(e*1e7)/1e7||0},Kr=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},LA=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Jl=function(){var e=ms.length,t=ms.slice(0),n,i;for(Lu={},ms.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ud=function(e){return!!(e._initted||e._startAt||e.add)},g_=function(e,t,n,i){ms.length&&!Qt&&Jl(),e.render(t,n,!!(Qt&&t<0&&Ud(e))),ms.length&&!Qt&&Jl()},__=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(AA).length<2?t:$t(e)?e.trim():e},v_=function(e){return e},Nn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},IA=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},ca=function(e,t){for(var n in t)e[n]=t[n];return e},am=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=xi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Zl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},so=function(e){var t=e.parent||Et,n=e.keyframes?IA(cn(e.keyframes)):Nn;if(yn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},DA=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},y_=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},mc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},ys=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},qs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},FA=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Iu=function(e,t,n,i){return e._startAt&&(Qt?e._startAt.revert(kl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},UA=function r(e){return!e||e._ts&&r(e.parent)},om=function(e){return e._repeat?ha(e._tTime,e=e.duration()+e._rDelay)*e:0},ha=function(e,t){var n=Math.floor(e=Tt(e/t));return e&&n===e?n-1:n},Ql=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},gc=function(e){return e._end=Tt(e._start+(e._tDur/Math.abs(e._ts||e._rts||dt)||0))},_c=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Tt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),gc(e),n._dirty||qs(n,e)),e},x_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Ql(e.rawTime(),t),(!t._dur||Uo(0,t.totalDuration(),n)-t._tTime>dt)&&t.render(n,!0)),qs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-dt}},pi=function(e,t,n,i){return t.parent&&ys(t),t._start=Tt((Xi(n)?n:n||e!==Et?zn(e,n,t):e._time)+t._delay),t._end=Tt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),y_(e,t,"_first","_last",e._sort?"_start":0),Du(t)||(e._recent=t),i||x_(e,t),e._ts<0&&_c(e,e._tTime),e},M_=function(e,t){return(Un.ScrollTrigger||Ld("scrollTrigger",t))&&Un.ScrollTrigger.create(t,e)},S_=function(e,t,n,i,s){if(Od(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Qt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&p_!==Cn.frame)return ms.push(e),e._lazy=[s,i],1},NA=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Du=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},OA=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&NA(e)&&!(!e._initted&&Du(e))||(e._ts<0||e._dp._ts<0)&&!Du(e))?0:1,o=e._rDelay,l=0,c,h,u;if(o&&e._repeat&&(l=Uo(0,e._tDur,t),h=ha(l,o),e._yoyo&&h&1&&(a=1-a),h!==ha(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Qt||i||e._zTime===dt||!t&&e._zTime){if(!e._initted&&S_(e,t,i,n,l))return;for(u=e._zTime,e._zTime=t||(n?dt:0),n||(n=t&&!u),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Iu(e,t,n,!0),e._onUpdate&&!n&&Ln(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Ln(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&ys(e,1),!n&&!Qt&&(Ln(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},BA=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},ua=function(e,t,n,i){var s=e._repeat,a=Tt(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:Tt(a*(s+1)+e._rDelay*s):a,o>0&&!i&&_c(e,e._tTime=e._tDur*o),e.parent&&gc(e),n||qs(e.parent,e),e},lm=function(e){return e instanceof fn?qs(e):ua(e,e._dur)},kA={_start:0,endTime:Mo,totalDuration:Mo},zn=function r(e,t,n){var i=e.labels,s=e._recent||kA,a=e.duration()>=Xn?s.endTime(!1):e._dur,o,l,c;return $t(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(cn(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},ro=function(e,t,n){var i=Xi(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=yn(l.vars.inherit)&&l.parent;a.immediateRender=yn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Bt(t[0],a,t[s+1])},Ss=function(e,t){return e||e===0?t(e):t},Uo=function(e,t,n){return n<e?e:n>t?t:n},an=function(e,t){return!$t(e)||!(t=RA.exec(e))?"":t[1]},zA=function(e,t,n){return Ss(n,function(i){return Uo(e,t,i)})},Fu=[].slice,b_=function(e,t){return e&&xi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&xi(e[0]))&&!e.nodeType&&e!==di},VA=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return $t(i)&&!t||b_(i,1)?(s=n).push.apply(s,qn(i)):n.push(i)})||n},qn=function(e,t,n){return bt&&!t&&bt.selector?bt.selector(e):$t(e)&&!n&&(Pu||!da())?Fu.call((t||Pd).querySelectorAll(e),0):cn(e)?VA(e,n):b_(e)?Fu.call(e,0):e?[e]:[]},Uu=function(e){return e=qn(e)[0]||xo("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return qn(t,n.querySelectorAll?n:n===e?xo("Invalid scope")||Pd.createElement("div"):e)}},w_=function(e){return e.sort(function(){return .5-Math.random()})},T_=function(e){if(Lt(e))return e;var t=xi(e)?e:{each:e},n=js(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,u=i;return $t(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],u=i[1]),function(d,f,p){var _=(p||t).length,g=a[_],m,x,y,v,E,b,T,R,M;if(!g){if(M=t.grid==="auto"?0:(t.grid||[1,Xn])[1],!M){for(T=-Xn;T<(T=p[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(g=a[_]=[],m=l?Math.min(M,_)*h-.5:i%M,x=M===Xn?0:l?_*u/M-.5:i/M|0,T=0,R=Xn,b=0;b<_;b++)y=b%M-m,v=x-(b/M|0),g[b]=E=c?Math.abs(c==="y"?v:y):o_(y*y+v*v),E>T&&(T=E),E<R&&(R=E);i==="random"&&w_(g),g.max=T-R,g.min=R,g.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(M>_?_-1:c?c==="y"?_/M:M:Math.max(M,_/M))||0)*(i==="edges"?-1:1),g.b=_<0?s-_:s,g.u=an(t.amount||t.each)||0,n=n&&_<0?U_(n):n}return _=(g[d]-g.min)/g.max||0,Tt(g.b+(n?n(_):_)*g.v)+g.u}},Nu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Tt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Xi(n)?0:an(n))}},E_=function(e,t){var n=cn(e),i,s;return!n&&xi(e)&&(i=n=e.radius||Xn,e.values?(e=qn(e.values),(s=!Xi(e[0]))&&(i*=i)):e=Nu(e.increment)),Ss(t,n?Lt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Xn,h=0,u=e.length,d,f;u--;)s?(d=e[u].x-o,f=e[u].y-l,d=d*d+f*f):d=Math.abs(e[u]-o),d<c&&(c=d,h=u);return h=!i||c<=i?e[h]:a,s||h===a||Xi(a)?h:h+an(a)}:Nu(e))},A_=function(e,t,n,i){return Ss(cn(e)?!t:n===!0?!!(n=0):!i,function(){return cn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},HA=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},GA=function(e,t){return function(n){return e(parseFloat(n))+(t||an(n))}},WA=function(e,t,n){return C_(e,t,0,1,n)},R_=function(e,t,n){return Ss(n,function(i){return e[~~t(i)]})},XA=function r(e,t,n){var i=t-e;return cn(e)?R_(e,r(0,e.length),t):Ss(n,function(s){return(i+(s-e)%i)%i+e})},qA=function r(e,t,n){var i=t-e,s=i*2;return cn(e)?R_(e,r(0,e.length-1),t):Ss(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},So=function(e){return e.replace(TA,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(EA);return A_(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},C_=function(e,t,n,i,s){var a=t-e,o=i-n;return Ss(s,function(l){return n+((l-e)/a*o||0)})},jA=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var a=$t(e),o={},l,c,h,u,d;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(cn(e)&&!cn(t)){for(h=[],u=e.length,d=u-2,c=1;c<u;c++)h.push(r(e[c-1],e[c]));u--,s=function(p){p*=u;var _=Math.min(d,~~p);return h[_](p-_)},n=t}else i||(e=ca(cn(e)?[]:{},e));if(!h){for(l in t)Nd.call(o,e,l,"get",t[l]);s=function(p){return zd(p,o)||(a?e.p:e)}}}return Ss(n,s)},cm=function(e,t,n){var i=e.labels,s=Xn,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Ln=function(e,t,n){var i=e.vars,s=i[t],a=bt,o=e._ctx,l,c,h;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&ms.length&&Jl(),o&&(bt=o),h=l?s.apply(c,l):s.call(c),bt=a,h},Ya=function(e){return ys(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Qt),e.progress()<1&&Ln(e,"onInterrupt"),e},Gr,P_=[],L_=function(e){if(e)if(e=!e.name&&e.default||e,Cd()||e.headless){var t=e.name,n=Lt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Mo,render:zd,add:Nd,kill:c2,modifier:l2,rawVars:0},a={targetTest:0,get:0,getSetter:kd,aliases:{},register:0};if(da(),e!==i){if(Rn[t])return;Nn(i,Nn(Zl(e,s),a)),ca(i.prototype,ca(s,Zl(e,a))),Rn[i.prop=t]=i,e.targetTest&&(zl.push(i),Id[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}f_(t,i),e.register&&e.register(wn,i,Mn)}else P_.push(e)},ut=255,$a={aqua:[0,ut,ut],lime:[0,ut,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ut],navy:[0,0,128],white:[ut,ut,ut],olive:[128,128,0],yellow:[ut,ut,0],orange:[ut,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ut,0,0],pink:[ut,192,203],cyan:[0,ut,ut],transparent:[ut,ut,ut,0]},xh=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*ut+.5|0},I_=function(e,t,n){var i=e?Xi(e)?[e>>16,e>>8&ut,e&ut]:0:$a.black,s,a,o,l,c,h,u,d,f,p;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),$a[e])i=$a[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&ut,i&ut,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&ut,e&ut]}else if(e.substr(0,3)==="hsl"){if(i=p=e.match(sm),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=xh(l+1/3,s,a),i[1]=xh(l,s,a),i[2]=xh(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(c_),n&&i.length<4&&(i[3]=1),i}else i=e.match(sm)||$a.transparent;i=i.map(Number)}return t&&!p&&(s=i[0]/ut,a=i[1]/ut,o=i[2]/ut,u=Math.max(s,a,o),d=Math.min(s,a,o),h=(u+d)/2,u===d?l=c=0:(f=u-d,c=h>.5?f/(2-u-d):f/(u+d),l=u===s?(a-o)/f+(a<o?6:0):u===a?(o-s)/f+2:(s-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},D_=function(e){var t=[],n=[],i=-1;return e.split(gs).forEach(function(s){var a=s.match(Hr)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},hm=function(e,t,n){var i="",s=(e+i).match(gs),a=t?"hsla(":"rgba(",o=0,l,c,h,u;if(!s)return e;if(s=s.map(function(d){return(d=I_(d,t,1))&&a+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=D_(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(gs,"1").split(Hr),u=c.length-1;o<u;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=e.split(gs),u=c.length-1;o<u;o++)i+=c[o]+s[o];return i+c[u]},gs=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in $a)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),YA=/hsl[a]?\(/,F_=function(e){var t=e.join(" "),n;if(gs.lastIndex=0,gs.test(t))return n=YA.test(t),e[1]=hm(e[1],n),e[0]=hm(e[0],n,D_(e[1])),!0},bo,Cn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,u,d,f,p=function _(g){var m=r()-i,x=g===!0,y,v,E,b;if((m>e||m<0)&&(n+=m-t),i+=m,E=i-n,y=E-a,(y>0||x)&&(b=++u.frame,d=E-u.time*1e3,u.time=E=E/1e3,a+=y+(y>=s?4:s-y),v=1),x||(l=c(_)),v)for(f=0;f<o.length;f++)o[f](E,d,b,g)};return u={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return d/(1e3/(g||60))},wake:function(){u_&&(!Pu&&Cd()&&(di=Pu=window,Pd=di.document||{},Un.gsap=wn,(di.gsapVersions||(di.gsapVersions=[])).push(wn.version),d_(Kl||di.GreenSockGlobals||!di.gsap&&di||{}),P_.forEach(L_)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(g){return setTimeout(g,a-u.time*1e3+1|0)},bo=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),bo=0,c=Mo},lagSmoothing:function(g,m){e=g||1/0,t=Math.min(m||33,e)},fps:function(g){s=1e3/(g||240),a=u.time*1e3+s},add:function(g,m,x){var y=m?function(v,E,b,T){g(v,E,b,T),u.remove(y)}:g;return u.remove(g),o[x?"unshift":"push"](y),da(),y},remove:function(g,m){~(m=o.indexOf(g))&&o.splice(m,1)&&f>=m&&f--},_listeners:o},u}(),da=function(){return!bo&&Cn.wake()},qe={},$A=/^[\d.\-M][\d.\-,\s]/,KA=/["']/g,JA=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(KA,"").trim():+c,i=l.substr(o+1).trim();return t},ZA=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},QA=function(e){var t=(e+"").split("("),n=qe[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[JA(t[1])]:ZA(e).split(",").map(__)):qe._CE&&$A.test(e)?qe._CE("",e):n},U_=function(e){return function(t){return 1-e(1-t)}},N_=function r(e,t){for(var n=e._first,i;n;)n instanceof fn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},js=function(e,t){return e&&(Lt(e)?e:qe[e]||QA(e))||t},rr=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return xn(e,function(o){qe[o]=Un[o]=s,qe[a=o.toLowerCase()]=n;for(var l in s)qe[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=qe[o+"."+l]=s[l]}),s},O_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Mh=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Cu*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*wA((h-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:O_(o);return s=Cu/s,l.config=function(c,h){return r(e,c,h)},l},Sh=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:O_(n);return i.config=function(s){return r(e,s)},i};xn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;rr(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});qe.Linear.easeNone=qe.none=qe.Linear.easeIn;rr("Elastic",Mh("in"),Mh("out"),Mh());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};rr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);rr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});rr("Circ",function(r){return-(o_(1-r*r)-1)});rr("Sine",function(r){return r===1?1:-bA(r*MA)+1});rr("Back",Sh("in"),Sh("out"),Sh());qe.SteppedEase=qe.steps=Un.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-dt;return function(o){return((i*Uo(0,a,o)|0)+s)*n}}};la.ease=qe["quad.out"];xn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Dd+=r+","+r+"Params,"});var B_=function(e,t){this.id=SA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:m_,this.set=t?t.getSetter:kd},wo=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ua(this,+t.duration,1,1),this.data=t.data,bt&&(this._ctx=bt,bt.data.push(this)),bo||Cn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,ua(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(da(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(_c(this,n),!s._dp||s.parent||x_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&pi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===dt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),g_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+om(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+om(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?ha(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-dt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ql(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-dt?0:this._rts,this.totalTime(Uo(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),gc(this),FA(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(da(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==dt&&(this._tTime-=dt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Tt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&pi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(yn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ql(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=PA);var i=Qt;return Qt=n,Ud(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Qt=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,lm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,lm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(zn(this,n),yn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,yn(i)),this._dur||(this._zTime=-dt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-dt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-dt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-dt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Lt(n)?n:v_,l=function(){var h=i.then;i.then=null,s&&s(),Lt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){Ya(this)},r}();Nn(wo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-dt,_prom:0,_ps:!1,_rts:1});var fn=function(r){a_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=yn(n.sortChildren),Et&&pi(n.parent||Et,Ui(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&M_(Ui(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return ro(0,arguments,this),this},t.from=function(i,s,a){return ro(1,arguments,this),this},t.fromTo=function(i,s,a,o){return ro(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,so(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Bt(i,s,zn(this,a),1),this},t.call=function(i,s,a){return pi(this,Bt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Bt(i,a,zn(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,so(a).immediateRender=yn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},t.staggerFromTo=function(i,s,a,o,l,c,h,u){return o.startAt=a,so(o).immediateRender=yn(o.immediateRender),this.staggerTo(i,s,o,l,c,h,u)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Tt(i),u=this._zTime<0!=i<0&&(this._initted||!c),d,f,p,_,g,m,x,y,v,E,b,T;if(this!==Et&&h>l&&i>=0&&(h=l),h!==this._tTime||a||u){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),d=h,v=this._start,y=this._ts,m=!y,u&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,g=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(g*100+i,s,a);if(d=Tt(h%g),h===l?(_=this._repeat,d=c):(E=Tt(h/g),_=~~E,_&&_===E&&(d=c,_--),d>c&&(d=c)),E=ha(this._tTime,g),!o&&this._tTime&&E!==_&&this._tTime-E*g-this._dur<=0&&(E=_),b&&_&1&&(d=c-d,T=1),_!==E&&!this._lock){var R=b&&E&1,M=R===(b&&_&1);if(_<E&&(R=!R),o=R?0:h%c?c:h,this._lock=1,this.render(o||(T?0:Tt(_*g)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&Ln(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,E=_),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,o=R?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;N_(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=BA(this,Tt(o),Tt(d)),x&&(h-=d-(d=x._start))),this._tTime=h,this._time=d,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!E&&(Ln(this,"onStart"),this._tTime!==h))return this;if(d>=o&&i>=0)for(f=this._first;f;){if(p=f._next,(f._act||d>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,a),d!==this._time||!this._ts&&!m){x=0,p&&(h+=this._zTime=-dt);break}}f=p}else{f=this._last;for(var S=i<0?i:d;f;){if(p=f._prev,(f._act||S<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(S-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(S-f._start)*f._ts,s,a||Qt&&Ud(f)),d!==this._time||!this._ts&&!m){x=0,p&&(h+=this._zTime=S?-dt:dt);break}}f=p}}if(x&&!s&&(this.pause(),x.render(d>=o?0:-dt)._zTime=d>=o?1:-1,this._ts))return this._start=v,gc(this),this.render(i,s,a);this._onUpdate&&!s&&Ln(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(v===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&ys(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(Ln(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(Xi(s)||(s=zn(this,s,i)),!(i instanceof wo)){if(cn(i))return i.forEach(function(o){return a.add(o,s)}),this;if($t(i))return this.addLabel(i,s);if(Lt(i))i=Bt.delayedCall(0,i);else return this}return this!==i?pi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Xn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Bt?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return $t(i)?this.removeLabel(i):Lt(i)?this.killTweensOf(i):(i.parent===this&&mc(this,i),i===this._recent&&(this._recent=this._last),qs(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Tt(Cn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=zn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Bt.delayedCall(0,s||Mo,a);return o.data="isPause",this._hasPause=1,pi(this,o,zn(this,i))},t.removePause=function(i){var s=this._first;for(i=zn(this,i);s;)s._start===i&&s.data==="isPause"&&ys(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)hs!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=qn(i),l=this._first,c=Xi(s),h;l;)l instanceof Bt?LA(l._targets,o)&&(c?(!hs||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=zn(a,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,d=l.immediateRender,f,p=Bt.to(a,Nn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||dt,onStart:function(){if(a.pause(),!f){var g=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==g&&ua(p,g,0,1).render(p._time,!0,!0),f=1}h&&h.apply(p,u||[])}},s));return d?p.render(0):p},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Nn({startAt:{time:zn(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),cm(this,zn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),cm(this,zn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+dt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Tt(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return qs(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),qs(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Xn,c,h,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(u=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,pi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=Tt(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;ua(a,a===Et&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Et._ts&&(g_(Et,Ql(i,Et)),p_=Cn.frame),Cn.frame>=rm){rm+=Fn.autoSleep||120;var s=Et._first;if((!s||!s._ts)&&Fn.autoSleep&&Cn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Cn.sleep()}}},e}(wo);Nn(fn.prototype,{_lock:0,_hasPause:0,_forcing:0});var e2=function(e,t,n,i,s,a,o){var l=new Mn(this._pt,e,t,0,1,W_,null,s),c=0,h=0,u,d,f,p,_,g,m,x;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=So(i)),a&&(x=[n,i],a(x,e,t),n=x[0],i=x[1]),d=n.match(vh)||[];u=vh.exec(i);)p=u[0],_=i.substring(c,u.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),p!==d[h++]&&(g=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:g,c:p.charAt(1)==="="?Kr(g,p)-g:parseFloat(p)-g,m:f&&f<4?Math.round:0},c=vh.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(h_.test(i)||m)&&(l.e=0),this._pt=l,l},Nd=function(e,t,n,i,s,a,o,l,c,h){Lt(i)&&(i=i(s||0,e,a));var u=e[t],d=n!=="get"?n:Lt(u)?c?e[t.indexOf("set")||!Lt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():u,f=Lt(u)?c?r2:H_:Bd,p;if($t(i)&&(~i.indexOf("random(")&&(i=So(i)),i.charAt(1)==="="&&(p=Kr(d,i)+(an(d)||0),(p||p===0)&&(i=p))),!h||d!==i||Ou)return!isNaN(d*i)&&i!==""?(p=new Mn(this._pt,e,t,+d||0,i-(d||0),typeof u=="boolean"?o2:G_,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Ld(t,i),e2.call(this,e,t,d,i,f,l||Fn.stringFilter,c))},t2=function(e,t,n,i,s){if(Lt(e)&&(e=ao(e,s,t,n,i)),!xi(e)||e.style&&e.nodeType||cn(e)||l_(e))return $t(e)?ao(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=ao(e[o],s,t,n,i);return a},k_=function(e,t,n,i,s,a){var o,l,c,h;if(Rn[e]&&(o=new Rn[e]).init(s,o.rawVars?t[e]:t2(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Mn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Gr))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},hs,Ou,Od=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,d=i.keyframes,f=i.autoRevert,p=e._dur,_=e._startAt,g=e._targets,m=e.parent,x=m&&m.data==="nested"?m.vars.targets:g,y=e._overwrite==="auto"&&!Ad,v=e.timeline,E,b,T,R,M,S,L,F,I,D,z,N,G;if(v&&(!d||!s)&&(s="none"),e._ease=js(s,la.ease),e._yEase=u?U_(js(u===!0?s:u,la.ease)):0,u&&e._yoyo&&!e._repeat&&(u=e._yEase,e._yEase=e._ease,e._ease=u),e._from=!v&&!!i.runBackwards,!v||d&&!i.stagger){if(F=g[0]?Xs(g[0]).harness:0,N=F&&i[F.prop],E=Zl(i,Id),_&&(_._zTime<0&&_.progress(1),t<0&&h&&o&&!f?_.render(-1,!0):_.revert(h&&p?kl:CA),_._lazy=0),a){if(ys(e._startAt=Bt.set(g,Nn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&yn(l),startAt:null,delay:0,onUpdate:c&&function(){return Ln(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Qt||!o&&!f)&&e._startAt.revert(kl),o&&p&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&p&&!_){if(t&&(o=!1),T=Nn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&yn(l),immediateRender:o,stagger:0,parent:m},E),N&&(T[F.prop]=N),ys(e._startAt=Bt.set(g,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Qt?e._startAt.revert(kl):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,dt,dt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&yn(l)||l&&!p,b=0;b<g.length;b++){if(M=g[b],L=M._gsap||Fd(g)[b]._gsap,e._ptLookup[b]=D={},Lu[L.id]&&ms.length&&Jl(),z=x===g?b:x.indexOf(M),F&&(I=new F).init(M,N||E,e,z,x)!==!1&&(e._pt=R=new Mn(e._pt,M,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(V){D[V]=R}),I.priority&&(S=1)),!F||N)for(T in E)Rn[T]&&(I=k_(T,E,e,z,M,x))?I.priority&&(S=1):D[T]=R=Nd.call(e,M,T,"get",E[T],z,x,0,i.stringFilter);e._op&&e._op[b]&&e.kill(M,e._op[b]),y&&e._pt&&(hs=e,Et.killTweensOf(M,D,e.globalTime(t)),G=!e.parent,hs=0),e._pt&&l&&(Lu[L.id]=1)}S&&X_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!G,d&&t<=0&&v.render(Xn,!0,!0)},n2=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(h=d[f][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return Ou=1,e.vars[t]="+=0",Od(e,o),Ou=0,l?xo(t+" not eligible for reset"):1;c.push(h)}for(f=c.length;f--;)u=c[f],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,u.e&&(u.e=Ft(n)+an(u.e)),u.b&&(u.b=h.s+an(u.b))},i2=function(e,t){var n=e[0]?Xs(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=ca({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},s2=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(cn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},ao=function(e,t,n,i,s){return Lt(e)?e.call(t,n,i,s):$t(e)&&~e.indexOf("random(")?So(e):e},z_=Dd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",V_={};xn(z_+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return V_[r]=1});var Bt=function(r){a_(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:so(i))||this;var l=o.vars,c=l.duration,h=l.delay,u=l.immediateRender,d=l.stagger,f=l.overwrite,p=l.keyframes,_=l.defaults,g=l.scrollTrigger,m=l.yoyoEase,x=i.parent||Et,y=(cn(n)||l_(n)?Xi(n[0]):"length"in i)?[n]:qn(n),v,E,b,T,R,M,S,L;if(o._targets=y.length?Fd(y):xo("GSAP target "+n+" not found. https://gsap.com",!Fn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,p||d||Sl(c)||Sl(h)){if(i=o.vars,v=o.timeline=new fn({data:"nested",defaults:_||{},targets:x&&x.data==="nested"?x.vars.targets:y}),v.kill(),v.parent=v._dp=Ui(o),v._start=0,d||Sl(c)||Sl(h)){if(T=y.length,S=d&&T_(d),xi(d))for(R in d)~z_.indexOf(R)&&(L||(L={}),L[R]=d[R]);for(E=0;E<T;E++)b=Zl(i,V_),b.stagger=0,m&&(b.yoyoEase=m),L&&ca(b,L),M=y[E],b.duration=+ao(c,Ui(o),E,M,y),b.delay=(+ao(h,Ui(o),E,M,y)||0)-o._delay,!d&&T===1&&b.delay&&(o._delay=h=b.delay,o._start+=h,b.delay=0),v.to(M,b,S?S(E,M,y):0),v._ease=qe.none;v.duration()?c=h=0:o.timeline=0}else if(p){so(Nn(v.vars.defaults,{ease:"none"})),v._ease=js(p.ease||i.ease||"none");var F=0,I,D,z;if(cn(p))p.forEach(function(N){return v.to(y,N,">")}),v.duration();else{b={};for(R in p)R==="ease"||R==="easeEach"||s2(R,p[R],b,p.easeEach);for(R in b)for(I=b[R].sort(function(N,G){return N.t-G.t}),F=0,E=0;E<I.length;E++)D=I[E],z={ease:D.e,duration:(D.t-(E?I[E-1].t:0))/100*c},z[R]=D.v,v.to(y,z,F),F+=z.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||o.duration(c=v.duration())}else o.timeline=0;return f===!0&&!Ad&&(hs=Ui(o),Et.killTweensOf(y),hs=0),pi(x,Ui(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(u||!c&&!p&&o._start===Tt(x._time)&&yn(u)&&UA(Ui(o))&&x.data!=="nested")&&(o._tTime=-dt,o.render(Math.max(0,-h)||0)),g&&M_(Ui(o),g),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-dt&&!h?l:i<dt?0:i,d,f,p,_,g,m,x,y,v;if(!c)OA(this,i,s,a);else if(u!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=u,y=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,a);if(d=Tt(u%_),u===l?(p=this._repeat,d=c):(g=Tt(u/_),p=~~g,p&&p===g?(d=c,p--):d>c&&(d=c)),m=this._yoyo&&p&1,m&&(v=this._yEase,d=c-d),g=ha(this._tTime,_),d===o&&!a&&this._initted&&p===g)return this._tTime=u,this;p!==g&&(y&&this._yEase&&N_(y,m),this.vars.repeatRefresh&&!m&&!this._lock&&d!==_&&this._initted&&(this._lock=a=1,this.render(Tt(_*p),!0).invalidate()._lock=0))}if(!this._initted){if(S_(this,h?i:d,a,s,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(d/c),this._from&&(this.ratio=x=1-x),!o&&u&&!s&&!g&&(Ln(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;y&&y.render(i<0?i:y._dur*y._ease(d/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Iu(this,i,s,a),Ln(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!s&&this.parent&&Ln(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Iu(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&ys(this,1),!s&&!(h&&!o)&&(u||o||m)&&(Ln(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){bo||Cn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Od(this,c),h=this._ease(c/this._dur),n2(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(_c(this,0),this.parent||y_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ya(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Qt),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,hs&&hs.vars.overwrite!==!0)._first||Ya(this),this.parent&&a!==this.timeline.totalDuration()&&ua(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?qn(i):o,c=this._ptLookup,h=this._pt,u,d,f,p,_,g,m;if((!s||s==="all")&&DA(o,l))return s==="all"&&(this._pt=0),Ya(this);for(u=this._op=this._op||[],s!=="all"&&($t(s)&&(_={},xn(s,function(x){return _[x]=1}),s=_),s=i2(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){d=c[m],s==="all"?(u[m]=s,p=d,f={}):(f=u[m]=u[m]||{},p=s);for(_ in p)g=d&&d[_],g&&((!("kill"in g.d)||g.d.kill(_)===!0)&&mc(this,g,"_pt"),delete d[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&Ya(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ro(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return ro(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Et.killTweensOf(i,s,a)},e}(wo);Nn(Bt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});xn("staggerTo,staggerFrom,staggerFromTo",function(r){Bt[r]=function(){var e=new fn,t=Fu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Bd=function(e,t,n){return e[t]=n},H_=function(e,t,n){return e[t](n)},r2=function(e,t,n,i){return e[t](i.fp,n)},a2=function(e,t,n){return e.setAttribute(t,n)},kd=function(e,t){return Lt(e[t])?H_:Rd(e[t])&&e.setAttribute?a2:Bd},G_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},o2=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},W_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},zd=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},l2=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},c2=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?mc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},h2=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},X_=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},Mn=function(){function r(t,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||G_,this.d=l||this,this.set=c||Bd,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=h2,this.m=n,this.mt=s,this.tween=i},r}();xn(Dd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Id[r]=1});Un.TweenMax=Un.TweenLite=Bt;Un.TimelineLite=Un.TimelineMax=fn;Et=new fn({sortChildren:!1,defaults:la,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Fn.stringFilter=F_;var Ys=[],Vl={},u2=[],um=0,d2=0,bh=function(e){return(Vl[e]||u2).map(function(t){return t()})},Bu=function(){var e=Date.now(),t=[];e-um>2&&(bh("matchMediaInit"),Ys.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=di.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),bh("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),um=e,bh("matchMedia"))},q_=function(){function r(t,n){this.selector=n&&Uu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=d2++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Lt(n)&&(s=i,i=n,n=Lt);var a=this,o=function(){var c=bt,h=a.selector,u;return c&&c!==a&&c.data.push(a),s&&(a.selector=Uu(s)),bt=a,u=i.apply(a,arguments),Lt(u)&&a._r.push(u),bt=c,a.selector=h,a.isReverted=!1,u};return a.last=o,n===Lt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=bt;bt=null,n(this),bt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Bt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof fn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Bt)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Ys.length;a--;)Ys[a].id===this.id&&Ys.splice(a,1)},e.revert=function(n){this.kill(n||{})},r}(),f2=function(){function r(t){this.contexts=[],this.scope=t,bt&&bt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){xi(n)||(n={matches:n});var a=new q_(0,s||this.scope),o=a.conditions={},l,c,h;bt&&!a.selector&&(a.selector=bt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=di.matchMedia(n[c]),l&&(Ys.indexOf(a)<0&&Ys.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(Bu):l.addEventListener("change",Bu)));return h&&i(a,function(u){return a.add(null,u)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ec={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return L_(i)})},timeline:function(e){return new fn(e)},getTweensOf:function(e,t){return Et.getTweensOf(e,t)},getProperty:function(e,t,n,i){$t(e)&&(e=qn(e)[0]);var s=Xs(e||{}).get,a=n?v_:__;return n==="native"&&(n=""),e&&(t?a((Rn[t]&&Rn[t].get||s)(e,t,n,i)):function(o,l,c){return a((Rn[o]&&Rn[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=qn(e),e.length>1){var i=e.map(function(h){return wn.quickSetter(h,t,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}e=e[0]||{};var a=Rn[t],o=Xs(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var u=new a;Gr._pt=0,u.init(e,n?h+n:h,Gr,0,[e]),u.render(1,u),Gr._pt&&zd(1,Gr)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,s=wn.to(e,Nn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(t,l,c,h)};return a.tween=s,a},isTweening:function(e){return Et.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=js(e.ease,la.ease)),am(la,e||{})},config:function(e){return am(Fn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Rn[o]&&!Un[o]&&xo(t+" effect requires "+o+" plugin.")}),yh[t]=function(o,l,c){return n(qn(o),Nn(l||{},s),c)},a&&(fn.prototype[t]=function(o,l,c){return this.add(yh[t](o,xi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){qe[e]=js(t)},parseEase:function(e,t){return arguments.length?js(e,t):qe},getById:function(e){return Et.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new fn(e),i,s;for(n.smoothChildTiming=yn(e.smoothChildTiming),Et.remove(n),n._dp=0,n._time=n._tTime=Et._time,i=Et._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Bt&&i.vars.onComplete===i._targets[0]))&&pi(n,i,i._start-i._delay),i=s;return pi(Et,n,0),n},context:function(e,t){return e?new q_(e,t):bt},matchMedia:function(e){return new f2(e)},matchMediaRefresh:function(){return Ys.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Bu()},addEventListener:function(e,t){var n=Vl[e]||(Vl[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Vl[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:XA,wrapYoyo:qA,distribute:T_,random:A_,snap:E_,normalize:WA,getUnit:an,clamp:zA,splitColor:I_,toArray:qn,selector:Uu,mapRange:C_,pipe:HA,unitize:GA,interpolate:jA,shuffle:w_},install:d_,effects:yh,ticker:Cn,updateRoot:fn.updateRoot,plugins:Rn,globalTimeline:Et,core:{PropTween:Mn,globals:f_,Tween:Bt,Timeline:fn,Animation:wo,getCache:Xs,_removeLinkedListItem:mc,reverting:function(){return Qt},context:function(e){return e&&bt&&(bt.data.push(e),e._ctx=bt),bt},suppressOverwrites:function(e){return Ad=e}}};xn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ec[r]=Bt[r]});Cn.add(fn.updateRoot);Gr=ec.to({},{duration:0});var p2=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},m2=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=p2(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},wh=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if($t(s)&&(l={},xn(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}m2(o,s)}}}},wn=ec.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Qt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},wh("roundProps",Nu),wh("modifiers"),wh("snap",E_))||ec;Bt.version=fn.version=wn.version="3.14.2";u_=1;Cd()&&da();qe.Power0;qe.Power1;qe.Power2;qe.Power3;qe.Power4;qe.Linear;qe.Quad;qe.Cubic;qe.Quart;qe.Quint;qe.Strong;qe.Elastic;qe.Back;qe.SteppedEase;qe.Bounce;qe.Sine;qe.Expo;qe.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var dm,us,Jr,Vd,Gs,fm,Hd,g2=function(){return typeof window<"u"},qi={},ks=180/Math.PI,Zr=Math.PI/180,Lr=Math.atan2,pm=1e8,Gd=/([A-Z])/g,_2=/(left|right|width|margin|padding|x)/i,v2=/[\s,\(]\S/,_i={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ku=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},y2=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},x2=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},M2=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},S2=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},j_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Y_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},b2=function(e,t,n){return e.style[t]=n},w2=function(e,t,n){return e.style.setProperty(t,n)},T2=function(e,t,n){return e._gsap[t]=n},E2=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},A2=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},R2=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Rt="transform",Sn=Rt+"Origin",C2=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in qi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=_i[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Ni(i,o)}):this.tfm[e]=a.x?a[e]:Ni(i,e),e===Sn&&(this.tfm.zOrigin=a.zOrigin);else return _i.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Rt)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Sn,t,"")),e=Rt}(s||t)&&this.props.push(e,t,s[e])},$_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},P2=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Gd,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Hd(),(!s||!s.isStart)&&!n[Rt]&&($_(n),i.zOrigin&&n[Sn]&&(n[Sn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},K_=function(e,t){var n={target:e,props:[],revert:P2,save:C2};return e._gsap||wn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},J_,zu=function(e,t){var n=us.createElementNS?us.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):us.createElement(e);return n&&n.style?n:us.createElement(e)},In=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Gd,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,fa(t)||t,1)||""},mm="O,Moz,ms,Ms,Webkit".split(","),fa=function(e,t,n){var i=t||Gs,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(mm[a]+e in s););return a<0?null:(a===3?"ms":a>=0?mm[a]:"")+e},Vu=function(){g2()&&window.document&&(dm=window,us=dm.document,Jr=us.documentElement,Gs=zu("div")||{style:{}},zu("div"),Rt=fa(Rt),Sn=Rt+"Origin",Gs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",J_=!!fa("perspective"),Hd=wn.core.reverting,Vd=1)},gm=function(e){var t=e.ownerSVGElement,n=zu("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Jr.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Jr.removeChild(n),s},_m=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Z_=function(e){var t,n;try{t=e.getBBox()}catch{t=gm(e),n=1}return t&&(t.width||t.height)||n||(t=gm(e)),t&&!t.width&&!t.x&&!t.y?{x:+_m(e,["x","cx","x1"])||0,y:+_m(e,["y","cy","y1"])||0,width:0,height:0}:t},Q_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Z_(e))},xs=function(e,t){if(t){var n=e.style,i;t in qi&&t!==Sn&&(t=Rt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Gd,"-$1").toLowerCase())):n.removeAttribute(t)}},ds=function(e,t,n,i,s,a){var o=new Mn(e._pt,t,n,0,1,a?Y_:j_);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},vm={deg:1,rad:1,turn:1},L2={grid:1,flex:1},Ms=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Gs.style,l=_2.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,d=i==="px",f=i==="%",p,_,g,m;if(i===a||!s||vm[i]||vm[a])return s;if(a!=="px"&&!d&&(s=r(e,t,n,"px")),m=e.getCTM&&Q_(e),(f||a==="%")&&(qi[t]||~t.indexOf("adius")))return p=m?e.getBBox()[l?"width":"height"]:e[h],Ft(f?s/p*u:s/100*p);if(o[l?"width":"height"]=u+(d?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===us||!_.appendChild)&&(_=us.body),g=_._gsap,g&&f&&g.width&&l&&g.time===Cn.time&&!g.uncache)return Ft(s/g.width*u);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=u+i,p=e[h],x?e.style[t]=x:xs(e,t)}else(f||a==="%")&&!L2[In(_,"display")]&&(o.position=In(e,"position")),_===e&&(o.position="static"),_.appendChild(Gs),p=Gs[h],_.removeChild(Gs),o.position="absolute";return l&&f&&(g=Xs(_),g.time=Cn.time,g.width=_[h]),Ft(d?p*s/u:p&&s?u/p*s:0)},Ni=function(e,t,n,i){var s;return Vd||Vu(),t in _i&&t!=="transform"&&(t=_i[t],~t.indexOf(",")&&(t=t.split(",")[0])),qi[t]&&t!=="transform"?(s=Eo(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:nc(In(e,Sn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=tc[t]&&tc[t](e,t,n)||In(e,t)||m_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ms(e,t,s,n)+n:s},I2=function(e,t,n,i){if(!n||n==="none"){var s=fa(t,e,1),a=s&&In(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=In(e,"borderTopColor"))}var o=new Mn(this._pt,e.style,t,0,1,W_),l=0,c=0,h,u,d,f,p,_,g,m,x,y,v,E;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=In(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=In(e,t)||i,_?e.style[t]=_:xs(e,t)),h=[n,i],F_(h),n=h[0],i=h[1],d=n.match(Hr)||[],E=i.match(Hr)||[],E.length){for(;u=Hr.exec(i);)g=u[0],x=i.substring(l,u.index),p?p=(p+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(p=1),g!==(_=d[c++]||"")&&(f=parseFloat(_)||0,v=_.substr((f+"").length),g.charAt(1)==="="&&(g=Kr(f,g)+v),m=parseFloat(g),y=g.substr((m+"").length),l=Hr.lastIndex-y.length,y||(y=y||Fn.units[t]||v,l===i.length&&(i+=y,o.e+=y)),v!==y&&(f=Ms(e,t,_,y)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:f,c:m-f,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Y_:j_;return h_.test(i)&&(o.e=0),this._pt=o,o},ym={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},D2=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=ym[n]||n,t[1]=ym[i]||i,t.join(" ")},F2=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],qi[o]&&(l=1,o=o==="transformOrigin"?Sn:Rt),xs(n,o);l&&(xs(n,Rt),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Eo(n,1),a.uncache=1,$_(i)))}},tc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new Mn(e._pt,t,n,0,0,F2);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},To=[1,0,0,1,0,0],e0={},t0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},xm=function(e){var t=In(e,Rt);return t0(t)?To:t.substr(7).match(c_).map(Ft)},Wd=function(e,t){var n=e._gsap||Xs(e),i=e.style,s=xm(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?To:s):(s===To&&!e.offsetParent&&e!==Jr&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Jr.appendChild(e)),s=xm(e),l?i.display=l:xs(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Jr.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Hu=function(e,t,n,i,s,a){var o=e._gsap,l=s||Wd(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=l[0],p=l[1],_=l[2],g=l[3],m=l[4],x=l[5],y=t.split(" "),v=parseFloat(y[0])||0,E=parseFloat(y[1])||0,b,T,R,M;n?l!==To&&(T=f*g-p*_)&&(R=v*(g/T)+E*(-_/T)+(_*x-g*m)/T,M=v*(-p/T)+E*(f/T)-(f*x-p*m)/T,v=R,E=M):(b=Z_(e),v=b.x+(~y[0].indexOf("%")?v/100*b.width:v),E=b.y+(~(y[1]||y[0]).indexOf("%")?E/100*b.height:E)),i||i!==!1&&o.smooth?(m=v-c,x=E-h,o.xOffset=u+(m*f+x*_)-m,o.yOffset=d+(m*p+x*g)-x):o.xOffset=o.yOffset=0,o.xOrigin=v,o.yOrigin=E,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Sn]="0px 0px",a&&(ds(a,o,"xOrigin",c,v),ds(a,o,"yOrigin",h,E),ds(a,o,"xOffset",u,o.xOffset),ds(a,o,"yOffset",d,o.yOffset)),e.setAttribute("data-svg-origin",v+" "+E)},Eo=function(e,t){var n=e._gsap||new B_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=In(e,Sn)||"0",h,u,d,f,p,_,g,m,x,y,v,E,b,T,R,M,S,L,F,I,D,z,N,G,V,$,ne,de,we,Ce,q,Z;return h=u=d=_=g=m=x=y=v=0,f=p=1,n.svg=!!(e.getCTM&&Q_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Rt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Rt]!=="none"?l[Rt]:"")),i.scale=i.rotate=i.translate="none"),T=Wd(e,n.svg),n.svg&&(n.uncache?(V=e.getBBox(),c=n.xOrigin-V.x+"px "+(n.yOrigin-V.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),Hu(e,G||c,!!G||n.originIsAbsolute,n.smooth!==!1,T)),E=n.xOrigin||0,b=n.yOrigin||0,T!==To&&(L=T[0],F=T[1],I=T[2],D=T[3],h=z=T[4],u=N=T[5],T.length===6?(f=Math.sqrt(L*L+F*F),p=Math.sqrt(D*D+I*I),_=L||F?Lr(F,L)*ks:0,x=I||D?Lr(I,D)*ks+_:0,x&&(p*=Math.abs(Math.cos(x*Zr))),n.svg&&(h-=E-(E*L+b*I),u-=b-(E*F+b*D))):(Z=T[6],Ce=T[7],ne=T[8],de=T[9],we=T[10],q=T[11],h=T[12],u=T[13],d=T[14],R=Lr(Z,we),g=R*ks,R&&(M=Math.cos(-R),S=Math.sin(-R),G=z*M+ne*S,V=N*M+de*S,$=Z*M+we*S,ne=z*-S+ne*M,de=N*-S+de*M,we=Z*-S+we*M,q=Ce*-S+q*M,z=G,N=V,Z=$),R=Lr(-I,we),m=R*ks,R&&(M=Math.cos(-R),S=Math.sin(-R),G=L*M-ne*S,V=F*M-de*S,$=I*M-we*S,q=D*S+q*M,L=G,F=V,I=$),R=Lr(F,L),_=R*ks,R&&(M=Math.cos(R),S=Math.sin(R),G=L*M+F*S,V=z*M+N*S,F=F*M-L*S,N=N*M-z*S,L=G,z=V),g&&Math.abs(g)+Math.abs(_)>359.9&&(g=_=0,m=180-m),f=Ft(Math.sqrt(L*L+F*F+I*I)),p=Ft(Math.sqrt(N*N+Z*Z)),R=Lr(z,N),x=Math.abs(R)>2e-4?R*ks:0,v=q?1/(q<0?-q:q):0),n.svg&&(G=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!t0(In(e,Rt)),G&&e.setAttribute("transform",G))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=_<=0?180:-180,_+=_<=0?180:-180):(p*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Ft(f),n.scaleY=Ft(p),n.rotation=Ft(_)+o,n.rotationX=Ft(g)+o,n.rotationY=Ft(m)+o,n.skewX=x+o,n.skewY=y+o,n.transformPerspective=v+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Sn]=nc(c)),n.xOffset=n.yOffset=0,n.force3D=Fn.force3D,n.renderTransform=n.svg?N2:J_?n0:U2,n.uncache=0,n},nc=function(e){return(e=e.split(" "))[0]+" "+e[1]},Th=function(e,t,n){var i=an(t);return Ft(parseFloat(t)+parseFloat(Ms(e,"x",n+"px",i)))+i},U2=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,n0(e,t)},Ds="0deg",za="0px",Fs=") ",n0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,_=n.scaleY,g=n.transformPerspective,m=n.force3D,x=n.target,y=n.zOrigin,v="",E=m==="auto"&&e&&e!==1||m===!0;if(y&&(u!==Ds||h!==Ds)){var b=parseFloat(h)*Zr,T=Math.sin(b),R=Math.cos(b),M;b=parseFloat(u)*Zr,M=Math.cos(b),a=Th(x,a,T*M*-y),o=Th(x,o,-Math.sin(b)*-y),l=Th(x,l,R*M*-y+y)}g!==za&&(v+="perspective("+g+Fs),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(E||a!==za||o!==za||l!==za)&&(v+=l!==za||E?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Fs),c!==Ds&&(v+="rotate("+c+Fs),h!==Ds&&(v+="rotateY("+h+Fs),u!==Ds&&(v+="rotateX("+u+Fs),(d!==Ds||f!==Ds)&&(v+="skew("+d+", "+f+Fs),(p!==1||_!==1)&&(v+="scale("+p+", "+_+Fs),x.style[Rt]=v||"translate(0, 0)"},N2=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,_=n.yOrigin,g=n.xOffset,m=n.yOffset,x=n.forceCSS,y=parseFloat(a),v=parseFloat(o),E,b,T,R,M;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Zr,c*=Zr,E=Math.cos(l)*u,b=Math.sin(l)*u,T=Math.sin(l-c)*-d,R=Math.cos(l-c)*d,c&&(h*=Zr,M=Math.tan(c-h),M=Math.sqrt(1+M*M),T*=M,R*=M,h&&(M=Math.tan(h),M=Math.sqrt(1+M*M),E*=M,b*=M)),E=Ft(E),b=Ft(b),T=Ft(T),R=Ft(R)):(E=u,R=d,b=T=0),(y&&!~(a+"").indexOf("px")||v&&!~(o+"").indexOf("px"))&&(y=Ms(f,"x",a,"px"),v=Ms(f,"y",o,"px")),(p||_||g||m)&&(y=Ft(y+p-(p*E+_*T)+g),v=Ft(v+_-(p*b+_*R)+m)),(i||s)&&(M=f.getBBox(),y=Ft(y+i/100*M.width),v=Ft(v+s/100*M.height)),M="matrix("+E+","+b+","+T+","+R+","+y+","+v+")",f.setAttribute("transform",M),x&&(f.style[Rt]=M)},O2=function(e,t,n,i,s){var a=360,o=$t(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?ks:1),c=l-i,h=i+c+"deg",u,d;return o&&(u=s.split("_")[1],u==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),u==="cw"&&c<0?c=(c+a*pm)%a-~~(c/a)*a:u==="ccw"&&c>0&&(c=(c-a*pm)%a-~~(c/a)*a)),e._pt=d=new Mn(e._pt,t,n,i,c,y2),d.e=h,d.u="deg",e._props.push(n),d},Mm=function(e,t){for(var n in t)e[n]=t[n];return e},B2=function(e,t,n){var i=Mm({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,u,d,f,p;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Rt]=t,o=Eo(n,1),xs(n,Rt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Rt],a[Rt]=t,o=Eo(n,1),a[Rt]=c);for(l in qi)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(f=an(c),p=an(h),u=f!==p?Ms(n,l,c,p):parseFloat(c),d=parseFloat(h),e._pt=new Mn(e._pt,o,l,u,d-u,ku),e._pt.u=p||0,e._props.push(l));Mm(o,i)};xn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});tc[e>1?"border"+r:r]=function(o,l,c,h,u){var d,f;if(arguments.length<4)return d=a.map(function(p){return Ni(o,p,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(h+"").split(" "),f={},a.forEach(function(p,_){return f[p]=d[_]=d[_]||d[(_-1)/2|0]}),o.init(l,f,u)}});var i0={name:"css",register:Vu,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,h,u,d,f,p,_,g,m,x,y,v,E,b,T,R,M;Vd||Vu(),this.styles=this.styles||K_(e),R=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(h=t[_],!(Rn[_]&&k_(_,t,n,i,e,s)))){if(f=typeof h,p=tc[_],f==="function"&&(h=h.call(n,i,e,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=So(h)),p)p(this,e,_,h,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),h+="",gs.lastIndex=0,gs.test(c)||(g=an(c),m=an(h),m?g!==m&&(c=Ms(e,_,c,m)+m):g&&(h+=g)),this.add(o,"setProperty",c,h,i,s,0,0,_),a.push(_),R.push(_,0,o[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],$t(c)&&~c.indexOf("random(")&&(c=So(c)),an(c+"")||c==="auto"||(c+=Fn.units[_]||an(Ni(e,_))||""),(c+"").charAt(1)==="="&&(c=Ni(e,_))):c=Ni(e,_),d=parseFloat(c),x=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),x&&(h=h.substr(2)),u=parseFloat(h),_ in _i&&(_==="autoAlpha"&&(d===1&&Ni(e,"visibility")==="hidden"&&u&&(d=0),R.push("visibility",0,o.visibility),ds(this,o,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),_!=="scale"&&_!=="transform"&&(_=_i[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in qi,y){if(this.styles.save(_),M=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=In(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var S=e.style.perspective;e.style.perspective=h,h=In(e,"perspective"),S?e.style.perspective=S:xs(e,"perspective")}u=parseFloat(h)}if(v||(E=e._gsap,E.renderTransform&&!t.parseTransform||Eo(e,t.parseTransform),b=t.smoothOrigin!==!1&&E.smooth,v=this._pt=new Mn(this._pt,o,Rt,0,1,E.renderTransform,E,0,-1),v.dep=1),_==="scale")this._pt=new Mn(this._pt,E,"scaleY",E.scaleY,(x?Kr(E.scaleY,x+u):u)-E.scaleY||0,ku),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Sn,0,o[Sn]),h=D2(h),E.svg?Hu(e,h,0,b,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==E.zOrigin&&ds(this,E,"zOrigin",E.zOrigin,m),ds(this,o,_,nc(c),nc(h)));continue}else if(_==="svgOrigin"){Hu(e,h,1,b,0,this);continue}else if(_ in e0){O2(this,E,_,d,x?Kr(d,x+h):h);continue}else if(_==="smoothOrigin"){ds(this,E,"smooth",E.smooth,h);continue}else if(_==="force3D"){E[_]=h;continue}else if(_==="transform"){B2(this,h,e);continue}}else _ in o||(_=fa(_)||_);if(y||(u||u===0)&&(d||d===0)&&!v2.test(h)&&_ in o)g=(c+"").substr((d+"").length),u||(u=0),m=an(h)||(_ in Fn.units?Fn.units[_]:g),g!==m&&(d=Ms(e,_,c,m)),this._pt=new Mn(this._pt,y?E:o,_,d,(x?Kr(d,x+u):u)-d,!y&&(m==="px"||_==="zIndex")&&t.autoRound!==!1?S2:ku),this._pt.u=m||0,y&&M!==h?(this._pt.b=c,this._pt.e=M,this._pt.r=M2):g!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=x2);else if(_ in o)I2.call(this,e,_,c,x?x+h:h);else if(_ in e)this.add(e,_,c||e[_],x?x+h:h,i,s);else if(_!=="parseTransform"){Ld(_,h);continue}y||(_ in o?R.push(_,0,o[_]):typeof e[_]=="function"?R.push(_,2,e[_]()):R.push(_,1,c||e[_])),a.push(_)}}T&&X_(this)},render:function(e,t){if(t.tween._time||!Hd())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ni,aliases:_i,getSetter:function(e,t,n){var i=_i[t];return i&&i.indexOf(",")<0&&(t=i),t in qi&&t!==Sn&&(e._gsap.x||Ni(e,"x"))?n&&fm===n?t==="scale"?E2:T2:(fm=n||{})&&(t==="scale"?A2:R2):e.style&&!Rd(e.style[t])?b2:~t.indexOf("-")?w2:kd(e,t)},core:{_removeProperty:xs,_getMatrix:Wd}};wn.utils.checkPrefix=fa;wn.core.getStyleSaver=K_;(function(r,e,t,n){var i=xn(r+","+e+","+t,function(s){qi[s]=1});xn(e,function(s){Fn.units[s]="deg",e0[s]=1}),_i[i[13]]=r+","+e,xn(n,function(s){var a=s.split(":");_i[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");xn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Fn.units[r]="px"});wn.registerPlugin(i0);var pa=wn.registerPlugin(i0)||wn;pa.core.Tween;const mi=Object.keys(oi),Hl={};for(const r of mi){const e=oi[r].lightColor||oi[r].color;Hl[r]=parseInt(e.slice(1),16)}const k2=document.getElementById("canvas"),on=new jb({canvas:k2,antialias:!0,powerPreference:"high-performance",stencil:!1});on.setPixelRatio(Math.min(window.devicePixelRatio,1.5));on.setSize(window.innerWidth,window.innerHeight);on.shadowMap.enabled=!0;on.shadowMap.type=jm;on.toneMapping=Ym;on.toneMappingExposure=1;const Ht=new Yb;Ht.background=new oe(854048);const ft=new qT(window.innerWidth/window.innerHeight);Ht.add(ft.camera);ft.setLoadingView();const _n=new Ue;Ht.add(_n);const qt=new FT;Ht.add(qt.sceneGroup);const Nt=new dA,s0="ontouchstart"in window||navigator.maxTouchPoints>0,ic={},Va=new Set;let oo=!1,Ka=0;const z2=1.1,r0=new St,a0=new St,V2=new C(0,1,0);function H2(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}function G2(r){if(!ic[r]||oo||!ir)return;Jt==="detail"&&(Jt="near",Nt.closePanel()),r0.copy(_n.quaternion),a0.setFromUnitVectors(ic[r],V2),oo=!0,Ka=0;const e=document.getElementById("teleport-flash");e&&!os&&(e.classList.add("active"),setTimeout(()=>e.classList.remove("active"),220))}const nr=new fA(G2),sc=new pA,W2=new mA,ji=new vA,Yi=new xA;Yi.onStartClose=()=>{rc=!1,setTimeout(()=>{ft._distTarget=M0,Js&&No?(pa.killTweensOf(rt.rotation),pa.to(rt.rotation,{y:Math.PI-Ii,duration:.4,ease:"power2.inOut",onComplete:bm})):bm()},200)};Yi.onClose=()=>{Jt==="detail"&&(Jt="near",ht&&Nt.showPopup(oi[ht]))};const Eh=new ie,Sm=new Td;Yi.shouldCloseFromBackdrop=r=>!rt||!rt.visible?!0:(Eh.x=r.clientX/window.innerWidth*2-1,Eh.y=-(r.clientY/window.innerHeight)*2+1,Sm.setFromCamera(Eh,ft.camera),Sm.intersectObject(rt,!0).length===0);function bm(){ls&&(ls=!1,ni=!1,ea=0)}let os=ji.reducedMotion;ji.onQualityChange=r=>{const e=r==="low"?1:r==="high"?Math.min(window.devicePixelRatio,2):Math.min(window.devicePixelRatio,1.5);on.setPixelRatio(e),on.shadowMap.enabled=r!=="low"};ji.onReducedMotionChange=r=>{os=r,document.body.classList.toggle("reduced-motion",r)};const Qr=document.getElementById("controls-hint"),X2=5;let o0=!0,Ja=!0;ji.onHintsChange=r=>{o0=r,Qr&&(Qr.setAttribute("aria-hidden",String(!r)),r||(Qr.classList.add("faded"),Ja=!1))};ji.applyRestored();const xa=document.createElement("div");xa.id="hud-buttons";xa.innerHTML=`
  <button class="hud-btn" type="button" id="btn-map"      aria-label="Island map (M)" title="Island Map (M)">${tt("map",18)}</button>
  <button class="hud-btn" type="button" id="btn-help"     aria-label="How to play"    title="How to Play">${tt("help",18)}</button>
  <button class="hud-btn" type="button" id="btn-settings" aria-label="Options"        title="Options">${tt("settings",18)}</button>
`;document.body.appendChild(xa);xa.querySelector("#btn-map").addEventListener("click",()=>nr.toggle());xa.querySelector("#btn-help").addEventListener("click",()=>sc.toggle());xa.querySelector("#btn-settings").addEventListener("click",()=>ji.toggle());function vc(){return nr.isOpen()||sc.isOpen()||ji.isOpen()||Yi.isOpen()}function q2(){return Yi.isOpen()?(Yi.close(),!0):ji.isOpen()?(ji.close(),!0):sc.isOpen()?(sc.close(),!0):nr.isOpen()?(nr.close(),!0):!1}const yc=document.createElement("div");yc.id="hud-left";const j2=[["github","GitHub","https://github.com/erriiiccccccc"],["linkedin","LinkedIn","https://www.linkedin.com/in/erriiiccccccc/"],["instagram","Instagram","https://www.instagram.com/ericccc____/"],["mail","Email","mailto:ericng8766@gmail.com"]];yc.innerHTML=`
  <div class="hud-progress" aria-live="polite" aria-label="Islands discovered">
    <div class="hp-top">
      <span class="hp-ic">${tt("globe",14)}</span>
      <span class="hp-count"><b id="ic-count">0</b> <span class="hp-total">/ 6</span></span>
      <span class="hp-label">Islands</span>
    </div>
    <div class="hp-pips" id="hp-pips" aria-hidden="true">${Array.from({length:6},()=>'<span class="hp-pip"></span>').join("")}</div>
  </div>
  <div class="hud-socials">
    ${j2.map(([r,e,t])=>`<a class="hud-social" href="${t}"${t.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""} aria-label="${e}" title="${e}">${tt(r,16)}</a>`).join("")}
  </div>
`;document.body.appendChild(yc);const wm=document.getElementById("ic-count"),Y2=[...yc.querySelectorAll(".hp-pip")],$s=document.createElement("div");$s.id="discover-toast";$s.setAttribute("role","status");$s.setAttribute("aria-live","polite");document.body.appendChild($s);let Tm=!1;function $2(r,e=4500){$s.innerHTML=r,$s.classList.add("show"),setTimeout(()=>$s.classList.remove("show"),e)}const l0=document.createElement("div");l0.id="teleport-flash";document.body.appendChild(l0);const jt=s0?new OT:null;if(jt){const r=document.getElementById("touch-controls");r&&r.classList.add("active")}const li=25,Ks=new Sd(16777215,0,li*3,Math.PI/6,.5,2);Ks.position.set(0,li*1.8,0);Ks.target.position.set(0,li,0);Ht.add(Ks);Ht.add(Ks.target);const bl=new oe,K2=[new C(55,30,-25),new C(20,45,55),new C(-55,35,20),new C(-25,28,-55),new C(35,50,35),new C(-35,38,-40)],Us=new C,Ah=new oe(16765056),Gu=[],Ns=new C,Ha=new C,J2=new C(0,0,0),Z2=new C(0,1,0),Em=new C,Rh=new C,Ch=new C,c0="./".replace(/\/?$/,"/"),Q2=new Kg;Q2.load(c0+"world.glb",r=>{var h;const e=r.scene,t=new rn().setFromObject(e),n=new ci;t.getBoundingSphere(n);const i=li/n.radius;e.scale.setScalar(i);const a=new rn().setFromObject(e).getCenter(new C);e.position.sub(a);let o=0;e.traverse(u=>{u.isMesh&&(u.castShadow=!0,u.receiveShadow=!0,u.name&&u.name.toLowerCase().includes("(terrain)")?(u.layers.enable(1),o++):u.layers.enable(2));const d=u.name;d&&oi[d]&&!Rm[d]&&(Rm[d]=u,ei[d]=[],u.traverse(f=>{f.isMesh&&(f.material=f.material.clone(),f.material.emissive=new oe(0),f.material._origColor=f.material.color.clone(),f.material.color.multiplyScalar(.35),f.material._isFloor=!0,ei[d].push(f))}))}),o>0&&(Wu.layers.set(1),d0=!0),_n.add(e),ir=e,_n.updateMatrixWorld(!0);const l=new rn,c=new C;for(const u of mi)if(ei[u]&&ei[u].length){l.makeEmpty();for(const d of ei[u])l.expandByObject(d);l.getCenter(c),_n.worldToLocal(c),c.lengthSq()>1e-4&&(ic[u]=c.clone().normalize())}{const u={},d=new C;for(const p of mi){if(!((h=ei[p])!=null&&h.length))continue;const _=new rn;for(const g of ei[p])_.expandByObject(g);_.expandByScalar(3),u[p]=_}const f=new Set;for(const p of mi)(ei[p]||[]).forEach(_=>f.add(_));ir.traverse(p=>{var _;if(!(!p.isMesh||f.has(p))){new rn().setFromObject(p).getCenter(d);for(const g of mi)if((_=u[g])!=null&&_.containsPoint(d)){p.material=p.material.clone(),p.material.emissive=new oe(0),p.material._origColor=p.material.color.clone(),p.material.color.multiplyScalar(.35),p.material._isFloor=!1,ei[g].push(p),f.add(p);break}}})}for(const u of mi)for(const d of ei[u]||[])f0.set(d,u);Fm||(Fm=!0,on.compile(Ht,ft.camera),dR(e))},r=>{r.total>0&&Co(Math.min(92,r.loaded/r.total*92))},r=>console.error("GLB load error:",r));let ir=null;const Wu=new Td,Xu=new Td;Xu.layers.set(2);const h0=new C(0,li*2,0),u0=new C(0,-1,0);let d0=!1;function eR(r){let e=r;for(;e;){if(oi[e.name])return e.name;e=e.parent}return null}function Am(){if(!ir)return li;Wu.set(h0,u0);const r=Wu.intersectObject(ir,!0);return r.length>0?(ht=f0.get(r[0].object)??eR(r[0].object),r[0].point.y):(ht=null,li)}const Rm={},ei={},f0=new Map;let Jt="exploring",ht=null;const p0=new bT;Ht.add(p0.points);const Ao=new DT(ft.camera);Ht.add(Ao.group);const m0=new KT;Ht.add(m0.group);const g0=new SE;Ht.add(g0.group);const _0=new EE;_n.add(_0.group);const Kt=new UT;Kt.group.position.set(0,li+.9,0);Ht.add(Kt.group);const rt=new Ue;rt.position.set(0,li+.9,0);Ht.add(rt);let Js=!1;const Ro=new kT;let No=!1;new Lw;const Ir=c0+"locomotionNEW/",Cm=new Kg;Cm.load(Ir+"ericlowpolyskeleton.glb",r=>{const e=r.scene,t=new rn().setFromObject(e);e.scale.setScalar(2.2/t.getSize(new C).y);const n=new rn().setFromObject(e);e.position.y=-n.min.y,e.traverse(a=>{if(!a.isMesh)return;a.castShadow=!0;const o=a.material;o&&o.isMeshStandardMaterial&&(o.roughness=.62,o.map&&(o.emissiveMap=o.map,o.emissive.setRGB(1,1,1),o.emissiveIntensity=.16,Gu.push(o)),o.needsUpdate=!0)}),rt.add(e),Js=!0,Kt.group.visible=!1;const i=a=>new Promise((o,l)=>Cm.load(a,o,void 0,l)),s=a=>a.status==="fulfilled"&&a.value.animations[0]||null;Promise.allSettled([i(Ir+"walk.glb"),i(Ir+"run.glb"),i(Ir+"idleagree.glb"),i(Ir+"idlecall.glb"),i(Ir+"idlegreet.glb")]).then(([a,o,l,c,h])=>{const u=s(a),d=s(o);u||console.warn("[AnimCtrl] walk.glb had no animation"),d||console.warn("[AnimCtrl] run.glb had no animation");const f=[s(l),s(c),s(h)].filter(Boolean);Ro.loadGlbClips(e,{idle:null,walk:u,run:d,emotes:f}),No=!0,e.traverse(p=>{if(!p.isBone&&p.type!=="Bone")return;const _=p.name.toLowerCase();for(const[g,m]of Object.entries(sR))!Wr[g]&&m.some(x=>_.includes(x))&&(Wr[g]=p,S0[g]={x:p.rotation.x,y:p.rotation.y})})})},void 0,r=>console.error("ericlowpolyskeleton.glb load error:",r));const v0=new NT,y0=5,tR=22;let Ur=0,ea=0,ni=!0,ls=!1,x0=0,qu=!1,M0=16,rc=!1;const Wr={head:null,neck:null,spine:null,leftEye:null,rightEye:null},S0={},nR=1,iR=1,ju={head:{x:0,y:0},neck:{x:0,y:0},spine:{x:0,y:0},leftEye:{x:0,y:0},rightEye:{x:0,y:0}};let b0=0,w0=0;document.addEventListener("mousemove",r=>{b0=r.clientX/window.innerWidth*2-1,w0=-(r.clientY/window.innerHeight)*2+1});const sR={head:["head"],neck:["neck"],spine:["spine1","spine2","spine"],leftEye:["lefteye","eye.l","eye_l","eyel","left_eye"],rightEye:["righteye","eye.r","eye_r","eyer","right_eye"]},wl={head:{yaw:.35,pitch:.22,lerp:.08,yc:.45,pc:.3},neck:{yaw:.18,pitch:.1,lerp:.06,yc:.25,pc:.18},spine:{yaw:.06,pitch:.03,lerp:.04,yc:.12,pc:.08},eyes:{yaw:.55,pitch:.35,lerp:.14,yc:.35,pc:.25}};function rR(){const{clamp:r,lerp:e}=Dt,t=b0,n=w0,i=[{key:"head",bone:Wr.head,cfg:wl.head},{key:"neck",bone:Wr.neck,cfg:wl.neck},{key:"spine",bone:Wr.spine,cfg:wl.spine}];for(const{key:a,bone:o,cfg:l}of i){if(!o)continue;const c=ju[a],h=nR,u=iR;c.y=e(c.y,r(h*t*l.yaw,-l.yc,l.yc),l.lerp),c.x=e(c.x,r(u*n*l.pitch,-l.pc,l.pc),l.lerp);{const d=S0[a]||{x:0,y:0};o.rotation.y=d.y+c.y,o.rotation.x=d.x+c.x}}const s=wl.eyes;for(const a of["leftEye","rightEye"]){const o=Wr[a];if(!o)continue;const l=ju[a];l.y=e(l.y,r(t*s.yaw,-.35,s.yc),s.lerp),l.x=e(l.x,r(-n*s.pitch,-.25,s.pc),s.lerp),o.rotation.y+=l.y,o.rotation.x+=l.x}}let xc=!1;document.addEventListener("keydown",r=>{if(r.key!==" "&&r.key!=="Spacebar")return;const e=r.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||vc()||Nt.isPanelOpen()||(r.preventDefault(),xc=!0,Yu())});document.addEventListener("keyup",r=>{(r.key===" "||r.key==="Spacebar")&&(xc=!1)});function Yu(){!ni||!No||Ro.triggerJump()&&(ea=y0,ni=!1)}function Xd(){if(!(Jt!=="near"||!ht)){if(Jt="detail",Nt.hidePopup(),ht==="meadow_island"){No&&(Ro.triggerJump(),ea=y0*2.5,ni=!1,Js&&(qu=!0,pa.killTweensOf(rt.rotation),pa.to(rt.rotation,{y:-ft._yaw,duration:.5,ease:"power2.out"}))),M0=ft._distTarget,ft._distTarget=2.5,setTimeout(()=>{ls=!0,x0=Ur,ni=!0,qu=!1;for(const r of Object.values(ju))r.x=0,r.y=0;Yi.open(),rc=!0},360);return}Nt.openPanel(oi[ht])}}function ac(){Jt==="detail"&&(Jt="near",Nt.closePanel(),ht&&Nt.showPopup(oi[ht]))}Nt.onPopupTap=Xd;Nt.onClosePanel=ac;document.addEventListener("keydown",r=>{const e=r.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))return;const t=r.key.toLowerCase();if(r.key==="Escape"){if(q2()){r.preventDefault();return}if(Jt==="detail"){ac(),r.preventDefault();return}}vc()||(t==="e"&&(Jt==="detail"?ac():Xd()),t==="m"&&!Nt.isPanelOpen()&&nr.toggle())});window.addEventListener("resize",()=>{on.setSize(window.innerWidth,window.innerHeight),ft.resize(window.innerWidth/window.innerHeight)});function T0(){return vc()||Nt.isPanelOpen()}let Pm=!1;function aR(){const r=T0();r!==Pm&&(Pm=r,v0.setEnabled(!r),ft.setInputEnabled(!r),r&&(xc=!1))}const Tl=document.getElementById("loader"),Lm=document.getElementById("ldr-pct"),Im=document.getElementById("ldr-bar-fill"),Ga=document.getElementById("ldr-label");document.getElementById("canvas");let Dm=0,Fm=!1;const Um=["Warping spacetime","Sculpting islands","Placing stars","Calibrating orbit","Summoning Eric","Painting atmosphere"];let Ph=0;const oR=setInterval(()=>{Ph=(Ph+1)%Um.length,Ga&&(Ga.style.opacity="0",setTimeout(()=>{Ga&&(Ga.textContent=Um[Ph],Ga.style.opacity="1")},200))},1600);let lo=0,E0=!1,Nm=0,Om=!1,Dr=-1;const lR=.82;function cR(r){return 1+2.6015800000000002*(r-1)**3+1.60158*(r-1)**2}function Co(r){lo=Math.min(r,100),Lm&&(Lm.textContent=Math.floor(lo)+"%"),Im&&(Im.style.width=lo+"%")}const Bm=55,hR=160,uR=2.2;function dR(r){const e=Ao.flushOut(),t=r.position.x;if(os){Ao.clear(),r.position.x=t,r.rotation.y=0,Co(100),km();return}const i=Math.tan(Dt.degToRad(ft.camera.fov)/2)*ft.camera.position.z*(window.innerWidth/window.innerHeight),s=t+i+30;r.position.x=s,r.rotation.y=-.45;const a=s-t,o=a*.18,l=(a-o)/Bm,c=2*o/Bm,h={p:lo},u=pa.timeline({delay:e?.25:0,onComplete:km});u.to(r.position,{x:t+o,duration:l,ease:"none"},0).to(r.position,{x:t,duration:c,ease:"power2.out"}),u.to(r.rotation,{y:0,duration:l+c,ease:"sine.out"},0),u.to(h,{p:100,duration:Math.min(.9,l),ease:"none",onUpdate:()=>Co(h.p)},0)}function km(){Co(100),Ao.clear(),setTimeout(()=>{E0=!0,Tl&&Tl.classList.add("fade-out"),setTimeout(()=>{Tl&&(Tl.style.display="none"),clearInterval(oR)},1400);const r=!!localStorage.getItem("phf-intro-seen");setTimeout(()=>W2.open(r),900)},hR)}const fR=new Y1;let El=0,Al=0;const pR=.7,zm=2.4,mR=1.8;let Ii=0,Wa=0;const Vm=new C,Hm=new St,Gm=new St,Lh=new St,gR=1.5,_R=5,vR=9;let rs=li,Rl=0;function Wm(r){const e=rt.visible,t=Kt.group.visible;ft.camera.updateMatrixWorld(!0),_n.updateMatrixWorld(!0),Kt.group.updateMatrixWorld(!0),rt.updateMatrixWorld(!0),r&&Js&&rt.children.length>0?(on.compile(rt,ft.camera,Ht),rt.visible=!0,Kt.group.visible=!1):(on.compile(Kt.group,ft.camera,Ht),rt.visible=!1,Kt.group.visible=!0),on.render(Ht,ft.camera),on.render(Ht,ft.camera),rt.visible=e,Kt.group.visible=t}function A0(){requestAnimationFrame(A0);const r=Math.min(fR.getDelta(),.05);if(El+=r,aR(),!E0){Dm+=r;const F=Math.min(92,Dm*22);lo<F&&Co(F),Kt.group.visible=!1,rt.visible=!1,Ao.update(r,os),on.render(Ht,ft.camera);return}Nm+=r;const e=T0(),t=v0.keys,n=t.has("shift"),i=pR*(n?mR:1),s=e?0:(jt==null?void 0:jt.joyX)??0,a=e?0:(jt==null?void 0:jt.joyY)??0;if(jt!=null&&jt.takeMap()&&!e&&nr.toggle(),jt&&!e){const{dx:F,dy:I}=jt.popCamDelta();(F||I)&&ft.applyTouchDelta(F,I)}jt!=null&&jt.takeInteract()&&!vc()&&(Jt==="detail"?ac():Xd()),jt!=null&&jt.takeJump()&&!e&&Yu();const o=a<-.15,l=a>.15,c=s<-.15,h=s>.15,u=t.has("w")||t.has("arrowup")||o,d=t.has("s")||t.has("arrowdown")||l,f=t.has("a")||t.has("arrowleft")||c,p=t.has("d")||t.has("arrowright")||h,_=u||d||f||p;_||e?Al=0:Al+=r,Qr&&o0&&(_||e?Ja&&(Ja=!1,Qr.classList.add("faded")):Al>X2&&!Ja&&(Ja=!0,Qr.classList.remove("faded")));let g=!0,m;if(oo)Ka=Math.min(1,Ka+r/z2),_n.quaternion.slerpQuaternions(r0,a0,H2(Ka)),Ka>=1&&(oo=!1),Wa*=Math.exp(-5*r);else{f&&(Ii-=zm*r*(c?Math.min(1,Math.abs(s)*1.35):1)),p&&(Ii+=zm*r*(h?Math.min(1,Math.abs(s)*1.35):1));const F=u?i:d?-i:0;if(Wa+=(F-Wa)*(1-Math.exp(-5*r)),Math.abs(Wa)>.001&&(Lh.copy(_n.quaternion),Vm.set(Math.cos(Ii),0,Math.sin(Ii)),Hm.setFromAxisAngle(Vm,Wa*r),_n.quaternion.premultiply(Hm),ni&&(m=Am(),g=!1,m-rs>gR&&(_n.quaternion.copy(Lh),g=!0),d0&&!g))){Xu.set(h0,u0);const I=Xu.intersectObject(ir,!0);I.length>0&&I[0].point.y>m+.25&&(_n.quaternion.copy(Lh),g=!0)}Al>5&&!os&&!ls&&!e&&(Gm.setFromAxisAngle(new C(0,1,0),.003),_n.quaternion.premultiply(Gm),g=!0)}!ni&&!ls?(ea-=tR*r,Ur+=ea*r,Ur<=0&&(Ur=0,ea=0,ni=!0,xc&&Yu())):ls&&(Ur=x0),g&&(m=Am()),!ni||oo?rs=m:m>rs?rs=Math.min(m,rs+_R*r):rs=Math.max(m,rs-vR*r);const x=rs+Ur,y=Math.PI-Ii;No?(Ro.emotesEnabled=!ls&&!Yi.isOpen(),Ro.update(r,_,n,!ni),Yi.isOpen()&&!s0&&rR()):Kt.update(r,_,El,!ni),Jt!=="detail"?ht?((Jt!=="near"||Nt._lastIsland!==ht)&&(Jt="near",Nt._lastIsland=ht,Nt.showPopup(oi[ht])),Va.has(ht)||(Va.add(ht),nr.markVisited(ht),wm&&(wm.textContent=String(Va.size)),Y2.forEach((F,I)=>F.classList.toggle("hp-pip--on",I<Va.size)),Va.size===mi.length&&!Tm&&(Tm=!0,$2(`<span class="dt-row">${tt("trophy",16)}<span><strong>All 6 islands found!</strong> You've seen everything.</span></span>`,5e3)))):Jt==="near"&&(Jt="exploring",Nt._lastIsland=null,Nt.hidePopup()):(!ht||ht!==Nt._lastIsland)&&(Jt="exploring",Nt._lastIsland=null,Nt.closePanel(),Nt.hidePopup());const v=1-Math.exp(-3.5*r);for(let F=0;F<mi.length;F++){const I=mi[F],D=ei[I];if(!D||!D.length)continue;const z=I===ht,N=z&&!oi[I].noGlow?.45:0,G=z?1:.5;for(let V=0;V<D.length;V++){const $=D[V],ne=$.material._origColor;ne&&($.material.color.r+=(ne.r*G-$.material.color.r)*v,$.material.color.g+=(ne.g*G-$.material.color.g)*v,$.material.color.b+=(ne.b*G-$.material.color.b)*v),$.material._isFloor&&($.material.emissiveIntensity+=(N-$.material.emissiveIntensity)*v,z?$.material.emissive.setHex(Hl[I]):$.material.emissiveIntensity<.002&&$.material.emissive.set(0,0,0))}}const E=ht?6:0;Ks.intensity+=(E-Ks.intensity)*v,ht&&(bl.setHex(Hl[ht]),Ks.color.lerp(bl,v));const b=ht?5:4;qt.sunLight.intensity+=(b-qt.sunLight.intensity)*v;const T=1-Math.exp(-1.2*r);if(ht){const F=mi.indexOf(ht);F>=0&&(Us.copy(K2[F]),qt.sunLight.position.lerp(Us,T)),bl.setHex(Hl[ht]),Ah.set(16765056).lerp(bl,.18),qt.sunLight.color.lerp(Ah,v)}else{const F=1-Math.exp(-2.5*r);Us.set(Math.sin(Ii)*55,50,-Math.cos(Ii)*55),qt.sunLight.position.lerp(Us,F),qt.sunLight.color.lerp(Ah.set(16771264),v)}{const F=rc,I=F?1.15:.16;for(let D=0;D<Gu.length;D++){const z=Gu[D];z.emissiveIntensity+=(I-z.emissiveIntensity)*v}ft._pivotYExtra+=((F?.7:0)-ft._pivotYExtra)*v}if(rc){Ns.copy(ft.camera.position).sub(rt.position),Ns.y=0,Ns.lengthSq()<1e-4&&Ns.set(0,0,1),Ns.normalize(),ft.camera.getWorldDirection(Em),Rh.crossVectors(Em,Z2).normalize(),Ha.set(rt.position.x,rt.position.y+1.4,rt.position.z);const F=8,I=8,D=5.5,z=.7;Us.copy(Ha).addScaledVector(Ns,F).addScaledVector(Rh,-D),Us.y=rt.position.y+I,qt.sunLight.position.lerp(Us,T),qt.sunLight.target.position.lerp(Ha,T),qt.sunLight.target.updateMatrixWorld(),qt.sunLight.intensity+=(z-qt.sunLight.intensity)*v;const N=qt.presentationSun2;Ch.copy(Ha).addScaledVector(Ns,F).addScaledVector(Rh,D),Ch.y=rt.position.y+I,N.position.lerp(Ch,T),N.target.position.copy(Ha),N.target.updateMatrixWorld(),N.color.copy(qt.sunLight.color),N.intensity+=(z-N.intensity)*v}else qt.sunLight.target.position.lerp(J2,T),qt.sunLight.target.updateMatrixWorld(),qt.presentationSun2.intensity+=(0-qt.presentationSun2.intensity)*v;p0.update(El,0),os||m0.update(r),g0.update(r,El,os),_0.update(r,ht,x,os,ic),ft.update(r,li,x,-1,null,_n,Ii,_);const R=ft.characterRevealReady||Nm>uR;let M=1,S=0,L=0;if(R&&!Om&&(Dr=0),Om=R,!R)Dr=-1,Kt.group.scale.setScalar(1),rt.scale.setScalar(1),Kt.group.visible=!1,rt.visible=!1;else{const F=Js;if(Kt.group.visible=!F,rt.visible=!0,Dr>=0){Dr+=r;const I=Math.min(1,Dr/lR),D=cR(I);M=Math.max(.04,D),S=(1-I)*(1-I)*2.4,L=Math.sin(I*Math.PI*3.25)*(1-I)*1.05,I>=1&&(Dr=-1,M=1,S=0,L=0)}}ls||(rt.position.set(0,x+S,0),rt.scale.setScalar(M),Kt.group.position.set(0,x+S,0),Kt.group.scale.setScalar(M),qu||(rt.rotation.y=y+L,Kt.group.rotation.y=y+L)),ir&&(Js&&Rl<2?(Wm(!0),Rl=2):!Js&&Rl<1&&(Wm(!1),Rl=1)),on.render(Ht,ft.camera)}A0();
