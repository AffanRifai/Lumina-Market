
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-bold text-gray-900">{user.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{user.email}</p>
            <button className="mt-6 w-full py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Edit Avatar</button>
          </div>
          
          <nav className="mt-6 space-y-1">
            {['General', 'Security', 'Notifications', 'Payment Methods', 'Addresses'].map(item => (
              <button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item === 'General' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                {item}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-6 text-gray-900">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" readOnly defaultValue={user.email} className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl outline-none cursor-not-allowed opacity-60" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Birthday</label>
                  <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Account Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-800">Password</h4>
                    <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                  </div>
                  <button className="text-emerald-600 font-bold text-sm hover:underline">Change</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-800">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-500 text-red-400 font-medium">Disabled</p>
                  </div>
                  <button className="text-emerald-600 font-bold text-sm hover:underline">Enable</button>
                </div>
              </div>
            </section>

            <div className="pt-8 flex justify-end">
              <button className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
