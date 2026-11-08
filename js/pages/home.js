/* ==========================================================================
   home.js (page)  -  Weblink Computers  (index.html)
   Assembles the Home page: header, the sections listed in homeData.sections
   (in that order, skipping disabled ones), footer.
   To add a section: write its builder below and add its type to the "builders" list.
   Global: homePage
   ========================================================================== */

const homePage = {

  /* section type (from home.js data) -> function that returns the section's element */
  builders: {
    hero: () => hero.build(homeData.hero),
    stats: () => statCard.buildStrip(homeData.stats),
    popularCourses: () => courseSection.build(homeData.popularCourses),
    whyChoose: () => featureSection.build(homeData.whyChoose),
    careerBanner: () => careerBanner.build(homeData.careerBanner),
    certifications: () => certificationSection.build(homeData.certifications),
    testimonials: () => testimonialSlider.build(homeData.testimonials),
    gallery: () => gallerySection.build(homeData.gallery)
  },

  /* The hero and the stats strip share ONE background (class heroStage), which ends halfway down the strip. */
  groupHeroStage(sections) {
    const stageTypes = ["hero", "stats"];
    const stageItems = sections.filter((item) => stageTypes.includes(item.type));
    const result = [];
    sections.forEach((item) => {
      if (!stageTypes.includes(item.type)) { result.push(item.element); return; }
      if (item === stageItems[0]) {
        result.push(dom.create("div", { class: "heroStage" }, stageItems.map((entry) => entry.element)));
      }
    });
    return result;
  },

  render() {
    router.setTitle(homeData.pageTitle);
    siteNav.render();

    const sections = homeData.sections
      .filter((section) => section.enabled && homePage.builders[section.type])
      .map((section) => ({ type: section.type, element: homePage.builders[section.type]() }));
    dom.mount("pageContent", homePage.groupHeroStage(sections));

    siteFooter.render();
    floatingButtons.render();

    reveal.apply();     /* scroll animations */
    reveal.start();     /* page-load animation */
  }
};

dom.onReady(homePage.render);
