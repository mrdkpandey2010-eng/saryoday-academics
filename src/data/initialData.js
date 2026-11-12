// Pre-seeded database for Saryoday Academics, Gorakhpur
// English Primary with Hindi Bilingual Support for IIT-JEE & NEET Coaching

export const initialInstituteInfo = {
  name: "Saryoday Academics",
  hindiName: "सर्वोदय एकेडेमिक्स",
  tagline: "Building Strong Foundation for Board Exams, IIT-JEE & NEET",
  hindiTagline: "बोर्ड परीक्षा, IIT-JEE एवं NEET में सफलता का विश्वसनीय संस्थान",
  address: "B-Colony, Near Geeta Vatika Mandir & Airtel Store, Shahpur, Gorakhpur, Uttar Pradesh – 273006",
  phones: ["+91 84001 00814", "+91 84001 00813"],
  whatsapp: "+918400100814",
  email: "saryodayacademics@gmail.com",
  timings: "Monday – Saturday: 07:00 AM to 07:00 PM (Sunday Special Doubt Sessions)",
  timingsHi: "सोमवार - शनिवार: प्रातः 07:00 AM से सायं 07:00 PM (रविवार: विशेष डाउट सत्र)",
  tickerNotice: "📢 Admissions Open for Session 2025-26 • Saryoday Scholarship Test (SST) Registration Live • 90-Day Booster Crash Course for Class 10th & 12th Board Aspirants • Sunday NTA Pattern IIT-JEE & NEET All-India Mock Tests with 1-on-1 Doubt Sessions • Shahpur Gorakhpur Campus Helpline: +91 8400100814 📢",
  tickerNoticeHi: "📢 सत्र 2025-26 के लिए Saryoday Scholarship Test (SST) रजिस्ट्रेशन प्रारंभ • कक्षा 10वीं व 12वीं बोर्ड परीक्षार्थियों हेतु 90-दिवसीय क्रैश कोर्स 15 नवम्बर से • प्रत्येक रविवार NTA पैटर्न पर NEET व JEE मॉक टेस्ट एवं विशेष डाउट क्लासेज • शाहपुर गोरखपुर ब्रांच में प्रवेश हेतु कॉल करें: 8400100814 📢",
  director: {
    name: "Er. R.K. Mishra",
    nameHi: "इंजी. आर.के. मिश्रा",
    qualification: "B.Tech (IIT BHU), 14+ Years Experience",
    qualificationHi: "बी.टेक (आईआईटी बीएचयू), 14+ वर्ष शिक्षण अनुभव",
    role: "Director & Senior Physics Faculty",
    roleHi: "निदेशक एवं विभागाध्यक्ष भौतिकी",
    experienceBadge: "14+ Years Teaching Experience",
    experienceBadgeHi: "14+ वर्ष का शिक्षण अनुभव",
    visionHeadline: '"Our mission is to empower every Gorakhpur student to secure top ranks in premier national institutes."',
    visionHeadlineHi: '"गोरखपुर के हर छात्र को देश के शीर्ष संस्थानों में पहुंचाना हमारा ध्येय है"',
    message: "At Saryoday Academics, our mission is not merely textbook rote-learning, but instilling deep conceptual clarity and scientific inquiry in every student. We bring Kota and Delhi level coaching right here to Gorakhpur with personal mentorship.\n\nWe firmly believe that every child possesses immense cognitive potential. What transforms effort into rank is systematic conceptual mentoring, daily practice problem (DPP) discipline, and relentless 1-on-1 doubt resolution.",
    messageHi: "सर्वोदय एकेडेमिक्स में हमारा लक्ष्य सिर्फ किताबी ज्ञान देना नहीं, बल्कि प्रत्येक छात्र के भीतर तार्किक सोच और विषय की गहरी समझ विकसित करना है। गोरखपुर के छात्रों को महानगरों जैसा गुणवत्तापूर्ण शिक्षण उनके अपने शहर में प्रदान करना ही हमारा संकल्प है।\n\nहमारा मानना है कि हर बच्चे के भीतर असीम क्षमता होती है। आवश्यकता केवल सही मार्गदर्शन, निरंतर अभ्यास और संकोच-रहित डाउट क्लीयरिंग की होती है। सर्वोदय में हम प्रत्येक विद्यार्थी पर व्यक्तिगत ध्यान देते हैं।",
    photo: "./director-pic.jpg"
  },
  established: "2018",
  affiliations: "CBSE | ICSE | UP Board | IIT-JEE (Main & Adv) | NEET (UG)",
  instagram: "https://www.instagram.com/saryoday_gorakhpur/",
  facebook: "https://www.facebook.com/saryoday/",
  youtube: "https://www.youtube.com/@saryodayacademics",
  playstore: "https://play.google.com/store/apps/details?id=com.saryoday.academics"
};

