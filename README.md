# Smart Bookmark App

A simple full-stack bookmark manager built with Next.js (App Router), Supabase, and Tailwind CSS.

## Live Demo
https://bookmark-app1-psi.vercel.app

## Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## Features

- Google OAuth authentication (no email/password login)
- Private bookmarks per user
- Add bookmark (Title + URL)
- Delete bookmark
- Realtime updates across tabs
- Deployed and publicly accessible

---

## Database Design

Table: `bookmarks`

- `id` (UUID, primary key)
- `title` (text)
- `url` (text)
- `user_id` (UUID, references auth.users)
- `created_at` (timestamp)

Row Level Security (RLS) is enabled to ensure users can only access their own bookmarks.

---

## Challenges Faced & How I Solved Them

### 1. OAuth Redirect Issues

During development and deployment, I faced multiple OAuth-related issues including:

- `redirect_uri_mismatch`
- `Unsupported provider`
- `localhost refused to connect`

These were caused by incorrect configuration between:

- Google Cloud Console
- Supabase Authentication settings
- Production deployment URL

**Solution:**

- Configured OAuth Client ID & Secret properly in Google Cloud.
- Added correct Authorized Redirect URI in Google:
- Updated Supabase Site URL after deploying to Vercel.
- Added both localhost and production callback URLs in Supabase.


### 3. Realtime + Performance Issues

Initially, bookmarks required manual refresh after adding.

This was caused by local state not being updated optimistically.

**Solution:**

- Moved bookmark state management to the Dashboard component.
- Implemented optimistic UI updates.
- Used Supabase Realtime subscriptions for cross-tab updates.

This improved responsiveness and eliminated refresh requirements.

## Security

- RLS enabled on bookmarks table.
- Users can only select/insert/delete their own records.
- No service role keys exposed.
- `.env.local` excluded via `.gitignore`.



## Running Locally

1. Clone the repository
2. Install dependencies:
   npm install
3. Create a `.env.local` file with:
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
4. Start the development server:
   npm run dev
