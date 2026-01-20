"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // Import toast

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Account created successfully! Redirecting...");
        router.push("/signin?registered=true");
      } else {
        const data = await res.json();
        const msg = data.message || "Something went wrong";
        setError(msg);
        toast.error(msg);
        setIsLoading(false);
      }
    } catch (err) {
      const msg = "Failed to connect to server";
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Create Account</h2>
        
        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            disabled={isLoading}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-6 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition flex justify-center items-center"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign Up"}
        </button>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link href="/signin" className="text-blue-600 font-bold hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
