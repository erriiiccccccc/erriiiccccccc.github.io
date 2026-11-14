// What Hui Sin knows about Eric. Plain facts Eric has chosen to share: the
// site itself (experience, projects, travel log, contact links), his public
// travel map, and answers he wrote for her. This repo is public and so is
// this file, so nothing private goes in: no phone number, no address, no CV
// file. The never-say list lives in the HUISIN_DENY env var instead (see
// api/huisin.mjs).
//
// Small enough to sit whole in the prompt, so no retrieval step is needed:
// every answer can see every fact, and nothing gets picked out wrongly.
//
// To teach her something new: add a line in the right section, keep it short
// and true, then run `npm run eval:huisin`.

export const KNOWLEDGE = `
ABOUT ERIC
- Eric Ng Min Chern, goes by Eric. His hometown is Kuala Pilah in Negeri Sembilan, Malaysia, and his home in Malaysia is Subang Jaya. Now lives and works in London.
- Graduated in June 2026 with a First Class BEng (Hons) in Computer Science from the University of Edinburgh (studied there 2022 to 2026). He has finished his degree.
- Speaks English (native) and Chinese (fluent), plus conversational Malay, Cantonese and Hakka.
- What he's like, in his words: hardworking, loves creating stuff, loves being hands on, and very into vibe coding (building fast with AI).
- On his job in AI audit, in his words: AI is taking over the world, and he's here to stop it. He hopes.

OPEN TO WORK
- Yes: open to freelance projects, collaborations, and recommendations for full-time roles.
- The way in: the contact form on Desert Island, email ericng8766@gmail.com, or LinkedIn. Eric replies himself.

EXPERIENCE (newest first)
- Barclays, London, since Aug 2026: AI Audit Technology Analyst (Technology Analyst, Cyber and AI, in Internal Audit). He audits how AI is used in the bank and learns how to move forward with AI safely. Joined full-time after graduating.
- Freelance full-stack developer and web designer, since mid 2024: designs, builds and launches websites and web apps for clients (FoundTech, YGo Tours, Petaling Utama Motor and more). React, Next.js, Node.js, PostgreSQL, Vercel, D3.js, Three.js.
- University of Edinburgh, Teaching Assistant and Tutor, Jan to May 2026, for the third-year System Design Project and Mobile Robotics. A hands-on technician role for the university, and he loved the hands-on work: made course materials and ran tutorials and labs on ROS 2, TurtleBot robots, embedded systems, 3D design and prototyping, and mentored student teams.
- University of Edinburgh, Exam Marker, Sep 2025 to Jan 2026, for the third-year Informatics Large Practical.
- Barclays, Glasgow, Jun to Sep 2025: Technology Analyst Intern in Wholesale Credit Risk. Built a React + Flask tool on MSSQL that turned a 45-minute manual process into near-instant (about 99% time saved). Also automated team workload tracking in Excel and built a Confluence hub with Jira, in a SAFe Agile team.
- Outlier, AI Coding Trainer, 2024 to 2025: trained and evaluated LLM coding answers for correctness and reasoning.
- BlackRock, Edinburgh, Technology Spring Intern, Apr 2024: Aladdin engineering and large-scale financial systems.
- Finexus Group, Kuala Lumpur, Software Engineer Trainee, Jun to Sep 2023: debugged a Java EE and JSP sanction-screening system and built the ELK logging pipeline. His first company job, before his degree started.
- AMEU (Association of Malaysian Economics Undergraduates), Media and Marketing Executive, 2023 to 2024: partnered with major Malaysian banks on industry events and grew social engagement by 120%.

AWARDS AND EXTRAS
- Ada Hack 2022 winner. Edinburgh Award and Advanced Edinburgh Award. MathsPALS Student Leader. Invited participant at HackTheBurgh XII. Microsoft Office Specialist certified.

PROJECTS (on Mountain Island). Eric loves all of them and refuses to pick a favourite.
- Eric's World: the 3D walkable planet you're on. Modelled in Blender, built in Three.js with a hand-made glass UI. Inspired by ThevertMenthe (thevertmenthe.dault-lafon.fr), a walkable portfolio by his favourite portfolio artist ever.
- FoundTech: a responsive marketing site for a Malaysian piling company. A paid client job, built and shipped live at foundtech.com.my.
- Petaling Utama Motor: the very first website Eric ever made, a full-stack e-commerce site for a Malaysian motor business (React, Node.js, PostgreSQL, Nginx). He built the first version without AI, then went back and made it better with AI. It's now at pumwebsite.vercel.app.
- MedMatch: a startup Eric co-founded in Edinburgh with one of his best friends, Justin Wei. It connects UK medical students with clinicians for clinical research, audits and quality improvement projects, matched to their profile. Currently piloting at the University of Edinburgh. medmatch.institute
- YGo Tours: a redesign for his relative's travel agency in Kuala Lumpur (founded 1994; private journeys, corporate incentives, specialty trips) with an editorial, magazine-style feel. She never ended up using it, but Eric thought the site she'd paid for was a bit ugly and knew he could do better.
- Scotland on the Web: his final-year dissertation project at Edinburgh, a study of web scraping and web archiving and how to balance it in the real world. A D3 scrollytelling data story comparing the National Library of Scotland's hand-curated web archive with the automated GDELT stream (2015 to 2023), showing what each one keeps and misses. sotwds.vercel.app
- ELK Logging Pipeline: Elasticsearch, Logstash and Kibana on Oracle Linux at Finexus, years ago before his degree. Eric now admits it's kinda lame, but back then making Elasticsearch work at his first company felt hecking cool.
- First Blender Project: a full 3D scene from scratch, lighting and materials included.
- Ada Hack 2022, HumanEd: his first ever hackathon, and he won something with his uni friends in Edinburgh. Built in 24 hours for the Rubik's Cube Painting Challenge.
- Smaller side projects: a Monte Carlo and Black-Scholes options pricing model with live option data, and an iOS automation that sends a daily market sentiment notification.

SKILLS AND TOOLS HE HAS USED
- Languages: Python, Java, C, C++, C#, JavaScript, TypeScript, SQL, Haskell, Bash, MIPS Assembly.
- Web: React, Next.js, Node.js, Express, Flask, JSP, HTML, CSS, Three.js, D3.js, GSAP, Vercel.
- Data and AI: pandas, NumPy, Matplotlib, scikit-learn, PyTorch, Hugging Face, prompt engineering, LLM evaluation.
- Data, search and infra: Elasticsearch, Kibana, Logstash, PostgreSQL, MySQL, Oracle DB, MSSQL, Docker, Kubernetes, Linux, Nginx, Git.
- Robotics and hardware: ROS 2, TurtleBot, Raspberry Pi, Arduino.
- 3D, CAD and making: Blender, Unity, Fusion 360, OpenSCAD, Bambu Lab and Ultimaker 3D printers, xTool laser cutter.
- Ways of working: Postman, Jira, Confluence, Figma, SAFe Agile.

FAVOURITE THINGS
- Food: char kuey teow, every time. Drink: coconut water.
- Music: Laufey.
- Games: Counter-Strike and Valorant used to be his go-to, but he doesn't play much anymore.
- Sport: badminton and basketball are his favourites. Lately picking up swimming and table tennis.

HIKING
- Loves hiking. Has climbed Mount Kinabalu in Malaysia.
- In the UK he's done Ben Nevis, Snowdon (Yr Wyddfa) and Scafell Pike, the three national peaks, though he calls himself a noob.
- Hikes a lot around Loch Lomond: Conic Hill, Beinn Dubh above Luss, The Cobbler, Dumgoyne. Also Ben Macdui and Cairn Gorm in the Cairngorms, the Old Man of Storr on Skye, Ben Cleuch, Kinder Scout, and Arthur's Seat and the Pentland Hills in Edinburgh.
- Abroad: the PR1 ridge walk from Pico do Areeiro and the levadas in Madeira, Durmitor National Park in Montenegro, the Ladder of Kotor, Mount Pilatus, Rigi and Grindelwald First in Switzerland, and the Seven Hanging Valleys trail in the Algarve.

TRAVEL (from his public travel map on the Pirate Ship)
- 24 countries across 3 continents, with over 1,000 places pinned.
- Countries: China, Croatia, Denmark, France, Germany, Hong Kong, Hungary, Iceland, Ireland, Italy, Latvia, Malaysia, Malta, Montenegro, Morocco, Poland, Portugal, Singapore, Spain, Sweden, Switzerland, Thailand, Türkiye, United Kingdom.
- Most pins: the United Kingdom by far (about 250), then Switzerland, Portugal, Malta and Italy.
- Highlights: Iceland's Ring Road south coast (Skógafoss, the Jökulsárlón glacier lagoon, Diamond Beach); the Sahara at Merzouga and Marrakesh in Morocco; Croatia from Dubrovnik and Split to Hvar, Plitvice and Zagreb; the Swiss Alps (Interlaken, Lauterbrunnen, Grindelwald, Lucerne) and Lake Como and Milan in Italy; Portugal's Algarve caves (Benagil), Lisbon, Porto and Madeira; Malta, Gozo and Comino's Blue Lagoon; Istanbul; Rome and the Vatican; Paris; Copenhagen, LEGOLAND Billund and Malmö; Stockholm; Riga; Budapest; Montenegro's Kotor and Durmitor; Ireland's west coast and Northern Ireland's Giant's Causeway; Hong Kong; and all over Scotland: Skye, Glenfinnan, Glencoe, the Cairngorms, Staffa.
- A fun one: he collects universities as "badges" on his map, 27 so far, including Oxford, Cambridge, ETH Zürich, HKU, Trinity College Dublin, St Andrews and of course Edinburgh.

THIS WORLD (Eric's World)
- A tiny planet with six islands to find: Meadow (About Me, with the Jukebox and the Doodle Wall whiteboard), Lava (Experience), Desert (Contact), Arctic (here, Hui Sin), Mountain (Projects), and the Pirate Ship (Travel Log).
- Walk with WASD or the arrow keys, press E to dive into an island. On a phone, use the joystick and the E button.
- At the Jukebox anyone can make a little loop and put it on the shelf; on the Doodle Wall anyone can draw on the whiteboard.
- Eric built all of it himself in Three.js.

HOW TO REACH ERIC (everything on Desert Island)
- The contact form on Desert Island.
- Email: ericng8766@gmail.com
- LinkedIn: linkedin.com/in/erriiiccccccc
- GitHub: github.com/erriiiccccccc
- Instagram: @ericccc____
- No phone number is shared here.

ABOUT HUI SIN
- Hui Sin is the guide who lives on Arctic Island and knows all about Eric.
- Hui Sin is someone special to Eric, and that's why she knows all about him. That's all she says about that: no details about their relationship or her own life off the island.
`
