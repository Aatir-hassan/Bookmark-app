"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        const { data: bookmarkData } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", data.user.id)
          .order("created_at", { ascending: false });

        setBookmarks(bookmarkData || []);
      }
    };

    load();
  }, []);

  const handleAdd = (newBookmark: any) => {
    setBookmarks((prev) => [newBookmark, ...prev]);
  };

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Bookmarks</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <AddBookmark user={user} onAdd={handleAdd} />

      <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
    </div>
  );
}