export const initialBanners = [
  {
    id: 1,
    imageOpacity: 30,
    highlightText: "IIT-JEE & NEET Premier Coaching",
    badge: "Admissions Open Session 2025-26",
    badgeHi: "सत्र 2025-26 प्रवेश प्रारंभ",
    title: "Committed to Top Ranks in IIT-JEE & NEET",
    titleHi: "IIT-JEE & NEET में सर्वश्रेष्ठ परिणाम का संकल्प",
    subtitle: "Saryoday Academics, Shahpur Gorakhpur — Limited Batch Size, 1-on-1 Mentorship & Distinguished Faculty",
    subtitleHi: "सर्वोदय एकेडेमिक्स, शाहपुर गोरखपुर - सीमित सीटें, व्यक्तिगत मार्गदर्शन एवं उत्कृष्ट फैकल्टी",
    ctaPrimary: "Apply / Register Online",
    ctaPrimaryHi: "ऑनलाइन प्रवेश / रजिस्ट्रेशन करें",
    ctaSecondary: "Explore Programs",
    ctaSecondaryHi: "कोर्स विवरण देखें",
    bgGradient: "from-blue-900 via-indigo-900 to-slate-900",
    accentColor: "border-orange-500",
    image: "./banner.jpg"
  },
  {
    id: 2,
    imageOpacity: 30,
    highlightText: "Up to 100% Scholarship",
    badge: "Scholarship Exam (SST 2025)",
    badgeHi: "छात्रवृत्ति परीक्षा (SST 2025)",
    title: "Saryoday Scholarship Test (SST) — Up to 100% Fee Waiver",
    titleHi: "Saryoday Scholarship Test (SST) - 100% तक फीस माफी",
    subtitle: "Special scholarship examination for meritorious students of classes 6th to 12th. Empower your academic dreams.",
    subtitleHi: "कक्षा 6वीं से 12वीं तक के मेधावी छात्रों के लिए विशेष छात्रवृत्ति परीक्षा। अपनी प्रतिभा को दें नई उड़ान।",
    ctaPrimary: "Register for SST 2025",
    ctaPrimaryHi: "स्कॉलरशिप टेस्ट हेतु रजिस्टर करें",
    ctaSecondary: "Download Syllabus",
    ctaSecondaryHi: "सिलेबस डाउनलोड करें",
    bgGradient: "from-orange-950 via-amber-900 to-slate-900",
    accentColor: "border-amber-400",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    imageOpacity: 30,
    highlightText: "Guaranteed 95%+ Board Success",
    badge: "Class 9th to 12th Board Booster",
    badgeHi: "कक्षा 9वीं, 10वीं, 11वीं एवं 12वीं बोर्ड स्पेशल",
    title: "Guaranteed Preparation for 95%+ in CBSE, ICSE & UP Boards",
    titleHi: "CBSE, ICSE एवं UP Board में 95%+ स्कोर की गारंटीड तैयारी",
    subtitle: "Daily Practice Problem (DPP) sheets, weekly chapter tests and dedicated faculty for instant doubt clearance.",
    subtitleHi: "दैनिक अभ्यास पत्रक (DPP), साप्ताहिक टेस्ट सीरीज और विशेषज्ञ शिक्षकों द्वारा व्यक्तिगत डाउट निवारण",
    ctaPrimary: "Book Free Trial Class",
    ctaPrimaryHi: "निःशुल्क ट्रायल क्लास बुक करें",
    ctaSecondary: "Meet Faculty Team",
    ctaSecondaryHi: "फैकल्टी टीम देखें",
    bgGradient: "from-emerald-950 via-teal-900 to-slate-900",
    accentColor: "border-emerald-400",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
  }
];

export const initialNotices = [
  {
    id: "not-01",
    title: "Saryoday Scholarship Test (SST 2025) Registration Schedule Announced",
    titleHi: "Saryoday Scholarship Test (SST 2025) की रजिस्ट्रेशन तिथि घोषित",
    date: "10 Nov 2026",
    dateHi: "10 नवम्बर 2026",
    category: "Exam",
    target: "all",
    isNew: true,
    content: "The annual scholarship test for Session 2025-26 will be conducted on November 24th. Register online or at the Shahpur office to avail up to 100% scholarship on tuition fees.",
    contentHi: "सत्र 2025-26 के लिए छात्रवृत्ति परीक्षा 24 नवम्बर को आयोजित होगी। 100% तक स्कॉलरशिप पाने के लिए ऑनलाइन या ऑफिस से फॉर्म भरें।"
  },
  {
    id: "not-02",
    title: "Special 90-Day Crash Course Commencing for Class 10th & 12th Board Aspirants",
    titleHi: "कक्षा 10वीं एवं 12वीं बोर्ड परीक्षार्थियों हेतु स्पेशल क्रैश कोर्स प्रारंभ",
    date: "08 Nov 2026",
    dateHi: "08 नवम्बर 2026",
    category: "Academic",
    target: "students",
    isNew: true,
    content: "Super 90-day crash course covering last 10 years' chapter-wise board exam question analysis starts on November 15th at Shahpur campus.",
    contentHi: "बोर्ड परीक्षा 2025-26 की तैयारी के लिए विगत 10 वर्षों के प्रश्नपत्रों के विश्लेषण सहित 90 दिवसीय सुपर क्रैश कोर्स 15 नवम्बर से शुरू हो रहा है।"
  },
  {
    id: "not-03",
    title: "Parent-Teacher Meeting (PTM) Scheduled for Upcoming Sunday",
    titleHi: "आगामी रविवार को अभिभावक-शिक्षक बैठक (PTM) का आयोजन",
    date: "05 Nov 2026",
    dateHi: "05 नवम्बर 2026",
    category: "Meeting",
    target: "parents",
    isNew: false,
    content: "PTM will be organized on Sunday between 10:00 AM and 1:00 PM to discuss individual student progress reports and monthly test evaluations.",
    contentHi: "अक्टूबर माह के मासिक टेस्ट की प्रगति रिपोर्ट साझा करने हेतु रविवार सुबह 10:00 बजे से दोपहर 1:00 बजे तक PTM आयोजित की जाएगी।"
  },
  {
    id: "not-04",
    title: "NEET & JEE Sunday All-India NTA Pattern Mock Test Series",
    titleHi: "NEET & JEE संडे स्पेशल ऑल-इंडिया मॉक टेस्ट सीरीज",
    date: "01 Nov 2026",
    dateHi: "01 नवम्बर 2026",
    category: "Test",
    target: "students",
    isNew: false,
    content: "Real-time NTA pattern offline and computer-based mock tests conducted every Sunday from 9:00 AM to 12:00 PM followed by 1-on-1 doubt analysis.",
    contentHi: "प्रत्येक रविवार प्रातः 9 बजे से दोपहर 12 बजे तक NTA पैटर्न पर आधारित ऑफलाइन एवं ऑनलाइन मॉक टेस्ट का आयोजन किया जा रहा है।"
  }
];

