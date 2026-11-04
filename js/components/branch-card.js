/* ==========================================================================
   branch-card.js  -  Weblink Computers
   One branch card (name, address, tap-to-call phone numbers, directions link) and the Google Maps
   addresses made from a branch's address (no coordinates needed).
   Data: branchesData (branches.js). Used on the Contact page (cards) and the Branches page (blocks).
   Global: branchCard
   ========================================================================== */

const branchCard = {

  /* Search text for Google Maps: the short mapQuery (falls back to the full address). */
  query(branch) {
    return branch.mapQuery || branch.address;
  },

  /* Opens Google Maps with directions to the branch. */
  directionsHref(branch) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(branchCard.query(branch));
  },

  /* Address of the embeddable map of one branch. */
  embedHref(branch) {
    return "https://www.google.com/maps?q=" + encodeURIComponent(branchCard.query(branch)) + "&output=embed";
  },

  /* The embedded map (an iframe). */
  buildMap(branch, title) {
    return dom.create("iframe", {
      class: "mapFrame", src: branchCard.embedHref(branch), title: title, loading: "lazy",
      referrerpolicy: "no-referrer-when-downgrade", allowfullscreen: true
    });
  },

  /* The first phone number, as a tel: link. */
  callHref(branch) {
    return "tel:" + branch.phones[0].replace(/[^\d+]/g, "");
  },

  /* Full-width block of the Branches page: details on one side, the branch's own map on the other. */
  buildBlock(branch, data, index, isMain) {
    const info = (label, content) => dom.create("div", { class: "infoRow" }, [dom.create("b", { class: "infoLabel", text: label }), content]);
    return dom.create("article", { class: "branchBlock", id: "branch" + branch.id }, [
      dom.create("div", { class: "branchInfo" }, [
        dom.create("div", { class: "branchNo" }, [
          dom.create("span", { class: "branchNum", text: String(index + 1) }),
          isMain ? dom.create("span", { class: "badge badgeGovt", text: data.mainBadge }) : null
        ]),
        dom.create("h2", { class: "branchTitle", text: branch.shortName }),
        info(data.addressLabel, dom.create("span", { text: branch.address })),
        info(data.phoneLabel, dom.create("span", { class: "branchPhones" }, branch.phones.map((phone) =>
          dom.link("tel:" + phone.replace(/[^\d+]/g, ""), { class: "branchPhone", text: phone })))),
        info(data.timingsLabel, dom.create("span", { text: siteConfig.contact.workingHours })),
        dom.create("div", { class: "infoActions" }, [
          dom.link(branchCard.directionsHref(branch), { class: "btn btnAmber", target: "_blank", rel: "noopener noreferrer", text: data.directionsLabel }),
          dom.link(branchCard.callHref(branch), { class: "btn btnPrimary", text: data.callLabel }),
          dom.link(whatsapp.branchLink(branch), { class: "btn btnWhatsapp", target: "_blank", rel: "noopener noreferrer", text: data.whatsappLabel })
        ])
      ]),
      dom.create("div", { class: "branchMapSide" }, branchCard.buildMap(branch, dom.fill(data.mapTitle, { branchName: branch.shortName })))
    ]);
  },

  build(branch, data, isMain) {
    return dom.create("article", { class: "branchCard" }, [
      isMain ? dom.create("span", { class: "badge badgeGovt branchMainBadge", text: data.mainBadge }) : null,
      dom.create("h3", { class: "branchName", text: branch.shortName }),
      dom.create("p", { class: "branchAddress", text: branch.address }),
      dom.create("div", { class: "branchPhones" }, branch.phones.map((phone) =>
        dom.link("tel:" + phone.replace(/[^\d+]/g, ""), { class: "branchPhone", text: phone }))),
      dom.link(branchCard.directionsHref(branch), { class: "branchDirections", target: "_blank", rel: "noopener noreferrer", text: data.directionsLabel })
    ]);
  }
};
