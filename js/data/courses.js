/* ==========================================================================
   courses.js (data)  -  Weblink Computers  (courses.html)
   Text and settings of the Courses PAGE only (banner, search, filter chips, result line, empty state,
   help panel). The courses themselves live in courses-data.js.
   Templates use {count}, {courseCount}, {categoryCount}, {branchCount}: they are filled from the data files.
   Global: coursesPageData
   ========================================================================== */

const coursesPageData = {
  pageTitle: "Courses",

  /* ---- Page banner ---- */
  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "Courses" }
    ],
    titleBefore: "Our ",
    titleAccent: "Courses",
    text: "Career-oriented courses with job assistance and lifetime practice.",
    pillLabel: "{courseCount} courses",
    /* chips: shown on phones */
    highlights: [
      { id: 1, label: "MS-CIT Govt. Certified" },
      { id: 2, label: "Job Assistance" },
      { id: 3, label: "Lifetime Practice" },
      { id: 4, label: "Flexible Batch Timings" }
    ],
    /* stat tiles: shown on tablet + desktop. value: a number token or plain text; suffix is amber */
    stats: [
      { id: 1, value: "{courseCount}", suffix: "+", label: "Courses" },
      { id: 2, value: "{categoryCount}", suffix: "", label: "Categories" },
      { id: 3, value: "{branchCount}", suffix: "", label: "Branches" },
      { id: 4, value: "Lifetime", suffix: "", label: "Practice" }
    ]
  },

  /* ---- Search + filter chips ---- */
  toolbar: {
    searchLabel: "Search courses",
    searchPlaceholder: "Search courses, e.g. Tally, Excel",
    searchIcon: "🔍",
    allLabel: "All",
    trendingLabel: "🔥 Trending",
    trendingKey: "trending"          /* ?filter=trending */
  },

  /* ---- "Showing n courses" ---- */
  results: {
    many: "Showing {count} courses",
    one: "Showing {count} course"
  },

  /* ---- Nothing found ---- */
  empty: {
    icon: "🔍",
    title: "No courses found",
    text: "Try another name or category.",
    button: "Show all courses"
  },

  /* ---- "Can't find your course?" panel ---- */
  helpPanel: {
    label: "Need help?",
    title: "Can't find your course?",
    text: "Ask us on WhatsApp or visit any of our {branchCount} branches in Mira-Bhayandar.",
    button: { label: "Contact Us →", href: "contact.html" }
  }
};
