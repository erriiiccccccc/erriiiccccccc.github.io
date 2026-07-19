const j={leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',snowflake:'<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',mountain:'<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',compass:'<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>',map:'<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',world:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',mapPin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',instagram:'<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'},S={github:'<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>',linkedin:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'};function o(e,a=24,s=1.6){if(S[e])return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${S[e]}</svg>`;const r=j[e]||j.compass;return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${r}</svg>`}const L="./",P=[{label:"Languages",items:[{k:"python",n:"Python"},{k:"java",n:"Java"},{k:"c",n:"C"},{k:"cpp",n:"C++"},{k:"csharp",n:"C#"},{k:"javascript",n:"JavaScript"},{k:"typescript",n:"TypeScript"},{k:"haskell",n:"Haskell"},{k:"bash",n:"Bash"},{m:"MIPS",n:"MIPS Assembly"}]},{label:"Frontend & Creative Web",items:[{k:"react",n:"React"},{k:"nodejs",n:"Node.js"},{k:"express",n:"Express",inv:!0},{k:"flask",n:"Flask",inv:!0},{m:"JSP",n:"JSP"},{k:"html5",n:"HTML5"},{k:"css3",n:"CSS3"},{k:"threejs",n:"Three.js"},{k:"d3",n:"D3.js"},{k:"gsap",n:"GSAP",inv:!0}]},{label:"Data & AI",items:[{k:"pandas",n:"pandas"},{k:"numpy",n:"NumPy"},{k:"matplotlib",n:"Matplotlib"},{k:"scikitlearn",n:"scikit-learn"},{k:"pytorch",n:"PyTorch"},{k:"huggingface",n:"Hugging Face"}]},{label:"Search, Databases & Infra",items:[{k:"elasticsearch",n:"Elasticsearch"},{k:"kibana",n:"Kibana"},{k:"logstash",n:"Logstash",inv:!0},{k:"postgresql",n:"PostgreSQL"},{k:"mysql",n:"MySQL"},{k:"oracle",n:"Oracle DB"},{k:"docker",n:"Docker"},{k:"kubernetes",n:"Kubernetes"},{k:"linux",n:"Linux"},{k:"nginx",n:"Nginx"},{k:"git",n:"Git"}]},{label:"Robotics & Hardware",items:[{k:"ros",n:"ROS 2",inv:!0},{m:"TB",n:"TurtleBot"},{k:"raspberrypi",n:"Raspberry Pi"},{k:"arduino",n:"Arduino"}]},{label:"3D, CAD & Fabrication",items:[{k:"blender",n:"Blender"},{k:"unity",n:"Unity",inv:!0},{m:"F360",n:"Fusion 360"},{k:"openscad",n:"OpenSCAD",inv:!0},{m:"BL",n:"Bambu Lab"},{m:"UM",n:"Ultimaker"},{m:"xT",n:"xTool"}]},{label:"Tools & Ways of Working",items:[{k:"postman",n:"Postman"},{k:"jira",n:"Jira"},{k:"confluence",n:"Confluence"},{k:"figma",n:"Figma"},{m:"SAFe",n:"SAFe Agile"},{m:"MOS",n:"MOS Certified"}]}];function H(e,a){const s=e.k?`<span class="tech-logo"><img src="${L}tech/${e.k}.svg" alt="" loading="lazy" decoding="async" width="36" height="36" draggable="false"></span>`:`<span class="tech-logo tech-mono">${e.m}</span>`;return`
    <figure class="tech-chip${e.inv?" tech-chip--invert":""}" style="--i:${a}">
      ${s}
      <figcaption class="tech-name">${e.n}</figcaption>
    </figure>`}const G=`
  <div class="tech-layout">
    <aside class="tech-photo" style="background-image:url('${L}islandphoto/arcticislandphoto.jpeg')">
      <div class="tech-photo-cap">
        <span class="tech-photo-eyebrow">Field notes</span>
        <span class="tech-photo-line">Out on the glacier</span>
      </div>
    </aside>
    <div class="tech-groups">
      ${P.map(e=>`
        <section class="tech-group">
          <h3 class="tech-group-label">
            <span>${e.label}</span>
            <span class="tech-group-count">${e.items.length}</span>
          </h3>
          <div class="tech-grid">${e.items.map(H).join("")}</div>
        </section>
      `).join("")}
    </div>
  </div>
`;function K(e){const a=[...e.querySelectorAll(".tech-group")];if(!a.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){a.forEach(i=>i.classList.add("is-in"));return}const s=e.querySelector(".tech-groups")||e,r=new IntersectionObserver(i=>{for(const n of i)n.isIntersecting&&(n.target.classList.add("is-in"),r.unobserve(n.target))},{root:s,rootMargin:"0px 0px -8% 0px",threshold:.05});requestAnimationFrame(()=>{const i=s.getBoundingClientRect();for(const n of a){const p=n.getBoundingClientRect();p.top<i.bottom-24&&p.bottom>i.top?n.classList.add("is-in"):r.observe(n)}})}const E="./";var M;const q=(M=window.matchMedia)==null?void 0:M.call(window,"(prefers-reduced-motion: reduce)").matches,g=[{slug:"erics-world",title:"Eric's World",year:"2026",role:"Creative Dev",blurb:"The 3D walkable planet you're standing on right now — a Little Prince-inspired portfolio, fully procedural, built from Three.js primitives and a hand-rolled glass UI.",tags:["Three.js","Vite","GLSL"],accent:"#FF8A65",href:"https://erriiiccccccc.github.io",repo:"https://github.com/erriiiccccccc/erriiiccccccc.github.io"},{slug:"foundtech",title:"FoundTech",year:"2024",role:"Web Dev",blurb:"A clean, responsive marketing site for a Malaysian tech company — built and shipped live, with a smooth scrolling story from hero to footer.",tags:["Web","Responsive","Frontend"],accent:"#26C6DA",href:"https://foundtech.com.my"},{slug:"petaling-utama",title:"Petaling Utama Motor",year:"2024",role:"Full-Stack",blurb:"Full-stack e-commerce site for a real Malaysian motor business — live and in production, handling a real catalogue and real customers.",tags:["React","Node.js","PostgreSQL","Nginx"],accent:"#4CAF50",href:"https://petalingutamamotor.com"},{slug:"medmatch",title:"MedMatch",year:"2024",role:"Web Dev",blurb:"A matching platform that connects medical students with clinicians through verified profiles, purpose-built matching, and streamlined selection — research, without the friction.",tags:["Web","Platform","Frontend"],accent:"#EC407A",href:"https://www.medmatch.institute"},{slug:"ygo",title:"YGo Tours",year:"2024",role:"Web Dev",blurb:"A polished site for a Kuala Lumpur travel agency (est. 1994) — private journeys, corporate incentives, and specialty trips, presented with an editorial, magazine-style feel.",tags:["Web","Editorial","Frontend"],accent:"#7E57C2",href:"https://ygowebsite.vercel.app"},{slug:"sotwds",title:"Scotland on the Web",year:"2024",role:"Data Story",blurb:"A scrollytelling data story reading two web-archiving systems side by side — a manually curated seed list vs an automated stream — to surface what each kind of memory infrastructure preserves and misses.",tags:["Scrollytelling","Data Viz","D3"],accent:"#29B6F6",href:"https://sotwds.vercel.app"},{slug:"elk-pipeline",title:"ELK Logging Pipeline",year:"2023",role:"Internship",blurb:"An Elasticsearch + Kibana + Logstash pipeline on Oracle Linux for a fintech platform at Finexus — turning raw server logs into searchable, alertable dashboards.",tags:["Elasticsearch","Kibana","Linux"],accent:"#64B5F6"},{slug:"blender",title:"First Blender Project",year:"2023",role:"Personal",blurb:"Dove into 3D modeling and built a full scene from scratch — lighting, materials, the lot. Pretty proud of how it turned out for a first go.",tags:["Blender","3D Art"],accent:"#FBBF24"},{slug:"ada-hack",title:"Ada Hack 2022 — HumanEd",year:"2022",role:"Hackathon",blurb:"Hackathon winner at the University of Edinburgh, built for the Rubik's Cube Painting Challenge under a tight 24-hour clock.",tags:["Hackathon"],accent:"#7C3AED",badge:"Winner"}],m=e=>String(e).padStart(2,"0");function R(e,a){const s=e.tags.slice(0,3).join(" · ");return`
    <button class="pj-item${a===0?" is-active":""}" type="button" role="tab"
            aria-selected="${a===0}" data-i="${a}" style="--pc:${e.accent}">
      <span class="pj-item-index">${m(a+1)}</span>
      <span class="pj-item-main">
        <span class="pj-item-title">${e.title}</span>
        <span class="pj-item-meta">${s}</span>
      </span>
      ${e.badge?`<span class="pj-item-badge">${o("trophy",12)}</span>`:""}
      <span class="pj-item-go">${o("arrowRight",16)}</span>
    </button>`}const J=`
  <div class="pj-spread" style="--pc:${g[0].accent}">
    <section class="pj-feature" aria-live="polite">
      <div class="pj-stage">
        <div class="pj-stage-glow" aria-hidden="true"></div>
        <span class="pj-stage-index" aria-hidden="true">${m(1)}</span>
        <div class="pj-stage-ph" aria-hidden="true">${o("mountain",52)}</div>
        <img class="pj-stage-poster" alt="" aria-hidden="true" />
        <video class="pj-stage-video" muted loop playsinline preload="none"></video>
        <span class="pj-stage-badge" hidden>${o("trophy",13)} <span class="pj-stage-badge-txt"></span></span>
      </div>
      <div class="pj-feature-body">
        <div class="pj-feature-eyebrow">
          <span class="pj-kicker">Featured</span>
          <span class="pj-counter">${m(1)} / ${m(g.length)}</span>
        </div>
        <h3 class="pj-feature-title"></h3>
        <div class="pj-feature-sub"></div>
        <p class="pj-feature-blurb"></p>
        <div class="pj-feature-tags"></div>
        <div class="pj-feature-links"></div>
      </div>
    </section>

    <div class="pj-list" role="tablist" aria-label="Projects" aria-orientation="vertical">
      ${g.map(R).join("")}
    </div>
  </div>
`;function Y(e){const a=e.querySelector(".pj-spread");if(!a)return;const s=[...e.querySelectorAll(".pj-item")],r=e.querySelector(".pj-feature"),i=e.querySelector(".pj-stage"),n=e.querySelector(".pj-stage-video"),p=e.querySelector(".pj-stage-poster"),c=e.querySelector(".pj-stage-index"),f=e.querySelector(".pj-stage-badge"),d=e.querySelector(".pj-stage-badge-txt"),u=e.querySelector(".pj-feature-title"),y=e.querySelector(".pj-feature-sub"),C=e.querySelector(".pj-feature-blurb"),T=e.querySelector(".pj-feature-tags"),F=e.querySelector(".pj-feature-links"),D=e.querySelector(".pj-counter");let v=-1;const $=(t,l)=>{a.style.setProperty("--pc",t.accent),c.textContent=m(l+1),D.textContent=`${m(l+1)} / ${m(g.length)}`,u.textContent=t.title,y.innerHTML=`<span>${t.role}</span><span class="pj-dot"></span><span>${t.year}</span>`,C.textContent=t.blurb,T.innerHTML=t.tags.map(k=>`<span class="tag">${k}</span>`).join("")+(t.badge?`<span class="tag tag--accent">${o("trophy",13)} ${t.badge}</span>`:"");const x=[t.href?`<a class="pj-btn pj-btn--primary" href="${t.href}" target="_blank" rel="noopener noreferrer">${o("external",15)} Visit live</a>`:"",t.repo?`<a class="pj-btn" href="${t.repo}" target="_blank" rel="noopener noreferrer">${o("github",15)} Source</a>`:""].filter(Boolean).join("");F.innerHTML=x,n.pause(),n.removeAttribute("src"),n.load(),p.removeAttribute("src"),i.classList.remove("has-media","has-poster");const b=`${E}projects/${t.slug}.jpg`,w=`${E}projects/${t.slug}.webm`;p.onload=()=>i.classList.add("has-poster"),p.onerror=()=>i.classList.remove("has-poster"),p.src=b,n.poster=b,n.muted=!0,n.playsInline=!0,n.src=w,n.oncanplay=()=>{i.classList.add("has-media"),n.play().catch(()=>{})},n.onerror=()=>i.classList.remove("has-media"),n.play().catch(()=>{}),t.badge?(d.textContent=t.badge,f.hidden=!1):f.hidden=!0},h=(t,l=!1)=>{if(t===v)return;if(v=t,s.forEach((b,w)=>{const k=w===t;b.classList.toggle("is-active",k),b.setAttribute("aria-selected",String(k))}),l&&s[t].focus(),q){$(g[t],t);return}r.classList.add("is-swapping");const x=()=>{$(g[t],t),requestAnimationFrame(()=>r.classList.remove("is-swapping"))};clearTimeout(h._t),h._t=setTimeout(x,150)};s.forEach((t,l)=>{t.addEventListener("click",()=>h(l))}),a.addEventListener("keydown",t=>{const l=t.key;l==="ArrowDown"||l==="ArrowRight"?(t.preventDefault(),h((v+1)%s.length,!0)):l==="ArrowUp"||l==="ArrowLeft"?(t.preventDefault(),h((v-1+s.length)%s.length,!0)):l==="Home"?(t.preventDefault(),h(0,!0)):l==="End"&&(t.preventDefault(),h(s.length-1,!0))}),requestAnimationFrame(()=>{$(g[0],0),v=0})}const B="./",I=[{year:"2026",role:"Teaching Assistant",org:"University of Edinburgh",mono:"UoE",logo:"uoe.svg",desc:"System Design & Mobile Robotics, guiding students through architecture and robotics labs."},{year:"2025",role:"Technology Analyst Intern",org:"Barclays",mono:"B",logo:"barclays.svg",desc:"Automated a 45-minute manual workflow down to near-instant."},{year:"2024–25",role:"AI Coding Trainer",org:"Outlier",mono:"O",desc:"Trained and evaluated LLM coding outputs."},{year:"2024–25",role:"Full-Stack Developer",org:"Freelance",mono:"PUM",desc:"Built & deployed petalingutamamotor.com end-to-end."},{year:"2024",role:"Technology Spring Intern",org:"BlackRock",mono:"BR",logo:"blackrock.svg",desc:"Aladdin engineering operations & systems."},{year:"2023",role:"Software Engineer Intern",org:"Finexus Group",mono:"F",desc:"ELK pipeline with a Java EE + Python backend."},{year:"2023–24",role:"Marketing Executive",org:"AMEU",mono:"A",desc:"Grew to 6,000+ accounts and a 120% engagement increase."}];function O(e,a){const s=a===0?" exp-item--now":"",r=e.logo?`<img class="exp-logo" src="${B}experience/${e.logo}" alt="${e.org} logo" loading="lazy" onerror="this.remove()">`:"";return`
    <li class="exp-item${s}">
      <span class="exp-tile">${r}<span class="exp-mono">${e.mono}</span></span>
      <div class="exp-content">
        <div class="exp-headline">
          <h4 class="exp-role">${e.role}</h4>
          ${a===0?'<span class="exp-now">Now</span>':""}
        </div>
        <div class="exp-meta">${e.org} · ${e.year}</div>
        <p class="exp-desc">${e.desc}</p>
      </div>
    </li>`}const Q=`
  <ol class="exp-list">
    ${I.map(O).join("")}
  </ol>
`,_="./",A="a6074af4-eff5-4f1f-8ffe-b1f0fcf63f9a",U=!A.startsWith("YOUR_"),W=[["mail","Email","ericng8766@gmail.com","mailto:ericng8766@gmail.com"],["linkedin","LinkedIn","in/erriiiccccccc","https://www.linkedin.com/in/erriiiccccccc/"],["github","GitHub","erriiiccccccc","https://github.com/erriiiccccccc"],["instagram","Instagram","@ericccc____","https://www.instagram.com/ericccc____/"]],N=W.map(([e,a,s,r])=>`
  <a class="contact-row" href="${r}"${r.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""}>
    <span class="contact-ic">${o(e,18)}</span>
    <span class="contact-meta">
      <span class="contact-label">${a}</span>
      <span class="contact-text">${s}</span>
    </span>
    <span class="contact-go">${o("arrowRight",16)}</span>
  </a>`).join(""),z=U?`
  <form class="contact-form" id="contact-form" novalidate>
    <input type="hidden" name="access_key" value="${A}">
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
  <div class="cf-notice">The contact form isn't configured yet. Reach me directly on the left.</div>`,V=`
  <div class="ca-photo" style="background-image:url('${_}islandphoto/travelislandphoto.jpeg')" aria-hidden="true"></div>
  <div class="ca-scrim" aria-hidden="true"></div>`,Z=`
  <div class="contact-split">
    <aside class="contact-aside">
      ${V}
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
      <div class="ca-socials">${N}</div>
    </aside>

    <div class="contact-main">
      <div class="cf-head">
        <h3 class="cf-head-title">Drop me a message</h3>
        <p class="cf-head-sub">this goes straight to my inbox :)</p>
      </div>
      ${z}
    </div>
  </div>
`;function X(e){const a=e.querySelector("#contact-form");if(!a)return;const s=a.querySelector(".cf-status"),r=a.querySelector(".cf-submit"),i=[...a.querySelectorAll(".cf-input")],n=c=>a.querySelector(`.cf-error[data-for="${c}"]`),p=c=>{const f=n(c.name);let d="";return c.value.trim()?c.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value)&&(d="Enter a valid email address."):d="This field is required.",f&&(f.textContent=d),c.classList.toggle("cf-input--invalid",!!d),!d};i.forEach(c=>{c.addEventListener("blur",()=>p(c)),c.addEventListener("input",()=>{c.classList.contains("cf-input--invalid")&&p(c)})}),a.addEventListener("submit",async c=>{var d;if(c.preventDefault(),!i.map(p).every(Boolean)){(d=i.find(u=>u.classList.contains("cf-input--invalid")))==null||d.focus();return}r.disabled=!0,s.textContent="Sending…",s.className="cf-status cf-status--pending";try{const u=await fetch("https://api.web3forms.com/submit",{method:"POST",body:new FormData(a)}),y=await u.json().catch(()=>({}));if(u.ok&&y.success)a.innerHTML=`
          <div class="cf-success">
            <div class="cf-success-ic">${o("mail",26)}</div>
            <h4>Message sent!</h4>
            <p>Thanks for reaching out — I'll get back to you soon.</p>
          </div>`;else throw new Error(y.message||`HTTP ${u.status}`)}catch(u){s.textContent=`Couldn't send (${u.message}). Try again or email me directly.`,s.className="cf-status cf-status--error",r.disabled=!1}})}export{Z as C,Q as E,J as P,G as T,Y as a,K as b,X as i,o as s};
