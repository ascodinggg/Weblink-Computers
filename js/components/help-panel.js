/* ==========================================================================
   help-panel.js  -  Weblink Computers
   The "Can't find your course?" panel (Courses page + course detail page).
   Data: coursesPageData.helpPanel (data/courses.js). Styles: css/components/more-panel.css
   Global: helpPanel
   ========================================================================== */

const helpPanel = {

  build() {
    const panel = coursesPageData.helpPanel;
    return dom.create("div", { class: "morePanel" }, [
      dom.create("div", { class: "morePanelHead" }, [
        dom.create("span", { class: "morePanelLabel", text: panel.label }),
        dom.create("h3", { class: "morePanelTitle", text: panel.title })
      ]),
      dom.create("p", { class: "morePanelText", text: dom.fill(panel.text, pageBanner.counts()) }),
      dom.create("div", { class: "centerContent" }, dom.link(panel.button.href, { class: "btn btnPrimary", text: panel.button.label }))
    ]);
  }
};
