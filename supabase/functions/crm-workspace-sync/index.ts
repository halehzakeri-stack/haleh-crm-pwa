import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const workspaceKey = 'haleh-main';
const admins = new Set(['admin']);
const allowedOrigin = (origin: string) => (
  origin === 'https://halehzakeri-stack.github.io' || origin === 'null' || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
    ? origin
    : 'https://halehzakeri-stack.github.io'
);
const cors = (origin = '') => ({
  'Access-Control-Allow-Origin': allowedOrigin(origin),
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info, x-retry-count, traceparent, tracestate, baggage',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
});
const reply = (body: unknown, status = 200, origin = '') => new Response(JSON.stringify(body), { status, headers: cors(origin) });

function validState(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const state = value as Record<string, unknown>;
  if (!state.data || typeof state.data !== 'object' || Array.isArray(state.data)) return false;
  const data = state.data as Record<string, unknown>;
  const lists = [data.products, data.customers, state.deletedCustomers, state.orders, state.tasks, state.messages, state.returns, state.inventoryMoves, state.interBrandTransactions];
  return lists.every(Array.isArray) && !!state.warehouseCatalogs && typeof state.warehouseCatalogs === 'object' && !Array.isArray(state.warehouseCatalogs);
}

Deno.serve(async req => {
  const origin = req.headers.get('Origin') || '';
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return reply({ error: 'method' }, 405, origin);

  const auth = req.headers.get('Authorization') || '';
  const caller = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_ANON_KEY') || '', { global: { headers: { Authorization: auth } } });
  const { data: { user }, error: authError } = await caller.auth.getUser();
  const role = String(user?.app_metadata?.haleh_crm_role || '');
  if (authError || !user || !admins.has(role)) return reply({ error: 'forbidden' }, 403, origin);

  const body = await req.json().catch(() => ({}));
  const admin = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');
  const read = async () => admin.from('crm_workspace_states').select('state, revision, updated_at').eq('workspace_key', workspaceKey).maybeSingle();

  if (body.action === 'get') {
    const { data, error } = await read();
    if (error) return reply({ error: 'read_failed' }, 500, origin);
    return reply({ state: data?.state || null, revision: Number(data?.revision || 0), updatedAt: data?.updated_at || null }, 200, origin);
  }

  if (body.action !== 'save' || !validState(body.state)) return reply({ error: 'invalid_payload' }, 400, origin);
  const size = new TextEncoder().encode(JSON.stringify(body.state)).byteLength;
  if (size > 5_000_000) return reply({ error: 'state_too_large' }, 413, origin);
  const baseRevision = Number(body.baseRevision || 0);
  const { data: current, error: currentError } = await read();
  if (currentError) return reply({ error: 'read_failed' }, 500, origin);

  if (!current) {
    if (baseRevision !== 0) return reply({ error: 'conflict', state: null, revision: 0 }, 409, origin);
    const { data, error } = await admin.from('crm_workspace_states').insert({ workspace_key: workspaceKey, state: body.state, revision: 1, updated_by: user.id }).select('revision, updated_at').maybeSingle();
    if (error) {
      const { data: latest } = await read();
      return reply({ error: 'conflict', state: latest?.state || null, revision: Number(latest?.revision || 0) }, 409, origin);
    }
    return reply({ revision: Number(data?.revision || 1), updatedAt: data?.updated_at || null }, 200, origin);
  }

  if (Number(current.revision) !== baseRevision) return reply({ error: 'conflict', state: current.state, revision: Number(current.revision) }, 409, origin);
  const { data, error } = await admin.from('crm_workspace_states').update({ state: body.state, revision: baseRevision + 1, updated_by: user.id, updated_at: new Date().toISOString() }).eq('workspace_key', workspaceKey).eq('revision', baseRevision).select('revision, updated_at').maybeSingle();
  if (error || !data) {
    const { data: latest } = await read();
    return reply({ error: 'conflict', state: latest?.state || null, revision: Number(latest?.revision || 0) }, 409, origin);
  }
  return reply({ revision: Number(data.revision), updatedAt: data.updated_at }, 200, origin);
});
