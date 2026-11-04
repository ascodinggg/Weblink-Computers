/* ==========================================================================
   branches-page.js (data)  -  Weblink Computers  (branches.html)
   Texts of the Branches page. The branches themselves (name, address, phones, own WhatsApp number,
   map search) are in branches.js; working hours come from config.js.
   Templates: {branchCount}, {workingHours}, {branchName}.
   Global: branchesPageData
   ========================================================================== */

const branchesPageData = {
  pageTitle: "Our Branches",

  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "Branches" }
    ],
    titleBefore: "Our ",
    titleAccent: "Branches",
    text: "Learn close to home. {branchCount} branches across Bhayandar, Mira-Bhayandar, all near the station or main roads.",
    pillLabel: "{branchCount} branches",
    highlights: [
      { id: 1, label: "Near the station" },
      { id: 2, label: "{workingHours}" },
      { id: 3, label: "Same courses at every branch" }
    ],
    /* stat tiles. type: branchCount | areaCount (counts the branches of that area) | text */
    stats: [
      { id: 1, type: "branchCount", label: "Branches" },
      { id: 2, type: "areaCount", area: "Bhayandar West", label: "Bhayandar West" },
      { id: 3, type: "areaCount", area: "Bhayandar East", label: "Bhayandar East" },
      { id: 4, type: "text", value: "9 – 9", label: "Open daily" }
    ]
  },

  /* ---- One block per branch ---- */
  blocks: {
    mainBranchId: 1,
    mainBadge: "MAIN BRANCH",
    addressLabel: "Address",
    phoneLabel: "Phone",
    timingsLabel: "Timings",
    directionsLabel: "Get directions",
    callLabel: "Call branch",
    whatsappLabel: "WhatsApp",
    mapTitle: "Map of {branchName}"
  },

  /* ---- Help panel at the bottom ---- */
  help: {
    label: "Not sure which branch?",
    title: "We will help you choose",
    text: "Tell us where you live and which course you want. We will suggest the nearest branch and the next batch.",
    button: { label: "Contact Us →", href: "contact.html" }
  }
};
