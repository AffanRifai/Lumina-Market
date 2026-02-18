
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onOpenAuth, onOpenCart, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
          Lumina
        </Link>

        {/* Search Bar (Visual Only for now) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder="Search products, brands..." 
            className="w-full bg-gray-100 border-none rounded-full px-6 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>

        <div className="flex items-center space-y-0 space-x-6">
          <button onClick={onOpenCart} className="relative group text-gray-600 hover:text-emerald-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-emerald-600"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile Settings</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</Link>
                  <hr className="my-1 border-gray-100" />
                  <button 
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
