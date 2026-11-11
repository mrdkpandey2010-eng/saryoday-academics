import React from 'react';
import { X, Printer, QrCode } from 'lucide-react';

export const IdCardModal = ({ student, instituteInfo, onClose }) => {
  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition no-print"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold text-slate-900 mb-4 no-print text-center">
          विद्यार्थी पहचान पत्र (Student ID Card)
        </h3>

        {/* Printable ID Card Container */}
        <div className="printable-area border-2 border-slate-900 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-white to-slate-50 max-w-sm mx-auto">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-4 text-center relative">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-white text-orange-600 font-black text-sm flex items-center justify-center shadow">
                SA
              </div>
              <div>
                <h4 className="text-base font-black tracking-tight leading-tight">
                  {instituteInfo?.name || "SARYODAY ACADEMICS"}
                </h4>
                <p className="text-[10px] text-orange-100 uppercase font-semibold tracking-wider">
                  Shahpur, Gorakhpur (U.P.)
                </p>
              </div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xs text-[10px] py-0.5 px-3 rounded-full inline-block mt-1">
              STUDENT IDENTITY CARD • सत्र 2025-26
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="p-5 text-center">
            <div className="relative inline-block mb-3">
              <img
                src={student.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"}
                alt={student.name}
                className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md mx-auto"
              />
              <span className="absolute -bottom-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full left-1/2 -translate-x-1/2 shadow">
                VERIFIED
              </span>
            </div>

            <h5 className="text-lg font-black text-slate-900 leading-snug">
              {student.name}
            </h5>
            <p className="text-xs font-bold text-orange-600 mb-4">
              Roll No: {student.rollNo}
            </p>

            {/* Details Table */}
            <div className="text-left text-xs bg-slate-100/70 p-3 rounded-xl space-y-1.5 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">कक्षा / Class:</span>
                <span className="font-bold text-slate-800">{student.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">बैच / Batch:</span>
                <span className="font-semibold text-slate-800">{student.batch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">पिता का नाम:</span>
                <span className="font-medium text-slate-800">{student.fatherName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">मोबाइल / Phone:</span>
                <span className="font-medium text-slate-800">{student.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">आपातकालीन संपर्क:</span>
                <span className="font-medium text-slate-800">{student.parentPhone || student.phone}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/80 pt-1 text-[11px]">
                <span className="text-orange-600 font-bold">पोर्टल पासवर्ड (Password):</span>
                <span className="font-bold text-slate-800">{student.phone}</span>
              </div>
            </div>

            {/* Bottom Bar with QR and Signature */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-600 text-[10px]">
                <QrCode size={34} className="text-slate-800" />
                <span className="text-left leading-tight">
                  Scan for<br/>Verification
                </span>
              </div>
              <div className="text-right">
                <div className="w-20 border-b border-slate-400 mb-0.5"></div>
                <p className="text-[9px] font-bold text-slate-700">Director Sign</p>
                <p className="text-[8px] text-slate-400">Er. R.K. Mishra</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-slate-900 text-white text-[9px] py-1.5 px-3 text-center">
            📍 B-Colony, Shahpur, Gorakhpur | 📞 8400100814
          </div>
        </div>

        {/* Action Buttons */}
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
            <Printer size={16} /> ID कार्ड प्रिंट करें
          </button>
        </div>
      </div>
    </div>
  );
};
