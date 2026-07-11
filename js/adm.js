async function doLogin() {
  const email = document.getElementById('login-email').value.trim()
  const senha = document.getElementById('login-pass').value
  const erro  = document.getElementById('login-error')

  const resposta = await fetch('http://127.0.0.1:8000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })

  const dados = await resposta.json()

  if (dados.ok && dados.tipo === 'adm') {
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

function mostrarAba(aba) {
  ['clientes', 'upload', 'projetos'].forEach(function(a) {
    document.getElementById('aba-' + a).style.display = a === aba ? 'block' : 'none'
  })
}