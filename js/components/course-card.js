/* ==========================================================================
   course-card.js  -  Weblink Computers
   One course card (used on Home now; Courses page and search later).
   Only the "View Details →" line is a link (to course.html?course=<slug>); the card itself is not clickable.
   Data: a course from coursesData.courses; labels from coursesData.labels.
   Global: courseCard
   ========================================================================== */

const courseCard = {

  build(course) {
    const labels = coursesData.labels;
    return dom.create("article", { class: "courseCard" }, [
      dom.create("div", { class: "courseCardTop" }, [
        courseCard.buildVisual(course),
        dom.create("div", { class: "courseBadges" }, [
          course.fee && course.fee.oldAmount ? dom.create("span", { class: "badge badgeOffer", text: labels.offerBadge }) : null,
          course.badge === "govtCertified" ? dom.create("span", { class: "badge badgeGovt", text: labels.govtCertifiedBadge }) : null
        ])
      ]),
      dom.create("div", { class: "courseTags" }, course.categories.map((categoryId) => {
        const category = dom.byId(coursesData.categories, categoryId);
        return category ? dom.create("span", { class: "courseTag", text: category.label }) : null;
      })),
      dom.create("h3", { class: "courseName", text: course.name }),
      dom.create("p", { class: "courseText", text: course.description }),
      dom.create("div", { class: "courseFoot" }, [
        courseCard.buildFee(course.fee),
        dom.link(router.courseHref(course.id), { class: "courseMore", text: labels.viewDetails })
      ])
    ]);
  },

  /* Course photo when "image" is set, otherwise the emoji icon tile. */
  buildVisual(course) {
    return course.image
      ? dom.create("img", { class: "courseImage", src: course.image, alt: "", loading: "lazy" })
      : dom.create("span", { class: "courseIcon", "aria-hidden": "true", text: course.icon });
  },

  formatFee(amount) {
    const labels = coursesData.labels;
    return labels.currency + " " + dom.formatAmount(amount) + labels.feeSuffix;
  },

  buildFee(fee) {
    if (!fee) return dom.create("div", { class: "courseFee courseFeeContact", text: coursesData.labels.contactForFees });
    return dom.create("div", { class: "courseFee" }, [
      dom.create("span", { class: "courseFeeNow", text: courseCard.formatFee(fee.amount) }),
      fee.oldAmount ? dom.create("s", { class: "courseFeeOld", text: courseCard.formatFee(fee.oldAmount) }) : null
    ]);
  }
};
