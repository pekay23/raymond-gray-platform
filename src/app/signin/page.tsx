"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // If there is a specific destination (e.g. from a protected link), use it.
  // Otherwise, we will determine destination by Role.
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Sign In but DO NOT redirect yet
    const result = await signIn("credentials", { 
      email, 
      password, 
      redirect: false, 
    });

    if (result?.ok) {
      // 2. If there was a specific destination (e.g. they clicked a link to /admin/dashboard), go there.
      if (callbackUrl) {
        router.push(callbackUrl);
        router.refresh();
        return;
      }

      // 3. Otherwise, check Role and redirect to the correct Portal
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "TECHNICIAN") {
        router.push("/technician/dashboard");
        } else {
        router.push("/client/dashboard"); // Clients go to Dashboard
      }

      
      router.refresh();
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border mb-4 rounded text-slate-900"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border mb-6 rounded text-slate-900"
        required
      />
      <button type="submit" className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 font-bold">
        Sign In
      </button>
    </form>
  );
}

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
