/* ==========================================================================
   router.js  -  Weblink Computers
   Static site: every page is its own .html file, so "routing" means
     - which page is open (file name),
     - reading ?course=<slug> / ?category=<slug> from the address (old ?id=<number> links still work),
     - setting document.title.
   Data ids are NUMBERS; the address shows names: course.html?course=advance-excel. Global: router
   ========================================================================== */

const router = {

  /* File name of the open page: "index.html", "courses.html", ... ("" or "/" -> "index.html"). */
  currentPage() {
    const name = window.location.pathname.split("/").pop();
    return name ? name : "index.html";
  },

  /* A query-string value, or null. */
  param(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  /* ?id=<number> as a real number, or null when missing / not a whole number. */
  idParam() {
    const raw = router.param("id");
    if (raw === null || !/^\d+$/.test(raw)) return null;
    return Number(raw);
  },

  /* The course for ?course=<slug> (or an old ?id=<number> link) - only meaningful on course.html, or null. */
  currentCourse() {
    if (router.currentPage() !== "course.html") return null;
    const slug = router.param("course");
    if (slug) return coursesData.courses.find((course) => course.slug === slug) || null;
    const id = router.idParam();
    return id === null ? null : dom.byId(coursesData.courses, id);
  },

  /* Address of a course page from its numeric id: router.courseHref(3) -> "course.html?course=advance-excel" */
  courseHref(courseId) {
    const course = dom.byId(coursesData.courses, courseId);
    return course ? "course.html?course=" + encodeURIComponent(course.slug) : "courses.html";
  },

  /* Address of the Courses page filtered by a category: "courses.html?category=accounting" */
  categoryHref(category) {
    return "courses.html?category=" + encodeURIComponent(category.slug);
  },

  /* True when a nav / footer link points to the open page. */
  isCurrent(href) {
    return href.split("?")[0] === router.currentPage();
  },

  /* "<page title> | Weblink Computers" (the home page shows just the page title + site name). */
  setTitle(pageTitle) {
    document.title = pageTitle ? pageTitle + siteConfig.titleSeparator + siteConfig.siteName : siteConfig.siteName;
  }
};
