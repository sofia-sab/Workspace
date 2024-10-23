const USER_CART = 'https://japceibal.github.io/emercado-api/user_cart/${persona}.json';
let products = JSON.parse (localStorage.getItem())

document.addEventListener('click',()=>{
    localStorage.setItem('productID', JSON.stringify(product.id)); 
    window.location = 'cart.html';
});