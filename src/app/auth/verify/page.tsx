"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing token");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      } catch (e) {
        setStatus("error");
        setMessage("Something went wrong");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-slate-900">Verifying...</h2>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Email Verified!</h2>
          <p className="text-slate-600 mb-6">Your account is now fully active.</p>
          <Link href="/signin" className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition block">
            Sign In Now
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Failed</h2>
          <p className="text-red-600 mb-6">{message}</p>
          <Link href="/signin" className="text-slate-500 hover:text-slate-900 underline">
            Back to Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
