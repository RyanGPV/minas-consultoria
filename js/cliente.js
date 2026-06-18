const USUARIOS = {
  'cliente@minas.com': '1234'
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim()
  const senha = document.getElementById('login-pass').value
  const erro  = document.getElementById('login-error')

  if (USUARIOS[email] && USUARIOS[email] === senha) {
    document.getElementById('page-login').classList.remove('active')
    document.getElementById('page-dashboard').classList.add('active')
  } else {
    erro.style.display = 'block'
  }
}

function doLogout() {
  document.getElementById('page-dashboard').classList.remove('active')
  document.getElementById('page-login').classList.add('active')
}