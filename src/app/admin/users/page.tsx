"use client";

import { useEffect, useState } from "react";
import { Trash2, UserPlus, Shield, User, Wrench, Loader2, Search, Edit2, X, Camera } from "lucide-react";
import { toast } from "sonner"; // Import toast

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // New User Form State
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "CLIENT" });

  // Edit User State
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", password: "", role: "", image: "" });

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      // silently handle fetch errors
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    // Optional: You could replace this native confirm with a toast action, but native is safer for deletes.
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchUsers(); // Refresh list
      toast.success("User deleted successfully");
    } else {
      toast.error("Failed to delete user");
    }
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
      toast.success("User created successfully");
    } else {
      toast.error("Failed to create user (Email likely exists)");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingUser.id, ...editFormData })
    });

    if (res.ok) {
      setEditingUser(null);
      fetchUsers();
      toast.success("User updated successfully");
    } else {
      toast.error("Failed to update user");
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "CLIENT",
      image: user.image || "",
      password: "" // Keep empty unless resetting
    });
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
                <input required className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                <input required type="email" className="w-full p-2 border rounded" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Password</label>
                <input required type="password" className="w-full p-2 border rounded" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="••••••" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Role</label>
                <select className="w-full p-2 border rounded" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
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
                  <th className="p-4 text-sm font-bold text-slate-500 text-right w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" /></td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No users found matching "{searchTerm}"</td></tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-medium text-slate-900">{user.name || "No Name"}</td>
                      <td className="p-4 text-slate-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'TECHNICIAN' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                          {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                          {user.role === 'TECHNICIAN' && <Wrench className="w-3 h-3" />}
                          {user.role === 'CLIENT' && <User className="w-3 h-3" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {user.emailVerified ? <span className="text-green-600">Verified</span> : <span className="text-orange-500">Unverified</span>}
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-slate-400 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-full"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
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

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Edit User</h3>
                <p className="text-sm text-slate-500">Update account details and permissions.</p>
              </div>
              <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={editFormData.name}
                    onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={editFormData.email}
                    onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Role</label>
                  <select
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={editFormData.role}
                    onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                  >
                    <option value="CLIENT">Client</option>
                    <option value="TECHNICIAN">Technician</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Leave blank to keep current"
                    value={editFormData.password}
                    onChange={e => setEditFormData({ ...editFormData, password: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Profile Picture URL</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="https://example.com/photo.jpg"
                      value={editFormData.image}
                      onChange={e => setEditFormData({ ...editFormData, image: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
