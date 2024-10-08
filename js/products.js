const ORDER_ASC_BY_COST = ">$";
const ORDER_DESC_BY_COST = "$<";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

//Ordenar por costo asc, desc, y por cantidad de productos
function sortProducts(criteria){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
    result = currentProductsArray.sort(function(a, b) {

    return parseInt(a.cost) - parseInt(b.cost);
});
    } else if (criteria === ORDER_DESC_BY_COST) {
    result = currentProductsArray.sort(function(a, b) {

    return parseInt(b.cost) - parseInt(a.cost);
});
    }else if (criteria === ORDER_BY_PROD_COUNT){
    result = currentProductsArray.sort(function(a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

    return parseInt(b.soldCount) - parseInt(a.soldCount);   
    }) 
    }
    
    showProductsList(result);

};

//Función para mostrar la lista de productos de x categoria 
function showProductsList(products){
    const contenedorJson = document.getElementById('contenedorJson');
    contenedorJson.innerHTML = '';
        if (minCost !== undefined || maxCost !== undefined) {
            products = products.filter(product => {
                let cost = parseInt(product.cost);
                return (minCost === undefined || cost >= minCost) && (maxCost === undefined || cost <= maxCost);
            });
        }  

    products.forEach(product => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        
        productoDiv.innerHTML = `
        <hr>
        <div class="container-fluid">
            <div class="row cursor-active">
                <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                    <img class="auto" src="${product.image}" alt="${product.name}">
                    <p class="precio">${product.currency} ${product.cost}</p>
                </div>
                <div class="col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                    <div class="informacion">
                        <p class="negrita">${product.name}</p>
                        <p>${product.description}</p><br>
                        <p class="vendidos">Vendidos: ${product.soldCount}</p>
                
                    </div>
                </div>
            </div>
        </div>`;

        //Click para ingresar a la información de cada producto
        productoDiv.addEventListener('click', () => {
            localStorage.setItem('productID', JSON.stringify(product.id)); 
            window.location = 'product-info.html';
        });
    
        contenedorJson.appendChild(productoDiv);
    });
}

//Cargar contenido de la página
document.addEventListener('DOMContentLoaded', function() {
    const catID = localStorage.getItem('catID'); 

    if (!catID) {
        console.error('No se encontró el identificador de categoría en localStorage.');
        return; 
    }

    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            currentProductsArray = data.products;  
            showProductsList(currentProductsArray);
  
        const searchInput = document.getElementById('searchInput');

        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            return currentProductsArray.filter(product =>
            product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
            );
        }
    
        searchInput.addEventListener('input', function() {
            const filteredProducts = filterProducts();
            showProductsList(filteredProducts);
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

        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCostMin").value = "";
            document.getElementById("rangeFilterCostMax").value = "";
        
            minCost = undefined;
            maxCost = undefined;
        
            showProductsList(currentProductsArray);
        });
        
            document.getElementById("rangeFilterCost").addEventListener("click", function(){
                
                minCost = document.getElementById("rangeFilterCostMin").value;
                maxCost = document.getElementById("rangeFilterCostMax").value;
        
                if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
                    minCost = parseInt(minCost);
                }
                else{
                    minCost = undefined;
                }
        
                if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
                    maxCost = parseInt(maxCost);
                }
                else{
                    maxCost = undefined;
                }
        
                showProductsList(currentProductsArray);
            });
        })
    .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
    });
    
});
