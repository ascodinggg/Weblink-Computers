/* ==========================================================================
   floating-buttons.js  -  Weblink Computers
   Three floating controls, added to every page:
     bottom-left : Scroll-to-top button
     bottom-right: Theme switcher (current theme icon; opens a small menu of the themes) with the
                   WhatsApp button (page-aware message) below it
   Text / numbers come from config.js (whatsapp, scrollTop, themeSwitcher). Each can be switched off there.
   Global: floatingButtons
   ========================================================================== */

const floatingButtons = {

  render() {
    const left = siteConfig.scrollTop.enabled
      ? dom.create("div", { class: "floatGroup floatLeft" }, floatingButtons.buildScrollTop())
      : null;
    const right = dom.create("div", { class: "floatGroup floatRight" }, [
      siteConfig.themeSwitcher.enabled ? floatingButtons.buildThemeSwitcher() : null,
      siteConfig.whatsapp.enabled ? floatingButtons.buildWhatsapp() : null
    ]);
    dom.append(document.body, [left, right]);
  },

  buildWhatsapp() {
    return dom.link(whatsapp.currentLink(), {
      class: "floatBtn floatWhatsapp", target: "_blank", rel: "noopener noreferrer",
      "aria-label": siteConfig.whatsapp.buttonLabel, title: siteConfig.whatsapp.buttonLabel
    }, dom.icon("whatsapp", "floatIcon"));
  },

  /* Hidden until the page is scrolled down siteConfig.scrollTop.showAfterPixels. */
  buildScrollTop() {
    const button = dom.create("button", {
      class: "floatBtn floatScrollTop", type: "button",
      "aria-label": siteConfig.scrollTop.label, title: siteConfig.scrollTop.label,
      on: { click: () => window.scrollTo({ top: 0, behavior: "smooth" }) }
    }, dom.icon("arrowUp", "floatIcon"));

    const toggle = () => button.classList.toggle("isShown", window.scrollY > siteConfig.scrollTop.showAfterPixels);
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    return button;
  },

  buildThemeSwitcher() {
    const config = siteConfig.themeSwitcher;
    const wrap = dom.create("div", { class: "themeSwitcher" });
    const menu = dom.create("div", { class: "themeMenu", role: "menu", hidden: true });
    const toggle = dom.create("button", {
      class: "floatBtn themeToggle", type: "button", "aria-haspopup": "true", "aria-expanded": "false",
      "aria-label": config.label, title: config.label
    });

    const open = (shouldOpen) => {
      menu.hidden = !shouldOpen;
      toggle.setAttribute("aria-expanded", String(shouldOpen));
    };

    /* show the current theme's icon on the toggle and mark it in the menu */
    const refresh = () => {
      const active = theme.current();
      const item = config.themes.find((entry) => entry.value === active) || config.themes[0];
      toggle.textContent = item.icon;
      dom.findAll(".themeOption", menu).forEach((option) => {
        const isActive = option.dataset.theme === active;
        option.classList.toggle("isActive", isActive);
        option.setAttribute("aria-checked", String(isActive));
      });
    };

    dom.append(menu, config.themes.map((item) => dom.create("button", {
      class: "themeOption", type: "button", role: "menuitemradio", dataset: { theme: item.value },
      on: { click: () => { theme.set(item.value, true); refresh(); open(false); } }
    }, [
      dom.create("span", { class: "themeOptionIcon", "aria-hidden": "true", text: item.icon }),
      dom.create("span", { class: "themeOptionLabel", text: item.label })
    ])));

    toggle.addEventListener("click", () => open(menu.hidden));
    document.addEventListener("click", (event) => { if (!wrap.contains(event.target)) open(false); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") open(false); });

    dom.append(wrap, [menu, toggle]);
    refresh();
    return wrap;
  }
};
