
import React, { useState } from 'react';
import { AuthMode } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (m: AuthMode) => void;
  onSuccess: (email: string, name: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !mode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Delay
    setTimeout(() => {
      onSuccess(email, mode === 'login' ? 'John Doe' : name);
      setLoading(false);
      setEmail('');
      setPassword('');
      setName('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-gray-500 mt-1">{mode === 'login' ? 'Sign in to continue shopping' : 'Join our premium marketplace'}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => onSwitch(mode === 'login' ? 'signup' : 'login')}
                className="text-emerald-600 font-bold hover:underline"
              >
                {mode === 'login' ? 'Create one' : 'Log in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
