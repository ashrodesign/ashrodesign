-- Run this once in the Supabase project's SQL editor
-- (Project → SQL Editor → New query → paste → Run)

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  island text not null,
  stage text not null,
  services text[] not null default '{}',
  message text not null default ''
);

alter table contact_submissions enable row level security;

-- Public (anon) can insert leads, but cannot read/update/delete them.
-- Viewing is done via the Supabase Table Editor, which uses your
-- project owner login and bypasses RLS.
create policy "Allow public insert" on contact_submissions
  for insert
  to anon
  with check (true);
