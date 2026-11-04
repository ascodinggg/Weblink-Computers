/* ==========================================================================
   favicon.js  -  Weblink Computers
   Adds the browser-tab icon (and the phone home-screen icon) to <head> from siteConfig.favicon,
   so the icon is set in ONE place (config.js) for every page. Loaded in <head> after theme.js.
   Global: favicon
   ========================================================================== */

const favicon = {

  add(rel) {
    const link = document.createElement("link");
    link.rel = rel;
    link.type = "image/png";
    link.href = siteConfig.favicon;
    document.head.appendChild(link);
  },

  apply() {
    if (!siteConfig.favicon) return;
    favicon.add("icon");
    favicon.add("apple-touch-icon");
  }
};

favicon.apply();
