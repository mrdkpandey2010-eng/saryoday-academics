import React, { useState } from 'react';
import { X, ShieldAlert, User, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const LoginModal = ({ initialRole = 'admin', onClose, onLoginSuccess }) => {
  const { login } = useAuth();
  const { students, faculty } = useData();

  const [activeRole, setActiveRole] = useState(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'admin', label: 'संचालक (Admin)', icon: '👑', color: 'from-orange-600 to-amber-600' },
    { id: 'teacher', label: 'अध्यापक (Teacher)', icon: '👨‍🏫', color: 'from-blue-600 to-indigo-600' },
    { id: 'student', label: 'छात्र (Student)', icon: '🎓', color: 'from-emerald-600 to-teal-600' },
    { id: 'parent', label: 'अभिभावक (Parent)', icon: '👨‍👩‍👧', color: 'from-purple-600 to-pink-600' },
  ];

  const handleRoleChange = (roleId) => {
    setActiveRole(roleId);
    setError('');
    setIdentifier('');
    setPassword('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(activeRole, identifier.trim(), password.trim(), students, faculty);
      setIsLoading(false);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess(res.user);
        onClose();
      } else {
        setError(res.message || 'लॉगिन असफल रहा। कृपया क्रेडेंशियल जांचें।');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header with Logo */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 pb-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-2">
            <img
              src="./logo.jpg"
              alt="Saryoday Logo"
              className="w-14 h-14 rounded-2xl object-contain bg-white shadow-lg border-2 border-orange-500/50 p-0.5 shrink-0"
            />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-800">
                  Saryoday Portal Access
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                कोचिंग प्रबंधन एवं लॉगिन पोर्टल
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                कृपया अपनी भूमिका चुनें और पंजीकृत विवरण से सुरक्षित प्रवेश करें
              </p>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-4 gap-1.5 mt-4 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                  activeRole === r.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="text-base">{r.icon}</span>
                <span className="text-[11px] truncate w-full">{r.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <ShieldAlert size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {activeRole === 'student'
                  ? 'रोल नंबर अथवा मोबाइल नंबर (Roll No / Mobile No)'
                  : activeRole === 'parent'
                  ? 'अभिभावक का पंजीकृत मोबाइल नंबर'
                  : 'ईमेल पता (Email Address)'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    activeRole === 'admin'
                      ? 'admin@saryoday.com'
                      : activeRole === 'teacher'
                      ? 'teacher@saryoday.com'
                      : activeRole === 'student'
                      ? 'रोल नंबर अथवा मोबाइल नंबर दर्ज करें'
                      : '10 अंकों का मोबाइल नंबर दर्ज करें'
                  }
                  autoComplete="username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
                <User size={16} className="absolute right-3.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  पासवर्ड (Password)
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  {activeRole === 'student' || activeRole === 'parent' ? '(पंजीकृत 10 अंकों का मोबाइल नंबर)' : ''}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                  tabIndex="-1"
                  aria-label={showPassword ? 'पासवर्ड छुपाएं' : 'पासवर्ड देखें'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>सत्यापन किया जा रहा है...</span>
              ) : (
                <>
                  <span>सुरक्षित लॉगिन करें (Enter Portal)</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Secure Portal Info Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
            <div className="leading-relaxed">
              <span><strong>सुरक्षा प्रमाणीकरण:</strong> यह पोर्टल SSL 256-बिट सुरक्षित है। अनधिकृत प्रवेश का प्रयास साइबर सुरक्षा नियमों के अंतर्गत प्रतिबंधित है।</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