export const initialCourses = [
  {
    id: "c-01",
    code: "JEE-TAR",
    title: "IIT-JEE (Main + Advanced) 2-Year Classroom Program",
    hindiTitle: "आईआईटी-जेईई (मेन + एडवांस्ड) 2 वर्षीय क्लासरूम प्रोग्राम",
    class: "Class 11th & 12th (PCM)",
    hindiClass: "11वीं एवं 12वीं (PCM)",
    targetExam: "JEE Main & Advanced",
    duration: "2 Years (4 Hours Daily)",
    hindiDuration: "2 वर्ष (प्रतिदिन 4 घंटे)",
    fee: "₹45,000 / Year",
    hindiFee: "₹45,000 / वर्ष",
    features: [
      "In-depth mastery of Physics, Chemistry and Advanced Mathematics",
      "Daily Practice Problem (DPP) sheets with 50,000+ curated question bank",
      "Weekly Computer-Based Test (CBT) series with All-India percentile rank",
      "Dedicated 1-on-1 daily doubt resolution counters & library access"
    ],
    featuresHi: [
      "भौतिकी, रसायन एवं गणित के अध्यायों का गहन विश्लेषण",
      "दैनिक अभ्यास पत्रक (DPP) एवं 50,000+ बहुविकल्पीय प्रश्नों का संग्रह",
      "साप्ताहिक कंप्यूटर आधारित टेस्ट (CBT) एवं रैंक एनालिसिस",
      "अलग से डाउट काउंटर एवं लाइब्रेरी की पूर्ण सुविधा"
    ],
    category: "Competitive",
    badge: "Most Popular",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "c-02",
    code: "NEET-TAR",
    title: "NEET (UG) Medical Target & Foundation Batch",
    hindiTitle: "नीट (UG) मेडिकल टारगेट एवं फाउंडेशन बैच",
    class: "Class 11th, 12th & Droppers (PCB)",
    hindiClass: "11वीं, 12वीं एवं 12th Pass Dropper (PCB)",
    targetExam: "NEET UG",
    duration: "1 or 2 Years (4.5 Hours Daily)",
    hindiDuration: "1 या 2 वर्ष (प्रतिदिन 4.5 घंटे)",
    fee: "₹42,000 / Year",
    hindiFee: "₹42,000 / वर्ष",
    features: [
      "100% NCERT line-by-line coverage for Biology, Chemistry and Physics",
      "Last 25 years NEET and AIPMT chapter-wise solved question bank",
      "40+ full-length real exam simulation tests conducted on official OMR sheets",
      "Special motivational and medical counseling sessions by senior doctors"
    ],
    featuresHi: [
      "NCERT आधारित 100% लाइन-बाय-लाइन कवरेज (Biology, Chemistry, Physics)",
      "विगत 25 वर्षों के NEET/AIPMT प्रश्नों का चैप्टर-वाइज हल",
      "ओएमआर शीट पर वास्तविक परीक्षा माहौल में 40+ फुल लेंथ टेस्ट",
      "वरिष्ठ डॉक्टरों एवं मेडिकल फैकल्टी द्वारा स्पेशल मोटिवेशनल सेशन्स"
    ],
    category: "Competitive",
    badge: "High Selection Rate",
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: "c-03",
    code: "BOARD-10-12",
    title: "Class 10th & 12th Board Booster Program",
    hindiTitle: "कक्षा 10वीं एवं 12वीं बोर्ड बूस्टर (CBSE/ICSE/UP Board)",
    class: "Class 10th & 12th (All Streams)",
    hindiClass: "10th & 12th All Streams",
    targetExam: "CBSE / ICSE / UP Board",
    duration: "Full Academic Session",
    hindiDuration: "पूर्ण शैक्षणिक सत्र",
    fee: "₹24,000 / Year",
    hindiFee: "₹24,000 / वर्ष",
    features: [
      "Complete preparation of Mathematics, Physics, Chemistry, Biology & English",
      "Answer writing presentation skills trained by board exam evaluators",
      "Weekly topic-wise subjective tests with detailed teacher feedback",
      "Special remedial classes and personal mentoring for weaker chapters"
    ],
    featuresHi: [
      "गणित, विज्ञान, भौतिकी, रसायन एवं अंग्रेजी की सम्पूर्ण तैयारी",
      "टॉपर्स द्वारा उपयोग की जाने वाली उत्तर लेखन शैली (Answer Presentation)",
      "प्रत्येक अध्याय के बाद टॉपिक-वाइज सब्जेक्टिव टेस्ट एवं मूल्यांकन",
      "कमजोर छात्रों के लिए विशेष उपचारात्मक कक्षाएं (Remedial Classes)"
    ],
    category: "Board",
    badge: "95%+ Board Track Record",
    color: "from-purple-600 to-indigo-800"
  },
  {
    id: "c-04",
    code: "FOUND-6-9",
    title: "Pre-Foundation Course (Class 6th to 9th)",
    hindiTitle: "प्री-फाउंडेशन कोर्स (कक्षा 6वीं से 9वीं)",
    class: "Classes 6th, 7th, 8th & 9th",
    hindiClass: "कक्षा 6, 7, 8 एवं 9",
    targetExam: "Olympiads, NTSE & Foundation",
    duration: "1 Academic Year",
    hindiDuration: "1 शैक्षणिक वर्ष",
    fee: "₹18,000 / Year",
    hindiFee: "₹18,000 / वर्ष",
    features: [
      "Building strong intuition in Science, Mathematics and Mental Aptitude",
      "Early preparation for International Olympiads (SOF, Silverzone, NSTSE)",
      "Scientific thinking, laboratory curiosity and problem-solving workshops",
      "Continuous student evaluation with parent progress tracking"
    ],
    featuresHi: [
      "तार्किक क्षमता (Mental Ability & Aptitude) का विकास",
      "साइंस एवं मैथ्स के बेसिक फंडामेंटल्स की मजबूत नींव",
      "इंटरनेशनल साइंस व मैथ ओलंपियाड (SOF, Silverzone) की तैयारी",
      "छात्रों में वैज्ञानिक सोच व समस्या समाधान कौशल को बढ़ावा"
    ],
    category: "Foundation",
    badge: "Future Ready",
    color: "from-amber-600 to-orange-700"
  },
  {
    id: "c-05",
    code: "CRASH-JEE-NEET",
    title: "Fast-Track Crash Course & Test Series",
    hindiTitle: "फास्ट-ट्रैक क्रैश कोर्स एवं ऑल-यूपी टेस्ट सीरीज",
    class: "Class 12th & Droppers",
    hindiClass: "12वीं एवं 12th Pass",
    targetExam: "Upcoming JEE / NEET / CUET",
    duration: "90 to 120 Days",
    hindiDuration: "3 से 4 माह",
    fee: "₹14,999 (Complete Program)",
    hindiFee: "₹14,999 (सम्पूर्ण कोर्स)",
    features: [
      "High-yield chapter rapid revision with concise formula mind maps",
      "Shortcut tricks, time-management strategies and negative-marking control",
      "30+ part syllabus tests and 15+ full-length mock examinations",
      "Instant 1-on-1 video and classroom doubt resolution"
    ],
    featuresHi: [
      "महत्वपूर्ण अध्यायों का त्वरित रिवीजन एवं शॉर्ट नोट्स",
      "फार्मूला शीट्स, माइंड मैप्स और शॉर्टकट ट्रिक्स",
      "30+ पार्ट टेस्ट एवं 15+ फुल सिलेबस मॉक टेस्ट",
      "विस्तृत प्रश्न विश्लेषण एवं वीडियो सॉल्यूशन"
    ],
    category: "Crash Course",
    badge: "Fast Results",
    color: "from-rose-600 to-pink-700"
  }
];

