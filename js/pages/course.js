/* ==========================================================================
   course.js (page)  -  Weblink Computers  (course.html?course=<slug>)
   Banner, detail blocks (about, learn, syllabus, who can join), sticky fee + enquiry card,
   related courses, help panel. A wrong address shows a "course not found" page.
   Data: coursePageData (data/course.js), coursesData (courses-data.js: course + details).
   Global: coursePage
   ========================================================================== */

const coursePage = {

  detailsOf(course) {
    return coursesData.details.find((item) => item.courseId === course.id) || null;
  },

  buildBanner(course) {
    const labels = coursesData.labels;
    const badges = [];
    if (course.fee && course.fee.oldAmount) badges.push({ label: labels.offerBadge, className: "badgeOffer" });
    if (course.badge === "govtCertified") badges.push({ label: labels.govtCertifiedBadge, className: "badgeGovt" });
    return pageBanner.build({
      breadcrumb: coursePageData.breadcrumbBase.concat([{ id: 3, label: course.name }]),
      title: course.name,
      iconText: course.image ? "" : course.icon,
      text: course.description,
      tags: course.categories.map((id) => (dom.byId(coursesData.categories, id) || {}).label).filter(Boolean),
      badges: badges
    });
  },

  buildBlock(title, children) {
    return dom.create("div", { class: "detailBlock" }, [dom.create("h2", { class: "detailTitle", text: title }), children]);
  },

  buildMain(course, details) {
    const blocks = coursePageData.blocks;
    return dom.create("div", { class: "detailMain" }, [
      coursePage.buildBlock(blocks.aboutTitle, dom.create("p", { text: details.about })),
      coursePage.buildBlock(blocks.learnTitle, dom.create("ul", { class: "learnList" },
        details.learn.map((point) => dom.create("li", { class: "learnItem", text: point })))),
      coursePage.buildBlock(blocks.syllabusTitle, accordion.build(details.syllabus, true)),
      coursePage.buildBlock(blocks.joinTitle, [
        dom.create("p", { text: blocks.joinText }),
        dom.create("div", { class: "joinList" }, details.careers.map((career) => dom.create("span", { class: "courseTag", text: career })))
      ])
    ]);
  },

  buildSide(course, details) {
    const card = coursePageData.sideCard;
    const labels = coursesData.labels;
    const fee = course.fee;
    const factValue = (fact) => {
      if (fact.source) return details[fact.source];
      return course.badge === "govtCertified" && fact.govtValue ? fact.govtValue : fact.value;
    };

    return dom.create("aside", { class: "detailSide" }, dom.create("div", { class: "sideCard" }, [
      dom.create("div", { class: "sideFee" }, fee ? [
        dom.create("span", { class: "sideFeeNow", text: courseCard.formatFee(fee.amount) }),
        fee.oldAmount ? dom.create("s", { class: "sideFeeOld", text: courseCard.formatFee(fee.oldAmount) }) : null,
        fee.oldAmount ? dom.create("span", { class: "badge badgeOffer sideOffer", text: labels.offerBadge }) : null
      ] : dom.create("span", { class: "sideFeeNow sideFeeContact", text: labels.contactForFees })),
      dom.create("ul", { class: "factList" }, card.facts.map((fact) => dom.create("li", { class: "factRow" }, [
        dom.create("span", { class: "factLabel", text: fact.label }),
        dom.create("strong", { class: "factValue", text: factValue(fact) })
      ]))),
      dom.create("div", { class: "sideButtons" }, [
        dom.link(whatsapp.link(whatsapp.courseMessage(course)), { class: "btn btnWhatsapp btnFull", target: "_blank", rel: "noopener", text: card.whatsappLabel }),
        dom.link("tel:" + siteConfig.contact.phoneLink, { class: "btn btnPrimary btnFull", text: card.callLabel })
      ])
    ]));
  },

  buildRelated(course) {
    const related = coursePageData.related;
    const courses = coursesData.courses
      .filter((item) => item.id !== course.id && item.categories.some((id) => course.categories.includes(id)))
      .slice(0, related.count);
    if (!courses.length) return null;
    return [
      dom.create("div", { class: "relatedHead" }, [
        dom.create("p", { class: "eyebrow", text: related.eyebrow }),
        dom.create("h2", { class: "relatedTitle", text: related.title })
      ]),
      dom.create("div", { class: "grid colsTablet2 colsDesktop4 courseGrid" }, courses.map((item) => courseCard.build(item)))
    ];
  },

  buildNotFound() {
    const data = coursePageData.notFound;
    router.setTitle(data.pageTitle);
    return [
      pageBanner.build({
        breadcrumb: coursePageData.breadcrumbBase.concat([{ id: 3, label: data.pageTitle }]),
        titleBefore: data.bannerTitleBefore,
        titleAccent: data.bannerTitleAccent
      }),
      dom.create("section", { class: "section" }, dom.create("div", { class: "container notFound" }, [
        dom.create("div", { class: "notFoundIcon", "aria-hidden": "true", text: data.icon }),
        dom.create("h2", { class: "notFoundTitle", text: data.title }),
        dom.create("p", { class: "notFoundText", text: data.text }),
        dom.link(data.button.href, { class: "btn btnPrimary", text: data.button.label })
      ]))
    ];
  },

  buildPage(course) {
    const details = coursePage.detailsOf(course);
    router.setTitle(course.name);
    return [
      coursePage.buildBanner(course),
      dom.create("section", { class: "section detailBody" }, dom.create("div", { class: "container" }, [
        dom.create("div", { class: "detailLayout" }, [coursePage.buildMain(course, details), coursePage.buildSide(course, details)]),
        coursePage.buildRelated(course),
        helpPanel.build()
      ]))
    ];
  },

  render() {
    siteNav.render();
    const course = router.currentCourse();
    dom.mount("pageContent", dom.create("div", { class: "coursePage" }, course && coursePage.detailsOf(course) ? coursePage.buildPage(course) : coursePage.buildNotFound()));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(coursePage.render);
