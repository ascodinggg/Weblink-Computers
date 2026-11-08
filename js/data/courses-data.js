/* ==========================================================================
   courses-data.js  -  Weblink Computers
   ALL course data lives in this ONE file: categories, labels and every course.
   Single source for: Home filter chips, Courses-page chips, navbar dropdown,
   course cards, course detail pages (course.html?id=<id>) and the footer list.
   All ids in the data files are numbers. Categories are referenced by their numeric id.
   Global: coursesData

   Course fields
     id           NUMBER (1, 2, 3 ...) used inside the data and code  (unique; never reuse a number)
     name         display name
     slug         URL name (lowercase, hyphens): course.html?course=<slug>  (unique; ids stay numbers)
     categories   ARRAY of numeric category ids (a course can belong to several)
     icon         emoji icon for now (replace by image path in "image" when course images exist)
     image        optional image path ("" = show the icon tile)
     description  1-2 lines for the card
     fee          { amount, oldAmount }  | null = show "Contact for fees"
                  oldAmount present -> struck-through price + offer badge
     badge        "" | "govtCertified"
     popular      true = shown in "Popular Courses" on Home, in this array order
   Detail content for course.html is in the "details" list at the bottom of this file
   (linked by courseId).
   ========================================================================== */

const coursesData = {

  /* ---- UI labels shared by every course view ---- */
  labels: {
    allCategory: "All",
    currency: "Rs.",
    feeSuffix: "/-",
    contactForFees: "Contact for fees",
    viewDetails: "View Details →",
    offerBadge: "50% OFF",
    govtCertifiedBadge: "GOVT. CERTIFIED"
  },

  /* ---- Categories (names are the filter chips and the navbar dropdown items) ---- */
  categories: [
    { id: 1, label: "Basics in IT", slug: "basics-in-it" },
    { id: 2, label: "Accounting", slug: "accounting" },
    { id: 3, label: "Web & Marketing", slug: "web-and-marketing" },
    { id: 4, label: "Programming & Data", slug: "programming-and-data" },
    { id: 5, label: "Design", slug: "design" },
    { id: 6, label: "Hardware & Networking", slug: "hardware-and-networking" },
    { id: 7, label: "Academic", slug: "academic" }
  ],

  /* ---- Courses ---- */
  courses: [
    /* ===== Popular courses (Home shows these 12, in this order) ===== */
    {
      id: 1, name: "MS-CIT", slug: "ms-cit", categories: [1], icon: "💻", image: "",
      description: "Govt. recognised Maharashtra State certificate in IT. Valid for government employment.",
      fee: { amount: 6000 }, badge: "govtCertified", popular: true
    },
    {
      id: 2, name: "Basic Computer & Internet", slug: "basic-computer-and-internet", categories: [1], icon: "🖥️", image: "",
      description: "Typing, Windows, Word, Excel, PowerPoint & Internet. Covers all MS-CIT topics (no govt. certificate).",
      fee: { amount: 4000, oldAmount: 8000 }, badge: "", popular: true
    },
    {
      id: 3, name: "Advance Excel", slug: "advance-excel", categories: [1, 2], icon: "📊", image: "",
      description: "Pivot tables, MIS reports, lookup functions, data validation & more.",
      fee: { amount: 6000, oldAmount: 12000 }, badge: "", popular: true
    },
    {
      id: 4, name: "Tally Prime with GST", slug: "tally-prime-with-gst", categories: [2], icon: "📒", image: "",
      description: "Basic accounting, vouchers, trial balance, profit & loss, balance sheet and GST.",
      fee: { amount: 5000, oldAmount: 10000 }, badge: "", popular: true
    },
    {
      id: 5, name: "Advanced Tally Prime with GST", slug: "advanced-tally-prime-with-gst", categories: [2], icon: "🧾", image: "",
      description: "26 modules: GST returns, TDS, e-way bill, MIS reports, inventory & more.",
      fee: { amount: 10000, oldAmount: 20000 }, badge: "", popular: true
    },
    {
      id: 6, name: "Web Designing", slug: "web-designing", categories: [3], icon: "🌐", image: "",
      description: "HTML, CSS, JavaScript, WordPress, web hosting with domain name & projects.",
      fee: { amount: 7000, oldAmount: 14000 }, badge: "", popular: true
    },
    {
      id: 7, name: "D.T.P.", slug: "dtp", categories: [5], icon: "🎨", image: "",
      description: "Corel Draw, Photoshop and InDesign with practical projects.",
      fee: { amount: 12000, oldAmount: 24000 }, badge: "", popular: true
    },
    {
      id: 8, name: "Digital Marketing", slug: "digital-marketing", categories: [3], icon: "📣", image: "",
      description: "Canva, SEO, social media, Google Ads, website creation & video editing.",
      fee: { amount: 40000, oldAmount: 80000 }, badge: "", popular: true
    },
    {
      id: 9, name: "Data Analytics", slug: "data-analytics", categories: [4], icon: "📈", image: "",
      description: "Excel, R, Python, Power BI, SQL and Tableau.",
      fee: { amount: 36000, oldAmount: 72000 }, badge: "", popular: true
    },
    {
      id: 10, name: "Hardware & Networking", slug: "hardware-and-networking", categories: [6], icon: "🛠️", image: "",
      description: "Hardware assembly, installation, troubleshooting & networking. 2 months course + 4 months training.",
      fee: { amount: 20000, oldAmount: 40000 }, badge: "", popular: true
    },
    {
      id: 11, name: "11th IT / CS", slug: "11th-it-cs", categories: [7], icon: "🎓", image: "",
      description: "IT / CS for Arts, Commerce and Science students.",
      fee: null, badge: "", popular: true
    },
    {
      id: 12, name: "12th IT / CS", slug: "12th-it-cs", categories: [7], icon: "🏫", image: "",
      description: "IT / CS for Arts, Commerce and Science students.",
      fee: null, badge: "", popular: true
    },

    /* ===== More courses (no printed fee: "Contact for fees") ===== */
    { 
      id: 13, name: "MS-CIT (Marathi)", slug: "ms-cit-marathi", categories: [1], icon: "💻", image: "",
      description: "The MS-CIT course taught in Marathi.",
      fee: null, badge: "", popular: false
    },
    {
      id: 14, name: "C Programming", slug: "c-programming", categories: [4], icon: "🔤", image: "",
      description: "Learn C Programming from the basics with practical work.",
      fee: null, badge: "", popular: false
    },
    {
      id: 15, name: "C++", slug: "cplusplus", categories: [4], icon: "➕", image: "",
      description: "Learn C++ programming with practical work.",
      fee: null, badge: "", popular: false
    },
    {
      id: 16, name: "Java", slug: "java", categories: [4], icon: "☕", image: "",
      description: "Core Java and Advance Java programming.",
      fee: null, badge: "", popular: false
    },
    {
      id: 17, name: "Python", slug: "python", categories: [4], icon: "🐍", image: "",
      description: "Python programming from the basics.",
      fee: null, badge: "", popular: false
    },
    {
      id: 18, name: ".NET", slug: "dotnet", categories: [4], icon: "🧩", image: "", 
      description: ".NET application development.",
      fee: null, badge: "", popular: false

    },
    {
      id: 19, name: "SQL", slug: "sql", categories: [4], icon: "🗄️", image: "",
      description: "Learn SQL databases and queries.",
      fee: null, badge: "", popular: false
    },
    {
      id: 20, name: "PHP", slug: "php", categories: [4, 3], icon: "🌍", image: "",
      description: "Build dynamic websites with PHP and MySQL.",
      fee: null, badge: "", popular: false
    },
    {
      id: 21, name: "Android Development", slug: "android-development", categories: [4], icon: "📱", image: "",
      description: "Android app programming.",
      fee: null, badge: "", popular: false
    },
    {
      id: 22, name: "Full Stack Development", slug: "full-stack-development", categories: [4, 3], icon: "🧱", image: "",
      description: "Software programming with full stack development (6 semesters).",
      fee: null, badge: "", popular: false
    },
    {
      id: 23, name: "Ethical Hacking", slug: "ethical-hacking", categories: [4], icon: "🛡️", image: "",
      description: "Certificate course in Ethical Hacking.",
      fee: null, badge: "", popular: false
    },
    {
      id: 24, name: "Artificial Intelligence", slug: "artificial-intelligence", categories: [4], icon: "🤖", image: "",
      description: "Certificate course in Artificial Intelligence.",
      fee: null, badge: "", popular: false
    },
    {
      id: 25, name: "Cisco Certification", slug: "cisco-certification", categories: [6], icon: "🌐", image: "",
      description: "Cisco networking certification.",
      fee: null, badge: "", popular: false
    },
    {
      id: 26, name: "AutoCAD", slug: "autocad", categories: [5], icon: "📐", image: "",
      description: "AutoCAD 2D & 3D: Civil, Interior, Mechanical, Architectural, Electrical and more.",
      fee: null, badge: "", popular: false
    },
    {
      id: 27, name: "3D Animation", slug: "3d-animation", categories: [5], icon: "🎬", image: "",
      description: "3D animation and creative media.",
      fee: null, badge: "", popular: false
    },
    {
      id: 28, name: "B.Sc IT", slug: "bsc-it", categories: [7], icon: "🎓", image: "",
      description: "Academic course for B.Sc IT students.",
      fee: null, badge: "", popular: false
    },
    {
      id: 29, name: "BCA", slug: "bca", categories: [7], icon: "🎓", image: "",
      description: "Academic course for BCA students.",
      fee: null, badge: "", popular: false
    }
  ],

  /* ---- Course detail content (course.html). One entry per course, linked by courseId.
     PLACEHOLDER TEXT: client to replace with the real duration, syllabus and careers.
     duration: text | about: short paragraph | learn: bullet list | syllabus: modules { title, text } | careers: job titles ---- */
  details: [
    {
      courseId: 1, duration: "3 months",
      about: "Government-recognised MS-CIT certificate course from MKCL, taught step by step with daily practice.",
      learn: ["Typing and Windows basics", "MS Word, Excel and PowerPoint", "Internet, email and online safety", "Digital payments and e-governance", "Government-valid certificate"],
      syllabus: [
        { id: 1, title: "Computer basics", text: "Parts of a computer, Windows, files and folders" },
        { id: 2, title: "Word processing", text: "Documents, formatting, tables, printing" },
        { id: 3, title: "Spreadsheets and presentations", text: "Excel formulas, charts, PowerPoint slides" },
        { id: 4, title: "Internet and e-services", text: "Browsing, email, online forms, digital payments" }
      ],
      careers: ["Government job applicant", "Office assistant", "Data entry operator"]
    },
    {
      courseId: 2, duration: "2 months",
      about: "Learn everything in MS-CIT without the exam: typing, Office and Internet with plenty of practice.",
      learn: ["Typing with speed and accuracy", "Windows and file management", "Word, Excel and PowerPoint", "Internet and email", "Confidence to use a computer at work"],
      syllabus: [
        { id: 1, title: "Computer basics", text: "Parts of a computer, Windows, files" },
        { id: 2, title: "Typing", text: "Keyboard practice, speed building" },
        { id: 3, title: "Office tools", text: "Word, Excel, PowerPoint basics" },
        { id: 4, title: "Internet", text: "Browsing, email, online forms" }
      ],
      careers: ["Office assistant", "Data entry operator", "Receptionist"]
    },
    {
      courseId: 3, duration: "2 months",
      about: "Learn Excel the way offices use it, from formulas to pivot tables and ready-to-print MIS reports.",
      learn: ["Formulas and functions used in every office", "Lookup functions and data validation", "Pivot tables, charts and dashboards", "MIS reports and printing", "Shortcuts that save hours"],
      syllabus: [
        { id: 1, title: "Excel basics", text: "Cells, formats, conditional formatting, printing" },
        { id: 2, title: "Formulas and functions", text: "Logical, text, date and math functions" },
        { id: 3, title: "Lookup functions", text: "VLOOKUP, HLOOKUP, XLOOKUP, INDEX MATCH" },
        { id: 4, title: "Pivot tables and MIS", text: "Pivot tables, charts, dashboards, validation" }
      ],
      careers: ["MIS executive", "Data entry operator", "Office assistant"]
    },
    {
      courseId: 4, duration: "2 months",
      about: "Learn accounting on Tally Prime from vouchers to final accounts, with GST entries.",
      learn: ["Company creation and ledgers", "Vouchers, trial balance, profit and loss", "Balance sheet", "GST entries and returns", "Practical accounting with real examples"],
      syllabus: [
        { id: 1, title: "Accounting basics", text: "Debit, credit, ledgers, groups" },
        { id: 2, title: "Vouchers", text: "Payment, receipt, journal, contra, sales, purchase" },
        { id: 3, title: "Final accounts", text: "Trial balance, profit and loss, balance sheet" },
        { id: 4, title: "GST in Tally", text: "GST ledgers, invoices, returns" }
      ],
      careers: ["Accounts assistant", "Tally operator", "Billing executive"]
    },
    {
      courseId: 5, duration: "4 months",
      about: "Advanced Tally with 26 modules covering GST returns, TDS, e-way bill, inventory and MIS reports.",
      learn: ["GST returns and reconciliation", "TDS and e-way bill", "Inventory and stock management", "Payroll basics", "MIS reports"],
      syllabus: [
        { id: 1, title: "GST in depth", text: "Returns, input credit, reconciliation" },
        { id: 2, title: "TDS and e-way bill", text: "TDS entries, e-way bill generation" },
        { id: 3, title: "Inventory", text: "Stock items, godowns, batches, reports" },
        { id: 4, title: "MIS and audit", text: "Reports, data export, audit features" }
      ],
      careers: ["Accountant", "GST executive", "Tally expert"]
    },
    {
      courseId: 6, duration: "3 months",
      about: "Design and build responsive websites with HTML, CSS, JavaScript and WordPress, then host them live.",
      learn: ["HTML and CSS layouts", "JavaScript basics", "WordPress websites", "Domain name and web hosting", "Live projects for your portfolio"],
      syllabus: [
        { id: 1, title: "HTML and CSS", text: "Tags, forms, flexbox, responsive layouts" },
        { id: 2, title: "JavaScript", text: "Variables, functions, events, DOM" },
        { id: 3, title: "WordPress", text: "Themes, plugins, pages, WooCommerce basics" },
        { id: 4, title: "Hosting", text: "Domain, hosting, publishing a website" }
      ],
      careers: ["Web designer", "WordPress developer", "Freelance web designer"]
    },
    {
      courseId: 7, duration: "4 months",
      about: "Professional design software training with Corel Draw, Photoshop and InDesign through practical projects.",
      learn: ["Corel Draw for logos and print", "Photoshop for photo editing", "InDesign for layouts", "Design for print and social media", "Portfolio projects"],
      syllabus: [
        { id: 1, title: "Corel Draw", text: "Shapes, text, logos, visiting cards" },
        { id: 2, title: "Photoshop", text: "Layers, selections, retouching, banners" },
        { id: 3, title: "InDesign", text: "Pages, grids, brochures, magazines" },
        { id: 4, title: "Print and export", text: "Colour modes, printing, file formats" }
      ],
      careers: ["Graphic designer", "DTP operator", "Printing press designer"]
    },
    {
      courseId: 8, duration: "6 months",
      about: "A complete digital marketing course: Canva, SEO, social media, Google Ads, website creation and video editing.",
      learn: ["Canva design and branding", "SEO and Google Analytics", "Social media marketing", "Google Ads campaigns", "Website creation and video editing"],
      syllabus: [
        { id: 1, title: "Branding and design", text: "Canva, posts, reels, thumbnails" },
        { id: 2, title: "SEO", text: "Keywords, on-page, off-page, analytics" },
        { id: 3, title: "Social media and ads", text: "Facebook, Instagram, Google Ads" },
        { id: 4, title: "Website and video", text: "Website basics, video editing, content plan" }
      ],
      careers: ["Digital marketer", "Social media executive", "SEO executive"]
    },
    {
      courseId: 9, duration: "6 months",
      about: "Learn to collect, clean and present data with Excel, SQL, Python, R, Power BI and Tableau.",
      learn: ["Advanced Excel for analysis", "SQL queries", "Python and R for data", "Power BI and Tableau dashboards", "Analysis projects"],
      syllabus: [
        { id: 1, title: "Excel and SQL", text: "Formulas, pivot tables, queries, joins" },
        { id: 2, title: "Python and R", text: "Data types, libraries, data cleaning" },
        { id: 3, title: "Visualisation", text: "Power BI, Tableau, dashboards" },
        { id: 4, title: "Projects", text: "Real data sets and reports" }
      ],
      careers: ["Data analyst", "MIS analyst", "Business analyst"]
    },
    {
      courseId: 10, duration: "2 months + 4 months training",
      about: "Learn computer hardware, installation, troubleshooting and networking, followed by hands-on training.",
      learn: ["Assemble a computer", "Install Windows and software", "Troubleshoot hardware faults", "Set up wired and wireless networks", "Hands-on training period"],
      syllabus: [
        { id: 1, title: "Hardware", text: "Parts, assembling, BIOS, upgrades" },
        { id: 2, title: "Software", text: "Windows install, drivers, backup" },
        { id: 3, title: "Troubleshooting", text: "Common faults, repair, printers" },
        { id: 4, title: "Networking", text: "LAN, Wi-Fi, routers, IP addressing" }
      ],
      careers: ["Hardware technician", "Network support engineer", "Desktop support"]
    },
    {
      courseId: 11, duration: "1 year",
      about: "Information Technology and Computer Science subjects for 11th standard students, in Arts, Commerce and Science.",
      learn: ["Board syllabus coverage", "Practical file support", "Programming basics", "Exam preparation", "Doubt solving sessions"],
      syllabus: [
        { id: 1, title: "Theory", text: "Board syllabus chapters" },
        { id: 2, title: "Practicals", text: "Practical file and journal work" },
        { id: 3, title: "Programming basics", text: "Logic, flowcharts, simple programs" },
        { id: 4, title: "Exam preparation", text: "Tests and revision" }
      ],
      careers: ["Higher studies in IT", "Programming", "Computer applications"]
    },
    {
      courseId: 12, duration: "1 year",
      about: "Information Technology and Computer Science subjects for 12th standard students, in Arts, Commerce and Science.",
      learn: ["Board syllabus coverage", "Practical file support", "Programming and databases", "Exam preparation", "Doubt solving sessions"],
      syllabus: [
        { id: 1, title: "Theory", text: "Board syllabus chapters" },
        { id: 2, title: "Practicals", text: "Practical file and journal work" },
        { id: 3, title: "Programming", text: "Logic, programs, databases" },
        { id: 4, title: "Exam preparation", text: "Tests and revision" }
      ],
      careers: ["Higher studies in IT", "Programming", "Computer applications"]
    },
    {
      courseId: 13, duration: "3 months",
      about: "The government-recognised MS-CIT course taught in Marathi for comfortable learning.",
      learn: ["Typing and Windows basics", "Word, Excel and PowerPoint", "Internet and email", "Digital payments", "Government-valid certificate"],
      syllabus: [
        { id: 1, title: "Computer basics", text: "Computer parts, Windows, files" },
        { id: 2, title: "Word processing", text: "Documents, formatting, printing" },
        { id: 3, title: "Spreadsheets and presentations", text: "Excel and PowerPoint" },
        { id: 4, title: "Internet", text: "Browsing, email, e-services" }
      ],
      careers: ["Government job applicant", "Office assistant", "Data entry operator"]
    },
    {
      courseId: 14, duration: "3 months",
      about: "Start programming with C: logic, syntax and practical programs from the basics.",
      learn: ["Programming logic", "Variables, loops and functions", "Arrays and strings", "Pointers and structures", "Practical programs"],
      syllabus: [
        { id: 1, title: "Basics", text: "Syntax, data types, operators" },
        { id: 2, title: "Control flow", text: "If, switch, loops" },
        { id: 3, title: "Functions and arrays", text: "Functions, arrays, strings" },
        { id: 4, title: "Pointers and files", text: "Pointers, structures, file handling" }
      ],
      careers: ["Junior programmer", "Software trainee", "Support engineer"]
    },
    {
      courseId: 15, duration: "3 months",
      about: "Object-oriented programming with C++, with practical programs after every topic.",
      learn: ["C++ syntax and logic", "Classes and objects", "Inheritance and polymorphism", "File handling", "Practical programs"],
      syllabus: [
        { id: 1, title: "Basics", text: "Syntax, loops, functions" },
        { id: 2, title: "OOP", text: "Classes, objects, constructors" },
        { id: 3, title: "Inheritance", text: "Inheritance, polymorphism, overloading" },
        { id: 4, title: "Files and STL", text: "File handling, templates, STL" }
      ],
      careers: ["Junior programmer", "Software trainee", "Game developer trainee"]
    },
    {
      courseId: 16, duration: "4 months",
      about: "Core Java and Advance Java programming with projects.",
      learn: ["Core Java and OOP", "Collections and exceptions", "JDBC and databases", "Servlets and JSP", "Mini project"],
      syllabus: [
        { id: 1, title: "Core Java", text: "Syntax, OOP, strings" },
        { id: 2, title: "Collections", text: "Collections, exceptions, threads" },
        { id: 3, title: "Database", text: "JDBC, SQL" },
        { id: 4, title: "Web", text: "Servlets, JSP, mini project" }
      ],
      careers: ["Java developer", "Software engineer", "Backend trainee"]
    },
    {
      courseId: 17, duration: "3 months",
      about: "Learn Python from the basics, with practical programs and small projects.",
      learn: ["Python syntax and logic", "Lists, dictionaries and functions", "File handling", "Libraries and modules", "Small projects"],
      syllabus: [
        { id: 1, title: "Basics", text: "Syntax, variables, loops" },
        { id: 2, title: "Data structures", text: "Lists, tuples, dictionaries" },
        { id: 3, title: "Functions and OOP", text: "Functions, classes, modules" },
        { id: 4, title: "Projects", text: "Files, libraries, mini projects" }
      ],
      careers: ["Python developer", "Automation executive", "Data analyst trainee"]
    },
    {
      courseId: 18, duration: "4 months",
      about: "Build applications with the .NET framework, C# and SQL Server.",
      learn: ["C# programming", "Windows and web applications", "ASP.NET", "SQL Server connectivity", "Mini project"],
      syllabus: [
        { id: 1, title: "C# basics", text: "Syntax, OOP, collections" },
        { id: 2, title: "Windows apps", text: "Forms, controls, events" },
        { id: 3, title: "ASP.NET", text: "Web forms, MVC basics" },
        { id: 4, title: "Database", text: "SQL Server, ADO.NET, mini project" }
      ],
      careers: [".NET developer", "Software engineer", "Web developer"]
    },
    {
      courseId: 19, duration: "2 months",
      about: "Learn to create databases and write queries with SQL.",
      learn: ["Create tables and relationships", "Write SELECT queries", "Joins and subqueries", "Functions and grouping", "Practical exercises"],
      syllabus: [
        { id: 1, title: "Database basics", text: "Tables, keys, relations" },
        { id: 2, title: "Queries", text: "SELECT, WHERE, ORDER BY" },
        { id: 3, title: "Joins", text: "Inner, outer joins, subqueries" },
        { id: 4, title: "Advanced", text: "Functions, grouping, views, procedures" }
      ],
      careers: ["Database assistant", "MIS executive", "Data analyst trainee"]
    },
    {
      courseId: 20, duration: "3 months",
      about: "Build dynamic websites with PHP and MySQL, from forms to a complete project.",
      learn: ["PHP syntax and logic", "Forms and sessions", "MySQL connectivity", "CRUD applications", "Mini project"],
      syllabus: [
        { id: 1, title: "PHP basics", text: "Syntax, arrays, functions" },
        { id: 2, title: "Forms and sessions", text: "Forms, cookies, sessions" },
        { id: 3, title: "MySQL", text: "Database design, queries" },
        { id: 4, title: "Project", text: "CRUD application, login system" }
      ],
      careers: ["PHP developer", "Web developer", "WordPress developer"]
    },
    {
      courseId: 21, duration: "4 months",
      about: "Learn to build Android apps, from layouts to databases and publishing.",
      learn: ["Android Studio basics", "Layouts and activities", "Data storage", "APIs and networking", "Publishing an app"],
      syllabus: [
        { id: 1, title: "Basics", text: "Android Studio, project structure" },
        { id: 2, title: "UI", text: "Layouts, widgets, activities" },
        { id: 3, title: "Data", text: "SQLite, shared preferences, APIs" },
        { id: 4, title: "Publishing", text: "Testing, signing, Play Store" }
      ],
      careers: ["Android developer", "App developer", "Mobile tester"]
    },
    {
      courseId: 22, duration: "3 years (6 semesters)",
      about: "A complete software programming course covering front end, back end and databases.",
      learn: ["HTML, CSS and JavaScript", "A back-end language", "Databases", "APIs and frameworks", "Full projects"],
      syllabus: [
        { id: 1, title: "Front end", text: "HTML, CSS, JavaScript, framework" },
        { id: 2, title: "Back end", text: "Server language, APIs" },
        { id: 3, title: "Databases", text: "SQL, NoSQL" },
        { id: 4, title: "Projects", text: "Deployment, full-stack applications" }
      ],
      careers: ["Full stack developer", "Software engineer", "Web developer"]
    },
    {
      courseId: 23, duration: "4 months",
      about: "A certificate course in ethical hacking and cyber security fundamentals.",
      learn: ["Networking basics", "Security threats", "Scanning and testing tools", "Web application security", "Report writing"],
      syllabus: [
        { id: 1, title: "Foundations", text: "Networking, Linux, security basics" },
        { id: 2, title: "Threats", text: "Malware, phishing, attacks" },
        { id: 3, title: "Testing", text: "Scanning, vulnerability tools" },
        { id: 4, title: "Web security", text: "Common web flaws and defences" }
      ],
      careers: ["Security analyst trainee", "Network security support", "Cyber security trainee"]
    },
    {
      courseId: 24, duration: "4 months",
      about: "A certificate course in Artificial Intelligence with Python and practical AI tools.",
      learn: ["Python for AI", "Machine learning basics", "Data preparation", "AI tools and prompts", "Mini project"],
      syllabus: [
        { id: 1, title: "Foundations", text: "Python, maths for AI" },
        { id: 2, title: "Machine learning", text: "Models, training, testing" },
        { id: 3, title: "Data", text: "Cleaning, features, evaluation" },
        { id: 4, title: "Applications", text: "AI tools, prompts, mini project" }
      ],
      careers: ["AI trainee", "Data analyst trainee", "Automation executive"]
    },
    {
      courseId: 25, duration: "3 months",
      about: "Cisco networking certification training with lab practice.",
      learn: ["Network fundamentals", "Routing and switching", "IP addressing and subnetting", "Lab configuration", "Certification preparation"],
      syllabus: [
        { id: 1, title: "Fundamentals", text: "OSI model, devices, cabling" },
        { id: 2, title: "Switching", text: "VLANs, trunking" },
        { id: 3, title: "Routing", text: "Static and dynamic routing, subnetting" },
        { id: 4, title: "Certification", text: "Lab practice and mock tests" }
      ],
      careers: ["Network engineer", "Network support", "System administrator"]
    },
    {
      courseId: 26, duration: "3 months",
      about: "AutoCAD 2D and 3D for civil, interior, mechanical, architectural and electrical drawings.",
      learn: ["2D drafting", "3D modelling", "Dimensioning and layers", "Plotting and printing", "Industry drawings"],
      syllabus: [
        { id: 1, title: "2D drafting", text: "Lines, shapes, layers, dimensions" },
        { id: 2, title: "Editing", text: "Modify tools, blocks, text" },
        { id: 3, title: "3D modelling", text: "Solids, surfaces, rendering" },
        { id: 4, title: "Plotting", text: "Layouts, printing, file export" }
      ],
      careers: ["CAD draftsman", "Interior drafter", "Civil draftsman"]
    },
    {
      courseId: 27, duration: "6 months",
      about: "3D animation and creative media training with modelling, texturing and rendering.",
      learn: ["3D modelling", "Texturing and lighting", "Character animation", "Rendering", "Showreel projects"],
      syllabus: [
        { id: 1, title: "Modelling", text: "Shapes, meshes, objects" },
        { id: 2, title: "Texturing and lighting", text: "Materials, lights, cameras" },
        { id: 3, title: "Animation", text: "Keyframes, rigging, motion" },
        { id: 4, title: "Rendering", text: "Final output, showreel" }
      ],
      careers: ["3D animator", "Visual effects trainee", "Creative media artist"]
    },
    {
      courseId: 28, duration: "3 years",
      about: "Academic support classes for B.Sc IT students, covering university subjects and practicals.",
      learn: ["University syllabus coverage", "Practical journals", "Programming practice", "Exam preparation", "Doubt solving"],
      syllabus: [
        { id: 1, title: "Theory", text: "Subject-wise concepts" },
        { id: 2, title: "Practicals", text: "Programs and journals" },
        { id: 3, title: "Projects", text: "Project guidance" },
        { id: 4, title: "Exams", text: "Revision and tests" }
      ],
      careers: ["Software developer", "IT executive", "Higher studies"]
    },
    {
      courseId: 29, duration: "3 years",
      about: "Academic support classes for BCA students, covering university subjects and practicals.",
      learn: ["University syllabus coverage", "Practical journals", "Programming practice", "Exam preparation", "Doubt solving"],
      syllabus: [
        { id: 1, title: "Theory", text: "Subject-wise concepts" },
        { id: 2, title: "Practicals", text: "Programs and journals" },
        { id: 3, title: "Projects", text: "Project guidance" },
        { id: 4, title: "Exams", text: "Revision and tests" }
      ],
      careers: ["Software developer", "IT executive", "Higher studies"]
    }
  ]
};
