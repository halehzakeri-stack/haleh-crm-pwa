-- Shared catalog categories for the single Haleh CRM workspace.
-- Browser clients never access this table directly; the authenticated Edge
-- Function is the only application route, so RLS remains enabled with no
-- public policies.
create table if not exists public.crm_shared_catalogs (
  workspace_key text primary key check (workspace_key = 'haleh-main'),
  categories jsonb not null default '[]'::jsonb,
  category_icons jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.crm_shared_catalogs
  add column if not exists category_icons jsonb not null default '{}'::jsonb;

alter table public.crm_shared_catalogs enable row level security;
revoke all on table public.crm_shared_catalogs from anon, authenticated;
create index if not exists crm_shared_catalogs_updated_by_idx on public.crm_shared_catalogs(updated_by);
