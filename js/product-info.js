const id = localStorage.getItem('productID');
let currentProduct = {};  
const url = `https://japceibal.github.io/emercado-api/products/${id}.json`;
let commentList = [];
const urlComments=`https://japceibal.github.io/emercado-api/products_comments/${id}.json`;


//Funcion para mostar la información
function showProductInfo() {
    if (currentProduct) {
        
        let htmlContentToAppend = `
    <div class="container-fluid">
        <div class="row">
            <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                <img class="auto" src="${currentProduct.images[0]}" alt="${currentProduct.name}">
            </div>
            <div class="col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                <div class="informacion cursor-active">
                    <p class="negrita">${currentProduct.name}</p>
                    <p>${currentProduct.description}</p>
                    <p>Vendidos: ${currentProduct.soldCount}</p>
                    <p class="precio">${currentProduct.currency} ${currentProduct.cost}</p>
                </div>
                <div class="img-adicional">
                    <img class="auto" src="${currentProduct.images[1]}" alt="${currentProduct.name}">
                    <img class="auto" src="${currentProduct.images[2]}" alt="${currentProduct.name}">
                    <img class="auto" src="${currentProduct.images[3]}" alt="${currentProduct.name}">
                </div>
            </div>

        <hr>
            
            <div class="img-adicional col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                    <div class="productoRelacionado" onclick="productosRelacionados(${currentProduct.relatedProducts[0].id})">
                        <p>${currentProduct.relatedProducts[0].name}</p>
                        <img class="auto" src="${currentProduct.relatedProducts[0].image}" alt="${currentProduct.relatedProducts[0].name}">
                    </div>
                    <div class="productoRelacionado" onclick="productosRelacionados(${currentProduct.relatedProducts[1].id})">
                        <p>${currentProduct.relatedProducts[1].name}</p>
                        <img class="auto" src="${currentProduct.relatedProducts[1].image}" alt="${currentProduct.relatedProducts[1].name}">
                    </div>
                </div>
            </div>
    </div>`;

        document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
    } else {
        document.getElementById("product-info-container").innerHTML = '';
    }
}

//Acceder a los productos relacionados
function productosRelacionados(productId) {
    localStorage.setItem('productID', productId);
    window.location.href='product-info.html'; 
}

//Información del producto
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

//Cargar información de de calificaciones 
document.addEventListener('DOMContentLoaded', function(){
    getJSONData(urlComments).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentList = resultObj.data;
            showComments();
        } else {
            console.error("Error cargando data: ", resultObj.data);
        }
    });
});

//Seccion comententario calificaciones
function showComments() {
    let htmlContentToAppend = '<hr><br><p class="titulomenor">Reseñas:</p>';
        
    if (commentList && commentList.length > 0) { 
        for (let i = 0; i < commentList.length; i++) {
            let comment = commentList[i];
            htmlContentToAppend += `
            <br>
            <div class="list-group-item">
                <p><strong>Calificación:</strong> ${comment.score}</p>
                <p><strong>${comment.user}: </strong> ${comment.description}</p>
                <p style="text-align:right;"><strong>Fecha:</strong> ${comment.dateTime}</p>
            </div>`; 
        }
        document.getElementById("product-comments").innerHTML = htmlContentToAppend; 
    } else {
        document.getElementById("product-comments").innerHTML = ''; 
    }
}