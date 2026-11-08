/* ==========================================================================
   whatsapp.js  -  Weblink Computers
   Builds the WhatsApp link with a predefined message.
   Number and message texts come from config.js (siteConfig.contact / siteConfig.whatsapp).
   Global: whatsapp
   ========================================================================== */

const whatsapp = {

  /* https://wa.me/<number>?text=<message> */
  link(message, number) {
    return "https://wa.me/" + (number || siteConfig.contact.whatsappNumber) + "?text=" + encodeURIComponent(message);
  },

  /* A branch's own WhatsApp chat (its number from branches.js, the main number if it has none). */
  branchLink(branch) {
    return whatsapp.link(dom.fill(siteConfig.whatsapp.branchMessage, { branchName: branch.shortName }), branch.whatsappNumber);
  },

  /* Message for normal pages. */
  generalMessage() {
    return siteConfig.whatsapp.generalMessage;
  },

  /* Message for a course page: "...about the {courseName} course." */
  courseMessage(course) {
    return dom.fill(siteConfig.whatsapp.courseMessage, { courseName: course.name });
  },

  /* The ONE WhatsApp button is page-aware:
     on a course page (course.html?id=<number>) the message is about that course, elsewhere it is general. */
  currentLink() {
    const course = router.currentCourse();
    return whatsapp.link(course ? whatsapp.courseMessage(course) : whatsapp.generalMessage());
  }
};
