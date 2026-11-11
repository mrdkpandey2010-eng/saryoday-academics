// Pre-seeded database for Saryoday Academics, Gorakhpur
// Based on Gorakhpur's B-Colony Shahpur location & Target Classes model

export const initialInstituteInfo = {
  name: "Saryoday Academics",
  hindiName: "सर्वोदय एकेडेमिक्स",
  tagline: "Building Strong Foundation for Board Exams, IIT-JEE & NEET",
  hindiTagline: "बोर्ड परीक्षा, IIT-JEE एवं NEET में सफलता का विश्वसनीय संस्थान",
  address: "B-Colony, Near Geeta Vatika Mandir & Airtel Store, Shahpur, Gorakhpur, Uttar Pradesh – 273006",
  phones: ["+91 84001 00814", "+91 84001 00813"],
  whatsapp: "+918400100814",
  email: "saryodayacademics@gmail.com",
  timings: "सोमवार - शनिवार: प्रातः 07:00 AM से सायं 07:00 PM (रविवार: विशेष डाउट सत्र)",
  director: {
    name: "Er. R.K. Mishra",
    qualification: "B.Tech (IIT BHU), 14+ Years Experience",
    role: "Director & Senior Physics Faculty",
    message: "सर्वोदय एकेडेमिक्स में हमारा लक्ष्य सिर्फ किताबी ज्ञान देना नहीं, बल्कि प्रत्येक छात्र के भीतर तार्किक सोच और विषय की गहरी समझ विकसित करना है। गोरखपुर के छात्रों को महानगरों जैसा गुणवत्तापूर्ण शिक्षण उनके अपने शहर में प्रदान करना ही हमारा संकल्प है।",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
  },
  established: "2018",
  affiliations: "CBSE | ICSE | UP Board | IIT-JEE (Main & Adv) | NEET (UG)"
};

export const initialBanners = [
  {
    id: 1,
    badge: "सत्र 2025-26 प्रवेश प्रारंभ",
    title: "IIT-JEE & NEET में सर्वश्रेष्ठ परिणाम का संकल्प",
    subtitle: "सर्वोदय एकेडेमिक्स, शाहपुर गोरखपुर - सीमित सीटें, व्यक्तिगत मार्गदर्शन एवं उत्कृष्ट फैकल्टी",
    ctaPrimary: "ऑनलाइन प्रवेश / रजिस्ट्रेशन करें",
    ctaSecondary: "कोर्स विवरण देखें",
    bgGradient: "from-blue-900 via-indigo-900 to-slate-900",
    accentColor: "border-orange-500",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    badge: "छात्रवृत्ति परीक्षा (SST 2025)",
    title: "Saryoday Scholarship Test (SST) - 100% तक फीस माफी",
    subtitle: "कक्षा 6वीं से 12वीं तक के मेधावी छात्रों के लिए विशेष छात्रवृत्ति परीक्षा। अपनी प्रतिभा को दें नई उड़ान।",
    ctaPrimary: "स्कॉलरशिप टेस्ट हेतु रजिस्टर करें",
    ctaSecondary: "सिलेबस डाउनलोड करें",
    bgGradient: "from-orange-950 via-amber-900 to-slate-900",
    accentColor: "border-amber-400",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    badge: "कक्षा 9वीं, 10वीं, 11वीं एवं 12वीं बोर्ड स्पेशल",
    title: "CBSE, ICSE एवं UP Board में 95%+ स्कोर की गारंटीड तैयारी",
    subtitle: "दैनिक अभ्यास पत्रक (DPP), साप्ताहिक टेस्ट सीरीज और विशेषज्ञ शिक्षकों द्वारा व्यक्तिगत डाउट निवारण",
    ctaPrimary: "फ्री डेमो क्लास बुक करें",
    ctaSecondary: "फैकल्टी टीम देखें",
    bgGradient: "from-emerald-950 via-teal-900 to-slate-900",
    accentColor: "border-emerald-400",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
  }
];

