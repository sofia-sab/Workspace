function checkAuthentication() {
    let username=localStorage.getItem('persona');
    if (localStorage.getItem('persona') !== username) {
        window.location.href = 'login.html'; 
    }
}

document.addEventListener('DOMContentLoaded', checkAuthentication);