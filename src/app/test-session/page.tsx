"use client";

import { signIn, getSession } from "next-auth/react"; // Import getSession
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Sign In (Don't redirect automatically yet)
    const result = await signIn("credentials", { 
      email, 
      password, 
      redirect: false, 
    });

    if (result?.ok) {
      // 2. Get the new session to see the Role
      const session = await getSession();
      const role = session?.user?.role;

      // 3. Redirect based on Role
      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "TECHNICIAN") {
        router.push("/technician/dashboard"); // We'll build this next
      } else {
        router.push("/"); // Clients go home
      }
      
      // Force a refresh to ensure navbar updates
      router.refresh();
    } else {
      alert("Login failed.");
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
        Sign In & Go
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
