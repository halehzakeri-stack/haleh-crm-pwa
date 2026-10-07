const byId=id=>document.getElementById(id),AUTH_KEY='haleh.crm.auth.v1';
const icons=()=>window.feather?.replace({'aria-hidden':'true'});
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark',button=byId('loginTheme');button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'فعال‌کردن حالت روشن':'فعال‌کردن حالت شب');button.innerHTML=`<i data-feather="${dark?'sun':'moon'}" aria-hidden="true"></i>`;document.querySelector('meta[name="theme-color"]').content=dark?'#11121b':'#eee8ff';icons()}
byId('loginTheme').onclick=()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('hs.crm.v62.theme',theme)}catch{}updateTheme()};
byId('formalEnter').onclick=()=>{localStorage.setItem(AUTH_KEY,JSON.stringify({formal:true,role:'admin',enteredAt:Date.now()}));location.replace('./index.html#/today')};
updateTheme();
