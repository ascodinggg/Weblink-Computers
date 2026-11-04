/* ==========================================================================
   stat-card.js  -  Weblink Computers
   The floating stats strip (4 stats). Numbers count up when the strip scrolls into
   view (not for text stats like "Lifetime"; off for reduced-motion). The animation is in core/counter.js.
   Data: homeData.stats (home.js).   Global: statCard
   ========================================================================== */

const statCard = {

  /* The whole strip: a section that floats over the bottom edge of the hero. */
  buildStrip(stats) {
    const strip = dom.create("section", { class: "statsSection", id: "stats" },
      dom.create("div", { class: "container" },
        dom.create("div", { class: "statStrip" }, stats.map((item) => statCard.build(item)))));
    statCard.watch(strip);
    return strip;
  },

  build(item) {
    const hasNumber = typeof item.value === "number";
    const number = dom.create("div", { class: "statNumber" }, hasNumber
      ? [
          dom.create("span", { class: "statValue", dataset: item.countUp ? { target: item.value } : {}, text: dom.formatAmount(item.countUp ? 0 : item.value) }),
          item.suffix ? dom.create("small", { class: "statSuffix", text: item.suffix }) : null
        ]
      : dom.create("span", { class: "statValue", text: item.text }));

    return dom.create("div", { class: "statItem" }, [
      dom.create("span", { class: "statIcon", "aria-hidden": "true", text: item.icon }),
      number,
      dom.create("div", { class: "statLabel", text: item.label })
    ]);
  },

  /* Start the count-up only once the strip is (almost) fully on screen (see core/counter.js). */
  watch(strip) {
    counter.watch(strip, ".statValue[data-target]", 0.9);
  }
};
