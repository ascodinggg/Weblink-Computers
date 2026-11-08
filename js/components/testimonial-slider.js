/* ==========================================================================
   testimonial-slider.js  -  Weblink Computers
   Home "What Our Students Say" section: a slider of review cards.
     - 3 cards visible on desktop (the middle one is lifted), 2 on tablets, 1 on phones
       (the number comes from the CSS variable --sliderVisible, so breakpoints stay in the CSS file)
     - previous / next arrows, dots, swipe / drag, keyboard focus on the buttons
   Data: homeData.testimonials (home.js).   Global: testimonialSlider
   ========================================================================== */

const testimonialSlider = {

  build(data) {
    const state = { start: 0, visible: 3 };
    const reviews = data.reviews;

    const track = dom.create("div", { class: "sliderTrack" },
      reviews.map((review) => dom.create("div", { class: "sliderSlide" }, testimonialSlider.buildCard(review))));
    const viewport = dom.create("div", { class: "sliderViewport" }, track);
    const dots = dom.create("div", { class: "sliderDots" });
    const previous = testimonialSlider.buildArrow("chevronLeft", data.previousLabel);
    const next = testimonialSlider.buildArrow("chevronRight", data.nextLabel);
    const slider = dom.create("div", { class: "testimonialSlider" }, [
      viewport,
      dom.create("div", { class: "sliderControls" }, [previous, dots, next])
    ]);

    const lastStart = () => Math.max(0, reviews.length - state.visible);

    /* move the track, mark the lifted middle card, update arrows and dots */
    const update = () => {
      state.start = Math.min(Math.max(state.start, 0), lastStart());
      track.style.setProperty("--sliderIndex", state.start);
      const centre = state.visible === 3 ? state.start + 1 : -1;
      dom.findAll(".sliderSlide", track).forEach((slide, index) => {
        slide.classList.toggle("isCenter", index === centre);
        const inView = index >= state.start && index < state.start + state.visible;
        slide.setAttribute("aria-hidden", String(!inView));
      });
      previous.disabled = state.start === 0;
      next.disabled = state.start === lastStart();
      dom.findAll(".sliderDot", dots).forEach((dot, index) => {
        dot.classList.toggle("isActive", index === state.start);
        if (index === state.start) dot.setAttribute("aria-current", "true"); else dot.removeAttribute("aria-current");
      });
    };

    const goTo = (index) => { state.start = index; update(); };

    const buildDots = () => {
      const count = lastStart() + 1;
      dom.mount(dots, Array.from({ length: count }, (unused, index) => dom.create("button", {
        class: "sliderDot", type: "button", "aria-label": data.goToLabel + " " + (index + 1),
        on: { click: () => goTo(index) }
      })));
    };

    /* how many cards fit now? (read from the CSS variable of the current screen size) */
    const measure = () => {
      const value = parseInt(window.getComputedStyle(slider).getPropertyValue("--sliderVisible"), 10);
      const visible = value > 0 ? value : 1;
      if (visible === state.visible && dots.children.length) return;
      state.visible = visible;
      buildDots();
      update();
    };

    previous.addEventListener("click", () => goTo(state.start - 1));
    next.addEventListener("click", () => goTo(state.start + 1));
    testimonialSlider.enableSwipe(viewport, (direction) => goTo(state.start + direction));

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 120);
    });

    const section = dom.create("section", { class: "section sectionDark testimonialSection", id: "testimonials" },
      dom.create("div", { class: "container" }, [
        dom.create("div", { class: "sectionHeader" }, [
          dom.create("p", { class: "eyebrow", text: data.eyebrow }),
          dom.create("h2", { class: "sectionTitle", text: data.title }),
          dom.create("p", { class: "sectionSubtitle", text: data.subtitle })
        ]),
        slider
      ]));

    /* the CSS variable can only be read once the slider is on the page */
    window.requestAnimationFrame(measure);
    state.visible = 0;
    return section;
  },

  buildArrow(iconName, label) {
    return dom.create("button", { class: "sliderArrow", type: "button", "aria-label": label, title: label },
      dom.icon(iconName, "sliderArrowIcon"));
  },

  /* One review card: quote mark, stars, quote, avatar + name + course tag. */
  buildCard(review) {
    return dom.create("article", { class: "testimonialCard tone" + featureCard.cap(review.tone) }, [
      dom.create("span", { class: "testimonialQuoteMark", "aria-hidden": "true", text: "”" }),
      dom.create("div", { class: "testimonialStars", role: "img", "aria-label": review.rating + " / 5" },
        Array.from({ length: 5 }, (unused, index) =>
          dom.create("span", { class: "testimonialStar" + (index < review.rating ? "" : " isOff"), text: "★" }))),
      dom.create("p", { class: "testimonialQuote", text: "“" + review.quote + "”" }),
      dom.create("div", { class: "testimonialWho" }, [
        dom.create("span", { class: "testimonialAvatar", "aria-hidden": "true", text: review.name.charAt(0) }),
        dom.create("div", { class: "testimonialPerson" }, [
          dom.create("div", { class: "testimonialName", text: review.name }),
          dom.create("span", { class: "courseTag", text: review.course })
        ])
      ])
    ]);
  },

  /* Swipe / drag left or right on the viewport: callback(+1) = next, callback(-1) = previous. */
  enableSwipe(element, callback) {
    const minimumDistance = 50;
    let startX = null;
    element.addEventListener("pointerdown", (event) => { startX = event.clientX; });
    const finish = (event) => {
      if (startX === null) return;
      const distance = event.clientX - startX;
      startX = null;
      if (Math.abs(distance) >= minimumDistance) callback(distance < 0 ? 1 : -1);
    };
    element.addEventListener("pointerup", finish);
    element.addEventListener("pointercancel", () => { startX = null; });
    element.addEventListener("pointerleave", () => { startX = null; });
  }
};
