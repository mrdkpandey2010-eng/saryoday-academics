import React, { useState } from 'react';
import {
  Users, UserPlus, CreditCard, CalendarCheck, BookOpen, Bell, MessageSquare,
  DollarSign, Download, Upload, RotateCcw, Search, Trash2, Edit3, Printer,
  Eye, Plus, ShieldCheck, CheckCircle2, X, Phone, UserCheck, Award, Globe, Sparkles, Key, Lock
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { IdCardModal } from '../common/IdCardModal';
import { FeeReceiptModal } from '../common/FeeReceiptModal';
import { WebsiteCmsEditor } from './WebsiteCmsEditor';

export const AdminDashboard = ({ onBackToPublic }) => {
  const { logout, currentUser } = useAuth();
  const {
    students, addStudent, updateStudent, deleteStudent,
    batches, addBatch,
    faculty, addFaculty,
    feeTransactions, recordFeePayment,
    attendance, saveDailyAttendance,
    notices, addNotice, deleteNotice,
    inquiries, updateInquiryStatus,
    instituteInfo,
    resetToDefault, exportDatabaseJSON, importDatabaseJSON
  } = useData();

  const [activeTab, setActiveTab] = useState('students');
  const [cmsPageTab, setCmsPageTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('all');

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [selectedStudentForIdCard, setSelectedStudentForIdCard] = useState(null);
  const [selectedTxnForReceipt, setSelectedTxnForReceipt] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  // New Student Form State
  const [studentForm, setStudentForm] = useState({
    name: '',
    fatherName: '',
    phone: '',
    parentPhone: '',
    className: 'Class 12th',
    batch: batches[0]?.name || 'Class 12th IIT-JEE',
    totalFee: 45000,
    paidFee: 15000,
    address: 'शाहपुर, गोरखपुर'
  });

  // Fee Payment Form State
  const [feeForm, setFeeForm] = useState({
    studentId: '',
    amount: '',
    paymentMode: 'UPI / PhonePe',
    txnRef: '',
    remarks: 'नियमित फीस किस्त (Tuition Installment)'
  });

  // Notice Form State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'Academic',
    target: 'all',
    content: ''
  });

  // Attendance batch selection
  const [attendanceBatch, setAttendanceBatch] = useState(batches[0]?.name || 'Class 12th IIT-JEE');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  // Initialize attendance for selected batch
  React.useEffect(() => {
    const batchStudents = students.filter(s => s.batch === attendanceBatch);
    const existing = attendance.find(a => a.date === attendanceDate && a.batch === attendanceBatch);
    const initialRecs = {};
    batchStudents.forEach(stu => {
      const rec = existing?.records?.find(r => r.rollNo === stu.rollNo);
      initialRecs[stu.rollNo] = rec ? rec.status : 'Present';
    });
    setAttendanceRecords(initialRecs);
  }, [attendanceBatch, attendanceDate, students, attendance]);

  // Overall Financial & Academic KPI Calculations
  const totalStudentsCount = students.length;
  const totalFeeCollected = feeTransactions.reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const totalDues = students.reduce((acc, s) => acc + Number(s.dueFee || 0), 0);
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'Pending').length;

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.phone.includes(searchQuery);
    const matchesBatch = selectedBatchFilter === 'all' || s.batch === selectedBatchFilter;
    return matchesSearch && matchesBatch;
  });

  // Handle Add Student Submit
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.phone) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, studentForm);
      setEditingStudent(null);
    } else {
      addStudent(studentForm);
    }

    setShowAddStudentModal(false);
    setStudentForm({
      name: '',
      fatherName: '',
      phone: '',
      parentPhone: '',
      className: 'Class 12th',
      batch: batches[0]?.name || 'Class 12th IIT-JEE',
      totalFee: 45000,
      paidFee: 15000,
      address: 'शाहपुर, गोरखपुर'
    });
  };

  // Handle Record Fee Submit
  const handleFeeSubmit = (e) => {
    e.preventDefault();
    if (!feeForm.studentId || !feeForm.amount) return;

    const stu = students.find(s => s.id === feeForm.studentId || s.rollNo === feeForm.studentId);
    if (!stu) return;

    const txn = recordFeePayment({
      studentId: stu.id,
      rollNo: stu.rollNo,
      studentName: stu.name,
      batch: stu.batch,
      amount: Number(feeForm.amount),
      paymentMode: feeForm.paymentMode,
      txnRef: feeForm.txnRef || `REF-${Date.now().toString().slice(-6)}`,
      remarks: feeForm.remarks,
      date: new Date().toISOString().split('T')[0],
      collectedBy: currentUser?.name || 'Er. R.K. Mishra (Director)'
    });

    setShowAddFeeModal(false);
    setSelectedTxnForReceipt(txn);
    setFeeForm({
      studentId: '',
      amount: '',
      paymentMode: 'UPI / PhonePe',
      txnRef: '',
      remarks: 'नियमित फीस किस्त (Tuition Installment)'
    });
  };

  // Handle Save Attendance
  const handleSaveAttendance = () => {
    const batchStudents = students.filter(s => s.batch === attendanceBatch);
    const records = batchStudents.map(stu => ({
      studentId: stu.id,
      rollNo: stu.rollNo,
      name: stu.name,
      status: attendanceRecords[stu.rollNo] || 'Present'
    }));

    saveDailyAttendance(attendanceDate, attendanceBatch, records);
    alert(`बैच "${attendanceBatch}" की उपस्थिति (${attendanceDate}) सफलतापूर्वक सहेज ली गई है!`);
  };

  // Handle Notice Submit
  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    addNotice(noticeForm);
    setShowAddNoticeModal(false);
    setNoticeForm({
      title: '',
      category: 'Academic',
      target: 'all',
      content: ''
    });
  };

  // Handle JSON Import
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = importDatabaseJSON(event.target.result);
        if (res.success) {
          alert('डेटाबेस सफलतापूर्वक रीस्टोर कर लिया गया है!');
        } else {
          alert('फ़ाइल लोड करने में त्रुटि: ' + res.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-sm shadow">
              SA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  सर्वोदय एकेडेमिक्स — कोचिंग संचालक (एडमिन) पैनल
                </h1>
                <span className="hidden sm:inline text-[10px] bg-orange-500/30 text-orange-400 font-bold px-2 py-0.5 rounded-full border border-orange-500/40">
                  Director Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                संचालक: {currentUser?.name || "Er. R.K. Mishra"} | शाहपुर, गोरखपुर
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToPublic}
              className="px-3.5 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-1.5"
            >
              <Edit3 size={13} />
              <span>लाइव वेबसाइट पर एडिट करें</span>
            </button>
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition shadow"
            >
              लॉगआउट
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">कुल नामांकित छात्र</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalStudentsCount}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">सक्रिय छात्र</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={22} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">कुल शुल्क वसूली</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">₹{totalFeeCollected.toLocaleString('en-IN')}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{feeTransactions.length} रसीदें जारी</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard size={22} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">बकाया फीस (Pending)</p>
              <h3 className="text-2xl font-black text-orange-600 mt-1">₹{totalDues.toLocaleString('en-IN')}</h3>
              <p className="text-[11px] text-orange-500 font-medium mt-0.5">शीघ्र भुगतान अपेक्षित</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <DollarSign size={22} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">नई प्रवेश पूछताछ</p>
              <h3 className="text-2xl font-black text-purple-600 mt-1">{pendingInquiriesCount}</h3>
              <p className="text-[11px] text-purple-500 font-medium mt-0.5">वेबसाइट से प्राप्त</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare size={22} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs mb-6 overflow-x-auto">
          {[
            { id: 'students', label: 'विद्यार्थी (Students)', icon: Users },
            { id: 'cms', label: 'वेबसाइट पेज संपादक (CMS Editor)', icon: Globe },
            { id: 'fees', label: 'फीस प्रबंधन (Fees)', icon: CreditCard },
            { id: 'attendance', label: 'दैनिक उपस्थिति (Attendance)', icon: CalendarCheck },
            { id: 'batches', label: 'बैच व फैकल्टी (Batches)', icon: BookOpen },
            { id: 'notices', label: 'सूचनाएं (Notices)', icon: Bell },
            { id: 'inquiries', label: `ऑनलाइन पूछताछ (${pendingInquiriesCount})`, icon: MessageSquare },
            { id: 'settings', label: 'डेटाबेस बैकअप (Backup)', icon: Upload },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: STUDENTS MANAGEMENT */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="छात्र का नाम, रोल नंबर या मोबाइल खोजें..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                  />
                </div>

                <select
                  value={selectedBatchFilter}
                  onChange={(e) => setSelectedBatchFilter(e.target.value)}
                  className="py-2 px-3 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                >
                  <option value="all">सभी बैच (All Batches)</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingStudent(null);
                  setShowAddStudentModal(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition shadow"
              >
                <UserPlus size={15} />
                <span>नया विद्यार्थी जोड़ें (Add Student)</span>
              </button>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">विद्यार्थी (Student)</th>
                    <th className="py-3 px-4">कक्षा व बैच</th>
                    <th className="py-3 px-4">संपर्क व अभिभावक</th>
                    <th className="py-3 px-4">शुल्क स्थिति (Fees)</th>
                    <th className="py-3 px-4 text-center">उपस्थिति (%)</th>
                    <th className="py-3 px-4 text-right">कार्य (Actions)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((stu) => (
                    <tr key={stu.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={stu.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"}
                            alt={stu.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{stu.name}</p>
                            <p className="text-[11px] text-orange-600 font-semibold">{stu.rollNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{stu.batch}</p>
                        <p className="text-[11px] text-slate-500">{stu.className}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-slate-800">{stu.phone}</p>
                        <p className="text-[11px] text-slate-500">पिता: {stu.fatherName}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <p className="text-slate-700">जमा: <span className="font-bold text-emerald-600">₹{Number(stu.paidFee).toLocaleString('en-IN')}</span></p>
                          {Number(stu.dueFee) > 0 ? (
                            <p className="text-red-600 font-bold text-[11px]">बकाया: ₹{Number(stu.dueFee).toLocaleString('en-IN')}</p>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">पूर्ण चुकता</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {stu.attendanceRate || 94.0}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudentForIdCard(stu)}
                            title="ID कार्ड प्रिंट करें"
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                          >
                            <Award size={15} />
                          </button>
                          <button
                            onClick={() => {
                              alert(`विद्यार्थी व अभिभावक क्रेडेंशियल्स:\n\n🎓 छात्र लॉगिन आईडी: ${stu.rollNo}\n🔑 छात्र पासवर्ड: ${stu.password || stu.phone || 'student123'}\n\n👨‍👩‍👧 अभिभावक लॉगिन आईडी: ${stu.parentPhone || stu.phone}\n🔑 अभिभावक पासवर्ड: ${stu.parentPassword || stu.phone || 'parent123'}\n\n(छात्र/अभिभावक पोर्टल पर जाकर सीधे लॉगिन किया जा सकता है)`);
                            }}
                            title="लॉगिन पासवर्ड देखें"
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition font-bold"
                          >
                            <Key size={15} />
                          </button>
                          <button
                            onClick={() => {
                              setFeeForm({ ...feeForm, studentId: stu.id, amount: stu.dueFee || '' });
                              setShowAddFeeModal(true);
                            }}
                            title="फीस जमा करें"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition font-bold"
                          >
                            <DollarSign size={15} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingStudent(stu);
                              setStudentForm(stu);
                              setShowAddStudentModal(true);
                            }}
                            title="एडिट करें"
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`क्या आप ${stu.name} को रिकॉर्ड से हटाना चाहते हैं?`)) {
                                deleteStudent(stu.id);
                              }
                            }}
                            title="डिलीट करें"
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FEE MANAGEMENT */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">शुल्क प्रबंधन एवं रसीद प्रणाली</h3>
                <p className="text-xs text-slate-500 mt-0.5">कोचिंग फीस प्राप्त करें एवं तुरंत आधिकारिक प्रिंटेड रसीद जारी करें</p>
              </div>
              <button
                onClick={() => setShowAddFeeModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow"
              >
                <Plus size={15} />
                <span>नई फीस जमा करें (Record Fee)</span>
              </button>
            </div>

            {/* Fee Transactions Log Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50/70">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">हाल ही में जारी फीस रसीदें (Transaction History)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">रसीद संख्या (Receipt No)</th>
                      <th className="py-3 px-4">विद्यार्थी का नाम</th>
                      <th className="py-3 px-4">बैच</th>
                      <th className="py-3 px-4">भुगतान मोड</th>
                      <th className="py-3 px-4">तारीख</th>
                      <th className="py-3 px-4 text-right">जमा राशि (Amount)</th>
                      <th className="py-3 px-4 text-right">रसीद प्रिंट</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {feeTransactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-orange-600">{txn.receiptNo}</td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{txn.studentName}</p>
                          <p className="text-[11px] text-slate-500">Roll: {txn.rollNo}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{txn.batch}</td>
                        <td className="py-3 px-4 text-slate-600 font-medium">{txn.paymentMode}</td>
                        <td className="py-3 px-4 text-slate-500">{txn.date}</td>
                        <td className="py-3 px-4 text-right font-black text-emerald-600 text-sm">
                          ₹{Number(txn.amount).toLocaleString('en-IN')}/-
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedTxnForReceipt(txn)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-orange-100 hover:text-orange-700 rounded-lg text-xs font-bold transition"
                          >
                            <Printer size={13} /> प्रिंट
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANCE REGISTER */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">दैनिक क्लासरूम उपस्थिति रजिस्टर</h3>
                <p className="text-xs text-slate-500">बैच चुनें और विद्यार्थियों की उपस्थिति दर्ज करें</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">बैच चुनें</label>
                  <select
                    value={attendanceBatch}
                    onChange={(e) => setAttendanceBatch(e.target.value)}
                    className="py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-semibold bg-white"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">तारीख (Date)</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-semibold"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveAttendance}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition shadow flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={15} /> उपस्थिति सहेजें (Save)
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Students List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-4">रोल नंबर</th>
                    <th className="py-2.5 px-4">विद्यार्थी का नाम</th>
                    <th className="py-2.5 px-4">मोबाइल</th>
                    <th className="py-2.5 px-4 text-center">स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.filter(s => s.batch === attendanceBatch).map((stu) => {
                    const currentStatus = attendanceRecords[stu.rollNo] || 'Present';
                    return (
                      <tr key={stu.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-orange-600">{stu.rollNo}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{stu.name}</td>
                        <td className="py-3 px-4 text-slate-600">{stu.phone}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white">
                            {['Present', 'Absent', 'Leave'].map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => setAttendanceRecords({ ...attendanceRecords, [stu.rollNo]: st })}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                                  currentStatus === st
                                    ? st === 'Present'
                                      ? 'bg-emerald-600 text-white'
                                      : st === 'Absent'
                                      ? 'bg-red-600 text-white'
                                      : 'bg-amber-500 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {st === 'Present' ? 'उपस्थित (P)' : st === 'Absent' ? 'अनुपस्थित (A)' : 'अवकाश (L)'}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BATCHES & FACULTY */}
        {activeTab === 'batches' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batches Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">सक्रिय बैच (Active Batches)</h3>
                <button
                  onClick={() => {
                    setCmsPageTab('courses');
                    setActiveTab('cms');
                  }}
                  className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit3 size={12} /> कोर्स व फीस एडिट करें
                </button>
              </div>
              <div className="space-y-3">
                {batches.map((batch) => (
                  <div key={batch.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{batch.name}</h4>
                      <p className="text-slate-500">{batch.timing} | {batch.room}</p>
                      <p className="text-orange-600 font-medium">फैकल्टी: {batch.faculty}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      {batch.enrolledCount} छात्र
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">शिक्षक मंडल (Faculty Team)</h3>
                <button
                  onClick={() => {
                    setCmsPageTab('faculty');
                    setActiveTab('cms');
                  }}
                  className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit3 size={12} /> शिक्षक जोड़ें / एडिट करें
                </button>
              </div>
              <div className="space-y-3">
                {faculty.map((f) => (
                  <div key={f.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center gap-3">
                    <img src={f.photo} alt={f.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                      <p className="text-slate-600 font-semibold">{f.role}</p>
                      <p className="text-orange-600 text-[11px]">{f.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: NOTICES & ANNOUNCEMENTS */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">सूचनाएं एवं घोषणाएं प्रबंधन</h3>
                <p className="text-xs text-slate-500">वेबसाइट तथा विद्यार्थी पोर्टल के लिए नई सूचनाएं प्रसारित करें</p>
              </div>
              <button
                onClick={() => setShowAddNoticeModal(true)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
              >
                <Plus size={15} /> नई सूचना जोड़ें
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">{n.category}</span>
                      <span className="text-[11px] text-slate-400">{n.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{n.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => deleteNotice(n.id)}
                      className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 size={13} /> हटाएं
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ONLINE INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">वेबसाइट से प्राप्त ऑनलाइन प्रवेश पूछताछ</h3>
              <p className="text-xs text-slate-500">अभिभावकों व छात्रों के अनुरोध देखें और सीधे संपर्क करें</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">तारीख</th>
                    <th className="py-3 px-4">नाम व संपर्क</th>
                    <th className="py-3 px-4">कोर्स व कक्षा</th>
                    <th className="py-3 px-4">संदेश / प्रश्न</th>
                    <th className="py-3 px-4">स्थिति (Status)</th>
                    <th className="py-3 px-4 text-right">कार्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-500">{inq.date}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{inq.name}</p>
                        <p className="text-slate-500">{inq.phone}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800">{inq.course}</p>
                        <p className="text-[11px] text-slate-500">{inq.classSelected}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs">{inq.message || inq.area}</td>
                      <td className="py-3 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className={`py-1 px-2.5 rounded-lg text-xs font-bold border ${
                            inq.status === 'Pending'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : inq.status === 'Contacted'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          <option value="Pending">लंबित (Pending)</option>
                          <option value="Contacted">संपर्क हो गया (Contacted)</option>
                          <option value="Enrolled">प्रवेशित (Enrolled)</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`tel:${inq.phone}`}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow"
                        >
                          <Phone size={12} /> कॉल करें
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: DATABASE BACKUP & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 max-w-3xl">
            <div>
              <h3 className="font-bold text-lg text-slate-900">डेटाबेस प्रबंधन एवं सुरक्षा बैकअप</h3>
              <p className="text-xs text-slate-500 mt-1">
                चूंकि यह वेबसाइट गिटहब पेजेस अथवा किसी भी क्लाउड होस्टिंग पर बिना किसी सर्वर लागत के मुफ्त चलती है, आप अपने पूरे कोचिंग डेटा का JSON बैकअप डाउनलोड कर सकते हैं और कभी भी रीस्टोर कर सकते हैं।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Download size={20} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">पूरा डेटाबेस डाउनलोड करें</h4>
                <p className="text-xs text-slate-600">सभी विद्यार्थियों, फीस रसीदों, उपस्थिति और सूचनाओं का JSON बैकअप सुरक्षित रखें।</p>
                <button
                  onClick={exportDatabaseJSON}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <Download size={15} /> बैकअप डाउनलोड करें
                </button>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Upload size={20} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">JSON बैकअप फ़ाइल रीस्टोर करें</h4>
                <p className="text-xs text-slate-600">पूर्व में डाउनलोड की गई JSON बैकअप फ़ाइल से तुरंत पूरा डेटा लोड करें।</p>
                <label className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer">
                  <Upload size={15} /> फ़ाइल चुनें व रीस्टोर करें
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="p-4 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-red-900 text-xs">डिफ़ॉल्ट डेमो डेटा रीसेट</h5>
                  <p className="text-[11px] text-red-700">सभी बदलाव हटाकर मूल डेमो रिकॉर्ड्स पुनः लोड करें।</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('क्या आप डिफ़ॉल्ट डेमो डेटा पर रीसेट करना चाहते हैं?')) {
                      resetToDefault();
                      alert('डेटा डिफ़ॉल्ट डेमो स्थिति पर रीसेट कर दिया गया है!');
                    }
                  }}
                  className="px-3.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition"
                >
                  रीसेट करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB CMS: WEBSITE PAGE EDITOR */}
        {activeTab === 'cms' && (
          <WebsiteCmsEditor initialTab={cmsPageTab} />
        )}
      </div>

      {/* MODAL: ADD / EDIT STUDENT */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddStudentModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingStudent ? 'विद्यार्थी विवरण अपडेट करें' : 'नया विद्यार्थी नामांकित करें'}
            </h3>

            <form onSubmit={handleStudentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">विद्यार्थी का नाम*</label>
                <input
                  type="text"
                  required
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="उदा. राहुल वर्मा"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">पिता का नाम</label>
                  <input
                    type="text"
                    value={studentForm.fatherName}
                    onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="श्री विनोद वर्मा"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मोबाइल नंबर*</label>
                  <input
                    type="text"
                    required
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="9450123456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">कक्षा</label>
                  <select
                    value={studentForm.className}
                    onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option>Class 9th</option>
                    <option>Class 10th</option>
                    <option>Class 11th</option>
                    <option>Class 12th</option>
                    <option>12th Pass Dropper</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">आवंटित बैच</label>
                  <select
                    value={studentForm.batch}
                    onChange={(e) => setStudentForm({ ...studentForm, batch: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">कुल निर्धारित फीस (₹)</label>
                  <input
                    type="number"
                    value={studentForm.totalFee}
                    onChange={(e) => setStudentForm({ ...studentForm, totalFee: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">प्रथम किस्त जमा (₹)</label>
                  <input
                    type="number"
                    value={studentForm.paidFee}
                    onChange={(e) => setStudentForm({ ...studentForm, paidFee: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  लॉगिन पासवर्ड (Login Password)
                </label>
                <input
                  type="text"
                  value={studentForm.password !== undefined ? studentForm.password : studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-orange-600"
                  placeholder="डिफ़ॉल्ट: मोबाइल नंबर"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">
                  विद्यार्थी एवं अभिभावक इसी पासवर्ड से पोर्टल में लॉगिन करेंगे। (डिफ़ॉल्ट: मोबाइल नंबर)
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">पता (गोरखपुर)</label>
                <input
                  type="text"
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="बी-कॉलोनी, शाहपुर, गोरखपुर"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  सुरक्षित करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD FEE PAYMENT */}
      {showAddFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAddFeeModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              कोचिंग फीस जमा करें
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              विद्यार्थी चुनें एवं भुगतान विवरण दर्ज करें
            </p>

            <form onSubmit={handleFeeSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">विद्यार्थी चुनें*</label>
                <select
                  required
                  value={feeForm.studentId}
                  onChange={(e) => {
                    const sel = students.find(s => s.id === e.target.value);
                    setFeeForm({
                      ...feeForm,
                      studentId: e.target.value,
                      amount: sel ? sel.dueFee || '' : ''
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="">विद्यार्थी चुनें (Select Student)</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNo}) - बकाया: ₹{s.dueFee}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">जमा राशि (Amount in ₹)*</label>
                <input
                  type="number"
                  required
                  value={feeForm.amount}
                  onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
                  placeholder="उदा. 15000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">भुगतान का माध्यम (Payment Mode)</label>
                <select
                  value={feeForm.paymentMode}
                  onChange={(e) => setFeeForm({ ...feeForm, paymentMode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option>UPI / PhonePe</option>
                  <option>Google Pay</option>
                  <option>Cash (नकद रसीद)</option>
                  <option>Bank Netbanking</option>
                  <option>Cheque</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ट्रांजैक्शन रेफरेंस / चेक नंबर</label>
                <input
                  type="text"
                  value={feeForm.txnRef}
                  onChange={(e) => setFeeForm({ ...feeForm, txnRef: e.target.value })}
                  placeholder="UPI Ref ID या रसीद संदर्भ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">विवरण / रिमार्क्स</label>
                <input
                  type="text"
                  value={feeForm.remarks}
                  onChange={(e) => setFeeForm({ ...feeForm, remarks: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddFeeModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow"
                >
                  रसीद जारी करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NOTICE */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAddNoticeModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">नई सूचना प्रकाशित करें</h3>
            <form onSubmit={handleNoticeSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">शीर्षक (Title)*</label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="उदा. रविवार मॉक टेस्ट सूचना"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">श्रेणी</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="Academic">शैक्षणिक (Academic)</option>
                    <option value="Exam">परीक्षा (Exam)</option>
                    <option value="Meeting">बैठक / PTM</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">लक्षित दर्शक</label>
                  <select
                    value={noticeForm.target}
                    onChange={(e) => setNoticeForm({ ...noticeForm, target: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="all">सभी (Public & All)</option>
                    <option value="students">केवल छात्र (Students)</option>
                    <option value="parents">केवल अभिभावक (Parents)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">सूचना का विवरण*</label>
                <textarea
                  rows="3"
                  required
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="सूचना का पूरा विवरण लिखें..."
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  प्रकाशित करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ID Card Print Modal */}
      {selectedStudentForIdCard && (
        <IdCardModal
          student={selectedStudentForIdCard}
          instituteInfo={instituteInfo}
          onClose={() => setSelectedStudentForIdCard(null)}
        />
      )}

      {/* Fee Receipt Print Modal */}
      {selectedTxnForReceipt && (
        <FeeReceiptModal
          txn={selectedTxnForReceipt}
          instituteInfo={instituteInfo}
          onClose={() => setSelectedTxnForReceipt(null)}
        />
      )}
    </div>
  );
};
