function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

function alterarNavBar() {
    const navbar = document.querySelector('.navbar');
    const idUsuario = sessionStorage.getItem("ID_USUARIO");
    const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

    let location = window.location.toString();

    if (idUsuario) {
        navbar.innerHTML = `
        <li class='usuario-logado'>Olá, ${nomeUsuario}</li>
        <hr>
        <li><a href="index.html" ${(location.includes('index.html') ? 'class = "link-ativo"' : '')}>Home</a></li>
        <li><a href="#">Do Motor ao Código</a></li>
        <li><a href="games.html" ${(location.includes('games') ? 'class = "link-ativo"' : '')}>Games</a></li>
        <li><a href="dashboard.html" ${(location.includes('dashboard') ? 'class = "link-ativo"' : '')}>Dashboard</a></li>
        <li class='btn-logout' onclick='logout()'>Sair</li>
    `;
    }
}