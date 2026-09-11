create table if not exists public.guest_wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  message text not null check (char_length(message) between 1 and 1200),
  gift_id text not null check (gift_id in ('cake', 'bouquet', 'stars', 'balloon', 'present', 'heart')),
  created_at timestamptz not null default now()
);

alter table public.guest_wishes enable row level security;

create policy "Anyone can read birthday wishes" on public.guest_wishes for select using (true);
create policy "Anyone can leave a birthday wish" on public.guest_wishes for insert with check (true);
