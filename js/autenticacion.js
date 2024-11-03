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

function badge() {
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    let totalCantidad = 0;

    if (userCart && userCart.articles.length > 0) {
        userCart.articles.forEach(article => {
            totalCantidad += article.count; // Suma la cantidad de cada artículo
        });
    }
    localStorage.setItem('userCart', JSON.stringify(userCart))
    document.getElementById('badge').textContent = `${totalCantidad}`; // Actualiza el badge con la cantidad total
}