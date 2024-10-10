document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click', ()=> {

        var username = document.getElementById('username').value; 
        var password = document.getElementById('password').value; 
        

        if(username && password){
            window.location.href='index.html';
            localStorage.setItem('persona', username);
        }  else {
            alert('Por favor, complete ambos campos.');
        }
    })
})

