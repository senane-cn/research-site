-- Collaboration update for ICOMOS 评估梳理分析工具 1.0
-- Run this after supabase/schema.sql. It does not delete existing data.
-- Before running, replace/add rows in allowed_editors for every colleague who may write.

create extension if not exists pgcrypto;

alter table public.narrative_edits add column if not exists edited_by text;
alter table public.narrative_edits add column if not exists updated_at timestamptz default now();
alter table public.properties add column if not exists committee_confirmed_criteria text[];
alter table public.properties add column if not exists committee_decision text;
alter table public.properties add column if not exists committee_pm_requirements text;

create table if not exists public.allowed_editors (
  email text primary key,
  role text not null default 'editor',
  note text,
  created_at timestamptz not null default now()
);

insert into public.allowed_editors (email, role, note)
values ('weiqing_2026@163.com', 'owner', 'initial owner')
on conflict (email) do update set role = excluded.role;

create table if not exists public.edit_history (
  id uuid primary key default gen_random_uuid(),
  property_id text references public.properties(id) on delete cascade,
  section_key text not null,
  field_key text,
  action text not null default 'update',
  edited_by text,
  edited_at timestamptz not null default now(),
  before_value jsonb,
  after_value jsonb
);

create index if not exists idx_edit_history_property_time on public.edit_history (property_id, edited_at desc);

create or replace function public.is_allowed_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.allowed_editors
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant usage on schema public to anon, authenticated;
grant select on public.allowed_editors to authenticated;
grant select on public.edit_history to anon, authenticated;
grant insert, update, delete on public.edit_history to authenticated;
grant execute on function public.is_allowed_editor() to anon, authenticated;

alter table public.allowed_editors enable row level security;
alter table public.edit_history enable row level security;

drop policy if exists "allowed editors can see own row" on public.allowed_editors;
create policy "allowed editors can see own row"
on public.allowed_editors
for select
using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "public read edit_history" on public.edit_history;
create policy "public read edit_history"
on public.edit_history
for select
using (true);

drop policy if exists "allowed editor edit edit_history" on public.edit_history;
create policy "allowed editor edit edit_history"
on public.edit_history
for all
using (public.is_allowed_editor())
with check (public.is_allowed_editor());

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'properties',
    'assessment_items',
    'property_assessments',
    'assessment_subitems',
    'criteria_assessments',
    'comparators',
    'attributes',
    'recommendations',
    'narrative_edits',
    'sources',
    'evidence',
    'official_ppt_ratings',
    'property_type_tags'
  ]
  loop
    execute format('drop policy if exists "authenticated edit %s" on public.%I', table_name, table_name);
    execute format('drop policy if exists "allowed editor edit %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "allowed editor edit %s" on public.%I for all using (public.is_allowed_editor()) with check (public.is_allowed_editor())',
      table_name,
      table_name
    );
  end loop;
end $$;
