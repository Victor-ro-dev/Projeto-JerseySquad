document.addEventListener("DOMContentLoaded", async () => { 
    const response = await fetch('/json/camisas.json'); 
    const data = await response.json(); 
    const productsContainer = document.getElementById('products-container'); 

    data.forEach(product => { const productCard = 
        ` <div class="col-md-3">
         <div class="card mb-5"> 
         <img src="${product.image_url}" 
         class="card-img-top" alt="${product.name}"> 
         <div class="card-body"> <h6 class="card-title">${product.name}</h6> 
         <p class="card-text">${product.price}</p> 
         </div> 
         </div>
         </div> `; 
         productsContainer.insertAdjacentHTML('beforeend', productCard); 
        }); 
    });