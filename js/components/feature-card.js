/* ==========================================================================
   feature-card.js  -  Weblink Computers
   One "Why Choose" card: coloured top bar, gradient icon tile, title, text and a faint
   ghost number (01-06, hidden on phones). tone = "red" | "blue" | "amber".
   Data: one item of homeData.whyChoose.cards.   Global: featureCard
   ========================================================================== */

const featureCard = {

  build(item, number) {
    return dom.create("article", { class: "featureCard tone" + featureCard.cap(item.tone) }, [
      dom.create("span", { class: "featureNumber", "aria-hidden": "true", text: featureCard.pad(number) }),
      dom.create("span", { class: "featureIcon", "aria-hidden": "true", text: item.icon }),
      dom.create("div", { class: "featureBody" }, [
        dom.create("h3", { class: "featureTitle", text: item.title }),
        dom.create("p", { class: "featureText", text: item.text })
      ])
    ]);
  },

  cap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },

  /* 1 -> "01" */
  pad(number) {
    return String(number).padStart(2, "0");
  }
};
