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
    const totalGeneral = document.querySelectorAll('.total'); 
    const botonComprar = document.getElementById('botonComprar'); // se declara para ocultar el boton, en caso de que no existan productos
    const carrito = document.getElementById('carrito');
    const badge = document.getElementById('badge');
    const myTab = document.getElementById('myTab');
    const resumen = document.querySelectorAll('.resumen');
    

    contenedorCarrito.innerHTML = '';
    let total = 0; // Inicializa el total
    let totalCantidad = 0; // Inicializa el total de productos

    if (userCart && userCart.articles.length > 0) {
        userCart.articles.forEach(article => {
            const articuloDiv = document.createElement('div');
            articuloDiv.classList.add('articulo');
            articuloDiv.innerHTML = `
                 <div class="row">
                <div class="col-12 col-md-4">
                    <h4 class="centrado">${article.name}</h4>
                    <img class="auto" src="${article.image}" alt="${article.name}">
                </div>
                <div class="col-12 col-md-4"><br><br>
                    <p>Precio: ${article.currency} ${article.unitCost}</p>
                    <div class="flex">
                    <p >Cantidad</p>
                    <div class="cantidad">
                        <button class="btn btn-outline-secondary ms-2" type="button" onclick="menos('${article.id}')">-</button>
                        <input type="text" id="cantidad-${article.id}" class="form-control inputCantidad centrado" value="${article.count}" min="1" oninput="subtotalActualizado('${article.id}')" />
                        <button class="btn btn-outline-secondary" type="button" onclick="mas('${article.id}')">+</button>
                    </div><br>
                    </div>
                    <p class="mt-2">Subtotal: <span id="subtotal-${article.id}">${article.currency} ${article.subtotal}</span></p>
                </div>
                <div class="col-12 col-md-2"><br><br>
                    <p><a onclick="eliminarProducto('${article.id}')" href="#" id="eliminar" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Eliminar</a></p>
                </div>
            </div>
            <hr>`;
            contenedorCarrito.appendChild(articuloDiv);

            const subtotalActual = article.currency === 'USD' ? article.subtotal * 40 : article.subtotal
            total += subtotalActual; 
            totalCantidad += article.count; // Suma cantidad de producto agregado

        });

        totalGeneral.forEach(element => {
            element.textContent = `Total: UYU ${total}`;
        });
        document.getElementById('badge').textContent = `${totalCantidad}`;
        localStorage.setItem('precioTotal', total); // Almacena el total en localStorage
    } else {
        contenedorCarrito.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Su carrito se encuentra vacío.</h4>
        </div>`;
        botonComprar.style.display = 'none'; // Oculta el boton de comprar si no tenemos productos en el carrito
        carrito.style.display = 'none';
        badge.style.display = 'none';
        document.getElementById('total').textContent = ``;
        myTab.style.display = 'none';
        resumen.style.display = 'none';


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
        // badge();
    }
}

function calcularTotal(cart) {
    let total = 0; 
    const dolar = 40; 

    cart.articles.forEach(articulo => {
        let subtotalActual;
        if (articulo.currency === 'USD') {
            subtotalActual = articulo.subtotal * dolar; // Convertir a pesos
        } else {
            subtotalActual = articulo.subtotal; 
        }
        total += subtotalActual;
    });
    // document.querySelectorAll('total').textContent = `Total: UYU ${total}`;
    
    const totalElements = document.querySelectorAll('.total');
    totalElements.forEach(element => {
        element.textContent = `Subtotal: UYU ${total}`;
    });

     document.getElementById('total').textContent = `Subtotal: UYU ${total}`;
    localStorage.setItem('precioTotal', total); // Almacena el total en localStorage

    // Actualizar el costo de envío y el total a pagar
    costoDeEnvio();

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
    const badge = document.getElementById('badge');

    if (userCart && userCart.articles.length > 0) {
        userCart.articles.forEach(article => {
            totalCantidad += article.count; // Suma la cantidad de cada artículo
        });
        localStorage.setItem('userCart', JSON.stringify(userCart))
        document.getElementById('badge').textContent = `${totalCantidad}`; // Actualiza el badge con la cantidad total
    } else {
        badge.style.display = 'none'; // es para que no aparezca el cero, cuando no tenemos ningun artículo en el carrito
    }

}

document.addEventListener('DOMContentLoaded', badge);


document.addEventListener('DOMContentLoaded', function() {
    // Cargar el archivo JSON usando fetch
    fetch('json/uruguay.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json(); // Convertir la respuesta en formato JSON
    })
    .then(data => {
        console.log(data); 
        cargarDepartamentos(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
});

  // Función para cargar los departamentos en el select
    function cargarDepartamentos(data) {
    const departamentoSelect = document.getElementById('departamento'); // Obtener el select de departamentos
    const localidadSelect = document.getElementById('localidad');

    // Limpiar el select antes de llenarlo (si hay opciones previas)
    departamentoSelect.innerHTML = '<option value="">Seleccione su departamento</option>';
    localidadSelect.innerHTML = '<option value="">Seleccione su localidad</option>';

    // Recorrer los departamentos y agregarlos como opciones en el select
    data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.departamento;
    option.textContent = item.departamento;
    departamentoSelect.appendChild(option);
    });

    // Llamar a la función para actualizar las localidades cuando se selecciona un departamento
    departamentoSelect.addEventListener('change', function() {
    cargarLocalidades(data);
    });
}

  // Función para cargar las localidades según el departamento seleccionado
    function cargarLocalidades(data) {
    const departamentoSelect = document.getElementById('departamento');
    const localidadSelect = document.getElementById('localidad');

    // Limpiar el select de localidades antes de llenarlo
    localidadSelect.innerHTML = '<option value="">Seleccione su localidad</option>';

    // Obtener las ciudades del departamento seleccionado
    const departamento = departamentoSelect.value;
    const departamentoData = data.find(item => item.departamento === departamento);

    if (departamentoData) {
      // Agregar las ciudades del departamento seleccionado al select de localidades
    departamentoData.ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        localidadSelect.appendChild(option);
    });
}
}

// Tabs 

document.getElementById("botonComprar").addEventListener("click", () => {
    var direccionTab = new bootstrap.Tab(document.getElementById("nav-direccion-tab"));
    direccionTab.show();
});


document.getElementById("btnIrAPagar").addEventListener("click", (event) => {
    event.preventDefault();  

    const formDireccion = document.getElementById('form-direccion');
    const departamento = document.getElementById('departamento');
    const localidad = document.getElementById('localidad');
    const calle = document.getElementById("calle");
    const esquina = document.getElementById('esquina');
    const numero = document.getElementById('numero');
    const standard = document.getElementById('standard');
    const express = document.getElementById('express');
    const premium = document.getElementById('premium');

    let error = false;

    if (calle.value === "") {
        calle.classList.add("is-invalid");
        error = true;
    }
    if (esquina.value === "") {
        esquina.classList.add("is-invalid");
        error = true;
    }
    if (numero.value === "") {
        numero.classList.add("is-invalid");
        error = true;
    }
    if (departamento.value === "") {
        departamento.classList.add("is-invalid");
        error = true;
    }
    if (localidad.value === "") {
        localidad.classList.add("is-invalid");
        error = true;
    }
    if (!standard.checked && !express.checked && !premium.checked) {
        if (standard) standard.classList.add("is-invalid");
        if (express) express.classList.add("is-invalid");
        if (premium) premium.classList.add("is-invalid");
        error = true;
    }

    if (error) {
        Swal.fire("Por favor, complete todos los campos antes de continuar");
        return;
    }

    var facturacionTab = new bootstrap.Tab(document.getElementById("nav-facturacion-tab"));
    facturacionTab.show();
});

//Intento de validacion de el tab de Facturacion
document.getElementById("btn-finalizarCompra").addEventListener("click", (event) => { 
    event.preventDefault();  
    const tCredito = document.getElementById('tCredito');
    const tBancaria = document.getElementById('tBancaria');
    
    let error = false;
    if (!tCredito.checked && !tBancaria.checked) {
        if (tCredito) tCredito.classList.add("is-invalid");
        if (tBancaria) tBancaria.classList.add("is-invalid");
        error=true;
    }
    if (error){
        Swal.fire("Por favor, complete todos los campos antes de continuar");
    }else {
        Swal.fire({
            title: "Compra exitosa",
            text: "Su compra ha sido realizada exitosamente",
            icon: "success"
        });
        localStorage.removeItem('userCart');
        
        var carritoTab = new bootstrap.Tab(document.getElementById("nav-carrito-tab"));
        carritoTab.show();

}});
    
function costoDeEnvio() {
    const standard = document.getElementById('standard');
    const express = document.getElementById('express');
    const premium = document.getElementById('premium');
    const costoDeEnvioElement = document.getElementById('costoDeEnvio');
    const subtotalElement = document.getElementById('subtotal');
    const totalAPagarElement = document.getElementById('totalAPagar');

    // Obtener el total de la compra desde el elemento HTML (que muestra el subtotal)
    const subtotal = parseFloat(subtotalElement.textContent.replace('Subtotal: UYU ', '').trim());

    let costoEnvio = 0;

    // Calcular el costo de envío según el tipo seleccionado
    if (standard.checked) {
        costoEnvio = subtotal * 0.05;
    } else if (express.checked) {
        costoEnvio = subtotal * 0.07;
    } else if (premium.checked) {
        costoEnvio = subtotal * 0.15;
    }

    // Actualizar el valor del costo de envío
    costoDeEnvioElement.textContent = `Costo de envio: UYU ${costoEnvio.toFixed(2)}`;

    // Actualizar el total a pagar sumando el subtotal y el costo de envío
    const totalAPagar = subtotal + costoEnvio;
    totalAPagarElement.textContent = `Total a pagar: UYU ${totalAPagar.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const precioGuardado = localStorage.getItem('precioTotal');
    if (precioGuardado) {
        const totalElements = document.querySelectorAll('.total');
        totalElements.forEach(element => {
            element.textContent = `Subtotal: UYU ${precioGuardado}`;
        });
        document.getElementById('subtotal').textContent = `Subtotal: UYU ${precioGuardado}`;
    }
    costoDeEnvio(); // Calcular el costo de envío al cargar la página

    // Llamar a la función cada vez que se cambie la opción de envío
    document.getElementById('standard').addEventListener('change', costoDeEnvio);
    document.getElementById('express').addEventListener('change', costoDeEnvio);
    document.getElementById('premium').addEventListener('change', costoDeEnvio);
});
  
// function totalConEnvio