import React, { useState } from 'react';
import { Send, CheckCircle2, Printer, Award, Sparkles, Phone, HelpCircle, Key, Lock, UserCheck, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { validateEnglishOnly, validateIndianMobile } from '../../utils/validation';

export const AdmissionInquirySection = ({ preSelectedCourse, onSubmitInquiry, instituteInfo }) => {
  const { students, addStudent } = useData();

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    phone: '',
    email: '',
    classSelected: 'Class 12th (PCM)',
    course: preSelectedCourse ? preSelectedCourse.title : 'IIT-JEE (Main + Advanced)',
    area: 'Shahpur, Gorakhpur',
    message: ''
  });

  const [submittedSlip, setSubmittedSlip] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Real-time English only guard
    if (name === 'name' || name === 'fatherName' || name === 'area' || name === 'message') {
      const check = validateEnglishOnly(value, name);
      if (!check.isValid) {
        setValidationError(check.message);
      } else {
        setValidationError('');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.name || !formData.phone) {
      setValidationError('Please provide student name and mobile phone number.');
      return;
    }

    // Strict English Only Validation for Database
    const nameCheck = validateEnglishOnly(formData.name, 'Student Name');
    if (!nameCheck.isValid) {
      setValidationError(nameCheck.message);
      return;
    }
    if (formData.fatherName) {
      const fatherCheck = validateEnglishOnly(formData.fatherName, "Father's Name");
      if (!fatherCheck.isValid) {
        setValidationError(fatherCheck.message);
        return;
      }
    }
    if (formData.area) {
      const areaCheck = validateEnglishOnly(formData.area, 'Address / Area');
      if (!areaCheck.isValid) {
        setValidationError(areaCheck.message);
        return;
      }
    }
    if (formData.message) {
      const msgCheck = validateEnglishOnly(formData.message, 'Message / Query');
      if (!msgCheck.isValid) {
        setValidationError(msgCheck.message);
        return;
      }
    }

    const phoneValidation = validateIndianMobile(formData.phone);
    if (!phoneValidation.isValid) {
      setValidationError(phoneValidation.message);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRollNo = `SA-2025-0${students.length + 101}`;

      const inquiryRecord = {
        name: formData.name,
        fatherName: formData.fatherName,
        phone: formData.phone,
        email: formData.email,
        classSelected: formData.classSelected,
        course: formData.course,
        area: formData.area,
        message: formData.message
      };

      onSubmitInquiry(inquiryRecord);

      // Automatically enroll student in database with login credentials!
      addStudent({
        name: formData.name,
        rollNo: generatedRollNo,
        fatherName: formData.fatherName || 'श्री अभिभावक',
        phone: formData.phone,
        parentPhone: formData.phone,
        password: formData.phone, // Default password is mobile number!
        parentPassword: formData.phone, // Default parent password is mobile number!
        className: formData.classSelected,
        batch: formData.course,
        address: formData.area || 'शाहपुर, गोरखपुर',
        totalFee: 36000,
        paidFee: 0,
        dueFee: 36000
      });

      setSubmittedSlip({
        ...inquiryRecord,
        regId: `SA-REG-${Date.now().toString().slice(-6)}`,
        rollNo: generatedRollNo,
        password: formData.phone,
        date: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="admission" className="py-16 bg-gradient-to-b from-slate-50 to-orange-50/50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-bold text-xs uppercase tracking-wider border border-orange-200">
              <Sparkles size={14} className="text-orange-600" />
              <span>एडमिशन पूछताछ एवं ऑनलाइन प्रवेश (सत्र 2025-26)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              सर्वोदय एकेडेमिक्स में अपना स्थान सुनिश्चित करें
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              सीमित बैच साइज के कारण हम प्रत्येक कक्षा में सीमित छात्रों को ही प्रवेश देते हैं ताकि व्यक्तिगत मार्गदर्शन बना रहे। आज ही ऑनलाइन फॉर्म भरें और 2 दिन की निःशुल्क डेमो क्लास प्राप्त करें।
            </p>

            {/* Benefits Box */}
            <div className="bg-white p-5 rounded-2xl border border-orange-200/80 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="text-orange-600" size={18} />
                <span>पंजीकरण के विशेष लाभ:</span>
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Saryoday Scholarship Test (SST) में 100% तक स्कॉलरशिप</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>2 दिन की निःशुल्क ट्रायल क्लास (2-Day Free Trial Classes)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>तुरंत छात्र एवं अभिभावक पोर्टल लॉगिन क्रेडेंशियल्स उपलब्ध</span>
                </li>
              </ul>
            </div>

            {/* Offline Office Contact Box */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-2">
              <p className="font-bold text-orange-400">सीधे ऑफिस में आकर फॉर्म जमा करना चाहते हैं?</p>
              <p className="text-slate-300">
                📍 {instituteInfo?.address || "बी-कॉलोनी, शाहपुर, गोरखपुर (निकट गीता वाटिका)"}
              </p>
              <p className="text-slate-300">
                📞 फोन: +91 8400100814, +91 8400100813
              </p>
            </div>
          </div>

          {/* Right Form / Success Slip */}
          <div className="lg:col-span-7">
            {!submittedSlip ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl">
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  ऑनलाइन प्रवेश / स्कॉलरशिप टेस्ट फॉर्म
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  नीचे दी गई जानकारी भरें। फॉर्म सबमिट होते ही आपकी छात्र व अभिभावक लॉगिन पर्ची जारी हो जाएगी।
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {validationError && (
                    <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2 animate-shake">
                      <AlertCircle size={16} className="shrink-0 text-red-600" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Student Full Name * <span className="text-[10px] text-orange-600 font-normal">(English Only)</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Father's Name <span className="text-[10px] text-orange-600 font-normal">(English Only)</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="e.g. Mr. Vinod Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        मोबाइल नंबर (यही आपका लॉगिन पासवर्ड होगा)*
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10 अंकों का मोबाइल नंबर"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ईमेल पता (Email - Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        कक्षा / बोर्ड (Class)
                      </label>
                      <select
                        name="classSelected"
                        value={formData.classSelected}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option>कक्षा 6वीं - 8वीं (Junior Foundation)</option>
                        <option>कक्षा 9वीं (CBSE/ICSE/UP Board)</option>
                        <option>कक्षा 10वीं (Board Special)</option>
                        <option>कक्षा 11वीं (PCM/PCB)</option>
                        <option>कक्षा 12वीं (Board + Target)</option>
                        <option>12th Pass Dropper (NEET/JEE Target)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        इच्छुक कोर्स (Interested Course)
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option>IIT-JEE (Main + Advanced)</option>
                        <option>NEET (UG) Medical Target</option>
                        <option>Class 10th & 12th Board Booster</option>
                        <option>Pre-Foundation (Class 6th to 9th)</option>
                        <option>Crash Course & Test Series</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      आपका पता / मोहल्ला (Location in Gorakhpur)
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="उदा. शाहपुर / गीता वाटिका / बशारतपुर / बेतियाहाता"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      कोई विशेष प्रश्न या संदेश (Any Query / Message)
                    </label>
                    <textarea
                      name="message"
                      rows="2"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="अपनी आवश्यकता या सवाल यहां लिखें..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-sm shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>फॉर्म सबमिट हो रहा है...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>पंजीकरण फॉर्म सबमिट करें (Submit Application)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success / Registration Slip Card */
              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-4">
                <div className="text-center pb-4 border-b border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    बधाई! आपका पंजीकरण सफलतापूर्वक दर्ज हो गया है
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    सर्वोदय एकेडेमिक्स में आपका नामांकन पूरा हुआ। आपके लॉगिन क्रेडेंशियल्स नीचे दिए गए हैं:
                  </p>
                </div>

                <div className="printable-area bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2.5">
                  <div className="flex justify-between font-bold text-slate-800 border-b border-slate-200 pb-2">
                    <span>Registration ID:</span>
                    <span className="text-orange-600">{submittedSlip.regId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="font-semibold text-slate-800">{submittedSlip.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Course / Class:</span>
                    <span className="font-semibold text-slate-800">{submittedSlip.course} ({submittedSlip.classSelected})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registration Date:</span>
                    <span className="font-medium text-slate-800">{submittedSlip.date}</span>
                  </div>

                  {/* Highlighting Login Credentials */}
                  <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl space-y-1.5 my-2">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs border-b border-emerald-200 pb-1">
                      <Key size={14} className="text-emerald-700" />
                      <span>पोर्टल लॉगिन क्रेडेंशियल्स (Portal Login Details):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-white p-2 rounded-lg border border-emerald-200">
                        <span className="text-[11px] font-bold text-slate-500 block">🎓 छात्र लॉगिन रोल नंबर:</span>
                        <span className="font-black text-orange-600">{submittedSlip.rollNo}</span>
                        <span className="text-[11px] font-bold text-slate-500 block mt-1">🔑 छात्र पासवर्ड:</span>
                        <span className="font-bold text-slate-900">{submittedSlip.password}</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-emerald-200">
                        <span className="text-[11px] font-bold text-slate-500 block">👨‍👩‍👧 अभिभावक लॉगिन आईडी:</span>
                        <span className="font-bold text-slate-900">{submittedSlip.phone}</span>
                        <span className="text-[11px] font-bold text-slate-500 block mt-1">🔑 अभिभावक पासवर्ड:</span>
                        <span className="font-bold text-slate-900">{submittedSlip.password}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-emerald-800 pt-1">
                      * आप वेबसाइट के शीर्ष पर दिए गए <strong>"लॉगिन पोर्टल"</strong> पर जाकर इन क्रेडेंशियल्स से तुरंत छात्र या अभिभावक पोर्टल में लॉगिन कर सकते हैं।
                    </p>
                  </div>

                  <div className="pt-1 text-[11px] text-slate-500 italic">
                    📍 कृपया इस रजिस्ट्रेशन स्लिप के साथ बी-कॉलोनी, शाहपुर, गोरखपुर स्थित कार्यालय में संपर्क करें।
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition shadow"
                  >
                    <Printer size={15} /> स्लिप प्रिंट करें
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedSlip(null);
                      setFormData({
                        name: '',
                        fatherName: '',
                        phone: '',
                        email: '',
                        classSelected: 'कक्षा 12वीं (Class 12th)',
                        course: 'IIT-JEE (Main + Advanced)',
                        area: 'शाहपुर, गोरखपुर',
                        message: ''
                      });
                    }}
                    className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-xs font-bold hover:bg-orange-200 transition"
                  >
                    नया फॉर्म भरें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
