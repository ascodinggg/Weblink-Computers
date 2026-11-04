/* ==========================================================================
   career-banner.js  -  Weblink Computers
   Home "Career Support" banner: blue gradient banner with the Job Guarantee message,
   a button, and 3 frosted info tiles (the first one can be wide).
   Data: homeData.careerBanner (home.js).   Global: careerBanner
   ========================================================================== */

const careerBanner = {

  build(data) {
    return dom.create("section", { class: "section careerSection", id: "career" },
      dom.create("div", { class: "container" },
        dom.create("div", { class: "careerBanner" }, [
          dom.create("div", { class: "careerContent" }, [
            dom.create("span", { class: "careerChip", text: data.chip }),
            dom.create("h2", { class: "careerTitle" }, [
              data.titleBefore,
              dom.create("em", { class: "careerAccent", text: data.titleAccent })
            ]),
            dom.create("p", { class: "careerText", text: data.text }),
            dom.link(data.button.href, { class: "btn btnAmber btnFull", text: data.button.label })
          ]),
          dom.create("div", { class: "careerTiles" }, data.tiles.map((tile) => careerBanner.buildTile(tile)))
        ])));
  },

  buildTile(tile) {
    return dom.create("div", { class: "careerTile" + (tile.wide ? " careerTileWide" : "") }, [
      dom.create("span", { class: "careerTileIcon", "aria-hidden": "true", text: tile.icon }),
      dom.create("div", { class: "careerTileValue", text: tile.value }),
      dom.create("div", { class: "careerTileLabel", text: tile.label })
    ]);
  }
};
