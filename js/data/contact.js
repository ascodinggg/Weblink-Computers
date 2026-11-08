/* ==========================================================================
   contact.js (data)  -  Weblink Computers  (contact.html)
   Texts and settings of the Contact page: banner, quick cards, enquiry form (fields, rules,
   messages, security settings), main-branch panel, branches heading.
   Phone, email and working hours come from config.js (siteConfig.contact); branches from branches.js.
   The form checks the input, then sends it to a Google Sheet (siteConfig.enquiry.sheetUrl in config.js) and shows the thank-you message.
   Global: contactPageData
   ========================================================================== */

const contactPageData = {
  pageTitle: "Contact Us",

  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "Contact" }
    ],
    titleBefore: "Contact ",
    titleAccent: "Us",
    text: "Call, WhatsApp or visit any of our {branchCount} branches. We are happy to guide you to the right course."
  },

  /* ---- Quick cards. type: phone | whatsapp | email | text (values come from siteConfig.contact) ---- */
  quickCards: [
    { id: 1, type: "phone", icon: "📞", label: "Call us" },
    { id: 2, type: "whatsapp", icon: "💬", label: "WhatsApp", value: "Chat with us" },
    { id: 3, type: "email", icon: "✉️", label: "Email" },
    { id: 4, type: "text", icon: "🕘", label: "" }          /* label + value come from config (working hours) */
  ],

  /* ---- Enquiry form ---- */
  form: {
    title: "Send an enquiry",
    text: "Fill in your details and we will get back to you.",
    submitLabel: "Send Enquiry →",
    sendingLabel: "Sending...",
    successMessage: "Thank you! We have received your enquiry and will call you soon.",
    failMessage: "Sorry, something went wrong. Please call or WhatsApp us.",

    /* Rules are checked in the browser (css-free, no hidden text in HTML).
       NOTE: browser checks are for a good experience; real protection must also be done on the server later. */
    fields: [
      {
        id: 1, name: "name", type: "text", label: "Your name", placeholder: "Full name", autocomplete: "name",
        required: true, minLength: 2, maxLength: 60, normalize: "name",
        pattern: "^[\\p{L}][\\p{L} .'-]*$",
        messages: { required: "Please enter your name.", short: "Name must be at least 2 letters.", invalid: "Use only letters, spaces and . ' -" }
      },
      {
        id: 2, name: "phone", type: "tel", label: "Phone number", placeholder: "10-digit mobile number", autocomplete: "tel-national", inputmode: "numeric",
        required: true, minLength: 10, maxLength: 10, attrMaxLength: 16, normalize: "phone",   /* attrMaxLength lets people paste "+91 98765-43210"; the rule checks the cleaned 10 digits */
        pattern: "^[6-9]\\d{9}$",
        messages: { required: "Please enter your mobile number.", short: "Enter all 10 digits.", invalid: "Enter a valid 10-digit Indian mobile number." }
      },
      {
        id: 3, name: "email", type: "email", label: "Email", placeholder: "you@example.com", autocomplete: "email", inputmode: "email",
        required: true, minLength: 6, maxLength: 100, normalize: "email",
        pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}$",
        messages: { required: "Please enter your email.", short: "Email looks too short.", invalid: "Enter a valid email, like name@example.com." }
      },
      {
        id: 4, name: "course", type: "select", label: "Course", placeholder: "Select a course",
        required: true, normalize: "text",
        messages: { required: "Please choose a course.", invalid: "Please choose a course from the list." }
      },
      {
        id: 5, name: "message", type: "textarea", label: "Message (optional)", placeholder: "Anything you would like to ask",
        required: false, minLength: 0, maxLength: 500, normalize: "text", showCounter: true, blockLinks: true,
        messages: { invalid: "Please remove web links from the message." }
      }
    ],

    /* rows on tablet + desktop: field ids in the same row */
    rows: [[1, 2], [3, 4], [5]],

    /* ---- Browser-side protection ---- */
    security: {
      honeypotName: "website",        /* hidden field: people leave it empty, bots fill it */
      minFillSeconds: 3,              /* a form sent faster than this is treated as a bot */
      cooldownSeconds: 30,            /* wait between two sends from the same browser */
      botMessage: "Please try again.",
      waitMessage: "Please wait a few seconds before sending another enquiry.",
      fixMessage: "Please correct the highlighted fields."
    }
  },

  /* ---- "Visit our main branch" panel ---- */
  visit: {
    mainBranchId: 1,
    title: "Visit our main branch",
    mapTitle: "Map of our main branch",
    directionsLabel: "Get directions",
    allBranchesLabel: "View all branches →",
    allBranchesHref: "branches.html"
  },

  /* ---- Branch cards ---- */
  branches: {
    eyebrow: "Find us",
    title: "Our branches",
    mainBadge: "MAIN BRANCH",
    directionsLabel: "Get directions →"
  }
};
