/* ==========================================================================
   branches.js (page)  -  Weblink Computers  (branches.html)
   Banner, branch chips (jump to a branch), one block per branch (details + own map), help panel.
   Data: branchesPageData (data/branches-page.js), branchesData (data/branches.js).
   Global: branchesPage
   ========================================================================== */

const branchesPage = {

  /* Banner data with the {templates} and stat values filled from the branches. */
  bannerData() {
    const data = branchesPageData.banner;
    const values = Object.assign({}, pageBanner.counts(), { workingHours: siteConfig.contact.workingHours });
    const statValue = (stat) => {
      if (stat.type === "branchCount") return String(branchesData.length);
      if (stat.type === "areaCount") return String(branchesData.filter((branch) => branch.area === stat.area).length);
      return stat.value;
    };
    return Object.assign({}, data, {
      text: dom.fill(data.text, values),
      pillLabel: dom.fill(data.pillLabel, values),
      highlights: data.highlights.map((item) => Object.assign({}, item, { label: dom.fill(item.label, values) })),
      stats: data.stats.map((stat) => ({ id: stat.id, value: statValue(stat), suffix: "", label: stat.label }))
    });
  },

  /* Chips that scroll to a branch. */
  buildJumpBar() {
    const bar = dom.create("div", { class: "chipRow jumpBar", role: "group" });
    dom.append(bar, branchesData.map((branch) => dom.link("#branch" + branch.id, {
      class: "chip", text: branch.shortName,
      on: { click: () => dom.findAll(".chip", bar).forEach((chip) => chip.classList.toggle("isActive", chip.getAttribute("href") === "#branch" + branch.id)) }
    })));
    return bar;
  },

  buildHelp() {
    const help = branchesPageData.help;
    return dom.create("div", { class: "morePanel" }, [
      dom.create("div", { class: "morePanelHead" }, [
        dom.create("span", { class: "morePanelLabel", text: help.label }),
        dom.create("h3", { class: "morePanelTitle", text: help.title })
      ]),
      dom.create("p", { class: "morePanelText", text: help.text }),
      dom.create("div", { class: "centerContent" }, dom.link(help.button.href, { class: "btn btnPrimary", text: help.button.label }))
    ]);
  },

  render() {
    const blocks = branchesPageData.blocks;
    router.setTitle(branchesPageData.pageTitle);
    siteNav.render();
    dom.mount("pageContent", dom.create("div", { class: "branchesPage" }, [
      pageBanner.build(branchesPage.bannerData()),
      dom.create("section", { class: "section branchesBody" }, dom.create("div", { class: "container" }, [
        branchesPage.buildJumpBar(),
        dom.create("div", { class: "branchList" }, branchesData.map((branch, index) =>
          branchCard.buildBlock(branch, blocks, index, branch.id === blocks.mainBranchId))),
        branchesPage.buildHelp()
      ]))
    ]));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(branchesPage.render);
