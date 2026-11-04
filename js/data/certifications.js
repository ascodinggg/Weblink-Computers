/* ==========================================================================
   certifications.js (data)  -  Weblink Computers  (certifications.html)
   Texts of the Certifications page. The three certification cards (round badges) come from the Home
   data (homeData.certifications.cards), so they are changed in ONE place; the detail blocks below are
   linked to a card by its `badge` text. Course links use numeric course ids (courses-data.js).
   `sections` lists the sections in order; set enabled false to hide one.
   PLACEHOLDER texts (client to check / replace): details, steps, sample images, FAQ.
   Templates: {certCount}. Global: certificationsPageData
   ========================================================================== */

const certificationsPageData = {
  pageTitle: "Certifications",

  sections: [
    { id: 1, type: "authorised", enabled: true },
    { id: 2, type: "details", enabled: true },
    { id: 3, type: "steps", enabled: true },
    { id: 4, type: "samples", enabled: true },         /* set false until real certificate images are added */
    { id: 5, type: "faq", enabled: true },
    { id: 6, type: "cta", enabled: true }
  ],

  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "Certifications" }
    ],
    titleBefore: "Our ",
    titleAccent: "Certifications",
    text: "Official authorised centre for MS-CIT, Tally and KLiC (MKCL) courses. Learn here, get a certificate that counts.",
    pillLabel: "{certCount} authorisations",
    highlights: [
      { id: 1, label: "Govt. recognised" },
      { id: 2, label: "Valid for jobs" },
      { id: 3, label: "Exam at our centre" }
    ],
    /* stat tiles. type: certCount | homeStat (the Home stat with this label) | branchCount */
    stats: [
      { id: 1, type: "certCount", display: "Authorisations" },
      { id: 2, type: "homeStat", stat: "Years of Experience", display: "Years" },
      { id: 3, type: "homeStat", stat: "Students Trained", display: "Students" },
      { id: 4, type: "branchCount", display: "Branches" }
    ]
  },

  /* ---- 1. The cards (data = homeData.certifications.cards) ---- */
  authorised: {
    eyebrow: "Recognition",
    title: "What we are authorised for"
  },

  /* ---- 2. One block per certification. badge = the Home card's badge text; courseIds = numeric course ids ---- */
  details: {
    eyebrow: "In detail",
    title: "What each certification means",
    whatLabel: "What it is",
    whoLabel: "Who should join",
    getLabel: "What you get",
    coursesLabel: "Related courses",
    items: [
      {
        id: 1, badge: "MS-CIT",
        what: "The Maharashtra State government recognised computer literacy certificate, run by MKCL.",
        who: "Students, job seekers, government employees and anyone who needs a recognised computer certificate.",
        gets: ["Valid for government jobs and promotions in Maharashtra", "Covers typing, Office, Internet and digital payments", "Exam at the end of the course"],
        courseIds: [1, 13]
      },
      {
        id: 2, badge: "TALLY",
        what: "Official training on Tally Prime with GST from an authorised learning centre.",
        who: "Commerce students, accounts assistants and small business owners.",
        gets: ["Accounting, vouchers, GST and final accounts", "Practical entries on real examples", "Weblink certificate on completion"],
        courseIds: [4, 5]
      },
      {
        id: 3, badge: "KLiC",
        what: "KLiC (Knowledge Linking Courses) from MKCL: short skill courses taught at authorised centres.",
        who: "Students and working people who want one focused skill quickly.",
        gets: ["Short, job-oriented skill courses", "Government-backed course content", "Certificate on passing the exam"],
        courseIds: [2, 3]          /* CLIENT TO CONFIRM which courses are KLiC courses */
      }
    ]
  },

  /* ---- 3. How it works (dark section) ---- */
  steps: {
    eyebrow: "How it works",
    title: "From admission to certificate",
    items: [
      { id: 1, title: "Enrol", text: "Choose your course and batch at any branch." },
      { id: 2, title: "Learn", text: "Classes with practical work every day." },
      { id: 3, title: "Practise", text: "Lifetime practice at our branches." },
      { id: 4, title: "Exam", text: "Appear for the exam at our centre." },
      { id: 5, title: "Certificate", text: "Receive your certificate." }
    ]
  },

  /* ---- 4. Sample certificates. image: path ("" = placeholder tile) ---- */
  samples: {
    eyebrow: "Samples",
    title: "Certificates you can earn",
    placeholder: "📜 Sample image",
    items: [
      { id: 1, title: "MS-CIT certificate", image: "", alt: "Sample MS-CIT certificate" },
      { id: 2, title: "Tally certificate", image: "", alt: "Sample Tally certificate" },
      { id: 3, title: "Weblink course certificate", image: "", alt: "Sample Weblink course certificate" }
    ]
  },

  /* ---- 5. FAQ ---- */
  faq: {
    eyebrow: "Questions",
    title: "Certification FAQs",
    items: [
      { id: 1, title: "Is the MS-CIT certificate valid for government jobs?", text: "Yes. MS-CIT is recognised by the Government of Maharashtra and is accepted for government jobs and promotions where computer proficiency is required." },
      { id: 2, title: "Where do I take the exam?", text: "The exam is conducted at our authorised centre. We will tell you the date and help you prepare." },
      { id: 3, title: "How long does it take to get the certificate?", text: "After you pass the exam, the certificate is issued by the certifying body. We will guide you on the timeline." },
      { id: 4, title: "Can I join if I have never used a computer?", text: "Yes. Our batches start from the very basics, with patient teachers." }
    ]
  },

  /* ---- 6. Closing band ---- */
  cta: {
    title: "Ready to get certified?",
    text: "Visit any branch or message us, and we will help you pick the right course and the next batch.",
    primary: { label: "Explore Courses", href: "courses.html" },
    secondary: { label: "Contact Us", href: "contact.html" }
  }
};
