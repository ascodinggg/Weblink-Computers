/* ==========================================================================
   feature-section.js  -  Weblink Computers
   Home "Why Choose Weblink?" section: dark feature section with 6 light cards.
   Data: homeData.whyChoose (home.js).   Global: featureSection
   ========================================================================== */

const featureSection = {

  build(data) {
    return dom.create("section", { class: "section sectionDark featureSection", id: "whyChoose" },
      dom.create("div", { class: "container" }, [
        dom.create("div", { class: "sectionHeader" }, [
          dom.create("p", { class: "eyebrow", text: data.eyebrow }),
          dom.create("h2", { class: "sectionTitle", text: data.title }),
          dom.create("p", { class: "sectionSubtitle", text: data.subtitle })
        ]),
        dom.create("div", { class: "grid colsTablet2 colsDesktop3" },
          data.cards.map((item, index) => featureCard.build(item, index + 1)))
      ]));
  }
};
