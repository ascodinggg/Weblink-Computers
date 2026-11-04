/* ==========================================================================
   theme.js  -  Weblink Computers
   Applies the colour theme to <html data-theme="hybrid | dark | light">.
   Order: the visitor's saved choice (localStorage) -> siteConfig.defaultTheme.
   Loaded in <head> right after config.js, so the right theme is on screen from the first paint.
   Global: theme
   ========================================================================== */

const theme = {

  /* the theme values allowed by config.js */
  values() {
    return siteConfig.themeSwitcher.themes.map((item) => item.value);
  },

  saved() {
    try {
      const value = window.localStorage.getItem(siteConfig.themeSwitcher.storageKey);
      return theme.values().includes(value) ? value : null;
    } catch (error) {
      return null;                         /* storage blocked (private window etc.): just use the default */
    }
  },

  current() {
    return document.documentElement.getAttribute("data-theme") || siteConfig.defaultTheme;
  },

  /* Apply a theme; remember it when the visitor picked it. */
  set(value, remember) {
    document.documentElement.setAttribute("data-theme", value);
    if (!remember) return;
    try { window.localStorage.setItem(siteConfig.themeSwitcher.storageKey, value); } catch (error) { /* ignore */ }
  },

  init() {
    const useSaved = siteConfig.themeSwitcher.enabled ? theme.saved() : null;
    theme.set(useSaved || siteConfig.defaultTheme, false);
  }
};

theme.init();
