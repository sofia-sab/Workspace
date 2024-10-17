document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click', ()=> {

        var username = document.getElementById('username').value; 
        var password = document.getElementById('password').value; 
        var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (username && password && email.test(username)) {

            window.location.href='index.html';
            localStorage.setItem('persona', username);
        }  else {
            alert('Por favor, complete ambos campos.');
        }
    })
})

