"use client";

import { useState } from "react";
import { User, Lock, Save, Loader2, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to simulate saving
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate API call
    alert("Settings saved successfully! (This is a demo)");
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Platform Configuration</h1>
      <p className="text-slate-500 mb-8">Manage your admin profile and system preferences.</p>

      <div className="grid gap-8">
        
        {/* PROFILE SETTINGS */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> Admin Profile
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                <input type="text" defaultValue="Raymond Gray Admin" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input type="email" defaultValue="admin@raymond-gray.org" disabled className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" />
              </div>
            </div>
            <div className="pt-2">
              <button disabled={isLoading} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
                Update Profile
              </button>
            </div>
          </form>
        </div>

        {/* SECURITY SETTINGS */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-600" /> Security
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                <input type="password" placeholder="New Password" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                <input type="password" placeholder="Confirm Password" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
            </div>
            <div className="pt-2">
              <button disabled={isLoading} className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition font-medium">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* SYSTEM STATUS (Read Only) */}
        <div className="bg-slate-900 p-8 rounded-xl text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-green-400" /> System Status
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Database</p>
              <p className="text-lg font-bold text-green-400">Connected (Neon)</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email Service</p>
              <p className="text-lg font-bold text-green-400">Active (Resend)</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Environment</p>
              <p className="text-lg font-bold text-blue-400">Production</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
