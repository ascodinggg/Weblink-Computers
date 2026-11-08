/* ==========================================================================
   about.js (page)  -  Weblink Computers  (about.html)
   Assembles the About page from the sections listed in aboutPageData.sections (in that order,
   skipping disabled ones). The figures and the "Why Choose" cards come from the Home data.
   To add a section: write its builder below and add its type to "builders".
   Global: aboutPage
   ========================================================================== */

const aboutPage = {

  builders: {
    story: () => aboutPage.buildStory(aboutPageData.story),
    numbers: () => aboutPage.buildNumbers(aboutPageData.numbers),
    values: () => aboutPage.buildValues(aboutPageData.values),
    whyChoose: () => featureSection.build(homeData.whyChoose),
    partners: () => aboutPage.buildPartners(aboutPageData.partners),
    team: () => aboutPage.buildTeam(aboutPageData.team),
    cta: () => ctaBand.build(aboutPageData.cta)
  },

  /* ---------- helpers ---------- */
  homeStat(label) { return siteStats.homeStat(label); },
  statValue(stat) { return siteStats.value(stat); },

  /* true for a numeric stat that should count up (not a text one like "Lifetime") */
  isNumber(stat) { return siteStats.isNumber(stat); },

  header(data) {
    return dom.create("div", { class: "sectionHeader" }, [
      dom.create("p", { class: "eyebrow", text: data.eyebrow }),
      dom.create("h2", { class: "sectionTitle", text: data.title }),
      data.subtitle ? dom.create("p", { class: "sectionSubtitle", text: data.subtitle }) : null
    ]);
  },

  section(className, children) {
    return dom.create("section", { class: "section " + className }, dom.create("div", { class: "container" }, children));
  },

  /* ---------- banner ---------- */
  bannerData() {
    const data = aboutPageData.banner;
    const years = aboutPage.statValue(aboutPage.homeStat(data.yearsStat));
    const values = { years: years, branchCount: branchesData.length };
    return Object.assign({}, data, {
      text: dom.fill(data.text, values),
      pillLabel: dom.fill(data.pillLabel, values),
      stats: data.stats.map((item) => {
        if (item.type === "branchCount") return { id: item.id, value: String(branchesData.length), suffix: "", label: item.display, countUp: true };
        const stat = aboutPage.homeStat(item.stat);
        return { id: item.id, value: aboutPage.statValue(stat), suffix: stat && stat.suffix ? stat.suffix : "", label: item.display, countUp: aboutPage.isNumber(stat) };
      })
    });
  },

  /* ---------- sections ---------- */
  buildStory(data) {
    const photo = data.image
      ? dom.create("img", { class: "storyImage", src: data.image, alt: data.imageAlt, loading: "lazy" })
      : dom.create("span", { class: "storyPlaceholder", text: data.photoPlaceholder });
    return aboutPage.section("storySection", dom.create("div", { class: "storyRow" }, [
      dom.create("div", { class: "storyText" }, [
        dom.create("p", { class: "eyebrow", text: data.eyebrow }),
        dom.create("h2", { class: "storyTitle", text: data.title }),
        data.paragraphs.map((text) => dom.create("p", { text: text })),
        dom.create("ul", { class: "storyTags" }, data.tags.map((tag) => dom.create("li", { text: tag })))
      ]),
      dom.create("div", { class: "storyPhoto" }, [
        photo,
        dom.create("div", { class: "storyBadge" }, [dom.create("strong", { text: dom.fill(data.badge.value, { years: aboutPage.statValue(aboutPage.homeStat(aboutPageData.banner.yearsStat)) }) }), dom.create("span", { text: data.badge.label })])
      ])
    ]));
  },

  buildNumbers(data) {
    const row = dom.create("div", { class: "numbersRow" }, homeData.stats.map((stat) => dom.create("div", { class: "numberCard" }, [
      dom.create("strong", { class: "numberValue" }, [
        aboutPage.isNumber(stat) ? counter.build("numberCount", stat.value) : aboutPage.statValue(stat),
        stat.suffix ? dom.create("em", { class: "numberSuffix", text: stat.suffix }) : null
      ]),
      dom.create("span", { class: "numberLabel", text: stat.label })
    ])));
    counter.watch(row, ".numberCount", 0.6);
    return aboutPage.section("sectionAlt numbersSection", [aboutPage.header(data), row]);
  },

  buildValues(data) {
    return aboutPage.section("valuesSection", [
      aboutPage.header(data),
      dom.create("div", { class: "valueRow" }, data.items.map((item) => dom.create("article", { class: "valueCard tone" + featureCard.cap(item.tone) }, [
        dom.create("span", { class: "valueIcon", "aria-hidden": "true", text: item.icon }),
        dom.create("h3", { class: "valueTitle", text: item.title }),
        dom.create("p", { class: "valueText", text: item.text })
      ])))
    ]);
  },

  /* Same certification cards (round badge logos) as the Home page: they come from homeData.certifications. */
  buildPartners(data) {
    return aboutPage.section("partnersSection certSection", [
      aboutPage.header(data),
      dom.create("div", { class: "grid colsTablet3" }, homeData.certifications.cards.map((item) => certificationCard.build(item)))
    ]);
  },

  buildTeam(data) {
    return aboutPage.section("sectionAlt teamSection", [
      aboutPage.header(data),
      dom.create("div", { class: "teamRow" }, data.people.map((person) => dom.create("article", { class: "teamCard" }, [
        person.photo
          ? dom.create("img", { class: "teamPhoto", src: person.photo, alt: person.name, loading: "lazy" })
          : dom.create("span", { class: "teamPhoto", "aria-hidden": "true", text: person.name.charAt(0).toUpperCase() }),
        dom.create("h3", { class: "teamName", text: person.name }),
        dom.create("p", { class: "teamRole", text: person.role })
      ])))
    ]);
  },

  render() {
    router.setTitle(aboutPageData.pageTitle);
    siteNav.render();
    const sections = aboutPageData.sections
      .filter((item) => item.enabled && aboutPage.builders[item.type])
      .map((item) => aboutPage.builders[item.type]());
    dom.mount("pageContent", dom.create("div", { class: "aboutPage" }, [pageBanner.build(aboutPage.bannerData())].concat(sections)));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(aboutPage.render);
