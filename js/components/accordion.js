/* ==========================================================================
   accordion.js  -  Weblink Computers
   Expandable list (used for the course syllabus). One item open at a time.
   items: [{ id, title, text }]   Styles: css/components/accordion.css
   Global: accordion
   ========================================================================== */

const accordion = {

  build(items, openFirst) {
    const list = dom.create("div", { class: "accordion" });
    const rows = items.map((item, index) => {
      const body = dom.create("div", { class: "accordionBody" }, dom.create("p", { text: item.text }));
      const head = dom.create("button", { class: "accordionHead", type: "button", "aria-expanded": "false" }, [
        dom.create("span", { text: (index + 1) + ". " + item.title }),
        dom.create("span", { class: "accordionSign", "aria-hidden": "true" })
      ]);
      const row = dom.create("div", { class: "accordionItem" }, [head, body]);
      head.addEventListener("click", () => accordion.toggle(list, row));
      return row;
    });
    dom.append(list, rows);
    if (openFirst && rows.length) accordion.open(rows[0], true);
    return list;
  },

  toggle(list, row) {
    const wasOpen = row.classList.contains("isOpen");
    dom.findAll(".accordionItem.isOpen", list).forEach((other) => accordion.close(other));
    if (!wasOpen) accordion.open(row);
  },

  open(row, instant) {
    const body = dom.find(".accordionBody", row);
    row.classList.add("isOpen");
    dom.find(".accordionHead", row).setAttribute("aria-expanded", "true");
    body.style.maxHeight = body.scrollHeight + "px";
    if (instant) body.style.transition = "none";
  },

  close(row) {
    const body = dom.find(".accordionBody", row);
    row.classList.remove("isOpen");
    dom.find(".accordionHead", row).setAttribute("aria-expanded", "false");
    body.style.transition = "";
    body.style.maxHeight = "0px";
  }
};
