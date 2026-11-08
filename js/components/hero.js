/* ==========================================================================
   hero.js  -  Weblink Computers
   Home hero: chip, headline (with an amber accent word), text, two buttons and
   the right-hand visual (a CSS-built tech scene, or a photo when heroImage is set).
   Data: homeData.hero (home.js).   Global: hero
   ========================================================================== */

const hero = {

  build(data) {
    return dom.create("section", { class: "hero", id: "hero" }, [
      dom.create("div", { class: "heroInner container" }, [
        dom.create("div", { class: "heroContent" }, [
          dom.create("span", { class: "heroChip", text: data.chip }),
          dom.create("h1", { class: "heroTitle" }, data.titleLines.map((line, index) => [
            index > 0 ? dom.create("br") : null,
            line.map((part) => part.accent
              ? dom.create("em", { class: "heroAccent", text: part.text })
              : part.text)
          ])),
          dom.create("p", { class: "heroText", text: data.text }),
          dom.create("div", { class: "heroButtons" }, data.buttons.map((button) =>
            dom.link(button.href, { class: "btn " + (button.style === "ghost" ? "btnGhost" : "btnPrimary") }, button.label)
          ))
        ]),
        dom.create("div", { class: "heroVisual" }, data.heroImage
          ? dom.create("img", { class: "heroImage", src: data.heroImage, alt: "" })
          : hero.buildScene(data.scene))
      ])
    ]);
  },

  /* ---- Tech scene: code window + ledger table + floating icons ---- */
  buildScene(scene) {
    return dom.create("div", { class: "scene", "aria-hidden": "true" }, [
      hero.buildWindow("sceneCode", dom.create("div", { class: "sceneCodeBody" },
        scene.codeWindow.lines.map((line) => dom.create("div", { class: "sceneCodeLine" }, hero.codeParts(line))))),
      hero.buildWindow("sceneLedger", hero.buildLedger(scene.ledger)),
      scene.cards.map((card, index) => hero.buildCard(card, index + 1)),
      scene.icons.map((item, index) =>
        dom.create("span", { class: "sceneIcon sceneIcon" + (index + 1) + " tone" + hero.cap(item.tone), text: item.icon }))
    ]);
  },

  /* Small floating info card (icon + label + value + note). */
  buildCard(card, number) {
    return dom.create("div", { class: "sceneCard sceneCard" + number }, [
      dom.create("span", { class: "sceneCardIcon", text: card.icon }),
      dom.create("div", { class: "sceneCardText" }, [
        dom.create("div", { class: "sceneCardLabel", text: card.label }),
        dom.create("div", { class: "sceneCardValue", text: card.value }),
        dom.create("div", { class: "sceneCardNote", text: card.note })
      ])
    ]);
  },

  cap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },

  buildWindow(className, body) {
    return dom.create("div", { class: "sceneWindow " + className }, [
      dom.create("div", { class: "sceneWindowBar" }, [
        dom.create("i", { class: "sceneDot sceneDotRed" }),
        dom.create("i", { class: "sceneDot sceneDotYellow" }),
        dom.create("i", { class: "sceneDot sceneDotGreen" })
      ]),
      body
    ]);
  },

  /* One code line: kind colours the first word; optional after / string / call / afterTag / end follow. */
  codeParts(line) {
    const kindClass = { comment: "codeComment", tag: "codeTag", keyword: "codeKeyword" }[line.kind];
    return [
      dom.create("span", { class: kindClass, text: line.text }),
      line.after ? line.after : null,
      line.string ? dom.create("span", { class: "codeString", text: line.string }) : null,
      line.call ? dom.create("span", { class: "codeTag", text: line.call }) : null,
      line.afterTag ? dom.create("span", { class: "codeTag", text: line.afterTag }) : null,
      line.end ? line.end : null
    ];
  },

  buildLedger(ledger) {
    return dom.create("div", { class: "sceneLedgerBody" }, dom.create("table", { class: "sceneTable" }, [
      dom.create("thead", {}, dom.create("tr", {}, ledger.headers.map((text) => dom.create("th", { text: text })))),
      dom.create("tbody", {}, ledger.rows.map((row) =>
        dom.create("tr", {}, row.map((cell) => dom.create("td", { text: cell })))))
    ]));
  }
};
