document.addEventListener('DOMContentLoaded', function() {
    const comprar = document.getElementById('comprar');
    let productID = localStorage.getItem('productID');

    if (productID && comprar) { 
        comprar.addEventListener('click', () => {
            let userCart = JSON.parse(localStorage.getItem('userCart')) || {
                user: localStorage.getItem('persona'),
                articles: []
            };

            const estaEnElCarrito = userCart.articles.find(article => article.id === productID);
            if (estaEnElCarrito) {
                alert('Este producto ya está en el carrito.');
            } else {
                const nuevoProducto = {
                    id: productID, 
                    name: currentProduct.name,
                    count: 1,
                    unitCost: currentProduct.cost,
                    currency: currentProduct.currency,
                    image: currentProduct.images[0],
                    subtotal: currentProduct.cost, // Inicializa el subtotal correctamente
                };

                userCart.articles.push(nuevoProducto);
                localStorage.setItem('userCart', JSON.stringify(userCart));
                window.location.href = 'cart.html';
            }
        });
    } else {
        console.error('No se encontró el producto');
    }

    showCart();
});

function showCart() {
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    const contenedorCarrito = document.getElementById('productoComprar');

    contenedorCarrito.innerHTML = '';

    if (userCart && userCart.articles.length > 0) {
        userCart.articles.forEach(article => {

            const articuloDiv = document.createElement('div');
            articuloDiv.classList.add('articulo');
            articuloDiv.innerHTML = `
                <div class="row">
                    <div class="col-6">         
                        <h2 class="centrado">${article.name}</h2>
                        <img class="auto" src="${article.image}" alt="${article.name}">
                    </div> 
                    <div class="col-3"><br><br>
                        <p>Precio:${article.currency} ${article.unitCost} </p>
                        <p>Cantidad</p>
                        <div class="cantidad">
                            <button class="btn btn-outline-secondary" type="button" onclick="menos('${article.id}')">-</button>
                            <input type="text" id="cantidad-${article.id}" class="form-control" value="${article.count}" min="1" oninput="subtotalActualizado('${article.id}')" />
                            <button class="btn btn-outline-secondary" type="button" onclick="mas('${article.id}')">+</button>
                        </div>
                        <p>Subtotal: <span id="subtotal-${article.id}">${article.currency}${article.subtotal}</span></p>
                        <br><br><button class="btn btn-primary">Comprar</button>
                    </div> 
                    <hr>
                </div>`;
            
            contenedorCarrito.appendChild(articuloDiv);
        });
    } else {
        contenedorCarrito.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Su carrito se encuentra vacío.</h4>
        </div>`;
    }
}

function mas(articleID) {
    const input = document.getElementById(`cantidad-${articleID}`);
    if (input) {
        input.value = parseInt(input.value) + 1;
        subtotalActualizado(articleID); // Actualiza el subtotal
    }
}

function menos(articleID) {
    const input = document.getElementById(`cantidad-${articleID}`);
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        subtotalActualizado(articleID); // Actualiza el subtotal
    }
}

function subtotalActualizado(articleID) {
    const input = document.getElementById(`cantidad-${articleID}`);
    const count = parseInt(input.value); //valor de cantidad
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    const article = userCart.articles.find(a => a.id === articleID); 
    
    if (article) {
        article.count = count;
        article.subtotal = count * article.unitCost; 

        document.getElementById(`subtotal-${articleID}`).textContent = article.subtotal;
        localStorage.setItem('userCart', JSON.stringify(userCart)); 
    }
}



//-------------------------------------------------------------------------------------------------------


// };
// let cart = JSON.parse(localStorage.getItem('USER_CART')) || { user: 'persona', articles: [] };

//     let newProduct = {
//     id: 1,                     
//     name: 'Lentes de Sol',      
//     count: 1,                   
//     unitCost: 50,              
//     currency: 'USD',            
//     image: 'imagen.jpg'         
// };

// //  Agregar el nuevo producto al array de artículos
// cart.articles.push(newProduct);

// // Guardar el carrito actualizado en el localStorage
// localStorage.setItem('user_cart', JSON.stringify(cart));

// //  Redirigir a la página del carrito
// window.location = 'cart.html';
// });
//-----------------------------------------------------------------------------------------------------
// products.forEach(product => {
//     htmlContentToAppend += `
//     <h1>Carrito de compras</h1>
//     <div class="row cursor-active">
//         <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
//             <p>${product.name}</p>
//             <img class="auto" src="${product.image}" alt="${product.name}">
//             <p class="precio">${product.currency} ${product.cost}</p>
//         </div>
//     </div>`;
// });

//------------------------------------------------------------------------------------------------------