export const initialNotices = [
  {
    id: "not-01",
    title: "Saryoday Scholarship Test (SST 2025) की रजिस्ट्रेशन तिथि घोषित",
    date: "10 नवम्बर 2026",
    category: "Exam",
    target: "all",
    isNew: true,
    content: "सत्र 2025-26 के लिए छात्रवृत्ति परीक्षा 24 नवम्बर को आयोजित होगी। 100% तक स्कॉलरशिप पाने के लिए ऑनलाइन या ऑफिस से फॉर्म भरें।"
  },
  {
    id: "not-02",
    title: "कक्षा 10वीं एवं 12वीं बोर्ड परीक्षार्थियों हेतु स्पेशल क्रैश कोर्स प्रारंभ",
    date: "08 नवम्बर 2026",
    category: "Academic",
    target: "students",
    isNew: true,
    content: "बोर्ड परीक्षा 2025-26 की तैयारी के लिए विगत 10 वर्षों के प्रश्नपत्रों के विश्लेषण सहित 90 दिवसीय सुपर क्रैश कोर्स 15 नवम्बर से शुरू हो रहा है।"
  },
  {
    id: "not-03",
    title: "आगामी रविवार को अभिभावक-शिक्षक बैठक (PTM) का आयोजन",
    date: "05 नवम्बर 2026",
    category: "Meeting",
    target: "parents",
    isNew: false,
    content: "अक्टूबर माह के मासिक टेस्ट की प्रगति रिपोर्ट साझा करने हेतु रविवार सुबह 10:00 बजे से दोपहर 1:00 बजे तक PTM आयोजित की जाएगी।"
  },
  {
    id: "not-04",
    title: "NEET & JEE संडे स्पेशल ऑल-इंडिया मॉक टेस्ट सीरीज",
    date: "01 नवम्बर 2026",
    category: "Test",
    target: "students",
    isNew: false,
    content: "प्रत्येक रविवार प्रातः 9 बजे से दोपहर 12 बजे तक NTA पैटर्न पर आधारित ऑफलाइन एवं ऑनलाइन मॉक टेस्ट का आयोजन किया जा रहा है।"
  }
];

