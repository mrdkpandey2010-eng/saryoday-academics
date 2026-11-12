import React from 'react';
import { X, Printer, Award, CheckCircle } from 'lucide-react';

export const ReportCardModal = ({ student, result, instituteInfo, onClose }) => {
  if (!result || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition no-print"
        >
          <X size={20} />
        </button>

        <div className="printable-area border-2 border-slate-900 rounded-xl p-6 bg-white relative">
          {/* Header */}
          <div className="border-b-2 border-orange-500 pb-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-1">
              <img
                src="./logo.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-xl object-contain bg-white shadow-sm border border-slate-300 p-0.5"
              />
              <div className="text-left sm:text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {instituteInfo?.name || "SARYODAY ACADEMICS"}
                </h2>
                <p className="text-xs font-bold text-orange-600">
                  {instituteInfo?.hindiName || "सर्वोदय एकेडेमिक्स"} • Gorakhpur (U.P.)
                </p>
              </div>
            </div>
            <div className="inline-block mt-2 px-4 py-0.5 bg-slate-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Student Academic Performance Report (प्रगति पत्र)
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="grid grid-cols-2 gap-4 py-4 text-xs sm:text-sm border-b border-slate-200">
            <div>
              <p className="text-slate-500">Student Name: <span className="font-bold text-slate-900">{student.name}</span></p>
              <p className="text-slate-500 mt-1">Roll Number: <span className="font-bold text-orange-600">{student.rollNo}</span></p>
              <p className="text-slate-500 mt-1">Batch / Stream: <span className="font-medium text-slate-800">{student.batch}</span></p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Exam Name: <span className="font-bold text-slate-800">{result.examName}</span></p>
              <p className="text-slate-500 mt-1">Exam Date: <span className="font-medium text-slate-800">{result.date}</span></p>
              <p className="text-slate-500 mt-1">Max Marks: <span className="font-bold text-slate-800">{result.maxMarks}</span></p>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="my-5">
            <table className="w-full text-xs sm:text-sm text-left border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-bold text-slate-700">Subject / Category</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 text-center">Max Marks</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 text-center">Marks Obtained</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 text-center">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.physicsMarks !== undefined && (
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">Physics (भौतिकी)</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">100</td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900">{result.physicsMarks}</td>
                    <td className="py-2.5 px-3 text-center text-xs text-emerald-600">Good</td>
                  </tr>
                )}
                {result.chemistryMarks !== undefined && (
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">Chemistry (रसायन)</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">100</td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900">{result.chemistryMarks}</td>
                    <td className="py-2.5 px-3 text-center text-xs text-emerald-600">Good</td>
                  </tr>
                )}
                {result.mathsMarks !== undefined && (
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">Mathematics (गणित)</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">100</td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900">{result.mathsMarks}</td>
                    <td className="py-2.5 px-3 text-center text-xs text-emerald-600">Excellent</td>
                  </tr>
                )}
                {result.subject && (
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{result.subject}</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">{result.maxMarks || 100}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900">{result.totalMarks}</td>
                    <td className="py-2.5 px-3 text-center text-xs text-emerald-600">Verified</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-orange-50 font-bold border-t-2 border-orange-200">
                <tr>
                  <td className="py-2.5 px-3 text-slate-800">Total Score / Overall Percentage</td>
                  <td className="py-2.5 px-3 text-center text-slate-700">{result.maxMarks}</td>
                  <td className="py-2.5 px-3 text-center text-orange-600 text-base">{result.totalMarks} ({result.percentage}%)</td>
                  <td className="py-2.5 px-3 text-center text-orange-700">Rank: #{result.rank || 1}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Teacher / Mentor Feedback */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
            <span className="font-bold text-slate-700">Mentor Remarks: </span>
            <span className="text-slate-600">{result.remarks || "नियमित अभ्यास बनाए रखें और संदेह निवारण सत्रों में भाग लें।"}</span>
          </div>

          {/* Signatures */}
          <div className="pt-8 mt-6 flex justify-between items-end border-t border-slate-200 text-xs">
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1"></div>
              <p className="font-semibold text-slate-700">Subject Faculty</p>
            </div>
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1"></div>
              <p className="font-semibold text-slate-700">{instituteInfo?.director?.name ? `${instituteInfo.director.name} (Director)` : 'Director'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            बंद करें
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-md transition"
          >
            <Printer size={16} /> रिपोर्ट कार्ड प्रिंट करें
          </button>
        </div>
      </div>
    </div>
  );
};
