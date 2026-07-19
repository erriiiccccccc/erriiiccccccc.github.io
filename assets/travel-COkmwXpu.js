import{s as y}from"./islands-5-EQO9JV.js";const C="./",h="/api/refresh-travel-stats",S="https://www.google.com/maps/d/u/0/embed?mid=1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8&ehbc=2E312F",v="Malaysia",$=[{name:"Great Wall of China",seen:!1},{name:"Petra",seen:!1},{name:"Christ the Redeemer",seen:!1},{name:"Machu Picchu",seen:!1},{name:"Chichén Itzá",seen:!1},{name:"Colosseum",seen:!1},{name:"Taj Mahal",seen:!1}];function x(t,e){const l=u=>u*Math.PI/180,s=l(e[0]-t[0]),n=l(e[1]-t[1]),o=l(t[0]),i=l(e[0]),r=Math.sin(s/2)**2+Math.cos(o)*Math.cos(i)*Math.sin(n/2)**2;return 2*6371*Math.asin(Math.sqrt(r))}function T(t){var l;const e=(l=t.find(s=>s.name===v))==null?void 0:l.latlng;if(!e)return null;let a=null;for(const s of t){if(s.name===v||!s.latlng)continue;const n=x(e,s.latlng);(!a||n>a.km)&&(a={name:s.name,km:n})}return a}let d=null,g=null,b=0;function c(t){return document.getElementById(t)}const D=`
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
      <figure class="tp-photo" style="background-image:url('${C}islandphoto/pirateislandphoto.jpeg')">
        <figcaption class="tp-photo-cap">
          <span class="tp-photo-eyebrow">From the log</span>
          <span class="tp-photo-line">Reeled one in off the coast</span>
        </figcaption>
      </figure>

      <div class="tp-actions">
        <button id="travel-refresh" class="tp-btn" type="button">${y("compass",14)} Reload</button>
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
`;function E({label:t,value:e,sub:a,link:l}){return l?`
      <button type="button" class="tp-box tp-box--link" data-scroll="flags" aria-label="Jump to the countries visited">
        <p class="tp-label">${t}</p>
        <p class="tp-value">${e??"–"}</p>
        <p class="tp-sub">${a??""} ${y("arrowRight",11)}</p>
      </button>`:`
    <div class="tp-box">
      <p class="tp-label">${t}</p>
      <p class="tp-value">${e??"–"}</p>
      <p class="tp-sub">${a??""}</p>
    </div>`}function p(t){const e=t.countriesList||[],a=t.countryData&&t.countryData.length?t.countryData:e.map(r=>({name:r,iso:null,continent:"Other",latlng:null})),l=a.length?new Set(a.map(r=>r.continent)).size:null,s=$.filter(r=>r.seen).length,n=a.length?T(a):null,o=[{label:"Countries",value:t.countries??(e.length||"–"),sub:"visited",link:!0},{label:"Continents",value:l??"–",sub:"of 7"},{label:"Places pinned",value:t.landmarks!=null?t.landmarks.toLocaleString("en-GB"):"–",sub:"on the map"},{label:"% of world",value:t.worldPct!=null?`${t.worldPct}%`:"–",sub:"explored"},{label:"New 7 Wonders",value:`${s}/7`,sub:"seen"},{label:"Furthest flung",value:n?n.name:"–",sub:n?`${(Math.round(n.km/10)*10).toLocaleString("en-GB")} km from home`:""}],i=c("tp-stats");i&&(i.innerHTML=o.map(E).join("")),g=t,L(a),M(t)}function f(t){const e=c("travel-status");e&&(e.textContent=t)}function M(t){if(t.error){f(`Error: ${t.error}`);return}if(!t.updatedAt){f("No data yet");return}const e=new Date(t.updatedAt),a=isNaN(e.getTime())?t.updatedAt:e.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1});f(`Updated ${a}`)}function A({name:t,iso:e}){const a=document.createElement("span");a.className=e?"tp-flag":"tp-flag tp-flag--plain",a.title=t,e&&(a.style.backgroundImage=`url('https://flagcdn.com/${e}.svg')`);const l=document.createElement("span");return l.className="tp-flag-name",l.textContent=t,a.appendChild(l),a}function L(t){const e=c("tp-flags"),a=c("tp-cloud-count");if(a&&(a.textContent=t.length||"–"),!e)return;if(!t.length){e.replaceChildren();return}const l=t.slice().sort((r,u)=>r.name.localeCompare(u.name));e.replaceChildren();const s=++b,n=10;let o=0;const i=()=>{if(s!==b||!e.isConnected)return;const r=document.createDocumentFragment(),u=Math.min(o+n,l.length);for(;o<u;o++)r.appendChild(A(l[o]));e.appendChild(r),o<l.length&&requestAnimationFrame(i)};i()}function k(t){const e=c("tp-stats");e&&(e.innerHTML=[{label:"Countries",value:"–",sub:"visited"},{label:"Continents",value:"–",sub:"of 7"},{label:"Places pinned",value:"–",sub:"on the map"},{label:"% of world",value:"–",sub:"explored"},{label:"New 7 Wonders",value:"–",sub:"seen"},{label:"Furthest flung",value:"–",sub:""}].map(E).join(""));const a=c("travel-status");a&&t&&(a.textContent=t)}async function m(t=!1){const e=c("travel-status");e&&(e.textContent=t?"Refreshing…":"Loading…"),d&&d.abort();const a=d=new AbortController,l=()=>fetch(`${C}travel-stats.json?_=${Date.now()}`,{signal:a.signal}),s=async n=>{if(!n.ok)throw new Error(`HTTP ${n.status}`);const o=await n.json();if(o.error)throw new Error(o.error);return o};try{if(t){let n,o=!1;try{n=await s(await fetch(`${h}?_=${Date.now()}`,{signal:a.signal})),o=!0}catch(i){if(i.name==="AbortError")return;n=await s(await l())}p(n),o&&fetch(h).catch(()=>{})}else{let n=null;try{n=await s(await l()),p(n),f("Checking for the latest…")}catch(o){if(o.name==="AbortError")return}try{const o=await s(await fetch(h,{signal:a.signal})),i=!(n!=null&&n.updatedAt)||new Date(o.updatedAt||0)>=new Date(n.updatedAt);p(i?o:n)}catch(o){if(o.name==="AbortError")return;if(!n)throw o;M(n)}}}catch(n){if(n.name==="AbortError")return;k(`Error: ${n.message}`),console.error("[TravelStats]",n)}finally{d===a&&(d=null)}}function w(){const t=c("tp-map-slot");if(!t)return;const e=document.createElement("iframe");e.src=S,e.width="100%",e.height="100%",e.loading="lazy",e.referrerPolicy="no-referrer-when-downgrade",e.title="Eric's travel map (Google My Maps embed)",e.style.cssText="border:none;border-radius:14px;display:block;width:100%;height:100%;min-height:300px;",e.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups"),t.replaceChildren(e);try{localStorage.setItem("phf-travel-map-loaded","1")}catch{}}function F(){const t=c("tp-map-load");if(t){t.onclick=w;try{localStorage.getItem("phf-travel-map-loaded")==="1"&&w()}catch{}}const e=document.querySelector(".travel-info-col"),a=c("tp-stats");a&&a.addEventListener("click",s=>{if(!s.target.closest('[data-scroll="flags"]'))return;const n=document.querySelector(".tp-cloud-head");n?n.scrollIntoView({behavior:"smooth",block:"start"}):e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})});const l=c("travel-refresh");if(l&&(l.title="Re-scan the travel map for newly pinned places",l.onclick=async()=>{l.disabled=!0;try{await m(!0)}finally{l.disabled=!1}}),g){p(g),m(!1);return}k(),m(!1)}export{D as T,F as i};
