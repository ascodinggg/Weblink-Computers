/* ==========================================================================
   stats.js  -  Weblink Computers
   Helpers to read the shared figures of the Home stats (homeData.stats in home.js: faculty, years,
   students, lifetime practice), so About and Certifications show the same numbers.
   Global: siteStats
   ========================================================================== */

const siteStats = {

  /* The Home stat with this label, or null. */
  homeStat(label) {
    return homeData.stats.find((stat) => stat.label === label) || null;
  },

  /* "25" for a number stat, "Lifetime" for a text stat. */
  value(stat) {
    return stat ? (stat.countUp === false || stat.value === undefined ? stat.text : String(stat.value)) : "";
  },

  /* true for a numeric stat that can count up (not a text one like "Lifetime"). */
  isNumber(stat) {
    return Boolean(stat) && typeof stat.value === "number" && stat.countUp !== false;
  }
};
