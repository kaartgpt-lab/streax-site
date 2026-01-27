"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(username, password);
      router.push("/admin");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0d17]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0d17] to-[#1a1f3a] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Streax</h1>
          <p className="text-gray-400">Admin Blog Dashboard</p>
        </div>

        <div className="bg-[#13172A] border border-gray-700 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-200 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
         
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-100 rounded focus:border-blue-500 focus:outline-none transition"
                disabled={isSubmitting}
              />
            </div>

   
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-100 rounded focus:border-blue-500 focus:outline-none transition"
                disabled={isSubmitting}
              />
            </div>

       
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

       
      </div>
    </div>
  );
}
