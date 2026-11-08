/* ==========================================================================
   gallery-section.js  -  Weblink Computers
   Home "Life at Weblink" gallery: one big tile + four small tiles (flex mosaic).
   The last tile (showMore: true) carries a "+ More Photos" overlay and links to the gallery page,
   so there is no separate button. The tiles come from the Gallery page data: homeData.gallery.itemIds
   lists the gallery item ids (1st = big tile, last = "+ More Photos"). A tile shows its photo when the
   item has one, otherwise a coloured tile with its emoji.
   Data: homeData.gallery (home.js) + galleryPageData (data/gallery.js).   Global: gallerySection
   ========================================================================== */

const gallerySection = {

  /* The tiles for the Home mosaic, in the order of homeData.gallery.itemIds */
  tiles(data) {
    const last = data.itemIds.length - 1;
    return data.itemIds.map((id, index) => {
      const item = dom.byId(galleryPageData.items, id);
      if (!item) return null;
      return {
        icon: item.icon, tone: item.tone, caption: item.caption,
        image: item.type === "image" ? item.image : (item.poster || ""),
        big: index === 0, showMore: index === last
      };
    }).filter(Boolean);
  },

  build(data) {
    const tiles = gallerySection.tiles(data);
    const bigTiles = tiles.filter((tile) => tile.big);
    const smallTiles = tiles.filter((tile) => !tile.big);

    return dom.create("section", { class: "section gallerySection", id: "gallery" },
      dom.create("div", { class: "container" }, [
        dom.create("div", { class: "sectionHeader" }, [
          dom.create("p", { class: "eyebrow", text: data.eyebrow }),
          dom.create("h2", { class: "sectionTitle", text: data.title }),
          dom.create("p", { class: "sectionSubtitle", text: data.subtitle })
        ]),
        dom.create("div", { class: "galleryMosaic" }, [
          dom.create("div", { class: "galleryBig" }, bigTiles.map((tile) => gallerySection.buildTile(tile, data))),
          dom.create("div", { class: "gallerySmall" }, smallTiles.map((tile) => gallerySection.buildTile(tile, data)))
        ])
      ]));
  },

  buildTile(tile, data) {
    const picture = tile.image
      ? dom.create("img", { class: "galleryImage", src: tile.image, alt: tile.caption, loading: "lazy" })
      : dom.create("span", { class: "galleryPlaceholder", "aria-hidden": "true", text: tile.icon });
    const parts = [
      picture,
      dom.create("span", { class: "galleryCaption", text: tile.caption }),
      tile.showMore
        ? dom.create("span", { class: "galleryMore" }, dom.create("span", {}, [
            data.moreLabel,
            dom.create("small", { class: "galleryMoreSub", text: data.moreSubLabel })
          ]))
        : null
    ];
    const className = "galleryTile tone" + featureCard.cap(tile.tone) + (tile.big ? " isBig" : "");
    return tile.showMore
      ? dom.link(data.href, { class: className, "aria-label": data.moreLabel + " " + data.moreSubLabel }, parts)
      : dom.create("figure", { class: className }, parts);
  }
};
