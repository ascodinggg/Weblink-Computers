/* ==========================================================================
   contact.js (page)  -  Weblink Computers  (contact.html)
   Banner, quick contact cards, enquiry form + main-branch map, all branch cards.
   Data: contactPageData (data/contact.js), siteConfig.contact (config.js), branchesData (branches.js).
   Global: contactPage
   ========================================================================== */

const contactPage = {

  /* One quick card: phone / whatsapp / email are links, text is plain. */
  buildQuickCard(card) {
    const contact = siteConfig.contact;
    let label = card.label;
    let value = card.value;
    let href = "";
    if (card.type === "phone") { value = contact.phoneDisplay; href = "tel:" + contact.phoneLink; }
    if (card.type === "whatsapp") { href = whatsapp.link(whatsapp.generalMessage()); }
    if (card.type === "email") { value = contact.email; href = "mailto:" + contact.email; }
    if (card.type === "text") { label = contact.workingHoursLabel; value = contact.workingHours; }

    const inner = [
      dom.create("span", { class: "quickIcon", "aria-hidden": "true", text: card.icon }),
      dom.create("span", { class: "quickText" }, [
        dom.create("span", { class: "quickLabel", text: label }),
        dom.create("span", { class: "quickValue", text: value })
      ])
    ];
    const className = "quickCard" + (card.type === "email" ? " quickWide" : "");
    return href
      ? dom.link(href, Object.assign({ class: className }, card.type === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {}), inner)
      : dom.create("div", { class: className }, inner);
  },

  buildForm() {
    const form = contactPageData.form;
    return dom.create("div", { class: "panel formPanel" }, [
      dom.create("h2", { class: "panelTitle", text: form.title }),
      dom.create("p", { class: "panelText", text: form.text }),
      contactForm.build(form)
    ]);
  },

  buildVisit() {
    const visit = contactPageData.visit;
    const branch = dom.byId(branchesData, visit.mainBranchId) || branchesData[0];
    return dom.create("div", { class: "panel visitPanel" }, [
      dom.create("h2", { class: "panelTitle", text: visit.title }),
      dom.create("div", { class: "mapBox" }, branchCard.buildMap(branch, visit.mapTitle)),
      dom.create("p", { class: "visitName", text: branch.shortName }),
      dom.create("p", { class: "visitText", text: branch.address }),
      dom.create("div", { class: "visitLinks" }, [
        dom.link(branchCard.directionsHref(branch), { class: "btn btnAmber", target: "_blank", rel: "noopener noreferrer", text: visit.directionsLabel }),
        dom.link(visit.allBranchesHref, { class: "btn btnOutline", text: visit.allBranchesLabel })
      ])
    ]);
  },

  buildBranches() {
    const data = contactPageData.branches;
    return [
      dom.create("div", { class: "sectionHeader branchHead" }, [
        dom.create("p", { class: "eyebrow", text: data.eyebrow }),
        dom.create("h2", { class: "sectionTitle", text: data.title })
      ]),
      dom.create("div", { class: "branchRow" }, branchesData.map((branch) =>
        branchCard.build(branch, data, branch.id === contactPageData.visit.mainBranchId)))
    ];
  },

  render() {
    const banner = Object.assign({}, contactPageData.banner, { text: dom.fill(contactPageData.banner.text, pageBanner.counts()) });
    router.setTitle(contactPageData.pageTitle);
    siteNav.render();
    dom.mount("pageContent", dom.create("div", { class: "contactPage" }, [
      pageBanner.build(banner),
      dom.create("section", { class: "section contactBody" }, dom.create("div", { class: "container" }, [
        dom.create("div", { class: "quickRow" }, contactPageData.quickCards.map((card) => contactPage.buildQuickCard(card))),
        dom.create("div", { class: "twoCol" }, [contactPage.buildForm(), contactPage.buildVisit()]),
        contactPage.buildBranches()
      ]))
    ]));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(contactPage.render);
