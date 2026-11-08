/* ==========================================================================
   counter.js  -  Weblink Computers
   Count-up animation for numbers (Home stats strip, About banner tiles + number cards).
     - an element with data-target="5000" shows 0 first and counts up to 5,000
     - the count starts when the watched block is (almost) fully on screen, so the visitor sees it run
     - visitors who prefer reduced motion simply see the final number
   Settings: siteConfig.animation (enabled). Global: counter
   ========================================================================== */

const counter = {

  durationMs: 1400,

  /* A number element that counts up (shows 0 until it starts). */
  /* options.plain: show 5000 instead of 5,000 */
  build(className, target, options) {
    const plain = Boolean(options && options.plain);
    return dom.create("span", { class: className, dataset: plain ? { target: target, plain: "yes" } : { target: target }, text: counter.format(0, plain) });
  },

  format(number, plain) {
    return plain ? String(number) : dom.formatAmount(number);
  },

  /* Start every [data-target] element inside `block` when the block scrolls into view. */
  watch(block, selector, threshold) {
    const counters = dom.findAll(selector || "[data-target]", block);
    if (!counters.length) return;
    const showFinal = () => counters.forEach((element) => { element.textContent = counter.format(element.dataset.target, element.dataset.plain); });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !siteConfig.animation.enabled || !("IntersectionObserver" in window)) { showFinal(); return; }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      counters.forEach((element) => counter.countUp(element, Number(element.dataset.target)));
    }, { threshold: threshold || 0.9, rootMargin: "0px 0px -10% 0px" });
    observer.observe(block);
  },

  countUp(element, target) {
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / counter.durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = counter.format(Math.round(target * eased), element.dataset.plain);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
};
