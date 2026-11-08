/* ==========================================================================
   branches.js  -  Weblink Computers
   The 5 branches (single source for footer, Branches page and Contact page).
   Addresses and phone numbers were read from the brochure: CLIENT TO VERIFY.
   area = used for the counts on the Branches page.
   whatsappNumber = the branch's own WhatsApp number (digits with country code 91; CLIENT TO VERIFY - branch 1's first phone is a landline, so a mobile is used).
   mapQuery = a SHORT search text used for the Google Map and the "Get directions" link (the long postal
   address often confuses Google Maps). If a pin is wrong, edit that branch's mapQuery.
   Global: branchesData
   ========================================================================== */

const branchesData = [
  {
    id: 1,
    area: "Bhayandar West",
    whatsappNumber: "919324592002",
    mapQuery: "Weblink Computers, Venkatesh Plaza, Balaji Nagar, Bhayandar West, Mumbai 401101",
    shortName: "Bhayandar (W) – Venkatesh Plaza",
    address: "Shop No. 18, Venkatesh Plaza Bldg., Balaji Nagar, Near To Station, Bhayandar (West) - 401 101.",
    phones: ["022-28193821", "9324592002", "9320124885"]
  },
  {
    id: 2,
    area: "Bhayandar West",
    whatsappNumber: "919324592002",
    mapQuery: "Weblink Computers, Kamla Park, 60 Feet Road, Bhayandar West, Mumbai 401101",
    shortName: "Bhayandar (W) – Kamla Park",
    address: "001, Ground Floor, B3-Kamla Park, 60 Feet Road, Behind Navrang Hotel, Bhayandar (West) - 401 101.",
    phones: ["9324592002", "7045270394", "9004422384"]
  },
  {
    id: 3,
    area: "Bhayandar East",
    whatsappNumber: "919324592002",
    mapQuery: "Weblink Computers, Ostwal Shopping Centre, Jesal Park, Bhayandar East, Mumbai 401105",
    shortName: "Bhayandar (E) – Jesal Park",
    address: "206, 2nd Floor, Ostwal Shopping Centre, Opp. Indravarun Hall, Near To Station, Jesal Park, Bhayandar (East) - 401 105.",
    phones: ["9324592002", "7045270394", "9320124886"]
  },
  {
    id: 4,
    area: "Bhayandar East",
    whatsappNumber: "917498549301",
    mapQuery: "Weblink Computers, Maneebhadra Tower, Indralok Phase 4, Bhayandar East, Mumbai 401105",
    shortName: "Bhayandar (E) – Indralok Ph-4",
    address: "Shop No. 11, Gr. Floor, Maneebhadra Tower, Near Tapovan School, Opp. To Relevant School, Indralok Phase - 4, Bhayandar (East) - 401 105.",
    phones: ["7498549301", "7498549302"]
  },
  {
    id: 5,
    area: "Bhayandar East",
    whatsappNumber: "919324592002",
    mapQuery: "Weblink Computers, Sonam Pushpanjali, Golden Nest, Mira Bhayandar Road, Bhayandar East, Mumbai 401105",
    shortName: "Bhayandar (E) – Golden Nest",
    address: "Shop No. 26, Sonam Pushpanjali Bldg. No. 9, Golden Nest, Phase - 3, Near Queen Mary's High School, Near Blue Moon Club (now known as Mauli Club), Mira-Bhayandar Road, Bhayandar (East) - 401 105.",
    phones: ["9324592002", "9320124887"]
  }
];
