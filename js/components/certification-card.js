/* ==========================================================================
   certification-card.js  -  Weblink Computers
   One certification card: round text badge (e.g. "MS-CIT" over "MKCL"), title and text.
   tone = "red" | "blue" | "amber" (colours the top bar and the badge text).
   Data: one item of homeData.certifications.cards.   Global: certificationCard
   ========================================================================== */

const certificationCard = {

  build(item) {
    return dom.create("article", { class: "certCard tone" + featureCard.cap(item.tone) }, [
      dom.create("div", { class: "certBadge", "aria-hidden": "true" }, [
        dom.create("span", { class: "certBadgeName", text: item.badge }),
        dom.create("small", { class: "certBadgeCaption", text: item.badgeCaption })
      ]),
      dom.create("div", { class: "certBody" }, [
        dom.create("h3", { class: "certTitle", text: item.title }),
        dom.create("p", { class: "certText", text: item.text })
      ])
    ]);
  }
};
