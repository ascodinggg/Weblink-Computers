/* ==========================================================================
   certification-section.js  -  Weblink Computers
   Home "Our Certifications" section: header, 3 certification cards, button to certifications.html.
   Data: homeData.certifications (home.js).   Global: certificationSection
   ========================================================================== */

const certificationSection = {

  build(data) {
    return dom.create("section", { class: "section sectionAlt certSection", id: "certifications" },
      dom.create("div", { class: "container" }, [
        dom.create("div", { class: "sectionHeader" }, [
          dom.create("p", { class: "eyebrow", text: data.eyebrow }),
          dom.create("h2", { class: "sectionTitle", text: data.title }),
          dom.create("p", { class: "sectionSubtitle", text: data.subtitle })
        ]),
        dom.create("div", { class: "grid colsTablet3" }, data.cards.map((item) => certificationCard.build(item))),
        dom.create("div", { class: "centerContent certButton" },
          dom.link(data.button.href, { class: "btn btnPrimary", text: data.button.label }))
      ]));
  }
};
