import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const workspaceKey = 'haleh-main';
const readers = new Set(['admin', 'manager', 'user', 'seller', 'accounting', 'inventory']);
const writers = new Set(['admin', 'manager', 'seller', 'inventory']);
const cors = {
  'Access-Control-Allow-Origin': 'https://halehzakeri-stack.github.io',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Content-Type': 'application/json'
};
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors });

function categoriesFrom(value: unknown) {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.map(item => String(item ?? '').trim().replace(/\s+/g, ' '))
    .filter(name => name.length > 0 && name.length <= 80)
    .filter(name => {
      const key = name.toLocaleLowerCase('fa-IR');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 40);
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return reply({ error: 'method' }, 405);

  const auth = req.headers.get('Authorization') || '';
  const caller = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_ANON_KEY') || '',
    { global: { headers: { Authorization: auth } } }
  );
  const { data: { user }, error } = await caller.auth.getUser();
  const role = String(user?.app_metadata?.haleh_crm_role || '');
  if (error || !user || !readers.has(role)) return reply({ error: 'forbidden' }, 403);

  const body = await req.json().catch(() => ({}));
  const admin = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );

  if (body.action === 'get') {
    const { data, error: readError } = await admin.from('crm_shared_catalogs')
      .select('categories, updated_at').eq('workspace_key', workspaceKey).maybeSingle();
    if (readError) return reply({ error: 'read_failed' }, 500);
    return reply({ categories: categoriesFrom(data?.categories), updatedAt: data?.updated_at || null });
  }

  if (body.action === 'save') {
    if (!writers.has(role)) return reply({ error: 'forbidden' }, 403);
    const categories = categoriesFrom(body.categories);
    const { data, error: writeError } = await admin.from('crm_shared_catalogs').upsert({
      workspace_key: workspaceKey,
      categories,
      updated_at: new Date().toISOString(),
      updated_by: user.id
    }, { onConflict: 'workspace_key' }).select('categories, updated_at').single();
    if (writeError) return reply({ error: 'write_failed' }, 500);
    return reply({ categories: categoriesFrom(data.categories), updatedAt: data.updated_at });
  }

  return reply({ error: 'invalid_action' }, 400);
});
