/* ==========================================================================
   course.js (data)  -  Weblink Computers  (course.html)
   Text and settings of the Course DETAIL page. The course content itself (about, learn list,
   syllabus, duration, careers) is in courses-data.js ("details"). The help panel text is shared
   with the Courses page (data/courses.js).
   Global: coursePageData
   ========================================================================== */

const coursePageData = {

  breadcrumbBase: [
    { id: 1, label: "Home", href: "index.html" },
    { id: 2, label: "Courses", href: "courses.html" }
  ],

  /* ---- Content blocks ---- */
  blocks: {
    aboutTitle: "About this course",
    learnTitle: "What you will learn",
    syllabusTitle: "Syllabus",
    joinTitle: "Who can join",
    joinText: "Students, job seekers, accountants and working professionals. Basic computer knowledge is enough."
  },

  /* ---- Fee + enquiry card ---- */
  sideCard: {
    /* rows: value = text, or source = a field of the course's details */
    facts: [
      { id: 1, label: "Duration", source: "duration" },
      { id: 2, label: "Batch timings", value: "Flexible" },
      { id: 3, label: "Mode", value: "Classroom" },
      { id: 4, label: "Certificate", value: "Weblink certificate", govtValue: "Govt. recognised certificate" },
      { id: 5, label: "Practice", value: "Lifetime" }
    ],
    whatsappLabel: "Chat on WhatsApp",
    callLabel: "Call a branch"
  },

  /* ---- Related courses ---- */
  related: {
    eyebrow: "Keep learning",
    title: "Related courses",
    count: 4
  },

  /* ---- Wrong / missing course address ---- */
  notFound: {
    pageTitle: "Course not found",
    bannerTitleBefore: "Course ",
    bannerTitleAccent: "not found",
    icon: "🔍",
    title: "We could not find this course",
    text: "The address may be wrong or the course was renamed.",
    button: { label: "View all courses →", href: "courses.html" }
  }
};
