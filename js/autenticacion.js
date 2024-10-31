//Autenticación
function checkAuthentication() {
    let username = localStorage.getItem('persona');
    if(!username){
        window.location.href = 'login.html';

    } else{
        document.getElementById('userShow').textContent=username;
    }
}
document.addEventListener('DOMContentLoaded', checkAuthentication);

//Cerrar sesión
document.addEventListener('DOMContentLoaded', function(){
    let closeSesion = document.getElementById('closeSesion');

    closeSesion.addEventListener('click' , ()=>{
        localStorage.removeItem('persona');
        document.body.classList.remove('dark-mode');
        localStorage.removeItem('userCart'); // es para que cuando cierre sesion, se elimine el carrito, asi al siguiente le aparece vacio
        window.location.href = 'login.html'
    });
});

