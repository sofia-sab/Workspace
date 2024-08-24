// const data = "json/autos.json";
// const contenedorJson = document.getElementById("contenedorJson");

// function infoAutos(products){
//     contenedorJson.innerHTML = '';
//     for (const product of products)
//     contenedorJson.innerHTML+='<p>{product.name} <br> ${}'
// }

const data = 'json/autos.json'; 

fetch(data)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const contenedorJson = document.getElementById('contenedorJson');
        contenedorJson.innerHTML = ''; 

        data.products.forEach(product => {
            // Crear un nuevo div para cada producto
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto';

            // Agregar contenido al div
            productoDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="informacion">
                    <p class="negrita">${product.name}</p>
                    <p>${product.description}</p>
                    <p>Vendidos: ${product.soldCount}</p>
                </div>
            `;

            // Añadir el div al contenedor
            contenedorJson.appendChild(productoDiv);
        });
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });