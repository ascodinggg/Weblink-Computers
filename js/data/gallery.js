/* ==========================================================================
   gallery.js (data)  -  Weblink Computers  (gallery.html)
   Photos AND videos of the Gallery page. Each item:
     id (number), type "image" | "video", categoryId (number, from `categories`), caption,
     image  = photo path (type image). Empty "" = coloured placeholder tile with `icon`.
     video  = YouTube link (watch / youtu.be / shorts / embed) OR a video file path (.mp4). Empty "" = "coming soon" tile.
     poster = optional thumbnail path for a video (YouTube videos get their thumbnail automatically).
     icon, tone (blue | red | amber | teal | violet) = placeholder look until the real file is added.
   To add one: copy a line, give it the next id. Photos and videos open in the same viewer; the left / right
   arrows move through them in this order (or the filtered category).
   Templates: {photoCount} {videoCount} {categoryCount} {branchCount} {shown} {total} {current}
   Global: galleryPageData
   ========================================================================== */

const galleryPageData = {
  pageTitle: "Gallery",
  pageSize: 8,                                  /* items shown first, and added by each "Load more" */

  sections: [
    { id: 1, type: "photos", enabled: true },
    { id: 2, type: "cta", enabled: true }
  ],

  banner: {
    breadcrumb: [
      { id: 1, label: "Home", href: "index.html" },
      { id: 2, label: "Gallery" }
    ],
    titleBefore: "Life at ",
    titleAccent: "Weblink",
    text: "A look at our classrooms, computer labs, events and the students who learn with us.",
    pillLabel: "{photoCount} photos · {videoCount} videos",
    highlights: [
      { id: 1, label: "Real classrooms" },
      { id: 2, label: "Student events" },
      { id: 3, label: "Certificate days" }
    ],
    /* type: photoCount | videoCount | categoryCount | branchCount */
    stats: [
      { id: 1, type: "photoCount", display: "Photos" },
      { id: 2, type: "videoCount", display: "Videos" },
      { id: 3, type: "categoryCount", display: "Categories" },
      { id: 4, type: "branchCount", display: "Branches" }
    ]
  },

  toolbar: {
    eyebrow: "Photos & videos",
    title: "Our gallery",
    subtitle: "Tap any photo or video to see it bigger.",
    allLabel: "All"
  },

  results: {
    count: "Showing {shown} of {total}",
    moreLabel: "Load more",
    emptyText: "Nothing in this category yet."
  },

  /* ---- Viewer (opens when a card is clicked) ---- */
  viewer: {
    closeLabel: "Close",
    closeIcon: "✕",
    prevLabel: "Previous",
    prevIcon: "‹",
    nextLabel: "Next",
    nextIcon: "›",
    playIcon: "▶",
    counter: "{current} of {total}",
    videoSoon: "Video coming soon",
    videoBadge: "Video"
  },

  categories: [
    { id: 1, slug: "classrooms", label: "Classrooms" },
    { id: 2, slug: "computer-lab", label: "Computer Lab" },
    { id: 3, slug: "events", label: "Events" },
    { id: 4, slug: "students", label: "Students" },
    { id: 5, slug: "certificates", label: "Certificates" }
  ],

  /* DUMMY items: replace "image" / "video" with real paths or links */
  items: [
    { id: 1, type: "image", categoryId: 1, caption: "Our classroom", image: "assets/images/branches/mainBranch.png", icon: "🏫", tone: "blue" },
    { id: 2, type: "image", categoryId: 2, caption: "Computer lab", image: "", icon: "💻", tone: "red" },
    { id: 3, type: "video", categoryId: 2, caption: "Computer lab tour", video: "", poster: "", icon: "🎬", tone: "violet" },
    { id: 4, type: "image", categoryId: 2, caption: "Practice session", image: "", icon: "👩‍🏫", tone: "amber" },
    { id: 5, type: "image", categoryId: 5, caption: "Certificate distribution", image: "", icon: "🎓", tone: "teal" },
    { id: 6, type: "image", categoryId: 4, caption: "Student batch", image: "", icon: "👥", tone: "violet" },
    { id: 7, type: "image", categoryId: 1, caption: "Reception area", image: "", icon: "🏢", tone: "blue" },
    { id: 8, type: "image", categoryId: 2, caption: "Lab workstations", image: "", icon: "🖥️", tone: "red" },
    { id: 9, type: "video", categoryId: 3, caption: "Annual day highlights", video: "", poster: "", icon: "🎬", tone: "amber" },
    { id: 10, type: "image", categoryId: 1, caption: "Tally class", image: "", icon: "📚", tone: "teal" },
    { id: 11, type: "image", categoryId: 3, caption: "Toppers felicitation", image: "", icon: "🏆", tone: "violet" },
    { id: 12, type: "video", categoryId: 4, caption: "Student feedback", video: "", poster: "", icon: "🎬", tone: "blue" },
    { id: 13, type: "image", categoryId: 4, caption: "Web design batch", image: "", icon: "👨‍💻", tone: "blue" },
    { id: 14, type: "image", categoryId: 5, caption: "MS-CIT certificates", image: "", icon: "📜", tone: "red" }
  ],

  cta: {
    title: "Want to see it in person?",
    text: "Visit any of our branches and meet our teachers. We are happy to show you around.",
    primary: { label: "Find a Branch", href: "branches.html" },
    secondary: { label: "Contact Us", href: "contact.html" }
  }
};
