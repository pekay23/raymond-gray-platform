import { getServerSession } from "next-auth";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-3xl font-bold text-red-700 mb-4">Access Denied</p>
          <p className="text-xl">Admins Only – Please sign in with an ADMIN account.</p>
          <a href="/signin" className="mt-6 inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-semibold transition">
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-navy-900">Admin Dashboard</h1>
        <p className="text-xl mb-4">Welcome, {session.user?.email}</p>
        <p className="text-lg mb-8">Your Role: <strong className="text-red-700">{session.user?.role}</strong></p>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg">This is protected – only ADMIN role can see it!</p>
          <p className="mt-4">We'll build work order creation/assignment here soon.</p>
        </div>
      </div>
    </div>
  );
}