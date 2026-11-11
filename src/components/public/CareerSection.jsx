import React, { useState } from 'react';
import { Briefcase, Send, CheckCircle2, GraduationCap, Award, Compass, ArrowRight, UserPlus, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CareerSection = () => {
  const { submitInquiry } = useData();

  const [activeTab, setActiveTab] = useState('faculty'); // 'faculty' | 'guidance'
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    phone: '',
    email: '',
    roleApplied: 'Senior Faculty - IIT-JEE (Physics)',
    experience: '3-5 Years',
    qualification: 'M.Sc / B.Tech',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openPositions = [
    {
      role: "Senior Faculty - IIT-JEE (Physics)",
      department: "Engineering Wing",
      qualification: "B.Tech (IIT/NIT) or M.Sc Physics",
      experience: "4+ years in premier coaching institute",
      type: "Full-Time (Shahpur Campus)",
      compensation: "Industry Best + Performance Bonus"
    },
    {
      role: "Faculty - NEET Medical (Chemistry)",
      department: "Medical Wing",
      qualification: "M.Sc Organic/Inorganic Chemistry or B.Tech",
      experience: "3+ years delivering top medical ranks",
      type: "Full-Time",
      compensation: "Competitive Package"
    },
    {
      role: "Mathematics Faculty (Class 10th - 12th)",
      department: "Foundation & Board Booster",
      qualification: "M.Sc / B.Tech / B.Ed",
      experience: "2+ years teaching CBSE/ICSE Board pattern",
      type: "Full-Time / Part-Time",
      compensation: "Attractive Salary"
    },
    {
      role: "Academic Counselor & Telecaller",
      department: "Student Admissions & Operations",
      qualification: "Graduate with fluent communication",
      experience: "1+ years in education counseling",
      type: "Full-Time",
      compensation: "Fixed + Incentives"
    }
  ];

  const guidanceMilestones = [
    {
      step: "01",
      title: "Foundation Assessment (Class 8-10)",
      desc: "Scientific Aptitude Test to identify logical reasoning abilities and strengthen core Science and Mathematics."
    },
    {
      step: "02",
      title: "Stream & Target Specialization (Class 11)",
      desc: "Comprehensive orientation for IIT-JEE (PCM) vs NEET (PCB) with target college profiling (IITs, NITs, AIIMS)."
    },
    {
      step: "03",
      title: "Rank Booster & Mock Simulation (Class 12)",
      desc: "Rigorous test series, time-management drills, negative marking eradication, and all-India percentile tracking."
    },
    {
      step: "04",
      title: "Counseling & College Admission Support",
      desc: "Expert guidance for JoSAA, CSAB, NEET All-India & UP State counseling for branch and college allocation."
    }
  ];

  const handleCandidateSubmit = (e) => {
    e.preventDefault();
    if (!candidateForm.name || !candidateForm.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    submitInquiry({
      name: candidateForm.name,
      phone: candidateForm.phone,
      email: candidateForm.email || 'career@applicant.com',
      course: `Career Application: ${candidateForm.roleApplied}`,
      classSelected: `Exp: ${candidateForm.experience} | Qual: ${candidateForm.qualification}`,
      message: candidateForm.notes || 'Submitted resume/details via Career portal'
    });

    setIsSubmitted(true);
  };

  return (
    <section id="career" className="py-16 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            Career & Recruitment
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            Shape Your Future with Saryoday Academics
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Explore exciting teaching & leadership careers at Gorakhpur's fastest growing institute or access specialized student career counseling
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mt-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-5 py-2 rounded-xl transition cursor-pointer ${
                activeTab === 'faculty' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Faculty & Staff Recruitment ({openPositions.length} Openings)
            </button>
            <button
              onClick={() => setActiveTab('guidance')}
              className={`px-5 py-2 rounded-xl transition cursor-pointer ${
                activeTab === 'guidance' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Career Roadmap
            </button>
          </div>
        </div>

        {/* TAB 1: FACULTY RECRUITMENT */}
        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Open Positions List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Current Open Faculty Positions</h3>
                <span className="text-xs text-slate-500 font-medium">Location: Shahpur, Gorakhpur</span>
              </div>

              {openPositions.map((pos, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-orange-300 hover:shadow-sm transition space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Briefcase size={16} className="text-orange-600 shrink-0" />
                      <span>{pos.role}</span>
                    </h4>
                    <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      {pos.type}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold">{pos.department}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1">
                    <p>• <strong>Required:</strong> {pos.qualification}</p>
                    <p>• <strong>Experience:</strong> {pos.experience}</p>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-bold pt-1">
                    Remuneration: {pos.compensation}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Application Form */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800">
              <div className="mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-800">
                  Fast-Track Hiring
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  Apply Online in 60 Seconds
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Our academic director will review your profile and schedule a demo lecture session
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-5 bg-emerald-950/80 border border-emerald-500 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="font-bold text-white text-sm">Application Received!</h4>
                  <p className="text-xs text-emerald-200">
                    Thank you, {candidateForm.name}. Your details have been submitted to Saryoday's HR team. We will call you shortly at <strong>{candidateForm.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-orange-400 hover:underline font-bold"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCandidateSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={candidateForm.name}
                      onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Kumar"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={candidateForm.phone}
                        onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={candidateForm.email}
                        onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                        placeholder="you@email.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Position Applied For</label>
                    <select
                      value={candidateForm.roleApplied}
                      onChange={(e) => setCandidateForm({ ...candidateForm, roleApplied: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                    >
                      {openPositions.map((p, idx) => (
                        <option key={idx} value={p.role}>{p.role}</option>
                      ))}
                      <option value="Other Academic Role">Other Academic / Administrative Role</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Teaching Exp.</label>
                      <select
                        value={candidateForm.experience}
                        onChange={(e) => setCandidateForm({ ...candidateForm, experience: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="Fresher / < 1 Year">Fresher / &lt; 1 Year</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5-10 Years">5-10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Highest Degree</label>
                      <input
                        type="text"
                        value={candidateForm.qualification}
                        onChange={(e) => setCandidateForm({ ...candidateForm, qualification: e.target.value })}
                        placeholder="M.Sc / B.Tech / Ph.D"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send size={14} />
                    <span>Submit Faculty Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT CAREER GUIDANCE ROADMAP */}
        {activeTab === 'guidance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guidanceMilestones.map((m, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden group hover:border-orange-400 transition">
                  <div className="text-4xl font-black text-slate-200 group-hover:text-orange-100 transition absolute right-3 top-3">
                    {m.step}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 font-black text-xs flex items-center justify-center mb-3">
                    {m.step}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Book 1-on-1 Career Mentorship with Director</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Unsure between Engineering (IIT-JEE) and Medicine (NEET)? Er. R.K. Mishra (IIT BHU) provides complimentary 30-minute diagnostic counseling for students and parents.
                </p>
              </div>
              <a
                href="https://wa.me/918400100814?text=Hello%20Saryoday%20Academics,%20I%20would%20like%20to%20book%20a%20career%20counseling%20session."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-white text-slate-900 hover:bg-orange-50 font-extrabold text-xs rounded-xl transition shadow flex items-center gap-2 shrink-0"
              >
                <Compass size={16} className="text-orange-600" />
                <span>Schedule Career Counseling</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
