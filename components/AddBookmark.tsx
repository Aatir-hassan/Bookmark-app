"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmark({ user, onAdd }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url) return;

    const { data } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: user.id }])
      .select()
      .single();

    if (data) {
      onAdd(data);
    }

    setTitle("");
    setUrl("");
  };


  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded border p-2"
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Add Bookmark
      </button>
    </form>
  );
}
function onAdd(data: any) {
  throw new Error("Function not implemented.");
}

