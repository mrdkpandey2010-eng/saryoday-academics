import React, { useState } from 'react';
import {
  CalendarCheck, BookOpen, Upload, Award, FileText, CheckCircle2,
  Users, UserCheck, X, Plus, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const TeacherDashboard = ({ onBackToPublic }) => {
  const { currentUser, logout } = useAuth();
  const {
    students,
    batches,
    attendance,
    saveDailyAttendance,
    studyMaterials,
    addStudyMaterial,
    examResults,
    saveExamResult,
    notices
  } = useData();

  const [activeTab, setActiveTab] = useState('attendance');

  // Attendance State
  const assignedBatches = batches.slice(0, 2);
  const [selectedBatch, setSelectedBatch] = useState(assignedBatches[0]?.name || 'Class 12th IIT-JEE');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusMap, setStatusMap] = useState({});

  // Study Material Form State
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [materialForm, setMaterialForm] = useState({
    title: '',
    batch: selectedBatch,
    subject: currentUser?.subject || 'Mathematics',
    fileType: 'PDF',
    fileSize: '3.5 MB',
    description: ''
  });

  // Marks Entry Form State
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [marksForm, setMarksForm] = useState({
    examName: 'साप्ताहिक क्लास टेस्ट #06',
    batch: selectedBatch,
    maxMarks: 100,
    marks: {}
  });

  const batchStudents = students.filter(s => s.batch === selectedBatch);

  // Initialize attendance statuses
  React.useEffect(() => {
    const existing = attendance.find(a => a.date === attendanceDate && a.batch === selectedBatch);
    const initialMap = {};
    batchStudents.forEach(stu => {
      const rec = existing?.records?.find(r => r.rollNo === stu.rollNo);
      initialMap[stu.rollNo] = rec ? rec.status : 'Present';
    });
    setStatusMap(initialMap);
  }, [selectedBatch, attendanceDate, students, attendance]);

  const handleSaveAttendance = () => {
    const records = batchStudents.map(stu => ({
      studentId: stu.id,
      rollNo: stu.rollNo,
      name: stu.name,
      status: statusMap[stu.rollNo] || 'Present'
    }));

    saveDailyAttendance(attendanceDate, selectedBatch, records);
    alert(`बैच "${selectedBatch}" की उपस्थिति सफलता पूर्वक दर्ज हो गई!`);
  };

  const handleMaterialSubmit = (e) => {
    e.preventDefault();
    if (!materialForm.title) return;
    addStudyMaterial({
      ...materialForm,
      uploadedBy: currentUser?.name || 'Prof. Ankit Pandey'
    });
    setShowMaterialModal(false);
    setMaterialForm({
      title: '',
      batch: selectedBatch,
      subject: currentUser?.subject || 'Mathematics',
      fileType: 'PDF',
      fileSize: '3.5 MB',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Teacher Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow">
              👨‍🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  अध्यापक पोर्टल (Faculty Portal)
                </h1>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-500/40">
                  {currentUser?.subject || "Mathematics"} HOD
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                शिक्षक: {currentUser?.name || "Prof. Ankit Pandey"} | सर्वोदय एकेडेमिक्स
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
        {/* Assigned Batches Summary Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">स्वागत है</span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">{currentUser?.name}</h2>
            <p className="text-xs text-slate-500 mt-1">
              आवंटित विषय: <span className="font-bold text-slate-800">{currentUser?.subject || "Mathematics & Physics"}</span> • शाहपुर परिसर
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMaterialModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <Upload size={14} /> स्टडी मटेरियल अपलोड करें
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs mb-6">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'attendance' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CalendarCheck size={15} />
            <span>दैनिक उपस्थिति (Attendance)</span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'materials' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen size={15} />
            <span>स्टडी नोट्स व DPP ({studyMaterials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'students' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users size={15} />
            <span>बैच छात्र सूची ({batchStudents.length})</span>
          </button>
        </div>

        {/* TAB 1: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">बैच उपस्थिति दर्ज करें</h3>
                <p className="text-xs text-slate-500">प्रत्येक छात्र की उपस्थिति स्थिति मार्क करें</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-bold bg-white"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>

                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-semibold"
                />

                <button
                  onClick={handleSaveAttendance}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 size={15} /> उपस्थिति सहेजें
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">रोल नंबर</th>
                    <th className="py-2.5 px-4">विद्यार्थी का नाम</th>
                    <th className="py-2.5 px-4 text-center">उपस्थिति चयन</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {batchStudents.map((stu) => {
                    const currentStatus = statusMap[stu.rollNo] || 'Present';
                    return (
                      <tr key={stu.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-blue-600">{stu.rollNo}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{stu.name}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white">
                            {['Present', 'Absent', 'Leave'].map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => setStatusMap({ ...statusMap, [stu.rollNo]: st })}
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

        {/* TAB 2: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">अपलोड किए गए स्टडी मटेरियल्स व DPP</h3>
                <p className="text-xs text-slate-500">छात्र इन नोट्स और असाइनमेंट्स को अपने पोर्टल से डाउनलोड कर सकते हैं</p>
              </div>
              <button
                onClick={() => setShowMaterialModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
              >
                <Plus size={15} /> नया मटेरियल जोड़ें
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyMaterials.map((mat) => (
                <div key={mat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">{mat.subject}</span>
                    <span className="text-slate-400 font-medium">{mat.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{mat.title}</h4>
                  <p className="text-slate-600">{mat.description}</p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500">
                    <span>बैच: {mat.batch}</span>
                    <span className="font-bold text-blue-600">{mat.fileSize} ({mat.fileType})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BATCH STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">बैच के नामांकित विद्यार्थी ({selectedBatch})</h3>
                <p className="text-xs text-slate-500">विद्यार्थियों की उपस्थिति एवं संपर्क विवरण</p>
              </div>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-bold bg-white"
              >
                {batches.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {batchStudents.map((stu) => (
                <div key={stu.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <img src={stu.avatar} alt={stu.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{stu.name}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{stu.rollNo}</p>
                    <p className="text-xs text-slate-500 mt-1">उपस्थिति: <span className="font-bold text-emerald-600">{stu.attendanceRate}%</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Study Material Modal */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowMaterialModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">स्टडी मटेरियल / DPP अपलोड करें</h3>
            <form onSubmit={handleMaterialSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">शीर्षक (Title)*</label>
                <input
                  type="text"
                  required
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                  placeholder="उदा. Class 12th Integration DPP #02"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">बैच चुनें</label>
                  <select
                    value={materialForm.batch}
                    onChange={(e) => setMaterialForm({ ...materialForm, batch: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">विषय (Subject)</label>
                  <input
                    type="text"
                    value={materialForm.subject}
                    onChange={(e) => setMaterialForm({ ...materialForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">विवरण / निर्देश</label>
                <textarea
                  rows="2"
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                  placeholder="छात्रों के लिए निर्देश लिखें..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMaterialModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow"
                >
                  अपलोड करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
