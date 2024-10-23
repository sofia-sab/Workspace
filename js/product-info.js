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
        <div class="row justify-content-md-center">
            <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4 imagen-principal">
                <img class="auto" id= "imagen-principal" src="${currentProduct.images[0]}" alt="${currentProduct.name}">
            </div> 
        </div>
        <div class="row justify-content-md-center">
            <div class="col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                <div class="informacion">
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
        </div>
<button class="boton" id="comprar">Comprar</button>
        <hr>
            <h2>Creemos que podría gustarte</h2>
            <div class="row justify-content-md-center">
            <div class="img-relacionadas col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                
                    <div class="productoRelacionado" onclick="productosRelacionados(${currentProduct.relatedProducts[0].id})">
                
                        <img class="auto" src="${currentProduct.relatedProducts[0].image}" alt="${currentProduct.relatedProducts[0].name}">
                        <p style="font-size: 20px;">${currentProduct.relatedProducts[0].name}</p>
                    </div>
                    <div class="productoRelacionado" onclick="productosRelacionados(${currentProduct.relatedProducts[1].id})">
                        <img class="auto" src="${currentProduct.relatedProducts[1].image}" alt="${currentProduct.relatedProducts[1].name}">
                        <p style="font-size: 20px;">${currentProduct.relatedProducts[1].name}</p>
                    </div>
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


//Pone la calificacion de los comentarios como estrellas 
function starRating(score) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

//Seccion comententario calificaciones
function showComments() {
    let htmlContentToAppend = '<hr><br><h3 class="titulomenor">Reseñas:</h3>';
        
    if (commentList && commentList.length > 0) { 
        for (let i = 0; i < commentList.length; i++) {
            let comment = commentList[i];
            htmlContentToAppend += `
            <br>
            <div class="list-group-item">
                <p>${starRating(comment.score)}</p>
                <p><strong>${comment.user}: </strong> ${comment.description}</p>
                <p style="text-align:right;"><strong>Fecha:</strong> ${comment.dateTime}</p>
            </div>`; 
        }
        document.getElementById("product-comments").innerHTML = htmlContentToAppend; 
    } else {
        document.getElementById("product-comments").innerHTML = ''; 
    }
}


//Funcion para elegir calificacion de estrellas
function showCalification() {
    const stars = document.querySelectorAll('#star-rating i');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.classList.replace('far', 'fas');
            } else {
                s.classList.replace('fas', 'far');
            }
        });
    });
});
}

document.addEventListener("DOMContentLoaded", () => {
    showCalification();
});


//Funcion para cargar nuevo comentario
document.getElementById("button").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    let fecha = new Date();
    let score = 0;
    
    const stars = document.querySelectorAll('#star-rating i');
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].classList.contains('fas')) {
            score++;
        }
    }

    if (input && score > 0) {
    const newComment = {
        score: score,
        user: localStorage.getItem('persona'),
        description: input,
        dateTime: (
            fecha.getFullYear() + '-' +
            String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
            String(fecha.getDate()).padStart(2, '0') + ' ' +
            String(fecha.getHours()).padStart(2, '0') + ':' +
            String(fecha.getMinutes()).padStart(2, '0') + ':' +
            String(fecha.getSeconds()).padStart(2, '0')
        )
    };
        
        commentList.push(newComment);
        showComments();
        document.getElementById("input").value = ''; 
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
