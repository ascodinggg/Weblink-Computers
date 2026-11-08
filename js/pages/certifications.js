/* ==========================================================================
   certifications.js (page)  -  Weblink Computers  (certifications.html)
   Assembles the page from certificationsPageData.sections (in that order, skipping disabled ones).
   The three certification cards come from the Home data; figures come from the Home stats.
   To add a section: write its builder below and add its type to "builders".
   Global: certificationsPage
   ========================================================================== */

const certificationsPage = {

  builders: {
    authorised: () => certificationsPage.buildAuthorised(certificationsPageData.authorised),
    details: () => certificationsPage.buildDetails(certificationsPageData.details),
    steps: () => certificationsPage.buildSteps(certificationsPageData.steps),
    samples: () => certificationsPage.buildSamples(certificationsPageData.samples),
    faq: () => certificationsPage.buildFaq(certificationsPageData.faq),
    cta: () => ctaBand.build(certificationsPageData.cta)
  },

  cards() {
    return homeData.certifications.cards;
  },

  header(data) {
    return dom.create("div", { class: "sectionHeader" }, [
      dom.create("p", { class: "eyebrow", text: data.eyebrow }),
      dom.create("h2", { class: "sectionTitle", text: data.title })
    ]);
  },

  section(className, children) {
    return dom.create("section", { class: "section " + className }, dom.create("div", { class: "container" }, children));
  },

  /* ---------- banner ---------- */
  bannerData() {
    const data = certificationsPageData.banner;
    const values = { certCount: certificationsPage.cards().length };
    return Object.assign({}, data, {
      pillLabel: dom.fill(data.pillLabel, values),
      stats: data.stats.map((item) => {
        if (item.type === "certCount") return { id: item.id, value: String(values.certCount), suffix: "", label: item.display, countUp: true };
        if (item.type === "branchCount") return { id: item.id, value: String(branchesData.length), suffix: "", label: item.display, countUp: true };
        const stat = siteStats.homeStat(item.stat);
        return { id: item.id, value: siteStats.value(stat), suffix: stat && stat.suffix ? stat.suffix : "", label: item.display, countUp: siteStats.isNumber(stat) };
      })
    });
  },

  /* ---------- 1. the cards ---------- */
  buildAuthorised(data) {
    return certificationsPage.section("certSection", [
      certificationsPage.header(data),
      dom.create("div", { class: "grid colsTablet3" }, certificationsPage.cards().map((item) => certificationCard.build(item)))
    ]);
  },

  /* ---------- 2. detail blocks ---------- */
  buildDetails(data) {
    const blocks = data.items.map((item) => {
      const card = certificationsPage.cards().find((entry) => entry.badge === item.badge);
      if (!card) return null;
      const courses = item.courseIds.map((id) => dom.byId(coursesData.courses, id)).filter(Boolean);
      const column = (label, content) => dom.create("div", { class: "certCol" }, [dom.create("h3", { class: "certColTitle", text: label }), content]);
      return dom.create("article", { class: "certBlock" }, [
        dom.create("div", { class: "certBlockHead" }, [
          dom.create("div", { class: "certBadge tone" + featureCard.cap(card.tone), "aria-hidden": "true" }, [
            dom.create("span", { class: "certBadgeName", text: card.badge }),
            dom.create("small", { class: "certBadgeCaption", text: card.badgeCaption })
          ]),
          dom.create("div", {}, [dom.create("h3", { class: "certBlockTitle", text: card.title }), dom.create("p", { class: "certBlockText", text: card.text })])
        ]),
        dom.create("div", { class: "certBlockBody" }, [
          column(data.whatLabel, [
            dom.create("p", { text: item.what }),
            dom.create("h4", { class: "certColTitle certColGap", text: data.whoLabel }),
            dom.create("p", { text: item.who })
          ]),
          column(data.getLabel, dom.create("ul", { class: "tickList" }, item.gets.map((text) => dom.create("li", { text: text })))),
          column(data.coursesLabel, dom.create("div", { class: "certCourses" }, courses.map((course) =>
            dom.link(router.courseHref(course.id), { class: "certCourseLink", text: course.name }))))
        ])
      ]);
    });
    return certificationsPage.section("sectionAlt detailSection", [certificationsPage.header(data), blocks]);
  },

  /* ---------- 3. steps (dark section) ---------- */
  buildSteps(data) {
    return certificationsPage.section("sectionDark stepsSection", [
      certificationsPage.header(data),
      dom.create("div", { class: "stepsRow" }, data.items.map((item, index) => dom.create("article", { class: "stepCard" }, [
        dom.create("span", { class: "stepNum", "aria-hidden": "true", text: String(index + 1) }),
        dom.create("h3", { class: "stepTitle", text: item.title }),
        dom.create("p", { class: "stepText", text: item.text })
      ])))
    ]);
  },

  /* ---------- 4. sample certificates ---------- */
  buildSamples(data) {
    return certificationsPage.section("sectionAlt samplesSection", [
      certificationsPage.header(data),
      dom.create("div", { class: "sampleRow" }, data.items.map((item) => dom.create("figure", { class: "sampleCard" }, [
        item.image
          ? dom.create("img", { class: "sampleImage", src: item.image, alt: item.alt, loading: "lazy" })
          : dom.create("div", { class: "sampleImage isPlaceholder", "aria-hidden": "true", text: data.placeholder }),
        dom.create("figcaption", { class: "sampleTitle", text: item.title })
      ])))
    ]);
  },

  /* ---------- 5. FAQ ---------- */
  buildFaq(data) {
    return certificationsPage.section("faqSection", [
      certificationsPage.header(data),
      dom.create("div", { class: "faqBox" }, accordion.build(data.items, true))
    ]);
  },

  render() {
    router.setTitle(certificationsPageData.pageTitle);
    siteNav.render();
    const sections = certificationsPageData.sections
      .filter((item) => item.enabled && certificationsPage.builders[item.type])
      .map((item) => certificationsPage.builders[item.type]());
    dom.mount("pageContent", dom.create("div", { class: "certificationsPage" }, [pageBanner.build(certificationsPage.bannerData())].concat(sections)));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(certificationsPage.render);
