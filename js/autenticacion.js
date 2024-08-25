function checkAuthentication() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
    }
}

document.addEventListener('DOMContentLoaded', checkAuthentication);