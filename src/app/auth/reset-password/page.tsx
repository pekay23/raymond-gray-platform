"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, AlertCircle, Lock } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }

    if (!token) {
        setStatus("error");
        setMessage("Invalid or missing token");
        return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Failed to reset password");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Password Reset!</h2>
        <p className="text-slate-600 mb-8">
          Your password has been successfully updated. You can now log in with your new credentials.
        </p>
        <Link href="/signin" className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Set New Password</h2>
        <p className="text-slate-500 text-sm mt-2">Please enter your new password below.</p>
      </div>

      {status === "error" && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3 text-sm font-medium border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
        >
          {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
