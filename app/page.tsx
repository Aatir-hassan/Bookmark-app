"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleLogin}
        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Sign in with Google
      </button>
    </main>
  );
}
