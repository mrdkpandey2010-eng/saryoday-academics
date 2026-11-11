import React, { useState } from 'react';
import {
  Calendar, Award, BookOpen, CreditCard, Download, FileText,
  CheckCircle2, Clock, ShieldCheck, Printer, LogOut, Bell, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { IdCardModal } from '../common/IdCardModal';
import { FeeReceiptModal } from '../common/FeeReceiptModal';
import { ReportCardModal } from '../common/ReportCardModal';

export const StudentDashboard = ({ onBackToPublic }) => {
  const { currentUser, logout } = useAuth();
  const {
    students,
    feeTransactions,
    attendance,
    examResults,
    studyMaterials,
    notices,
    instituteInfo
  } = useData();

  const [activeTab, setActiveTab] = useState('overview');
  const [showIdCard, setShowIdCard] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedReportCard, setSelectedReportCard] = useState(null);

  // Match active student record from database
  const student = students.find(s => s.rollNo === currentUser?.rollNo || s.id === currentUser?.id) || currentUser;

  // Student's specific fee transactions
  const myFeeTransactions = feeTransactions.filter(
    t => t.rollNo === student?.rollNo || t.studentId === student?.id
  );

  // Student's specific attendance records
  const myAttendanceLogs = attendance.filter(a => a.batch === student?.batch);

  // Student's specific exam results
  const myExamResults = [];
  examResults.forEach(ex => {
    const found = ex.results?.find(r => r.rollNo === student?.rollNo || r.studentId === student?.id);
    if (found) {
      myExamResults.push({
        ...found,
        examName: ex.examName,
        date: ex.date,
        maxMarks: ex.maxMarks
      });
    }
  });

  // Student's study materials
  const myMaterials = studyMaterials.filter(
    m => !m.batch || m.batch === student?.batch || m.batch.includes(student?.className)
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Student Portal Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow border border-emerald-500/50 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  विद्यार्थी पोर्टल (Student Portal)
                </h1>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  {student?.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {student?.name} | {student?.batch}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToPublic}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition border border-slate-700"
            >
              वेबसाइट
            </button>
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-1"
            >
              <LogOut size={13} />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Student Profile Card Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={student?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"}
              alt={student?.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
                सक्रिय नामांकित विद्यार्थी
              </span>
              <h2 className="text-2xl font-black text-white mt-1">{student?.name}</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                रोल नंबर: <span className="font-bold text-amber-400">{student?.rollNo}</span> • {student?.batch}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                पिता का नाम: {student?.fatherName} | शाहपुर, गोरखपुर
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowIdCard(true)}
              className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-slate-900 rounded-xl text-xs font-extrabold transition shadow flex items-center gap-1.5"
            >
              <Award size={15} className="text-emerald-600" />
              <span>पहचान पत्र देखें / प्रिंट करें (ID Card)</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">समग्र उपस्थिति</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{student?.attendanceRate || 94.2}%</h3>
            <p className="text-[11px] text-emerald-500 font-medium">उत्कृष्ट उपस्थिति</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">जमा शुल्क</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{Number(student?.paidFee || 0).toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-slate-400">कुल: ₹{Number(student?.totalFee || 0).toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">बकाया फीस (Due)</p>
            <h3 className="text-2xl font-black text-orange-600 mt-1">₹{Number(student?.dueFee || 0).toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-orange-500 font-medium">{student?.dueFee > 0 ? "आगामी किस्त" : "पूर्ण चुकता"}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">स्टडी नोट्स उपलब्ध</p>
            <h3 className="text-2xl font-black text-blue-600 mt-1">{myMaterials.length}</h3>
            <p className="text-[11px] text-blue-500 font-medium">डाउनलोड योग्य</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs mb-6">
          {[
            { id: 'overview', label: 'टेस्ट परिणाम व रिपोर्ट कार्ड', icon: Award },
            { id: 'materials', label: `स्टडी मटेरियल व DPP (${myMaterials.length})`, icon: BookOpen },
            { id: 'attendance', label: 'उपस्थिति विवरण', icon: Calendar },
            { id: 'fees', label: 'शुल्क लेजर व रसीदें', icon: CreditCard },
            { id: 'notices', label: 'सूचनाएं', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXAM RESULTS & REPORT CARDS */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">आपके परीक्षा परिणाम एवं रिपोर्ट कार्ड</h3>
              <p className="text-xs text-slate-500">किए गए टेस्टों के प्राप्तांक, प्रतिशत एवं शिक्षक रिमार्क्स</p>
            </div>

            <div className="space-y-4">
              {myExamResults.length > 0 ? (
                myExamResults.map((res, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Rank: #{res.rank || 1}
                        </span>
                        <span className="text-xs text-slate-400">{res.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{res.examName}</h4>
                      <p className="text-xs text-slate-600">
                        प्राप्तांक: <span className="font-bold text-emerald-700">{res.totalMarks} / {res.maxMarks}</span> ({res.percentage}%)
                        {res.percentile && <span> • परसेंटाइल: {res.percentile}</span>}
                      </p>
                      <p className="text-xs text-slate-500 italic mt-1">"{res.remarks}"</p>
                    </div>

                    <button
                      onClick={() => setSelectedReportCard(res)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                    >
                      <Printer size={14} />
                      <span>रिपोर्ट कार्ड प्रिंट करें</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <Award size={36} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-semibold text-sm">अभी कोई नया टेस्ट परिणाम प्रकाशित नहीं हुआ है।</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">डाउनलोड योग्य अध्ययन सामग्री एवं DPP</h3>
              <p className="text-xs text-slate-500">सर्वोदय फैकल्टी द्वारा तैयार उच्च गुणवत्ता वाले पीडीएफ नोट्स</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myMaterials.map((mat) => (
                <div key={mat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        {mat.subject}
                      </span>
                      <span className="text-xs text-slate-400">{mat.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{mat.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{mat.description}</p>
                    <p className="text-[11px] text-slate-400">शिक्षक: {mat.uploadedBy}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{mat.fileSize} ({mat.fileType})</span>
                    <button
                      onClick={() => alert(`"${mat.title}" डाउनलोड प्रारंभ हुआ!`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow"
                    >
                      <Download size={13} />
                      <span>डाउनलोड करें</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">आपकी उपस्थिति का विस्तृत ब्यौरा</h3>
              <p className="text-xs text-slate-500">दैनिक क्लासरूम उपस्थिति रिकॉर्ड</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">तारीख (Date)</th>
                    <th className="py-2.5 px-4">बैच का नाम</th>
                    <th className="py-2.5 px-4 text-center">स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myAttendanceLogs.map((log) => {
                    const myRec = log.records?.find(r => r.rollNo === student?.rollNo);
                    const status = myRec ? myRec.status : 'Present';
                    return (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-800">{log.date}</td>
                        <td className="py-3 px-4 text-slate-600">{log.batch}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : status === 'Absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {status === 'Present' ? 'उपस्थित (Present)' : status === 'Absent' ? 'अनुपस्थित (Absent)' : 'अवकाश (Leave)'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: FEES */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">शुल्क विवरण एवं रसीदें</h3>
              <p className="text-xs text-slate-500">जमा की गई किस्तों का विवरण व आधिकारिक रसीद डाउनलोड करें</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500">कुल निर्धारित फीस</p>
                <h4 className="text-xl font-black text-slate-900 mt-1">₹{Number(student?.totalFee).toLocaleString('en-IN')}</h4>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <p className="text-xs text-emerald-700">कुल जमा फीस</p>
                <h4 className="text-xl font-black text-emerald-700 mt-1">₹{Number(student?.paidFee).toLocaleString('en-IN')}</h4>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-center">
                <p className="text-xs text-orange-700">शेष बकाया फीस</p>
                <h4 className="text-xl font-black text-orange-700 mt-1">₹{Number(student?.dueFee).toLocaleString('en-IN')}</h4>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">रसीद संख्या</th>
                    <th className="py-2.5 px-4">तारीख</th>
                    <th className="py-2.5 px-4">भुगतान मोड</th>
                    <th className="py-2.5 px-4 text-right">राशि</th>
                    <th className="py-2.5 px-4 text-right">रसीद प्रिंट</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myFeeTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-orange-600">{txn.receiptNo}</td>
                      <td className="py-3 px-4 text-slate-600">{txn.date}</td>
                      <td className="py-3 px-4 text-slate-600">{txn.paymentMode}</td>
                      <td className="py-3 px-4 text-right font-black text-emerald-600 text-sm">
                        ₹{Number(txn.amount).toLocaleString('en-IN')}/-
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReceipt(txn)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-orange-100 hover:text-orange-700 rounded-lg text-xs font-bold transition"
                        >
                          <Printer size={13} /> रसीद प्रिंट
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: NOTICES */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">विद्यार्थी सूचना पट्ट</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{n.category}</span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{n.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ID Card Modal */}
      {showIdCard && (
        <IdCardModal
          student={student}
          instituteInfo={instituteInfo}
          onClose={() => setShowIdCard(false)}
        />
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <FeeReceiptModal
          txn={selectedReceipt}
          instituteInfo={instituteInfo}
          onClose={() => setSelectedReceipt(null)}
        />
      )}

      {/* Report Card Modal */}
      {selectedReportCard && (
        <ReportCardModal
          student={student}
          result={selectedReportCard}
          instituteInfo={instituteInfo}
          onClose={() => setSelectedReportCard(null)}
        />
      )}
    </div>
  );
};
