/* ==========================================================================
   dom.js  -  Weblink Computers
   Small helpers to create elements and inject them into the page.
   The HTML files are empty shells: every element on screen is built with these.
   Global: dom
   ========================================================================== */

const dom = {

  /* Create an element.
     dom.create("div", { class: "card", href: "x" }, children)
       attrs   : plain attributes. key "class" -> className, "text" -> textContent,
                 "html" -> innerHTML (use only for trusted strings from the data files),
                 "dataset" -> object of data-* values, "on" -> { click: fn }.
                 null / undefined / false values are skipped.
       children: a node, a string, or an array of them (null / false entries are skipped). */
  create(tag, attrs, children) {
    const element = document.createElement(tag);
    const props = attrs || {};
    Object.keys(props).forEach((key) => {
      const value = props[key];
      if (value === null || value === undefined || value === false) return;
      if (key === "class") element.className = value;
      else if (key === "text") element.textContent = value;
      else if (key === "html") element.innerHTML = value;
      else if (key === "dataset") Object.keys(value).forEach((name) => { element.dataset[name] = value[name]; });
      else if (key === "on") Object.keys(value).forEach((name) => element.addEventListener(name, value[name]));
      else element.setAttribute(key, value === true ? "" : value);
    });
    dom.append(element, children);
    return element;
  },

  /* Append a node, a string or an array of them (null / false entries are skipped). */
  append(parent, children) {
    if (children === null || children === undefined || children === false) return parent;
    if (Array.isArray(children)) {
      children.forEach((child) => dom.append(parent, child));
    } else if (children instanceof Node) {
      parent.appendChild(children);
    } else {
      parent.appendChild(document.createTextNode(String(children)));
    }
    return parent;
  },

  /* Find one element / all elements. */
  find(selector, root) {
    return (root || document).querySelector(selector);
  },

  findAll(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  },

  /* Remove everything inside an element. */
  clear(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
    return element;
  },

  /* Replace the content of the element with the given id (or element) and return it. */
  mount(target, children) {
    const element = typeof target === "string" ? document.getElementById(target) : target;
    if (!element) return null;
    dom.clear(element);
    dom.append(element, children);
    return element;
  },

  /* Shorthand for an <a>. */
  link(href, attrs, children) {
    return dom.create("a", Object.assign({ href: href }, attrs), children);
  },

  /* An inline SVG icon from icons.js (iconsData): dom.icon("phone", "navIcon").
     It takes its colour from the text colour (currentColor) and is hidden from screen readers. */
  icon(name, className) {
    const definition = iconsData[name];
    if (!definition) return document.createTextNode("");
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");
    svg.setAttribute("viewBox", definition.viewBox);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (className) svg.setAttribute("class", className);
    path.setAttribute("d", definition.path);
    if (definition.type === "stroke") {
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2.4");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
    } else {
      svg.setAttribute("fill", "currentColor");
    }
    svg.appendChild(path);
    return svg;
  },

  /* Run a function when the HTML is ready. */
  onReady(callback) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", callback);
    else callback();
  },

  /* Look up one item of a data list by its numeric id. Ids always come back from the URL or
     from data as numbers or numeric strings, so both are compared as numbers. */
  byId(list, id) {
    const wanted = Number(id);
    return list.find((item) => Number(item.id) === wanted) || null;
  },

  /* 6000 -> "6,000" (Indian digit grouping). */
  formatAmount(amount) {
    return Number(amount).toLocaleString("en-IN");
  },

  /* Inline SVG icon (24 x 24, filled with currentColor): dom.icon("menu", "navIcon") */
  icon(name, className) {
    const path = dom.iconPaths[name];
    if (!path) return null;
    const span = document.createElement("span");
    span.className = "icon" + (className ? " " + className : "");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="' + path + '"/></svg>';
    return span;
  },

  /* A row of social icon links from a list like siteConfig.social: [{ id, icon, label, href }] */
  socialLinks(list, className) {
    return list.map((item) => dom.create("a", {
      class: className,
      href: item.href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": item.label
    }, dom.icon(item.icon)));
  },

  /* Fill a template string: dom.fill("Hello {name}", { name: "Weblink" }) */
  fill(template, values) {
    return String(template).replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
  },

  /* Icon shapes (24 x 24 paths) */
  iconPaths: {
    facebook: "M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.7H7.7v3.3h2.7V22z",
    instagram: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z",
    youtube: "M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15V9l5.2 3z",
    linkedin: "M4.5 3A2.5 2.5 0 1 1 4.5 8 2.5 2.5 0 0 1 4.5 3zM2.3 9.5h4.4V21H2.3zM9.5 9.5h4.2v1.6h.1c.6-1.1 2-1.9 3.8-1.9 4 0 4.7 2.6 4.7 6V21h-4.4v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21H9.5z",
    phone: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z",
    mail: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z",
    menu: "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z",
    close: "M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z",
    chevronDown: "M7 10l5 5 5-5z",
    chevronLeft: "M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z",
    chevronRight: "M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z",
    arrowUp: "M12 4l8 8-1.4 1.4L13 7.8V20h-2V7.8l-5.6 5.6L4 12z",
    whatsapp: "M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm5.8 14.1c-.25.7-1.4 1.3-1.95 1.35-.5.05-1.1.07-1.8-.12-.4-.13-.95-.3-1.6-.6-2.8-1.2-4.6-4-4.75-4.2-.14-.2-1.15-1.5-1.15-2.9s.72-2.05 1-2.35c.25-.28.55-.35.75-.35h.55c.18 0 .42-.07.65.5.25.6.85 2.1.92 2.25.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.38-.45.52-.15.15-.3.3-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.1 1.32 2.4 1.47.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.7.8 2 .95.3.15.5.22.57.35.07.12.07.72-.18 1.4z"
  }
};
