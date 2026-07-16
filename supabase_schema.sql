-- Pädi Merson Transfer App — Supabase Schema
-- Einmal ausführen im Supabase SQL Editor

-- State Tabelle: ein einziger Row für den gesamten App-State
create table if not exists app_state (
  id text primary key default 'main',
  state jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Edits Tabelle: alle contenteditable Änderungen
create table if not exists app_edits (
  id text primary key default 'main',
  edits jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Checklisten-Anpassungen (Ablauf, Packliste, etc.)
create table if not exists app_lists (
  id text primary key default 'main',
  ablauf jsonb,
  packliste jsonb,
  pch jsonb,
  mat jsonb,
  updated_at timestamptz default now()
);

-- Initial rows einfügen
insert into app_state (id, state) values ('main', '{}') on conflict (id) do nothing;
insert into app_edits (id, edits) values ('main', '{}') on conflict (id) do nothing;
insert into app_lists (id) values ('main') on conflict (id) do nothing;

-- RLS deaktivieren (App ist passwortgeschützt, kein Login nötig)
alter table app_state enable row level security;
alter table app_edits enable row level security;
alter table app_lists enable row level security;

-- Alle dürfen lesen und schreiben (Anon Key reicht)
create policy "public read state" on app_state for select using (true);
create policy "public write state" on app_state for all using (true) with check (true);

create policy "public read edits" on app_edits for select using (true);
create policy "public write edits" on app_edits for all using (true) with check (true);

create policy "public read lists" on app_lists for select using (true);
create policy "public write lists" on app_lists for all using (true) with check (true);

-- Realtime aktivieren
alter publication supabase_realtime add table app_state;
alter publication supabase_realtime add table app_edits;
alter publication supabase_realtime add table app_lists;
