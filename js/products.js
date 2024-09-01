
const data = 'https://japceibal.github.io/emercado-api/cats_products/101.json'; 

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
            
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto';

            
            productoDiv.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class= "col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                    <img class="auto" src="${product.image}" alt="${product.name}">
                </div>
                <div class= "col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                    <div class="informacion">
                        <p class="negrita">${product.name}</p>
                        <p>${product.description}</p>
                        <p>Vendidos: ${product.soldCount}</p>
                        <p class="precio">${product.currency} ${product.cost}</p>
                    </div>
                </div>
            
            </div>
        </div>`;

            
            contenedorJson.appendChild(productoDiv);
        });
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });