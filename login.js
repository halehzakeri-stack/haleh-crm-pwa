import {phoneError,persianDigits} from './login-core.mjs';
const byId=id=>document.getElementById(id),phone=byId('loginPhone'),password=byId('loginPassword'),status=byId('loginStatus');
const icons=()=>window.feather?.replace({'aria-hidden':'true'});
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark',button=byId('loginTheme');button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'فعال‌کردن حالت روشن':'فعال‌کردن حالت شب');button.innerHTML=`<i data-feather="${dark?'sun':'moon'}" aria-hidden="true"></i>`;document.querySelector('meta[name="theme-color"]').content=dark?'#11121b':'#eee8ff';icons()}
byId('loginTheme').onclick=()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('hs.crm.v62.theme',theme)}catch{}updateTheme()};
function setError(input,id,message){input.setAttribute('aria-invalid',String(Boolean(message)));const help=byId(id);help.textContent=message;help.hidden=!message;return !message}
phone.addEventListener('input',()=>{const start=phone.selectionStart,end=phone.selectionEnd;phone.value=persianDigits(phone.value);if(start!==null)phone.setSelectionRange(start,end);if(phone.getAttribute('aria-invalid')==='true')setError(phone,'phoneError',phoneError(phone.value));status.hidden=true});
phone.addEventListener('blur',()=>setError(phone,'phoneError',phoneError(phone.value)));
password.addEventListener('input',()=>{if(password.value)setError(password,'passwordError','');status.hidden=true});
byId('showPassword').onclick=()=>{const show=password.type==='password';password.type=show?'text':'password';const button=byId('showPassword');button.setAttribute('aria-pressed',String(show));button.setAttribute('aria-label',show?'پنهان‌کردن رمز عبور':'نمایش رمز عبور');button.innerHTML=`<i data-feather="${show?'eye-off':'eye'}" aria-hidden="true"></i>`;icons()};
function unavailable(action){status.hidden=false;status.textContent=`${action} هنوز به سرویس امن حساب‌های کاری متصل نشده است. هیچ اطلاعاتی ارسال یا ذخیره نشد.`}
byId('loginForm').addEventListener('submit',event=>{event.preventDefault();const validPhone=setError(phone,'phoneError',phoneError(phone.value)),validPassword=setError(password,'passwordError',password.value?'':'رمز عبور را وارد کنید.');if(!validPhone){phone.focus();return}if(!validPassword){password.focus();return}unavailable('ورود')});
byId('recoverPassword').onclick=()=>unavailable('بازیابی رمز عبور');
byId('otpLogin').onclick=()=>{if(!setError(phone,'phoneError',phoneError(phone.value))){phone.focus();return}unavailable('ارسال رمز یک‌بارمصرف')};
updateTheme();
