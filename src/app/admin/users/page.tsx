"use client";

import { useEffect, useState } from "react";
import { Trash2, UserPlus, Shield, User, Wrench, Loader2, Search } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // New User Form State
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "CLIENT" });

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    fetchUsers(); // Refresh list
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setShowForm(false);
      setFormData({ name: "", email: "", password: "", role: "CLIENT" });
      fetchUsers();
    } else {
      alert("Failed to create user (Email likely exists)");
    }
  };

  // 🔍 Filter Logic
  const filteredUsers = users.filter((user) => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500">Manage clients, technicians, and admins.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" /> {showForm ? "Cancel" : "Add User"}
            </button>
          </div>
        </div>

        {/* CREATE USER FORM */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-4">
            <h3 className="font-bold text-lg mb-4">Add New User</h3>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
                <input required className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                <input required type="email" className="w-full p-2 border rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Password</label>
                <input required type="password" className="w-full p-2 border rounded" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Role</label>
                <select className="w-full p-2 border rounded" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="CLIENT">Client</option>
                  <option value="TECHNICIAN">Technician</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">Create Account</button>
            </form>
          </div>
        )}

        {/* USERS TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full">
          {/* Force horizontal scroll on mobile */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-sm font-bold text-slate-500 w-48">Name</th>
                  <th className="p-4 text-sm font-bold text-slate-500 w-64">Email</th>
                  <th className="p-4 text-sm font-bold text-slate-500 w-32">Role</th>
                  <th className="p-4 text-sm font-bold text-slate-500 w-32">Status</th>
                  <th className="p-4 text-sm font-bold text-slate-500 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400"/></td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No users found matching "{searchTerm}"</td></tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-medium text-slate-900">{user.name || "No Name"}</td>
                      <td className="p-4 text-slate-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'TECHNICIAN' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.role === 'ADMIN' && <Shield className="w-3 h-3"/>}
                          {user.role === 'TECHNICIAN' && <Wrench className="w-3 h-3"/>}
                          {user.role === 'CLIENT' && <User className="w-3 h-3"/>}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {user.emailVerified ? <span className="text-green-600">Verified</span> : <span className="text-orange-500">Unverified</span>}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="text-slate-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
