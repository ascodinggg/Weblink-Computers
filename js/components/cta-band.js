/* ==========================================================================
   cta-band.js  -  Weblink Computers
   Closing call-to-action section: title, text and two buttons (primary amber, secondary outlined).
   Data: { title, text, primary: { label, href }, secondary: { label, href } }
   Used on About and Certifications. Styles: css/components/cta-band.css.   Global: ctaBand
   ========================================================================== */

const ctaBand = {

  build(data) {
    return dom.create("section", { class: "section ctaSection" }, dom.create("div", { class: "container" },
      dom.create("div", { class: "ctaBand" }, [
        dom.create("h2", { class: "ctaTitle", text: data.title }),
        dom.create("p", { class: "ctaText", text: data.text }),
        dom.create("div", { class: "ctaButtons" }, [
          dom.link(data.primary.href, { class: "btn btnAmber", text: data.primary.label }),
          dom.link(data.secondary.href, { class: "btn btnGhost ctaGhost", text: data.secondary.label })
        ])
      ])));
  }
};
