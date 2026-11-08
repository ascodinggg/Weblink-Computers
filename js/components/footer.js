/* ==========================================================================
   footer.js  -  Weblink Computers
   Site footer: brand block, Quick Links, Popular Courses, Our Branches,
   contact strip (social / working hours / email) and the copyright bar.
   All text comes from config.js, courses-data.js and branches.js.
   Mounts into: #siteFooter.   Global: siteFooter
   ========================================================================== */

const siteFooter = {

  render() {
    const config = siteConfig.footer;
    dom.mount("siteFooter", dom.create("div", { class: "footerInner container" }, [
      dom.create("div", { class: "footerColumns" }, [
        siteFooter.buildBrand(config),
        siteFooter.buildLinkColumn(config.quickLinksTitle, "footerQuick", config.quickLinks.map((link) => ({ label: link.label, href: link.href }))),
        siteFooter.buildLinkColumn(config.popularCoursesTitle, "footerCourses", siteFooter.courseLinks(config)),
        siteFooter.buildBranches(config)
      ]),
      siteFooter.buildStrip(),
      dom.create("p", { class: "footerCopyright", text: dom.fill(config.copyright, { year: siteConfig.year }) })
    ]));
  },

  buildBrand(config) {
    return dom.create("div", { class: "footerColumn footerBrand" }, [
      dom.link(siteConfig.nav.items[0].href, { class: "brand footerBrandLink", "aria-label": siteConfig.siteName }, [
        dom.create("span", { class: "logoBadge footerLogo" }, dom.create("img", {
          src: siteConfig.logo.src, alt: siteConfig.logo.alt, width: "64", height: "64"
        })),
        dom.create("span", { class: "brandName footerBrandName", text: siteConfig.siteName })
      ]),
      dom.create("p", { class: "footerTagline", text: siteConfig.tagline }),
      dom.create("p", { class: "footerDescription", text: config.description })
    ]);
  },

  /* The 6 popular course links (ids from config) + the "All Courses" link. */
  courseLinks(config) {
    const links = config.popularCourseIds
      .map((id) => dom.byId(coursesData.courses, id))
      .filter((course) => course)
      .map((course) => ({ label: course.name, href: router.courseHref(course.id) }));
    links.push({ label: config.allCoursesLabel + " →", href: config.allCoursesHref });
    return links;
  },

  buildLinkColumn(title, className, links) {
    return dom.create("div", { class: "footerColumn " + className }, [
      dom.create("h3", { class: "footerHeading", text: title }),
      dom.create("ul", { class: "footerList" }, links.map((link) =>
        dom.create("li", {}, dom.link(link.href, { class: "footerLink" }, link.label))
      ))
    ]);
  },

  /* Branch names are plain text (not links); then the head-office phone and the Visit Branches link. */
  buildBranches(config) {
    return dom.create("div", { class: "footerColumn footerBranches" }, [
      dom.create("h3", { class: "footerHeading", text: config.branchesTitle }),
      dom.create("ul", { class: "footerList" }, branchesData.map((branch) =>
        dom.create("li", { class: "footerBranchName", text: branch.shortName })
      )),
      dom.link("tel:" + siteConfig.contact.phoneLink, { class: "footerPhone" }, [
        dom.icon("phone"),
        dom.create("span", { text: siteConfig.contact.phoneDisplay })
      ]),
      dom.link(config.visitBranchesHref, { class: "footerVisit" }, config.visitBranchesLabel + " →")
    ]);
  },

  /* Social icons left, working hours centre, email right. */
  buildStrip() {
    const contact = siteConfig.contact;
    return dom.create("div", { class: "footerStrip" }, [
      dom.create("div", { class: "footerSocial" }, dom.socialLinks(siteConfig.social, "footerSocialIcon")),
      dom.create("div", { class: "footerHours" }, [
        dom.create("span", { class: "footerHoursLabel", text: contact.workingHoursLabel }),
        dom.create("strong", { class: "footerHoursValue", text: contact.workingHours })
      ]),
      dom.link("mailto:" + contact.email, { class: "footerMail" }, [
        dom.icon("mail"),
        dom.create("span", { text: contact.email })
      ])
    ]);
  }
};