export const initialCourses = [
  {
    id: "c-01",
    code: "JEE-TAR",
    title: "IIT-JEE (Main + Advanced) 2-Year Classroom Program",
    hindiTitle: "आईआईटी-जेईई (मेन + एडवांस्ड) 2 वर्षीय क्लासरूम प्रोग्राम",
    class: "11वीं एवं 12वीं (PCM)",
    targetExam: "JEE Main & Advanced 2026/2027",
    duration: "2 वर्ष (प्रतिदिन 4 घंटे)",
    fee: "₹45,000 / वर्ष",
    features: [
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
    class: "11वीं, 12वीं एवं 12th Pass Dropper (PCB)",
    targetExam: "NEET UG 2026",
    duration: "1 या 2 वर्ष (प्रतिदिन 4.5 घंटे)",
    fee: "₹42,000 / वर्ष",
    features: [
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
    class: "10th & 12th All Streams",
    targetExam: "Board Exams 2025-2026",
    duration: "पूर्ण शैक्षणिक सत्र",
    fee: "₹24,000 / वर्ष",
    features: [
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
    class: "कक्षा 6, 7, 8 एवं 9",
    targetExam: "Olympiads, NTSE & School Excellence",
    duration: "1 शैक्षणिक वर्ष",
    fee: "₹18,000 / वर्ष",
    features: [
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
    class: "12वीं एवं 12th Pass",
    targetExam: "Upcoming JEE / NEET / CUET",
    duration: "3 से 4 माह",
    fee: "₹14,999 (सम्पूर्ण कोर्स)",
    features: [
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
    role: "Director & HOD Physics",
    qualification: "B.Tech (IIT BHU), 14+ Years Exp",
    subject: "Physics (JEE / NEET / 12th Board)",
    experience: "14+ वर्ष का शिक्षण अनुभव। 500+ छात्रों का IIT/NIT में चयन कराया।",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-02",
    name: "Dr. V.P. Srivastava",
    role: "Senior Faculty Chemistry",
    qualification: "M.Sc, Ph.D. (Chemistry), 12+ Years Exp",
    subject: "Organic & Physical Chemistry (NEET / JEE)",
    experience: "विशेषज्ञ शिक्षक जिन्होंने NEET में छात्रों को रसायन विज्ञान में 170+ अंक दिलाने में मार्गदर्शन किया।",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-03",
    name: "Prof. Ankit Pandey",
    role: "HOD Mathematics",
    qualification: "M.Sc (Mathematics), CSIR NET Qualified",
    subject: "Mathematics (Class 10th-12th & JEE)",
    experience: "कैलकुलस एवं को-ऑर्डिनेट ज्योमेट्री के जटिल प्रश्नों को सरल व रोचक ट्रिक्स से हल कराने के लिए प्रसिद्ध।",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-04",
    name: "Dr. Shalini Singh",
    role: "Senior Faculty Biology",
    qualification: "M.Sc (Botany), Ph.D., 9+ Years Exp",
    subject: "Biology / Botany & Zoology (NEET & 12th)",
    experience: "NCERT के प्रत्येक डायग्राम और कॉन्सेप्ट को छात्रों के दिमाग में बैठाने का विशिष्ट अध्यापन कौशल।",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "f-05",
    name: "Er. Amit Verma",
    role: "Faculty Science & Foundation",
    qualification: "B.Tech (ECE), 8+ Years Exp",
    subject: "Foundation Science & Mental Ability",
    experience: "कक्षा 6वीं से 10वीं तक के विद्यार्थियों के मूल आधार को मजबूत करने में विशेष महारत।",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
  }
];

export const initialToppers = [
  {
    id: "top-01",
    name: "आदित्य त्रिपाठी (Aditya Tripathi)",
    exam: "JEE Advanced 2024",
    rank: "AIR 412 (IIT Kanpur Selection)",
    score: "99.82 Percentile",
    quote: "सर्वोदय एकेडेमिक्स के मिश्रा सर और पांडे सर के डाउट सेशंस ने मेरे फिजिक्स और मैथ्स के डर को पूरी तरह खत्म कर दिया।",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "top-02",
    name: "प्रिया सिंह (Priya Singh)",
    exam: "NEET (UG) 2024",
    rank: "AIR 894 (AIIMS Gorakhpur)",
    score: "688 / 720 Marks",
    quote: "शाहपुर ब्रांच में नियमित ओएमआर टेस्ट और शालिनी मैम का व्यक्तिगत मार्गदर्शन मेरी इस सफलता की रीढ़ रहा।",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "top-03",
    name: "शिवम गुप्ता (Shivam Gupta)",
    exam: "CBSE Class 12th Board",
    rank: "City District Rank #2",
    score: "98.6% Marks",
    quote: "बोर्ड परीक्षा के लिए जो उत्तर लेखन तकनीक सर्वोदय में सिखाई गई, उसी के कारण मुझे फिजिक्स और केमिस्ट्री में 100/100 मिले।",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "top-04",
    name: "अनामिका मौर्या (Anamika Maurya)",
    exam: "UP Board Class 12th",
    rank: "गोरखपुर मंडल टॉपर",
    score: "96.4% Marks",
    quote: "सर्वोदय एकेडेमिक्स के नोट्स और दैनिक अभ्यास ने मेरे पूरे साल के अध्ययन को बहुत सुगम और सटीक बना दिया।",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
  }
];

export const initialGallery = [
  {
    id: "gal-01",
    title: "डिजिटल स्मार्ट क्लासरूम सत्र",
    category: "Classroom",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-02",
    title: "मेधावी छात्र-छात्रा सम्मान समारोह",
    category: "Felicitation",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-03",
    title: "अभिभावक-शिक्षक बैठक (PTM) शाहपुर",
    category: "Events",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-04",
    title: "लाइब्रेरी एवं सेल्फ़-स्टडी रूम",
    category: "Campus",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-05",
    title: "साप्ताहिक ओएमआर आधारित टेस्ट परीक्षा",
    category: "Exam",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-06",
    title: "व्यक्तिगत डाउट सॉल्विंग काउंटर",
    category: "Classroom",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialTestimonials = [
  {
    id: "test-01",
    name: "राजेश कुमार वर्मा (अभिभावक)",
    role: "पिता (राहुल वर्मा - कक्षा 12वीं जेईई छात्र)",
    text: "सर्वोदय एकेडेमिक्स की सबसे खास बात यह है कि यहां हर हफ्ते हमें बेटे की उपस्थिति और टेस्ट के नंबर की पूरी जानकारी मिलती है। शिक्षक बहुत ही समर्पित और मिलनसार हैं।",
    rating: 5
  },
  {
    id: "test-02",
    name: "स्नेहा त्रिपाठी (छात्रा)",
    role: "नीट ड्रॉपर बैच 2025",
    text: "मिश्रा सर और श्रीवास्तव सर के कांसेप्ट समझाने का तरीका बेजोड़ है। शाहपुर में इससे बेहतर कोचिंग सेंटर बोर्ड और कॉम्पिटिशन के लिए मिलना मुश्किल है।",
    rating: 5
  },
  {
    id: "test-03",
    name: "अरुण कुमार श्रीवास्तव (अभिभावक)",
    role: "पिता (अंकित श्रीवास्तव - कक्षा 10वीं CBSE)",
    text: "कम फीस में इतना उच्च स्तरीय शिक्षण गोरखपुर में केवल सर्वोदय एकेडेमिक्स ही दे रहा है। मेरे बच्चे के 9th में जहां 70% थे, 10th के प्री-बोर्ड में 94% आए हैं।",
    rating: 5
  }
];

// Seed Users for Authentication (Admin, Teacher, Student, Parent)
export const initialUsers = [
  {
    id: "usr-admin",
    role: "admin",
    name: "Er. R.K. Mishra",
    email: "admin@saryoday.com",
    password: "admin",
    title: "Coaching Director & HOD",
    phone: "8400100814",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-teacher",
    role: "teacher",
    name: "Prof. Ankit Pandey",
    email: "teacher@saryoday.com",
    password: "teacher123",
    title: "Senior Faculty (Mathematics)",
    phone: "9876543210",
    subject: "Mathematics",
    batches: ["Class 12th IIT-JEE", "Class 10th CBSE"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-student",
    role: "student",
    name: "राहुल वर्मा (Rahul Verma)",
    email: "student@saryoday.com",
    password: "student123",
    rollNo: "SA-2025-0101",
    studentId: "SA-0101",
    className: "Class 12th (PCM)",
    batch: "Class 12th IIT-JEE",
    phone: "9450123456",
    fatherName: "श्री विनोद वर्मा (Mr. Vinod Verma)",
    motherName: "श्रीमती सुनीता वर्मा",
    address: "H.No. 42, B-Colony, Shahpur, Gorakhpur",
    totalFee: 45000,
    paidFee: 35000,
    dueFee: 10000,
    attendancePercent: 94.2,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-parent",
    role: "parent",
    name: "श्री विनोद वर्मा (Mr. Vinod Verma)",
    email: "parent@saryoday.com",
    password: "parent123",
    relation: "Father",
    childRollNo: "SA-2025-0101",
    childName: "राहुल वर्मा (Rahul Verma)",
    phone: "9450123456",
    occupation: "Govt. Officer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  }
];

// Seed Students Data
export const initialStudents = [
  {
    id: "stu-01",
    rollNo: "SA-2025-0101",
    name: "राहुल वर्मा (Rahul Verma)",
    fatherName: "श्री विनोद वर्मा",
    phone: "9450123456",
    parentPhone: "9450123456",
    className: "Class 12th",
    batch: "Class 12th IIT-JEE",
    stream: "Science (PCM)",
    gender: "Male",
    dob: "2008-04-15",
    address: "H.No. 42, B-Colony, Shahpur, Gorakhpur",
    admissionDate: "2024-04-10",
    totalFee: 45000,
    paidFee: 35000,
    dueFee: 10000,
    attendanceRate: 94.2,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "stu-02",
    rollNo: "SA-2025-0102",
    name: "अनामिका गुप्ता (Anamika Gupta)",
    fatherName: "श्री राजेश गुप्ता",
    phone: "9450765432",
    parentPhone: "9450765432",
    className: "Class 12th",
    batch: "Class 12th NEET Target",
    stream: "Science (PCB)",
    gender: "Female",
    dob: "2008-07-22",
    address: "Basharatpur, Gorakhpur",
    admissionDate: "2024-04-12",
    totalFee: 42000,
    paidFee: 42000,
    dueFee: 0,
    attendanceRate: 96.8,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "stu-03",
    rollNo: "SA-2025-0103",
    name: "अमित कुमार मौर्या (Amit Maurya)",
    fatherName: "श्री दिनेश मौर्या",
    phone: "9838112233",
    parentPhone: "9838112233",
    className: "Class 10th",
    batch: "Class 10th CBSE Board",
    stream: "Foundation",
    gender: "Male",
    dob: "2010-09-10",
    address: "Gita Vatika, Shahpur, Gorakhpur",
    admissionDate: "2024-04-20",
    totalFee: 24000,
    paidFee: 18000,
    dueFee: 6000,
    attendanceRate: 91.5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "stu-04",
    rollNo: "SA-2025-0104",
    name: "दीक्षा जायसवाल (Deeksha Jaiswal)",
    fatherName: "श्री सुनील जायसवाल",
    phone: "9123456780",
    parentPhone: "9123456780",
    className: "Class 11th",
    batch: "Class 11th IIT-JEE",
    stream: "Science (PCM)",
    gender: "Female",
    dob: "2009-02-18",
    address: "Medical College Road, Gorakhpur",
    admissionDate: "2024-05-02",
    totalFee: 45000,
    paidFee: 30000,
    dueFee: 15000,
    attendanceRate: 95.0,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "stu-05",
    rollNo: "SA-2025-0105",
    name: "सौरभ यादव (Saurabh Yadav)",
    fatherName: "श्री रामनारायण यादव",
    phone: "9839988776",
    parentPhone: "9839988776",
    className: "Class 9th",
    batch: "Class 9th Foundation",
    stream: "Pre-Foundation",
    gender: "Male",
    dob: "2011-11-05",
    address: "Awas Vikas Colony, Shahpur, Gorakhpur",
    admissionDate: "2024-05-15",
    totalFee: 18000,
    paidFee: 18000,
    dueFee: 0,
    attendanceRate: 88.0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

// Seed Batches
export const initialBatches = [
  {
    id: "bat-01",
    name: "Class 12th IIT-JEE",
    course: "IIT-JEE 2-Year Program",
    faculty: "Er. R.K. Mishra / Prof. Ankit Pandey",
    timing: "07:30 AM - 11:30 AM (Mon - Sat)",
    room: "Smart Hall 1",
    enrolledCount: 38,
    maxCapacity: 45
  },
  {
    id: "bat-02",
    name: "Class 12th NEET Target",
    course: "NEET Medical Target",
    faculty: "Dr. V.P. Srivastava / Dr. Shalini Singh",
    timing: "11:45 AM - 03:45 PM (Mon - Sat)",
    room: "Smart Hall 2",
    enrolledCount: 42,
    maxCapacity: 45
  },
  {
    id: "bat-03",
    name: "Class 10th CBSE Board",
    course: "Class 10th Board Booster",
    faculty: "Prof. Ankit Pandey / Er. Amit Verma",
    timing: "04:00 PM - 06:30 PM (Mon - Sat)",
    room: "Room 101",
    enrolledCount: 32,
    maxCapacity: 40
  },
  {
    id: "bat-04",
    name: "Class 11th IIT-JEE",
    course: "IIT-JEE 2-Year Program",
    faculty: "Er. R.K. Mishra / Dr. V.P. Srivastava",
    timing: "08:00 AM - 12:00 PM (Mon - Sat)",
    room: "Room 102",
    enrolledCount: 35,
    maxCapacity: 40
  },
  {
    id: "bat-05",
    name: "Class 9th Foundation",
    course: "Pre-Foundation Course",
    faculty: "Er. Amit Verma",
    timing: "03:30 PM - 05:30 PM (Mon - Sat)",
    room: "Room 103",
    enrolledCount: 26,
    maxCapacity: 35
  }
];

// Seed Fee Transactions
export const initialFeeTransactions = [
  {
    id: "TXN-8901",
    receiptNo: "SA-REC-2025-042",
    studentId: "stu-01",
    rollNo: "SA-2025-0101",
    studentName: "राहुल वर्मा",
    batch: "Class 12th IIT-JEE",
    amount: 15000,
    paymentMode: "UPI / PhonePe",
    txnRef: "UPI-4299881029",
    date: "2026-10-15",
    remarks: "2nd Installment Fee for Term 2",
    collectedBy: "Admin Office"
  },
  {
    id: "TXN-8902",
    receiptNo: "SA-REC-2025-043",
    studentId: "stu-01",
    rollNo: "SA-2025-0101",
    studentName: "राहुल वर्मा",
    batch: "Class 12th IIT-JEE",
    amount: 20000,
    paymentMode: "Bank Netbanking",
    txnRef: "SBI-991204857",
    date: "2026-05-10",
    remarks: "1st Installment Admission Fee",
    collectedBy: "Admin Office"
  },
  {
    id: "TXN-8903",
    receiptNo: "SA-REC-2025-044",
    studentId: "stu-02",
    rollNo: "SA-2025-0102",
    studentName: "अनामिका गुप्ता",
    batch: "Class 12th NEET Target",
    amount: 42000,
    paymentMode: "Cash Receipt",
    txnRef: "CASH-REC-0012",
    date: "2026-04-12",
    remarks: "Full Year One-Time Payment (10% Discount applied)",
    collectedBy: "Er. R.K. Mishra"
  },
  {
    id: "TXN-8904",
    receiptNo: "SA-REC-2025-045",
    studentId: "stu-03",
    rollNo: "SA-2025-0103",
    studentName: "अमित कुमार मौर्या",
    batch: "Class 10th CBSE Board",
    amount: 18000,
    paymentMode: "Google Pay",
    txnRef: "GPAY-772910332",
    date: "2026-06-01",
    remarks: "1st Term Board Course Fee",
    collectedBy: "Admin Office"
  }
];

// Seed Attendance Records
export const initialAttendance = [
  {
    id: "att-01",
    date: "2026-11-10",
    batch: "Class 12th IIT-JEE",
    records: [
      { studentId: "stu-01", rollNo: "SA-2025-0101", name: "राहुल वर्मा", status: "Present" },
      { studentId: "stu-04", rollNo: "SA-2025-0104", name: "दीक्षा जायसवाल", status: "Present" }
    ]
  },
  {
    id: "att-02",
    date: "2026-11-09",
    batch: "Class 12th IIT-JEE",
    records: [
      { studentId: "stu-01", rollNo: "SA-2025-0101", name: "राहुल वर्मा", status: "Present" },
      { studentId: "stu-04", rollNo: "SA-2025-0104", name: "दीक्षा जायसवाल", status: "Present" }
    ]
  },
  {
    id: "att-03",
    date: "2026-11-08",
    batch: "Class 12th IIT-JEE",
    records: [
      { studentId: "stu-01", rollNo: "SA-2025-0101", name: "राहुल वर्मा", status: "Present" },
      { studentId: "stu-04", rollNo: "SA-2025-0104", name: "दीक्षा जायसवाल", status: "Absent" }
    ]
  },
  {
    id: "att-04",
    date: "2026-11-07",
    batch: "Class 12th IIT-JEE",
    records: [
      { studentId: "stu-01", rollNo: "SA-2025-0101", name: "राहुल वर्मा", status: "Present" },
      { studentId: "stu-04", rollNo: "SA-2025-0104", name: "दीक्षा जायसवाल", status: "Present" }
    ]
  }
];

// Seed Exam Results / Test Scores
export const initialExamResults = [
  {
    id: "res-01",
    examName: "JEE Main Pattern Mock Test #05",
    date: "2026-11-03",
    batch: "Class 12th IIT-JEE",
    maxMarks: 300,
    results: [
      {
        studentId: "stu-01",
        rollNo: "SA-2025-0101",
        studentName: "राहुल वर्मा",
        physicsMarks: 82,
        chemistryMarks: 78,
        mathsMarks: 86,
        totalMarks: 246,
        percentage: 82.0,
        rank: 3,
        percentile: "98.15",
        status: "Pass",
        remarks: "उत्कृष्ट प्रदर्शन। कैलकुलस के कुछ प्रश्नों में स्पीड सुधारने की जरूरत है।"
      },
      {
        studentId: "stu-04",
        rollNo: "SA-2025-0104",
        studentName: "दीक्षा जायसवाल",
        physicsMarks: 75,
        chemistryMarks: 80,
        mathsMarks: 72,
        totalMarks: 227,
        percentage: 75.6,
        rank: 7,
        percentile: "96.40",
        status: "Pass",
        remarks: "बहुत अच्छा प्रयास। फिजिक्स में न्यूमेरिकल प्रैक्टिस बढ़ाएं।"
      }
    ]
  },
  {
    id: "res-02",
    examName: "CBSE Term-1 Pre-Board Mock Exam",
    date: "2026-10-20",
    batch: "Class 12th IIT-JEE",
    maxMarks: 100,
    results: [
      {
        studentId: "stu-01",
        rollNo: "SA-2025-0101",
        studentName: "राहुल वर्मा",
        subject: "Physics (Theory + Practical)",
        totalMarks: 94,
        percentage: 94.0,
        grade: "A1",
        rank: 2,
        status: "Pass",
        remarks: "शानदार उत्तर लेखन! न्यूमेरिकल में पूरे अंक प्राप्त।"
      }
    ]
  }
];

// Seed Study Materials & DPP
export const initialStudyMaterials = [
  {
    id: "mat-01",
    title: "Class 12th Physics - Electrostatics & Capacitance Formula Book & DPP",
    batch: "Class 12th IIT-JEE",
    subject: "Physics",
    uploadedBy: "Er. R.K. Mishra",
    date: "2026-11-05",
    fileType: "PDF",
    fileSize: "4.8 MB",
    downloadUrl: "#",
    description: "विद्युत स्थैतिकी एवं धारिता के सभी महत्वपूर्ण सूत्रों का संग्रह और 50 अभ्यास प्रश्न।"
  },
  {
    id: "mat-02",
    title: "Class 12th Mathematics - Indefinite & Definite Integrals Short Tricks",
    batch: "Class 12th IIT-JEE",
    subject: "Mathematics",
    uploadedBy: "Prof. Ankit Pandey",
    date: "2026-11-02",
    fileType: "PDF",
    fileSize: "3.2 MB",
    downloadUrl: "#",
    description: "समाकलन के जटिल प्रश्नों को सेकंडों में हल करने वाली शॉर्टकट ट्रिक्स और पिछले वर्षों के प्रश्न।"
  },
  {
    id: "mat-03",
    title: "NEET Biology - Human Physiology Complete Mind Maps",
    batch: "Class 12th NEET Target",
    subject: "Biology",
    uploadedBy: "Dr. Shalini Singh",
    date: "2026-10-28",
    fileType: "PDF",
    fileSize: "6.1 MB",
    downloadUrl: "#",
    description: "मानव शरीर क्रिया विज्ञान के रंगीन चार्ट, NCERT सारांश और त्वरित रिवीज़न नोट्स।"
  },
  {
    id: "mat-04",
    title: "Class 10th Science - Electricity & Magnetic Effects Sample Papers",
    batch: "Class 10th CBSE Board",
    subject: "Science",
    uploadedBy: "Er. Amit Verma",
    date: "2026-10-25",
    fileType: "PDF",
    fileSize: "2.9 MB",
    downloadUrl: "#",
    description: "विद्युत धारा एवं चुंबकत्व के 5 मॉडल प्रश्नपत्र हल सहित।"
  }
];

// Seed Inquiries from Website
export const initialInquiries = [
  {
    id: "inq-01",
    name: "विकास मिश्रा",
    phone: "9838001122",
    email: "vikas.m@gmail.com",
    course: "IIT-JEE (Main + Advanced)",
    classSelected: "Class 11th",
    message: "शाहपुर ब्रांच में 11th का नया बैच कब से शुरू हो रहा है? फीस किस्तों में दे सकते हैं क्या?",
    date: "2026-11-10",
    status: "Pending"
  },
  {
    id: "inq-02",
    name: "पूनम राय",
    phone: "9450887766",
    email: "poonam.rai@yahoo.com",
    course: "NEET Medical Target",
    classSelected: "Class 12th Pass (Dropper)",
    message: "क्या ड्रॉपर बैच में हॉस्टल या सेल्फ़ स्टडी लाइब्रेरी की सुविधा उपलब्ध है?",
    date: "2026-11-08",
    status: "Contacted"
  },
  {
    id: "inq-03",
    name: "संजय सिंह (अभिभावक)",
    phone: "9123445566",
    email: "sanjay.singh@gmail.com",
    course: "Class 10th Board Booster",
    classSelected: "Class 10th ICSE",
    message: "मेरे बेटे के लिए ICSE बोर्ड मैथ्स और साइंस की स्पेशल कोचिंग चाहिए।",
    date: "2026-11-04",
    status: "Enrolled"
  }
];
