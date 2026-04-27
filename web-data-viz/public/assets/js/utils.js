function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

function alterarNavBar() {
    const navbar = document.querySelector('.navbar');
    const idUsuario = sessionStorage.getItem("ID_USUARIO");
    const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

    if (idUsuario) {
        navbar.innerHTML = `
      <li class='usuario-logado'>Olá, ${nomeUsuario}</li>
      <hr>
      <li><a href="#" class="link-ativo">Home</a></li>
      <li><a href="#">Do Motor ao Código</a></li>
      <li><a href="dashboard.html">Dashboard</a></li>
      <li class='btn-logout' onclick='logout()'>Sair</li>
    `;
    }
}