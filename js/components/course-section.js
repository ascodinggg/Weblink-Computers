/* ==========================================================================
   course-section.js  -  Weblink Computers
   Home "Popular Courses" section: header, category filter chips, course cards,
   "Show 6 more" button (phones only), "Can't find your course?" panel and the
   View All button.
   Data: homeData.popularCourses (home.js) + coursesData (courses-data.js).
   Global: courseSection
   ========================================================================== */

const courseSection = {

  build(data) {
    const state = { categoryId: 0, expanded: false };      /* categoryId 0 = All */
    const popular = coursesData.courses.filter((course) => course.popular);

    const section = dom.create("section", { class: "section courseSection isCollapsed", id: "courses" });
    const grid = dom.create("div", { class: "grid colsTablet2 colsDesktop4 courseGrid" });
    const chipRow = dom.create("div", { class: "chipRow", role: "group" });

    const showMore = dom.create("button", {
      class: "showMoreBtn", type: "button", text: data.showMoreLabel,
      on: { click: () => { state.expanded = true; update(); } }
    });

    /* redraw the cards, the active chip and the collapsed state after any change */
    const update = () => {
      const visible = popular.filter((course) => state.categoryId === 0 || course.categories.includes(state.categoryId));
      dom.mount(grid, visible.map((course, index) => {
        const card = courseCard.build(course);
        if (index >= data.mobileInitialCount) card.classList.add("isExtra");
        return card;
      }));
      dom.findAll(".chip", chipRow).forEach((chip) => {
        const active = Number(chip.dataset.categoryId) === state.categoryId;
        chip.classList.toggle("isActive", active);
        chip.setAttribute("aria-pressed", String(active));
      });
      const collapsed = state.categoryId === 0 && !state.expanded && visible.length > data.mobileInitialCount;
      section.classList.toggle("isCollapsed", collapsed);
    };

    const chips = [{ id: 0, label: coursesData.labels.allCategory }].concat(
      coursesData.categories.filter((category) => popular.some((course) => course.categories.includes(category.id))));
    dom.append(chipRow, chips.map((category) => dom.create("button", {
      class: "chip", type: "button", text: category.label, dataset: { categoryId: category.id },
      on: { click: () => { state.categoryId = category.id; update(); reveal.apply(grid); } }
    })));

    dom.append(section, dom.create("div", { class: "container" }, [
      dom.create("div", { class: "sectionHeader" }, [
        dom.create("p", { class: "eyebrow", text: data.eyebrow }),
        dom.create("h2", { class: "sectionTitle", text: data.title }),
        dom.create("p", { class: "sectionSubtitle", text: data.subtitle })
      ]),
      chipRow,
      grid,
      dom.create("div", { class: "showMoreWrap" }, showMore),
      courseSection.buildPanel(data.morePanel),
      dom.create("div", { class: "centerContent courseViewAll" },
        dom.link(data.viewAllHref, { class: "btn btnPrimary" }, data.viewAllLabel))
    ]));

    update();
    return section;
  },

  /* "Can't find your course?" panel: a pill for each extra course + "and more". */
  buildPanel(panel) {
    const pills = panel.courseIds.map((courseId) => dom.byId(coursesData.courses, courseId))
      .filter(Boolean)
      .map((course) => dom.link(router.courseHref(course.id), { class: "coursePill", text: course.name }));
    pills.push(dom.link(panel.moreHref, { class: "coursePill coursePillMore", text: panel.moreLabel }));

    return dom.create("div", { class: "morePanel" }, [
      dom.create("div", { class: "morePanelHead" }, [
        dom.create("span", { class: "morePanelLabel", text: panel.label }),
        dom.create("h3", { class: "morePanelTitle", text: panel.title })
      ]),
      dom.create("p", { class: "morePanelText", text: panel.text }),
      dom.create("div", { class: "pillRow" }, pills)
    ]);
  }
};
