import React, { useState } from 'react';
import {
  Calendar, Award, CreditCard, Phone, MessageSquare, ShieldCheck,
  Printer, LogOut, Heart, AlertCircle, CheckCircle2, UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FeeReceiptModal } from '../common/FeeReceiptModal';
import { ReportCardModal } from '../common/ReportCardModal';

export const ParentDashboard = ({ onBackToPublic }) => {
  const { currentUser, logout } = useAuth();
  const {
    students,
    feeTransactions,
    attendance,
    examResults,
    notices,
    instituteInfo
  } = useData();

  const [activeTab, setActiveTab] = useState('performance');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedReportCard, setSelectedReportCard] = useState(null);

  // Match parent's child (defaulting to Rahul Verma or matched rollNo)
  const child = students.find(
    s => s.rollNo === currentUser?.childRollNo || s.fatherName?.includes(currentUser?.name) || s.parentPhone === currentUser?.phone
  ) || students[0];

  // Child's fee transactions
  const childTransactions = feeTransactions.filter(
    t => t.rollNo === child?.rollNo || t.studentId === child?.id
  );

  // Child's attendance
  const childAttendance = attendance.filter(a => a.batch === child?.batch);

  // Child's exam results
  const childResults = [];
  examResults.forEach(ex => {
    const found = ex.results?.find(r => r.rollNo === child?.rollNo || r.studentId === child?.id);
    if (found) {
      childResults.push({
        ...found,
        examName: ex.examName,
        date: ex.date,
        maxMarks: ex.maxMarks
      });
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Parent Portal Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow border border-purple-500/50 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  अभिभावक पोर्टल (Parent Portal)
                </h1>
                <span className="text-[10px] bg-purple-500/30 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/40">
                  {currentUser?.name || "श्री विनोद वर्मा"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                विद्यार्थी: {child?.name} ({child?.rollNo}) | सर्वोदय एकेडेमिक्स
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Child Profile Overview Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={child?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"}
              alt={child?.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-400 shadow-md"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-700">
                आपके सुपुत्र / सुपुत्री की प्रगति रिपोर्ट
              </span>
              <h2 className="text-2xl font-black text-white mt-1">{child?.name}</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                कक्षा व बैच: <span className="font-bold text-amber-400">{child?.batch}</span> • रोल नंबर: {child?.rollNo}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                शाहपुर परिसर, गोरखपुर | मेंटर: Er. R.K. Mishra
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="tel:08400100814"
              className="px-4 py-2 bg-white hover:bg-purple-50 text-slate-900 rounded-xl text-xs font-extrabold transition shadow flex items-center gap-1.5"
            >
              <Phone size={14} className="text-purple-600" />
              <span>संस्थान निदेशक से बात करें</span>
            </a>
            <a
              href="https://wa.me/918400100814?text=नमस्ते%20सर्वोदय%20एकेडेमिक्स,%20मैं%20राहुल%20वर्मा%20का%20अभिभावक%20बात%20कर%20रहा%20हूँ।"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition shadow flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>व्हाट्सएप परामर्श</span>
            </a>
          </div>
        </div>

        {/* Quick Child Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">उपस्थिति प्रतिशत</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{child?.attendanceRate}%</h3>
            <p className="text-[11px] text-emerald-600 font-medium">नियमित एवं समयनिष्ठ</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">नवीनतम टेस्ट रैंक</p>
            <h3 className="text-2xl font-black text-purple-600 mt-1">Rank #3</h3>
            <p className="text-[11px] text-purple-500 font-medium">शीर्ष 5% में</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">जमा शुल्क</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{Number(child?.paidFee).toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-slate-400">कुल: ₹{Number(child?.totalFee).toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">बकाया फीस</p>
            <h3 className="text-2xl font-black text-orange-600 mt-1">₹{Number(child?.dueFee).toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-orange-500 font-medium">{child?.dueFee > 0 ? "आगामी किस्त" : "पूर्ण चुकता"}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs mb-6">
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'performance' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award size={15} />
            <span>शैक्षणिक रिपोर्ट कार्ड</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'attendance' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar size={15} />
            <span>उपस्थिति मॉनिटर</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'fees' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CreditCard size={15} />
            <span>फीस ब्यौरा व रसीदें</span>
          </button>
        </div>

        {/* TAB 1: PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">{child?.name} का प्रगति पत्र (Report Card)</h3>
              <p className="text-xs text-slate-500">प्रत्येक साप्ताहिक व मासिक टेस्ट में बच्चे के अंक और विषयवार समीक्षा</p>
            </div>

            <div className="space-y-4">
              {childResults.map((res, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        Rank: #{res.rank || 1}
                      </span>
                      <span className="text-xs text-slate-400">{res.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{res.examName}</h4>
                    <p className="text-xs text-slate-600">
                      कुल प्राप्तांक: <span className="font-bold text-purple-700">{res.totalMarks} / {res.maxMarks}</span> ({res.percentage}%)
                    </p>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 mt-2">
                      <span className="font-bold text-slate-900">फैकल्टी रिमार्क: </span>
                      <span>"{res.remarks}"</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedReportCard(res)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                  >
                    <Printer size={14} />
                    <span>रिपोर्ट कार्ड देखें / प्रिंट</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">क्लासरूम उपस्थिति ट्रैकर</h3>
              <p className="text-xs text-slate-500">दैनिक रूप से बच्चे की क्लासरूम में उपस्थिति का रिकॉर्ड</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">तारीख</th>
                    <th className="py-2.5 px-4">बैच</th>
                    <th className="py-2.5 px-4 text-center">स्थिति</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {childAttendance.map((log) => {
                    const myRec = log.records?.find(r => r.rollNo === child?.rollNo);
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

        {/* TAB 3: FEES */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">शुल्क भुगतान लेजर एवं रसीदें</h3>
              <p className="text-xs text-slate-500">जमा किए गए शुल्क की रसीदें डाउनलोड या प्रिंट करें</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">रसीद संख्या</th>
                    <th className="py-2.5 px-4">तारीख</th>
                    <th className="py-2.5 px-4">भुगतान का माध्यम</th>
                    <th className="py-2.5 px-4 text-right">जमा राशि</th>
                    <th className="py-2.5 px-4 text-right">रसीद</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {childTransactions.map((txn) => (
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
                          className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg text-xs font-bold transition"
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
      </div>

      {/* Fee Receipt Modal */}
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
          student={child}
          result={selectedReportCard}
          instituteInfo={instituteInfo}
          onClose={() => setSelectedReportCard(null)}
        />
      )}
    </div>
  );
};
