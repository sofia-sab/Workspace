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
                    subtotal: currentProduct.cost,
                };

                userCart.articles.push(nuevoProducto);
                localStorage.setItem('userCart', JSON.stringify(userCart));
                window.location.href = 'cart.html';
            }
        });
    } 
    showCart();
});

function showCart() {
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    const contenedorCarrito = document.getElementById('productoComprar');
    const totalGeneral = document.getElementById('total'); 
    const botonComprar = document.getElementById('botonComprar'); // se declara para ocultar el boton, en caso de que no existan productos
    const carrito = document.getElementById('carrito');

    contenedorCarrito.innerHTML = '';
    let total = 0; // Inicializa el total
    let totalCantidad = 0; // Inicializa el total de productos

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
                        <p>Precio: ${article.currency} ${article.unitCost}</p>
                        <p>Cantidad</p>
                        <div class="cantidad">
                            <button class="btn btn-outline-secondary" type="button" onclick="menos('${article.id}')">-</button>
                            <input type="text" id="cantidad-${article.id}" class="form-control" value="${article.count}" min="1" oninput="subtotalActualizado('${article.id}')" />
                            <button class="btn btn-outline-secondary" type="button" onclick="mas('${article.id}')">+</button>
                        </div>
                        <br>
                        <p>Subtotal: <span id="subtotal-${article.id}">${article.currency}${article.subtotal}</span></p>
                    </div> 
                    <div class="col-3"> <br> <br> 
                    <p><a onclick="eliminarProducto('${article.id}')" href="#" id="eliminar" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Eliminar</a></p>
                    </div>
                </div>
                <hr>`;
            contenedorCarrito.appendChild(articuloDiv);
            total += article.subtotal; // Suma el subtotal al total por cada articulo
            totalCantidad += article.count; // Suma cantidad de producto agregado

        });

        totalGeneral.textContent = `Total: ${userCart.articles[0].currency} ${total}`; // Muestra el total
        document.getElementById('badge').textContent = `${totalCantidad}`;
    } else {
        contenedorCarrito.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Su carrito se encuentra vacío.</h4>
        </div>`;
        botonComprar.style.display = 'none'; // Oculta el boton de comprar si no tenemos productos en el carrito
        carrito.style.display = 'none';
        document.getElementById('badge').textContent = ``;
        document.getElementById('total').textContent = ``;
    }
}

function mas(articleID) {
    const input = document.getElementById(`cantidad-${articleID}`);
    if (input) {
        input.value = parseInt(input.value) + 1;
        subtotalActualizado(articleID); // Actualiza el subtotal
        badge();
    }
}

function menos(articleID) {
    const input = document.getElementById(`cantidad-${articleID}`);
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        subtotalActualizado(articleID); // Actualiza el subtotal
        badge();
    }
}

function subtotalActualizado(articleID) {
    const input = document.getElementById(`cantidad-${articleID}`);
    const count = parseInt(input.value); // valor de cantidad
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    const article = userCart.articles.find(a => a.id === articleID); 
    
    if (article) {
        article.count = count;
        article.subtotal = count * article.unitCost; 

        document.getElementById(`subtotal-${articleID}`).textContent = `${article.currency}${article.subtotal}`;
        localStorage.setItem('userCart', JSON.stringify(userCart)); 
        calcularTotal(userCart); // Llama a calcularTotal para actualizar el total
        badge();
    }
}

//En proceso
function calcularTotal(cart) {
    let total = 0; // Reinicia el total
    cart.articles.forEach(articulo => {
        total += articulo.subtotal;
    });
    document.getElementById('total').textContent = `Total: ${cart.articles[0].currency} ${total}`; // Muestra el total, si quisieramos hacerlo por cada moneda, deberiamos crear un id de cada uno y mostrarlos por separado, aclarando el articles.currenci
}

function eliminarProducto(articleID) {
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    if (userCart && userCart.articles) {
        const index = userCart.articles.findIndex(article => article.id === articleID);
        if (index !== -1) {
        userCart.articles.splice(index, 1);
        localStorage.setItem('userCart', JSON.stringify(userCart)); 
        showCart();
        subtotalActualizado(userCart);
        calcularTotal(userCart);
        badge();
        }
    }
}

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


    