export const initialFaculty = [
  {
    id: "f-01",
    name: "Er. R.K. Mishra",
    nameHi: "इंजी. आर.के. मिश्रा",
    role: "Director & HOD Physics",
    roleHi: "निदेशक एवं विभागाध्यक्ष भौतिकी",
    qualification: "B.Tech (IIT BHU), 14+ Years Exp",
    subject: "Physics (JEE / NEET / 12th Board)",
    subjectHi: "भौतिक विज्ञान (JEE / NEET / 12वीं)",
    experience: "14+ years of premier teaching experience. Guided 500+ students to IITs and NITs.",
    experienceHi: "14+ वर्ष का शिक्षण अनुभव। 500+ छात्रों का IIT/NIT में चयन कराया।",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-02",
    name: "Dr. V.P. Srivastava",
    nameHi: "डॉ. वी.पी. श्रीवास्तव",
    role: "Senior Faculty Chemistry",
    roleHi: "वरिष्ठ प्राध्यापक रसायन विज्ञान",
    qualification: "M.Sc, Ph.D. (Chemistry), 12+ Years Exp",
    subject: "Organic & Physical Chemistry (NEET / JEE)",
    subjectHi: "कार्बनिक एवं भौतिक रसायन (NEET / JEE)",
    experience: "Renowned expert who mentored numerous students to score 170+ marks in NEET Chemistry.",
    experienceHi: "विशेषज्ञ शिक्षक जिन्होंने NEET में छात्रों को रसायन विज्ञान में 170+ अंक दिलाने में मार्गदर्शन किया।",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-03",
    name: "Prof. Ankit Pandey",
    nameHi: "प्रो. अंकित पांडे",
    role: "HOD Mathematics",
    roleHi: "विभागाध्यक्ष गणित",
    qualification: "M.Sc (Mathematics), CSIR NET Qualified",
    subject: "Mathematics (Class 10th-12th & JEE)",
    subjectHi: "गणित (कक्षा 10वीं-12वीं एवं JEE)",
    experience: "Celebrated for simplifying complex Calculus and Coordinate Geometry with shortcut techniques.",
    experienceHi: "कैलकुलस एवं को-ऑर्डिनेट ज्योमेट्री के जटिल प्रश्नों को सरल व रोचक ट्रिक्स से हल कराने के लिए प्रसिद्ध।",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-04",
    name: "Dr. Shalini Singh",
    nameHi: "डॉ. शालिनी सिंह",
    role: "Senior Faculty Biology",
    roleHi: "वरिष्ठ प्राध्यापक जीव विज्ञान",
    qualification: "M.Sc (Botany), Ph.D., 9+ Years Exp",
    subject: "Biology / Botany & Zoology (NEET & 12th)",
    subjectHi: "जीव विज्ञान (NEET एवं 12वीं)",
    experience: "Specialized pedagogy ensuring complete mastery of NCERT diagrams and high-yield concepts.",
    experienceHi: "NCERT के प्रत्येक डायग्राम और कॉन्सेप्ट को छात्रों के दिमाग में बैठाने का विशिष्ट अध्यापन कौशल।",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-05",
    name: "Er. Amit Verma",
    nameHi: "इंजी. अमित वर्मा",
    role: "Faculty Science & Foundation",
    roleHi: "फैकल्टी साइंस एवं प्री-फाउंडेशन",
    qualification: "B.Tech (ECE), 8+ Years Exp",
    subject: "Foundation Science & Mental Ability",
    subjectHi: "फाउंडेशन साइंस एवं मेंटल एबिलिटी",
    experience: "Proven track record in building foundational problem-solving intuition for classes 6th to 10th.",
    experienceHi: "कक्षा 6वीं से 10वीं तक के विद्यार्थियों के मूल आधार को मजबूत करने में विशेष महारत।",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
  }
];

