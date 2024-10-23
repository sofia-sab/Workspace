const USER_CART = 'https://japceibal.github.io/emercado-api/user_cart/${persona}.json';
let products = JSON.parse (localStorage.getItem());
let persona = localStorage.getItem('persona');

document.addEventListener('click', () => {
    // Recuperar el carrito de compras del localStorage (si existe)
    let cart = JSON.parse(localStorage.getItem('USER_CART')) || { user: 'persona', articles: [] };

    // Información del producto (simulada)
    let newProduct = {
        id: 1,                     // ID del producto
        name: 'Lentes de Sol',      // Nombre del producto
        count: 1,                   // Cantidad
        unitCost: 50,               // Costo unitario
        currency: 'USD',            // Moneda
        image: 'imagen.jpg'         // URL o ruta de la imagen
    };

    // Agregar el nuevo producto al array de artículos
    cart.articles.push(newProduct);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('user_cart', JSON.stringify(cart));

    // Redirigir a la página del carrito
    window.location = 'cart.html';
});
