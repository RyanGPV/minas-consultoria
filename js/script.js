let currentLoginType = 'client';

const USERS = {
  'cliente@minas.com': { pass: '1234', role: 'client' },
  'adm@minas.com':     { pass: 'adm123', role: 'adm' },
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0,0);
}

function setLoginType(type) {
  currentLoginType = type;
  document.getElementById('btn-type-client').classList.toggle('active', type === 'client');
  document.getElementById('btn-type-adm').classList.toggle('active', type === 'adm');
  document.getElementById('login-error').style.display = 'none';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass  = document.getElementById('login-pass').value;
  const err   = document.getElementById('login-error');
  const user  = USERS[email];

  if (!user || user.pass !== pass || user.role !== currentLoginType) {
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';
  showPage(user.role === 'adm' ? 'adm' : 'dashboard');
}

function doLogout() {
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
  showPage('login');
  showToast('Sessão encerrada.');
}

function admTab(tab) {
  ['clients','upload','projects'].forEach(t => {
    document.getElementById('adm-' + t).style.display = t === tab ? 'block' : 'none';
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function iniciarCarrossel() {
  const slides = document.querySelectorAll('.carousel-slide')
  let atual = 0

  setInterval(function() {
    slides[atual].classList.remove('active')
    atual = (atual + 1) % slides.length
    slides[atual].classList.add('active')
  }, 3000)
}

iniciarCarrossel()
