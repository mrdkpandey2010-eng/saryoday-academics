import React from 'react';
import { Quote, Award, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';

export const DirectorMessageSection = ({ director, onOpenAdmission }) => {
  return (
    <section id="about" className="py-16 bg-white overflow-hidden relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Director Photo & Stats Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm">
              {/* Decorative background box */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl opacity-20 transform -rotate-3"></div>

              <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={director?.photo || "./director-pic.jpg"}
                  alt={director?.name || "Er. R.K. Mishra"}
                  className="w-full h-80 object-cover object-top"
                />

                <div className="p-5 text-white bg-slate-950/90 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-black text-white">{director?.name}</h4>
                      <p className="text-xs font-semibold text-orange-400">{director?.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-600/30 border border-orange-500 flex items-center justify-center text-orange-400">
                      <GraduationCap size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 font-medium">
                    {director?.qualification}
                  </p>
                </div>
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-4 -right-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-4 rounded-xl shadow-lg border-2 border-white text-xs font-bold flex items-center gap-2">
                <Award size={18} />
                <span>14+ वर्ष का शिक्षण अनुभव</span>
              </div>
            </div>
          </div>

          {/* Right Message Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-bold text-xs uppercase tracking-wider border border-orange-200">
              <Quote size={14} className="text-orange-600" />
              <span>निदेशक का संदेश (Director's Message)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              "गोरखपुर के हर छात्र को देश के शीर्ष संस्थानों में पहुंचाना हमारा ध्येय है"
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                प्रिय विद्यार्थियों एवं अभिभावकों,
              </p>
              <p>
                सर्वोदय एकेडेमिक्स (शाहपुर, गोरखपुर) की स्थापना इसी उद्देश्य से की गई थी कि पूर्वांचल के विद्यार्थियों को कोटा या दिल्ली जैसे बड़े शहरों में जाए बिना, अपने ही शहर में राष्ट्रीय स्तर की गुणवत्तापूर्ण शिक्षा मिल सके।
              </p>
              <p>
                हमारा मानना है कि हर बच्चे के भीतर असीम क्षमता होती है। आवश्यकता केवल सही मार्गदर्शन, निरंतर अभ्यास और संकोच-रहित डाउट क्लीयरिंग की होती है। सर्वोदय में हम प्रत्येक विद्यार्थी पर व्यक्तिगत ध्यान देते हैं ताकि कमजोर से कमजोर छात्र भी आत्मविश्वास के साथ 95%+ अंक और प्रतियोगी परीक्षाओं में उच्च रैंक हासिल कर सके।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle size={17} className="text-emerald-600 shrink-0" />
                <span>सीमित बैच क्षमता (अधिकतम 40 छात्र)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle size={17} className="text-emerald-600 shrink-0" />
                <span>नियमित अभिभावक-शिक्षक संवाद</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle size={17} className="text-emerald-600 shrink-0" />
                <span>शून्य से शिखर तक की वैचारिक स्पष्टता</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle size={17} className="text-emerald-600 shrink-0" />
                <span>सत्र पर्यंत टेस्ट सीरीज व संपूर्ण एनालिसिस</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenAdmission}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                <span>निदेशक सर से करियर परामर्श बुक करें</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
