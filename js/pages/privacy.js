/* ==========================================================================
   privacy.js (page)  -  Weblink Computers  (privacy.html)
   Banner + "On this page" menu (sticky list on desktop, chips on phones; the section being read is
   highlighted) + numbered text cards + closing band. Data: privacyPageData (data/privacy.js).
   Global: privacyPage
   ========================================================================== */

const privacyPage = {

  anchor(section) { return "section" + section.id; },

  buildMenu(data) {
    const links = data.sections.map((section) => dom.create("li", {}, dom.create("a", {
      href: "#" + privacyPage.anchor(section), text: section.title, dataset: { target: privacyPage.anchor(section) }
    })));
    return dom.create("nav", { class: "legalNav", "aria-label": data.menuTitle }, [
      dom.create("p", { class: "legalNavTitle", text: data.menuTitle }),
      dom.create("ul", { class: "legalNavList" }, links)
    ]);
  },

  buildCards(data) {
    return data.sections.map((section, index) => dom.create("article", { class: "legalCard", id: privacyPage.anchor(section) }, [
      dom.create("span", { class: "legalNum", "aria-hidden": "true", text: String(index + 1) }),
      dom.create("div", {}, [dom.create("h2", { class: "legalTitle", text: section.title }), dom.create("p", { class: "legalText", text: section.text })])
    ]));
  },

  /* Highlight the menu link of the card being read */
  watch(menu) {
    if (!("IntersectionObserver" in window)) return;
    const links = dom.findAll("a", menu);
    const mark = (id) => links.forEach((link) => link.classList.toggle("isActive", link.dataset.target === id));
    let lockedUntil = 0;                               /* after a click, keep the clicked link until the jump has finished */
    mark(links[0].dataset.target);
    links.forEach((link) => link.addEventListener("click", () => { mark(link.dataset.target); lockedUntil = Date.now() + 1200; }));
    const observer = new IntersectionObserver((entries) => {
      if (Date.now() < lockedUntil) return;
      entries.forEach((entry) => { if (entry.isIntersecting) mark(entry.target.id); });
    }, { rootMargin: "-20% 0px -65% 0px" });
    dom.findAll(".legalCard").forEach((card) => observer.observe(card));
  },

  render() {
    const data = privacyPageData;
    router.setTitle(data.pageTitle);
    siteNav.render();
    const banner = Object.assign({}, data.banner, { pillLabel: dom.fill(data.banner.pillLabel, { lastUpdated: data.lastUpdated }) });
    const menu = privacyPage.buildMenu(data);
    dom.mount("pageContent", dom.create("div", { class: "privacyPage" }, [
      pageBanner.build(banner),
      dom.create("section", { class: "section legalSection" }, dom.create("div", { class: "container" }, dom.create("div", { class: "legalRow" }, [
        menu,
        dom.create("div", { class: "legalBody" }, privacyPage.buildCards(data).concat([dom.create("p", { class: "legalNote", text: data.note })]))
      ]))),
      ctaBand.build(data.cta)
    ]));
    privacyPage.watch(menu);
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(privacyPage.render);