export const initialToppers = [
  {
    id: "top-01",
    name: "Aditya Tripathi",
    nameHi: "आदित्य त्रिपाठी",
    exam: "JEE Advanced 2024",
    rank: "AIR 412 (IIT Kanpur Selection)",
    rankHi: "AIR 412 (आईआईटी कानपुर चयन)",
    score: "99.82 Percentile",
    quote: "Doubt sessions by Mishra Sir and Pandey Sir completely eliminated my fear of Physics and Math.",
    quoteHi: "सर्वोदय एकेडेमिक्स के मिश्रा सर और पांडे सर के डाउट सेशंस ने मेरे फिजिक्स और मैथ्स के डर को पूरी तरह खत्म कर दिया।",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "top-02",
    name: "Priya Singh",
    nameHi: "प्रिया सिंह",
    exam: "NEET (UG) 2024",
    rank: "AIR 894 (AIIMS Gorakhpur)",
    rankHi: "AIR 894 (एम्स गोरखपुर चयन)",
    score: "688 / 720 Marks",
    quote: "Regular OMR test series at Shahpur campus and Shalini Ma'am's personal mentoring were the pillars of my success.",
    quoteHi: "शाहपुर ब्रांच में नियमित ओएमआर टेस्ट और शालिनी मैम का व्यक्तिगत मार्गदर्शन मेरी इस सफलता की रीढ़ रहा।",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "top-03",
    name: "Shivam Gupta",
    nameHi: "शिवम गुप्ता",
    exam: "CBSE Class 12th Board",
    rank: "City District Rank #2",
    rankHi: "गोरखपुर जिला रैंक #2",
    score: "98.6% Marks",
    quote: "The answer presentation techniques taught at Saryoday helped me score a perfect 100/100 in Physics.",
    quoteHi: "बोर्ड परीक्षा के लिए जो उत्तर लेखन तकनीक सर्वोदय में सिखाई गई, उसी के कारण मुझे फिजिक्स और केमिस्ट्री में 100/100 मिले।",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "top-04",
    name: "Anamika Maurya",
    nameHi: "अनामिका मौर्या",
    exam: "UP Board Class 12th",
    rank: "Gorakhpur Division Topper",
    rankHi: "गोरखपुर मंडल टॉपर",
    score: "96.4% Marks",
    quote: "Saryoday Academics' concise notes and daily practice sheets made my entire preparation smooth and focused.",
    quoteHi: "सर्वोदय एकेडेमिक्स के नोट्स और दैनिक अभ्यास ने मेरे पूरे साल के अध्ययन को बहुत सुगम और सटीक बना दिया।",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
  }
];

