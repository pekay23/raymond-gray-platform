"use client";

import { useSession, signOut } from "next-auth/react";

export default function TestSession() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center mt-10">Loading session...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-navy-900">Session & Role Test</h1>
        {session ? (
          <div>
            <p className="text-lg mb-4">Signed in as: <strong>{session.user?.email}</strong></p>
            <p className="text-lg mb-6">Role: <strong className="text-red-700">{session.user?.role || "No role set"}</strong></p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-6">Not signed in</p>
            <a href="/signin" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-semibold transition inline-block">
              Go to Sign In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}