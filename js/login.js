
function login(event) {
    event.preventDefault(); 
    
    var username = document.getElementById('username').value; 
    var password = document.getElementById('password').value; 

    if (username && password) { 
        
        localStorage.setItem('persona', username); 
        document.getElementById('userShow').textContent='Hola! ' + localStorage('persona');
        window.location.href = "index.html"; 
    } else { 
        alert('Por favor, complete ambos campos.'); 
    } 
}
