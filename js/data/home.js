/* ==========================================================================
   home.js (data)  -  Weblink Computers  (index.html)
   Every piece of text, link and image path shown on the Home page.
   Courses and categories come from courses-data.js; contact/social from config.js.
   Section order on the page = order of the "sections" list below (id is a number, type picks the renderer).
   Global: homeData
   ========================================================================== */

const homeData = {

  pageTitle: "Computer Courses in Mira-Bhayandar",

  /* ---- Section order + on/off switches ---- */
  sections: [
    { id: 1, type: "hero", enabled: true },
    { id: 2, type: "stats", enabled: true },
    { id: 3, type: "popularCourses", enabled: true },
    { id: 4, type: "whyChoose", enabled: true },
    { id: 5, type: "careerBanner", enabled: true },
    { id: 6, type: "certifications", enabled: true },
    { id: 7, type: "testimonials", enabled: true },
    { id: 8, type: "gallery", enabled: true }   /* set false at launch if no real photos yet */
  ],

  /* ---- 1. Hero ---- */
  hero: {
    chip: "MS-CIT Govt. Recognised • Tally Authorised • KLiC",
    titleLines: [
      [{ text: "Computers for All." }],
      [{ text: "Careers", accent: true }, { text: " for Everyone." }]
    ],
    text: "Learn from teachers and professionals at 5 branches in Mira-Bhayandar. Job Assistance, lifetime practice and batches that suit students, housewives and seniors.",
    buttons: [
      { label: "Explore Courses", href: "courses.html", style: "primary" },
      { label: "Find a Branch", href: "branches.html", style: "ghost" }
    ],
    heroImage: "",   /* put a photo path here to replace the tech scene */
    scene: {
      codeWindow: {
        lines: [
          { kind: "comment", text: "<!-- Web Designing -->" },
          { kind: "tag", text: "<h1>", after: "Hello World", afterTag: "</h1>" },
          { kind: "keyword", text: "const", after: " career = ", string: "\"ready\"", end: ";" },
          { kind: "keyword", text: "if", after: " (learn) { ", call: "getJob", end: "(); }" }
        ]
      },
      ledger: {
        headers: ["Ledger", "Dr", "Cr"],
        rows: [
          ["Sales", "", "48,200"],
          ["GST", "", "8,676"],
          ["Bank", "56,876", ""]
        ]
      },
      cards: [
        { icon: "⌨️", label: "Typing Speed", value: "40 WPM", note: "Govt. exam ready" },
        { icon: "🎓", label: "MS-CIT Certificate", value: "Govt. Recognised", note: "✔ Verified" }
      ],
      icons: [
        { icon: "🎨", tone: "red" },
        { icon: "📊", tone: "amber" },
        { icon: "🖥️", tone: "blue" }
      ]
    }
  },

  /* ---- 2. Stats strip (floats over the hero bottom edge) ---- */
  stats: [
    { icon: "🧑‍🏫", value: 20, suffix: "+", label: "Expert Faculty", countUp: true },
    { icon: "🏆", value: 25, suffix: "+", label: "Years of Experience", countUp: true },
    { icon: "🎓", value: 25000, suffix: "+", label: "Students Trained", countUp: true },
    { icon: "♾️", text: "Lifetime", label: "Practice for All Students", countUp: false }
  ],

  /* ---- 3. Popular Courses (+ 3b "Can't find your course?" panel) ---- */
  popularCourses: {
    eyebrow: "Our Courses",
    title: "Popular Courses",
    subtitle: "Career-oriented courses with job assistance and lifetime practice.",
    mobileInitialCount: 6,
    showMoreLabel: "Show 6 more courses ↓",
    viewAllLabel: "View All Courses →",
    viewAllHref: "courses.html",
    morePanel: {
      label: "+ Many More",
      title: "Can't find your course?",
      text: "We teach many more courses. Tap any course to see its details.",
      courseIds: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      moreLabel: "and more →",
      moreHref: "courses.html"
    }
  },

  /* ---- 4. Why Choose Weblink ---- */
  whyChoose: {
    eyebrow: "Why Weblink",
    title: "Why Choose Weblink?",
    subtitle: "An institute by teachers and professionals, trusted by thousands of students in Mira-Bhayandar.",
    cards: [
      { icon: "🧑‍🏫", tone: "red", title: "Expert Faculty", text: "Learn from experienced teachers and working professionals." },
      { icon: "🏛️", tone: "blue", title: "Govt. Recognised", text: "MS-CIT certificate from the Maharashtra State government, valid for government jobs." },
      { icon: "🤝", tone: "amber", title: "Authorised Learning Centre", text: "Official authorised centre for Tally, MS-CIT and KLiC (MKCL) courses." },
      { icon: "💼", tone: "blue", title: "Job Assistance", text: "Job assistance for all students of our career courses." },
      { icon: "♾️", tone: "amber", title: "Lifetime Practice", text: "Lifetime practice for all students, so your skills stay sharp." },
      { icon: "🕒", tone: "red", title: "Flexible Batch Timings", text: "Suitable batch timings for students, housewives and other people." }
    ]
  },

  /* ---- 5. Career banner ---- */
  careerBanner: {
    chip: "Career Support",
    titleBefore: "100% Job Guarantee ",
    titleAccent: "Courses",
    text: "Join our career courses with 100% job placements in India or abroad.",
    button: { label: "View Trending Courses →", href: "courses.html?filter=trending" },
    tiles: [
      { icon: "💰", value: "Rs. 5,000 – 80,000", label: "Pay scale", wide: true },
      { icon: "💼", value: "Job Assistance", label: "For all students" },
      { icon: "🌏", value: "India or Abroad", label: "Job placements" }
    ]
  },

  /* ---- 6. Certifications preview ---- */
  certifications: {
    eyebrow: "Recognition",
    title: "Our Certifications",
    subtitle: "Official authorised centre for MS-CIT, Tally and KLiC (MKCL) courses.",
    cards: [
      { badge: "MS-CIT", badgeCaption: "MKCL", tone: "red", title: "MS-CIT", text: "Maharashtra State government certificate, valid for government jobs." },
      { badge: "TALLY", badgeCaption: "AUTHORISED", tone: "blue", title: "Tally Authorised Centre", text: "Official authorised learning centre for Tally courses." },
      { badge: "KLiC", badgeCaption: "MKCL", tone: "amber", title: "KLiC Authorised Centre", text: "Official authorised centre for KLiC (MKCL) courses." }
    ],
    button: { label: "View Certifications →", href: "certifications.html" }
  },

  /* ---- 7. Testimonials ---- */
  testimonials: {
    eyebrow: "Testimonials",
    title: "What Our Students Say",
    subtitle: "Real experiences from students of Weblink Computers.",
    previousLabel: "Previous review",
    nextLabel: "Next review",
    goToLabel: "Go to review",
    reviews: [
      { name: "Rohan Patil", course: "MS-CIT", tone: "red", rating: 5, quote: "I joined MS-CIT with no computer knowledge. The teachers explained everything patiently and I cleared the exam in the first attempt." },
      { name: "Sneha Shah", course: "Tally Prime with GST", tone: "blue", rating: 5, quote: "Tally and GST were made very easy with practical vouchers and reports. I now handle the accounts of a small firm confidently." },
      { name: "Amit Verma", course: "Web Designing", tone: "amber", rating: 5, quote: "I built my first website during the course itself. The faculty guided me with projects and helped me prepare for interviews." },
      { name: "Pooja Jadhav", course: "Advance Excel", tone: "blue", rating: 5, quote: "Pivot tables and MIS reports were taught step by step. It saved me hours of work in my office every week." },
      { name: "Kavita Mehta", course: "Basic Computer & Internet", tone: "red", rating: 5, quote: "I am a housewife and the batch timing suited my day perfectly. Now I use email and the internet on my own." },
      { name: "Imran Sheikh", course: "Digital Marketing", tone: "amber", rating: 5, quote: "SEO, Google Ads and social media were taught with live examples. The lifetime practice facility is a big plus." }
    ]
  },

  /* ---- 8. Gallery preview (photos come from data/gallery.js) ---- */
  gallery: {
    eyebrow: "Gallery",
    title: "Life at Weblink",
    subtitle: "A glimpse of our classrooms, labs and students.",
    href: "gallery.html",
    moreLabel: "+ More Photos",
    moreSubLabel: "View full gallery →",
    /* The tiles are taken from the Gallery page data (data/gallery.js): put the ids of 5 gallery items here.
       1st = big tile, last = the "+ More Photos" tile. Change the photos / captions in gallery.js only. */
    itemIds: [1, 2, 4, 5, 6]
  }
};
