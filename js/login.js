
function login(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    var username = document.getElementById('username').value; 
    var password = document.getElementById('password').value; 

    if (username && password) { 
        // Guarda el estado de inicio de sesión en localStorage
        localStorage.setItem('loggedIn', 'true'); 

        // Redirige a index.html
        window.location.href = "index.html"; 
    } else { 
        alert('Por favor, complete ambos campos.'); 
    } 
}