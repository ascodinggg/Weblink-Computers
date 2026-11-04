/* ==========================================================================
   gallery.js (page)  -  Weblink Computers  (gallery.html)
   Banner + category chips + photo / video cards (first pageSize, then "Load more") + closing band.
   Clicking a card opens components/lightbox.js with the SAME filtered list, so the arrows move through
   photos and videos together.  Address: gallery.html?category=<slug>
   Data: galleryPageData (data/gallery.js).   Global: galleryPage
   ========================================================================== */

const galleryPage = {

  builders: {
    photos: () => galleryPage.buildPhotos(),
    cta: () => ctaBand.build(galleryPageData.cta)
  },

  photoCount() { return galleryPageData.items.filter((item) => item.type === "image").length; },
  videoCount() { return galleryPageData.items.filter((item) => item.type === "video").length; },

  category(item) { return dom.byId(galleryPageData.categories, item.categoryId); },

  /* ---------- banner ---------- */
  bannerData() {
    const data = galleryPageData.banner;
    const values = { photoCount: galleryPage.photoCount(), videoCount: galleryPage.videoCount(), categoryCount: galleryPageData.categories.length, branchCount: branchesData.length };
    return Object.assign({}, data, {
      pillLabel: dom.fill(data.pillLabel, values),
      stats: data.stats.map((item) => ({ id: item.id, value: String(values[item.type]), suffix: "", label: item.display, countUp: true }))
    });
  },

  /* ---------- YouTube / file handling ---------- */
  youtubeId(url) {
    const match = String(url).match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return match ? match[1] : "";
  },

  /* Thumbnail for a card (video poster, or the YouTube thumbnail) */
  thumb(item) {
    if (item.type === "image") return item.image;
    if (item.poster) return item.poster;
    const id = galleryPage.youtubeId(item.video);
    return id ? "https://img.youtube.com/vi/" + id + "/hqdefault.jpg" : "";
  },

  /* The item shaped for the viewer */
  viewerItem(item) {
    const category = galleryPage.category(item);
    const youtube = item.type === "video" ? galleryPage.youtubeId(item.video) : "";
    return {
      type: item.type, caption: item.caption, sub: category ? category.label : "",
      image: item.image, poster: item.poster, icon: item.icon, tone: item.tone,
      embed: youtube ? "https://www.youtube-nocookie.com/embed/" + youtube + "?autoplay=1&rel=0" : "",
      file: item.type === "video" && !youtube && item.video ? item.video : ""
    };
  },

  /* ---------- items for a chip ---------- */
  chipList() {
    return [{ key: "", label: galleryPageData.toolbar.allLabel }].concat(galleryPageData.categories.map((category) => ({ key: category.slug, label: category.label })));
  },

  initialKey() {
    const wanted = router.param("category") || "";
    return galleryPage.chipList().some((chip) => chip.key === wanted) ? wanted : "";
  },

  itemsFor(key) {
    const category = galleryPageData.categories.find((item) => item.slug === key);
    return galleryPageData.items.filter((item) => !category || item.categoryId === category.id);
  },

  syncAddress(key) {
    window.history.replaceState(null, "", router.currentPage() + (key ? "?category=" + encodeURIComponent(key) : ""));
  },

  /* ---------- one card ---------- */
  buildCard(item, onOpen) {
    const thumb = galleryPage.thumb(item);
    const labels = galleryPageData.viewer;
    const isVideo = item.type === "video";
    return dom.create("button", {
      class: "photoTile tone" + featureCard.cap(item.tone) + (isVideo ? " isVideo" : ""), type: "button",
      "aria-label": item.caption + (isVideo ? " (" + labels.videoBadge + ")" : ""), on: { click: onOpen }
    }, [
      thumb ? dom.create("img", { class: "photoImage", src: thumb, alt: "", loading: "lazy" }) : dom.create("span", { class: "photoPlaceholder", "aria-hidden": "true", text: item.icon }),
      isVideo ? dom.create("span", { class: "photoPlay", "aria-hidden": "true", text: labels.playIcon }) : null,
      isVideo ? dom.create("span", { class: "photoBadge", text: labels.videoBadge }) : null,
      dom.create("span", { class: "photoCaption", text: item.caption })
    ]);
  },

  /* ---------- the photos section ---------- */
  buildPhotos() {
    const page = galleryPageData;
    const state = { key: galleryPage.initialKey(), shown: page.pageSize };

    const chipRow = dom.create("div", { class: "chipRow galleryFilters", role: "group" });
    const grid = dom.create("div", { class: "photoGrid" });
    const countLine = dom.create("p", { class: "galleryCount", "aria-live": "polite" });
    const moreBox = dom.create("div", { class: "galleryMore" });

    const list = () => galleryPage.itemsFor(state.key);

    const open = (items, item) => lightbox.open(items.map(galleryPage.viewerItem), items.indexOf(item), page.viewer);

    const draw = (from) => {
      const items = list();
      const visible = items.slice(0, state.shown);
      if (from === 0) dom.clear(grid);
      if (!items.length) {
        dom.mount(grid, dom.create("p", { class: "galleryEmpty", text: page.results.emptyText }));
      } else {
        dom.append(grid, visible.slice(from).map((item) => galleryPage.buildCard(item, () => open(items, item))));
      }
      countLine.textContent = items.length ? dom.fill(page.results.count, { shown: visible.length, total: items.length }) : "";
      dom.mount(moreBox, visible.length < items.length ? dom.create("button", {
        class: "btn btnAmber", type: "button", text: page.results.moreLabel,
        on: { click: () => { const before = state.shown; state.shown += page.pageSize; draw(before); } }
      }) : null);
      reveal.apply(grid);
    };

    const select = (key) => {
      state.key = key;
      state.shown = page.pageSize;
      galleryPage.syncAddress(key);
      dom.findAll(".chip", chipRow).forEach((chip) => {
        const active = chip.dataset.key === key;
        chip.classList.toggle("isActive", active);
        chip.setAttribute("aria-pressed", String(active));
      });
      draw(0);
    };

    dom.append(chipRow, galleryPage.chipList().map((chip) => dom.create("button", {
      class: "chip", type: "button", text: chip.label, dataset: { key: chip.key }, on: { click: () => select(chip.key) }
    })));

    select(state.key);
    return dom.create("section", { class: "section galleryBody" }, dom.create("div", { class: "container" }, [
      dom.create("div", { class: "sectionHeader" }, [
        dom.create("p", { class: "eyebrow", text: page.toolbar.eyebrow }),
        dom.create("h2", { class: "sectionTitle", text: page.toolbar.title }),
        dom.create("p", { class: "sectionSubtitle", text: page.toolbar.subtitle })
      ]),
      chipRow, grid, countLine, moreBox
    ]));
  },

  render() {
    router.setTitle(galleryPageData.pageTitle);
    siteNav.render();
    const sections = galleryPageData.sections
      .filter((item) => item.enabled && galleryPage.builders[item.type])
      .map((item) => galleryPage.builders[item.type]());
    dom.mount("pageContent", dom.create("div", { class: "galleryPage" }, [pageBanner.build(galleryPage.bannerData())].concat(sections)));
    siteFooter.render();
    floatingButtons.render();
    reveal.apply();
    reveal.start();
  }
};

dom.onReady(galleryPage.render);
