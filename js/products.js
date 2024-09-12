const ORDER_ASC_BY_COST = ">$";
const ORDER_DESC_BY_COST = "$<";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function(a, b) {

    return parseInt(a.cost) - parseInt(b.cost);
});
    } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function(a, b) {

    return parseInt(b.cost) - parseInt(a.cost);
});
    }else if (criteria === ORDER_BY_PROD_COUNT){
    result = array.sort(function(a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

    return parseInt(b.soldCount) - parseInt(a.soldCount);   
    }) 
    }
    
    showProductsList(result);

};


document.addEventListener('DOMContentLoaded', function() {
    const catID = localStorage.getItem('catID'); 

    // if (!catID) {
    //     console.error('No se encontró el identificador de categoría en localStorage.');
    //     return; 
    // }

const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    fetch(url)
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

            document.getElementById("sortAsc").addEventListener("click", function(){
                sortProducts(ORDER_ASC_BY_COST);
            });
        
            document.getElementById("sortDesc").addEventListener("click", function(){
                sortProducts(ORDER_DESC_BY_COST);
            });
        
            document.getElementById("sortByCount").addEventListener("click", function(){
                sortProducts(ORDER_BY_PROD_COUNT);
            });
        
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
});