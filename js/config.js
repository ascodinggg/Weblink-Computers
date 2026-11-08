/* ==========================================================================
   config.js  -  Weblink Computers
   CENTRAL settings. Change a value here and every page that uses it updates.
   Loaded first on every page (classic script, global: siteConfig).
   ========================================================================== */

const siteConfig = {

  /* ---- Brand ---- */
  siteName: "Weblink Computers",
  tagline: "Computers for All • Education for All",
  logo: {
    src: "assets/images/logo/logo.png",
    alt: "Weblink Computers logo"
  },
  favicon: "assets/images/logo/logo.png",
  year: new Date().getFullYear(),

  /* ---- Themes ----
     defaultTheme: "hybrid" | "dark" | "light".
     At launch: set defaultTheme to the client's pick and themeSwitcher.enabled to false. */
  defaultTheme: "hybrid",
  themeSwitcher: {
    enabled: true,
    storageKey: "weblinkTheme",
    label: "Choose theme",
    themes: [
      { id: 1, value: "hybrid", label: "Hybrid", icon: "◐" },
      { id: 2, value: "dark", label: "Dark", icon: "☾" },
      { id: 3, value: "light", label: "Light", icon: "☀" }
    ]
  },

  /* ---- Contact ---- */
  contact: {
    phoneDisplay: "+91 9004111076",
    phoneLink: "+919004111076",
    whatsappNumber: "919004111076",
    email: "abhi.the.coder14@gmail.com",
    workingHoursLabel: "Working Hours",
    workingHours: "9:00 AM – 9:00 PM"
  },

  /* ---- Social links (placeholders: official sites until the client supplies page URLs) ---- */
  social: [
    { id: 1, icon: "facebook", label: "Facebook", href: "https://www.facebook.com" },
    { id: 2, icon: "instagram", label: "Instagram", href: "https://www.instagram.com" },
    { id: 3, icon: "youtube", label: "YouTube", href: "https://www.youtube.com" },
    { id: 4, icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" }
  ],

  /* ---- WhatsApp float button (one button, page-aware) ---- */
  whatsapp: {
    enabled: true,
    buttonLabel: "Chat on WhatsApp",
    generalMessage: "Hello Weblink Computers, I would like to know more about your courses.",
    branchMessage: "Hello Weblink Computers, I would like to know more about your {branchName} branch.",
    courseMessage: "Hello Weblink Computers, I would like to know more about the {courseName} course."
  },

  /* ---- Floating scroll-to-top button ---- */
  scrollTop: {
    enabled: true,
    label: "Scroll to top",
    showAfterPixels: 400
  },

  /* ---- Animations (page load + scroll reveal). enabled:false turns every animation off. ---- */
  animation: {
    enabled: true,
    staggerMs: 90,        /* delay between cards of one row */
    durationMs: 800       /* keep equal to --revealDuration in css/animations.css */
  },

  /* ---- Enquiry form -> Google Sheet ----
     sheetUrl = the "Web app" URL of the Google Apps Script (see enquiry-sheet-setup/enquiry.gs for the steps).
     Empty "" = nothing is sent (the form only shows the thank-you message, useful while testing). */
  enquiry: {
    sheetUrl: "https://script.google.com/macros/s/AKfycbz7KqQbblkfVMfOvbPpIbCBlqRC2a6e3zc3HbMuj2rxU-hGOdrTeCJF39NK-v1Xqq7Ltg/exec",
    timeoutSeconds: 15
  },

  /* ---- Top bar (offer text moving like a marquee; scrolls away) ---- */
  topBar: {
    enabled: true,
    icon: "🔥",
    highlight: "100% Job Guarantee",
    text: "Course @ 50% Discount",
    showSocial: false,        /* true = show the social icons on the right (desktop) */
    marquee: true,            /* false = fixed centred text */
    repeat: 6,                /* how many times the text repeats in one loop (more = smaller gaps on wide screens) */
    speedSeconds: 30          /* time of one full loop (bigger = slower) */
  },

  /* ---- Navbar ---- */
  nav: {
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    submenuLabel: "Show courses menu",
    items: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "About Us", href: "about.html" },
      { id: 3, label: "Courses", href: "courses.html", dropdown: "courseCategories" },
      { id: 4, label: "Branches", href: "branches.html" },
      { id: 5, label: "Gallery", href: "gallery.html" },
      { id: 6, label: "Contact", href: "contact.html" }
    ],
    viewAllCoursesLabel: "View All Courses",
    viewAllCoursesHref: "courses.html"
  },

  /* ---- Footer ---- */
  footer: {
    description: "An institute by teachers and professionals, MS-CIT government recognised, with 5 branches in Mira-Bhayandar and job assistance.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "index.html" },
      { label: "About Us", href: "about.html" },
      { label: "Courses", href: "courses.html" },
      { label: "Gallery", href: "gallery.html" },
      { label: "Certifications", href: "certifications.html" },
      { label: "Privacy & Terms", href: "privacy.html" },
      { label: "Contact", href: "contact.html" }
    ],
    popularCoursesTitle: "Popular Courses",
    popularCourseIds: [1, 4, 6, 3, 7, 10],
    allCoursesLabel: "All Courses",
    allCoursesHref: "courses.html",
    branchesTitle: "Our Branches",
    visitBranchesLabel: "Visit Branches",
    visitBranchesHref: "branches.html",
    copyright: "© {year} - Weblink Computers | All Rights Reserved."
  },

  /* ---- Page names (used for document.title) ---- */
  titleSeparator: " | "
};