export const initialAlbums = [
  {
    id: "alb-felicitation",
    title: "Toppers Felicitation and Awards Ceremony",
    titleHi: "वार्षिक टॉपर सम्मान एवं पुरस्कार वितरण",
    hindiTitle: "वार्षिक टॉपर सम्मान एवं पुरस्कार वितरण",
    category: "Felicitation Ceremony",
    categoryHi: "सम्मान समारोह (Felicitation)",
    date: "Session 2024-25",
    dateHi: "सत्र 2024-25",
    description: "Grand annual felicitation celebrating outstanding students who secured premier ranks in IIT-JEE, NEET and Board Exams.",
    descriptionHi: "गोरखपुर के बोर्ड व प्रतियोगी परीक्षाओं (IIT-JEE / NEET) में उत्कृष्ट अंक प्राप्त करने वाले छात्र-छात्राओं का भव्य सम्मान समारोह।",
    coverImage: "./galary.jpg",
    photos: [
      {
        id: "p-fel-01",
        url: "./galary.jpg",
        title: "Main Stage Felicitation Ceremony",
        titleHi: "मुख्य मंच पर पुरस्कार वितरण समारोह",
        caption: "Director and senior faculty conferring medals and trophies",
        captionHi: "निदेशक एवं वरिष्ठ शिक्षकों द्वारा मेडल व स्मृति चिन्ह प्रदान करते हुए"
      },
      {
        id: "p-fel-02",
        url: "./galary1.jpg",
        title: "Meritorious Students Group with Educators",
        titleHi: "शिक्षकों संग मेधावी विद्यार्थियों का समूह",
        caption: "Celebrating high percentile success at Saryoday",
        captionHi: "सफलता का उत्सव मनाते सर्वोदय एकेडेमिक्स के सितारे"
      },
      {
        id: "p-fel-03",
        url: "./galary2.jpg",
        title: "Stage Honors and Inspiration Address",
        titleHi: "मंच सम्मान एवं छात्रों का उत्साहवर्धन",
        caption: "Dedication and systematic practice yielding excellence",
        captionHi: "कठिन परिश्रम और निरंतर अभ्यास द्वारा उत्कृष्ट परीक्षा परिणाम"
      }
    ]
  },
  {
    id: "alb-classroom",
    title: "Smart Classroom Teaching and Interaction",
    titleHi: "स्मार्ट क्लासरूम एवं व्यक्तिगत मार्गदर्शन",
    hindiTitle: "स्मार्ट क्लासरूम एवं व्यक्तिगत मार्गदर्शन",
    category: "Classroom Life",
    categoryHi: "क्लासरूम शिक्षण (Classroom)",
    date: "Session 2024-25",
    dateHi: "सत्र 2024-25",
    description: "Modern classrooms, deep conceptual delivery by senior faculty and active student participation.",
    descriptionHi: "आधुनिक क्लासरूम, अनुभवी शिक्षकों द्वारा विषय का गहन विश्लेषण एवं विद्यार्थियों की सक्रिय सहभागिता।",
    coverImage: "./galary3.jpg",
    photos: [
      {
        id: "p-cls-01",
        url: "./galary3.jpg",
        title: "Physics and Mathematics Interactive Lecture",
        titleHi: "भौतिकी एवं गणित गहन क्लासरूम व्याख्यान",
        caption: "Concept clearance and problem-solving session",
        captionHi: "कॉन्सेप्ट क्लीयरेंस और समस्या निवारण सत्र"
      },
      {
        id: "p-cls-02",
        url: "./galary4.jpg",
        title: "1-on-1 Faculty Mentoring and Doubt Counters",
        titleHi: "विद्यार्थियों के साथ संकाय सदस्य एवं डाउट काउंटर",
        caption: "Post-class individual problem resolution",
        captionHi: "कक्षा के बाद व्यक्तिगत डाउट समाधान"
      }
    ]
  },
  {
    id: "alb-campus",
    title: "Saryoday Campus and Learning Ambience",
    titleHi: "सर्वोदय कैंपस एवं अध्ययन वातावरण",
    hindiTitle: "अनुशासित एवं प्रेरणादायी परिवेश",
    category: "Campus Ambience",
    categoryHi: "कैंपस परिवेश (Campus)",
    date: "Session 2024-25",
    dateHi: "सत्र 2024-25",
    description: "Disciplined, peaceful and inspiring academic infrastructure at B-Colony Shahpur, Gorakhpur.",
    descriptionHi: "बी-कॉलोनी शाहपुर स्थित सर्वोदय एकेडेमिक्स का सुव्यवस्थित, शांत एवं प्रेरक शैक्षणिक परिवेश।",
    coverImage: "./galary1.jpg",
    photos: [
      {
        id: "p-cmp-01",
        url: "./galary1.jpg",
        title: "Saryoday Shahpur Campus Grounds",
        titleHi: "सर्वोदय एकेडेमिक्स शाहपुर कैंपस प्रांगण",
        caption: "Optimal infrastructure for comprehensive student growth",
        captionHi: "छात्रों के समग्र विकास हेतु उत्कृष्ट इंफ्रास्ट्रक्चर"
      },
      {
        id: "p-cmp-02",
        url: "./galary2.jpg",
        title: "Annual Conclave and Student Dialogue",
        titleHi: "वार्षिक सम्मेलन एवं छात्र संवाद",
        caption: "Tradition of discipline and academic integrity",
        captionHi: "अनुशासन और सफलता की परंपरा"
      },
      {
        id: "p-cmp-03",
        url: "./galary4.jpg",
        title: "Library and Peer Study Discussions",
        titleHi: "लाइब्रेरी अध्ययन एवं ग्रुप डिस्कशन",
        caption: "Aspirants engaged in academic discussions",
        captionHi: "सहपाठियों संग गंभीर शैक्षणिक विचार-विमर्श"
      }
    ]
  }
];

export const initialGallery = [
  {
    id: "gal-01",
    title: "Merit Felicitation Ceremony",
    titleHi: "मेधावी छात्र-छात्रा सम्मान समारोह",
    category: "Felicitation",
    categoryHi: "सम्मान समारोह",
    image: "./galary.jpg"
  },
  {
    id: "gal-02",
    title: "Meritorious Aspirants with Educators",
    titleHi: "शिक्षकों संग मेधावी विद्यार्थियों का समूह",
    category: "Felicitation",
    categoryHi: "सम्मान समारोह",
    image: "./galary1.jpg"
  },
  {
    id: "gal-03",
    title: "Medal and Trophy Distribution",
    titleHi: "स्मृति चिन्ह एवं मेडल वितरण",
    category: "Events",
    categoryHi: "कार्यक्रम",
    image: "./galary2.jpg"
  },
  {
    id: "gal-04",
    title: "Digital Smart Classroom Session",
    titleHi: "डिजिटल स्मार्ट क्लासरूम सत्र",
    category: "Classroom",
    categoryHi: "क्लासरूम",
    image: "./galary3.jpg"
  },
  {
    id: "gal-05",
    title: "Dedicated Faculty Doubt Counter",
    titleHi: "संकाय सदस्यों संग व्यक्तिगत डाउट सत्र",
    category: "Campus",
    categoryHi: "कैंपस",
    image: "./galary4.jpg"
  }
];

