const id = localStorage.getItem('productID');
let currentProduct = {};  
const url = `https://japceibal.github.io/emercado-api/products/${id}.json`;
let commentList = [];
const urlComments=`https://japceibal.github.io/emercado-api/products_comments/${id}.json`;
let persona = localStorage.getItem('persona');
// const comprar = document.getElementById ('comprar');


//Funcion para mostar la información del producto
function showProductInfo() {
    if (currentProduct) {
        
let htmlContentToAppend = `
    <br><div class="container-fluid">
        <div class="row justify-content-md-center" style="max-width: 650px; margin: auto;">
            <div id="carousel"class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${currentProduct.images[0]}" class="d-block w-100" alt="${currentProduct.name}">
                    </div>
                    <div class="carousel-item">
                        <img src="${currentProduct.images[1]}" class="d-block w-100" alt="${currentProduct.name}">
                    </div>
                    <div class="carousel-item">
                        <img src="${currentProduct.images[2]}" class="d-block w-100" alt="${currentProduct.name}">
                    </div>
                    <div class="carousel-item">
                        <img src="${currentProduct.images[3]}" class="d-block w-100" alt="${currentProduct.name}"></img>
                    </div>
                </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
        <div class="row justify-content-md-center">
            <div class="col-xxl-9 col-md-6 col-xs-6 col-lg-8">
                <div class="informacion">
                    <p class="negrita centrado">${currentProduct.name}</p>
                    <p>${currentProduct.description}</p>
                    <p>Vendidos: ${currentProduct.soldCount}</p>
                    <p class="precio">${currentProduct.currency} ${currentProduct.cost}</p>
                </div>
            </div>
        </div>`;

        document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
    } else {
        document.getElementById("product-info-container").innerHTML = '';
    };
};



//Funcion para mostrar los productos relacionados (corregido)
function showProductRelated() {
    let htmlContentToAppend = '';
    
    if (currentProduct && currentProduct.relatedProducts && currentProduct.relatedProducts.length > 0) {
        for (let i = 0; i < currentProduct.relatedProducts.length; i++) {
            let relatedProduct = currentProduct.relatedProducts[i];

        htmlContentToAppend += `
            <div class="row justify-content-md-center">
                <div class="img-relacionadas col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                    <div class="productoRelacionado" onclick="productosRelacionados(${relatedProduct.id})">
                        <img class="auto" src="${relatedProduct.image}" alt="${relatedProduct.name}">
                        <p style="font-size: 20px; text-align: center;">${relatedProduct.name}</p>
                    </div>
                </div>
            </div>`;
        };

        document.getElementById("product-related").innerHTML = htmlContentToAppend;
    } else {
        document.getElementById("product-related").innerHTML = '';
    };
};

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
            showProductRelated();
        } else {
            console.error("Error: ", resultObj.data);
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
            console.error("Error cargando comentarios: ", resultObj.data);
        }
    });
});

// //Boton para comprar
// document.addEventListener('DOMContentLoaded', function(){
//     const comprar = document.getElementById('comprar');
//     let productID = localStorage.getItem('productID');

//     if (productID) { 
//         comprar.addEventListener('click', () => {
//             localStorage.setItem('producto_comprar', productID);
//             window.location.href = 'cart.html';
//         });
//     } else {
//         console.error('No se encontró el producto');
//     }
// });

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

//Seccion comententarios
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
        alert("Por favor, complete todos los campos.");
    };
});
