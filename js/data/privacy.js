/* ==========================================================================
   privacy.js (data)  -  Weblink Computers  (privacy.html)
   Texts of the Privacy & Terms page. One entry per card in `sections` (id = number); the left menu is made
   from the same list. To add a section: copy an entry, give it the next id.
   Change `lastUpdated` whenever the text changes.
   IMPORTANT: this text describes what the website does today. Have it checked by a qualified person before launch,
   and add fee / refund rules here if the institute has them.
   Templates: {lastUpdated}
   Global: privacyPageData
   ========================================================================== */

const privacyPageData = {
  pageTitle: "Privacy & Terms",
  lastUpdated: "1 November 2026",

  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "Privacy & Terms" }
    ],
    titleBefore: "Privacy & ",
    titleAccent: "Terms",
    text: "How we look after your information, and the simple rules for using this website.",
    pillLabel: "Last updated: {lastUpdated}"
  },

  menuTitle: "On this page",

  sections: [
    { id: 1, title: "Who we are", text: "Weblink Computers is a computer training institute with five branches in Bhayandar and Mira-Bhayandar. This page explains how we handle your information when you use this website. By using the site you agree to it." },
    { id: 2, title: "Information we collect", text: "When you send an enquiry we ask for your name, phone number, email address, the course you are interested in and your message. We do not ask for payment details on this website." },
    { id: 3, title: "How we use it", text: "We use your details only to reply to your enquiry, tell you about batches and fees, and help you join a course. We do not sell your information." },
    { id: 4, title: "Third-party services", text: "This website shows Google Maps for our branches, can open WhatsApp chats and may play YouTube videos. These services have their own privacy policies and may collect data when you use them." },
    { id: 5, title: "Cookies and saved settings", text: "We do not use tracking or advertising cookies. Your browser stores one small setting on your device, the colour theme you chose, so the site looks the same next time." },
    { id: 6, title: "Keeping your information safe", text: "We take reasonable care to protect the details you send us. No website can promise complete security, so please do not send passwords or bank details in an enquiry." },
    { id: 7, title: "Terms of use", text: "The course details, fees and batch timings on this site are given for guidance and may change; please confirm them at the branch. Certificates are issued under the rules of the certifying body (for example MKCL) and the exam results." },
    { id: 8, title: "Changes and contact", text: "We may update this page from time to time; the date at the top shows the latest change. For any question about your information, call or message any branch." }
  ],

  note: "Questions about this page? Call or message any branch, or use the Contact page.",

  cta: {
    title: "Have a question for us?",
    text: "We are happy to explain how we use your information.",
    primary: { label: "Contact Us", href: "contact.html" },
    secondary: { label: "Find a Branch", href: "branches.html" }
  }
};
