import{s as v}from"./islands-ClYB82yH.js";const b="./",d="/api/refresh-travel-stats",M="https://www.google.com/maps/d/u/0/embed?mid=1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8&ehbc=2E312F",h="Malaysia",C=[{name:"Great Wall of China",seen:!1},{name:"Petra",seen:!1},{name:"Christ the Redeemer",seen:!1},{name:"Machu Picchu",seen:!1},{name:"Chichén Itzá",seen:!1},{name:"Colosseum",seen:!1},{name:"Taj Mahal",seen:!1}];function k(t,e){const s=$=>$*Math.PI/180,l=s(e[0]-t[0]),a=s(e[1]-t[1]),o=s(t[0]),i=s(e[0]),c=Math.sin(l/2)**2+Math.cos(o)*Math.cos(i)*Math.sin(a/2)**2;return 2*6371*Math.asin(Math.sqrt(c))}function S(t){var s;const e=(s=t.find(l=>l.name===h))==null?void 0:s.latlng;if(!e)return null;let n=null;for(const l of t){if(l.name===h||!l.latlng)continue;const a=k(e,l.latlng);(!n||a>n.km)&&(n={name:l.name,km:a})}return n}let p=null;function r(t){return document.getElementById(t)}const L=`
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
      <figure class="tp-photo" style="background-image:url('${b}islandphoto/pirateislandphoto.jpeg')">
        <figcaption class="tp-photo-cap">
          <span class="tp-photo-eyebrow">From the log</span>
          <span class="tp-photo-line">Reeled one in off the coast</span>
        </figcaption>
      </figure>

      <div class="tp-actions">
        <button id="travel-refresh" class="tp-btn" type="button">${v("compass",14)} Reload</button>
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
`;function w({label:t,value:e,sub:n,link:s}){return s?`
      <button type="button" class="tp-box tp-box--link" data-scroll="flags" aria-label="Jump to the countries visited">
        <p class="tp-label">${t}</p>
        <p class="tp-value">${e??"–"}</p>
        <p class="tp-sub">${n??""} ${v("arrowRight",11)}</p>
      </button>`:`
    <div class="tp-box">
      <p class="tp-label">${t}</p>
      <p class="tp-value">${e??"–"}</p>
      <p class="tp-sub">${n??""}</p>
    </div>`}function f(t){const e=t.countriesList||[],n=t.countryData&&t.countryData.length?t.countryData:e.map(c=>({name:c,iso:null,continent:"Other",latlng:null})),s=n.length?new Set(n.map(c=>c.continent)).size:null,l=C.filter(c=>c.seen).length,a=n.length?S(n):null,o=[{label:"Countries",value:t.countries??(e.length||"–"),sub:"visited",link:!0},{label:"Continents",value:s??"–",sub:"of 7"},{label:"Places pinned",value:t.landmarks!=null?t.landmarks.toLocaleString("en-GB"):"–",sub:"on the map"},{label:"% of world",value:t.worldPct!=null?`${t.worldPct}%`:"–",sub:"explored"},{label:"New 7 Wonders",value:`${l}/7`,sub:"seen"},{label:"Furthest flung",value:a?a.name:"–",sub:a?`${(Math.round(a.km/10)*10).toLocaleString("en-GB")} km from home`:""}],i=r("tp-stats");i&&(i.innerHTML=o.map(w).join("")),T(n),y(t)}function u(t){const e=r("travel-status");e&&(e.textContent=t)}function y(t){if(t.error){u(`Error: ${t.error}`);return}if(!t.updatedAt){u("No data yet");return}const e=new Date(t.updatedAt),n=isNaN(e.getTime())?t.updatedAt:e.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1});u(`Updated ${n}`)}function T(t){const e=r("tp-flags"),n=r("tp-cloud-count");if(n&&(n.textContent=t.length||"–"),!!e){if(!t.length){e.innerHTML="";return}e.innerHTML=t.slice().sort((s,l)=>s.name.localeCompare(l.name)).map(({name:s,iso:l})=>{if(!l)return`<span class="tp-flag tp-flag--plain" title="${s}"><span class="tp-flag-name">${s}</span></span>`;const a=`https://flagcdn.com/${l}.svg`;return`<span class="tp-flag" title="${s}" style="background-image:url('${a}')"><span class="tp-flag-name">${s}</span></span>`}).join("")}}function E(t){const e=r("tp-stats");e&&(e.innerHTML=[{label:"Countries",value:"–",sub:"visited"},{label:"Continents",value:"–",sub:"of 7"},{label:"Places pinned",value:"–",sub:"on the map"},{label:"% of world",value:"–",sub:"explored"},{label:"New 7 Wonders",value:"–",sub:"seen"},{label:"Furthest flung",value:"–",sub:""}].map(w).join(""));const n=r("travel-status");n&&t&&(n.textContent=t)}async function m(t=!1){const e=r("travel-status");e&&(e.textContent=t?"Refreshing…":"Loading…"),p&&p.abort();const n=p=new AbortController,s=()=>fetch(`${b}travel-stats.json?_=${Date.now()}`,{signal:n.signal}),l=async a=>{if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json();if(o.error)throw new Error(o.error);return o};try{if(t){let a,o=!1;try{a=await l(await fetch(`${d}?_=${Date.now()}`,{signal:n.signal})),o=!0}catch(i){if(i.name==="AbortError")return;a=await l(await s())}f(a),o&&fetch(d).catch(()=>{})}else{let a=null;try{a=await l(await s()),f(a),u("Checking for the latest…")}catch(o){if(o.name==="AbortError")return}try{const o=await l(await fetch(d,{signal:n.signal})),i=!(a!=null&&a.updatedAt)||new Date(o.updatedAt||0)>=new Date(a.updatedAt);f(i?o:a)}catch(o){if(o.name==="AbortError")return;if(!a)throw o;y(a)}}}catch(a){if(a.name==="AbortError")return;E(`Error: ${a.message}`),console.error("[TravelStats]",a)}finally{p===n&&(p=null)}}function g(){const t=r("tp-map-slot");if(!t)return;const e=document.createElement("iframe");e.src=M,e.width="100%",e.height="100%",e.loading="lazy",e.referrerPolicy="no-referrer-when-downgrade",e.title="Eric's travel map (Google My Maps embed)",e.style.cssText="border:none;border-radius:14px;display:block;width:100%;height:100%;min-height:300px;",e.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups"),t.replaceChildren(e);try{localStorage.setItem("phf-travel-map-loaded","1")}catch{}}function A(){const t=r("tp-map-load");if(t){t.onclick=g;try{localStorage.getItem("phf-travel-map-loaded")==="1"&&g()}catch{}}const e=document.querySelector(".travel-info-col"),n=r("tp-stats");n&&n.addEventListener("click",l=>{if(!l.target.closest('[data-scroll="flags"]'))return;const a=document.querySelector(".tp-cloud-head");a?a.scrollIntoView({behavior:"smooth",block:"start"}):e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})});const s=r("travel-refresh");s&&(s.title="Re-scan the travel map for newly pinned places",s.onclick=async()=>{s.disabled=!0;try{await m(!0)}finally{s.disabled=!1}}),E(),m(!1)}export{L as T,A as i};
