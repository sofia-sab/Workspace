
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
            <div class="contenedor">    
            <img class="auto" src="${product.image}" alt="${product.name}">
                <div class="informacion">
                    <p class="precio">${product.name}</p>
                    <p>${product.description}</p>
                    <p>Vendidos: ${product.soldCount}</p>
                </div>
            </div>
            <p class="precio">${product.currency} ${product.cost}</p>
            `;

            // Añadir el div al contenedor
            contenedorJson.appendChild(productoDiv);
        });
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });