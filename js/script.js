document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/json/camisas.json');
    const data = await response.json();


    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        data.forEach(product => {
            const productCard = `
                <div class="col-lg-3 col-md-4 col-6">
                    <a style="text-decoration: none;" href="/templates/camisas.html?product=${product.time}">
                        <div class="card mb-5">
                            <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h6 class="card-title" style="font-size: 14px;">${product.name}</h6>
                                <p class="card-text">${product.price}</p>
                            </div>
                        </div>
                    </a>
                </div>`;
            productsContainer.insertAdjacentHTML('beforeend', productCard);
        });
    }


    const productsPage = document.getElementById('product');
    if (productsPage) {
        data.forEach(product => {
            const urlParams = new URLSearchParams(window.location.search);
            const selectedTeam = urlParams.get('product');

            const sizeButtons = document.querySelectorAll('.btn[data-bs-toggle="button"]'); 
            sizeButtons.forEach(button => { button.addEventListener('click', function() { sizeButtons.forEach(btn => btn.classList.remove('active')); 
            this.classList.add('active'); 
        }); 
    });

            if (product.time == selectedTeam) {
                const productJersey = ` 
                <div class="col-md-6"> <img src="${product.image_url}" alt="Produto" class="product-image"> </div>
                 <div class="col-md-6">
                    <div class="d-flex align-items-center justify-content-between mt-xl-0 mt-4 mb-xl-0 mb-3"> <h3>${product.name}</h3> <p class="ms-3 mb-0"><span>4.6</span> <i class="fa fa-star product-rating"></i></p> 
                    </div> 
                    <p class="product-price">${product.price}</p> 
                    <p class="product-description mb-5">${product.description || "Descrição indisponível"}</p> 
                    <div class="mt-3 d-flex justify-content-between text-center">
                    <div class="d-flex flex-column input-group w-50 mb-3">
                    <div><label for="sizes" class="form-label">Quantidade:</label></div>
                    <div>
                        <select class="form-select" id="inputGroupSelect02">
                        <option selected>Escolha...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3">4</option>
                        <option value="3">5</option>
                        </select>
                    </div>
                    </div>

                    <div id="tamanhos"> 
                    <label for="sizes" class="form-label">Escolha o tamanho:</label> <br>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">P</button>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">M</button>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">G</button>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">XG</button>
                    </div> 
                    </div>
                    <div class="mt-5 d-flex justify-content-center"><button class="btn btn-danger btn-lg">Comprar</button></div> 
                    </div>`;
                    

                productsPage.insertAdjacentHTML('beforeend', productJersey);
            }
        });
    }
});

