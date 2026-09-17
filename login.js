import {phoneError,persianDigits} from './login-core.mjs';
const byId=id=>document.getElementById(id),phone=byId('loginPhone'),password=byId('loginPassword'),status=byId('loginStatus');
const SUPABASE_URL='https://zyohnhlnynrfyvwsbxhr.supabase.co',SUPABASE_KEY='sb_publishable_uYpbQ0ceuF8dZmut7_nDwQ_2SB7jJwv',AUTH_KEY='haleh.crm.auth.v1';
const icons=()=>window.feather?.replace({'aria-hidden':'true'});
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark',button=byId('loginTheme');button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'فعال‌کردن حالت روشن':'فعال‌کردن حالت شب');button.innerHTML=`<i data-feather="${dark?'sun':'moon'}" aria-hidden="true"></i>`;document.querySelector('meta[name="theme-color"]').content=dark?'#11121b':'#eee8ff';icons()}
byId('loginTheme').onclick=()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('hs.crm.v62.theme',theme)}catch{}updateTheme()};
function setError(input,id,message){input.setAttribute('aria-invalid',String(Boolean(message)));const help=byId(id);help.textContent=message;help.hidden=!message;return !message}
phone.addEventListener('input',()=>{const start=phone.selectionStart,end=phone.selectionEnd;phone.value=persianDigits(phone.value);if(start!==null)phone.setSelectionRange(start,end);if(phone.getAttribute('aria-invalid')==='true')setError(phone,'phoneError',phoneError(phone.value));status.hidden=true});
phone.addEventListener('blur',()=>setError(phone,'phoneError',phoneError(phone.value)));
password.addEventListener('input',()=>{if(password.value)setError(password,'passwordError','');status.hidden=true});
byId('showPassword').onclick=()=>{const show=password.type==='password';password.type=show?'text':'password';const button=byId('showPassword');button.setAttribute('aria-pressed',String(show));button.setAttribute('aria-label',show?'پنهان‌کردن رمز عبور':'نمایش رمز عبور');button.innerHTML=`<i data-feather="${show?'eye-off':'eye'}" aria-hidden="true"></i>`;icons()};
function showStatus(message){status.hidden=false;status.textContent=message}
function adminEmail(value){return `admin-${value}@haleh-crm.local`}
async function signIn(){
 const normalized=phone.value.replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
 const response=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({email:adminEmail(normalized),password:password.value})});
 const result=await response.json();if(!response.ok||!result.access_token)throw new Error('invalid');
 const userResponse=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${result.access_token}`}}),user=await userResponse.json();
 if(!userResponse.ok||user.app_metadata?.haleh_crm_role!=='admin')throw new Error('forbidden');
 const store=byId('rememberLogin').checked?localStorage:sessionStorage;localStorage.removeItem(AUTH_KEY);sessionStorage.removeItem(AUTH_KEY);store.setItem(AUTH_KEY,JSON.stringify({access_token:result.access_token,refresh_token:result.refresh_token,expires_at:Date.now()+Number(result.expires_in||0)*1000}));
 location.replace('./index.html#/today');
}
byId('loginForm').addEventListener('submit',async event=>{event.preventDefault();const validPhone=setError(phone,'phoneError',phoneError(phone.value)),validPassword=setError(password,'passwordError',password.value?'':'رمز عبور را وارد کنید.');if(!validPhone){phone.focus();return}if(!validPassword){password.focus();return}const submit=event.currentTarget.querySelector('[type="submit"]');submit.disabled=true;showStatus('در حال بررسی حساب کاری…');try{await signIn()}catch{showStatus('شماره یا رمز درست نیست، یا این حساب اجازه ورود ندارد.')}finally{submit.disabled=false}});
byId('recoverPassword').onclick=()=>showStatus('بازیابی رمز برای این ورود موقت هنوز فعال نیست.');
byId('otpLogin').onclick=()=>showStatus('رمز یک‌بارمصرف تا زمان اتصال سرویس پیامک فعال نیست.');
updateTheme();
