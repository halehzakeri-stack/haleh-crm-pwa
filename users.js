import {normalizePhone,persianDigits} from './login-core.mjs';

const URL='https://zyohnhlnynrfyvwsbxhr.supabase.co',KEY='sb_publishable_uYpbQ0ceuF8dZmut7_nDwQ_2SB7jJwv',SESSION='haleh.crm.auth.v1';
const roles={
  admin:{label:'ادمین',className:'admin',description:'ادمین: مدیریت کاربران و همهٔ بخش‌های مزون.'},
  user:{label:'کاربر',className:'',description:'کاربر: دسترسی عمومی مزون، بدون بخش‌های تخصصی.'},
  seller:{label:'فروشنده کالا',className:'seller',description:'فروشنده کالا: دسترسی به فروش، کالاها و ثبت سفارش.'},
  accounting:{label:'حسابداری',className:'accounting',description:'حسابداری: دسترسی به پرداخت‌ها، اسناد مالی و گزارش‌های مالی.'},
  inventory:{label:'انبارداری',className:'inventory',description:'انبارداری: دسترسی به موجودی، رسید ورود و گردش کالا.'}
};
const getSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION)||sessionStorage.getItem(SESSION)||'null')}catch{return null}};
const session=getSession(),phone=document.querySelector('#staffPhone'),role=document.querySelector('#staffRole'),note=document.querySelector('#roleNote'),form=document.querySelector('#userForm'),status=document.querySelector('#userStatus'),list=document.querySelector('#userList'),count=document.querySelector('#userCount');
const setStatus=(message,color='#17885e')=>{status.style.color=color;status.textContent=message};
const headers=()=>({apikey:KEY,Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'});
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark',button=document.querySelector('#usersTheme');button.textContent=dark?'☀':'☾';button.setAttribute('aria-label',dark?'فعال‌کردن حالت روشن':'فعال‌کردن حالت شب');button.setAttribute('aria-pressed',String(dark))}
document.querySelector('#usersTheme').onclick=()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('hs.crm.v62.theme',next)}catch{}updateTheme()};
async function verifyAdmin(){
  if(!session?.access_token)throw Error('login');
  const r=await fetch(URL+'/auth/v1/user',{headers:{apikey:KEY,Authorization:'Bearer '+session.access_token}}),user=await r.json();
  if(!r.ok||user.app_metadata?.haleh_crm_role!=='admin')throw Error('forbidden');
}
function renderUsers(users){
  list.replaceChildren();
  users.forEach(user=>{
    const current=roles[user.role]||roles.user,row=document.createElement('article'),initial=(user.name||'ک').trim().slice(0,1);
    row.className='user';
    row.innerHTML=`<span class="avatar ${current.className}"></span><div class="user-main"><strong class="user-name"></strong><span class="user-meta"></span></div><span class="role ${current.className}"></span>`;
    row.querySelector('.avatar').textContent=initial;
    row.querySelector('.user-name').textContent=user.name;
    row.querySelector('.user-meta').textContent=persianDigits(user.phone);
    row.querySelector('.role').textContent=current.label;
    list.append(row);
  });
  count.textContent=persianDigits(users.length);
}
async function loadUsers(){
  const response=await fetch(URL+'/functions/v1/crm-admin-users',{method:'POST',headers:headers(),body:JSON.stringify({action:'list'})});
  const data=await response.json();
  if(!response.ok)throw Error(data.error||'list_failed');
  renderUsers(data.users||[]);
}
phone.oninput=()=>phone.value=persianDigits(phone.value);
role.onchange=()=>note.textContent=roles[role.value].description;
form.onsubmit=async event=>{
  event.preventDefault();
  const name=document.querySelector('#staffName').value.trim(),digits=normalizePhone(phone.value),password=document.querySelector('#staffPassword').value,selected=roles[role.value];
  if(!name||!/^09\d{9}$/.test(digits)||password.length<8){setStatus('نام، شمارهٔ ۱۱ رقمی و رمز حداقل ۸ کاراکتری لازم است.','#c64848');return}
  if(!confirm(`کاربر «${name}» با نقش «${selected.label}» ساخته شود؟`))return;
  const button=event.currentTarget.querySelector('button');button.disabled=true;setStatus('در حال ساخت کاربر…');
  try{
    const response=await fetch(URL+'/functions/v1/crm-admin-users',{method:'POST',headers:headers(),body:JSON.stringify({action:'create',name,phone:digits,password,role:role.value})});
    const data=await response.json();
    if(!response.ok)throw Error(data.error||'create_failed');
    form.reset();role.value='user';note.textContent=roles.user.description;setStatus('کاربر ساخته شد؛ شماره موبایل و رمز موقت را با او به اشتراک بگذارید.');await loadUsers();
  }catch(error){setStatus(error.message==='duplicate'?'این شماره قبلاً ثبت شده است.':'ساخت کاربر انجام نشد.','#c64848')}finally{button.disabled=false}
};
updateTheme();
try{await verifyAdmin();await loadUsers()}catch{location.replace('./login.html')}
