/* ==========================================================================
   reveal.js  -  Weblink Computers
   Scroll animations. Elements listed in `reveal.rules` fade + slide in when they scroll into view:
     up    : rises from below          left / right : slides in from that side of the screen
     zoom  : grows from slightly smaller
   Cards in a row get a small stagger. Visitors who prefer reduced motion see no animation.
   The animation itself lives in css/animations.css. The page-load animation (navbar + top bar drop in
   together, hero content slides in from both sides) starts when `reveal.start()` adds html.isLoaded.
   To animate a new section: add one rule below. Settings (on/off, stagger) are in config.js (animation).
   Global: reveal
   ========================================================================== */

const reveal = {

  observer: null,

  /* selector -> animation. `type` can be a text or a function (element, indexInList, columnsPerRow) -> text. */
  rules: [
    { selector: ".sectionHeader", type: "up" },
    { selector: ".statItem", type: "up", stagger: true },
    { selector: ".chipRow", type: "up" },
    { selector: ".courseGrid > *", type: "up", stagger: true },
    { selector: ".showMoreWrap", type: "up" },
    { selector: ".morePanel", type: "zoom" },
    { selector: ".courseViewAll", type: "up" },
    { selector: ".bannerInner > *", type: "up", stagger: true },
    { selector: ".bannerStat", type: "up", stagger: true },
    { selector: ".searchBox", type: "up" },
    { selector: ".resultLine", type: "up" },
    { selector: ".detailMain > *", type: "up" },
    { selector: ".detailSide", type: "right" },
    { selector: ".relatedHead", type: "up" },
    { selector: ".quickCard", type: "up", stagger: true },
    { selector: ".formPanel", type: "left" },
    { selector: ".visitPanel", type: "right" },
    { selector: ".branchHead", type: "up" },
    { selector: ".branchRow > *", type: "up", stagger: true },
    { selector: ".jumpBar", type: "up" },
    { selector: ".storyText", type: "left" },
    { selector: ".storyPhoto", type: "right" },
    { selector: ".numberCard", type: "up", stagger: true },
    { selector: ".valueCard", type: "up", stagger: true },
    { selector: ".partnerCard", type: "up", stagger: true },
    { selector: ".teamCard", type: "up", stagger: true },
    { selector: ".photoTile", type: "up", stagger: true },
    { selector: ".legalCard", type: "up" },
    { selector: ".certBlock", type: "up" },
    { selector: ".stepCard", type: "up", stagger: true },
    { selector: ".sampleCard", type: "up", stagger: true },
    { selector: ".faqBox", type: "up" },
    { selector: ".ctaBand", type: "zoom" },
    { selector: ".branchBlock", type: "up" },
    { selector: ".featureSection .grid > *", type: "sides", stagger: true },
    { selector: ".careerContent", type: "left" },
    { selector: ".careerTiles", type: "right" },
    { selector: ".certSection .grid > *", type: "sides", stagger: true },
    { selector: ".certButton", type: "up" },
    { selector: ".testimonialSlider", type: "up" },
    { selector: ".galleryBig", type: "left" },
    { selector: ".gallerySmall > *", type: "zoom", stagger: true },
    { selector: ".footerColumn", type: "up", stagger: true },
    { selector: ".footerStrip", type: "up" }       /* the copyright line is NOT animated: it is always visible */
  ],

  allowed() {
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return siteConfig.animation.enabled && !motionOff && "IntersectionObserver" in window;
  },

  /* How many cards sit in one row of a ".grid" at the current screen width. */
  columns(element) {
    const grid = element.parentElement;
    if (!grid || !grid.classList.contains("grid")) return 4;
    const width = window.innerWidth;
    if (grid.classList.contains("colsDesktop4") && width >= 1024) return 4;
    if (grid.classList.contains("colsDesktop3") && width >= 1024) return 3;
    if (grid.classList.contains("colsDesktop2") && width >= 1024) return 2;
    if (grid.classList.contains("colsTablet3") && width >= 768) return 3;
    if (grid.classList.contains("colsTablet2") && width >= 768) return 2;
    return 1;
  },

  /* "sides": first card of a row from the left, last from the right, the ones between rise up.
     In a single column the cards alternate left / right. */
  sideFor(index, columns) {
    if (columns === 1) return index % 2 === 0 ? "left" : "right";
    const column = index % columns;
    if (column === 0) return "left";
    if (column === columns - 1) return "right";
    return "up";
  },

  /* Mark the elements found by the rules (inside `root`) so they animate when scrolled to. */
  apply(root) {
    if (!reveal.allowed()) return;
    const scope = root || document;
    if (!reveal.observer) reveal.setup();

    reveal.rules.forEach((rule) => {
      dom.findAll(rule.selector, scope).forEach((element, index) => {
        if (element.dataset.reveal) return;
        const columns = reveal.columns(element);
        const position = rule.selector.includes(">") || rule.stagger ? Array.prototype.indexOf.call(element.parentElement.children, element) : index;
        const type = rule.type === "sides" ? reveal.sideFor(position, columns) : rule.type;
        const delay = rule.stagger ? (position % columns) * siteConfig.animation.staggerMs : 0;
        element.dataset.reveal = type;
        element.style.setProperty("--revealDelay", delay + "ms");
        reveal.observer.observe(element);
      });
    });
  },

  setup() {
    document.documentElement.classList.add("revealReady");
    reveal.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal.observer.unobserve(entry.target);
        reveal.show(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    window.addEventListener("scroll", reveal.showAllAtBottom, { passive: true });
  },

  /* Safety net: at the very bottom of the page, show anything still waiting (so no content can stay hidden). */
  showAllAtBottom() {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (!atBottom) return;
    dom.findAll("[data-reveal]:not(.isRevealed)").forEach((element) => {
      if (element.offsetParent === null) return;        /* skip hidden ones (e.g. courses not yet shown on phones) */
      reveal.observer.unobserve(element);
      reveal.show(element);
    });
  },

  /* Play the animation, then remove the marks so hover effects on the element work normally again. */
  show(element) {
    element.classList.add("isRevealed");
    const delay = parseFloat(element.style.getPropertyValue("--revealDelay")) || 0;
    window.setTimeout(() => {
      delete element.dataset.reveal;
      element.classList.remove("isRevealed");
      element.style.removeProperty("--revealDelay");
    }, siteConfig.animation.durationMs + delay + 100);
  },

  /* Start the page-load animation (navbar + top bar, hero content). Call once, after the page is built. */
  start() {
    if (reveal.allowed()) document.documentElement.classList.add("isLoaded");
  }
};