export const initialTestimonials = [
  {
    id: "test-01",
    name: "Rajesh Kumar Verma",
    nameHi: "राजेश कुमार वर्मा (अभिभावक)",
    role: "Parent (Rahul Verma - Class 12th JEE)",
    roleHi: "पिता (राहुल वर्मा - कक्षा 12वीं जेईई छात्र)",
    text: "The best quality of Saryoday Academics is the weekly attendance and mock test tracking sent to parents. Teachers are immensely dedicated and accessible.",
    textHi: "सर्वोदय एकेडेमिक्स की सबसे खास बात यह है कि यहां हर हफ्ते हमें बेटे की उपस्थिति और टेस्ट के नंबर की पूरी जानकारी मिलती है। शिक्षक बहुत ही समर्पित और मिलनसार हैं।",
    rating: 5
  },
  {
    id: "test-02",
    name: "Sneha Tripathi",
    nameHi: "स्नेहा त्रिपाठी (छात्रा)",
    role: "NEET Dropper Aspirant",
    roleHi: "नीट ड्रॉपर बैच 2025",
    text: "Mishra Sir and Srivastava Sir make the toughest Physics and Chemistry concepts feel natural. Finding such teaching quality in Gorakhpur is a boon.",
    textHi: "मिश्रा सर और श्रीवास्तव सर के कांसेप्ट समझाने का तरीका बेजोड़ है। शाहपुर में इससे बेहतर कोचिंग सेंटर बोर्ड और कॉम्पिटिशन के लिए मिलना मुश्किल है।",
    rating: 5
  },
  {
    id: "test-03",
    name: "Arun Kumar Srivastava",
    nameHi: "अरुण कुमार श्रीवास्तव (अभिभावक)",
    role: "Parent (Ankit Srivastava - Class 10th CBSE)",
    roleHi: "पिता (अंकित श्रीवास्तव - कक्षा 10वीं CBSE)",
    text: "High-caliber coaching at very genuine fees. My son improved from 70% in Class 9th to 94% in his Class 10th pre-boards with Saryoday's structured guidance.",
    textHi: "कम फीस में इतना उच्च स्तरीय शिक्षण गोरखपुर में केवल सर्वोदय एकेडेमिक्स ही दे रहा है। मेरे बच्चे के 9th में जहां 70% थे, 10th के प्री-बोर्ड में 94% आए हैं।",
    rating: 5
  }
];

// Registered Staff Authentication (Admin and Faculty)
export const initialUsers = [
  {
    id: "usr-staff",
    role: "staff",
    name: "Management Team / Reception Desk",
    email: "staff@saryoday.com",
    password: "Staff@Saryoday2025#",
    title: "Front Desk & Operations Manager",
    phone: "8400100813",
    avatar: "./logo.jpg"
  },
  {
    id: "usr-admin",
    role: "admin",
    name: "Er. R.K. Mishra",
    email: "admin@saryoday.com",
    password: "Admin@Saryoday2025#",
    title: "Coaching Director and HOD",
    phone: "8400100814",
    avatar: "./director-pic.jpg"
  },
  {
    id: "usr-teacher",
    role: "teacher",
    name: "Prof. Ankit Pandey",
    email: "teacher@saryoday.com",
    password: "Teacher@Saryoday2025#",
    title: "Senior Faculty (Mathematics)",
    phone: "9876543210",
    subject: "Mathematics",
    batches: ["Class 12th IIT-JEE", "Class 10th CBSE"],
    avatar: "./director-pic.jpg"
  }
];

// Clean Student Database - Populated upon real admissions
export const initialStudents = [];

// Seed Batches (Clean enrollment count)
export const initialBatches = [
  {
    id: "bat-01",
    name: "Class 12th IIT-JEE",
    course: "IIT-JEE 2-Year Program",
    faculty: "Er. R.K. Mishra / Prof. Ankit Pandey",
    timing: "07:30 AM - 11:30 AM (Mon - Sat)",
    room: "Smart Hall 1",
    enrolledCount: 0,
    maxCapacity: 45
  },
  {
    id: "bat-02",
    name: "Class 12th NEET Target",
    course: "NEET Medical Target",
    faculty: "Dr. V.P. Srivastava / Dr. Shalini Singh",
    timing: "11:45 AM - 03:45 PM (Mon - Sat)",
    room: "Smart Hall 2",
    enrolledCount: 0,
    maxCapacity: 45
  },
  {
    id: "bat-03",
    name: "Class 10th CBSE Board",
    course: "Class 10th Board Booster",
    faculty: "Prof. Ankit Pandey / Er. Amit Verma",
    timing: "04:00 PM - 06:30 PM (Mon - Sat)",
    room: "Room 101",
    enrolledCount: 0,
    maxCapacity: 40
  },
  {
    id: "bat-04",
    name: "Class 11th IIT-JEE",
    course: "IIT-JEE 2-Year Program",
    faculty: "Er. R.K. Mishra / Dr. V.P. Srivastava",
    timing: "08:00 AM - 12:00 PM (Mon - Sat)",
    room: "Room 102",
    enrolledCount: 0,
    maxCapacity: 40
  },
  {
    id: "bat-05",
    name: "Class 9th Foundation",
    course: "Pre-Foundation Course",
    faculty: "Er. Amit Verma",
    timing: "03:30 PM - 05:30 PM (Mon - Sat)",
    room: "Room 103",
    enrolledCount: 0,
    maxCapacity: 35
  }
];

// Clean Fee Transactions
export const initialFeeTransactions = [];

// Clean Attendance Records
export const initialAttendance = [];

// Clean Exam Results
export const initialExamResults = [];

// Clean Study Materials & DPP
export const initialStudyMaterials = [];

// Clean Inquiries from Website
export const initialInquiries = [];

