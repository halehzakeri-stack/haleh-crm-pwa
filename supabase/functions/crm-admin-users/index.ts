import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const assignableRoles = new Set(['manager', 'user', 'seller', 'accounting', 'inventory']);
const allRoles = new Set(['admin', ...assignableRoles]);
const cors = {
  'Access-Control-Allow-Origin': 'https://halehzakeri-stack.github.io',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Content-Type': 'application/json'
};
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors });
const digitsFrom = (value: unknown) => String(value ?? '').replace(/[^0-9]/g, '');
const displayName = (user: { user_metadata?: Record<string, unknown>; email?: string }) => {
  const saved = String(user.user_metadata?.display_name ?? '').trim();
  return saved || (user.email?.startsWith('admin-') ? 'kariz' : 'کاربر');
};
const isCrmAccount = (email = '') => /^(admin|staff)-\d+@haleh-crm\.local$/.test(email);

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return reply({ error: 'method' }, 405);

  const auth = req.headers.get('Authorization') || '';
  const caller = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_ANON_KEY') || '', { global: { headers: { Authorization: auth } } });
  const { data: { user: callerUser }, error: callerError } = await caller.auth.getUser();
  const callerRole = String(callerUser?.app_metadata?.haleh_crm_role || '');
  if (callerError || !['admin', 'manager'].includes(callerRole)) return reply({ error: 'forbidden' }, 403);

  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const admin = createClient(Deno.env.get('SUPABASE_URL') || '', serviceRole);
  const body = await req.json().catch(() => ({}));
  const getAccounts = async () => {
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) throw Error('list_failed');
    return data.users.filter(user => isCrmAccount(user.email || ''));
  };

  if (body.action === 'list') {
    try {
      const users = (await getAccounts()).map(user => ({
        id: user.id,
        name: displayName(user),
        phone: digitsFrom((user.email || '').match(/\d+/)?.[0]),
        role: String(user.app_metadata?.haleh_crm_role || 'user'),
        createdAt: user.created_at
      }));
      return reply({ users, viewerRole: callerRole });
    } catch { return reply({ error: 'list_failed' }, 500); }
  }

  if (body.action === 'create') {
    const name = String(body.name || '').trim();
    const phone = digitsFrom(body.phone);
    const password = String(body.password || '');
    const role = String(body.role || 'user');
    if (!name || !/^09\d{9}$/.test(phone) || password.length < 8 || !assignableRoles.has(role)) return reply({ error: 'invalid' }, 400);
    const { data, error } = await admin.auth.admin.createUser({
      email: `staff-${phone}@haleh-crm.local`,
      password,
      email_confirm: true,
      user_metadata: { display_name: name },
      app_metadata: { haleh_crm_role: role }
    });
    if (error) return reply({ error: error.code === 'email_exists' ? 'duplicate' : 'create_failed' }, 400);
    return reply({ created: true, user: { id: data.user.id, name, phone, role } }, 201);
  }

  if (body.action === 'update_role') {
    const userId = String(body.userId || ''), role = String(body.role || '');
    if (!userId || !allRoles.has(role)) return reply({ error: 'invalid' }, 400);
    let target;
    try { target = (await getAccounts()).find(user => user.id === userId); } catch { return reply({ error: 'list_failed' }, 500); }
    if (!target) return reply({ error: 'not_found' }, 404);
    const targetRole = String(target.app_metadata?.haleh_crm_role || 'user');
    if (callerRole === 'manager' && (targetRole === 'admin' || role === 'admin')) return reply({ error: 'admin_protected' }, 403);
    const { error } = await admin.auth.admin.updateUserById(userId, { app_metadata: { ...target.app_metadata, haleh_crm_role: role } });
    if (error) return reply({ error: 'update_failed' }, 500);
    return reply({ updated: true, role });
  }

  return reply({ error: 'invalid_action' }, 400);
});
