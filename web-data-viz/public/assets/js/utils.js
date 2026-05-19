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
        <li><a href="motor_codigo.html" ${(location.includes('motor_codigo.html') ? 'class = "link-ativo"' : '')}>Do Motor ao Código</a></li>
        <li><a href="games.html" ${(location.includes('games') ? 'class = "link-ativo"' : '')}>Games</a></li>
        <li><a href="./dashboard/dashboard.html" ${(location.includes('dashboard') ? 'class = "link-ativo"' : '')}>Dashboard</a></li>
        <li class='btn-logout' onclick='logout()'>Sair</li>
    `;
    } else {
        navbar.innerHTML = `
            <li><a href="index.html" ${(location.includes('index.html') ? 'class = "link-ativo"' : '')}>Home</a></li>
            <li><a href="motor_codigo.html" ${(location.includes('motor_codigo.html') ? 'class = "link-ativo"' : '')}>Do Motor ao Código</a></li>
            <li><a href="login.html" class="btn-login">Login</a></li>
            <li><a href="cadastro.html" class="btn-cadastro">Cadastro</a></li>
      `
    }
}