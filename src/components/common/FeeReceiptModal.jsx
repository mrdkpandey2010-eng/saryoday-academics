import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

export const FeeReceiptModal = ({ txn, instituteInfo, onClose }) => {
  if (!txn) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition no-print"
        >
          <X size={20} />
        </button>

        {/* Printable Area */}
        <div className="printable-area border-2 border-orange-500/30 rounded-xl p-6 bg-white relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-8xl font-black text-slate-900 rotate-[-30deg]">SARYODAY</span>
          </div>

          {/* Receipt Header */}
          <div className="border-b-2 border-orange-500 pb-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                SA
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {instituteInfo?.name || "Saryoday Academics"}
                </h2>
                <p className="text-xs font-semibold text-orange-600">
                  {instituteInfo?.hindiName || "सर्वोदय एकेडेमिक्स"} • {instituteInfo?.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {instituteInfo?.address}
            </p>
            <p className="text-xs font-medium text-slate-600">
              Helpline: {instituteInfo?.phones?.join(" / ")} | Email: {instituteInfo?.email}
            </p>
            <div className="inline-block mt-2 px-4 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full uppercase tracking-wider">
              Official Coaching Fee Receipt (शुल्क रसीद)
            </div>
          </div>

          {/* Receipt Details Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 text-xs sm:text-sm border-b border-slate-200">
            <div>
              <p className="text-slate-500">Receipt No: <span className="font-bold text-slate-800">{txn.receiptNo}</span></p>
              <p className="text-slate-500 mt-1">Date: <span className="font-medium text-slate-800">{txn.date}</span></p>
              <p className="text-slate-500 mt-1">Payment Mode: <span className="font-medium text-slate-800">{txn.paymentMode}</span></p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Student Roll No: <span className="font-bold text-orange-600">{txn.rollNo}</span></p>
              <p className="text-slate-500 mt-1">Student Name: <span className="font-bold text-slate-800">{txn.studentName}</span></p>
              <p className="text-slate-500 mt-1">Batch / Class: <span className="font-medium text-slate-800">{txn.batch}</span></p>
            </div>
          </div>

          {/* Transaction Summary Table */}
          <table className="w-full my-4 text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500">
                <th className="py-2">Description / Particulars</th>
                <th className="py-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3">
                  <p className="font-semibold text-slate-800">Academic Tuition & Study Material Fee</p>
                  <p className="text-xs text-slate-500">{txn.remarks || "Installment Payment"}</p>
                  {txn.txnRef && <p className="text-[11px] text-slate-400">Transaction Ref: {txn.txnRef}</p>}
                </td>
                <td className="py-3 text-right font-bold text-slate-900 text-base">
                  ₹{Number(txn.amount).toLocaleString('en-IN')}/-
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300">
                <th className="py-2 text-slate-700">Total Amount Paid</th>
                <th className="py-2 text-right text-lg font-black text-orange-600">
                  ₹{Number(txn.amount).toLocaleString('en-IN')}/-
                </th>
              </tr>
            </tfoot>
          </table>

          {/* Verification & Signatures */}
          <div className="pt-6 mt-4 flex items-end justify-between border-t border-dashed border-slate-300 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <ShieldCheck size={20} />
              <span>Verified Computer Generated Receipt</span>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-slate-400 mb-1"></div>
              <p className="font-semibold text-slate-800">Authorized Signatory</p>
              <p className="text-[10px] text-slate-400">Saryoday Academics, Gorakhpur</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            बंद करें (Close)
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-md transition"
          >
            <Printer size={16} /> रसीद प्रिंट करें (Print Receipt)
          </button>
        </div>
      </div>
    </div>
  );
};
