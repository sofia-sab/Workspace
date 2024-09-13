let currentProductArray = [];
const id = localStorage.getItem('productID');
const url = `https://japceibal.github.io/emercado-api/products/${id}.json`;


function showProductInfo(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];
        

    htmlContentToAppend = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                    <img class="auto" src="${product.image}" alt="${product.name}">
                </div>
                <div class="col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                    <div class="informacion">
                        <p class="negrita">${product.name}</p>
                        <p>${product.description}</p>
                        <p>Vendidos: ${product.soldCount}</p>
                        <p class="precio">${product.currency} ${product.cost}</p>
                    </div>
                </div>
            </div>
        </div>`;
        
    }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    };


 document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray = resultObj.data
            showProductInfo()
        }
    });
})