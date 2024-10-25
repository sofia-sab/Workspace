const USER_CART = 'https://japceibal.github.io/emercado-api/user_cart/${persona}.json';
let products = localStorage.getItem('producto_comprar');
let persona = localStorage.getItem('persona');
const comprar = document.getElementById ('comprar');

document.addEventListener('DOMContentLoaded', function(){
    if (products){ 
        let htmlContentToAppend = `
        <h1>Carrito de compras</h1>
        <div class="row cursor-active">
                <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
                    <p>${products.name}</p>
                    <img class="auto" src="${products.image}" alt="${products.name}">
                    <p class="precio">${products.currency} ${products.cost}</p>
                </div>
        </div>`
        
        document.getElementById('productoComprar').innerHTML = htmlContentToAppend;
    
    }  else {  
        document.getElementById('productoComprar').innerHTML = htmlContentToAppend;
    
    }
});

//for (let i = 0; i < commentList.length; i++) {
//    let comment = commentList[i];
//     htmlContentToAppend += `
//     <br>
//     <div class="list-group-item">
//         <p>${starRating(comment.score)}</p>
//         <p><strong>${comment.user}: </strong> ${comment.description}</p>
//         <p style="text-align:right;"><strong>Fecha:</strong> ${comment.dateTime}</p>
//     </div>`; 

// }

// function saveProfileData() {
//     const email = document.getElementById('email').value; 
//     const profileData = {
//         name: document.getElementById('name').value,
//         middleName: document.getElementById('middleName').value,
//         lastName: document.getElementById('lastName').value,
//         scdLastName: document.getElementById('scdLastName').value,
//         phone: document.getElementById('phone').value
//     };
//     localStorage.setItem(`profileData_${email}`, JSON.stringify(profileData)); // Guardar con el email
//     localStorage.setItem('persona', email); 

// };
// let cart = JSON.parse(localStorage.getItem('USER_CART')) || { user: 'persona', articles: [] };

//     let newProduct = {
//     id: 1,                     
//     name: 'Lentes de Sol',      
//     count: 1,                   
//     unitCost: 50,              
//     currency: 'USD',            
//     image: 'imagen.jpg'         
// };

// //  Agregar el nuevo producto al array de artículos
// cart.articles.push(newProduct);

// // Guardar el carrito actualizado en el localStorage
// localStorage.setItem('user_cart', JSON.stringify(cart));

// //  Redirigir a la página del carrito
// window.location = 'cart.html';
// });


// products.forEach(product => {
//     htmlContentToAppend += `
//     <h1>Carrito de compras</h1>
//     <div class="row cursor-active">
//         <div class="col-xxl-3 col-md-6 col-xs-6 col-lg-4">
//             <p>${product.name}</p>
//             <img class="auto" src="${product.image}" alt="${product.name}">
//             <p class="precio">${product.currency} ${product.cost}</p>
//         </div>
//     </div>`;
// });