"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({
  bookmarks,
  onDelete,
}: {
  bookmarks: any[];
  onDelete: (id: string) => void;
}) {
  const deleteBookmark = async (id: string) => {
    onDelete(id); // remove from UI immediately
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex items-center justify-between rounded border p-3"
        >
          <a
            href={bookmark.url}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            {bookmark.title}
          </a>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
