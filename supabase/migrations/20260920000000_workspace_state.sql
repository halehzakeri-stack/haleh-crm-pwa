-- One authenticated workspace snapshot. Browser clients use the Edge Function
-- only; RLS stays enabled and no public table policies are created.
create table if not exists public.crm_workspace_states (
  workspace_key text primary key check (workspace_key = 'haleh-main'),
  state jsonb not null,
  revision bigint not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.crm_workspace_states enable row level security;
revoke all on table public.crm_workspace_states from anon, authenticated;
create index if not exists crm_workspace_states_updated_by_idx on public.crm_workspace_states(updated_by);
