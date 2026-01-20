"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, AlertCircle, ArrowLeft, Lock, Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Import toast

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const callbackUrl = searchParams.get("callbackUrl");
  const registered = searchParams.get("registered");

  useEffect(() => {
    if (registered) {
      toast.success("Account created! Please sign in.");
    }
  }, [registered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 1. Sign In
    const result = await signIn("credentials", { 
      email, 
      password, 
      redirect: false, 
    });

    if (result?.ok) {
      toast.success("Signed in successfully");
      
      // --- CRITICAL FIX START ---
      // Force a router refresh to ensure Middleware sees the new cookie
      router.refresh(); 

      // 2. Redirect Logic
      if (callbackUrl) {
        router.push(callbackUrl);
        return;
      }

      // Fetch session to determine role
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "TECHNICIAN") {
        router.push("/technician/dashboard");
      } else {
        router.push("/client/dashboard");
      }
      // --- CRITICAL FIX END ---
      
    } else {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-sm">Sign in to access your portal</p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3 text-sm font-medium border border-red-100"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
              disabled={isLoading}
            />
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          </div>
        </div>

        <div className="flex justify-end">
          <Link 
            href="/auth/forgot-password" 
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-600 text-sm">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 font-bold hover:underline">
            Create one now
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center border-t border-slate-100 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* Left Side - Image/Brand */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <Image 
          src="/hero-home.jpg" 
          alt="Raymond Gray Office" 
          fill 
          className="object-cover opacity-60" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-blue-900/40" />
        
        <div className="relative z-10 text-white p-12 max-w-lg">
          <div className="w-16 h-1 bg-blue-500 mb-6" />
          <h1 className="text-4xl font-bold mb-4 leading-tight">Professional Facility Management</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Manage your properties, track requests, and monitor performance—all in one place.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-24 lg:pt-6">
        <Suspense fallback={<div className="text-slate-500">Loading form...</div>}>
          <SignInForm />
        </Suspense>
      </div>

    </div>
  );
}
