import React, { useState } from 'react';
import { Phone, User, Sparkles, Gift, ArrowRight, ShieldCheck, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { validateIndianMobile } from '../../utils/validation';

export const VisitorWelcomeModal = ({ onUnlocked }) => {
  const { submitInquiry } = useData();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [targetExam, setTargetExam] = useState('IIT-JEE (Main + Advanced)');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const phoneValidation = validateIndianMobile(phone);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.message);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Record lead directly in database inquiries for admission counselors
      submitInquiry({
        name: name.trim() || `Visitor (+91-${phoneValidation.cleanPhone})`,
        phone: phoneValidation.cleanPhone,
        email: `${phoneValidation.cleanPhone}@visitor.saryoday.com`,
        course: targetExam,
        classSelected: 'Website Visitor Lead',
        message: 'Lead captured via Homepage Welcome Gate. Eligible for Free Study Kit and Scholarship Test.'
      });

      // Save pass state in sessionStorage & localStorage
      try {
        sessionStorage.setItem('SARYODAY_VISITOR_GATE_PASSED', 'true');
        localStorage.setItem('SARYODAY_VISITOR_PHONE', phoneValidation.cleanPhone);
      } catch (err) {
        // ignore
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onUnlocked) onUnlocked();
      }, 900);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full overflow-hidden border border-orange-500/30 transform transition-all animate-scaleUp">
        {/* Top Decorative Gradient Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600"></div>

        {/* Header with Logo & Welcome Greeting */}
        <div className="p-5 sm:p-6 pb-4 bg-gradient-to-b from-slate-900 to-slate-800 text-white text-center relative">
          <div className="inline-block relative mb-2">
            <img
              src="./logo.jpg"
              alt="Saryoday Academics"
              className="w-14 h-14 rounded-2xl object-contain bg-white mx-auto shadow-lg border-2 border-orange-500 p-0.5"
            />
            <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-600 to-orange-600 text-[9px] font-black uppercase text-white px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
              Free Access
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-orange-950/90 text-orange-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-orange-800/80 mb-1.5">
            <Sparkles size={11} className="text-amber-400" />
            <span>गोरखपुर का अग्रणी कोचिंग संस्थान</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Welcome to Saryoday Academics
          </h3>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Building Strong Foundation for Board Exams, IIT-JEE & NEET
          </p>

          {/* Value Proposition Pill */}
          <div className="mt-3.5 p-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-left flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
              <Gift size={13} />
            </div>
            <div className="text-[11px] text-slate-200 leading-snug">
              <span className="font-bold text-amber-300">विशेष उपहार: </span>
              <span>मोबाइल नंबर दर्ज कर तुरंत पाएं <strong>फ्री IIT-JEE/NEET स्टडी किट</strong>, स्कॉलरशिप टेस्ट सिलेबस एवं 1-दिन ट्रायल क्लास पास!</span>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-5 sm:p-6 space-y-3.5 bg-white">
          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-bold text-emerald-950 text-sm">स्वागत है! वेबसाइट अनलॉक हो गई है</h4>
              <p className="text-xs text-emerald-800">
                सर्वोदय एकेडेमिक्स में आपका स्वागत है। हमारे एडमिशन काउंसलर आपसे जल्द संपर्क करेंगे।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                  <span>मोबाइल नंबर (Mobile Number) *</span>
                  <span className="text-[10px] text-orange-600 font-semibold">10 अंक आवश्यक</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-black text-slate-400 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-400"
                    autoFocus
                  />
                  <Phone size={15} className="absolute right-3.5 top-3 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    विद्यार्थी का नाम (Name)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="आपका नाम (वैकल्पिक)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    लक्ष्य / कक्षा (Target)
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="IIT-JEE (Main + Advanced)">IIT-JEE (Main + Adv)</option>
                    <option value="NEET (UG) Medical">NEET (UG) Medical</option>
                    <option value="Class 10th Board Booster">Class 10th Board Booster</option>
                    <option value="Class 12th Board Booster">Class 12th Board Booster</option>
                    <option value="Pre-Foundation (Class 6th-9th)">Foundation (6th-9th)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {isSubmitting ? (
                  <span>सत्यापन किया जा रहा है...</span>
                ) : (
                  <>
                    <span>वेबसाइट में प्रवेश करें (Unlock & Continue)</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Trust and Privacy Footer */}
          <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>100% गोपनीय व सुरक्षित</span>
            </span>
            <span className="text-slate-400">शाहपुर, गोरखपुर</span>
          </div>
        </div>
      </div>
    </div>
  );
};
