"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Loader2, CheckCircle, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // REAL API CALL
      const res = await fetch("/api/auth/password-reset", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }) 
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };


  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Check your inbox</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We have sent a password reset link to <br/>
          <span className="font-bold text-slate-900">{email}</span>
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => window.open('https://gmail.com', '_blank')}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all"
          >
            Open Email App
          </button>
          <button 
            onClick={() => setStatus("idle")}
            className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            Click to try another email
          </button>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100">
           <Link href="/signin" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 relative z-10">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Forgot Password?</h2>
        <p className="text-slate-500 text-sm">No worries, we'll send you reset instructions.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
              placeholder="name@company.com"
              required
              disabled={status === "loading"}
            />
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/signin" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* Left Side - Image/Brand (Reuse Hero Image for consistency) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <Image 
          src="/hero-home.jpg" 
          alt="Raymond Gray Office" 
          fill 
          className="object-cover opacity-60" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-blue-900/40" />
        
        <div className="relative z-10 text-white p-12 max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4 leading-tight">Secure Account Recovery</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            We help you get back to managing your facilities in no time.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-24 lg:pt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordForm />
        </Suspense>
      </div>

    </div>
  );
}
