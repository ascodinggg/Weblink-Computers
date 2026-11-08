/* ==========================================================================
   about.js (data)  -  Weblink Computers  (about.html)
   Texts of the About page. `sections` lists the sections in order; set enabled false to hide one.
   The figures (faculty, years, students) and the "Why Choose" cards are shared with the Home page
   (home.js: homeData.stats / homeData.whyChoose), so they are changed in ONE place.
   Templates: {branchCount}. Global: aboutPageData
   ========================================================================== */

const aboutPageData = {
  pageTitle: "About Us",

  sections: [
    { id: 1, type: "story", enabled: true },
    { id: 2, type: "numbers", enabled: true },
    { id: 3, type: "values", enabled: true },
    { id: 4, type: "whyChoose", enabled: true },
    { id: 5, type: "partners", enabled: true },
    { id: 6, type: "team", enabled: false },         /* set true when real faculty names + photos are added below */
    { id: 7, type: "cta", enabled: true }
  ],

  /* ---- 1. Banner ---- */
  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "About Us" }
    ],
    titleBefore: "About ",
    titleAccent: "Weblink Computers",
    text: "An institute by teachers and professionals, teaching computers to Mira-Bhayandar for over {years} years.",
    pillLabel: "{years}+ years of teaching",
    highlights: [
      { id: 1, label: "MS-CIT Govt. Recognised" },
      { id: 2, label: "Tally Authorised" },
      { id: 3, label: "KLiC Authorised" }
    ],
    /* stat tiles. type: homeStat (the Home stat with this label; "display" = the short label shown here) | branchCount */
    stats: [
      { id: 1, type: "homeStat", stat: "Years of Experience", display: "Years" },
      { id: 2, type: "homeStat", stat: "Students Trained", display: "Students" },
      { id: 3, type: "homeStat", stat: "Expert Faculty", display: "Faculty" },
      { id: 4, type: "branchCount", display: "Branches" }
    ],
    yearsStat: "Years of Experience"      /* which Home stat fills {years} */
  },

  /* ---- 2. Our story (PLACEHOLDER text: client to replace) ---- */
  story: {
    eyebrow: "Our story",
    title: "Computers for All. Education for All.",
    paragraphs: [
      "Weblink Computers started with one simple idea: every person, whether a student, a housewife or a working professional, should be able to learn computers in a friendly place with teachers who care.",
      "Today we teach from five branches in Bhayandar and Mira-Bhayandar. Our courses range from MS-CIT and Tally to web design, programming and networking, all with practical work and lifetime practice."
    ],
    tags: ["MS-CIT Govt. Recognised", "Job Assistance", "Lifetime Practice"],
    image: "assets/images/branches/mainBranch.png",                                         /* path of the institute photo, e.g. "assets/images/about/institute.jpg" */
    imageAlt: "Weblink Computers institute",
    photoPlaceholder: "📷 Institute photo",       /* shown until a photo path is set in "image" above */
    badge: { value: "{years}+", label: "Years of teaching" }      /* {years} comes from the Home stats */
  },

  /* ---- 3. Our numbers (the figures come from homeData.stats) ---- */
  numbers: {
    eyebrow: "Our numbers",
    title: "Trusted by thousands"
  },

  /* ---- 4. Mission, vision, values (PLACEHOLDER text: client to replace) ---- */
  values: {
    eyebrow: "What drives us",
    title: "Mission, vision and values",
    items: [
      { id: 1, icon: "🎯", tone: "blue", title: "Our mission", text: "To make computer education simple, affordable and job-ready for everyone in our community." },
      { id: 2, icon: "🔭", tone: "amber", title: "Our vision", text: "A digitally confident Mira-Bhayandar, where every learner can find a better career through skills." },
      { id: 3, icon: "💡", tone: "red", title: "Our values", text: "Honest guidance, patient teaching, practical learning and support that continues after the course." }
    ]
  },

  /* ---- 5. Authorisations: the cards (round badge logos) are the SAME as the Home certifications
         (homeData.certifications.cards in home.js); only the heading is here. ---- */
  partners: {
    eyebrow: "Recognised by",
    title: "Our authorisations",
    subtitle: "Official centres for well-known certification programmes."
  },

  /* ---- 6. Teachers (hidden until enabled; photo = image path, "" = initial letter) ---- */
  team: {
    eyebrow: "Our teachers",
    title: "Learn from people who know the work",
    people: [
      { id: 1, name: "Faculty name 1", role: "Subject / designation", photo: "" },
      { id: 2, name: "Faculty name 2", role: "Subject / designation", photo: "" },
      { id: 3, name: "Faculty name 3", role: "Subject / designation", photo: "" },
      { id: 4, name: "Faculty name 4", role: "Subject / designation", photo: "" }
    ]
  },

  /* ---- 7. Closing band ---- */
  cta: {
    title: "Come and see us",
    text: "Visit any of our branches, meet the teachers and choose the course that fits you.",
    primary: { label: "Visit Branches", href: "branches.html" },
    secondary: { label: "Contact Us", href: "contact.html" }
  }
};
