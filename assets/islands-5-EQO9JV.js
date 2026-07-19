const A={leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',snowflake:'<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',mountain:'<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',compass:'<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>',map:'<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',world:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',mapPin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',instagram:'<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'},C={github:'<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>',linkedin:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'};function o(e,t=24,s=1.6){if(C[e])return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${C[e]}</svg>`;const l=A[e]||A.compass;return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${l}</svg>`}const D="./",_=[{label:"Languages",items:[{k:"python",n:"Python"},{k:"java",n:"Java"},{k:"c",n:"C"},{k:"cpp",n:"C++"},{k:"csharp",n:"C#"},{k:"javascript",n:"JavaScript"},{k:"typescript",n:"TypeScript"},{k:"haskell",n:"Haskell"},{k:"bash",n:"Bash"},{m:"MIPS",n:"MIPS Assembly"}]},{label:"Frontend & Creative Web",items:[{k:"react",n:"React"},{k:"nodejs",n:"Node.js"},{k:"express",n:"Express",inv:!0},{k:"flask",n:"Flask",inv:!0},{m:"JSP",n:"JSP"},{k:"html5",n:"HTML5"},{k:"css3",n:"CSS3"},{k:"threejs",n:"Three.js"},{k:"d3",n:"D3.js"},{k:"gsap",n:"GSAP",inv:!0}]},{label:"Data & AI",items:[{k:"pandas",n:"pandas"},{k:"numpy",n:"NumPy"},{k:"matplotlib",n:"Matplotlib"},{k:"scikitlearn",n:"scikit-learn"},{k:"pytorch",n:"PyTorch"},{k:"huggingface",n:"Hugging Face"}]},{label:"Search, Databases & Infra",items:[{k:"elasticsearch",n:"Elasticsearch"},{k:"kibana",n:"Kibana"},{k:"logstash",n:"Logstash",inv:!0},{k:"postgresql",n:"PostgreSQL"},{k:"mysql",n:"MySQL"},{k:"oracle",n:"Oracle DB"},{k:"docker",n:"Docker"},{k:"kubernetes",n:"Kubernetes"},{k:"linux",n:"Linux"},{k:"nginx",n:"Nginx"},{k:"git",n:"Git"}]},{label:"Robotics & Hardware",items:[{k:"ros",n:"ROS 2",inv:!0},{m:"TB",n:"TurtleBot"},{k:"raspberrypi",n:"Raspberry Pi"},{k:"arduino",n:"Arduino"}]},{label:"3D, CAD & Fabrication",items:[{k:"blender",n:"Blender"},{k:"unity",n:"Unity",inv:!0},{m:"F360",n:"Fusion 360"},{k:"openscad",n:"OpenSCAD",inv:!0},{m:"BL",n:"Bambu Lab"},{m:"UM",n:"Ultimaker"},{m:"xT",n:"xTool"}]},{label:"Tools & Ways of Working",items:[{k:"postman",n:"Postman"},{k:"jira",n:"Jira"},{k:"confluence",n:"Confluence"},{k:"figma",n:"Figma"},{m:"SAFe",n:"SAFe Agile"},{m:"MOS",n:"MOS Certified"}]}];function U(e,t){const s=e.k?`<span class="tech-logo"><img src="${D}tech/${e.k}.svg" alt="" loading="lazy" decoding="async" width="36" height="36" draggable="false"></span>`:`<span class="tech-logo tech-mono">${e.m}</span>`;return`
    <figure class="tech-chip${e.inv?" tech-chip--invert":""}" style="--i:${t}">
      ${s}
      <figcaption class="tech-name">${e.n}</figcaption>
    </figure>`}const ee=`
  <div class="tech-layout">
    <aside class="tech-photo" style="background-image:url('${D}islandphoto/arcticislandphoto.jpeg')">
      <div class="tech-photo-cap">
        <span class="tech-photo-eyebrow">Field notes</span>
        <span class="tech-photo-line">Out on the glacier</span>
      </div>
    </aside>
    <div class="tech-groups">
      ${_.map(e=>`
        <section class="tech-group">
          <h3 class="tech-group-label">
            <span>${e.label}</span>
            <span class="tech-group-count">${e.items.length}</span>
          </h3>
          <div class="tech-grid">${e.items.map(U).join("")}</div>
        </section>
      `).join("")}
    </div>
  </div>
`;function ae(e){const t=[...e.querySelectorAll(".tech-group")];if(!t.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){t.forEach(n=>n.classList.add("is-in"));return}t.slice(0,2).forEach(n=>n.classList.add("is-in"));const s=t.slice(2);if(!s.length)return;const l=e.querySelector(".tech-groups")||e;requestAnimationFrame(()=>{requestAnimationFrame(()=>{const n=new IntersectionObserver(i=>{for(const d of i)d.isIntersecting&&(d.target.classList.add("is-in"),n.unobserve(d.target))},{root:l,rootMargin:"0px 0px -8% 0px",threshold:.05});for(const i of s)n.observe(i)})})}const T="./";var F;const V=(F=window.matchMedia)==null?void 0:F.call(window,"(prefers-reduced-motion: reduce)").matches,g=[{slug:"erics-world",title:"Eric's World",year:"2026",role:"Creative Dev",blurb:"The 3D walkable planet you're standing on right now — a Little Prince-inspired portfolio, fully procedural, built from Three.js primitives and a hand-rolled glass UI.",tags:["Three.js","Vite","GLSL"],accent:"#FF8A65",href:"https://erriiiccccccc.github.io",repo:"https://github.com/erriiiccccccc/erriiiccccccc.github.io"},{slug:"foundtech",title:"FoundTech",year:"2024",role:"Web Dev",blurb:"A clean, responsive marketing site for a Malaysian tech company — built and shipped live, with a smooth scrolling story from hero to footer.",tags:["Web","Responsive","Frontend"],accent:"#26C6DA",href:"https://foundtech.com.my"},{slug:"petaling-utama",title:"Petaling Utama Motor",year:"2024",role:"Full-Stack",blurb:"Full-stack e-commerce site for a real Malaysian motor business — live and in production, handling a real catalogue and real customers.",tags:["React","Node.js","PostgreSQL","Nginx"],accent:"#4CAF50",href:"https://petalingutamamotor.com"},{slug:"medmatch",title:"MedMatch",year:"2024",role:"Web Dev",blurb:"A matching platform that connects medical students with clinicians through verified profiles, purpose-built matching, and streamlined selection — research, without the friction.",tags:["Web","Platform","Frontend"],accent:"#EC407A",href:"https://www.medmatch.institute"},{slug:"ygo",title:"YGo Tours",year:"2024",role:"Web Dev",blurb:"A polished site for a Kuala Lumpur travel agency (est. 1994) — private journeys, corporate incentives, and specialty trips, presented with an editorial, magazine-style feel.",tags:["Web","Editorial","Frontend"],accent:"#7E57C2",href:"https://ygowebsite.vercel.app"},{slug:"sotwds",title:"Scotland on the Web",year:"2024",role:"Data Story",blurb:"A scrollytelling data story reading two web-archiving systems side by side — a manually curated seed list vs an automated stream — to surface what each kind of memory infrastructure preserves and misses.",tags:["Scrollytelling","Data Viz","D3"],accent:"#29B6F6",href:"https://sotwds.vercel.app"},{slug:"elk-pipeline",title:"ELK Logging Pipeline",year:"2023",role:"Internship",blurb:"An Elasticsearch + Kibana + Logstash pipeline on Oracle Linux for a fintech platform at Finexus — turning raw server logs into searchable, alertable dashboards.",tags:["Elasticsearch","Kibana","Linux"],accent:"#64B5F6"},{slug:"blender",title:"First Blender Project",year:"2023",role:"Personal",blurb:"Dove into 3D modeling and built a full scene from scratch — lighting, materials, the lot. Pretty proud of how it turned out for a first go.",tags:["Blender","3D Art"],accent:"#FBBF24"},{slug:"ada-hack",title:"Ada Hack 2022 — HumanEd",year:"2022",role:"Hackathon",blurb:"Hackathon winner at the University of Edinburgh, built for the Rubik's Cube Painting Challenge under a tight 24-hour clock.",tags:["Hackathon"],accent:"#7C3AED",badge:"Winner"}],f=e=>String(e).padStart(2,"0");function W(e,t){const s=e.tags.slice(0,3).join(" · ");return`
    <button class="pj-item${t===0?" is-active":""}" type="button" role="tab"
            aria-selected="${t===0}" data-i="${t}" style="--pc:${e.accent}">
      <span class="pj-item-index">${f(t+1)}</span>
      <span class="pj-item-main">
        <span class="pj-item-title">${e.title}</span>
        <span class="pj-item-meta">${s}</span>
      </span>
      ${e.badge?`<span class="pj-item-badge">${o("trophy",12)}</span>`:""}
      <span class="pj-item-go">${o("arrowRight",16)}</span>
    </button>`}const te=`
  <div class="pj-spread" style="--pc:${g[0].accent}">
    <section class="pj-feature" aria-live="polite">
      <div class="pj-stage">
        <div class="pj-stage-glow" aria-hidden="true"></div>
        <span class="pj-stage-index" aria-hidden="true">${f(1)}</span>
        <div class="pj-stage-ph" aria-hidden="true">${o("mountain",52)}</div>
        <img class="pj-stage-poster" alt="" aria-hidden="true" />
        <video class="pj-stage-video" muted loop playsinline preload="none"></video>
        <span class="pj-stage-badge" hidden>${o("trophy",13)} <span class="pj-stage-badge-txt"></span></span>
      </div>
      <div class="pj-feature-body">
        <div class="pj-feature-eyebrow">
          <span class="pj-kicker">Featured</span>
          <span class="pj-counter">${f(1)} / ${f(g.length)}</span>
        </div>
        <h3 class="pj-feature-title"></h3>
        <div class="pj-feature-sub"></div>
        <p class="pj-feature-blurb"></p>
        <div class="pj-feature-tags"></div>
        <div class="pj-feature-links"></div>
      </div>
    </section>

    <div class="pj-list" role="tablist" aria-label="Projects" aria-orientation="vertical">
      ${g.map(W).join("")}
    </div>
  </div>
`;function se(e){const t=e.querySelector(".pj-spread");if(!t)return;const s=[...e.querySelectorAll(".pj-item")],l=e.querySelector(".pj-feature"),n=e.querySelector(".pj-stage"),i=e.querySelector(".pj-stage-video"),d=e.querySelector(".pj-stage-poster"),c=e.querySelector(".pj-stage-index"),v=e.querySelector(".pj-stage-badge"),p=e.querySelector(".pj-stage-badge-txt"),u=e.querySelector(".pj-feature-title"),w=e.querySelector(".pj-feature-sub"),q=e.querySelector(".pj-feature-blurb"),H=e.querySelector(".pj-feature-tags"),R=e.querySelector(".pj-feature-links"),B=e.querySelector(".pj-counter");let b=-1,h=0,S=0;const I=()=>{i.pause(),i.removeAttribute("src"),i.load(),n.classList.remove("has-media")},O=(a,r)=>{if(r!==h)return;const y=`${T}projects/${a.slug}.webm`;i.muted=!0,i.playsInline=!0,i.src=y,i.oncanplay=()=>{r===h&&(n.classList.add("has-media"),i.play().catch(()=>{}))},i.onerror=()=>{r===h&&n.classList.remove("has-media")},i.play().catch(()=>{})},j=(a,r,{deferVideo:y=!0}={})=>{t.style.setProperty("--pc",a.accent),c.textContent=f(r+1),B.textContent=`${f(r+1)} / ${f(g.length)}`,u.textContent=a.title,w.innerHTML=`<span>${a.role}</span><span class="pj-dot"></span><span>${a.year}</span>`,q.textContent=a.blurb,H.innerHTML=a.tags.map(M=>`<span class="tag">${M}</span>`).join("")+(a.badge?`<span class="tag tag--accent">${o("trophy",13)} ${a.badge}</span>`:"");const x=[a.href?`<a class="pj-btn pj-btn--primary" href="${a.href}" target="_blank" rel="noopener noreferrer">${o("external",15)} Visit live</a>`:"",a.repo?`<a class="pj-btn" href="${a.repo}" target="_blank" rel="noopener noreferrer">${o("github",15)} Source</a>`:""].filter(Boolean).join("");R.innerHTML=x,clearTimeout(S),h+=1;const k=h;I(),d.removeAttribute("src"),n.classList.remove("has-poster");const $=`${T}projects/${a.slug}.jpg`;d.onload=()=>{k===h&&n.classList.add("has-poster")},d.onerror=()=>{k===h&&n.classList.remove("has-poster")},d.src=$,i.poster=$,a.badge?(p.textContent=a.badge,v.hidden=!1):v.hidden=!0;const E=()=>O(a,k);y?(L=>{"requestIdleCallback"in window?requestIdleCallback(L,{timeout:500}):S=setTimeout(L,320)})(E):E()},m=(a,r=!1)=>{if(a===b)return;if(b=a,s.forEach((x,k)=>{const $=k===a;x.classList.toggle("is-active",$),x.setAttribute("aria-selected",String($))}),r&&s[a].focus(),V){j(g[a],a,{deferVideo:!1});return}l.classList.add("is-swapping");const y=()=>{j(g[a],a,{deferVideo:!1}),requestAnimationFrame(()=>l.classList.remove("is-swapping"))};clearTimeout(m._t),m._t=setTimeout(y,150)};s.forEach((a,r)=>{a.addEventListener("click",()=>m(r))}),t.addEventListener("keydown",a=>{const r=a.key;r==="ArrowDown"||r==="ArrowRight"?(a.preventDefault(),m((b+1)%s.length,!0)):r==="ArrowUp"||r==="ArrowLeft"?(a.preventDefault(),m((b-1+s.length)%s.length,!0)):r==="Home"?(a.preventDefault(),m(0,!0)):r==="End"&&(a.preventDefault(),m(s.length-1,!0))}),j(g[0],0,{deferVideo:!0}),b=0}const N="./",z=[{year:"2026",role:"Teaching Assistant",org:"University of Edinburgh",mono:"UoE",logo:"uoe.svg",desc:"System Design & Mobile Robotics, guiding students through architecture and robotics labs."},{year:"2025",role:"Technology Analyst Intern",org:"Barclays",mono:"B",logo:"barclays.svg",desc:"Automated a 45-minute manual workflow down to near-instant."},{year:"2024–25",role:"AI Coding Trainer",org:"Outlier",mono:"O",desc:"Trained and evaluated LLM coding outputs."},{year:"2024–25",role:"Full-Stack Developer",org:"Freelance",mono:"PUM",desc:"Built & deployed petalingutamamotor.com end-to-end."},{year:"2024",role:"Technology Spring Intern",org:"BlackRock",mono:"BR",logo:"blackrock.svg",desc:"Aladdin engineering operations & systems."},{year:"2023",role:"Software Engineer Intern",org:"Finexus Group",mono:"F",desc:"ELK pipeline with a Java EE + Python backend."},{year:"2023–24",role:"Marketing Executive",org:"AMEU",mono:"A",desc:"Grew to 6,000+ accounts and a 120% engagement increase."}];function G(e,t){const s=t===0?" exp-item--now":"",l=e.logo?`<img class="exp-logo" src="${N}experience/${e.logo}" alt="${e.org} logo" loading="lazy" onerror="this.remove()">`:"";return`
    <li class="exp-item${s}">
      <span class="exp-tile">${l}<span class="exp-mono">${e.mono}</span></span>
      <div class="exp-content">
        <div class="exp-headline">
          <h4 class="exp-role">${e.role}</h4>
          ${t===0?'<span class="exp-now">Now</span>':""}
        </div>
        <div class="exp-meta">${e.org} · ${e.year}</div>
        <p class="exp-desc">${e.desc}</p>
      </div>
    </li>`}const ne=`
  <ol class="exp-list">
    ${z.map(G).join("")}
  </ol>
`,K="./",P="a6074af4-eff5-4f1f-8ffe-b1f0fcf63f9a",J=!P.startsWith("YOUR_"),Y=[["mail","Email","ericng8766@gmail.com","mailto:ericng8766@gmail.com"],["linkedin","LinkedIn","in/erriiiccccccc","https://www.linkedin.com/in/erriiiccccccc/"],["github","GitHub","erriiiccccccc","https://github.com/erriiiccccccc"],["instagram","Instagram","@ericccc____","https://www.instagram.com/ericccc____/"]],Q=Y.map(([e,t,s,l])=>`
  <a class="contact-row" href="${l}"${l.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""}>
    <span class="contact-ic">${o(e,18)}</span>
    <span class="contact-meta">
      <span class="contact-label">${t}</span>
      <span class="contact-text">${s}</span>
    </span>
    <span class="contact-go">${o("arrowRight",16)}</span>
  </a>`).join(""),Z=J?`
  <form class="contact-form" id="contact-form" novalidate>
    <input type="hidden" name="access_key" value="${P}">
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
      <button class="cf-submit" type="submit">${o("send",16)} <span>Send message</span></button>
      <span class="cf-status" role="status" aria-live="polite"></span>
    </div>
  </form>`:`
  <div class="cf-notice">The contact form isn't configured yet. Reach me directly on the left.</div>`,X=`
  <div class="ca-photo" style="background-image:url('${K}islandphoto/travelislandphoto.jpeg')" aria-hidden="true"></div>
  <div class="ca-scrim" aria-hidden="true"></div>`,ie=`
  <div class="contact-split">
    <aside class="contact-aside">
      ${X}
      <div class="ca-body">
        <span class="ca-eyebrow">Say hey</span>
        <h2 class="ca-title">Let's build something cool.</h2>
        <p class="ca-blurb">Got a project, a role, or just wanna say hi? Drop me a line.
        I read everything and reply fast.</p>
        <div class="ca-pills">
          <span class="ca-pill ca-pill--live"><span class="ca-dot"></span>Open to work</span>
          <span class="ca-pill">${o("mapPin",13)}London, UK</span>
          <span class="ca-pill">${o("clock",13)}Replies in ~a day</span>
        </div>
      </div>
      <div class="ca-socials">${Q}</div>
    </aside>

    <div class="contact-main">
      <div class="cf-head">
        <h3 class="cf-head-title">Drop me a message</h3>
        <p class="cf-head-sub">this goes straight to my inbox :)</p>
      </div>
      ${Z}
    </div>
  </div>
`;function ce(e){const t=e.querySelector("#contact-form");if(!t)return;const s=t.querySelector(".cf-status"),l=t.querySelector(".cf-submit"),n=[...t.querySelectorAll(".cf-input")],i=c=>t.querySelector(`.cf-error[data-for="${c}"]`),d=c=>{const v=i(c.name);let p="";return c.value.trim()?c.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value)&&(p="Enter a valid email address."):p="This field is required.",v&&(v.textContent=p),c.classList.toggle("cf-input--invalid",!!p),!p};n.forEach(c=>{c.addEventListener("blur",()=>d(c)),c.addEventListener("input",()=>{c.classList.contains("cf-input--invalid")&&d(c)})}),t.addEventListener("submit",async c=>{var p;if(c.preventDefault(),!n.map(d).every(Boolean)){(p=n.find(u=>u.classList.contains("cf-input--invalid")))==null||p.focus();return}l.disabled=!0,s.textContent="Sending…",s.className="cf-status cf-status--pending";try{const u=await fetch("https://api.web3forms.com/submit",{method:"POST",body:new FormData(t)}),w=await u.json().catch(()=>({}));if(u.ok&&w.success)t.innerHTML=`
          <div class="cf-success">
            <div class="cf-success-ic">${o("mail",26)}</div>
            <h4>Message sent!</h4>
            <p>Thanks for reaching out — I'll get back to you soon.</p>
          </div>`;else throw new Error(w.message||`HTTP ${u.status}`)}catch(u){s.textContent=`Couldn't send (${u.message}). Try again or email me directly.`,s.className="cf-status cf-status--error",l.disabled=!1}})}export{ie as C,ne as E,te as P,ee as T,se as a,ae as b,ce as i,o as s};