// Library Information - CMS Managed
export const initialLibraryInfo = {
  badge: "Saryoday Knowledge Center",
  badgeHi: "सर्वोदय ज्ञान केंद्र",
  title: "Air-Conditioned Self-Study & Digital Library",
  titleHi: "वातानुकूलित शांत सेल्फ-स्टडी एवं डिजिटल लाइब्रेरी",
  subtitle: "A tranquil, scholarly sanctuary designed specifically for serious IIT-JEE and NEET aspirants in Gorakhpur",
  subtitleHi: "गोरखपुर के गंभीर जेईई और नीट अभ्यर्थियों हेतु अनुशासित, वातानुकूलित एवं प्रेरक अध्ययन केंद्र",
  timings: "Open 7:00 AM to 9:00 PM (7 Days a Week)",
  timingsHi: "प्रातः 7:00 AM से रात्रि 9:00 PM (सातों दिन खुला)",
  totalTitles: "5,000+ Reference Titles",
  totalTitlesHi: "5,000+ संदर्भ पुस्तकें",
  features: [
    {
      id: "lib-f1",
      title: "5,000+ Reference Titles",
      titleHi: "5,000+ प्रामाणिक पुस्तकें",
      desc: "HC Verma, Irodov, Cengage Series, DC Pandey, MS Chouhan, OP Tandon, NCERT at Fingertips & 20+ Years Solved Papers.",
      descHi: "एचसी वर्मा, इरोडोव, सेंगेज सीरीज, डीसी पांडे, एमएस चौहान, ओपी टंडन एवं पिछले 20 वर्षों के हल प्रश्न पत्र।"
    },
    {
      id: "lib-f2",
      title: "Extended Study Hours",
      titleHi: "विस्तारित अध्ययन समय",
      desc: "Open 7:00 AM to 9:00 PM, 7 days a week, facilitating deep self-study after classroom lecture hours.",
      descHi: "सुबह 7 बजे से रात 9 बजे तक खुला, ताकि क्लास के बाद छात्र बिना किसी व्यवधान के स्वाध्याय कर सकें।"
    },
    {
      id: "lib-f3",
      title: "High-Speed Wi-Fi & CBT Stations",
      titleHi: "हाई-स्पीड वाई-फाई एवं सीबीटी टर्मिनल",
      desc: "Dedicated computer terminals configured for NTA pattern Computer Based Tests (CBT) and video lecture analysis.",
      descHi: "एनटीए पैटर्न कंप्यूटर आधारित टेस्ट (CBT) और वीडियो लेक्चर देखने हेतु कंप्यूटर टर्मिनल उपलब्ध।"
    },
    {
      id: "lib-f4",
      title: "Soundproof Air-Conditioned Hall",
      titleHi: "शांत वातानुकूलित अध्ययन हॉल",
      desc: "Ergonomic seating with individual power sockets and LED desk lamps providing distraction-free focus.",
      descHi: "आरामदायक बैठक व्यवस्था, प्रत्येक डेस्क पर चार्जिंग सॉकेट एवं एलईडी लैम्प की उत्कृष्ट सुविधा।"
    }
  ],
  popularBooks: [
    { subject: "Physics", titles: ["Concepts of Physics - HC Verma", "Problems in General Physics - Irodov", "Understanding Physics - DC Pandey (5 Volumes)"] },
    { subject: "Chemistry", titles: ["Organic Chemistry - MS Chouhan", "Physical Chemistry - N. Awasthi", "Inorganic Chemistry - VK Jaiswal & JD Lee"] },
    { subject: "Mathematics", titles: ["Cengage JEE Advanced Series - G. Tewani", "Play with Graphs - Amit M. Agarwal", "Problems in Calculus of One Variable - IA Maron"] },
    { subject: "Biology (NEET)", titles: ["NCERT Biology Line-by-Line Fingertips (MTG)", "Trueman's Elementary Biology Vol 1 & 2", "Dr. Ali Objective Biology for NEET"] }
  ]
};

// Career Guidance & Opportunities - CMS Managed
export const initialCareerInfo = {
  badge: "Join Saryoday Team & Career Guidance",
  badgeHi: "सर्वोदय टीम से जुड़ें एवं करियर मार्गदर्शन",
  title: "Faculty Opportunities & Career Mentoring",
  titleHi: "फैकल्टी भर्ती एवं विशेषज्ञ करियर काउंसलिंग",
  subtitle: "Shape the future of young aspirants or receive personalized counseling from our expert faculty team",
  subtitleHi: "मेधावी छात्रों का भविष्य संवारें अथवा हमारे विशेषज्ञ मार्गदर्शकों से व्यक्तिगत करियर काउंसलिंग प्राप्त करें",
  counselorName: "Director & Senior Mentors",
  counselingNote: "Unsure between Engineering (IIT-JEE) and Medicine (NEET)? Complimentary 30-minute diagnostic counseling for students and parents.",
  counselingNoteHi: "इंजीनियरिंग (IIT-JEE) अथवा मेडिकल (NEET) चयन में असमंजस? छात्रों एवं अभिभावकों हेतु 30 मिनट की निःशुल्क व्यक्तिगत काउंसलिंग।",
  openPositions: [
    {
      id: "pos-1",
      role: "Senior Faculty - IIT-JEE (Physics)",
      department: "Engineering Wing",
      qualification: "B.Tech (IIT/NIT) or M.Sc Physics",
      experience: "4+ years in premier coaching institute",
      type: "Full-Time (Shahpur Campus)",
      compensation: "Industry Best + Performance Bonus"
    },
    {
      id: "pos-2",
      role: "Faculty - NEET Medical (Chemistry)",
      department: "Medical Wing",
      qualification: "M.Sc Organic/Inorganic Chemistry or B.Tech",
      experience: "3+ years delivering top medical ranks",
      type: "Full-Time",
      compensation: "Competitive Package"
    },
    {
      id: "pos-3",
      role: "Mathematics Faculty (Class 10th - 12th)",
      department: "Foundation & Board Booster",
      qualification: "M.Sc / B.Tech / B.Ed",
      experience: "2+ years teaching CBSE/ICSE Board pattern",
      type: "Full-Time / Part-Time",
      compensation: "Attractive Salary"
    },
    {
      id: "pos-4",
      role: "Academic Counselor & Telecaller",
      department: "Student Admissions & Operations",
      qualification: "Graduate with fluent communication",
      experience: "1+ years in education counseling",
      type: "Full-Time",
      compensation: "Fixed + Incentives"
    }
  ]
};
