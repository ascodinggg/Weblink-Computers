/* ==========================================================================
   lightbox.js  -  Weblink Computers
   Full-screen viewer for photos AND videos. lightbox.open(list, index, labels) shows list[index];
   the left / right arrows (also keyboard arrows and swipe) move through the list. Esc, the close
   button or a click outside closes it.
   list items: { type "image" | "video", caption, sub, image, embed (YouTube embed url), file (video file),
                 poster, icon, tone }  (built by the page, see pages/gallery.js)
   labels = galleryPageData.viewer.   Global: lightbox
   ========================================================================== */

const lightbox = {
  list: [],
  index: 0,
  labels: null,
  root: null,
  opener: null,
  touchX: null,

  /* ---- build once, on first open ---- */
  build() {
    const labels = lightbox.labels;
    lightbox.stage = dom.create("div", { class: "lbStage" });
    lightbox.caption = dom.create("p", { class: "lbCaption" });
    lightbox.meta = dom.create("p", { class: "lbMeta" });
    lightbox.closeButton = dom.create("button", { class: "lbButton lbClose", type: "button", "aria-label": labels.closeLabel, text: labels.closeIcon, on: { click: lightbox.close } });
    lightbox.prevButton = dom.create("button", { class: "lbButton lbPrev", type: "button", "aria-label": labels.prevLabel, text: labels.prevIcon, on: { click: () => lightbox.move(-1) } });
    lightbox.nextButton = dom.create("button", { class: "lbButton lbNext", type: "button", "aria-label": labels.nextLabel, text: labels.nextIcon, on: { click: () => lightbox.move(1) } });
    lightbox.root = dom.create("div", {
      class: "lightbox", role: "dialog", "aria-modal": "true", "aria-label": labels.closeLabel,
      on: {
        click: (event) => { if (event.target === lightbox.root || event.target.classList.contains("lbBody")) lightbox.close(); },
        touchstart: (event) => { lightbox.touchX = event.touches[0].clientX; },
        touchend: (event) => {
          if (lightbox.touchX === null) return;
          const distance = event.changedTouches[0].clientX - lightbox.touchX;
          lightbox.touchX = null;
          if (Math.abs(distance) > 50) lightbox.move(distance < 0 ? 1 : -1);
        }
      }
    }, [
      lightbox.closeButton,
      lightbox.prevButton,
      dom.create("div", { class: "lbBody" }, [lightbox.stage, dom.create("div", { class: "lbInfo" }, [lightbox.caption, lightbox.meta])]),
      lightbox.nextButton
    ]);
    document.body.appendChild(lightbox.root);
    document.addEventListener("keydown", lightbox.onKey);
  },

  open(list, index, labels) {
    lightbox.list = list;
    lightbox.index = index;
    lightbox.labels = labels;
    if (!lightbox.root) lightbox.build();
    lightbox.opener = document.activeElement;
    lightbox.root.classList.add("isOpen");
    document.documentElement.classList.add("lightboxOpen");
    lightbox.show();
    lightbox.closeButton.focus();
  },

  close() {
    if (!lightbox.root || !lightbox.root.classList.contains("isOpen")) return;
    lightbox.root.classList.remove("isOpen");
    document.documentElement.classList.remove("lightboxOpen");
    dom.clear(lightbox.stage);                     /* removing the player stops the video */
    if (lightbox.opener && lightbox.opener.focus) lightbox.opener.focus();
  },

  isOpen() {
    return !!lightbox.root && lightbox.root.classList.contains("isOpen");
  },

  move(step) {
    const total = lightbox.list.length;
    lightbox.index = (lightbox.index + step + total) % total;
    lightbox.show();
  },

  onKey(event) {
    if (!lightbox.isOpen()) return;
    if (event.key === "Escape") lightbox.close();
    else if (event.key === "ArrowLeft") lightbox.move(-1);
    else if (event.key === "ArrowRight") lightbox.move(1);
  },

  /* ---- what goes on the stage for one item ---- */
  media(item) {
    const labels = lightbox.labels;
    if (item.type === "video") {
      if (item.embed) {
        return dom.create("iframe", {
          class: "lbFrame", src: item.embed, title: item.caption, allowfullscreen: true,
          allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", referrerpolicy: "strict-origin-when-cross-origin"
        });
      }
      if (item.file) return dom.create("video", { class: "lbVideo", src: item.file, poster: item.poster || null, controls: true, autoplay: true, playsinline: true });
      return dom.create("div", { class: "lbPlaceholder tone" + featureCard.cap(item.tone) }, [
        dom.create("span", { class: "lbPlaceholderIcon", "aria-hidden": "true", text: labels.playIcon }),
        dom.create("span", { class: "lbPlaceholderText", text: labels.videoSoon })
      ]);
    }
    if (item.image) return dom.create("img", { class: "lbImage", src: item.image, alt: item.caption });
    return dom.create("div", { class: "lbPlaceholder tone" + featureCard.cap(item.tone), "aria-hidden": "true" },
      dom.create("span", { class: "lbPlaceholderIcon", text: item.icon }));
  },

  show() {
    const item = lightbox.list[lightbox.index];
    const several = lightbox.list.length > 1;
    dom.mount(lightbox.stage, lightbox.media(item));
    lightbox.caption.textContent = item.caption;
    lightbox.meta.textContent = dom.fill(lightbox.labels.counter, { current: lightbox.index + 1, total: lightbox.list.length }) + (item.sub ? " · " + item.sub : "");
    lightbox.prevButton.hidden = !several;
    lightbox.nextButton.hidden = !several;
  }
};
