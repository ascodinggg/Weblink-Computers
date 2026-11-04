/* ==========================================================================
   courses.js (page)  -  Weblink Computers  (courses.html)
   Page banner + search + filter chips (All, Trending, categories) + course cards + help panel.
   Address: courses.html?category=<slug>  |  courses.html?filter=trending
   Data: coursesPageData (data/courses.js) + coursesData (data/courses-data.js).
   Global: coursesPage
   ========================================================================== */

const coursesPage = {

  /* Chips: All, Trending, then every category. key = address value ("" for All). */
  chipList() {
    const toolbar = coursesPageData.toolbar;
    return [{ key: "", label: toolbar.allLabel }, { key: toolbar.trendingKey, label: toolbar.trendingLabel }]
      .concat(coursesData.categories.map((category) => ({ key: category.slug, label: category.label })));
  },

  /* The chip key the address asks for (unknown values fall back to All). */
  initialKey() {
    const wanted = router.param("filter") || router.param("category") || "";
    return coursesPage.chipList().some((chip) => chip.key === wanted) ? wanted : "";
  },

  /* Courses matching the active chip and the search words. */
  filter(key, search) {
    const trendingKey = coursesPageData.toolbar.trendingKey;
    const category = coursesData.categories.find((item) => item.slug === key);
    const words = search.trim().toLowerCase();
    return coursesData.courses.filter((course) => {
      if (key === trendingKey && !course.popular) return false;
      if (category && !course.categories.includes(category.id)) return false;
      if (!words) return true;
      const labels = course.categories.map((id) => (dom.byId(coursesData.categories, id) || {}).label || "");
      return [course.name, course.description].concat(labels).join(" ").toLowerCase().includes(words);
    });
  },

  /* Keep the address in step with the chip (no page reload). */
  syncAddress(key) {
    const trendingKey = coursesPageData.toolbar.trendingKey;
    const query = !key ? "" : (key === trendingKey ? "?filter=" : "?category=") + encodeURIComponent(key);
    window.history.replaceState(null, "", router.currentPage() + query);
  },

  buildBody() {
    const page = coursesPageData;
    const state = { key: coursesPage.initialKey(), search: "" };

    const chipRow = dom.create("div", { class: "chipRow", role: "group" });
    const input = dom.create("input", {
      class: "searchInput", type: "search", placeholder: page.toolbar.searchPlaceholder, "aria-label": page.toolbar.searchLabel,
      on: { input: () => { state.search = input.value; update(false); } }
    });
    const resultLine = dom.create("p", { class: "resultLine", "aria-live": "polite" });
    const results = dom.create("div", { class: "coursesResults" });

    const update = (animate) => {
      const visible = coursesPage.filter(state.key, state.search);
      dom.findAll(".chip", chipRow).forEach((chip) => {
        const active = chip.dataset.key === state.key;
        chip.classList.toggle("isActive", active);
        chip.setAttribute("aria-pressed", String(active));
      });
      const template = visible.length === 1 ? page.results.one : page.results.many;
      const parts = template.split("{count}");
      dom.mount(resultLine, [parts[0], dom.create("strong", { text: String(visible.length) }), parts[1] || ""]);
      dom.mount(results, visible.length ? dom.create("div", { class: "grid colsTablet2 colsDesktop4 courseGrid" }, visible.map((course) => courseCard.build(course)))
        : coursesPage.buildEmpty(() => { state.key = ""; state.search = ""; input.value = ""; coursesPage.syncAddress(""); update(true); }));
      if (animate) reveal.apply(results);
    };

    dom.append(chipRow, coursesPage.chipList().map((chip) => dom.create("button", {
      class: "chip", type: "button", text: chip.label, dataset: { key: chip.key },
      on: { click: () => { state.key = chip.key; coursesPage.syncAddress(chip.key); update(true); } }
    })));

    update(false);
    return dom.create("section", { class: "section coursesBody" }, dom.create("div", { class: "container" }, [
      dom.create("div", { class: "coursesToolbar" }, [
        dom.create("label", { class: "searchBox" }, [dom.create("span", { "aria-hidden": "true", text: page.toolbar.searchIcon }), input]),
        chipRow
      ]),
      resultLine,
      results,
      helpPanel.build()
    ]));
  },

  buildEmpty(onReset) {
    const empty = coursesPageData.empty;
    return dom.create("div", { class: "emptyState" }, [
      dom.create("div", { class: "emptyIcon", "aria-hidden": "true", text: empty.icon }),
      dom.create("h3", { class: "emptyTitle", text: empty.title }),
      dom.create("p", { class: "emptyText", text: empty.text }),
      dom.create("button", { class: "btn btnAmber", type: "button", text: empty.button, on: { click: onReset } })
    ]);
  },

  render() {
    router.setTitle(coursesPageData.pageTitle);
    siteNav.render();
    dom.mount("pageContent", dom.create("div", { class: "coursesPage" }, [pageBanner.build(coursesPageData.banner), coursesPage.buildBody()]));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(coursesPage.render);
