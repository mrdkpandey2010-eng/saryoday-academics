import React, { useState } from 'react';
import { X, ShieldAlert, User, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const LoginModal = ({ initialRole = 'admin', onClose, onLoginSuccess }) => {
  const { login, quickDemoLogin } = useAuth();
  const { students } = useData();

  const [activeRole, setActiveRole] = useState(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
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
    // Auto populate default demo credentials for user convenience
    if (roleId === 'admin') {
      setIdentifier('admin@saryoday.com');
      setPassword('admin123');
    } else if (roleId === 'teacher') {
      setIdentifier('teacher@saryoday.com');
      setPassword('teacher123');
    } else if (roleId === 'student') {
      setIdentifier('SA-2025-0101');
      setPassword('student123');
    } else if (roleId === 'parent') {
      setIdentifier('parent@saryoday.com');
      setPassword('parent123');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(activeRole, identifier.trim(), password.trim(), students);
      setIsLoading(false);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess(res.user);
        onClose();
      } else {
        setError(res.message || 'लॉगिन असफल रहा। कृपया क्रेडेंशियल जांचें।');
      }
    }, 400);
  };

  const handleQuickDemo = (roleId) => {
    const user = quickDemoLogin(roleId);
    if (user) {
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-800">
              Saryoday Portal Access
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            कोचिंग प्रबंधन एवं उपयोगकर्ता लॉगिन
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            कृपया अपनी भूमिका चुनें और अपने पंजीकृत विवरण से लॉगिन करें
          </p>

          {/* Role Tabs */}
          <div className="grid grid-cols-4 gap-1.5 mt-5 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
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
        <div className="p-6 sm:p-7 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-shake">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {activeRole === 'student' ? 'रोल नंबर अथवा ईमेल (Roll No / Email)' : activeRole === 'parent' ? 'अभिभावक मोबाइल नंबर या ईमेल' : 'ईमेल पता (Email Address)'}
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
                      ? 'SA-2025-0101'
                      : '9450123456 या parent@saryoday.com'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
                <User size={16} className="absolute right-3.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                पासवर्ड (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
                <Lock size={16} className="absolute right-3.5 top-3 text-slate-400 pointer-events-none" />
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
                  <span>पोर्टल में प्रवेश करें (Login)</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login Bar */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} className="text-orange-500" />
                <span>त्वरित डेमो लॉगिन (1-Click Test Login):</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-orange-100 hover:text-orange-800 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 transition text-center"
              >
                👑 Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('teacher')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 transition text-center"
              >
                👨‍🏫 Teacher Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 transition text-center"
              >
                🎓 Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('parent')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-800 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 transition text-center"
              >
                👨‍👩‍👧 Parent Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
