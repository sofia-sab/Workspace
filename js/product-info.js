let currentProduct = {};  
const id = localStorage.getItem('productID');
const url = `https://japceibal.github.io/emercado-api/products/${id}.json`;


function showProductInfo() {
    if (currentProduct) {
        
        let htmlContentToAppend = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                        <img class="auto" src="${currentProduct.images[0]}" alt="${currentProduct.name}">
                        <img class="auto" src="${currentProduct.images[1]}" alt="${currentProduct.name}">
                        <img class="auto" src="${currentProduct.images[2]}" alt="${currentProduct.name}">
                        <img class="auto" src="${currentProduct.images[3]}" alt="${currentProduct.name}">
                    </div>
                    <div class="col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                        <div class="informacion">
                            <p class="negrita">${currentProduct.name}</p>
                            <p>${currentProduct.description}</p>
                            <p>Vendidos: ${currentProduct.soldCount}</p>
                            <p class="precio">${currentProduct.currency} ${currentProduct.cost}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        
        document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
    } else {
        document.getElementById("product-info-container").innerHTML = '';
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data;  
            showProductInfo();
        } else {
            console.error("Error cargando data: ", resultObj.data);
        }
    });
});
