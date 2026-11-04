/* ==========================================================================
   page-banner.js  -  Weblink Computers
   Dark banner at the top of inner pages: breadcrumb, title, text, count pill, then
   highlight chips (phones) and stat tiles (tablet + desktop). Reusable for About, Branches ...
   Data: coursesPageData.banner (or any object with the same fields).
   Stat tiles can count up: give a stat countUp: true and a plain number as value (needs core/counter.js).
   Optional fields: title (plain text instead of titleBefore + titleAccent), iconText, tags [text], badges [{ label, className }].
   Global: pageBanner
   ========================================================================== */

const pageBanner = {

  /* Numbers that data templates can use: {courseCount} {categoryCount} {branchCount} */
  counts() {
    return {
      courseCount: coursesData.courses.length,
      categoryCount: coursesData.categories.length,
      branchCount: branchesData.length
    };
  },

  build(data) {
    const counts = pageBanner.counts();
    const banner = dom.create("section", { class: "pageBanner" }, [
      dom.create("div", { class: "container bannerSplit" }, [
        dom.create("div", { class: "bannerInner" }, [
          pageBanner.buildBreadcrumb(data.breadcrumb),
          data.iconText ? dom.create("div", { class: "bannerIconTile", "aria-hidden": "true", text: data.iconText }) : null,
          dom.create("h1", { class: "bannerTitle" }, data.title ? data.title : [data.titleBefore, dom.create("em", { class: "bannerAccent", text: data.titleAccent })]),
          data.text ? dom.create("p", { class: "bannerText", text: data.text }) : null,
          data.tags ? dom.create("div", { class: "bannerTags" }, data.tags.map((tag) => dom.create("span", { class: "courseTag", text: tag })).concat(
            data.badges ? data.badges.map((badge) => dom.create("span", { class: "badge " + badge.className, text: badge.label })) : [])) : null,
          data.pillLabel ? dom.create("span", { class: "bannerPill", text: dom.fill(data.pillLabel, counts) }) : null,
          data.highlights ? dom.create("div", { class: "bannerChips" }, data.highlights.map((item) =>
            dom.create("span", { class: "bannerChip" }, [dom.create("b", { text: "✓" }), " " + item.label]))) : null
        ]),
        data.stats ? dom.create("div", { class: "bannerSide" }, dom.create("div", { class: "bannerStats" }, data.stats.map((stat) =>
          dom.create("div", { class: "bannerStat" }, [
            dom.create("strong", {}, [
              stat.countUp ? counter.build("bannerCount", stat.value, { plain: true }) : dom.fill(stat.value, counts),
              stat.suffix ? dom.create("em", { text: stat.suffix }) : null
            ]),
            dom.create("span", { text: stat.label })
          ])))) : null
      ])
    ]);
    counter.watch(banner, ".bannerCount", 0.6);        /* stats with countUp: true count up when seen */
    return banner;
  },

  buildBreadcrumb(items) {
    const list = dom.create("ol", { class: "breadcrumb" });
    items.forEach((item, index) => {
      if (index > 0) dom.append(list, dom.create("li", { class: "sep", "aria-hidden": "true", text: "›" }));
      dom.append(list, dom.create("li", item.href ? {} : { class: "current", "aria-current": "page" },
        item.href ? dom.link(item.href, { text: item.label }) : item.label));
    });
    return list;
  }
};
