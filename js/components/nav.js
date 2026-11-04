/* ==========================================================================
   nav.js  -  Weblink Computers
   Top bar (offer + social icons) and the sticky main navigation bar with the
   Courses dropdown (desktop) and the slide-in drawer with accordion (mobile/tablet).
   All text, links and items come from config.js (siteConfig) and courses-data.js.
   Mounts into: #topBar and #siteHeader.   Global: siteNav
   ========================================================================== */

const siteNav = {

  desktopQuery: window.matchMedia("(min-width: 1024px)"),

  render() {
    dom.mount("topBar", siteNav.buildTopBar());
    /* the drawer is a sibling of the bar (not inside it): the bar's backdrop blur would
       otherwise become the containing block of the drawer's fixed positioning */
    dom.mount("siteHeader", [siteNav.buildNav(), siteNav.buildDrawer()]);
    siteNav.bindEvents();
  },

  /* ---- Top bar ---- */
  buildTopBar() {
    const bar = siteConfig.topBar;
    if (!bar.enabled) {
      document.getElementById("topBar").hidden = true;
      return null;
    }
    const message = () => dom.create("span", { class: "topBarItem" }, [
      bar.icon ? dom.create("span", { class: "topBarEmoji", "aria-hidden": "true", text: bar.icon }) : null,
      dom.create("strong", { class: "topBarHighlight", text: bar.highlight }),
      " " + bar.text
    ]);
    let text;
    if (bar.marquee) {
      /* two identical groups; the track slides left by one group, then starts again (seamless loop) */
      const group = (hidden) => dom.create("span", { class: "topBarGroup", "aria-hidden": hidden ? "true" : null },
        Array.from({ length: bar.repeat }, message));
      text = dom.create("div", { class: "topBarMarquee" },
        dom.create("p", { class: "topBarTrack", style: "animation-duration:" + bar.speedSeconds + "s", "aria-label": bar.highlight + " " + bar.text }, [group(false), group(true)]));
    } else {
      text = dom.create("p", { class: "topBarText" }, message());
    }
    return dom.create("div", { class: "topBarInner" + (bar.marquee ? "" : " container") }, [
      text,
      bar.showSocial ? dom.create("div", { class: "topBarSocial container" }, dom.socialLinks(siteConfig.social, "socialIcon")) : null
    ]);
  },

  /* ---- Main bar ---- */
  buildNav() {
    return dom.create("nav", { class: "mainNav", "aria-label": siteConfig.siteName }, [
      dom.create("div", { class: "mainNavInner container" }, [
        siteNav.buildBrand("brand"),
        dom.create("ul", { class: "navList" }, siteConfig.nav.items.map((item) => siteNav.buildItem(item))),
        dom.create("button", {
          class: "navToggle",
          type: "button",
          id: "navToggle",
          "aria-label": siteConfig.nav.menuLabel,
          "aria-expanded": "false",
          "aria-controls": "navDrawer"
        }, dom.icon("menu"))
      ])
    ]);
  },

  buildBrand(className) {
    return dom.link(siteConfig.nav.items[0].href, { class: className, "aria-label": siteConfig.siteName }, [
      dom.create("span", { class: "logoBadge" }, dom.create("img", {
        src: siteConfig.logo.src, alt: siteConfig.logo.alt, width: "52", height: "52"
      })),
      dom.create("span", { class: "brandName", text: siteConfig.siteName })
    ]);
  },

  /* Items for the Courses dropdown / drawer accordion: one per category + "View All Courses". */
  courseMenuLinks() {
    const links = coursesData.categories.map((category) => ({
      label: category.label,
      href: router.categoryHref(category)
    }));
    links.push({ label: siteConfig.nav.viewAllCoursesLabel, href: siteConfig.nav.viewAllCoursesHref, isAll: true });
    return links;
  },

  buildItem(item) {
    const current = router.isCurrent(item.href);
    const hasMenu = item.dropdown === "courseCategories";
    const link = dom.link(item.href, {
      class: "navLink" + (current ? " isCurrent" : ""),
      "aria-current": current ? "page" : null
    }, item.label);

    if (!hasMenu) return dom.create("li", { class: "navItem" }, link);

    return dom.create("li", { class: "navItem hasMenu", dataset: { menu: "desktop" } }, [
      dom.create("div", { class: "navLinkWrap" }, [
        link,
        dom.create("button", {
          class: "menuToggle",
          type: "button",
          "aria-label": siteConfig.nav.submenuLabel,
          "aria-expanded": "false"
        }, dom.icon("chevronDown"))
      ]),
      dom.create("ul", { class: "dropdownMenu", hidden: true }, siteNav.courseMenuLinks().map((l) =>
        dom.create("li", {}, dom.link(l.href, { class: "dropdownLink" + (l.isAll ? " isAll" : "") }, l.label))
      ))
    ]);
  },

  /* ---- Drawer (mobile / tablet) ---- */
  buildDrawer() {
    const items = siteConfig.nav.items.map((item) => {
      const current = router.isCurrent(item.href);
      const link = dom.link(item.href, {
        class: "drawerLink" + (current ? " isCurrent" : ""),
        "aria-current": current ? "page" : null
      }, item.label);
      if (item.dropdown !== "courseCategories") return dom.create("li", { class: "drawerItem" }, link);
      return dom.create("li", { class: "drawerItem hasMenu" }, [
        dom.create("div", { class: "drawerLinkWrap" }, [
          link,
          dom.create("button", {
            class: "menuToggle", type: "button", "aria-label": siteConfig.nav.submenuLabel, "aria-expanded": "false"
          }, dom.icon("chevronDown"))
        ]),
        dom.create("ul", { class: "drawerSub", hidden: true }, siteNav.courseMenuLinks().map((l) =>
          dom.create("li", {}, dom.link(l.href, { class: "drawerSubLink" + (l.isAll ? " isAll" : "") }, l.label))
        ))
      ]);
    });

    return dom.create("div", { class: "drawerWrap" }, [
      dom.create("div", { class: "drawerOverlay", id: "drawerOverlay", hidden: true }),
      dom.create("aside", { class: "drawer", id: "navDrawer", "aria-hidden": "true", tabindex: "-1" }, [
        dom.create("div", { class: "drawerHead" }, [
          siteNav.buildBrand("brand"),
          dom.create("button", { class: "drawerClose", type: "button", id: "drawerClose", "aria-label": siteConfig.nav.closeLabel }, dom.icon("close"))
        ]),
        dom.create("ul", { class: "drawerList" }, items),
        dom.create("div", { class: "drawerFoot" }, dom.socialLinks(siteConfig.social, "socialIcon"))
      ])
    ]);
  },

  /* ---- Behaviour ---- */
  setMenu(item, open) {
    const toggle = dom.find(".menuToggle", item);
    const menu = dom.find(".dropdownMenu, .drawerSub", item);
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    item.classList.toggle("isOpen", open);
    if (!open) item.classList.remove("isPinned");
  },

  closeMenus(except) {
    dom.findAll(".navItem.hasMenu").forEach((item) => { if (item !== except) siteNav.setMenu(item, false); });
  },

  openDrawer(open) {
    const drawer = document.getElementById("navDrawer");
    const overlay = document.getElementById("drawerOverlay");
    const toggle = document.getElementById("navToggle");
    drawer.classList.toggle("isOpen", open);
    drawer.setAttribute("aria-hidden", String(!open));
    overlay.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("noScroll", open);
    if (open) drawer.focus(); else toggle.focus();
  },

  bindEvents() {
    /* desktop dropdown: hover opens, click on the arrow toggles, Escape / outside click closes */
    /* hovering opens the menu and leaving closes it; clicking the arrow "pins" it open
       (it then stays until the arrow is clicked again, Escape, or a click elsewhere) */
    dom.findAll(".navItem.hasMenu").forEach((item) => {
      item.addEventListener("mouseenter", () => { if (siteNav.desktopQuery.matches) siteNav.setMenu(item, true); });
      item.addEventListener("mouseleave", () => {
        if (siteNav.desktopQuery.matches && !item.classList.contains("isPinned")) siteNav.setMenu(item, false);
      });
      dom.find(".menuToggle", item).addEventListener("click", () => {
        const pinned = item.classList.contains("isPinned");
        siteNav.closeMenus(item);
        item.classList.toggle("isPinned", !pinned);
        siteNav.setMenu(item, !pinned);
      });
    });

    /* drawer accordion */
    dom.findAll(".drawerItem.hasMenu").forEach((item) => {
      dom.find(".menuToggle", item).addEventListener("click", () => siteNav.setMenu(item, !item.classList.contains("isOpen")));
    });

    document.getElementById("navToggle").addEventListener("click", () => siteNav.openDrawer(true));
    document.getElementById("drawerClose").addEventListener("click", () => siteNav.openDrawer(false));
    document.getElementById("drawerOverlay").addEventListener("click", () => siteNav.openDrawer(false));
    dom.findAll(".drawerLink, .drawerSubLink", document.getElementById("navDrawer")).forEach((link) => {
      link.addEventListener("click", () => siteNav.openDrawer(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      siteNav.closeMenus(null);
      if (document.getElementById("navDrawer").classList.contains("isOpen")) siteNav.openDrawer(false);
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".navItem.hasMenu")) siteNav.closeMenus(null);
    });

    /* going from mobile to desktop width closes the drawer */
    siteNav.desktopQuery.addEventListener("change", () => {
      if (siteNav.desktopQuery.matches && document.getElementById("navDrawer").classList.contains("isOpen")) siteNav.openDrawer(false);
    });
  }
};
